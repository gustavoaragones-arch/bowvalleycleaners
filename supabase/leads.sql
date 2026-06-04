-- ============================================================
-- BowValleyCleaners.ca — Leads Table (Phase 3)
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

create table leads (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),

  -- Step 1: Property type
  property_type    varchar(64) not null,
  -- Allowed values: 'Airbnb / STR', 'Luxury Residential', 'Commercial', 'Post-Construction'

  -- Step 2: Location & details
  location         varchar(64) not null,
  -- Allowed values: 'Canmore','Banff','Dead Man''s Flats','Exshaw','Cochrane','Calgary'
  property_details text,
  -- Free-text: e.g. "3 Bed, 2 Bath — 1,800 sqft"

  -- Step 2 continued: timing
  timeline         varchar(64) not null,
  -- Allowed values: 'Immediately', 'Within a Week', 'Next Month', 'Just Exploring'

  -- Step 3: Contact
  user_name        varchar(128) not null,
  user_email       varchar(254) not null,
  user_phone       varchar(32),

  -- Optional: which company card triggered the form
  preferred_provider varchar(128),

  -- Internal workflow status
  status           varchar(32) not null default 'new'
  -- Allowed values: 'new', 'contacted', 'matched', 'closed'
);

-- Index for the admin dashboard: newest leads first
create index idx_leads_created on leads (created_at desc);
-- Index for pipeline management
create index idx_leads_status on leads (status);

-- ============================================================
-- RLS
-- Anyone can INSERT (public lead form — no auth required).
-- SELECT/UPDATE/DELETE restricted to service role (admin only).
-- ============================================================
alter table leads enable row level security;

create policy "Public lead submission"
  on leads for insert
  with check (true);

-- Admins query leads via service role key — no select policy needed for anon.
