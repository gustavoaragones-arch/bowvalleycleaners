"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, Lightbulb } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type UnitSize = "1x1" | "2x2";

type PricingTier = {
  id: "cheap" | "average" | "expensive";
  label: string;
  range: string;
  borderColor: string;
  accentBg: string;
};

const UNIT_OPTIONS: { id: UnitSize; label: string }[] = [
  { id: "1x1", label: "1 Bedroom, 1 Bathroom" },
  { id: "2x2", label: "2 Bedrooms, 2 Bathrooms" },
];

const TIER_DATA: Record<
  UnitSize,
  { tiers: PricingTier[]; contextNote?: string }
> = {
  "1x1": {
    contextNote:
      "A standard 1 Bed / 1 Bath should take a maximum of 2 hours for cleaning only.",
    tiers: [
      {
        id: "cheap",
        label: "Cheap",
        range: "$60 – $80",
        borderColor: "var(--bv-forest)",
        accentBg: "rgba(234, 240, 232, 0.9)",
      },
      {
        id: "average",
        label: "Average",
        range: "$80 – $100",
        borderColor: "#2A4A7A",
        accentBg: "rgba(232, 237, 245, 0.95)",
      },
      {
        id: "expensive",
        label: "Expensive",
        range: "$100 – $120",
        borderColor: "var(--bv-amber)",
        accentBg: "rgba(245, 230, 192, 0.45)",
      },
    ],
  },
  "2x2": {
    tiers: [
      {
        id: "cheap",
        label: "Cheap",
        range: "Under $120",
        borderColor: "var(--bv-forest)",
        accentBg: "rgba(234, 240, 232, 0.9)",
      },
      {
        id: "average",
        label: "Average",
        range: "$120 – $130",
        borderColor: "#2A4A7A",
        accentBg: "rgba(232, 237, 245, 0.95)",
      },
      {
        id: "expensive",
        label: "Expensive",
        range: "Over $130",
        borderColor: "var(--bv-amber)",
        accentBg: "rgba(245, 230, 192, 0.45)",
      },
    ],
  },
};

function hourlyLabel(rate: number): string {
  if (rate <= 35) return "Independent Contractor";
  if (rate >= 55) return "Professional Company";
  return "Mid-Market Provider";
}

