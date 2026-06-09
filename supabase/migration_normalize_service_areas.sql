-- ============================================================
-- Migration: Normalize service_areas data
-- Handles:
--   • Rows where `area` is a comma-separated string stored as
--     text (e.g. 'Canmore, Banff, Bow Valley')
--   • "Bow Valley" regional alias → expands to Canmore + Banff
--   • Leading/trailing whitespace
--   • Case-insensitive matching
--   • Ensures the `area` column is the correct service_area enum
--
-- Safe to run multiple times (ON CONFLICT DO NOTHING everywhere).
-- ============================================================

-- -------------------------------------------------------
-- STEP 1: Drop the dependent view first so we can alter
--         the column type freely, then recreate it at end.
-- -------------------------------------------------------
DROP VIEW IF EXISTS companies_full;

-- Cast enum → text for normalisation (safe now the view is gone)
DO $$
BEGIN
  IF (
    SELECT data_type
    FROM   information_schema.columns
    WHERE  table_name  = 'company_service_areas'
    AND    column_name = 'area'
  ) <> 'text' THEN
    ALTER TABLE company_service_areas
      ALTER COLUMN area TYPE text USING area::text;
  END IF;
END $$;

-- -------------------------------------------------------
-- STEP 2: Split any comma-concatenated area values and
--         replace with individual normalised rows.
-- -------------------------------------------------------
DO $$
DECLARE
  rec         RECORD;
  raw_part    TEXT;
  canon       TEXT;
BEGIN
  FOR rec IN
    SELECT id, company_id, area
    FROM   company_service_areas
    WHERE  area LIKE '%,%'          -- commas = concatenated
        OR area LIKE '%Bow Valley%' -- regional alias
        OR area <> trim(area)       -- stray whitespace
  LOOP
    -- Remove the bad row first
    DELETE FROM company_service_areas WHERE id = rec.id;

    -- Re-insert individual parts
    FOREACH raw_part IN ARRAY string_to_array(rec.area, ',')
    LOOP
      raw_part := trim(raw_part);

      canon := CASE lower(raw_part)
        WHEN 'canmore'                  THEN 'Canmore'
        WHEN 'banff'                    THEN 'Banff'
        WHEN 'dead man''s flats'        THEN 'Dead Man''s Flats'
        WHEN 'dead mans flats'          THEN 'Dead Man''s Flats'
        WHEN 'deadman''s flats'         THEN 'Dead Man''s Flats'
        WHEN 'dead man flats'           THEN 'Dead Man''s Flats'
        WHEN 'exshaw'                   THEN 'Exshaw'
        WHEN 'cochrane'                 THEN 'Cochrane'
        WHEN 'calgary'                  THEN 'Calgary'
        WHEN 'bow valley'               THEN 'BOW_VALLEY_EXPAND'
        WHEN 'the bow valley'           THEN 'BOW_VALLEY_EXPAND'
        WHEN 'bow valley corridor'      THEN 'BOW_VALLEY_EXPAND'
        ELSE NULL
      END;

      IF canon = 'BOW_VALLEY_EXPAND' THEN
        -- Expand alias into the two primary towns
        INSERT INTO company_service_areas (company_id, area)
        VALUES (rec.company_id, 'Canmore')
        ON CONFLICT (company_id, area) DO NOTHING;

        INSERT INTO company_service_areas (company_id, area)
        VALUES (rec.company_id, 'Banff')
        ON CONFLICT (company_id, area) DO NOTHING;

      ELSIF canon IS NOT NULL THEN
        INSERT INTO company_service_areas (company_id, area)
        VALUES (rec.company_id, canon)
        ON CONFLICT (company_id, area) DO NOTHING;

      ELSE
        RAISE NOTICE 'Unrecognised area value skipped for company %: "%"',
                     rec.company_id, raw_part;
      END IF;
    END LOOP;
  END LOOP;
END $$;

-- -------------------------------------------------------
-- STEP 3: Trim any remaining stray whitespace on clean rows
-- -------------------------------------------------------
UPDATE company_service_areas
SET    area = trim(area)
WHERE  area <> trim(area);

-- -------------------------------------------------------
-- STEP 4: Restore the area column to the service_area enum.
-- This will error loudly if any unrecognised text value
-- remains — intentional: fix the data, then re-run.
-- (View is already dropped from Step 1, so no dependency.)
-- -------------------------------------------------------
ALTER TABLE company_service_areas
  ALTER COLUMN area TYPE service_area USING area::service_area;

-- -------------------------------------------------------
-- STEP 5: Rebuild the companies_full view to be safe
--         (no structural change, just a clean recreate)
-- -------------------------------------------------------
CREATE OR REPLACE VIEW companies_full AS
SELECT
  c.*,
  COALESCE(
    ARRAY_AGG(DISTINCT csa.area::text) FILTER (WHERE csa.area IS NOT NULL),
    '{}'::text[]
  ) AS service_areas,
  COALESCE(
    ARRAY_AGG(DISTINCT csp.specialization::text) FILTER (WHERE csp.specialization IS NOT NULL),
    '{}'::text[]
  ) AS specializations
FROM       companies              c
LEFT JOIN  company_service_areas  csa ON csa.company_id = c.id
LEFT JOIN  company_specializations csp ON csp.company_id = c.id
WHERE      c.is_active = true
GROUP BY   c.id;

-- -------------------------------------------------------
-- STEP 6: Audit query — run this after applying to verify
-- -------------------------------------------------------
-- SELECT
--   c.name,
--   ARRAY_AGG(csa.area::text ORDER BY csa.area::text) AS service_areas
-- FROM companies c
-- LEFT JOIN company_service_areas csa ON csa.company_id = c.id
-- GROUP BY c.name
-- ORDER BY c.name;
