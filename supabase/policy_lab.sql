-- AI-Powered Policy Lab Schema Extension

-- 1. POLICY IDEAS TABLE
CREATE TABLE IF NOT EXISTS public.policy_ideas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    impact_statement TEXT,
    target_audience TEXT[],
    author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    status TEXT DEFAULT 'submitted', -- 'submitted', 'under-review', 'popular', 'presented', 'implemented'
    
    -- AI Analysis Data (JSONB for flexibility)
    ai_analysis JSONB DEFAULT '{
        "feasibility": 0,
        "cost_index": 0,
        "impact_score": 0,
        "analyst_notes": "Awaiting initial review...",
        "ai_status": "pending"
    }'::jsonb,
    
    votes_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. VOTES TABLE (To prevent duplicate voting)
CREATE TABLE IF NOT EXISTS public.policy_votes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    policy_id UUID REFERENCES public.policy_ideas(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(policy_id, user_id)
);

-- 3. ENABLE RLS
ALTER TABLE public.policy_ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.policy_votes ENABLE ROW LEVEL SECURITY;

-- 4. RLS POLICIES
CREATE POLICY "Anyone can view policy ideas" ON public.policy_ideas FOR SELECT USING (true);
CREATE POLICY "Authenticated users can submit ideas" ON public.policy_ideas FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update their own ideas" ON public.policy_ideas FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Anyone can view votes" ON public.policy_votes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can vote" ON public.policy_votes FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can remove their vote" ON public.policy_votes FOR DELETE USING (auth.uid() = user_id);

-- 5. FUNCTION TO INCREMENT VOTE COUNT
CREATE OR REPLACE FUNCTION public.handle_policy_vote()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        UPDATE public.policy_ideas SET votes_count = votes_count + 1 WHERE id = NEW.policy_id;
    ELSIF (TG_OP = 'DELETE') THEN
        UPDATE public.policy_ideas SET votes_count = votes_count - 1 WHERE id = OLD.policy_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. TRIGGER FOR VOTE COUNT
DROP TRIGGER IF EXISTS on_policy_vote ON public.policy_votes;
CREATE TRIGGER on_policy_vote
AFTER INSERT OR DELETE ON public.policy_votes
FOR EACH ROW EXECUTE FUNCTION public.handle_policy_vote();
