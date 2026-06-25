// ============================================================
// BowValleyCleaners.ca — Core TypeScript Interfaces
// Mirrors the Supabase schema for end-to-end type safety.
// ============================================================

export type ServiceArea =
  | 'Canmore'
  | 'Banff'
  | "Dead Man's Flats"
  | 'Exshaw'
  | 'Cochrane'
  | 'Calgary';

export type Specialization =
  | 'Airbnb'
  | 'Residential Homes'
  | 'Luxury Properties'
  | 'Deep Cleaning - Move outs'
  | 'Post Construction'
  | 'Commercial Buildings'
  | 'Pet-Friendly Cleaning'
  | 'Carpet Cleaning Specialists'
  | 'Property Management Support'
  | 'Eco Friendly';

// Fallback color for any specialization string not present in the map
// (e.g. stale DB values during a migration window).
export const SPECIALIZATION_COLOR_FALLBACK = {
  bg: 'bg-slate-100', text: 'text-slate-600', ring: 'ring-slate-300',
} as const;

// Maps a Specialization to its distinct brand color (Tailwind CSS classes).
// Used by CompanyCard to render visual badges consistently across the app.
export const SPECIALIZATION_COLORS: Record<Specialization, { bg: string; text: string; ring: string }> = {
  'Airbnb':                       { bg: 'bg-rose-100',    text: 'text-rose-700',    ring: 'ring-rose-300'    },
  'Residential Homes':            { bg: 'bg-sky-100',     text: 'text-sky-700',     ring: 'ring-sky-300'     },
  'Luxury Properties':            { bg: 'bg-amber-100',   text: 'text-amber-700',   ring: 'ring-amber-300'   },
  'Deep Cleaning - Move outs':    { bg: 'bg-violet-100',  text: 'text-violet-700',  ring: 'ring-violet-300'  },
  'Post Construction':            { bg: 'bg-orange-100',  text: 'text-orange-700',  ring: 'ring-orange-300'  },
  'Commercial Buildings':         { bg: 'bg-slate-100',   text: 'text-slate-700',   ring: 'ring-slate-300'   },
  'Pet-Friendly Cleaning':        { bg: 'bg-yellow-100',  text: 'text-yellow-700',  ring: 'ring-yellow-300'  },
  'Carpet Cleaning Specialists':  { bg: 'bg-cyan-100',    text: 'text-cyan-700',    ring: 'ring-cyan-300'    },
  'Property Management Support':  { bg: 'bg-indigo-100',  text: 'text-indigo-700',  ring: 'ring-indigo-300'  },
  'Eco Friendly':                 { bg: 'bg-emerald-100', text: 'text-emerald-700', ring: 'ring-emerald-300' },
};

export type BusinessType = 'Cleaning Contractor' | 'Cleaning Company';

// Matches the `companies` table row
export interface Company {
  id: string;
  created_at: string;
  name: string;
  slug: string;
  tagline: string | null;
  google_rating: number | null;
  review_count: number;
  years_in_business: number | null;
  website_url: string | null;
  phone_number: string | null;
  email: string | null;
  logo_url: string | null;
  is_featured: boolean;
  is_active: boolean;
  is_local: boolean;
  // Trust verification flags
  is_insured: boolean;
  is_licensed: boolean;
  is_background_checked: boolean;
  // Business classification
  business_type: BusinessType | null;
}

// Matches the `company_service_areas` join table row
export interface CompanyServiceArea {
  id: string;
  company_id: string;
  area: ServiceArea;
}

// Matches the `company_specializations` join table row
export interface CompanySpecialization {
  id: string;
  company_id: string;
  specialization: Specialization;
}

// Matches the `companies_full` convenience view —
// the primary shape consumed by the frontend listing page.
export interface CompanyFull extends Company {
  service_areas: ServiceArea[];
  specializations: Specialization[];
}

/** Explicit column list for companies_full queries (PostgREST). */
export const COMPANY_FULL_SELECT = [
  "id",
  "created_at",
  "name",
  "slug",
  "tagline",
  "google_rating",
  "review_count",
  "years_in_business",
  "website_url",
  "phone_number",
  "email",
  "logo_url",
  "is_featured",
  "is_active",
  "is_insured",
  "is_licensed",
  "is_background_checked",
  "business_type",
  "is_local",
  "service_areas",
  "specializations",
].join(", ");
