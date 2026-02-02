-- Migration: Add civic identification system
-- Adds username and civic_id columns to profiles table
-- Creates indexes and constraints for efficient lookups

-- Add username column (user-chosen, unique handle)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS username TEXT UNIQUE;

-- Add civic_id column (auto-generated unique identifier)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS civic_id TEXT UNIQUE;

-- Add email column for easier lookups (synced from auth.users)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email TEXT;

-- Create indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_civic_id ON profiles(civic_id);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- Add username format constraint (3-20 chars, lowercase letters, numbers, underscores)
ALTER TABLE profiles ADD CONSTRAINT username_format 
  CHECK (username IS NULL OR username ~ '^[a-z0-9_]{3,20}$');

-- Add civic_id format constraint (KE-YYYY-NNNNNN)
ALTER TABLE profiles ADD CONSTRAINT civic_id_format 
  CHECK (civic_id IS NULL OR civic_id ~ '^KE-[0-9]{4}-[0-9]{6}$');

-- Backfill civic IDs for existing users
-- This generates civic IDs for all users who don't have one yet
DO $$ 
DECLARE
  user_record RECORD;
  current_year INTEGER;
  seq_num INTEGER := 1;
  new_civic_id TEXT;
BEGIN
  current_year := EXTRACT(YEAR FROM CURRENT_DATE);
  
  FOR user_record IN 
    SELECT id, created_at, email
    FROM profiles 
    WHERE civic_id IS NULL OR username IS NULL
    ORDER BY created_at ASC
  LOOP
    -- Generate civic ID based on registration year if missing
    IF new_civic_id IS NULL OR EXISTS (SELECT 1 FROM profiles WHERE id = user_record.id AND civic_id IS NULL) THEN
       new_civic_id := 'KE-' || current_year || '-' || LPAD(seq_num::TEXT, 6, '0');
    END IF;

    -- Generate placeholder username if missing (e.g. citizen_000001)
    -- This ensures existing users have a username
    UPDATE profiles 
    SET 
      civic_id = COALESCE(civic_id, new_civic_id),
      username = COALESCE(username, 'citizen_' || LPAD(seq_num::TEXT, 6, '0'))
    WHERE id = user_record.id;
    
    seq_num := seq_num + 1;
  END LOOP;
END $$;

-- Sync email from auth.users to profiles table
-- This ensures we can lookup users by email in the profiles table
UPDATE profiles p
SET email = u.email
FROM auth.users u
WHERE p.id = u.id AND p.email IS NULL;

-- Make civic_id non-nullable after backfill
-- ALTER TABLE profiles ALTER COLUMN civic_id SET NOT NULL;
-- Note: Commented out to allow gradual migration. Uncomment after all users have civic IDs.

-- Create a function to automatically set email when profile is created
CREATE OR REPLACE FUNCTION set_profile_email()
RETURNS TRIGGER AS $$
BEGIN
  -- Get email from auth.users
  SELECT email INTO NEW.email
  FROM auth.users
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to auto-populate email
DROP TRIGGER IF EXISTS trigger_set_profile_email ON profiles;
CREATE TRIGGER trigger_set_profile_email
  BEFORE INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION set_profile_email();

-- Grant necessary permissions
-- GRANT SELECT ON profiles TO anon, authenticated;
-- GRANT INSERT, UPDATE ON profiles TO authenticated;

COMMENT ON COLUMN profiles.username IS 'User-chosen unique handle (3-20 chars, lowercase letters, numbers, underscores)';
COMMENT ON COLUMN profiles.civic_id IS 'Auto-generated unique civic identifier (format: KE-YYYY-NNNNNN)';
COMMENT ON COLUMN profiles.email IS 'User email synced from auth.users for easier lookups';
