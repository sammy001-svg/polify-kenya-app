-- Create elections table
CREATE TABLE IF NOT EXISTS public.elections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed', 'upcoming')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create candidates table
CREATE TABLE IF NOT EXISTS public.election_candidates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    election_id UUID REFERENCES public.elections(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    party TEXT NOT NULL, -- UDA, ODM, WIPER, etc.
    position TEXT NOT NULL, -- President, Governor, Senator, MP, MCA
    location TEXT DEFAULT 'Kenya', -- 'Kenya' for Pres, County Name, Const Name, etc.
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create results table
CREATE TABLE IF NOT EXISTS public.election_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    candidate_id UUID REFERENCES public.election_candidates(id) ON DELETE CASCADE,
    level TEXT NOT NULL CHECK (level IN ('national', 'county', 'constituency', 'ward')),
    location_name TEXT NOT NULL, -- e.g., 'Nairobi', 'Westlands', 'Kilimani'
    votes INTEGER DEFAULT 0,
    total_valid_votes INTEGER DEFAULT 0, -- Context for percentages
    reporting_stations INTEGER DEFAULT 0,
    total_stations INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.elections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.election_candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.election_results ENABLE ROW LEVEL SECURITY;

-- Policies (Public Read, Admin Write)
CREATE POLICY "Public can read elections" ON public.elections FOR SELECT USING (true);
CREATE POLICY "Public can read candidates" ON public.election_candidates FOR SELECT USING (true);
CREATE POLICY "Public can read results" ON public.election_results FOR SELECT USING (true);

-- Functions (Admin only writes handled by Supabase dashboard or admin actions usually, but we are open for now)
CREATE POLICY "Admins can insert elections" ON public.elections FOR INSERT WITH CHECK (true); -- Simplified for now
CREATE POLICY "Admins can update results" ON public.election_results FOR UPDATE USING (true); 

-- SEED DATA (For Demonstration)
DO $$
DECLARE
    election_id UUID;
    ruto_id UUID;
    raila_id UUID;
    kalonzo_id UUID;
    wajackoyah_id UUID;
BEGIN
    -- 1. Create Election
    INSERT INTO public.elections (name, status) 
    VALUES ('General Election 2027', 'active')
    RETURNING id INTO election_id;

    -- 2. Create Presidential Candidates
    INSERT INTO public.election_candidates (election_id, name, party, position, location, photo_url)
    VALUES 
        (election_id, 'William Ruto', 'UDA', 'President', 'Kenya', '/avatars/ruto.jpg') RETURNING id INTO ruto_id;
        
    INSERT INTO public.election_candidates (election_id, name, party, position, location, photo_url)
    VALUES 
        (election_id, 'Raila Odinga', 'ODM', 'President', 'Kenya', '/avatars/raila.jpg') RETURNING id INTO raila_id;
        
    INSERT INTO public.election_candidates (election_id, name, party, position, location, photo_url)
    VALUES 
        (election_id, 'Kalonzo Musyoka', 'WIPER', 'President', 'Kenya', '/avatars/kalonzo.jpg') RETURNING id INTO kalonzo_id;

    INSERT INTO public.election_candidates (election_id, name, party, position, location, photo_url)
    VALUES 
        (election_id, 'George Wajackoyah', 'ROOTS', 'President', 'Kenya', '/avatars/wajackoyah.jpg') RETURNING id INTO wajackoyah_id;

    -- 3. Insert National Results (Mock Data)
    INSERT INTO public.election_results (candidate_id, level, location_name, votes, total_valid_votes, reporting_stations, total_stations)
    VALUES
        (ruto_id, 'national', 'Kenya', 7150000, 14200000, 46000, 46229),
        (raila_id, 'national', 'Kenya', 6900000, 14200000, 46000, 46229),
        (kalonzo_id, 'national', 'Kenya', 100000, 14200000, 46000, 46229),
        (wajackoyah_id, 'national', 'Kenya', 50000, 14200000, 46000, 46229);

    -- 4. Insert Some County Results (Nairobi)
    INSERT INTO public.election_results (candidate_id, level, location_name, votes, total_valid_votes, reporting_stations, total_stations)
    VALUES
        (ruto_id, 'county', 'Nairobi', 500000, 1500000, 3000, 3000),
        (raila_id, 'county', 'Nairobi', 900000, 1500000, 3000, 3000),
        (kalonzo_id, 'county', 'Nairobi', 80000, 1500000, 3000, 3000);

END $$;
