-- Create event_reservations table
CREATE TABLE IF NOT EXISTS public.event_reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES public.campaign_events(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(event_id, phone_number)
);

-- Index for faster counts
CREATE INDEX IF NOT EXISTS idx_reservations_event_id ON public.event_reservations(event_id);

-- Enable RLS
ALTER TABLE public.event_reservations ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Anyone can join an event" ON public.event_reservations;
CREATE POLICY "Anyone can join an event" ON public.event_reservations
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users can view reservations for their own events" ON public.event_reservations;
CREATE POLICY "Users can view reservations for their own events" ON public.event_reservations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.campaign_events
            WHERE campaign_events.id = event_reservations.event_id
            AND campaign_events.created_by = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Public can view reservations" ON public.event_reservations;
CREATE POLICY "Public can view reservations" ON public.event_reservations
    FOR SELECT USING (true);

-- Explicitly grant access to anon and authenticated roles
GRANT ALL ON public.event_reservations TO anon, authenticated, service_role;
