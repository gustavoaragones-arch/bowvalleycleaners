-- ============================================================
-- BowValleyCleaners.ca — Cleaning Company Applications
-- Provider intake for /for-cleaners partner portal
-- Run in: Supabase Dashboard → SQL Editor
-- ============================================================

create table if not exists cleaning_company_applications (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),

  company_name     varchar(256) not null,
  contact_name     varchar(128) not null,
  email            varchar(254) not null,
  phone            varchar(32),
  website_url      text,

  -- Multi-select values stored as text arrays
  service_areas    text[] not null default '{}',
  specializations  text[] not null default '{}',

  status           varchar(32) not null default 'pending'
  -- Allowed values: 'pending', 'reviewing', 'approved', 'declined'
);

create index if not exists idx_cca_created on cleaning_company_applications (created_at desc);
create index if not exists idx_cca_status  on cleaning_company_applications (status);

alter table cleaning_company_applications enable row level security;

-- Public form submission (no auth required)
drop policy if exists "Public cleaner application submission" on cleaning_company_applications;
create policy "Public cleaner application submission"
  on cleaning_company_applications for insert
  with check (true);
