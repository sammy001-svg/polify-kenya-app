-- COMPLETE SUPABASE SCHEMA FOR POLITICAL INTELLIGENCE
-- Generated: 2026-02-02
-- This script sets up the entire database schema from scratch.
-- It is idempotent: checks for existence before creating tables/policies.

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PUBLIC PROFILES TABLE (Extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  updated_at TIMESTAMP WITH TIME ZONE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  location TEXT, -- General location string
  bio TEXT,
  
  -- Granular Location
  county TEXT,
  constituency TEXT,
  ward TEXT,

  -- Civic Identification
  civic_id TEXT UNIQUE,
  email TEXT, -- Synced for lookups
  
  -- Role Management
  role TEXT DEFAULT 'citizen' CHECK (role IN ('citizen', 'politician', 'admin', 'auditor', 'creator')),
  
  -- Onboarding Status
  profile_completed BOOLEAN DEFAULT false,
  
  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- Enable RLS for Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2.1 Profile Policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone." 
  ON public.profiles FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
CREATE POLICY "Users can insert their own profile." 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile." ON public.profiles;
CREATE POLICY "Users can update own profile." 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- 3. FUNCTION: Handle New User (Auto-create profile)
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, email)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url',
    new.email
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call handle_new_user on auth.users insert
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 4. FUNCTION: Sync Email
CREATE OR REPLACE FUNCTION set_profile_email()
RETURNS TRIGGER AS $$
BEGIN
  SELECT email INTO NEW.email
  FROM auth.users
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_set_profile_email ON profiles;
CREATE TRIGGER trigger_set_profile_email
  BEFORE INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION set_profile_email();


-- 5. FUNCTION: Backfill Civic IDs (Utility function, manual run if needed)
CREATE OR REPLACE FUNCTION backfill_civic_ids()
RETURNS VOID AS $$
DECLARE
  user_record RECORD;
  current_year INTEGER;
  seq_num INTEGER := 1;
  new_civic_id TEXT;
BEGIN
  current_year := EXTRACT(YEAR FROM CURRENT_DATE);
  FOR user_record IN 
    SELECT id FROM profiles WHERE civic_id IS NULL ORDER BY created_at ASC
  LOOP
    new_civic_id := 'KE-' || current_year || '-' || LPAD(seq_num::TEXT, 6, '0');
    UPDATE profiles SET civic_id = new_civic_id WHERE id = user_record.id;
    seq_num := seq_num + 1;
  END LOOP;
END;
$$ LANGUAGE plpgsql;


-- 6. FEATURE TABLES

-- 6.1 PETITIONS
CREATE TABLE IF NOT EXISTS public.petitions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  target_signatures INTEGER DEFAULT 1000,
  current_signatures INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed', 'victory')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.petitions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public petitions are viewable by everyone" ON public.petitions;
CREATE POLICY "Public petitions are viewable by everyone" 
  ON public.petitions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can create petitions" ON public.petitions;
CREATE POLICY "Users can create petitions" 
  ON public.petitions FOR INSERT WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "Users can update own petitions" ON public.petitions;
CREATE POLICY "Users can update own petitions" 
  ON public.petitions FOR UPDATE USING (auth.uid() = created_by);

DROP POLICY IF EXISTS "Admins can delete any petition" ON public.petitions;
CREATE POLICY "Admins can delete any petition"
  ON petitions FOR DELETE
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');


