"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, ArrowRight, ArrowLeft, Loader2, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { PROPERTY_TYPE_CONFIG, type PropertyType, type LeadTimeline } from "@/types/lead";
import { submitLead, type LeadInput } from "@/app/actions/submit-lead";

// ---------------------------------------------------------------------------
// Zod schema (client-side — mirrors server action)
// ---------------------------------------------------------------------------
const schema = z.object({
  property_type: z.enum(
    ["Airbnb / STR", "Luxury Residential", "Commercial", "Post-Construction"],
    { error: "Please select a property type." }
  ),
  location: z.enum(
    ["Canmore", "Banff", "Dead Man's Flats", "Exshaw", "Cochrane", "Calgary"],
    { error: "Please select your location." }
  ),
  property_details: z.string().max(500).optional(),
  timeline: z.enum(
    ["Immediately", "Within a Week", "Next Month", "Just Exploring"],
    { error: "Please select a timeline." }
  ),
  user_name: z.string().min(2, "Please enter your name"),
  user_email: z.string().email("Please enter a valid email address"),
  user_phone: z.string().optional(),
  preferred_provider: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const PROPERTY_TYPES = Object.keys(PROPERTY_TYPE_CONFIG) as PropertyType[];

const SERVICE_AREAS = [
  "Canmore",
  "Banff",
  "Dead Man's Flats",
  "Exshaw",
  "Cochrane",
  "Calgary",
] as const;

const TIMELINES: LeadTimeline[] = [
  "Immediately",
  "Within a Week",
  "Next Month",
  "Just Exploring",
];

const TIMELINE_ICONS: Record<LeadTimeline, string> = {
  "Immediately":    "⚡",
  "Within a Week":  "📅",
  "Next Month":     "🗓️",
  "Just Exploring": "👀",
};

const STEPS = ["Property Type", "Location & Details", "Your Info"];

// ---------------------------------------------------------------------------
// Progress bar
// ---------------------------------------------------------------------------
function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Step {step} of {total}
        </p>
        <p className="text-xs font-medium text-muted-foreground">
          {STEPS[step - 1]}
        </p>
      </div>
      <div className="flex gap-1.5">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-all duration-300",
              i < step ? "bg-[var(--bv-amber)]" : "bg-border"
            )}
          />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
interface MatchmakerFormProps {
  preferredProvider?: string;
}

