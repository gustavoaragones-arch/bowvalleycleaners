-- ============================================================
-- BowValleyCleaners.ca — Migration: Business Type
-- Run in: Supabase Dashboard → SQL Editor
-- ============================================================

alter table companies
  add column if not exists business_type text
    check (business_type in ('Cleaning Contractor', 'Cleaning Company'));

-- The column is nullable — NULL means "not yet classified".
-- The check constraint rejects any value that is not one of the
-- two canonical strings (or NULL), preventing dirty data from the
-- seed script or future admin UI.

-- (Optional) Classify the three seed companies for UI review
update companies set business_type = 'Cleaning Company'    where slug = 'peak-sparkle-cleaning-co';
update companies set business_type = 'Cleaning Contractor' where slug = 'bow-valley-pristine';
update companies set business_type = 'Cleaning Company'    where slug = 'summit-fresh-services';
