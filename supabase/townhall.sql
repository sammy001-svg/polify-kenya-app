-- SQL Script for Mashinani (Town Hall) Interactive Features

-- 1. TOWN HALL SESSIONS
CREATE TABLE IF NOT EXISTS public.townhalls (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    host_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'scheduled', -- 'scheduled', 'live', 'ended'
    started_at TIMESTAMP WITH TIME ZONE,
    ended_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. LIVE CHAT
CREATE TABLE IF NOT EXISTS public.live_chats (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    townhall_id UUID REFERENCES public.townhalls(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. LIVE POLLS
CREATE TABLE IF NOT EXISTS public.live_polls (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    townhall_id UUID REFERENCES public.townhalls(id) ON DELETE CASCADE NOT NULL,
    question TEXT NOT NULL,
    status TEXT DEFAULT 'open', -- 'open', 'closed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.live_poll_options (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    poll_id UUID REFERENCES public.live_polls(id) ON DELETE CASCADE NOT NULL,
    option_label TEXT NOT NULL,
    votes_count INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.live_poll_votes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    poll_id UUID REFERENCES public.live_polls(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    option_id UUID REFERENCES public.live_poll_options(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(poll_id, user_id)
);

-- 4. LIVE Q&A
CREATE TABLE IF NOT EXISTS public.live_qa (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    townhall_id UUID REFERENCES public.townhalls(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    question TEXT NOT NULL,
    is_answered BOOLEAN DEFAULT FALSE,
    upvotes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.live_qa_upvotes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    qa_id UUID REFERENCES public.live_qa(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    UNIQUE(qa_id, user_id)
);

-- 5. ENABLE ROW LEVEL SECURITY
ALTER TABLE public.townhalls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_poll_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_poll_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_qa ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_qa_upvotes ENABLE ROW LEVEL SECURITY;

-- 6. RLS POLICIES
CREATE POLICY "Public read access for townhall content" ON public.townhalls FOR SELECT USING (true);
CREATE POLICY "Public read access for chats" ON public.live_chats FOR SELECT USING (true);
CREATE POLICY "Public read access for polls" ON public.live_polls FOR SELECT USING (true);
CREATE POLICY "Public read access for poll options" ON public.live_poll_options FOR SELECT USING (true);
CREATE POLICY "Public read access for Q&A" ON public.live_qa FOR SELECT USING (true);

CREATE POLICY "Users can post to live chat" ON public.live_chats FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can vote in polls" ON public.live_poll_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can submit questions" ON public.live_qa FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can upvote questions" ON public.live_qa_upvotes FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 7. RPC FUNCTIONS FOR COUNTERS
-- Increment QA Upvotes
CREATE OR REPLACE FUNCTION public.increment_qa_upvotes(qa_id_param UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.live_qa
  SET upvotes = upvotes + 1
  WHERE id = qa_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Decrement QA Upvotes
CREATE OR REPLACE FUNCTION public.decrement_qa_upvotes(qa_id_param UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.live_qa
  SET upvotes = upvotes - 1
  WHERE id = qa_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Increment Poll Vote
CREATE OR REPLACE FUNCTION public.increment_poll_vote(option_id_param UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.live_poll_options
  SET votes_count = votes_count + 1
  WHERE id = option_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