export function MatchmakerForm({ preferredProvider = "" }: MatchmakerFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    watch,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      preferred_provider: preferredProvider,
      property_type: undefined,
      location: undefined,
      property_details: "",
      timeline: undefined,
      user_name: "",
      user_email: "",
      user_phone: "",
    },
  });

  const watchedType     = watch("property_type");
  const watchedLocation = watch("location");
  const watchedTimeline = watch("timeline");

  // ---------- Navigation ----------
  async function goNext() {
    let fieldsToValidate: (keyof FormData)[] = [];
    if (step === 1) fieldsToValidate = ["property_type"];
    if (step === 2) fieldsToValidate = ["location", "timeline"];
    const ok = await trigger(fieldsToValidate);
    if (ok) setStep((s) => s + 1);
  }

  function goBack() {
    setStep((s) => s - 1);
  }

  // ---------- Submit ----------
  async function handleSubmit() {
    const ok = await trigger(["user_name", "user_email"]);
    if (!ok) return;

    setIsSubmitting(true);
    setSubmitError("");

    const values = getValues();
    const result = await submitLead(values as LeadInput);

    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
    } else {
      setSubmitError(result.error);
    }
  }

  // ---------------------------------------------------------------------------
  // SUCCESS SCREEN
  // ---------------------------------------------------------------------------
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center gap-6 py-8 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bv-success-panel ring-4 ring-[var(--bv-sage)]">
          <CheckCircle2 className="size-8" style={{ color: "var(--bv-forest)" }} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            You&apos;re on our list!
          </h2>
          <p className="mt-2 text-base text-muted-foreground">
            Our matchmakers are reviewing your request. Expect{" "}
            <strong className="text-foreground">up to 3 tailored quotes</strong> within
            24 hours.
          </p>
          {preferredProvider && (
            <p className="mt-2 text-sm text-muted-foreground">
              We&apos;ll prioritize{" "}
              <span className="font-medium text-foreground">{preferredProvider}</span>{" "}
              in your matches.
            </p>
          )}
        </div>
        <div className="w-full max-w-xs rounded-xl border border-border bg-muted/40 p-4 text-left text-sm">
          <p className="font-medium text-foreground">What happens next?</p>
          <ol className="mt-2 space-y-1.5 text-muted-foreground">
            <li className="flex gap-2">
              <span className="font-bold" style={{ color: "var(--bv-amber)" }}>1.</span>
              We match your request to specialists in your area.
            </li>
            <li className="flex gap-2">
              <span className="font-bold" style={{ color: "var(--bv-amber)" }}>2.</span>
              You receive quotes by email within 24 hours.
            </li>
            <li className="flex gap-2">
              <span className="font-bold" style={{ color: "var(--bv-amber)" }}>3.</span>
              You choose — no obligation, no platform fees.
            </li>
          </ol>
        </div>
        <a
          href="/"
          className="text-sm bv-link underline-offset-2 hover:underline"
        >
          ← Back to the directory
        </a>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ProgressBar step={step} total={STEPS.length} />

      {/* ------------------------------------------------------------------ */}
      {/* STEP 1 — Property Type                                              */}
      {/* ------------------------------------------------------------------ */}
      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-200">
          <h2 className="mb-1 text-xl font-bold text-foreground">
            What type of property needs cleaning?
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            We&apos;ll match you with cleaners who specialize in your property type.
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PROPERTY_TYPES.map((type) => {
              const config = PROPERTY_TYPE_CONFIG[type];
              const selected = watchedType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setValue("property_type", type, { shouldValidate: true })}
                  className={cn(
                    "flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bv-alpine)]",
                    selected
                      ? `${config.color} ring-2`
                      : "border-border bg-card hover:border-[var(--bv-sage)] hover:bg-[var(--bv-frost)]/30"
                  )}
                  aria-pressed={selected}
                >
                  <span className="text-3xl leading-none">{config.icon}</span>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground">{type}</p>
                    <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                      {config.description}
                    </p>
                  </div>
                  {selected && (
                    <CheckCircle2 className="ml-auto size-5 shrink-0" style={{ color: "var(--bv-amber)" }} />
                  )}
                </button>
              );
            })}
          </div>

          {errors.property_type && (
            <p className="mt-3 text-xs text-destructive">
              {errors.property_type.message}
            </p>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* STEP 2 — Location & Details                                         */}
      {/* ------------------------------------------------------------------ */}
      {step === 2 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-200">
          <h2 className="mb-1 text-xl font-bold text-foreground">
            Where is your property?
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            We only match you with cleaners who actively serve your area.
          </p>

          {/* Location pills */}
          <div className="mb-6">
            <Label className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <MapPin className="size-3" /> Location
            </Label>
            <div className="flex flex-wrap gap-2">
              {SERVICE_AREAS.map((area) => {
                const selected = watchedLocation === area;
                return (
                  <button
                    key={area}
                    type="button"
                    onClick={() =>
                      setValue("location", area, { shouldValidate: true })
                    }
                    aria-pressed={selected}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bv-alpine)]",
                      selected
                        ? "bv-chip-active shadow-sm"
                        : "bv-chip-inactive hover:border-[var(--bv-sage)]"
                    )}
                  >
                    {area}
                  </button>
                );
              })}
            </div>
            {errors.location && (
              <p className="mt-2 text-xs text-destructive">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Property details */}
          <div className="mb-6">
            <Label
              htmlFor="property_details"
              className="mb-1.5 block text-sm font-medium"
            >
              Property details{" "}
              <span className="font-normal text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="property_details"
              placeholder="e.g. 3 bed, 2 bath — 1,800 sqft. Hot tub on deck."
              rows={3}
              className="resize-none text-sm"
              {...register("property_details")}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              More detail helps cleaners give you an accurate quote.
            </p>
          </div>

          {/* Timeline */}
          <div>
            <Label className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <Clock className="size-3" /> When do you need this?
            </Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {TIMELINES.map((t) => {
                const selected = watchedTimeline === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() =>
                      setValue("timeline", t, { shouldValidate: true })
                    }
                    aria-pressed={selected}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-xl border-2 px-3 py-3 text-center text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bv-alpine)]",
                      selected
                        ? "border-[var(--bv-alpine)] bg-[var(--bv-frost)] text-[var(--bv-alpine)] ring-1 ring-[var(--bv-sage)]"
                        : "border-border bg-card text-muted-foreground hover:border-[var(--bv-sage)]"
                    )}
                  >
                    <span className="text-xl">{TIMELINE_ICONS[t]}</span>
                    {t}
                  </button>
                );
              })}
            </div>
            {errors.timeline && (
              <p className="mt-2 text-xs text-destructive">
                {errors.timeline.message}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* STEP 3 — Contact Info                                               */}
      {/* ------------------------------------------------------------------ */}
      {step === 3 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-200">
          <h2 className="mb-1 text-xl font-bold text-foreground">
            Where should we send your quotes?
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            We&apos;ll send up to 3 tailored quotes directly to your inbox — no spam,
            ever.
          </p>

          <div className="space-y-4">
            <div>
              <Label htmlFor="user_name" className="mb-1.5 block text-sm font-medium">
                Your name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="user_name"
                placeholder="Jane Smith"
                autoComplete="name"
                {...register("user_name")}
                className={cn(errors.user_name && "border-destructive focus-visible:ring-destructive/30")}
              />
              {errors.user_name && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.user_name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="user_email" className="mb-1.5 block text-sm font-medium">
                Email address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="user_email"
                type="email"
                placeholder="jane@example.com"
                autoComplete="email"
                {...register("user_email")}
                className={cn(errors.user_email && "border-destructive focus-visible:ring-destructive/30")}
              />
              {errors.user_email && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.user_email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="user_phone" className="mb-1.5 block text-sm font-medium">
                Phone number{" "}
                <span className="font-normal text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="user_phone"
                type="tel"
                placeholder="+1 (403) 555-0100"
                autoComplete="tel"
                {...register("user_phone")}
              />
            </div>

            {/* Summary recap */}
            <div className="rounded-xl border border-border bg-muted/30 p-4 text-xs text-muted-foreground leading-relaxed">
              <p className="mb-1 font-semibold text-foreground text-sm">Your request summary</p>
              <div className="space-y-0.5">
                <p>
                  <span className="font-medium text-foreground">Property:</span>{" "}
                  {getValues("property_type")}
                </p>
                <p>
                  <span className="font-medium text-foreground">Location:</span>{" "}
                  {getValues("location")}
                </p>
                {getValues("property_details") && (
                  <p>
                    <span className="font-medium text-foreground">Details:</span>{" "}
                    {getValues("property_details")}
                  </p>
                )}
                <p>
                  <span className="font-medium text-foreground">Timeline:</span>{" "}
                  {getValues("timeline")}
                </p>
                {preferredProvider && (
                  <p>
                    <span className="font-medium text-foreground">Preferred:</span>{" "}
                    {preferredProvider}
                  </p>
                )}
              </div>
            </div>

            <p className="text-[11px] text-muted-foreground/70">
              By submitting, you agree to our{" "}
              <a href="/terms" className="underline hover:text-foreground">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="underline hover:text-foreground">
                Privacy Policy
              </a>
              . We will never sell your information.
            </p>
          </div>

          {submitError && (
            <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {submitError}
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* NAV BUTTONS                                                          */}
      {/* ------------------------------------------------------------------ */}
      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 1 ? (
          <Button
            type="button"
            variant="ghost"
            onClick={goBack}
            className="gap-1.5"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>
        ) : (
          <div />
        )}

        {step < STEPS.length ? (
          <Button
            type="button"
            onClick={goNext}
            className="ml-auto gap-1.5 bv-btn-primary"
          >
            Continue
            <ArrowRight className="size-4" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="ml-auto gap-2 bv-btn-secondary disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <CheckCircle2 className="size-4" />
                Get My Quotes
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
