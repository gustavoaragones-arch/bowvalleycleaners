/**
 * BowValleyCleaners.ca — CSV Seed Script
 *
 * Usage:
 *   1. Place your CSV at scripts/companies.csv  (or pass a path via --file)
 *   2. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your shell or .env.local
 *   3. Run:  npx tsx scripts/seed.ts
 *            npx tsx scripts/seed.ts --file ./data/my-file.csv --dry-run
 *
 * Required CSV columns (header row must be present, order doesn't matter):
 *   name, tagline, google_rating, review_count, years_in_business,
 *   website_url, phone_number, email, logo_url, is_featured,
 *   service_areas, specializations
 *
 * `slug` is optional — it will be auto-generated from `name` if omitted.
 *
 * Multi-value columns use pipe-separated values:
 *   service_areas   → "Canmore|Banff|Cochrane"
 *   specializations → "Airbnb Specialist|Luxury Homes"
 *
 * Valid service_areas:
 *   Canmore, Banff, Dead Man's Flats, Exshaw, Cochrane, Calgary
 *
 * Valid specializations:
 *   Airbnb Specialist, Luxury Homes, Commercial, Post Construction,
 *   Eco Friendly, Laundry Included, Property Management Support, Same Day Turnover
 */

import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type ServiceArea =
  | "Canmore"
  | "Banff"
  | "Dead Man's Flats"
  | "Exshaw"
  | "Cochrane"
  | "Calgary";

type Specialization =
  | "Airbnb"
  | "Residential Homes"
  | "Luxury Properties"
  | "Deep Cleaning - Move outs"
  | "Post Construction"
  | "Commercial Buildings"
  | "Pet-Friendly Cleaning"
  | "Carpet Cleaning Specialists"
  | "Property Management Support"
  | "Eco Friendly";

const VALID_AREAS = new Set<string>([
  "Canmore",
  "Banff",
  "Dead Man's Flats",
  "Exshaw",
  "Cochrane",
  "Calgary",
]);

const VALID_SPECS = new Set<string>([
  "Airbnb",
  "Residential Homes",
  "Luxury Properties",
  "Deep Cleaning - Move outs",
  "Post Construction",
  "Commercial Buildings",
  "Pet-Friendly Cleaning",
  "Carpet Cleaning Specialists",
  "Property Management Support",
  "Eco Friendly",
]);

interface CsvRow {
  name: string;
  slug?: string;
  tagline?: string;
  google_rating?: string;
  review_count?: string;
  years_in_business?: string;
  website_url?: string;
  phone_number?: string;
  email?: string;
  logo_url?: string;
  is_featured?: string;
  is_insured?: string;
  is_licensed?: string;
  is_background_checked?: string;
  business_type?: string;   // 'Cleaning Contractor' | 'Cleaning Company' | blank
  service_areas?: string;
  specializations?: string;
}

// ---------------------------------------------------------------------------
// CSV parser — handles quoted fields with commas inside
// ---------------------------------------------------------------------------
function parseCsv(raw: string): CsvRow[] {
  const lines = raw.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  const headers = splitCsvLine(lines[0]).map((h) => h.trim().toLowerCase());

  return lines
    .slice(1)
    .filter((l) => l.trim().length > 0)
    .map((line) => {
      const values = splitCsvLine(line);
      const row: Record<string, string> = {};
      headers.forEach((h, i) => {
        row[h] = (values[i] ?? "").trim();
      });
      return row as unknown as CsvRow;
    });
}

function splitCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Generates a URL-safe slug from any company name. */
function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")                  // decompose accented chars
    .replace(/[\u0300-\u036f]/g, "")   // strip accent marks
    .replace(/[^a-z0-9\s-]/g, "")     // remove non-alphanumeric (keeps spaces & hyphens)
    .trim()
    .replace(/\s+/g, "-")             // spaces → hyphens
    .replace(/-+/g, "-");             // collapse repeated hyphens
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------
/** Maps common raw strings to canonical service area enum values. */
function normalizeArea(raw: string): ServiceArea | null {
  const s = raw.trim().toLowerCase();
  if (s === "canmore")                                          return "Canmore";
  if (s === "banff")                                           return "Banff";
  if (["dead man's flats", "dead mans flats", "deadman's flats", "dead man flats"].includes(s))
                                                               return "Dead Man's Flats";
  if (s === "exshaw")                                          return "Exshaw";
  if (s === "cochrane")                                        return "Cochrane";
  if (s === "calgary")                                         return "Calgary";
  return null;
}

function parseAreas(raw: string): ServiceArea[] {
  if (!raw) return [];
  // Accept both pipe-separated (canonical) and comma-separated (common CSV export)
  const separator = raw.includes("|") ? "|" : ",";
  const results: ServiceArea[] = [];

  for (const part of raw.split(separator)) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    // Expand "Bow Valley" regional alias → Canmore + Banff
    if (["bow valley", "the bow valley", "bow valley corridor"].includes(trimmed.toLowerCase())) {
      for (const town of ["Canmore", "Banff"] as ServiceArea[]) {
        if (!results.includes(town)) results.push(town);
      }
      continue;
    }

    const canon = normalizeArea(trimmed);
    if (canon) {
      if (!results.includes(canon)) results.push(canon);
    } else {
      console.warn(`  ⚠  Unknown service_area: "${trimmed}" — skipped`);
    }
  }
  return results;
}

