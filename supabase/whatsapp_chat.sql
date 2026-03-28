-- WhatsApp-style Chat Space Schema

-- 1. Chat Rooms (Private & Groups)
CREATE TABLE IF NOT EXISTS public.chat_rooms (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT, -- Null for private chats
    avatar_url TEXT,
    is_group BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Chat Participants
CREATE TABLE IF NOT EXISTS public.chat_participants (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    room_id UUID REFERENCES public.chat_rooms(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    role TEXT DEFAULT 'member', -- 'member', 'admin'
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(room_id, user_id)
);

-- 3. Messages
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    room_id UUID REFERENCES public.chat_rooms(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    content TEXT,
    media_url TEXT,
    type TEXT DEFAULT 'text', -- 'text', 'image', 'audio', 'system'
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. User Statuses
CREATE TABLE IF NOT EXISTS public.user_statuses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    content TEXT,
    media_url TEXT,
    type TEXT DEFAULT 'text', -- 'text', 'image'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '24 hours')
);

-- 5. Enable RLS
ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_statuses ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies
-- Users can only see rooms they are participants in
CREATE POLICY "Users can see their rooms" ON public.chat_rooms
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.chat_participants
        WHERE room_id = public.chat_rooms.id AND user_id = auth.uid()
    )
);

CREATE POLICY "Users can see room participants" ON public.chat_participants
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.chat_participants AS p
        WHERE p.room_id = public.chat_participants.room_id AND p.user_id = auth.uid()
    )
);

CREATE POLICY "Users can read messages in their rooms" ON public.chat_messages
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.chat_participants
        WHERE room_id = public.chat_messages.room_id AND user_id = auth.uid()
    )
);

CREATE POLICY "Users can insert messages in their rooms" ON public.chat_messages
FOR INSERT WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.chat_participants
        WHERE room_id = public.chat_messages.room_id AND user_id = auth.uid()
    ) AND auth.uid() = user_id
);

CREATE POLICY "Users can see all statuses" ON public.user_statuses
FOR SELECT USING (expires_at > NOW());

CREATE POLICY "Users can manage their own status" ON public.user_statuses
FOR ALL USING (auth.uid() = user_id);
