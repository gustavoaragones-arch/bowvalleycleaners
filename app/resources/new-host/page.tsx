import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, MapPin } from "lucide-react";
import { CleanerQuiz } from "@/components/CleanerQuiz";
import { TurnoverChecklist } from "@/components/TurnoverChecklist";
import { CostCalculator } from "@/components/CostCalculator";
import { ProviderComparison } from "@/components/ProviderComparison";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title:
    "The Ultimate Guide to Hiring an STR Cleaner in the Bow Valley | BowValleyCleaners",
  description:
    "A complete interactive guide for new Airbnb and vacation rental hosts in Canmore and Banff. Calculate costs, view turnover checklists, and find the right cleaning partner.",
  alternates: {
    canonical: "https://bowvalleycleaners.ca/resources/new-host",
  },
};

function GuideProse({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="prose-guide space-y-4 text-base leading-relaxed"
      style={{ color: "var(--bv-slate)" }}
    >
      {children}
    </div>
  );
}

export default function NewHostResourcePage() {
  return (
    <main className="flex-1" style={{ backgroundColor: "var(--bv-snow)" }}>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bv-hero py-20 sm:py-28">
        <svg
          className="pointer-events-none absolute bottom-0 right-0 z-0 hidden md:block"
          width="420"
          height="220"
          viewBox="0 0 340 180"
          fill="none"
          aria-hidden="true"
          style={{ opacity: 0.16 }}
        >
          <path d="M0 180L80 60L130 120L180 30L240 100L290 50L340 100L340 180Z" fill="#E8EDE4" />
          <path
            d="M180 30L200 70L230 50L240 100"
            fill="none"
            stroke="#E8EDE4"
            strokeWidth="0.5"
            opacity="0.5"
          />
        </svg>

        <div className="bv-container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium bv-hero-badge">
              <BookOpen className="size-3" />
              New Host Resource Center
            </div>
            <div className="mb-4 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[2px]">
              <MapPin className="size-3" style={{ color: "var(--bv-amber)" }} />
              <span style={{ color: "var(--bv-amber)" }}>Canmore · Banff · Bow Valley</span>
            </div>
            <h1 className="font-playfair text-4xl tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.12]">
              The New Host&apos;s Guide to STR Cleaning in the Bow Valley
            </h1>
            <p
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:text-lg"
              style={{ color: "rgba(232,237,228,0.72)" }}
            >
              Managing a short-term rental in Canmore, Banff, or Dead Man&apos;s Flats is
              vastly different than a standard city. Tight 11 AM to 4 PM turnaround windows,
              off-site laundry logistics, and high guest expectations require a bulletproof
              operational strategy. Use our free interactive tools below to build yours.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 2: Provider comparison + Quiz ────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="bv-container space-y-14 lg:space-y-16">
          <ProviderComparison />
          <div className="mx-auto max-w-2xl space-y-6">
            <p
              className="text-center text-base leading-relaxed"
              style={{ color: "var(--bv-slate)" }}
            >
              Still unsure? Take our 30-second assessment to see which operational model fits
              your portfolio.
            </p>
            <CleanerQuiz />
          </div>
        </div>
      </section>

      {/* ── Section 3: Turnover SOP ──────────────────────────────────── */}
      <section
        className="border-y py-16 sm:py-20 lg:py-24"
        style={{ borderColor: "var(--bv-border)", backgroundColor: "var(--bv-bone)" }}
      >
        <div className="bv-container space-y-10">
          <div className="mx-auto max-w-3xl text-center">
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--bv-amber)" }}
            >
              Step 2 · See the Work
            </p>
            <h2
              className="mt-2 font-playfair text-3xl tracking-tight sm:text-4xl"
              style={{ color: "var(--bv-summit)" }}
            >
              The 120-Minute Sprint
            </h2>
            <p
              className="mt-5 text-base leading-relaxed sm:text-lg"
              style={{ color: "var(--bv-slate)" }}
            >
              A vacation rental turnover is not a &ldquo;standard house clean.&rdquo; It is a
              fast-paced hospitality reset. In the Bow Valley, cleaners are also checking for
              wildlife attractants, assessing ski-boot damage, and managing hot tub chemical
              handoffs. Expand the sections below to view an actual Standard Operating Procedure
              (SOP) from a local Canmore cleaning company, complete with time allotments.
            </p>
          </div>
          <div className="mx-auto max-w-4xl">
            <TurnoverChecklist />
          </div>
        </div>
      </section>

      {/* ── Section 4: Cost calculator ───────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="bv-container">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
            <CostCalculator />
            <div className="lg:sticky lg:top-24">
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--bv-amber)" }}
              >
                Step 3 · Set Your Budget
              </p>
              <h2
                className="mt-2 font-playfair text-3xl tracking-tight sm:text-4xl"
                style={{ color: "var(--bv-summit)" }}
              >
                How Much Should It Cost?
              </h2>
              <GuideProse>
                <p>
                  The Canadian Rockies have a notoriously high cost of living. To retain
                  reliable, high-quality cleaning staff, your cleaning fee must reflect local
                  living wages. Our calculator provides baseline estimates based on current Bow
                  Valley market rates.
                </p>
                <p>
                  Use this to set your Airbnb cleaning fee appropriately — so you attract pros
                  who can actually show up on turnover day, every time.
                </p>
              </GuideProse>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section
        className="border-t py-16 sm:py-20"
        style={{
          borderColor: "var(--bv-border)",
          backgroundColor: "var(--bv-summit)",
          color: "var(--bv-frost)",
        }}
      >
        <div className="bv-container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-playfair text-3xl tracking-tight sm:text-4xl">
              Ready to build your team?
            </h2>
            <p
              className="mt-4 text-base leading-relaxed sm:text-lg"
              style={{ color: "rgba(232,237,228,0.72)" }}
            >
              Browse our vetted directory of local Bow Valley professionals or request a custom
              quote for your property.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/"
                className={cn(buttonVariants({ size: "lg" }), "bv-btn-primary w-full sm:w-auto")}
              >
                Browse the Directory
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/get-quote"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "w-full border-white/25 bg-transparent text-white hover:bg-white/10 sm:w-auto"
                )}
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
