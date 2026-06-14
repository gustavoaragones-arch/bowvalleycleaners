"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Loader2, CheckCircle2, ShieldCheck, BadgeCheck, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  submitAddBusiness,
  type AddBusinessInput,
} from "@/app/actions/submit-add-business";
import type { ServiceArea, Specialization, BusinessType } from "@/types/company";
import { SPECIALIZATION_COLORS } from "@/types/company";

const SERVICE_AREAS: ServiceArea[] = [
  "Canmore",
  "Banff",
  "Dead Man's Flats",
  "Exshaw",
  "Cochrane",
  "Calgary",
];

const SPECIALIZATIONS: Specialization[] = [
  "Airbnb",
  "Residential Homes",
  "Luxury Properties",
  "Deep Cleaning - Move outs",
  "Post Construction",
  "Commercial Buildings",
  "Pet-Friendly Cleaning",
  "Carpet Cleaning Specialists",
  "Property Management Support",
  "Eco Friendly",
];

const BUSINESS_TYPES: BusinessType[] = [
  "Cleaning Contractor",
  "Cleaning Company",
];

const TRUST_FLAGS = [
  { key: "is_insured" as const, icon: ShieldCheck, label: "Insured" },
  { key: "is_licensed" as const, icon: BadgeCheck, label: "Licensed" },
  { key: "is_background_checked" as const, icon: UserCheck, label: "Background Checked" },
];

const schema = z.object({
  name: z.string().min(2, "Please enter your company name"),
  tagline: z.string().max(300).optional(),
  business_type: z.enum(["Cleaning Contractor", "Cleaning Company"]).optional(),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  phone_number: z.string().optional(),
  website_url: z.string().optional(),
  logo_url: z.string().optional(),
  google_rating: z.string().optional(),
  review_count: z.string().optional(),
  years_in_business: z.string().optional(),
  is_insured: z.boolean(),
  is_licensed: z.boolean(),
  is_background_checked: z.boolean(),
  service_areas: z.array(z.string()).min(1, "Select at least one service area"),
  specializations: z.array(z.string()).min(1, "Select at least one specialization"),
});

type FormData = z.infer<typeof schema>;

