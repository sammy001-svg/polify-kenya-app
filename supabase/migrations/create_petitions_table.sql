-- Migration: Create Petitions and Signatures Tables

-- Create petitions table
CREATE TABLE IF NOT EXISTS petitions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_by UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  target_signatures INTEGER DEFAULT 1000,
  current_signatures INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed', 'victory')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create signatures table (to track who signed what)
CREATE TABLE IF NOT EXISTS signatures (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  petition_id UUID REFERENCES petitions(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(petition_id, user_id) -- One signature per user per petition
);

-- Create RLS Policies
ALTER TABLE petitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE signatures ENABLE ROW LEVEL SECURITY;

-- Policies for Petitions
CREATE POLICY "Public petitions are viewable by everyone" ON petitions
  FOR SELECT USING (true);

CREATE POLICY "Users can create petitions" ON petitions
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own petitions" ON petitions
  FOR UPDATE USING (auth.uid() = created_by);

-- Policies for Signatures
CREATE POLICY "Public signatures are viewable by everyone" ON signatures
  FOR SELECT USING (true);

CREATE POLICY "Users can sign petitions" ON signatures
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create Indexes
CREATE INDEX IF NOT EXISTS idx_petitions_created_by ON petitions(created_by);
CREATE INDEX IF NOT EXISTS idx_signatures_petition_id ON signatures(petition_id);
CREATE INDEX IF NOT EXISTS idx_signatures_user_id ON signatures(user_id);
