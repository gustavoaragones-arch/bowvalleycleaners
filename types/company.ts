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
  | 'Airbnb Specialist'
  | 'Luxury Homes'
  | 'Commercial'
  | 'Post Construction'
  | 'Eco Friendly'
  | 'Laundry Included'
  | 'Property Management Support'
  | 'Same Day Turnover';

// Maps a Specialization to its distinct brand color (Tailwind CSS classes).
// Used by CompanyCard to render visual badges consistently across the app.
export const SPECIALIZATION_COLORS: Record<Specialization, { bg: string; text: string; ring: string }> = {
  'Airbnb Specialist':          { bg: 'bg-rose-100',    text: 'text-rose-700',    ring: 'ring-rose-300'    },
  'Luxury Homes':               { bg: 'bg-amber-100',   text: 'text-amber-700',   ring: 'ring-amber-300'   },
  'Commercial':                 { bg: 'bg-sky-100',     text: 'text-sky-700',     ring: 'ring-sky-300'     },
  'Post Construction':          { bg: 'bg-orange-100',  text: 'text-orange-700',  ring: 'ring-orange-300'  },
  'Eco Friendly':               { bg: 'bg-emerald-100', text: 'text-emerald-700', ring: 'ring-emerald-300' },
  'Laundry Included':           { bg: 'bg-violet-100',  text: 'text-violet-700',  ring: 'ring-violet-300'  },
  'Property Management Support':{ bg: 'bg-indigo-100',  text: 'text-indigo-700',  ring: 'ring-indigo-300'  },
  'Same Day Turnover':          { bg: 'bg-teal-100',    text: 'text-teal-700',    ring: 'ring-teal-300'    },
};

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
