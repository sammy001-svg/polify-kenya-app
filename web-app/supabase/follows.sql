-- SQL Script for Followers and Following System

-- 1. USER FOLLOWS TABLE
-- This table tracks who follows whom (users following other users or politicians)
CREATE TABLE IF NOT EXISTS public.follows (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    follower_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- The target being followed
    following_profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    following_politician_id UUID REFERENCES public.politicians(id) ON DELETE CASCADE,
    
    -- Constraints: 
    -- 1. Must follow exactly one thing (either a user profile or a public politician)
    -- 2. Cannnot follow yourself
    CONSTRAINT follow_target_check CHECK (
        (following_profile_id IS NOT NULL AND following_politician_id IS NULL) OR
        (following_profile_id IS NULL AND following_politician_id IS NOT NULL)
    ),
    CONSTRAINT self_follow_check CHECK (follower_id != following_profile_id),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Unique constraint to prevent duplicate follows
    UNIQUE(follower_id, following_profile_id),
    UNIQUE(follower_id, following_politician_id)
);

-- 2. ENABLE ROW LEVEL SECURITY
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;

-- 3. RLS POLICIES
-- Anyone can see who follows whom
CREATE POLICY "Follow relationships are viewable by everyone" ON public.follows
    FOR SELECT USING (true);

-- Only the follower can create or remove their follow relationship
CREATE POLICY "Users can manage their own followings" ON public.follows
    FOR ALL USING (auth.uid() = follower_id);

-- 4. VIEW FOR AGGREGATED COUNTS (Optional but helpful)
-- This view makes it easy to fetch follower/following counts for profiles
CREATE OR REPLACE VIEW public.profile_stats AS
SELECT 
    p.id as profile_id,
    (SELECT COUNT(*) FROM public.follows WHERE following_profile_id = p.id) as followers_count,
    (SELECT COUNT(*) FROM public.follows WHERE follower_id = p.id) as following_count
FROM public.profiles p;

-- 5. VIEW FOR POLITICIAN COUNTS
CREATE OR REPLACE VIEW public.politician_stats AS
SELECT 
    pol.id as politician_id,
    (SELECT COUNT(*) FROM public.follows WHERE following_politician_id = pol.id) as followers_count
FROM public.politicians pol;
