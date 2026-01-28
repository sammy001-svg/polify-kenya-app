-- ==============================================================================
-- POLITICAL INTELLIGENCE PLATFORM - COMPLETE PROJECT SETUP
-- ==============================================================================
-- This script sets up the entire database schema, enables Row Level Security (RLS),
-- configures access policies, sets up authentication triggers, and initializes storage.
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. TABLES
-- ==============================================================================

-- PROFILES (Extends Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'voter', -- 'voter', 'candidate', 'creator', 'admin'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- POLITICIANS (Public profiles for elected officials)
CREATE TABLE IF NOT EXISTS public.politicians (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    position TEXT NOT NULL, -- 'Governor', 'Senator', 'MP', etc.
    party TEXT,
    county TEXT,
    constituency TEXT,
    ward TEXT,
    is_incumbent BOOLEAN DEFAULT FALSE,
    bio TEXT,
    photo_url TEXT,
    slogan TEXT,
    manifesto TEXT,
    contact_info JSONB, -- { phone, email, socialMedia: { twitter, etc } }
    track_record JSONB, -- { billsSponsored, etc }
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CAMPAIGNS (For currently running candidates)
CREATE TABLE IF NOT EXISTS public.campaigns (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) NOT NULL,
    office TEXT NOT NULL,
    jurisdiction TEXT NOT NULL,
    party TEXT,
    slogan TEXT,
    overview TEXT,
    manifesto_summary TEXT,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CAMPAIGN TEAM
CREATE TABLE IF NOT EXISTS public.campaign_team (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    access_level TEXT DEFAULT 'member', -- 'admin', 'editor', 'viewer'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- MANIFESTO ITEMS
CREATE TABLE IF NOT EXISTS public.manifesto_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE NOT NULL,
    issue TEXT NOT NULL,
    problem TEXT,
    solution TEXT NOT NULL,
    implementation TEXT,
    outcome TEXT,
    timeline TEXT, -- 'Short-term', 'Medium-term', 'Long-term'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FINANCE RECORDS
CREATE TABLE IF NOT EXISTS public.finance_records (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE NOT NULL,
    type TEXT NOT NULL, -- 'donation' or 'expense'
    category TEXT NOT NULL, -- Source or Expense Category
    description TEXT,
    amount DECIMAL(12, 2) NOT NULL,
    date DATE NOT NULL,
    status TEXT DEFAULT 'pending',
    reference_code TEXT,
    receipt_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- YOUTH ISSUES
CREATE TABLE IF NOT EXISTS public.youth_issues (
    id TEXT PRIMARY KEY, -- slug, e.g., 'unemployment'
    title TEXT NOT NULL,
    description TEXT,
    color TEXT,
    stats JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ISSUE RESPONSES
CREATE TABLE IF NOT EXISTS public.issue_responses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    issue_id TEXT REFERENCES public.youth_issues(id) ON DELETE CASCADE NOT NULL,
    politician_id UUID REFERENCES public.politicians(id) ON DELETE CASCADE NOT NULL,
    response_text TEXT NOT NULL,
    proposed_actions JSONB,
    timeline TEXT,
    resources TEXT,
    success_metrics JSONB,
    likes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- BADGES & PROGRESS
CREATE TABLE IF NOT EXISTS public.badges (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    rarity TEXT,
    xp_reward INTEGER,
    requirements JSONB
);

CREATE TABLE IF NOT EXISTS public.user_progress (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
    level INTEGER DEFAULT 1,
    current_xp INTEGER DEFAULT 0,
    total_xp INTEGER DEFAULT 0,
    badges JSONB DEFAULT '[]'::jsonb,
    completed_modules JSONB DEFAULT '[]'::jsonb,
    streak INTEGER DEFAULT 0,
    last_login DATE
);

-- POLICY IDEAS
CREATE TABLE IF NOT EXISTS public.policy_ideas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT,
    votes INTEGER DEFAULT 0,
    status TEXT DEFAULT 'submitted',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.politicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_team ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manifesto_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.finance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.youth_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issue_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.policy_ideas ENABLE ROW LEVEL SECURITY;

-- 4. RLS POLICIES
-- ==============================================================================

-- PROFILES
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- POLITICIANS
DROP POLICY IF EXISTS "Politicians are publicly viewable" ON public.politicians;
CREATE POLICY "Politicians are publicly viewable" ON public.politicians FOR SELECT USING (true);

-- CAMPAIGNS
DROP POLICY IF EXISTS "Campaigns are viewable by everyone" ON public.campaigns;
CREATE POLICY "Campaigns are viewable by everyone" ON public.campaigns FOR SELECT USING (true);

DROP POLICY IF EXISTS "Candidates can create campaigns" ON public.campaigns;
CREATE POLICY "Candidates can create campaigns" ON public.campaigns FOR INSERT WITH CHECK (
    auth.uid() = user_id AND 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'candidate')
);

DROP POLICY IF EXISTS "Users can update their own campaign" ON public.campaigns;
CREATE POLICY "Users can update their own campaign" ON public.campaigns FOR UPDATE USING (auth.uid() = user_id);

-- CAMPAIGN TEAM
DROP POLICY IF EXISTS "Campaign owners manage team" ON public.campaign_team;
CREATE POLICY "Campaign owners manage team" ON public.campaign_team FOR ALL USING (
    EXISTS (SELECT 1 FROM public.campaigns WHERE id = campaign_team.campaign_id AND user_id = auth.uid())
);

-- MANIFESTO ITEMS
DROP POLICY IF EXISTS "Manifesto items are public" ON public.manifesto_items;
CREATE POLICY "Manifesto items are public" ON public.manifesto_items FOR SELECT USING (true);

DROP POLICY IF EXISTS "Campaign owners manage manifesto" ON public.manifesto_items;
CREATE POLICY "Campaign owners manage manifesto" ON public.manifesto_items FOR ALL USING (
    EXISTS (SELECT 1 FROM public.campaigns WHERE id = manifesto_items.campaign_id AND user_id = auth.uid())
);

-- FINANCE RECORDS
DROP POLICY IF EXISTS "Finance records viewable by campaign owners" ON public.finance_records;
CREATE POLICY "Finance records viewable by campaign owners" ON public.finance_records FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.campaigns WHERE id = finance_records.campaign_id AND user_id = auth.uid())
);

DROP POLICY IF EXISTS "Finance records editable by campaign owners" ON public.finance_records;
CREATE POLICY "Finance records editable by campaign owners" ON public.finance_records FOR ALL USING (
    EXISTS (SELECT 1 FROM public.campaigns WHERE id = finance_records.campaign_id AND user_id = auth.uid())
);

-- YOUTH ISSUES & RESPONSES
DROP POLICY IF EXISTS "Youth issues are public" ON public.youth_issues;
CREATE POLICY "Youth issues are public" ON public.youth_issues FOR SELECT USING (true);

DROP POLICY IF EXISTS "Issue responses are public" ON public.issue_responses;
CREATE POLICY "Issue responses are public" ON public.issue_responses FOR SELECT USING (true);

-- BADGES & PROGRESS
DROP POLICY IF EXISTS "Badges are public" ON public.badges;
CREATE POLICY "Badges are public" ON public.badges FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users manage own progress" ON public.user_progress;
CREATE POLICY "Users manage own progress" ON public.user_progress FOR ALL USING (auth.uid() = user_id);

-- POLICY IDEAS
DROP POLICY IF EXISTS "Policy ideas are public" ON public.policy_ideas;
CREATE POLICY "Policy ideas are public" ON public.policy_ideas FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can submit policy ideas" ON public.policy_ideas;
CREATE POLICY "Users can submit policy ideas" ON public.policy_ideas FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users update own ideas" ON public.policy_ideas;
CREATE POLICY "Users update own ideas" ON public.policy_ideas FOR UPDATE USING (auth.uid() = user_id);


-- 5. TRIGGERS & FUNCTIONS
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, role)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url',
    COALESCE(new.raw_user_meta_data->>'role', 'voter')
  );
  
  INSERT INTO public.user_progress (user_id) VALUES (new.id);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- 6. STORAGE BUCKETS
-- ==============================================================================

INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('campaign_media', 'campaign_media', true) ON CONFLICT (id) DO NOTHING;

-- Storage Policies
-- Avatars
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects FOR SELECT USING ( bucket_id = 'avatars' );
CREATE POLICY "Anyone can upload an avatar" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'avatars' AND auth.role() = 'authenticated' );
CREATE POLICY "Users can update their own avatar" ON storage.objects FOR UPDATE USING ( bucket_id = 'avatars' AND auth.uid() = owner );

-- Campaign Media
CREATE POLICY "Campaign media is publicly accessible" ON storage.objects FOR SELECT USING ( bucket_id = 'campaign_media' );
CREATE POLICY "Candidates can upload campaign media" ON storage.objects FOR INSERT WITH CHECK ( 
    bucket_id = 'campaign_media' AND 
    auth.role() = 'authenticated' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'candidate')
);
