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

const BUSINESS_TYPES = ["Cleaning Contractor", "Cleaning Company"] as const;

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const AddBusinessSchema = z.object({
  name: z.string().min(2, "Please enter your company name").max(256),
  tagline: z.string().max(300).optional(),
  business_type: z.enum(BUSINESS_TYPES).optional(),
  email: z.preprocess(
    (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
    z.string().email("Please enter a valid email").optional()
  ),
  phone_number: z.string().max(32).optional(),
  website_url: z.preprocess(
    (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
    z.string().url("Please enter a valid website URL").optional()
  ),
  logo_url: z.preprocess(
    (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
    z.string().url("Please enter a valid logo URL").optional()
  ),
  google_rating: z.coerce
    .number()
    .min(0, "Rating must be between 0 and 5")
    .max(5, "Rating must be between 0 and 5")
    .optional()
    .nullable(),
  review_count: z.coerce.number().int().min(0).optional(),
  years_in_business: z.coerce.number().int().min(0).optional().nullable(),
  is_insured: z.boolean().default(false),
  is_licensed: z.boolean().default(false),
  is_background_checked: z.boolean().default(false),
  service_areas: z
    .array(z.enum(SERVICE_AREAS))
    .min(1, "Select at least one service area"),
  specializations: z
    .array(z.enum(SPECIALIZATIONS))
    .min(1, "Select at least one specialization"),
});

export type AddBusinessInput = z.infer<typeof AddBusinessSchema>;

export type SubmitAddBusinessResult =
  | { success: true; slug: string }
  | { success: false; error: string };

export async function submitAddBusiness(
  data: AddBusinessInput
): Promise<SubmitAddBusinessResult> {
  const parsed = AddBusinessSchema.safeParse(data);

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
    const slug = slugify(parsed.data.name);
    console.log("[DEV] Add business (Supabase not configured):", parsed.data);
    return { success: true, slug };
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const baseSlug = slugify(parsed.data.name);
  let slug = baseSlug;
  let suffix = 2;
  while (true) {
    const { data: existing } = await supabase
      .from("companies")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    if (!existing) break;
    slug = `${baseSlug}-${suffix++}`;
  }

  const { data: company, error: companyErr } = await supabase
    .from("companies")
    .insert({
      name: parsed.data.name,
      slug,
      tagline: parsed.data.tagline || null,
      business_type: parsed.data.business_type || null,
      email: parsed.data.email || null,
      phone_number: parsed.data.phone_number || null,
      website_url: parsed.data.website_url || null,
      logo_url: parsed.data.logo_url || null,
      google_rating: parsed.data.google_rating ?? null,
      review_count: parsed.data.review_count ?? 0,
      years_in_business: parsed.data.years_in_business ?? null,
      is_insured: parsed.data.is_insured,
      is_licensed: parsed.data.is_licensed,
      is_background_checked: parsed.data.is_background_checked,
      is_featured: false,
      is_active: true,
    })
    .select("id")
    .single();

  if (companyErr || !company) {
    console.error("Supabase company insert error:", companyErr?.message);
    return {
      success: false,
      error:
        "Could not save your listing. Please try again or email contact@bowvalleycleaners.ca.",
    };
  }

  const companyId = company.id;

  const { error: areasErr } = await supabase
    .from("company_service_areas")
    .insert(
      parsed.data.service_areas.map((area) => ({
        company_id: companyId,
        area,
      }))
    );

  if (areasErr) {
    console.error("Supabase service areas insert error:", areasErr.message);
    return { success: false, error: "Listing saved partially — service areas failed." };
  }

  const { error: specsErr } = await supabase
    .from("company_specializations")
    .insert(
      parsed.data.specializations.map((specialization) => ({
        company_id: companyId,
        specialization,
      }))
    );

  if (specsErr) {
    console.error("Supabase specializations insert error:", specsErr.message);
    return { success: false, error: "Listing saved partially — specializations failed." };
  }

  return { success: true, slug };
}
