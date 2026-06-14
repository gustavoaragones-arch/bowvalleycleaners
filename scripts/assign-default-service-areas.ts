/**
 * Assign default Bow Valley service areas to companies with none.
 *
 * Usage:
 *   npx tsx scripts/assign-default-service-areas.ts
 *   npx tsx scripts/assign-default-service-areas.ts --dry-run
 */

import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const DEFAULT_AREAS = [
  "Canmore",
  "Banff",
  "Dead Man's Flats",
  "Exshaw",
] as const;

function loadEnvLocal() {
  const envPath = path.resolve(__dirname, "../.env.local");
  if (!fs.existsSync(envPath)) return;

  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

async function main() {
  loadEnvLocal();

  const isDryRun = process.argv.includes("--dry-run");
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error(
      "❌  Missing NEXT_PUBLIC_SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY in .env.local"
    );
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const { data: companies, error: fetchErr } = await supabase
    .from("companies")
    .select("id, name, slug");

  if (fetchErr) {
    console.error("❌  Failed to fetch companies:", fetchErr.message);
    process.exit(1);
  }

  const { data: existingAreas, error: areasErr } = await supabase
    .from("company_service_areas")
    .select("company_id");

  if (areasErr) {
    console.error("❌  Failed to fetch service areas:", areasErr.message);
    process.exit(1);
  }

  const companiesWithAreas = new Set(
    (existingAreas ?? []).map((row) => row.company_id)
  );

  const targets = (companies ?? []).filter(
    (c) => !companiesWithAreas.has(c.id)
  );

  console.log(`\n📍  Default areas: ${DEFAULT_AREAS.join(", ")}`);
  console.log(`📊  Companies in database: ${companies?.length ?? 0}`);
  console.log(`🎯  Companies with empty service areas: ${targets.length}`);
  if (isDryRun) console.log("🔍  DRY RUN — no writes will occur\n");

  if (targets.length === 0) {
    console.log("✅  Nothing to do — all companies already have service areas.\n");
    return;
  }

  let inserted = 0;

  for (const company of targets) {
    const rows = DEFAULT_AREAS.map((area) => ({
      company_id: company.id,
      area,
    }));

    console.log(`  ✦  ${company.name} (${company.slug})`);

    if (isDryRun) {
      inserted += rows.length;
      continue;
    }

    const { error: insertErr } = await supabase
      .from("company_service_areas")
      .upsert(rows, { onConflict: "company_id,area", ignoreDuplicates: true });

    if (insertErr) {
      console.error(`     ❌  Insert failed: ${insertErr.message}`);
      continue;
    }

    inserted += rows.length;
  }

  console.log(
    `\n${isDryRun ? "🔍 DRY RUN complete" : "✅ Done"} — ${inserted} area row(s) ${
      isDryRun ? "would be" : ""
    } assigned across ${targets.length} companies.\n`
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
