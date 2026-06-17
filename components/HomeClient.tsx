"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { SearchBar, type SearchQuery } from "@/components/SearchBar";
import { QuickFilters } from "@/components/QuickFilters";
import { DirectorySidebar, type SidebarItem } from "@/components/DirectorySidebar";
import { CompanyCard } from "@/components/CompanyCard";
import { TrustBar } from "@/components/TrustBar";
import type { CompanyFull, ServiceArea, Specialization } from "@/types/company";

const SERVICE_AREAS: ServiceArea[] = [
  "Canmore",
  "Banff",
  "Dead Man's Flats",
  "Exshaw",
  "Cochrane",
  "Calgary",
];

const LOCATION_KEYS: Record<string, ServiceArea | null> = {
  all: null,
  canmore: "Canmore",
  banff: "Banff",
  dmf: "Dead Man's Flats",
  exshaw: "Exshaw",
  cochrane: "Cochrane",
  calgary: "Calgary",
};

const SPECIALTY_KEYS: Record<string, Specialization> = {
  airbnb: "Airbnb",
  luxury: "Luxury Properties",
  post: "Post Construction",
  deep: "Deep Cleaning - Move outs",
  eco: "Eco Friendly",
  carpet: "Carpet Cleaning Specialists",
  commercial: "Commercial Buildings",
};

const SEARCH_SPECIALTY: Record<string, Specialization | null> = {
  "Any specialty": null,
  "Airbnb / STR Turnover": "Airbnb",
  "Post-Construction": "Post Construction",
  "Luxury Home": "Luxury Properties",
  "Deep Clean / Move-out": "Deep Cleaning - Move outs",
  "Eco-Friendly": "Eco Friendly",
  "Carpet Cleaning": "Carpet Cleaning Specialists",
  Commercial: "Commercial Buildings",
};

const CLIENT_TYPE_SPECS: Record<string, Specialization[]> = {
  "Any client type": [],
  "STR Property Manager": ["Property Management Support", "Airbnb"],
  "Luxury Homeowner": ["Luxury Properties"],
  "New Airbnb Host": ["Airbnb"],
  "Construction Developer": ["Post Construction"],
};

const QUICK_SPEC_MAP: Record<string, Specialization[]> = {
  "same-day": ["Airbnb", "Property Management Support"],
  eco: ["Eco Friendly"],
  carpet: ["Carpet Cleaning Specialists"],
  post: ["Post Construction"],
};

interface HomeClientProps {
  companies: CompanyFull[];
}

function countByArea(companies: CompanyFull[], area: ServiceArea | null) {
  if (!area) return companies.length;
  return companies.filter((c) => c.service_areas.includes(area)).length;
}

function countBySpec(companies: CompanyFull[], spec: Specialization) {
  return companies.filter((c) => c.specializations.includes(spec)).length;
}

function countByTrust(companies: CompanyFull[], key: "insured" | "licensed" | "bg") {
  const map = { insured: "is_insured", licensed: "is_licensed", bg: "is_background_checked" } as const;
  return companies.filter((c) => c[map[key]]).length;
}

function countByRating(companies: CompanyFull[], min: number | null) {
  if (min === null) return companies.length;
  return companies.filter((c) => (c.google_rating ?? 0) >= min).length;
}

