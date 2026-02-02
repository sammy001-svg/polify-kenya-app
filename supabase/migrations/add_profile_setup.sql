-- Migration: Add profile_completed column to profiles table
-- Purpose: Track whether users have completed the profile setup step after registration

-- Add profile_completed column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' 
        AND column_name = 'profile_completed'
    ) THEN
        ALTER TABLE profiles 
        ADD COLUMN profile_completed BOOLEAN DEFAULT false;
    END IF;
END $$;

-- Ensure existing profiles have profile_completed set to true (for backwards compatibility)
-- This assumes all existing users have "completed" their profiles since they didn't go through the new flow
UPDATE profiles 
SET profile_completed = true 
WHERE profile_completed IS NULL OR profile_completed = false;

-- Create or update avatars storage bucket
-- Note: This should be done via Supabase Dashboard or Storage API

-- Storage bucket configuration:
-- Bucket name: avatars
-- Public: true (allow public read access)
-- File size limit: 5242880 (5MB)
-- Allowed MIME types: image/jpeg, image/png, image/webp

-- RLS Policies for avatars bucket:

-- Policy 1: Allow authenticated users to upload their own avatar
CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy 2: Allow public to read avatars
CREATE POLICY "Public can read avatars"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');

-- Policy 3: Allow users to update their own avatar
CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'avatars' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy 4: Allow users to delete their own avatar
CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'avatars' AND 
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Verify the profiles table has the necessary columns
-- Required columns:
-- - id (uuid, primary key)
-- - full_name (text)
-- - bio (text, nullable)
-- - avatar_url (text, nullable)
-- - role (text)
-- - profile_completed (boolean, default false)
-- - created_at (timestamp)
-- - updated_at (timestamp)

-- Example query to check table structure:
-- SELECT column_name, data_type, is_nullable, column_default
-- FROM information_schema.columns
-- WHERE table_name = 'profiles';
