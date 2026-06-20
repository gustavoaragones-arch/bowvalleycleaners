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
    <main className="flex-1" style={{ backgroundColor: "var(--bv-snow)" }}>

      {/* HERO */}
      <section className="relative overflow-hidden bv-hero py-20 text-center sm:py-28">
        <div className="bv-container relative">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium bv-hero-badge">
            <Users className="size-3" />
            Provider Partner Portal
          </div>

          <h1 className="mx-auto max-w-3xl text-4xl font-playfair tracking-tight sm:text-5xl lg:text-6xl">
            Join Bow Valley&apos;s Premier Cleaning Network
          </h1>

          <p
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed sm:text-lg"
            style={{ color: "rgba(232,237,228,0.65)" }}
          >
            We don&apos;t just send leads — we connect high-value property managers
            and luxury homeowners with the top 20% of cleaning talent in the
            Bow Valley.
          </p>

          <a
            href="#apply"
            className="mt-8 inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold bv-btn-primary transition-opacity"
          >
            Apply for Inclusion <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="border-b py-16 sm:py-20" style={{ borderColor: "var(--bv-border)" }}>
        <div className="bv-container">
          <div className="mb-10 text-center">
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--bv-amber)" }}
            >
              Why Partner With Us
            </p>
            <h2 className="mt-2 text-2xl font-playfair tracking-tight sm:text-3xl" style={{ color: "var(--bv-summit)" }}>
              Built for operators, not hobbyists
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm" style={{ color: "var(--bv-slate)" }}>
              We partner with cleaners who can handle strict-turnover STRs,
              luxury homes, and post-construction environments — not generic
              residential one-offs.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {BENEFITS.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border bg-white p-6 bv-card-hover"
                style={{ borderColor: "var(--bv-border)" }}
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-xl bv-icon-box">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-base font-semibold" style={{ color: "var(--bv-summit)" }}>{title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--bv-slate)" }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-b py-16 sm:py-20" style={{ borderColor: "var(--bv-border)", backgroundColor: "var(--bv-bone)" }}>
        <div className="bv-container">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--bv-slate)" }}>
              How It Works
            </p>
            <h2 className="mt-2 text-2xl font-playfair tracking-tight sm:text-3xl" style={{ color: "var(--bv-summit)" }}>
              Operations-driven onboarding
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {STEPS.map(({ step, title, body }) => (
              <div
                key={step}
                className="relative rounded-2xl border bg-white p-6"
                style={{ borderColor: "var(--bv-border)" }}
              >
                <span className="text-3xl font-black" style={{ color: "var(--bv-frost)" }}>{step}</span>
                <h3 className="mt-2 text-base font-semibold" style={{ color: "var(--bv-summit)" }}>{title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--bv-slate)" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST & STANDARDS */}
      <section className="bv-hero border-b py-10" style={{ borderColor: "rgba(232,237,228,0.08)" }}>
        <div className="bv-container">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bv-icon-box">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold">Trust &amp; Standards</h2>
                <p style={{ color: "rgba(232,237,228,0.5)" }} className="text-xs">
                  We maintain a curated network — not an open directory.
                </p>
              </div>
            </div>

            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 sm:justify-end">
              {STANDARDS.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-1.5 text-xs"
                  style={{ color: "rgba(232,237,228,0.7)" }}
                >
                  <Zap className="size-3 shrink-0" style={{ color: "var(--bv-sage)" }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section id="apply" className="scroll-mt-20 py-16 sm:py-20">
        <div className="bv-container max-w-2xl">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--bv-amber)" }}>
              Partner Application
            </p>
            <h2 className="mt-2 text-2xl font-playfair tracking-tight sm:text-3xl" style={{ color: "var(--bv-summit)" }}>
              Apply for network inclusion
            </h2>
            <p className="mt-3 text-sm" style={{ color: "var(--bv-slate)" }}>
              Provide your operational details below. Accurate service areas and
              specializations help us route the right leads from day one.
            </p>
          </div>

          <div
            className="rounded-2xl border bg-white p-6 sm:p-8"
            style={{ borderColor: "var(--bv-border)" }}
          >
            <CleanerApplicationForm />
          </div>

          <p className="mt-6 text-center text-xs" style={{ color: "var(--bv-slate)" }}>
            Questions before applying?{" "}
            <a href="mailto:contact@bowvalleycleaners.ca" className="bv-link hover:underline">
              contact@bowvalleycleaners.ca
            </a>
          </p>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section
        className="border-t py-10 text-center"
        style={{ borderColor: "var(--bv-border)", backgroundColor: "var(--bv-bone)" }}
      >
        <div className="bv-container">
          <p className="text-sm" style={{ color: "var(--bv-slate)" }}>
            Already listed and need to update your profile?{" "}
            <Link href="/" className="font-medium bv-link hover:underline">
              View the directory
            </Link>
          </p>
        </div>
      </section>

    </main>
  );
}