export function CostCalculator() {
  const [unitSize, setUnitSize] = useState<UnitSize>("1x1");
  const [hourlyRate, setHourlyRate] = useState(45);

  const { tiers, contextNote } = TIER_DATA[unitSize];

  const cleaningOnlyEstimate = useMemo(() => {
    if (unitSize !== "1x1") return null;
    return hourlyRate * 2;
  }, [unitSize, hourlyRate]);

  return (
    <section
      className="overflow-hidden rounded-2xl border transition-shadow duration-300 hover:shadow-md"
      style={{
        borderColor: "var(--bv-border)",
        backgroundColor: "var(--bv-bone)",
      }}
    >
      <div
        className="border-b px-5 py-4 sm:px-6"
        style={{
          borderColor: "var(--bv-border)",
          backgroundColor: "var(--bv-summit)",
          color: "var(--bv-frost)",
        }}
      >
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest">
          <Calculator className="size-3.5" style={{ color: "var(--bv-amber)" }} />
          Bow Valley Market Rates
        </div>
        <h2 className="font-playfair text-2xl tracking-tight sm:text-3xl">
          The Bow Valley Cost Calculator
        </h2>
        <p className="mt-1 text-sm" style={{ color: "var(--bv-sage)" }}>
          Hyper-local turnover ranges for Canmore &amp; Banff — based on real market tiers,
          not generic formulas.
        </p>
      </div>

      <div className="space-y-6 px-5 py-6 sm:px-6">
        {/* Unit size */}
        <div>
          <p className="mb-2 text-sm font-semibold" style={{ color: "var(--bv-summit)" }}>
            Unit Size
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {UNIT_OPTIONS.map((option) => {
              const active = unitSize === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setUnitSize(option.id)}
                  className={cn(
                    "rounded-xl border px-3 py-3 text-left text-sm font-medium transition-all duration-300",
                    active && "shadow-sm"
                  )}
                  style={{
                    borderColor: active ? "var(--bv-alpine)" : "var(--bv-border)",
                    backgroundColor: active ? "var(--bv-alpine)" : "#fff",
                    color: active ? "#fff" : "var(--bv-alpine)",
                  }}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hourly rate */}
        <div>
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <label
              htmlFor="hourly-rate"
              className="text-sm font-semibold"
              style={{ color: "var(--bv-summit)" }}
            >
              Hourly Rate
            </label>
            <div className="flex items-center gap-2">
              <span
                className="inline-flex rounded-md px-2 py-0.5 text-sm font-bold tabular-nums"
                style={{ backgroundColor: "var(--bv-frost)", color: "var(--bv-alpine)" }}
              >
                ${hourlyRate}/hr
              </span>
              <span className="text-[11px] font-medium" style={{ color: "var(--bv-slate)" }}>
                {hourlyLabel(hourlyRate)}
              </span>
            </div>
          </div>
          <input
            id="hourly-rate"
            type="range"
            min={30}
            max={60}
            step={1}
            value={hourlyRate}
            onChange={(e) => setHourlyRate(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-full accent-[var(--bv-amber)]"
            style={{ backgroundColor: "var(--bv-frost)" }}
          />
          <div className="mt-1 flex justify-between text-[11px]" style={{ color: "var(--bv-slate)" }}>
            <span>$30/hr · Independent Contractor</span>
            <span>$60/hr · Professional Company</span>
          </div>
          {cleaningOnlyEstimate !== null ? (
            <p className="mt-2 text-xs" style={{ color: "var(--bv-granite)" }}>
              At ${hourlyRate}/hr × 2 hrs (cleaning only) ≈{" "}
              <strong style={{ color: "var(--bv-summit)" }}>
                ${cleaningOnlyEstimate}
              </strong>{" "}
              — compare to tiers below.*
            </p>
          ) : null}
        </div>

        {/* Tier cards */}
        <div
          key={unitSize}
          className="grid gap-3 sm:grid-cols-3 animate-in fade-in duration-300"
        >
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className="overflow-hidden rounded-xl border bg-white transition-all duration-300 hover:shadow-sm"
              style={{
                borderColor: "var(--bv-border)",
                borderTopWidth: "3px",
                borderTopColor: tier.borderColor,
                backgroundColor: tier.accentBg,
              }}
            >
              <div className="px-4 py-4">
                <p
                  className="text-[11px] font-semibold uppercase tracking-widest"
                  style={{ color: tier.borderColor }}
                >
                  {tier.label}
                </p>
                <p
                  className="mt-2 font-playfair text-xl tracking-tight sm:text-2xl"
                  style={{ color: "var(--bv-summit)" }}
                >
                  {tier.range}
                </p>
                <p className="mt-1 text-xs" style={{ color: "var(--bv-slate)" }}>
                  per turnover*
                </p>
              </div>
            </div>
          ))}
        </div>

        {contextNote ? (
          <p
            className="rounded-lg border px-4 py-3 text-sm leading-relaxed animate-in fade-in duration-300"
            style={{
              borderColor: "var(--bv-border)",
              backgroundColor: "#fff",
              color: "var(--bv-granite)",
            }}
          >
            {contextNote}
          </p>
        ) : null}

        {/* Laundry caveat */}
        <div
          className="rounded-lg border px-4 py-3 text-sm leading-relaxed"
          style={{ borderColor: "var(--bv-border)", backgroundColor: "#fff" }}
        >
          <p className="font-semibold" style={{ color: "var(--bv-summit)" }}>
            *Laundry not included
          </p>
          <p className="mt-1 text-xs sm:text-sm" style={{ color: "var(--bv-slate)" }}>
            Washing and drying linens in-unit adds significant time to a turnover. These rates
            assume the cleaner is just cleaning, or that laundry cycles fit perfectly within the
            cleaning window.
          </p>
        </div>

        {/* Industry insight */}
        <div
          className="flex gap-3 rounded-xl border px-4 py-4 sm:px-5"
          style={{
            borderColor: "rgba(196, 130, 10, 0.3)",
            backgroundColor: "rgba(245, 230, 192, 0.35)",
          }}
        >
          <Lightbulb
            className="mt-0.5 size-4 shrink-0"
            style={{ color: "var(--bv-amber)" }}
          />
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--bv-amber)" }}
            >
              Industry Insight
            </p>
            <p
              className="mt-2 text-sm leading-relaxed"
              style={{ color: "var(--bv-granite)" }}
            >
              <strong style={{ color: "var(--bv-summit)" }}>Local Insight:</strong> Bow Valley
              property managers typically aim to keep total costs under $120 for a 1-bed/1-bath
              unit. This strict $120 cap must cover the cleaning fee, laundry fees, and supply
              replenishment.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div
          className="rounded-xl p-5 sm:p-6"
          style={{ backgroundColor: "var(--bv-summit)", color: "var(--bv-frost)" }}
        >
          <p className="text-sm leading-relaxed" style={{ color: "var(--bv-sage)" }}>
            These are estimates. Want exact pricing?
          </p>
          <Link
            href="/get-quote"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bv-btn-primary mt-4 inline-flex w-full sm:w-auto"
            )}
          >
            Get Real Quotes from Local Cleaners
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
