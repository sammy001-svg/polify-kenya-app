-- SQL Script for Bunge Bites (Shorts)

-- 1. SHORTS TABLE
CREATE TABLE IF NOT EXISTS public.shorts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    video_url TEXT NOT NULL,
    title TEXT NOT NULL,
    creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    creator_name TEXT NOT NULL, -- Cached for performance
    creator_avatar TEXT, -- Cached for performance
    description TEXT,
    verification_status TEXT DEFAULT 'Pending', -- 'Verified', 'Pending', 'Fact-Checked'
    tags TEXT[],
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    shares_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. ENABLE ROW LEVEL SECURITY
ALTER TABLE public.shorts ENABLE ROW LEVEL SECURITY;

-- 3. RLS POLICIES
DROP POLICY IF EXISTS "Shorts are viewable by everyone" ON public.shorts;
CREATE POLICY "Shorts are viewable by everyone" ON public.shorts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Creators can upload shorts" ON public.shorts;
CREATE POLICY "Creators can upload shorts" ON public.shorts FOR INSERT WITH CHECK (
    auth.uid() = creator_id AND 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND (role = 'creator' OR role = 'candidate'))
);

DROP POLICY IF EXISTS "Creators can update own shorts" ON public.shorts;
CREATE POLICY "Creators can update own shorts" ON public.shorts FOR UPDATE USING (auth.uid() = creator_id);

DROP POLICY IF EXISTS "Creators can delete own shorts" ON public.shorts;
CREATE POLICY "Creators can delete own shorts" ON public.shorts FOR DELETE USING (auth.uid() = creator_id);

-- 4. SAMPLE DATA SEED
-- Note: Assuming IDs exist from your previous seed or project state
-- These can be run manually after ensuring creator IDs are correct.

/*
INSERT INTO public.shorts (video_url, title, creator_id, creator_name, creator_avatar, description, verification_status, tags)
VALUES 
('https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 'Finance Bill 2026: The Tea ☕️', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Candidate Alice', '/creators/bunge-roaster.jpg', 'Breaking down the new levies in less than 60 seconds. Know your taxes! #FinanceBill #Kenya', 'Verified', ARRAY['#FinanceBill', '#Kenya', '#Taxes']),
('https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'Recalling your MP? Step 1 ✍️', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Candidate Alice', '/creators/sheria-mtaani.jpg', 'Think it''s hard to recall an MP? Here''s the first legal step you need to take. #CivicDuty #KenyaLaws', 'Fact-Checked', ARRAY['#CivicDuty', '#KenyaLaws', '#RecallMP']);
*/
