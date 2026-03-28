-- PoliFy Chat Space: Comprehensive Database Schema
-- Last Updated: 2026-03-28

-- 1. Chat Rooms (Groups, DMs, & Barazas)
CREATE TABLE IF NOT EXISTS public.chat_rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT, -- Null for DMs
    description TEXT,
    avatar_url TEXT,
    type TEXT NOT NULL CHECK (type IN ('dm', 'group', 'baraza')),
    created_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- 2. Chat Participants (Junction table)
CREATE TABLE IF NOT EXISTS public.chat_participants (
    room_id UUID REFERENCES public.chat_rooms(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member')),
    joined_at TIMESTAMPTZ DEFAULT now(),
    is_archived BOOLEAN DEFAULT false,
    last_read_at TIMESTAMPTZ DEFAULT now(),
    PRIMARY KEY (room_id, user_id)
);

-- 3. Chat Messages
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id UUID REFERENCES public.chat_rooms(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    type TEXT DEFAULT 'text' CHECK (type IN ('text', 'image', 'video', 'audio', 'file')),
    media_url TEXT,
    is_edited BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. User Statuses (24-hour expiration)
CREATE TABLE IF NOT EXISTS public.user_statuses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT, -- Caption or text status
    media_url TEXT,
    type TEXT DEFAULT 'image' CHECK (type IN ('image', 'text')),
    background_color TEXT, -- For text statuses
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Voice Sessions (Live Barazas)
CREATE TABLE IF NOT EXISTS public.voice_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id UUID REFERENCES public.chat_rooms(id) ON DELETE CASCADE,
    topic TEXT NOT NULL,
    status TEXT DEFAULT 'live' CHECK (status IN ('live', 'ended')),
    started_at TIMESTAMPTZ DEFAULT now(),
    ended_at TIMESTAMPTZ,
    participant_count INT DEFAULT 0
);

-- ==========================================
-- 5. Row Level Security (RLS)
-- ==========================================

-- Helper Function for RLS to avoid recursion
CREATE OR REPLACE FUNCTION public.check_membership(p_room_id UUID) 
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.chat_participants
    WHERE room_id = p_room_id AND user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS
ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_statuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voice_sessions ENABLE ROW LEVEL SECURITY;

-- 5.1 Chat Rooms Policies
DROP POLICY IF EXISTS "Users can view rooms they are in" ON public.chat_rooms;
CREATE POLICY "Users can view rooms they are in" ON public.chat_rooms
    FOR SELECT USING ( public.check_membership(id) );

-- 5.2 Chat Participants Policies
DROP POLICY IF EXISTS "Users can view fellow participants" ON public.chat_participants;
CREATE POLICY "Users can view fellow participants" ON public.chat_participants
    FOR SELECT USING ( public.check_membership(room_id) );

-- 5.3 Chat Messages Policies
DROP POLICY IF EXISTS "Users can view messages in their rooms" ON public.chat_messages;
CREATE POLICY "Users can view messages in their rooms" ON public.chat_messages
    FOR SELECT USING ( public.check_membership(room_id) );

DROP POLICY IF EXISTS "Users can insert messages in their rooms" ON public.chat_messages;
CREATE POLICY "Users can insert messages in their rooms" ON public.chat_messages
    FOR INSERT WITH CHECK ( public.check_membership(room_id) );

-- 5.4 Status Policies
DROP POLICY IF EXISTS "Statuses are viewable by everyone" ON public.user_statuses;
CREATE POLICY "Statuses are viewable by everyone" ON public.user_statuses
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own status" ON public.user_statuses;
CREATE POLICY "Users can update own status" ON public.user_statuses
    FOR ALL USING (auth.uid() = user_id);

-- Realtime: Enable for necessary tables
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'chat_messages') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'chat_rooms') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_rooms;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'chat_participants') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_participants;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'user_statuses') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.user_statuses;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'voice_sessions') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.voice_sessions;
    END IF;
END $$;

