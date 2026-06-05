"use client";

import { useState, useTransition } from "react";
import { ChevronDown, ChevronRight, Phone, Mail, MapPin, FileText, User } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { updateLeadStatus } from "@/app/actions/update-lead-status";
import type { Lead, LeadStatus } from "@/types/lead";

// ---------------------------------------------------------------------------
// Status badge config
// ---------------------------------------------------------------------------
const STATUS_CONFIG: Record<LeadStatus, { label: string; className: string }> = {
  new:       { label: "New",       className: "bg-sky-100 text-sky-700 ring-sky-300"      },
  contacted: { label: "Contacted", className: "bg-amber-100 text-amber-700 ring-amber-300" },
  matched:   { label: "Matched",   className: "bg-emerald-100 text-emerald-700 ring-emerald-300" },
  closed:    { label: "Closed",    className: "bg-slate-100 text-slate-500 ring-slate-300"  },
};

function StatusBadge({ status }: { status: LeadStatus }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.new;
  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset",
      cfg.className
    )}>
      {cfg.label}
    </span>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-CA", {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

// ---------------------------------------------------------------------------
// Status update cell
// ---------------------------------------------------------------------------
function StatusCell({ lead }: { lead: Lead }) {
  const [optimistic, setOptimistic] = useState<LeadStatus>(lead.status);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleChange(value: string | null) {
    if (!value) return;
    const next = value as LeadStatus;
    setOptimistic(next);
    setError("");
    startTransition(async () => {
      const result = await updateLeadStatus(lead.id, next);
      if (!result.success) {
        setOptimistic(lead.status);
        setError(result.error);
      }
    });
  }

  return (
    <div className="flex flex-col gap-1">
      <Select value={optimistic} onValueChange={handleChange}>
        <SelectTrigger
          size="sm"
          className={cn("w-32 text-xs", isPending && "opacity-60")}
          aria-label="Update lead status"
        >
          <SelectValue>
            <StatusBadge status={optimistic} />
          </SelectValue>
        </SelectTrigger>
        <SelectContent align="end">
          {(Object.keys(STATUS_CONFIG) as LeadStatus[]).map((s) => (
            <SelectItem key={s} value={s} className="text-xs">
              <StatusBadge status={s} />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-[10px] text-destructive">{error}</p>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Expanded detail panel
// ---------------------------------------------------------------------------
function DetailPanel({ lead }: { lead: Lead }) {
  return (
    <div className="grid gap-4 rounded-lg border border-border bg-muted/30 p-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
      <div className="flex flex-col gap-1">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Contact
        </p>
        <div className="flex items-center gap-1.5 text-foreground">
          <User className="size-3.5 shrink-0 text-muted-foreground" />
          {lead.user_name}
        </div>
        <a
          href={`mailto:${lead.user_email}`}
          className="flex items-center gap-1.5 text-sky-600 hover:underline"
        >
          <Mail className="size-3.5 shrink-0" />
          {lead.user_email}
        </a>
        {lead.user_phone && (
          <a
            href={`tel:${lead.user_phone}`}
            className="flex items-center gap-1.5 text-sky-600 hover:underline"
          >
            <Phone className="size-3.5 shrink-0" />
            {lead.user_phone}
          </a>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Property
        </p>
        <div className="flex items-center gap-1.5 text-foreground">
          <MapPin className="size-3.5 shrink-0 text-muted-foreground" />
          {lead.location}
        </div>
        {lead.property_details && (
          <div className="flex items-start gap-1.5 text-foreground">
            <FileText className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
            <span className="leading-snug">{lead.property_details}</span>
          </div>
        )}
      </div>

      {lead.preferred_provider && (
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Preferred Provider
          </p>
          <p className="font-medium text-foreground">{lead.preferred_provider}</p>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main table
// ---------------------------------------------------------------------------
interface LeadsTableProps {
  leads: Lead[];
}

export function LeadsTable({ leads }: LeadsTableProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-20 text-center">
        <Mail className="size-8 text-muted-foreground/30" />
        <p className="text-sm font-medium text-muted-foreground">No leads yet.</p>
        <p className="text-xs text-muted-foreground/70">
          Submissions from the Get a Quote form will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead className="w-8" />
            <TableHead className="text-xs font-semibold uppercase tracking-wide">Date</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wide">Name</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wide">Property Type</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wide">Location</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wide">Timeline</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wide">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => {
            const isOpen = expanded.has(lead.id);
            return (
              <>
                <TableRow
                  key={lead.id}
                  className={cn(
                    "cursor-pointer transition-colors",
                    isOpen && "bg-sky-50/40 hover:bg-sky-50/60"
                  )}
                  onClick={() => toggle(lead.id)}
                >
                  <TableCell className="pl-3 pr-0">
                    {isOpen
                      ? <ChevronDown className="size-3.5 text-muted-foreground" />
                      : <ChevronRight className="size-3.5 text-muted-foreground" />
                    }
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                    {formatDate(lead.created_at)}
                  </TableCell>
                  <TableCell className="font-medium">{lead.user_name}</TableCell>
                  <TableCell className="text-sm">{lead.property_type}</TableCell>
                  <TableCell className="text-sm">{lead.location}</TableCell>
                  <TableCell className="text-sm">{lead.timeline}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <StatusCell lead={lead} />
                  </TableCell>
                </TableRow>

                {isOpen && (
                  <TableRow key={`${lead.id}-detail`} className="bg-sky-50/20 hover:bg-sky-50/20">
                    <TableCell colSpan={7} className="px-4 pb-4 pt-1">
                      <DetailPanel lead={lead} />
                    </TableCell>
                  </TableRow>
                )}
              </>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
