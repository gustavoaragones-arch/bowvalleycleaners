-- ============================================================
-- BowValleyCleaners.ca — Rebuild companies_full for is_local
-- Run in: Supabase Dashboard → SQL Editor
--
-- PostgreSQL expands c.* at view creation time. After adding
-- is_local to companies, the view must be recreated.
-- ============================================================

alter table companies
  add column if not exists is_local boolean not null default false;

drop view if exists companies_full;

create or replace view companies_full as
select
  c.id,
  c.created_at,
  c.name,
  c.slug,
  c.tagline,
  c.google_rating,
  c.review_count,
  c.years_in_business,
  c.website_url,
  c.phone_number,
  c.email,
  c.logo_url,
  c.is_featured,
  c.is_active,
  c.is_insured,
  c.is_licensed,
  c.is_background_checked,
  c.business_type,
  c.is_local,
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
