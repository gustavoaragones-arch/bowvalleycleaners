import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client using the service role key.
 * This bypasses Row Level Security — use ONLY in Server Components
 * and Server Actions. Never import this in client components.
 */
export function createAdminClient() {
  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key  = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key || key === "your-service-role-key-here") {
    throw new Error(
      "Admin Supabase client requires SUPABASE_SERVICE_ROLE_KEY.\n" +
      "Add it to .env.local (Supabase Dashboard → Project Settings → API → service_role)."
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
