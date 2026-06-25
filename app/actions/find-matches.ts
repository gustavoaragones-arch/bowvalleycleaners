"use server";

import { createAdminClient } from "@/lib/admin-supabase";
import type { Lead } from "@/types/lead";
import { COMPANY_FULL_SELECT, type CompanyFull } from "@/types/company";

// ---------------------------------------------------------------------------
// Property type → specialization keyword mapping.
// Used to score companies whose specializations overlap with the lead's need.
// ---------------------------------------------------------------------------
const PROPERTY_TYPE_TO_SPECS: Record<string, string[]> = {
  "Airbnb / STR":       ["Airbnb", "Property Management Support", "Deep Cleaning - Move outs"],
  "Luxury Residential": ["Luxury Properties", "Residential Homes", "Eco Friendly"],
  "Commercial":         ["Commercial Buildings"],
  "Post-Construction":  ["Post Construction", "Carpet Cleaning Specialists"],
};

export interface MatchResult {
  company: CompanyFull;
  score: number;        // higher = better match
  isSpecMatch: boolean; // true if at least one specialization matched
}

export interface FindMatchesResult {
  primary:  MatchResult[]; // location + specialization match
  fallback: MatchResult[]; // location match only (no spec overlap)
  total:    number;
}

export async function findMatches(lead: Lead): Promise<FindMatchesResult> {
  let supabase;
  try {
    supabase = createAdminClient();
  } catch (e) {
    throw new Error((e as Error).message);
  }

  // Fetch all active companies with their areas and specializations
  const { data, error } = await supabase
    .from("companies_full")
    .select(COMPANY_FULL_SELECT);

  if (error) throw new Error(`Database error: ${error.message}`);

  const companies = (data ?? []) as unknown as CompanyFull[];
  const targetSpecs = PROPERTY_TYPE_TO_SPECS[lead.property_type] ?? [];

  // -------------------------------------------------------------------------
  // Scoring
  // -------------------------------------------------------------------------
  const scored: MatchResult[] = [];

  for (const c of companies) {
    // Hard filter: must serve the lead's location
    const servesArea = c.service_areas.some(
      (a) => a.toLowerCase() === lead.location.toLowerCase()
    );
    if (!servesArea) continue;

    // Specialization overlap count
    const specMatches = c.specializations.filter((s) =>
      targetSpecs.some((t) => s.toLowerCase() === t.toLowerCase())
    ).length;

    const isSpecMatch = specMatches > 0;

    // Score formula:
    //   - 100 pts per matching specialization
    //   - 50 pts for is_featured
    //   - up to 49 pts for google_rating (rating × 10, max 5.0 → 50 pts but capped so it never beats a spec match)
    //   - preferred_provider name match: 200 pts bonus
    const score =
      specMatches * 100 +
      (c.is_featured ? 50 : 0) +
      Math.round((c.google_rating ?? 0) * 9) +
      (lead.preferred_provider &&
        c.name.toLowerCase().includes(lead.preferred_provider.toLowerCase())
        ? 200 : 0);

    scored.push({ company: c, score, isSpecMatch });
  }

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  const primary  = scored.filter((r) => r.isSpecMatch);
  const fallback = scored.filter((r) => !r.isSpecMatch);

  return { primary, fallback, total: scored.length };
}
