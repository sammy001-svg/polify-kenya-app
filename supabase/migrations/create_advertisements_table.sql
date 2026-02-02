-- Create advertisements table
CREATE TABLE IF NOT EXISTS advertisements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  politician_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT,
  image_url TEXT NOT NULL,
  target_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE advertisements ENABLE ROW LEVEL SECURITY;

-- Policy: Politicians can manage their own ads
CREATE POLICY "Politicians can insert their own ads" 
ON advertisements FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = politician_id);

CREATE POLICY "Politicians can update their own ads" 
ON advertisements FOR UPDATE 
TO authenticated 
USING (auth.uid() = politician_id);

CREATE POLICY "Politicians can delete their own ads" 
ON advertisements FOR DELETE 
TO authenticated 
USING (auth.uid() = politician_id);

CREATE POLICY "Politicians can view their own ads" 
ON advertisements FOR SELECT 
TO authenticated 
USING (auth.uid() = politician_id);

-- Policy: Everyone can view active ads
CREATE POLICY "Public can view active ads" 
ON advertisements FOR SELECT 
TO anon, authenticated 
USING (status = 'active');

-- Index for faster queries
CREATE INDEX idx_advertisements_status ON advertisements(status);
CREATE INDEX idx_advertisements_politician_id ON advertisements(politician_id);
