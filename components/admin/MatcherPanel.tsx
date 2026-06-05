"use client";

import { useState, useTransition } from "react";
import {
  Zap, Star, Phone, Mail, Copy, Send, Check,
  AlertCircle, Loader2, Building2, User, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { findMatches, type FindMatchesResult, type MatchResult } from "@/app/actions/find-matches";
import { markAsSent } from "@/app/actions/mark-as-sent";
import type { Lead } from "@/types/lead";
import type { CompanyFull } from "@/types/company";

// ---------------------------------------------------------------------------
// Clipboard helper
// ---------------------------------------------------------------------------
function buildLeadText(lead: Lead, company: CompanyFull): string {
  const lines = [
    `📋 New Lead — BowValleyCleaners.ca`,
    ``,
    `Property:  ${lead.property_type}`,
    `Location:  ${lead.location}`,
    lead.property_details ? `Details:   ${lead.property_details}` : null,
    `Timeline:  ${lead.timeline}`,
    ``,
    `Client:    ${lead.user_name}`,
    `Email:     ${lead.user_email}`,
    lead.user_phone ? `Phone:     ${lead.user_phone}` : null,
    ``,
    `Matched to: ${company.name}`,
    `Reply to this message to accept this lead.`,
  ]
    .filter((l) => l !== null)
    .join("\n");

  return lines;
}

// ---------------------------------------------------------------------------
// Per-company action row
// ---------------------------------------------------------------------------
function CompanyActionRow({
  result,
  lead,
  onSent,
}: {
  result: MatchResult;
  lead: Lead;
  onSent: (companyName: string) => void;
}) {
  const { company, isSpecMatch } = result;
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleCopy() {
    const text = buildLeadText(lead, company);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  function handleSend() {
    setSendError("");
    startTransition(async () => {
      const result = await markAsSent(lead.id, company.name);
      if (result.success) {
        setSent(true);
        onSent(company.name);
      } else {
        setSendError(result.error);
      }
    });
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-lg border p-3 transition-colors sm:flex-row sm:items-start sm:gap-4",
        sent
          ? "border-emerald-200 bg-emerald-50/60"
          : isSpecMatch
          ? "border-border bg-background"
          : "border-dashed border-border bg-muted/20"
      )}
    >
      {/* Company info */}
      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-sm text-foreground truncate">
            {company.name}
          </span>
          {isSpecMatch && (
            <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">
              <Zap className="size-2.5" /> Spec match
            </span>
          )}
          {company.is_featured && (
            <span className="inline-flex items-center gap-0.5 rounded-full bg-sky-100 px-1.5 py-0.5 text-[10px] font-bold text-sky-700">
              <Star className="size-2.5 fill-sky-500" /> Featured
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          {company.business_type && (
            <span className="flex items-center gap-1">
              {company.business_type === "Cleaning Contractor"
                ? <User className="size-3" />
                : <Building2 className="size-3" />}
              {company.business_type}
            </span>
          )}
          {company.google_rating && (
            <span className="flex items-center gap-0.5">
              <Star className="size-3 fill-amber-400 text-amber-400" />
              {company.google_rating.toFixed(1)}
              <span className="text-muted-foreground/60">
                ({company.review_count})
              </span>
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-3 text-xs">
          {company.email && (
            <a
              href={`mailto:${company.email}`}
              className="flex items-center gap-1 text-sky-600 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              <Mail className="size-3" /> {company.email}
            </a>
          )}
          {company.phone_number && (
            <a
              href={`tel:${company.phone_number}`}
              className="flex items-center gap-1 text-sky-600 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              <Phone className="size-3" /> {company.phone_number}
            </a>
          )}
        </div>

        {sendError && (
          <p className="flex items-center gap-1 text-[11px] text-destructive">
            <AlertCircle className="size-3" /> {sendError}
          </p>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex shrink-0 gap-2 sm:flex-col sm:items-end">
        <button
          onClick={handleCopy}
          disabled={sent}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-all",
            copied
              ? "border-emerald-300 bg-emerald-50 text-emerald-700"
              : "border-border bg-background text-muted-foreground hover:border-slate-400 hover:text-foreground",
            sent && "pointer-events-none opacity-40"
          )}
        >
          {copied ? (
            <><Check className="size-3" /> Copied!</>
          ) : (
            <><Copy className="size-3" /> Copy Lead</>
          )}
        </button>

        <button
          onClick={handleSend}
          disabled={sent || isPending}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-all",
            sent
              ? "border-emerald-300 bg-emerald-100 text-emerald-700 pointer-events-none"
              : "border-sky-300 bg-sky-50 text-sky-700 hover:bg-sky-100 disabled:opacity-50"
          )}
        >
          {isPending ? (
            <><Loader2 className="size-3 animate-spin" /> Sending…</>
          ) : sent ? (
            <><Check className="size-3" /> Sent</>
          ) : (
            <><Send className="size-3" /> Mark Sent</>
          )}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main panel
// ---------------------------------------------------------------------------
interface MatcherPanelProps {
  lead: Lead;
}

export function MatcherPanel({ lead }: MatcherPanelProps) {
  const [matches, setMatches] = useState<FindMatchesResult | null>(null);
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState<string[]>([]);
  const [isRunning, startTransition] = useTransition();

  function runMatcher() {
    setError("");
    startTransition(async () => {
      try {
        const result = await findMatches(lead);
        setMatches(result);
      } catch (e) {
        setError((e as Error).message);
      }
    });
  }

  const allResults = matches
    ? [...matches.primary, ...matches.fallback]
    : [];

  return (
    <div className="rounded-xl border border-border bg-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <h2 className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <Zap className="size-4 text-amber-500" />
            Concierge Matchmaker
          </h2>
          {matches !== null && (
            <p className="mt-0.5 text-xs text-muted-foreground">
              {matches.primary.length} spec match{matches.primary.length !== 1 ? "es" : ""},
              {" "}{matches.fallback.length} fallback — {sentTo.length} sent
            </p>
          )}
        </div>
        <Button
          size="sm"
          onClick={runMatcher}
          disabled={isRunning}
          className="gap-1.5 bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-60 text-xs"
        >
          {isRunning ? (
            <><Loader2 className="size-3.5 animate-spin" /> Running…</>
          ) : matches ? (
            <><Zap className="size-3.5" /> Re-run</>
          ) : (
            <><Zap className="size-3.5" /> Run Matchmaker</>
          )}
        </Button>
      </div>

      {/* Body */}
      <div className="p-4">
        {/* Error */}
        {error && (
          <div className="mb-4 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive">
            <AlertCircle className="mt-0.5 size-3.5 shrink-0" />
            {error}
          </div>
        )}

        {/* Idle state */}
        {!matches && !isRunning && !error && (
          <p className="py-6 text-center text-sm text-muted-foreground">
            Click <strong>Run Matchmaker</strong> to find providers for this lead.
          </p>
        )}

        {/* Running */}
        {isRunning && (
          <div className="flex items-center justify-center gap-2 py-8 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" /> Querying directory…
          </div>
        )}

        {/* Results */}
        {matches && !isRunning && (
          <div className="space-y-4">
            {/* Primary matches */}
            {matches.primary.length > 0 && (
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-emerald-700">
                  <ChevronRight className="size-3" />
                  Specialization matches ({matches.primary.length})
                </p>
                <div className="space-y-2">
                  {matches.primary.map((r) => (
                    <CompanyActionRow
                      key={r.company.id}
                      result={r}
                      lead={lead}
                      onSent={(name) => setSentTo((prev) => [...prev, name])}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Fallback matches */}
            {matches.fallback.length > 0 && (
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  <ChevronRight className="size-3" />
                  Location-only fallbacks ({matches.fallback.length})
                </p>
                <div className="space-y-2">
                  {matches.fallback.map((r) => (
                    <CompanyActionRow
                      key={r.company.id}
                      result={r}
                      lead={lead}
                      onSent={(name) => setSentTo((prev) => [...prev, name])}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* No matches at all */}
            {allResults.length === 0 && (
              <div className="flex flex-col items-center gap-2 py-8 text-center">
                <AlertCircle className="size-5 text-muted-foreground/40" />
                <p className="text-sm font-medium text-muted-foreground">
                  No companies found serving <strong>{lead.location}</strong>.
                </p>
                <p className="text-xs text-muted-foreground/70">
                  Check the directory — this area may have no active listings yet.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
