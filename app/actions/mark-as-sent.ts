"use server";

import { z } from "zod";
import { createAdminClient } from "@/lib/admin-supabase";
import { revalidatePath } from "next/cache";

const Schema = z.object({
  leadId:      z.string().uuid(),
  companyName: z.string().min(1).max(256),
});

export type MarkAsSentResult =
  | { success: true }
  | { success: false; error: string };

/**
 * Marks a lead as 'distributed' and records which company it was sent to.
 * The company name is appended to property_details as a lightweight audit log
 * until a dedicated lead_distributions table is added.
 */
export async function markAsSent(
  leadId: string,
  companyName: string
): Promise<MarkAsSentResult> {
  const parsed = Schema.safeParse({ leadId, companyName });
  if (!parsed.success) return { success: false, error: "Invalid parameters." };

  let supabase;
  try {
    supabase = createAdminClient();
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }

  // Fetch current lead to build audit note
  const { data: lead, error: fetchErr } = await supabase
    .from("leads")
    .select("property_details, status")
    .eq("id", parsed.data.leadId)
    .single();

  if (fetchErr || !lead) {
    return { success: false, error: "Lead not found." };
  }

  const timestamp = new Date().toLocaleString("en-CA", {
    timeZone: "America/Edmonton",
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  const auditLine = `[Sent to: ${parsed.data.companyName} — ${timestamp}]`;
  const updatedDetails = lead.property_details
    ? `${lead.property_details}\n${auditLine}`
    : auditLine;

  const { error: updateErr } = await supabase
    .from("leads")
    .update({
      status:           "distributed",
      property_details: updatedDetails,
    })
    .eq("id", parsed.data.leadId);

  if (updateErr) {
    return { success: false, error: "Database update failed." };
  }

  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${parsed.data.leadId}`);
  return { success: true };
}
