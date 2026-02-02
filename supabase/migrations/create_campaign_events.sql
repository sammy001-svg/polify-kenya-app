-- Migration: Create Campaign Events Table

CREATE TABLE IF NOT EXISTS campaign_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_by UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL, -- 'Rally', 'TownHall', etc.
  description TEXT,
  location TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  time TEXT, -- Optional display time string if needed, or derived from date
  volunteers_needed INTEGER DEFAULT 0,
  volunteers_registered INTEGER DEFAULT 0,
  status TEXT DEFAULT 'Upcoming', -- 'Upcoming', 'Completed', 'Cancelled'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE campaign_events ENABLE ROW LEVEL SECURITY;

-- Policies

-- 1. Politicians can manage their own events
CREATE POLICY "Politicians can manage own events" ON campaign_events
  FOR ALL
  USING (auth.uid() = created_by);

-- 2. Public can view all events (or maybe just verified users? keeping broad for now)
CREATE POLICY "Public can view events" ON campaign_events
  FOR SELECT
  USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_campaign_events_created_by ON campaign_events(created_by);
CREATE INDEX IF NOT EXISTS idx_campaign_events_date ON campaign_events(date);
