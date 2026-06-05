import type { Metadata } from "next";
import { createAdminClient } from "@/lib/admin-supabase";
import { LeadsTable } from "@/components/admin/LeadsTable";
import type { Lead, LeadStatus } from "@/types/lead";
import { Inbox, RefreshCw } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Leads Dashboard | BowValleyCleaners Admin",
  robots: { index: false, follow: false },
};

// Always fetch fresh — this is an admin data page, not a public cached page
export const dynamic = "force-dynamic";

// ---------------------------------------------------------------------------
// Status counts summary bar
// ---------------------------------------------------------------------------
const STATUS_ORDER: LeadStatus[] = ["new", "contacted", "matched", "distributed", "closed"];

const STATUS_SUMMARY_CONFIG: Record<LeadStatus, { label: string; dot: string }> = {
  new:         { label: "New",         dot: "bg-sky-500"     },
  contacted:   { label: "Contacted",   dot: "bg-amber-500"   },
  matched:     { label: "Matched",     dot: "bg-emerald-500" },
  distributed: { label: "Distributed", dot: "bg-violet-500"  },
  closed:      { label: "Closed",      dot: "bg-slate-400"   },
};

async function fetchLeads(): Promise<Lead[]> {
  let supabase;
  try {
    supabase = createAdminClient();
  } catch {
    return [];
  }

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Admin leads fetch error:", error.message);
    return [];
  }

  return (data ?? []) as Lead[];
}

export default async function AdminLeadsPage() {
  const leads = await fetchLeads();

  const counts = STATUS_ORDER.reduce(
    (acc, s) => ({ ...acc, [s]: leads.filter((l) => l.status === s).length }),
    {} as Record<LeadStatus, number>
  );

  const isConfigured =
    !!process.env.SUPABASE_SERVICE_ROLE_KEY &&
    process.env.SUPABASE_SERVICE_ROLE_KEY !== "your-service-role-key-here";

  return (
    <div className="min-h-screen bg-muted/20">
      {/* ------------------------------------------------------------------ */}
      {/* ADMIN HEADER                                                         */}
      {/* ------------------------------------------------------------------ */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-1.5 select-none">
              <span className="flex size-6 items-center justify-center rounded-md bg-sky-600 text-[10px] font-black text-white">
                BV
              </span>
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm font-semibold text-foreground">Admin</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm text-muted-foreground">Leads</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <RefreshCw className="size-3" />
            Live data — refreshes on status change
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* ---------------------------------------------------------------- */}
        {/* PAGE TITLE + SUMMARY                                              */}
        {/* ---------------------------------------------------------------- */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-xl font-bold text-foreground">
              <Inbox className="size-5 text-sky-600" />
              Matchmaker Leads
            </h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {leads.length} total submission{leads.length !== 1 ? "s" : ""} ·
              sorted newest first
            </p>
          </div>

          {/* Status summary pills */}
          <div className="flex flex-wrap gap-2">
            {STATUS_ORDER.map((s) => (
              <div
                key={s}
                className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs"
              >
                <span className={`size-2 rounded-full ${STATUS_SUMMARY_CONFIG[s].dot}`} />
                <span className="font-medium text-foreground">{counts[s]}</span>
                <span className="text-muted-foreground">{STATUS_SUMMARY_CONFIG[s].label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* SERVICE ROLE KEY WARNING                                          */}
        {/* ---------------------------------------------------------------- */}
        {!isConfigured && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <strong>Service role key not configured.</strong>{" "}
            Add <code className="rounded bg-amber-100 px-1 font-mono text-xs">SUPABASE_SERVICE_ROLE_KEY</code> to{" "}
            <code className="rounded bg-amber-100 px-1 font-mono text-xs">.env.local</code> to load live leads.
            Find it in{" "}
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-amber-900"
            >
              Supabase Dashboard → Project Settings → API → service_role
            </a>.
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* LEADS TABLE                                                       */}
        {/* ---------------------------------------------------------------- */}
        <LeadsTable leads={leads} />

        {/* ---------------------------------------------------------------- */}
        {/* FOOTER NOTE                                                       */}
        {/* ---------------------------------------------------------------- */}
        <p className="mt-6 text-center text-[11px] text-muted-foreground/60">
          Internal admin tool — Albor Digital (Canada). Secure this route with authentication before going live.
        </p>
      </main>
    </div>
  );
}
