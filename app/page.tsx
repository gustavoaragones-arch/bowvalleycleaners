import { supabase } from "@/lib/supabase";
import { HomeClient } from "@/components/HomeClient";
import type { CompanyFull } from "@/types/company";

// Mock data used when Supabase credentials are not yet configured
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

async function getCompanies(): Promise<CompanyFull[]> {
  // Return mock data if env vars aren't wired yet
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL.includes("YOUR_PROJECT_REF")
  ) {
    return MOCK_COMPANIES;
  }

  const { data, error } = await supabase
    .from("companies_full")
    .select("*")
    .order("is_featured", { ascending: false })
    .order("google_rating", { ascending: false });

  if (error) {
    console.error("Supabase error:", error.message);
    return MOCK_COMPANIES;
  }

  return (data ?? []) as CompanyFull[];
}

export default async function HomePage() {
  const companies = await getCompanies();

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
            <a
              href="/for-cleaners"
              className="rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              For Cleaners
            </a>
            <a
              href="/add-business"
              className="rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-700 transition-colors"
            >
              List Your Business
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <HomeClient companies={companies} />
      </main>
    </div>
  );
}