-- 6. Helper Function: Get Chat List for a User
-- This returns rooms, participant info, last message, and unread counts
DROP FUNCTION IF EXISTS get_user_chats(UUID);
CREATE OR REPLACE FUNCTION get_user_chats(p_user_uuid UUID)
RETURNS TABLE (
    room_id UUID,
    room_type TEXT,
    room_name TEXT,
    room_avatar TEXT,
    last_message TEXT,
    last_message_time TIMESTAMP WITH TIME ZONE,
    unread_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        r.id as room_id,
        r.type as room_type,
        COALESCE(
            CASE 
                WHEN r.type = 'dm' THEN p_other.full_name
                ELSE r.name 
            END, 
            'Citizen'
        ) as room_name,
        COALESCE(
            CASE 
                WHEN r.type = 'dm' THEN p_other.avatar_url
                ELSE r.avatar_url 
            END, 
            'https://api.dicebear.com/7.x/avataaars/svg?seed=' || r.id::text
        ) as room_avatar,
        last_m.content as last_message,
        last_m.created_at as last_message_time,
        COALESCE(unread_m.unread, 0)::BIGINT as unread_count
    FROM chat_rooms r
    JOIN chat_participants cp ON cp.room_id = r.id AND cp.user_id = p_user_uuid
    LEFT JOIN chat_participants cp_other ON cp_other.room_id = r.id AND cp_other.user_id != p_user_uuid
    LEFT JOIN profiles p_other ON p_other.id = cp_other.user_id
    LEFT JOIN LATERAL (
        SELECT m.content, m.created_at
        FROM chat_messages m
        WHERE m.room_id = r.id
        ORDER BY m.created_at DESC
        LIMIT 1
    ) last_m ON true
    LEFT JOIN (
        SELECT m.room_id, COUNT(*) as unread
        FROM chat_messages m
        JOIN chat_participants cp2 ON cp2.room_id = m.room_id AND cp2.user_id = p_user_uuid
        WHERE m.created_at > COALESCE(cp2.last_read_at, '1970-01-01'::timestamp)
        GROUP BY m.room_id
    ) unread_m ON unread_m.room_id = r.id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 7. Helper Function: Mark Chat as Read
DROP FUNCTION IF EXISTS mark_chat_read(UUID, UUID);
CREATE OR REPLACE FUNCTION mark_chat_read(user_uuid UUID, room_uuid UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE chat_participants
    SET last_read_at = NOW()
    WHERE user_id = user_uuid AND room_id = room_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Helper Function: Get or Create DM Room
DROP FUNCTION IF EXISTS get_or_create_dm(UUID);
CREATE OR REPLACE FUNCTION get_or_create_dm(user2_id UUID)
RETURNS UUID AS $$
DECLARE
    found_room_id UUID;
    user1_id UUID := auth.uid();
BEGIN
    -- Check if user is trying to DM themselves (optional, but good practice)
    -- IF user1_id = user2_id THEN RETURN NULL; END IF;

    -- Check if DM exists
    SELECT p1.room_id INTO found_room_id
    FROM chat_participants p1
    JOIN chat_participants p2 ON p1.room_id = p2.room_id
    JOIN chat_rooms r ON r.id = p1.room_id
    WHERE r.type = 'dm'
      AND p1.user_id = user1_id
      AND p2.user_id = user2_id;

    IF found_room_id IS NOT NULL THEN
        RETURN found_room_id;
    END IF;

    -- Create new DM room
    INSERT INTO chat_rooms (type) VALUES ('dm') RETURNING id INTO found_room_id;
    
    -- Add participants
    INSERT INTO chat_participants (room_id, user_id) VALUES (found_room_id, user1_id);
    INSERT INTO chat_participants (room_id, user_id) VALUES (found_room_id, user2_id);

    RETURN found_room_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ==========================================
-- REALTIME SUBSCRIPTIONS
-- ==========================================

-- Automatically delete statuses older than 24 hours (Logic for an Edge Function ideally)
-- Trigger to update last_read_at or participant counts could be added here.