-- 6.2 SIGNATURES
CREATE TABLE IF NOT EXISTS public.signatures (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  petition_id UUID REFERENCES public.petitions(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(petition_id, user_id)
);

ALTER TABLE public.signatures ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public signatures are viewable by everyone" ON public.signatures;
CREATE POLICY "Public signatures are viewable by everyone" 
  ON public.signatures FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can sign petitions" ON public.signatures;
CREATE POLICY "Users can sign petitions" 
  ON public.signatures FOR INSERT WITH CHECK (auth.uid() = user_id);


-- 6.3 CAMPAIGN EVENTS
CREATE TABLE IF NOT EXISTS public.campaign_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  time TEXT,
  volunteers_needed INTEGER DEFAULT 0,
  volunteers_registered INTEGER DEFAULT 0,
  status TEXT DEFAULT 'Upcoming',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.campaign_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Politicians can manage own events" ON public.campaign_events;
CREATE POLICY "Politicians can manage own events" 
  ON public.campaign_events FOR ALL 
  USING (auth.uid() = created_by);

DROP POLICY IF EXISTS "Public can view events" ON public.campaign_events;
CREATE POLICY "Public can view events" 
  ON public.campaign_events FOR SELECT 
  USING (true);


-- 6.4 ADVERTISEMENTS (For Ad Manager)
CREATE TABLE IF NOT EXISTS public.advertisements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  politician_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT,
  image_url TEXT NOT NULL,
  target_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.advertisements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Politicians can insert their own ads" ON public.advertisements;
CREATE POLICY "Politicians can insert their own ads" 
  ON public.advertisements FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = politician_id);

DROP POLICY IF EXISTS "Politicians can update their own ads" ON public.advertisements;
CREATE POLICY "Politicians can update their own ads" 
  ON public.advertisements FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = politician_id);
  
DROP POLICY IF EXISTS "Politicians can delete their own ads" ON public.advertisements;
CREATE POLICY "Politicians can delete their own ads" 
  ON public.advertisements FOR DELETE 
  TO authenticated 
  USING (auth.uid() = politician_id);

DROP POLICY IF EXISTS "Politicians can view their own ads" ON public.advertisements;
CREATE POLICY "Politicians can view their own ads" 
  ON public.advertisements FOR SELECT 
  TO authenticated 
  USING (auth.uid() = politician_id);

DROP POLICY IF EXISTS "Public can view active ads" ON public.advertisements;
CREATE POLICY "Public can view active ads" 
  ON public.advertisements FOR SELECT 
  TO anon, authenticated 
  USING (status = 'active');


-- 6.5 POLICY IDEAS
CREATE TABLE IF NOT EXISTS public.policy_ideas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT DEFAULT 'General',
    status TEXT DEFAULT 'submitted',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.policy_ideas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public policy ideas are viewable by everyone" ON public.policy_ideas;
CREATE POLICY "Public policy ideas are viewable by everyone" 
  ON public.policy_ideas FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can submit policy ideas" ON public.policy_ideas;
CREATE POLICY "Users can submit policy ideas" 
  ON public.policy_ideas FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own policy ideas" ON public.policy_ideas;
CREATE POLICY "Users can delete own policy ideas" 
  ON public.policy_ideas FOR DELETE USING (auth.uid() = user_id);
  
DROP POLICY IF EXISTS "Admins can delete any policy idea" ON public.policy_ideas;
CREATE POLICY "Admins can delete any policy idea" 
  ON public.policy_ideas FOR DELETE 
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');


-- 7. ADMIN PERMISSIONS EXPLICIT
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins can view all profiles"
ON profiles FOR SELECT
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;
CREATE POLICY "Admins can update all profiles"
ON profiles FOR UPDATE
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);


-- 8. STORAGE BUCKET POLICIES
-- NOTE: You must create the 'avatars', 'petitions', 'campaigns' buckets in the Dashboard first.
-- These RLS policies protect those buckets.

-- Avatars
DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

DROP POLICY IF EXISTS "Public can read avatars" ON storage.objects;
CREATE POLICY "Public can read avatars"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;
CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Petitions Images (Assuming bucket 'petitions')
DROP POLICY IF EXISTS "Users can upload petition images" ON storage.objects;
CREATE POLICY "Users can upload petition images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'petitions' AND (storage.foldername(name))[1] = auth.uid()::text);

DROP POLICY IF EXISTS "Public can read petition images" ON storage.objects;
CREATE POLICY "Public can read petition images"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'petitions');

-- 9. INDEXES
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_civic_id ON profiles(civic_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
