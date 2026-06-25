-- Add is_local trust signal to companies
alter table companies
  add column if not exists is_local boolean not null default false;

-- companies_full includes c.* — no view rebuild required when adding columns to companies

-- Example: flag Bow Valley operators for UI review
-- update companies set is_local = true where slug in ('canmore-bnb-services', 'peak-sparkle-cleaning-co');
