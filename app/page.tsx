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
    email: "hello@peaksparkle.ca",
    logo_url: null,
    is_featured: true,
    is_active: true,
    is_insured: true,
    is_licensed: true,
    is_background_checked: false,
    service_areas: ["Canmore", "Banff", "Dead Man's Flats"],
    specializations: [
      "Airbnb",
      "Property Management Support",
      "Deep Cleaning - Move outs",
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
    email: "info@bowvalleypristine.ca",
    logo_url: null,
    is_featured: false,
    is_active: true,
    is_insured: true,
    is_licensed: false,
    is_background_checked: true,
    service_areas: ["Canmore", "Cochrane"],
    specializations: ["Luxury Properties", "Eco Friendly", "Residential Homes"],
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
    is_insured: false,
    is_licensed: true,
    is_background_checked: false,
    service_areas: ["Canmore", "Banff", "Exshaw", "Calgary"],
    specializations: ["Post Construction", "Commercial Buildings", "Carpet Cleaning Specialists"],
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
    <main className="flex-1">
      <HomeClient companies={companies} />
    </main>
  );
}
