-- # Opinion Polls Hub Database Schema
-- Optimized for Supabase/PostgreSQL
-- ## 0. Clean Slate (Fixes "Already Exists" Errors)
DROP TABLE IF EXISTS public.opinion_poll_votes CASCADE;
DROP TABLE IF EXISTS public.opinion_poll_options CASCADE;
DROP TABLE IF EXISTS public.opinion_polls CASCADE;
DROP FUNCTION IF EXISTS public.increment_opinion_poll_vote CASCADE;

-- ## 1. Opinion Polls Table
CREATE TABLE public.opinion_polls (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category TEXT NOT NULL CHECK (category IN ('Leadership', 'Economy', 'Health', 'Education', 'Environment', 'Social')),
    question TEXT NOT NULL,
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed')),
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ## 2. Poll Options Table
CREATE TABLE public.opinion_poll_options (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    poll_id UUID REFERENCES public.opinion_polls(id) ON DELETE CASCADE,
    option_label TEXT NOT NULL,
    votes_count INTEGER DEFAULT 0
);

-- ## 3. User Votes Table
-- Prevents double voting and tracks participation
CREATE TABLE public.opinion_poll_votes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    poll_id UUID REFERENCES public.opinion_polls(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    option_id UUID REFERENCES public.opinion_poll_options(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(poll_id, user_id) -- One vote per poll per user
);

-- ## 4. Atomic Vote Increment Function
-- Ensures vote counts are updated reliably
CREATE OR REPLACE FUNCTION public.increment_opinion_poll_vote(option_id_param UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE public.opinion_poll_options
    SET votes_count = votes_count + 1
    WHERE id = option_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ## 5. Row Level Security (RLS)
ALTER TABLE public.opinion_polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opinion_poll_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opinion_poll_votes ENABLE ROW LEVEL SECURITY;

-- Read Access: Everyone can view polls and options
CREATE POLICY "Public Read Access for Polls" ON public.opinion_polls FOR SELECT USING (true);
CREATE POLICY "Public Read Access for Options" ON public.opinion_poll_options FOR SELECT USING (true);

-- Vote Access: Authenticated users can vote once
CREATE POLICY "Authenticated users can vote" ON public.opinion_poll_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can see their own votes" ON public.opinion_poll_votes FOR SELECT USING (auth.uid() = user_id);

-- ## 6. Seed Data (Matches CitizenOpinionPolls.tsx)
-- Insert Polls with fixed IDs for the Presidential Poll to match frontend fallback
INSERT INTO public.opinion_polls (id, category, question, expires_at)
VALUES 
    ('b1d03c51-5079-4a0b-93e1-5e8a715f62a1', 'Leadership', 'If the Presidential election were held today, who would you vote for?', now() + interval '48 hours'),
    (gen_random_uuid(), 'Economy', 'Do you support the proposed 15% digital tax on content creators in the Finance Bill 2026?', now() + interval '12 hours'),
    (gen_random_uuid(), 'Health', 'Is the transition from NHIF to SHIF improving your access to healthcare services?', now() + interval '3 days'),
    (gen_random_uuid(), 'Education', 'Should the University funding model prioritize student needs over institutional grants?', now() + interval '24 hours'),
    (gen_random_uuid(), 'Environment', 'Is the ''15 Billion Trees'' initiative making a visible impact in your county?', now() + interval '6 days');

-- Note: Options should be inserted referencing the generated poll IDs
-- In a real migration, we use temporary variables or DO blocks
DO $$
DECLARE
    poll_id_val UUID := 'b1d03c51-5079-4a0b-93e1-5e8a715f62a1';
BEGIN
    -- Leadership options (Fixed IDs to match frontend)
    INSERT INTO public.opinion_poll_options (id, poll_id, option_label, votes_count) VALUES 
        ('e1c2a3b4-d5e6-4f7a-8b9c-0d1e2f3a4b5c', poll_id_val, 'William Ruto', 0),
        ('e2c3a4b5-d6e7-4f8a-9b0c-1d2e3f4a5b6c', poll_id_val, 'Rigathi Gachagua', 0),
        ('e3c4a5b6-d7e8-4f9a-0b1c-2d3e4f5a6b7c', poll_id_val, 'Kalonzo Musyoka', 0),
        ('e4c5a6b7-d8e9-4f0a-1b2c-3d4e5f6a7b8c', poll_id_val, 'Edwin Sifuna', 0),
        ('e5c6a7b8-d9e0-4f1a-2b3c-4d5e6f7a8b9c', poll_id_val, 'Others / Undecided', 0);

    -- Economy options
    SELECT id INTO poll_id_val FROM public.opinion_polls WHERE category = 'Economy' LIMIT 1;
    INSERT INTO public.opinion_poll_options (poll_id, option_label, votes_count) VALUES 
        (poll_id_val, 'Yes, increase revenue', 0),
        (poll_id_val, 'No, it stifles innovation', 0),
        (poll_id_val, 'Support with amendments', 0);

    -- Health options
    SELECT id INTO poll_id_val FROM public.opinion_polls WHERE category = 'Health' LIMIT 1;
    INSERT INTO public.opinion_poll_options (poll_id, option_label, votes_count) VALUES 
        (poll_id_val, 'Significant improvement', 0),
        (poll_id_val, 'Slightly better', 0),
        (poll_id_val, 'It has become worse', 0),
        (poll_id_val, 'No noticeable change', 0);

    -- Education options
    SELECT id INTO poll_id_val FROM public.opinion_polls WHERE category = 'Education' LIMIT 1;
    INSERT INTO public.opinion_poll_options (poll_id, option_label, votes_count) VALUES 
        (poll_id_val, 'Strongly Agree', 0),
        (poll_id_val, 'Strongly Disagree', 0),
        (poll_id_val, 'Neutral / Unsure', 0);

    -- Environment options
    SELECT id INTO poll_id_val FROM public.opinion_polls WHERE category = 'Environment' LIMIT 1;
    INSERT INTO public.opinion_poll_options (poll_id, option_label, votes_count) VALUES 
        (poll_id_val, 'Major impact seen', 0),
        (poll_id_val, 'Minor impact seen', 0),
        (poll_id_val, 'No impact yet', 0);
END $$;
