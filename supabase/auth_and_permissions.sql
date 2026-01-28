-- 1. ENHANCED USER REGISTRATION TRIGGER
-- This ensures that when a user signs up via the UI, their Role and Name are correctly copied to the public profile.

CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, role)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url',
    COALESCE(new.raw_user_meta_data->>'role', 'voter') -- Default to 'voter' if missing
  );
  
  -- Initialize empty user progress
  INSERT INTO public.user_progress (user_id) VALUES (new.id);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Re-create the trigger to use the updated function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- 2. ROLE-BASED PERMISSIONS (RLS Refined)

-- A. CAMPAIGNS
-- Only users with role 'candidate' can create campaigns
DROP POLICY IF EXISTS "Candidates can create campaigns" ON public.campaigns;
CREATE POLICY "Candidates can create campaigns" ON public.campaigns FOR INSERT WITH CHECK (
    auth.uid() = user_id AND 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'candidate')
);

-- B. CREATOR CONTENT (Simulated via separate tables usually, but assuming creators managing their content)
-- Example: If we had a 'creator_posts' table
-- CREATE POLICY "Creators can post" ON public.creator_posts FOR INSERT WITH CHECK (
--    auth.uid() = user_id AND 
--    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'creator')
-- );


-- 3. STORAGE PERMISSIONS (For Avatars & Media)

-- Create a storage bucket for avatars if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Create a storage bucket for campaign assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('campaign_media', 'campaign_media', true)
ON CONFLICT (id) DO NOTHING;

-- Avatar Policies
CREATE POLICY "Avatar images are publicly accessible"
ON storage.objects FOR SELECT
USING ( bucket_id = 'avatars' );

CREATE POLICY "Anyone can upload an avatar"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'avatars' AND auth.role() = 'authenticated' );

CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'avatars' AND auth.uid() = owner );

-- Campaign Media Policies (Only Candidates)
CREATE POLICY "Campaign media is publicly accessible"
ON storage.objects FOR SELECT
USING ( bucket_id = 'campaign_media' );

CREATE POLICY "Candidates can upload campaign media"
ON storage.objects FOR INSERT
WITH CHECK ( 
    bucket_id = 'campaign_media' AND 
    auth.role() = 'authenticated' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'candidate')
);
