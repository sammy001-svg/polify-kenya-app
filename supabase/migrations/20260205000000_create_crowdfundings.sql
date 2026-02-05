-- Create crowdfundings table
CREATE TABLE IF NOT EXISTS public.crowdfundings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    target_amount DECIMAL(12, 2) NOT NULL CHECK (target_amount > 0),
    collected_amount DECIMAL(12, 2) NOT NULL DEFAULT 0.00 CHECK (collected_amount >= 0),
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.crowdfundings ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view crowdfundings" ON public.crowdfundings
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create crowdfundings" ON public.crowdfundings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own crowdfundings" ON public.crowdfundings
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own crowdfundings" ON public.crowdfundings
    FOR DELETE USING (auth.uid() = user_id);

-- Storage Bucket for Crowdfunding Images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'crowdfunding', 
  'crowdfunding', 
  true, 
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Policy for Storage (Public Read, Auth Upload)
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'crowdfunding');

CREATE POLICY "Authenticated users can upload" ON storage.objects 
FOR INSERT WITH CHECK (
  bucket_id = 'crowdfunding' AND 
  auth.role() = 'authenticated'
);

CREATE POLICY "Users can update own images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'crowdfunding' AND 
  auth.uid() = owner
);

CREATE POLICY "Users can delete own images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'crowdfunding' AND 
  auth.uid() = owner
);
