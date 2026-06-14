import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardList,
  ShieldCheck,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { CleanerApplicationForm } from "@/components/CleanerApplicationForm";

export const metadata: Metadata = {
  title: "For Cleaners — Join Bow Valley's Premier Cleaning Network",
  description:
    "Apply to join the Bow Valley's top cleaning network. High-intent STR, luxury, and commercial leads routed to verified operators in Canmore, Banff, and the Rockies.",
  alternates: {
    canonical: "https://bowvalleycleaners.ca/for-cleaners",
  },
};

const BENEFITS = [
  {
    icon: Target,
    title: "High-Intent Leads",
    body: "Stop wasting time on low-paying residential jobs. We funnel Airbnb hosts, STR property managers, and commercial developers directly to you.",
  },
  {
    icon: ClipboardList,
    title: "Operational Transparency",
    body: "Property managers receive clear expectations, standardized property details, and turnover instructions — so your team knows exactly what to do on arrival.",
  },
  {
    icon: BadgeCheck,
    title: "Reputation Management",
    body: "Your company page features specialization badges — Post-Construction, Luxury Properties, Airbnb — helping you stand out to high-paying clients.",
  },
] as const;

const STEPS = [
  {
    step: "01",
    title: "Application",
    body: "Submit your company details, certifications, and service areas through our partner portal.",
  },
  {
    step: "02",
    title: "Verification",
    body: "We review your operational history to ensure you meet the standards our property manager partners expect.",
  },
  {
    step: "03",
    title: "Direct Matching",
    body: "Once approved, your company enters our matching engine and qualified leads and high-value RFPs route to your inbox.",
  },
] as const;

const STANDARDS = [
  "Active liability insurance",
  "Clear communication protocols",
  "Commitment to professional reliability",
  "Experience in high-stakes turnover environments",
] as const;

export default function ForCleanersPage() {
  return (
    <main className="flex-1">

      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 px-4 py-20 text-center sm:px-6 sm:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 400'%3E%3Cpolygon fill='white' points='0,400 200,100 400,250 600,50 800,200 1000,80 1200,300 1200,400'/%3E%3C/svg%3E\")",
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        />

        <div className="relative mx-auto max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-300">
            <Users className="size-3" />
            Provider Partner Portal
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Join Bow Valley&apos;s Premier Cleaning Network
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            We don&apos;t just send leads — we connect high-value property managers
            and luxury homeowners with the top 20% of cleaning talent in the
            Bow Valley.
          </p>

          <a
            href="#apply"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-sky-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition-colors hover:bg-sky-400"
          >
            Apply for Inclusion <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* VALUE PROPOSITION                                                    */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-b border-border bg-background px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-sky-600">
              Why Partner With Us
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Built for operators, not hobbyists
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
              We partner with cleaners who can handle strict-turnover STRs,
              luxury homes, and post-construction environments — not generic
              residential one-offs.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {BENEFITS.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-base font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* HOW IT WORKS                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-b border-border bg-muted/30 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              How It Works
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Operations-driven onboarding
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {STEPS.map(({ step, title, body }) => (
              <div key={step} className="relative rounded-2xl border border-border bg-background p-6">
                <span className="text-3xl font-black text-sky-100">{step}</span>
                <h3 className="mt-2 text-base font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* TRUST & STANDARDS                                                    */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-b border-border bg-slate-950 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">Trust &amp; Standards</h2>
                <p className="text-xs text-slate-400">
                  We maintain a curated network — not an open directory.
                </p>
              </div>
            </div>

            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 sm:justify-end">
              {STANDARDS.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-1.5 text-xs text-slate-300"
                >
                  <Zap className="size-3 shrink-0 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* APPLICATION FORM                                                     */}
      {/* ------------------------------------------------------------------ */}
      <section id="apply" className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-sky-600">
              Partner Application
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Apply for network inclusion
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Provide your operational details below. Accurate service areas and
              specializations help us route the right leads from day one.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <CleanerApplicationForm />
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Questions before applying?{" "}
            <a
              href="mailto:contact@bowvalleycleaners.ca"
              className="text-sky-600 hover:underline"
            >
              contact@bowvalleycleaners.ca
            </a>
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FOOTER CTA                                                           */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-t border-border bg-muted/30 px-4 py-10 text-center sm:px-6">
        <p className="text-sm text-muted-foreground">
          Already listed and need to update your profile?{" "}
          <Link href="/" className="font-medium text-sky-600 hover:underline">
            View the directory
          </Link>
        </p>
      </section>

    </main>
  );
}
