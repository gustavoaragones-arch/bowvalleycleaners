-- Add is_local trust signal to companies.
-- After applying, run migration_companies_full_is_local.sql to rebuild companies_full.

alter table companies
  add column if not exists is_local boolean not null default false;

-- Example: flag Bow Valley operators for UI review
-- update companies set is_local = true where slug in ('canmore-bnb-services', 'peak-sparkle-cleaning-co');
