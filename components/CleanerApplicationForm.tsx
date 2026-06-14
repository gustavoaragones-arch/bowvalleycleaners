"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  submitCleanerApplication,
  type CleanerApplicationInput,
} from "@/app/actions/submit-cleaner-application";
import type { ServiceArea, Specialization } from "@/types/company";
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

const schema = z.object({
  company_name: z.string().min(2, "Please enter your company name"),
  contact_name: z.string().min(2, "Please enter a contact name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  website_url: z.string().optional(),
  service_areas: z.array(z.string()).min(1, "Select at least one service area"),
  specializations: z.array(z.string()).min(1, "Select at least one specialization"),
});

type FormData = z.infer<typeof schema>;

export function CleanerApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
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
      company_name: "",
      contact_name: "",
      email: "",
      phone: "",
      website_url: "",
      service_areas: [],
      specializations: [],
    },
  });

  const selectedAreas = watch("service_areas");
  const selectedSpecs = watch("specializations");

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

  async function onSubmit(data: FormData) {
    setServerError("");
    const payload: CleanerApplicationInput = {
      company_name: data.company_name,
      contact_name: data.contact_name,
      email: data.email,
      phone: data.phone,
      website_url: data.website_url,
      service_areas: data.service_areas as CleanerApplicationInput["service_areas"],
      specializations: data.specializations as CleanerApplicationInput["specializations"],
    };

    const result = await submitCleanerApplication(payload);
    if (result.success) {
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
          Application received
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Thank you for applying to the Bow Valley cleaning network. Our
          operations team will review your company details, certifications, and
          service coverage within <strong>48 hours</strong>. We&apos;ll contact you
          at the email provided if your application moves forward.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="company_name">Company Name</Label>
          <Input
            id="company_name"
            placeholder="e.g. Peak Sparkle Cleaning Co."
            {...register("company_name")}
          />
          {errors.company_name && (
            <p className="text-xs text-destructive">{errors.company_name.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="contact_name">Primary Contact Name</Label>
          <Input
            id="contact_name"
            placeholder="Full name"
            {...register("contact_name")}
          />
          {errors.contact_name && (
            <p className="text-xs text-destructive">{errors.contact_name.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="operations@yourcompany.ca"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (403) 555-0100"
            {...register("phone")}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="website_url">Website URL</Label>
          <Input
            id="website_url"
            type="url"
            placeholder="https://yourcompany.ca"
            {...register("website_url")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Service Areas</Label>
        <p className="text-xs text-muted-foreground">
          Select every town your team actively serves.
        </p>
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
      </div>

      <div className="space-y-2">
        <Label>Specializations</Label>
        <p className="text-xs text-muted-foreground">
          Select the service categories you are equipped to deliver professionally.
        </p>
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
      </div>

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
            <Loader2 className="size-4 animate-spin" /> Submitting…
          </>
        ) : (
          "Submit Application"
        )}
      </Button>
    </form>
  );
}
