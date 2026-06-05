// ============================================================
// BowValleyCleaners.ca — Lead / Quote Request Interfaces
// Mirrors the Supabase `leads` table (Phase 3)
// ============================================================

export type PropertyType =
  | "Airbnb / STR"
  | "Luxury Residential"
  | "Commercial"
  | "Post-Construction";

export type LeadTimeline =
  | "Immediately"
  | "Within a Week"
  | "Next Month"
  | "Just Exploring";

export type LeadStatus = "new" | "contacted" | "matched" | "distributed" | "closed";

// Matches the `leads` table row
export interface Lead {
  id: string;
  created_at: string;
  property_type: PropertyType;
  location: string;
  property_details: string | null;
  timeline: LeadTimeline;
  user_name: string;
  user_email: string;
  user_phone: string | null;
  preferred_provider: string | null;
  status: LeadStatus;
}

// Shape of the multi-step form before submission
export interface LeadFormData {
  // Step 1
  property_type: PropertyType | "";
  // Step 2
  location: string;
  property_details: string;
  timeline: LeadTimeline | "";
  // Step 3
  user_name: string;
  user_email: string;
  user_phone: string;
  preferred_provider: string;
}

// Visual config for each property type card on Step 1
export const PROPERTY_TYPE_CONFIG: Record<
  PropertyType,
  { icon: string; description: string; color: string }
> = {
  "Airbnb / STR": {
    icon: "🏠",
    description: "Short-term rental turnover between guest stays",
    color: "border-rose-300 bg-rose-50 ring-rose-400",
  },
  "Luxury Residential": {
    icon: "✨",
    description: "White-glove cleaning for high-end private homes",
    color: "border-amber-300 bg-amber-50 ring-amber-400",
  },
  Commercial: {
    icon: "🏢",
    description: "Office, retail, or hospitality facilities",
    color: "border-sky-300 bg-sky-50 ring-sky-400",
  },
  "Post-Construction": {
    icon: "🏗️",
    description: "Deep clean after a renovation or new build",
    color: "border-orange-300 bg-orange-50 ring-orange-400",
  },
};
