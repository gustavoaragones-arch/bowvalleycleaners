"use server";

import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Validation schema — mirrors LeadFormData
// ---------------------------------------------------------------------------
const LeadSchema = z.object({
  property_type: z.enum([
    "Airbnb / STR",
    "Luxury Residential",
    "Commercial",
    "Post-Construction",
  ]),
  location: z.enum([
    "Canmore",
    "Banff",
    "Dead Man's Flats",
    "Exshaw",
    "Cochrane",
    "Calgary",
  ]),
  property_details: z.string().max(500).optional(),
  timeline: z.enum([
    "Immediately",
    "Within a Week",
    "Next Month",
    "Just Exploring",
  ]),
  user_name: z.string().min(2, "Please enter your name").max(128),
  user_email: z.string().email("Please enter a valid email address"),
  user_phone: z.string().max(32).optional(),
  preferred_provider: z.string().max(128).optional(),
});

export type LeadInput = z.infer<typeof LeadSchema>;

export type SubmitLeadResult =
  | { success: true }
  | { success: false; error: string };

// ---------------------------------------------------------------------------
// Server Action
// Uses the anon key — the "Public lead submission" RLS policy allows INSERT.
// ---------------------------------------------------------------------------
export async function submitLead(data: LeadInput): Promise<SubmitLeadResult> {
  const parsed = LeadSchema.safeParse(data);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid form data.";
    return { success: false, error: firstError };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (
    !supabaseUrl ||
    !supabaseKey ||
    supabaseUrl.includes("YOUR_PROJECT_REF")
  ) {
    // In dev with mock data, log and return success so the UI flow can be tested
    console.log("[DEV] Lead submission (Supabase not configured):", parsed.data);
    return { success: true };
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const { error } = await supabase.from("leads").insert({
    ...parsed.data,
    property_details: parsed.data.property_details || null,
    user_phone: parsed.data.user_phone || null,
    preferred_provider: parsed.data.preferred_provider || null,
    status: "new",
  });

  if (error) {
    console.error("Supabase lead insert error:", error.message);
    return {
      success: false,
      error: "Something went wrong. Please try again or call us directly.",
    };
  }

  return { success: true };
}
