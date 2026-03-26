-- Create event_likes table
CREATE TABLE IF NOT EXISTS public.event_likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES public.campaign_events(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.event_likes ENABLE ROW LEVEL SECURITY;

-- Policies

-- Anyone can "Like" an event
DROP POLICY IF EXISTS "Anyone can like an event" ON public.event_likes;
CREATE POLICY "Anyone can like an event" ON public.event_likes
    FOR INSERT WITH CHECK (true);

-- Anyone can see the likes count
DROP POLICY IF EXISTS "Public can view likes" ON public.event_likes;
CREATE POLICY "Public can view likes" ON public.event_likes
    FOR SELECT USING (true);

-- Explicitly grant access to anon and authenticated roles
GRANT ALL ON public.event_likes TO anon, authenticated, service_role;
