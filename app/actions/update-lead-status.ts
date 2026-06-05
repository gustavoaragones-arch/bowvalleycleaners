"use server";

import { z } from "zod";
import { createAdminClient } from "@/lib/admin-supabase";
import { revalidatePath } from "next/cache";
import type { LeadStatus } from "@/types/lead";

const UpdateSchema = z.object({
  id:     z.string().uuid(),
  status: z.enum(["new", "contacted", "matched", "closed"]),
});

export type UpdateLeadStatusResult =
  | { success: true }
  | { success: false; error: string };

export async function updateLeadStatus(
  id: string,
  status: LeadStatus
): Promise<UpdateLeadStatusResult> {
  const parsed = UpdateSchema.safeParse({ id, status });

  if (!parsed.success) {
    return { success: false, error: "Invalid parameters." };
  }

  let supabase;
  try {
    supabase = createAdminClient();
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }

  const { error } = await supabase
    .from("leads")
    .update({ status: parsed.data.status })
    .eq("id", parsed.data.id);

  if (error) {
    console.error("Lead status update error:", error.message);
    return { success: false, error: "Database update failed." };
  }

  // Invalidate the admin leads page so the table reflects the new status
  revalidatePath("/admin/leads");
  return { success: true };
}
