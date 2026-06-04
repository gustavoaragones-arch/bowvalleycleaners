-- ============================================================
-- BowValleyCleaners.ca — Supabase Database Schema
-- Operated by Albor Digital (Canada) — Canmore, AB
-- ============================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ============================================================
-- ENUM: Service Areas
-- ============================================================
create type service_area as enum (
  'Canmore',
  'Banff',
  'Dead Man''s Flats',
  'Exshaw',
  'Cochrane',
  'Calgary'
);

-- ============================================================
-- ENUM: Specializations (used as visual badge labels)
-- ============================================================
create type specialization as enum (
  'Airbnb Specialist',
  'Luxury Homes',
  'Commercial',
  'Post Construction',
  'Eco Friendly',
  'Laundry Included',
  'Property Management Support',
  'Same Day Turnover'
);

-- ============================================================
-- TABLE: companies
-- Core directory listing for each cleaning company.
-- ============================================================
create table companies (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  name             text not null,
  slug             text not null unique,           -- URL-safe identifier, e.g. "peak-clean-canmore"
  tagline          text,                           -- Short 1-line descriptor shown under name
  google_rating    numeric(2, 1) check (google_rating >= 0 and google_rating <= 5),
  review_count     integer not null default 0 check (review_count >= 0),
  years_in_business integer check (years_in_business >= 0),
  website_url      text,
  phone_number     text,
  email            text,
  logo_url         text,                           -- Hosted on Supabase Storage or external CDN
  is_featured      boolean not null default false, -- Controls premium placement in grid
  is_active        boolean not null default true   -- Soft-delete / unpublish toggle
);

-- Index for fast featured-first ordering on the listing page
create index idx_companies_featured_active on companies (is_featured desc, created_at desc)
  where is_active = true;

-- ============================================================
-- TABLE: company_service_areas
-- Many-to-many join: one company can serve multiple areas.
-- ============================================================
create table company_service_areas (
  id          uuid primary key default gen_random_uuid(),
  company_id  uuid not null references companies (id) on delete cascade,
  area        service_area not null,
  unique (company_id, area)
);

create index idx_csa_company on company_service_areas (company_id);
create index idx_csa_area    on company_service_areas (area);

-- ============================================================
-- TABLE: company_specializations
-- Many-to-many join: one company can hold multiple badges.
-- ============================================================
create table company_specializations (
  id             uuid primary key default gen_random_uuid(),
  company_id     uuid not null references companies (id) on delete cascade,
  specialization specialization not null,
  unique (company_id, specialization)
);

create index idx_cspec_company on company_specializations (company_id);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- Public read access; writes require authenticated service role.
-- ============================================================
alter table companies             enable row level security;
alter table company_service_areas enable row level security;
alter table company_specializations enable row level security;

-- Anyone can read active companies
create policy "Public read companies"
  on companies for select
  using (is_active = true);

-- Anyone can read service area mappings
create policy "Public read service areas"
  on company_service_areas for select
  using (true);

-- Anyone can read specialization mappings
create policy "Public read specializations"
  on company_specializations for select
  using (true);

-- Only authenticated service role can insert/update/delete
-- (Managed via Supabase Dashboard service key or admin API)

-- ============================================================
-- CONVENIENCE VIEW: companies_full
-- Aggregates areas and specializations into arrays for easy
-- consumption by the Next.js frontend in a single query.
-- ============================================================
create or replace view companies_full as
select
  c.*,
  coalesce(
    array_agg(distinct csa.area::text) filter (where csa.area is not null),
    '{}'::text[]
  ) as service_areas,
  coalesce(
    array_agg(distinct csp.specialization::text) filter (where csp.specialization is not null),
    '{}'::text[]
  ) as specializations
from companies c
left join company_service_areas    csa on csa.company_id = c.id
left join company_specializations  csp on csp.company_id = c.id
where c.is_active = true
group by c.id;

-- ============================================================
-- SEED: 3 placeholder companies for Phase 1 UI review
-- (Delete or replace with real data before go-live)
-- ============================================================
insert into companies (name, slug, tagline, google_rating, review_count, years_in_business, website_url, phone_number, is_featured)
values
  (
    'Peak Sparkle Cleaning Co.',
    'peak-sparkle-cleaning-co',
    'Canmore''s most trusted STR turnover specialists.',
    4.9, 134, 7,
    'https://example.com/peak-sparkle',
    '+1-403-555-0101',
    true
  ),
  (
    'Bow Valley Pristine',
    'bow-valley-pristine',
    'Eco-friendly luxury home cleaning for discerning owners.',
    4.7, 89, 4,
    'https://example.com/bow-valley-pristine',
    '+1-403-555-0202',
    false
  ),
  (
    'Summit Fresh Services',
    'summit-fresh-services',
    'Post-construction & commercial cleaning across the Rockies.',
    4.8, 61, 9,
    'https://example.com/summit-fresh',
    '+1-403-555-0303',
    false
  );

-- Seed service areas
insert into company_service_areas (company_id, area)
select id, unnest(array['Canmore','Banff','Dead Man''s Flats']::service_area[]) from companies where slug = 'peak-sparkle-cleaning-co';

insert into company_service_areas (company_id, area)
select id, unnest(array['Canmore','Cochrane']::service_area[]) from companies where slug = 'bow-valley-pristine';

insert into company_service_areas (company_id, area)
select id, unnest(array['Canmore','Banff','Exshaw','Calgary']::service_area[]) from companies where slug = 'summit-fresh-services';

-- Seed specializations
insert into company_specializations (company_id, specialization)
select id, unnest(array['Airbnb Specialist','Same Day Turnover','Laundry Included','Property Management Support']::specialization[])
from companies where slug = 'peak-sparkle-cleaning-co';

insert into company_specializations (company_id, specialization)
select id, unnest(array['Luxury Homes','Eco Friendly']::specialization[])
from companies where slug = 'bow-valley-pristine';

insert into company_specializations (company_id, specialization)
select id, unnest(array['Post Construction','Commercial']::specialization[])
from companies where slug = 'summit-fresh-services';
