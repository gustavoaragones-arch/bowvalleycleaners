/**
 * Apply supabase/migration_companies_full_is_local.sql to the remote database.
 *
 * Requires SUPABASE_DB_URL (or DATABASE_URL) in .env.local — the direct Postgres
 * connection string from Supabase Dashboard → Project Settings → Database.
 *
 * Usage: npx tsx scripts/apply-companies-full-view.ts
 */

import fs from "fs";
import path from "path";
import pg from "pg";

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

  let connectionString =
    process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;

  if (!connectionString) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const dbPassword = process.env.SUPABASE_DB_PASSWORD;
    const projectRef = supabaseUrl?.match(/https:\/\/([^.]+)\./)?.[1];

    if (projectRef && dbPassword) {
      connectionString = `postgresql://postgres.${projectRef}:${encodeURIComponent(dbPassword)}@aws-0-ca-central-1.pooler.supabase.com:6543/postgres`;
    }
  }

  if (!connectionString) {
    console.error(
      "❌  Missing database connection.\n" +
        "    Set SUPABASE_DB_URL, DATABASE_URL, or SUPABASE_DB_PASSWORD in .env.local.\n" +
        "    Password: Supabase Dashboard → Project Settings → Database.\n" +
        "    Or run supabase/migration_companies_full_is_local.sql in the SQL Editor."
    );
    process.exit(1);
  }

  const sqlPath = path.resolve(
    __dirname,
    "../supabase/migration_companies_full_is_local.sql"
  );
  const sql = fs.readFileSync(sqlPath, "utf-8");

  const client = new pg.Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    await client.query(sql);
    console.log("✅  companies_full view rebuilt with is_local column.\n");
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("❌  Migration failed:", err.message);
  process.exit(1);
});