function parseSpecs(raw: string): Specialization[] {
  if (!raw) return [];
  return raw
    .split("|")
    .map((s) => s.trim())
    .filter((s) => {
      if (!VALID_SPECS.has(s)) {
        console.warn(`  ⚠  Unknown specialization: "${s}" — skipped`);
        return false;
      }
      return true;
    }) as Specialization[];
}

/**
 * Permissive boolean parser.
 * Truthy:  'true', 'TRUE', 'yes', 'Yes', 'YES', '1', 'y', 'Y'
 * Falsy:   'false', 'FALSE', 'no', 'No', '0', 'n', 'N', empty, or any
 *          unrecognised string (e.g. "Not explicitly stated online")
 */
function parseBool(raw: string | undefined): boolean {
  return ["true", "1", "yes", "y"].includes((raw ?? "").trim().toLowerCase());
}

function parseBusinessType(raw: string | undefined): "Cleaning Contractor" | "Cleaning Company" | null {
  const val = (raw ?? "").trim();
  if (val === "Cleaning Contractor" || val === "Cleaning Company") return val;
  if (val !== "") {
    console.warn(`  ⚠  Unknown business_type: "${val}" — set to NULL`);
  }
  return null;
}

function parseNum(raw: string | undefined): number | null {
  if (!raw || raw.trim() === "") return null;
  const n = Number(raw.trim());
  return isNaN(n) ? null : n;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const args = process.argv.slice(2);
  const fileArgIdx = args.indexOf("--file");
  const csvPath =
    fileArgIdx >= 0 && args[fileArgIdx + 1]
      ? path.resolve(args[fileArgIdx + 1])
      : path.resolve(__dirname, "companies.csv");

  const isDryRun = args.includes("--dry-run");

  if (!fs.existsSync(csvPath)) {
    console.error(`❌  CSV file not found: ${csvPath}`);
    console.error(`    Place it at scripts/companies.csv or pass --file <path>`);
    process.exit(1);
  }

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error(
      "❌  Missing environment variables.\n" +
      "    Required: SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) + SUPABASE_SERVICE_ROLE_KEY\n" +
      "    The service role key bypasses RLS and is required for seeding.\n" +
      "    Find it in: Supabase Dashboard → Project Settings → API → service_role (secret)"
    );
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const raw = fs.readFileSync(csvPath, "utf-8");
  const rows = parseCsv(raw);

  console.log(`\n📄  Parsed ${rows.length} rows from ${csvPath}`);
  if (isDryRun) console.log("🔍  DRY RUN — no writes will occur\n");

  let inserted = 0;
  let skipped = 0;

  for (const row of rows) {
    if (!row.name) {
      console.warn(`  ⚠  Skipping row — missing required field "name":`, row);
      skipped++;
      continue;
    }

    const slug = row.slug?.trim() || slugify(row.name);

    const company = {
      name: row.name,
      slug,
      tagline: row.tagline || null,
      google_rating: parseNum(row.google_rating),
      review_count: parseNum(row.review_count) ?? 0,
      years_in_business: parseNum(row.years_in_business),
      website_url: row.website_url || null,
      phone_number: row.phone_number || null,
      email: row.email || null,
      logo_url: row.logo_url || null,
      is_featured: parseBool(row.is_featured),
      is_insured: parseBool(row.is_insured),
      is_licensed: parseBool(row.is_licensed),
      is_background_checked: parseBool(row.is_background_checked),
      business_type: parseBusinessType(row.business_type),
      is_active: true,
    };

    const areas = parseAreas(row.service_areas ?? "");
    const specs = parseSpecs(row.specializations ?? "");

    const slugSource = row.slug?.trim() ? "csv" : "auto";
    console.log(`  ✦  ${company.name}  →  slug: "${slug}" (${slugSource})`);
    console.log(`     areas: [${areas.join(", ")}]`);
    console.log(`     specs: [${specs.join(", ")}]`);

    if (isDryRun) {
      inserted++;
      continue;
    }

    // Upsert company (on slug conflict → update)
    const { data: upserted, error: companyErr } = await supabase
      .from("companies")
      .upsert(company, { onConflict: "slug" })
      .select("id")
      .single();

    if (companyErr || !upserted) {
      console.error(`     ❌  Company insert failed:`, companyErr?.message);
      skipped++;
      continue;
    }

    const companyId = upserted.id;

    // Delete existing area / spec rows then re-insert (idempotent)
    await supabase
      .from("company_service_areas")
      .delete()
      .eq("company_id", companyId);

    await supabase
      .from("company_specializations")
      .delete()
      .eq("company_id", companyId);

    if (areas.length > 0) {
      const { error: areaErr } = await supabase
        .from("company_service_areas")
        .insert(areas.map((area) => ({ company_id: companyId, area })));

      if (areaErr) {
        console.error(`     ⚠  Service areas insert failed:`, areaErr.message);
      }
    }

    if (specs.length > 0) {
      const { error: specErr } = await supabase
        .from("company_specializations")
        .insert(specs.map((specialization) => ({ company_id: companyId, specialization })));

      if (specErr) {
        console.error(`     ⚠  Specializations insert failed:`, specErr.message);
      }
    }

    inserted++;
  }

  console.log(
    `\n${isDryRun ? "🔍 DRY RUN complete" : "✅ Seed complete"} — ${inserted} inserted/updated, ${skipped} skipped.\n`
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