export function HomeClient({ companies }: HomeClientProps) {
  const [searchQuery, setSearchQuery] = useState<SearchQuery | null>(null);
  const [activeQuickFilters, setActiveQuickFilters] = useState<string[]>(["all"]);
  const [sidebarFilters, setSidebarFilters] = useState<Record<string, string[]>>({
    locations: ["all"],
    specialties: [],
    trust: [],
    ratings: ["rany"],
  });
  const [sortOrder, setSortOrder] = useState("rating");

  const avgRating = useMemo(() => {
    const rated = companies.filter((c) => c.google_rating != null);
    if (rated.length === 0) return "—";
    const avg =
      rated.reduce((sum, c) => sum + (c.google_rating ?? 0), 0) / rated.length;
    return `${avg.toFixed(1)}★`;
  }, [companies]);

  const sidebarData = useMemo(() => {
    const locationItems: SidebarItem[] = [
      { label: "All areas", key: "all", count: companies.length },
      { label: "Canmore", key: "canmore", count: countByArea(companies, "Canmore") },
      { label: "Banff", key: "banff", count: countByArea(companies, "Banff") },
      { label: "Dead Man's Flats", key: "dmf", count: countByArea(companies, "Dead Man's Flats") },
      { label: "Exshaw", key: "exshaw", count: countByArea(companies, "Exshaw") },
      { label: "Cochrane", key: "cochrane", count: countByArea(companies, "Cochrane") },
      { label: "Calgary", key: "calgary", count: countByArea(companies, "Calgary") },
    ];

    const specialtyItems: SidebarItem[] = Object.entries(SPECIALTY_KEYS).map(
      ([key, spec]) => ({
        label: spec,
        key,
        count: countBySpec(companies, spec),
      })
    );

    const trustItems: SidebarItem[] = [
      { label: "Insured", key: "insured", count: countByTrust(companies, "insured") },
      { label: "Licensed", key: "licensed", count: countByTrust(companies, "licensed") },
      { label: "Background checked", key: "bg", count: countByTrust(companies, "bg") },
    ];

    const ratingItems: SidebarItem[] = [
      { label: "5.0 ★ only", key: "r5", count: countByRating(companies, 4.95) },
      { label: "4.8 ★ & above", key: "r48", count: countByRating(companies, 4.8) },
      { label: "Any rating", key: "rany", count: companies.length },
    ];

    return { locationItems, specialtyItems, trustItems, ratingItems };
  }, [companies]);

  const filteredCompanies = useMemo(() => {
    let result = [...companies];

    // Search bar
    if (searchQuery) {
      const area =
        searchQuery.location === "All areas"
          ? null
          : (searchQuery.location as ServiceArea);
      const searchSpec = SEARCH_SPECIALTY[searchQuery.specialty] ?? null;
      const clientSpecs = CLIENT_TYPE_SPECS[searchQuery.clientType] ?? [];

      if (area) {
        result = result.filter((c) => c.service_areas.includes(area));
      }
      if (searchSpec) {
        result = result.filter((c) => c.specializations.includes(searchSpec));
      }
      if (clientSpecs.length > 0) {
        result = result.filter((c) =>
          clientSpecs.some((s) => c.specializations.includes(s))
        );
      }
    }

    // Sidebar: location (single)
    const locKey = sidebarFilters.locations?.[0] ?? "all";
    const locArea = LOCATION_KEYS[locKey];
    if (locArea) {
      result = result.filter((c) => c.service_areas.includes(locArea));
    }

    // Sidebar: specialties (OR)
    const specKeys = sidebarFilters.specialties ?? [];
    if (specKeys.length > 0) {
      const specs = specKeys
        .map((k) => SPECIALTY_KEYS[k])
        .filter(Boolean) as Specialization[];
      if (specs.length > 0) {
        result = result.filter((c) =>
          specs.some((s) => c.specializations.includes(s))
        );
      }
    }

    // Sidebar: trust (AND)
    for (const key of sidebarFilters.trust ?? []) {
      if (key === "insured") result = result.filter((c) => c.is_insured);
      if (key === "licensed") result = result.filter((c) => c.is_licensed);
      if (key === "bg") result = result.filter((c) => c.is_background_checked);
    }

    // Sidebar: rating (single)
    const ratingKey = sidebarFilters.ratings?.[0] ?? "rany";
    if (ratingKey === "r5") {
      result = result.filter((c) => (c.google_rating ?? 0) >= 4.95);
    } else if (ratingKey === "r48") {
      result = result.filter((c) => (c.google_rating ?? 0) >= 4.8);
    }

    // Quick filters
    const quick = activeQuickFilters.filter((k) => k !== "all");
    for (const key of quick) {
      if (key === "insured") {
        result = result.filter((c) => c.is_insured);
      } else if (key === "bg-checked") {
        result = result.filter((c) => c.is_background_checked);
      } else if (QUICK_SPEC_MAP[key]) {
        const specs = QUICK_SPEC_MAP[key];
        result = result.filter((c) =>
          specs.some((s) => c.specializations.includes(s))
        );
      }
    }

    // Sort
    result.sort((a, b) => {
      if (sortOrder === "featured") {
        if (a.is_featured !== b.is_featured) return a.is_featured ? -1 : 1;
      }
      if (sortOrder === "reviews") {
        return (b.review_count ?? 0) - (a.review_count ?? 0);
      }
      return (b.google_rating ?? 0) - (a.google_rating ?? 0);
    });

    return result;
  }, [companies, searchQuery, sidebarFilters, activeQuickFilters, sortOrder]);

  function handleSidebarChange(section: string, keys: string[]) {
    setSidebarFilters((prev) => ({ ...prev, [section]: keys }));
  }

  function handleSearch(q: SearchQuery) {
    setSearchQuery(q);
    document.getElementById("directory-results")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <div style={{ backgroundColor: "var(--bv-snow)", minHeight: "100vh" }}>
      <HeroSection
        providerCount={companies.length}
        avgRating={avgRating}
        areaCount={SERVICE_AREAS.length}
      />
      <SearchBar onSearch={handleSearch} />
      <QuickFilters active={activeQuickFilters} onChange={setActiveQuickFilters} />

      <div className="bv-container" id="directory-results">
        <div className="flex gap-0">
        <DirectorySidebar
          locationItems={sidebarData.locationItems}
          specialtyItems={sidebarData.specialtyItems}
          trustItems={sidebarData.trustItems}
          ratingItems={sidebarData.ratingItems}
          filters={sidebarFilters}
          onFiltersChange={handleSidebarChange}
        />

        <main className="flex-1 min-w-0 p-5" style={{ backgroundColor: "var(--bv-snow)" }}>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 mb-4">
            <p className="text-[12px]" style={{ color: "var(--bv-slate)" }}>
              <strong style={{ color: "var(--bv-summit)" }}>
                {filteredCompanies.length}
              </strong>{" "}
              verified businesses in the Bow Valley
            </p>
            <select
              className="text-[11px] border rounded px-2.5 py-1 self-start"
              style={{ borderColor: "#C5CEBC", color: "var(--bv-granite)" }}
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="rating">Sort: Top rated</option>
              <option value="reviews">Sort: Most reviewed</option>
              <option value="featured">Sort: Featured first</option>
            </select>
          </div>

          {filteredCompanies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[880px]">
              {filteredCompanies.map((company) => (
                <CompanyCard
                  key={company.id}
                  company={company}
                  featured={company.is_featured}
                />
              ))}
            </div>
          ) : (
            <div
              className="flex flex-col items-center gap-3 rounded-xl border border-dashed py-16 text-center"
              style={{ borderColor: "var(--bv-border)" }}
            >
              <Search className="size-8 opacity-30" style={{ color: "var(--bv-slate)" }} />
              <p className="text-sm font-medium" style={{ color: "var(--bv-slate)" }}>
                No cleaners match your current filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery(null);
                  setActiveQuickFilters(["all"]);
                  setSidebarFilters({
                    locations: ["all"],
                    specialties: [],
                    trust: [],
                    ratings: ["rany"],
                  });
                }}
                className="text-xs hover:underline"
                style={{ color: "var(--bv-amber)" }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
        </div>
      </div>

      <TrustBar />
    </div>
  );
}
