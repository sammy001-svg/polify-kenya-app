-- Add images column to marketplace_items
ALTER TABLE public.marketplace_items 
ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT ARRAY[]::TEXT[];

-- Create storage bucket for marketplace
INSERT INTO storage.buckets (id, name, public)
VALUES ('marketplace', 'marketplace', true)
ON CONFLICT (id) DO NOTHING;

-- Policy to allow authenticated users to upload to marketplace bucket
CREATE POLICY "Authenticated users can upload marketplace images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'marketplace');

-- Policy to allow public to view marketplace images
CREATE POLICY "Public can view marketplace images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'marketplace');
