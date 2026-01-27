-- SQL Script for Video Comments and Reactions

-- 1. VIDEO COMMENTS TABLE
CREATE TABLE IF NOT EXISTS public.video_comments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    video_id TEXT NOT NULL, -- Can be a UUID or a string ID from the feed
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    text TEXT NOT NULL,
    likes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. VIDEO REACTIONS TABLE (To track Likes/Dislikes per user)
CREATE TABLE IF NOT EXISTS public.video_reactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    video_id TEXT NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    reaction_type TEXT NOT NULL, -- 'like' or 'dislike'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(video_id, user_id) -- One reaction per video per user
);

-- 3. ENABLE ROW LEVEL SECURITY
ALTER TABLE public.video_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_reactions ENABLE ROW LEVEL SECURITY;

-- 4. RLS POLICIES FOR COMMENTS
CREATE POLICY "Comments are viewable by everyone" ON public.video_comments
    FOR SELECT USING (true);

CREATE POLICY "Users can post their own comments" ON public.video_comments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments" ON public.video_comments
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments" ON public.video_comments
    FOR DELETE USING (auth.uid() = user_id);

-- 5. RLS POLICIES FOR REACTIONS
CREATE POLICY "Reactions are viewable by everyone" ON public.video_reactions
    FOR SELECT USING (true);

CREATE POLICY "Users can manage their own reactions" ON public.video_reactions
    FOR ALL USING (auth.uid() = user_id);

-- 6. TRIGGER FOR UPDATED_AT
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_video_comments_updated_at
    BEFORE UPDATE ON public.video_comments
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
