"use server";

import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const SERVICE_AREAS = [
  "Canmore",
  "Banff",
  "Dead Man's Flats",
  "Exshaw",
  "Cochrane",
  "Calgary",
] as const;

const SPECIALIZATIONS = [
  "Airbnb",
  "Residential Homes",
  "Luxury Properties",
  "Deep Cleaning - Move outs",
  "Post Construction",
  "Commercial Buildings",
  "Pet-Friendly Cleaning",
  "Carpet Cleaning Specialists",
  "Property Management Support",
  "Eco Friendly",
] as const;

const ApplicationSchema = z.object({
  company_name: z.string().min(2, "Please enter your company name").max(256),
  contact_name: z.string().min(2, "Please enter a contact name").max(128),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().max(32).optional(),
  website_url: z.preprocess(
    (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
    z.string().url("Please enter a valid website URL").optional()
  ),
  service_areas: z
    .array(z.enum(SERVICE_AREAS))
    .min(1, "Select at least one service area"),
  specializations: z
    .array(z.enum(SPECIALIZATIONS))
    .min(1, "Select at least one specialization"),
});

export type CleanerApplicationInput = z.infer<typeof ApplicationSchema>;

export type SubmitCleanerApplicationResult =
  | { success: true }
  | { success: false; error: string };

export async function submitCleanerApplication(
  data: CleanerApplicationInput
): Promise<SubmitCleanerApplicationResult> {
  const parsed = ApplicationSchema.safeParse(data);

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
    console.log(
      "[DEV] Cleaner application (Supabase not configured):",
      parsed.data
    );
    return { success: true };
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const { error } = await supabase.from("cleaning_company_applications").insert({
    company_name: parsed.data.company_name,
    contact_name: parsed.data.contact_name,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    website_url: parsed.data.website_url || null,
    service_areas: parsed.data.service_areas,
    specializations: parsed.data.specializations,
    status: "pending",
  });

  if (error) {
    console.error("Supabase application insert error:", error.message);
    return {
      success: false,
      error: "Something went wrong. Please try again or email contact@bowvalleycleaners.ca.",
    };
  }

  return { success: true };
}
