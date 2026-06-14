-- ============================================================
-- BowValleyCleaners.ca — Public company listing submission
-- Allows /add-business form to insert via anon key (RLS)
-- Run in: Supabase Dashboard → SQL Editor
-- ============================================================

drop policy if exists "Public company submission" on companies;
create policy "Public company submission"
  on companies for insert
  with check (true);

drop policy if exists "Public service area submission" on company_service_areas;
create policy "Public service area submission"
  on company_service_areas for insert
  with check (true);

drop policy if exists "Public specialization submission" on company_specializations;
create policy "Public specialization submission"
  on company_specializations for insert
  with check (true);
