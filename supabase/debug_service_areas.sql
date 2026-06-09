-- ============================================================
-- Diagnostic: check what service areas each company has
-- Run this first to see what's actually in the database.
-- ============================================================

SELECT
  c.name,
  c.slug,
  COUNT(csa.id)                                    AS area_count,
  ARRAY_AGG(csa.area::text ORDER BY csa.area::text) AS areas
FROM       companies c
LEFT JOIN  company_service_areas csa ON csa.company_id = c.id
GROUP BY   c.id, c.name, c.slug
ORDER BY   area_count ASC, c.name;

-- ============================================================
-- If area_count = 0 for your real companies, run the block
-- below. It re-inserts Canmore + Banff for every active
-- company that currently has NO service areas at all.
--
-- Edit the array on line 37 to match the areas each company
-- actually serves, then re-run the seed script for accuracy.
-- ============================================================

/*
INSERT INTO company_service_areas (company_id, area)
SELECT
  c.id,
  unnest(ARRAY['Canmore', 'Banff']::service_area[])
FROM companies c
WHERE c.is_active = true
  AND NOT EXISTS (
    SELECT 1
    FROM   company_service_areas csa
    WHERE  csa.company_id = c.id
  )
ON CONFLICT (company_id, area) DO NOTHING;
*/
