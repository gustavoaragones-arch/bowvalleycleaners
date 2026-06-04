-- ============================================================
-- BowValleyCleaners.ca — Migration: Trust Verification Flags
-- Run in: Supabase Dashboard → SQL Editor
-- ============================================================

-- Add three trust verification columns to companies
alter table companies
  add column if not exists is_insured           boolean not null default false,
  add column if not exists is_licensed          boolean not null default false,
  add column if not exists is_background_checked boolean not null default false;

-- Refresh the companies_full view to include the new columns.
-- We must drop and recreate because Postgres views don't auto-update.
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

-- (Optional) Flag the three seed companies for testing the UI
update companies set is_insured = true, is_licensed = true
  where slug = 'peak-sparkle-cleaning-co';

update companies set is_insured = true, is_background_checked = true
  where slug = 'bow-valley-pristine';

update companies set is_licensed = true
  where slug = 'summit-fresh-services';
