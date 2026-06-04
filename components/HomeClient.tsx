"use client";

import { useState } from "react";
import { Search, Star, MapPin, Zap, X, ShieldCheck, BadgeCheck, UserCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CompanyCard } from "@/components/CompanyCard";
import { cn } from "@/lib/utils";
import {
  type CompanyFull,
  type ServiceArea,
  type Specialization,
  SPECIALIZATION_COLORS,
} from "@/types/company";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const SERVICE_AREAS: ServiceArea[] = [
  "Canmore",
  "Banff",
  "Dead Man's Flats",
  "Exshaw",
  "Cochrane",
  "Calgary",
];

const SPECIALIZATIONS: Specialization[] = [
  "Airbnb Specialist",
  "Luxury Homes",
  "Commercial",
  "Post Construction",
  "Eco Friendly",
  "Laundry Included",
  "Property Management Support",
  "Same Day Turnover",
];

const PERSONAS = [
  { label: "STR Property Manager", icon: "🏠", description: "Reliable turnovers, every booking" },
  { label: "Luxury Homeowner",     icon: "✨", description: "White-glove residential care"      },
  { label: "New Airbnb Host",      icon: "🗝️", description: "Get guest-ready fast"              },
  { label: "Construction Dev",     icon: "🏗️", description: "Post-build deep cleans"            },
] as const;

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface HomeClientProps {
  companies: CompanyFull[];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
const TRUST_FLAGS = [
  { key: "is_insured"            as const, icon: ShieldCheck, label: "Insured"            },
  { key: "is_licensed"           as const, icon: BadgeCheck,  label: "Licensed"           },
  { key: "is_background_checked" as const, icon: UserCheck,   label: "Background Checked" },
];

export function HomeClient({ companies }: HomeClientProps) {
  const [query, setQuery]               = useState("");
  const [areaFilter, setAreaFilter]     = useState<ServiceArea | "">("");
  const [activeSpecs, setActiveSpecs]   = useState<Set<Specialization>>(new Set());
  const [trustFilters, setTrustFilters] = useState<Set<"is_insured" | "is_licensed" | "is_background_checked">>(new Set());

  // ---------- filtering logic ----------
  const filtered = companies.filter((c) => {
    if (
      query.trim() &&
      !c.name.toLowerCase().includes(query.toLowerCase()) &&
      !c.tagline?.toLowerCase().includes(query.toLowerCase()) &&
      !c.service_areas.some((a) =>
        a.toLowerCase().includes(query.toLowerCase())
      ) &&
      !c.specializations.some((s) =>
        s.toLowerCase().includes(query.toLowerCase())
      )
    ) {
      return false;
    }

    if (areaFilter && !c.service_areas.includes(areaFilter)) return false;

    if (activeSpecs.size > 0) {
      const hasAll = [...activeSpecs].every((s) =>
        c.specializations.includes(s)
      );
      if (!hasAll) return false;
    }

    for (const flag of trustFilters) {
      if (!c[flag]) return false;
    }

    return true;
  });

  const hasFilters =
    query.trim() !== "" || areaFilter !== "" || activeSpecs.size > 0 || trustFilters.size > 0;

  function toggleSpec(spec: Specialization) {
    setActiveSpecs((prev) => {
      const next = new Set(prev);
      next.has(spec) ? next.delete(spec) : next.add(spec);
      return next;
    });
  }

  function toggleTrust(key: "is_insured" | "is_licensed" | "is_background_checked") {
    setTrustFilters((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  function clearAll() {
    setQuery("");
    setAreaFilter("");
    setActiveSpecs(new Set());
    setTrustFilters(new Set());
  }

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 px-4 pb-20 pt-20 text-center sm:px-6 sm:pb-28 sm:pt-28">
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
            <MapPin className="size-3" />
            Canmore · Banff · Cochrane · Calgary
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Bow Valley&apos;s{" "}
            <span className="text-sky-400">Cleaning Matchmaker</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Stop searching. Find the right specialized cleaner for your STR,
            luxury property, or build — vetted, rated, and local to the
            Canadian Rockies.
          </p>

          <div className="mx-auto mt-8 flex max-w-md items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, area or specialty…"
                className="h-11 rounded-xl bg-white/10 pl-9 text-sm text-white placeholder:text-slate-400 border-white/20 focus-visible:border-sky-400 focus-visible:ring-sky-400/30"
              />
            </div>
            <Button
              size="sm"
              className="h-11 rounded-xl bg-sky-500 px-5 text-white hover:bg-sky-400 font-semibold"
            >
              Search
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm">
            {[
              { icon: <Star className="size-3.5 fill-amber-400 text-amber-400" />, text: "Avg. 4.8★ rating" },
              { icon: <MapPin className="size-3.5 text-sky-400" />, text: "6 local areas" },
              { icon: <Zap className="size-3.5 text-emerald-400" />, text: "Same-day turnovers" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-slate-400">
                {icon}
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* PERSONA QUICK FILTERS                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-b border-border bg-muted/30 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            I&apos;m looking for a cleaner for my…
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {PERSONAS.map(({ label, icon, description }) => (
              <button
                key={label}
                className="flex flex-col items-start gap-1 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-sky-400 hover:shadow-sm hover:shadow-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                <span className="text-xl">{icon}</span>
                <span className="text-sm font-semibold text-foreground leading-tight">
                  {label}
                </span>
                <span className="text-[11px] text-muted-foreground leading-snug">
                  {description}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FILTER CONTROLS                                                      */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-b border-border bg-background px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-6xl space-y-5">

          {/* Location select */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="shrink-0 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Location
            </span>
            <div className="flex flex-wrap gap-2">
              {SERVICE_AREAS.map((area) => (
                <button
                  key={area}
                  onClick={() =>
                    setAreaFilter((prev) => (prev === area ? "" : area))
                  }
                  aria-pressed={areaFilter === area}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
                    areaFilter === area
                      ? "border-sky-500 bg-sky-50 text-sky-700 shadow-sm"
                      : "border-border bg-background text-muted-foreground hover:border-sky-300 hover:text-foreground"
                  )}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {/* Specialization toggles */}
          <div className="flex flex-wrap items-start gap-3">
            <span className="mt-0.5 shrink-0 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Specialty
            </span>
            <div className="flex flex-wrap gap-2">
              {SPECIALIZATIONS.map((spec) => {
                const active = activeSpecs.has(spec);
                const colors = SPECIALIZATION_COLORS[spec];
                return (
                  <button
                    key={spec}
                    onClick={() => toggleSpec(spec)}
                    aria-pressed={active}
                    className={cn(
                      "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
                      active
                        ? `${colors.bg} ${colors.text} ${colors.ring} opacity-100 shadow-sm`
                        : "bg-muted text-muted-foreground ring-transparent hover:ring-border"
                    )}
                  >
                    {spec}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Trust & Safety toggles */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="shrink-0 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Trust &amp; Safety
            </span>
            <div className="flex flex-wrap gap-2">
              {TRUST_FLAGS.map(({ key, icon: Icon, label }) => {
                const active = trustFilters.has(key);
                return (
                  <button
                    key={key}
                    onClick={() => toggleTrust(key)}
                    aria-pressed={active}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-md border px-3 py-1 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
                      active
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm ring-1 ring-emerald-400"
                        : "border-border bg-background text-muted-foreground hover:border-emerald-300 hover:text-emerald-700"
                    )}
                  >
                    <Icon className="size-3 shrink-0" />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clear filters */}
          {hasFilters && (
            <button
              onClick={clearAll}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="size-3" />
              Clear all filters
            </button>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* COMPANY LISTING GRID                                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {hasFilters ? "Matching Cleaners" : "Top Cleaners Near You"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {filtered.length} verified{" "}
                {filtered.length === 1 ? "business" : "businesses"}
                {areaFilter ? ` in ${areaFilter}` : ""}
                {activeSpecs.size > 0
                  ? ` · ${activeSpecs.size} specialty filter${activeSpecs.size > 1 ? "s" : ""}`
                  : ""}
                {trustFilters.size > 0
                  ? ` · ${trustFilters.size} trust filter${trustFilters.size > 1 ? "s" : ""}`
                  : ""}
              </p>
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-20 text-center">
              <Search className="size-8 text-muted-foreground/40" />
              <p className="text-sm font-medium text-muted-foreground">
                No cleaners match your current filters.
              </p>
              <button
                onClick={clearAll}
                className="text-xs text-sky-600 underline-offset-2 hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