export function AddBusinessForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedSlug, setSubmittedSlug] = useState("");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      tagline: "",
      email: "",
      phone_number: "",
      website_url: "",
      logo_url: "",
      google_rating: "",
      review_count: "",
      years_in_business: "",
      is_insured: false,
      is_licensed: false,
      is_background_checked: false,
      service_areas: [],
      specializations: [],
    },
  });

  const selectedAreas = watch("service_areas");
  const selectedSpecs = watch("specializations");
  const bizType = watch("business_type");
  const trust = {
    is_insured: watch("is_insured"),
    is_licensed: watch("is_licensed"),
    is_background_checked: watch("is_background_checked"),
  };

  function toggleArea(area: ServiceArea) {
    const current = selectedAreas ?? [];
    const next = current.includes(area)
      ? current.filter((a) => a !== area)
      : [...current, area];
    setValue("service_areas", next, { shouldValidate: true });
  }

  function toggleSpec(spec: Specialization) {
    const current = selectedSpecs ?? [];
    const next = current.includes(spec)
      ? current.filter((s) => s !== spec)
      : [...current, spec];
    setValue("specializations", next, { shouldValidate: true });
  }

  function toggleTrust(key: keyof typeof trust) {
    setValue(key, !trust[key]);
  }

  async function onSubmit(data: FormData) {
    setServerError("");

    const payload: AddBusinessInput = {
      name: data.name,
      tagline: data.tagline,
      business_type: data.business_type,
      email: data.email,
      phone_number: data.phone_number,
      website_url: data.website_url,
      logo_url: data.logo_url,
      google_rating: data.google_rating ? Number(data.google_rating) : null,
      review_count: data.review_count ? Number(data.review_count) : 0,
      years_in_business: data.years_in_business
        ? Number(data.years_in_business)
        : null,
      is_insured: data.is_insured,
      is_licensed: data.is_licensed,
      is_background_checked: data.is_background_checked,
      service_areas: data.service_areas as AddBusinessInput["service_areas"],
      specializations: data.specializations as AddBusinessInput["specializations"],
    };

    const result = await submitAddBusiness(payload);
    if (result.success) {
      setSubmittedSlug(result.slug);
      setSubmitted(true);
    } else {
      setServerError(result.error);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-emerald-600" />
        <h3 className="mt-4 text-lg font-bold text-foreground">
          Your listing is live
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Your company has been added to the Bow Valley directory. It will appear
          in search results and filters immediately.
        </p>
        {submittedSlug && (
          <Link
            href={`/company/${submittedSlug}`}
            className="mt-5 inline-flex items-center rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-500 transition-colors"
          >
            View your listing
          </Link>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

      {/* Company basics */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-foreground">Company Details</legend>

        <div className="space-y-1.5">
          <Label htmlFor="name">Company Name *</Label>
          <Input id="name" placeholder="e.g. Peak Sparkle Cleaning Co." {...register("name")} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="tagline">Tagline</Label>
          <Textarea
            id="tagline"
            rows={2}
            placeholder="One-line description shown under your company name"
            {...register("tagline")}
          />
        </div>

        <div className="space-y-2">
          <Label>Business Type</Label>
          <div className="flex flex-wrap gap-2">
            {BUSINESS_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() =>
                  setValue("business_type", bizType === type ? undefined : type)
                }
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-all",
                  bizType === type
                    ? "border-slate-700 bg-slate-800 text-white shadow-sm"
                    : "border-border bg-background text-muted-foreground hover:border-slate-400"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </fieldset>

      {/* Contact */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-foreground">Contact</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="hello@yourcompany.ca" {...register("email")} />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone_number">Phone</Label>
            <Input id="phone_number" type="tel" placeholder="+1 (403) 555-0100" {...register("phone_number")} />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="website_url">Website URL</Label>
            <Input id="website_url" type="url" placeholder="https://yourcompany.ca" {...register("website_url")} />
          </div>
        </div>
      </fieldset>

      {/* Reputation */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-foreground">Reputation</legend>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label htmlFor="google_rating">Google Rating (0–5)</Label>
            <Input id="google_rating" type="number" step="0.1" min="0" max="5" placeholder="4.8" {...register("google_rating")} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="review_count">Review Count</Label>
            <Input id="review_count" type="number" min="0" placeholder="134" {...register("review_count")} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="years_in_business">Years in Business</Label>
            <Input id="years_in_business" type="number" min="0" placeholder="7" {...register("years_in_business")} />
          </div>
        </div>
      </fieldset>

      {/* Trust flags */}
      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-foreground">Trust &amp; Certifications</legend>
        <p className="text-xs text-muted-foreground">
          Only select credentials your company can verify upon request.
        </p>
        <div className="flex flex-wrap gap-2">
          {TRUST_FLAGS.map(({ key, icon: Icon, label }) => {
            const active = trust[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggleTrust(key)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-semibold transition-all",
                  active
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-400"
                    : "border-border bg-background text-muted-foreground hover:border-emerald-300"
                )}
              >
                <Icon className="size-3" />
                {label}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Service areas */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold text-foreground">Service Areas *</legend>
        <div className="flex flex-wrap gap-2">
          {SERVICE_AREAS.map((area) => {
            const active = selectedAreas?.includes(area);
            return (
              <button
                key={area}
                type="button"
                onClick={() => toggleArea(area)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-all",
                  active
                    ? "border-sky-500 bg-sky-50 text-sky-700 shadow-sm"
                    : "border-border bg-background text-muted-foreground hover:border-sky-300"
                )}
              >
                {area}
              </button>
            );
          })}
        </div>
        {errors.service_areas && (
          <p className="text-xs text-destructive">{errors.service_areas.message}</p>
        )}
      </fieldset>

      {/* Specializations */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold text-foreground">Specializations *</legend>
        <div className="flex flex-wrap gap-2">
          {SPECIALIZATIONS.map((spec) => {
            const active = selectedSpecs?.includes(spec);
            const colors = SPECIALIZATION_COLORS[spec];
            return (
              <button
                key={spec}
                type="button"
                onClick={() => toggleSpec(spec)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset transition-all",
                  active
                    ? `${colors.bg} ${colors.text} ${colors.ring} shadow-sm`
                    : "bg-muted text-muted-foreground ring-transparent hover:ring-border"
                )}
              >
                {spec}
              </button>
            );
          })}
        </div>
        {errors.specializations && (
          <p className="text-xs text-destructive">{errors.specializations.message}</p>
        )}
      </fieldset>

      {serverError && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {serverError}
        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-11 w-full rounded-xl bg-sky-600 text-sm font-semibold text-white hover:bg-sky-500"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Publishing listing…
          </>
        ) : (
          "Add to Directory"
        )}
      </Button>
    </form>
  );
}
