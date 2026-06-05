import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft, User, Mail, Phone, MapPin,
  FileText, Clock, Home, Star
} from "lucide-react";
import { createAdminClient } from "@/lib/admin-supabase";
import { MatcherPanel } from "@/components/admin/MatcherPanel";
import type { Lead, LeadStatus } from "@/types/lead";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Lead Detail | BowValleyCleaners Admin",
  robots: { index: false, follow: false },
};

// ---------------------------------------------------------------------------
// Status badge (server-rendered, static snapshot on page load)
// ---------------------------------------------------------------------------
const STATUS_CONFIG: Record<LeadStatus, { label: string; className: string }> = {
  new:         { label: "New",         className: "bg-sky-100 text-sky-700 ring-sky-300"           },
  contacted:   { label: "Contacted",   className: "bg-amber-100 text-amber-700 ring-amber-300"     },
  matched:     { label: "Matched",     className: "bg-emerald-100 text-emerald-700 ring-emerald-300" },
  distributed: { label: "Distributed", className: "bg-violet-100 text-violet-700 ring-violet-300"  },
  closed:      { label: "Closed",      className: "bg-slate-100 text-slate-500 ring-slate-300"      },
};

function StatusBadge({ status }: { status: LeadStatus }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.new;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string | null | undefined;
  href?: string;
}) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border last:border-0">
      <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted">
        <Icon className="size-3.5 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        {href ? (
          <a href={href} className="text-sm font-medium text-sky-600 hover:underline break-all">
            {value}
          </a>
        ) : (
          <p className="text-sm font-medium text-foreground break-words">{value}</p>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Data fetch
// ---------------------------------------------------------------------------
async function fetchLead(id: string): Promise<Lead | null> {
  let supabase;
  try {
    supabase = createAdminClient();
  } catch {
    return null;
  }

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data as Lead;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await fetchLead(id);

  if (!lead) notFound();

  const submittedAt = new Date(lead.created_at).toLocaleString("en-CA", {
    timeZone: "America/Edmonton",
    year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-muted/20">
      {/* ------------------------------------------------------------------ */}
      {/* ADMIN HEADER                                                         */}
      {/* ------------------------------------------------------------------ */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 px-4 sm:px-6">
          <Link href="/" className="flex size-6 items-center justify-center rounded-md bg-sky-600 text-[10px] font-black text-white select-none">
            BV
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link href="/admin/leads" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Admin
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link href="/admin/leads" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Leads
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm font-semibold text-foreground truncate max-w-[180px]">
            {lead.user_name}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            Back to Leads
          </Link>
          <StatusBadge status={lead.status} />
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* ---------------------------------------------------------------- */}
          {/* LEFT: Lead details (2/5 width on lg)                             */}
          {/* ---------------------------------------------------------------- */}
          <div className="lg:col-span-2 space-y-4">
            {/* Header card */}
            <div className="rounded-xl border border-border bg-background p-4">
              <div className="mb-1 flex items-start justify-between gap-2">
                <h1 className="text-lg font-bold text-foreground leading-snug">
                  {lead.user_name}
                </h1>
              </div>
              <p className="text-xs text-muted-foreground">
                Submitted {submittedAt}
              </p>
              {lead.preferred_provider && (
                <p className="mt-2 inline-flex items-center gap-1 rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700">
                  <Star className="size-2.5 fill-amber-400 text-amber-400" />
                  Prefers: {lead.preferred_provider}
                </p>
              )}
            </div>

            {/* Contact details */}
            <div className="rounded-xl border border-border bg-background px-4">
              <p className="border-b border-border py-2.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Contact
              </p>
              <DetailRow icon={User}  label="Name"  value={lead.user_name} />
              <DetailRow icon={Mail}  label="Email" value={lead.user_email} href={`mailto:${lead.user_email}`} />
              <DetailRow icon={Phone} label="Phone" value={lead.user_phone} href={lead.user_phone ? `tel:${lead.user_phone}` : undefined} />
            </div>

            {/* Property details */}
            <div className="rounded-xl border border-border bg-background px-4">
              <p className="border-b border-border py-2.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Property
              </p>
              <DetailRow icon={Home}     label="Type"     value={lead.property_type} />
              <DetailRow icon={MapPin}   label="Location" value={lead.location} />
              <DetailRow icon={FileText} label="Details"  value={lead.property_details} />
              <DetailRow icon={Clock}    label="Timeline" value={lead.timeline} />
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* RIGHT: Matchmaker engine (3/5 width on lg)                       */}
          {/* ---------------------------------------------------------------- */}
          <div className="lg:col-span-3">
            <MatcherPanel lead={lead} />
          </div>
        </div>
      </main>
    </div>
  );
}
