-- Migration: Update handle_new_user to capture all metadata
-- This ensures civic_id, username, and location data are saved to profiles on signup.

CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    full_name, 
    avatar_url, 
    email, 
    civic_id, 
    username, 
    role, 
    -- Add other fields if they exist in your profiles table schema
    -- Note: Ensure these columns exist in 'profiles' table first!
    -- Based on schema_dump_complete.sql, we have:
    -- location, bio, county, constituency, ward
    county,
    constituency,
    ward
  )
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url',
    new.email,
    new.raw_user_meta_data->>'civic_id',
    new.raw_user_meta_data->>'username',
    COALESCE(new.raw_user_meta_data->>'role', 'citizen'),
    new.raw_user_meta_data->>'county',
    new.raw_user_meta_data->>'constituency',
    new.raw_user_meta_data->>'ward'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;