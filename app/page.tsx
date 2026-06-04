import { Search, Star, MapPin, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CompanyCard } from "@/components/CompanyCard";
import { type CompanyFull } from "@/types/company";

// ---------------------------------------------------------------------------
// Mock data — replace with Supabase query in Phase 2
// ---------------------------------------------------------------------------
const MOCK_COMPANIES: CompanyFull[] = [
  {
    id: "1",
    created_at: new Date().toISOString(),
    name: "Peak Sparkle Cleaning Co.",
    slug: "peak-sparkle-cleaning-co",
    tagline: "Canmore's most trusted STR turnover specialists.",
    google_rating: 4.9,
    review_count: 134,
    years_in_business: 7,
    website_url: "https://example.com",
    phone_number: "+14035550101",
    email: null,
    logo_url: null,
    is_featured: true,
    is_active: true,
    service_areas: ["Canmore", "Banff", "Dead Man's Flats"],
    specializations: [
      "Airbnb Specialist",
      "Same Day Turnover",
      "Laundry Included",
      "Property Management Support",
    ],
  },
  {
    id: "2",
    created_at: new Date().toISOString(),
    name: "Bow Valley Pristine",
    slug: "bow-valley-pristine",
    tagline: "Eco-friendly luxury home cleaning for discerning owners.",
    google_rating: 4.7,
    review_count: 89,
    years_in_business: 4,
    website_url: "https://example.com",
    phone_number: "+14035550202",
    email: null,
    logo_url: null,
    is_featured: false,
    is_active: true,
    service_areas: ["Canmore", "Cochrane"],
    specializations: ["Luxury Homes", "Eco Friendly"],
  },
  {
    id: "3",
    created_at: new Date().toISOString(),
    name: "Summit Fresh Services",
    slug: "summit-fresh-services",
    tagline: "Post-construction & commercial cleaning across the Rockies.",
    google_rating: 4.8,
    review_count: 61,
    years_in_business: 9,
    website_url: "https://example.com",
    phone_number: "+14035550303",
    email: null,
    logo_url: null,
    is_featured: false,
    is_active: true,
    service_areas: ["Canmore", "Banff", "Exshaw", "Calgary"],
    specializations: ["Post Construction", "Commercial"],
  },
];

// ---------------------------------------------------------------------------
// Persona quick-filters (visual only in Phase 1)
// ---------------------------------------------------------------------------
const PERSONAS = [
  { label: "STR Property Manager", icon: "🏠", description: "Reliable turnovers, every booking" },
  { label: "Luxury Homeowner", icon: "✨", description: "White-glove residential care" },
  { label: "New Airbnb Host", icon: "🗝️", description: "Get guest-ready fast" },
  { label: "Construction Developer", icon: "🏗️", description: "Post-build deep cleans" },
] as const;

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* ------------------------------------------------------------------ */}
      {/* HEADER                                                               */}
      {/* ------------------------------------------------------------------ */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="/" className="flex items-center gap-2 select-none">
            <span className="flex size-7 items-center justify-center rounded-lg bg-sky-600 text-xs font-black text-white">
              BV
            </span>
            <span className="text-sm font-semibold tracking-tight text-foreground hidden sm:block">
              BowValleyCleaners
            </span>
          </a>
          <nav className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-xs">
              For Cleaners
            </Button>
            <Button size="sm" className="bg-sky-600 text-white hover:bg-sky-700 text-xs">
              List Your Business
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* ---------------------------------------------------------------- */}
        {/* HERO                                                              */}
        {/* ---------------------------------------------------------------- */}
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 px-4 pb-20 pt-20 text-center sm:px-6 sm:pb-28 sm:pt-28">
          {/* Subtle mountain silhouette texture */}
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
            {/* Eyebrow */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-300">
              <MapPin className="size-3" />
              Canmore · Banff · Cochrane · Calgary
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Bow Valley&apos;s{" "}
              <span className="text-sky-400">Cleaning Matchmaker</span>
            </h1>

            {/* Subheadline */}
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Stop searching. Find the right specialized cleaner for your STR,
              luxury property, or build — vetted, rated, and local to the
              Canadian Rockies.
            </p>

            {/* Search bar */}
            <div className="mx-auto mt-8 flex max-w-md items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by area or specialty…"
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

            {/* Trust stats */}
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

        {/* ---------------------------------------------------------------- */}
        {/* PERSONA QUICK FILTERS                                             */}
        {/* ---------------------------------------------------------------- */}
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

        {/* ---------------------------------------------------------------- */}
        {/* COMPANY LISTING GRID                                              */}
        {/* ---------------------------------------------------------------- */}
        <section className="px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Top Cleaners Near You
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {MOCK_COMPANIES.length} verified businesses · sorted by rating
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {MOCK_COMPANIES.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ------------------------------------------------------------------ */}
      {/* FOOTER                                                              */}
      {/* ------------------------------------------------------------------ */}
      <footer className="border-t border-border bg-muted/20 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-6xl flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-xs font-semibold text-foreground">BowValleyCleaners.ca</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Operated by Albor Digital (Canada) — Canmore, AB
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground sm:justify-end">
            <a href="/about" className="hover:text-foreground transition-colors">About</a>
            <a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-foreground transition-colors">Terms of Use</a>
            <a href="/contact" className="hover:text-foreground transition-colors">Contact</a>
          </nav>
        </div>
        <p className="mx-auto mt-4 max-w-6xl text-center text-[10px] text-muted-foreground/60 sm:text-left">
          © {new Date().getFullYear()} Albor Digital (Canada). All rights reserved. BowValleyCleaners.ca is an independent directory and is not affiliated with any listed business.
        </p>
      </footer>
    </div>
  );
}
