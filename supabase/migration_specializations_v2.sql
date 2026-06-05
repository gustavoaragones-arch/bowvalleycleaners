-- ============================================================
-- BowValleyCleaners.ca — Migration: Specializations v2 + email
-- Run in: Supabase Dashboard → SQL Editor
-- ============================================================

-- STEP 1: email column (safe — already exists from Phase 1 schema;
-- this is a no-op if the column is present)
alter table companies
  add column if not exists email text;

-- ============================================================
-- STEP 2: Replace the specialization ENUM
--
-- Postgres does not support removing enum values directly.
-- The safe approach:
--   a) Clear the join table data
--   b) Drop the join table (which owns the enum column)
--   c) Drop the old enum type
--   d) Create the new enum type with all 10 market categories
--   e) Recreate the join table
--   f) Re-seed the 3 placeholder companies with v2 specializations
--   g) Rebuild the companies_full view
-- ============================================================

-- a) Clear existing join data (seed data only at this stage)
truncate table company_specializations;

-- b) Drop join table
drop table if exists company_specializations;

-- c) Drop old enum
drop type if exists specialization;

-- d) Create new enum
create type specialization as enum (
  'Airbnb',
  'Residential Homes',
  'Luxury Properties',
  'Deep Cleaning - Move outs',
  'Post Construction',
  'Commercial Buildings',
  'Pet-Friendly Cleaning',
  'Carpet Cleaning Specialists',
  'Property Management Support',
  'Eco Friendly'
);

-- e) Recreate join table
create table company_specializations (
  id             uuid primary key default gen_random_uuid(),
  company_id     uuid not null references companies (id) on delete cascade,
  specialization specialization not null,
  unique (company_id, specialization)
);

create index idx_cspec_company on company_specializations (company_id);

-- RLS: same as original — public read
alter table company_specializations enable row level security;

create policy "Public read specializations"
  on company_specializations for select
  using (true);

-- f) Re-seed specializations for the 3 placeholder companies
insert into company_specializations (company_id, specialization)
select id, unnest(array[
  'Airbnb',
  'Property Management Support',
  'Deep Cleaning - Move outs'
]::specialization[])
from companies where slug = 'peak-sparkle-cleaning-co';

insert into company_specializations (company_id, specialization)
select id, unnest(array[
  'Luxury Properties',
  'Eco Friendly',
  'Residential Homes'
]::specialization[])
from companies where slug = 'bow-valley-pristine';

insert into company_specializations (company_id, specialization)
select id, unnest(array[
  'Post Construction',
  'Commercial Buildings',
  'Carpet Cleaning Specialists'
]::specialization[])
from companies where slug = 'summit-fresh-services';

-- g) Rebuild the companies_full view
drop view if exists companies_full;

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
