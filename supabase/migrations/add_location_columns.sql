-- Migration: Add granular location columns to profiles table
-- Purpose: Store County, Constituency, and Ward for better user localization

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS county TEXT,
ADD COLUMN IF NOT EXISTS constituency TEXT,
ADD COLUMN IF NOT EXISTS ward TEXT;

-- Create index for location-based queries
CREATE INDEX IF NOT EXISTS idx_profiles_county ON profiles(county);
CREATE INDEX IF NOT EXISTS idx_profiles_constituency ON profiles(constituency);
CREATE INDEX IF NOT EXISTS idx_profiles_ward ON profiles(ward);

COMMENT ON COLUMN profiles.county IS 'County of residence';
COMMENT ON COLUMN profiles.constituency IS 'Constituency of residence';
COMMENT ON COLUMN profiles.ward IS 'Ward of residence';
