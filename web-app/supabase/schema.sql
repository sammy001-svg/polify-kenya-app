-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- PROFILES (Extends auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'voter', -- 'voter', 'candidate', 'admin'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- POLITICIANS (Public profiles for elected officials)
CREATE TABLE public.politicians (
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

-- CAMPAIGNS (For candidates using the platform)
CREATE TABLE public.campaigns (
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

-- CAMPAIGN TEAM MEMBERS
CREATE TABLE public.campaign_team (
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
CREATE TABLE public.manifesto_items (
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

-- CAMPAIGN FINANCE (Donations & Expenses)
CREATE TABLE public.finance_records (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE NOT NULL,
    type TEXT NOT NULL, -- 'donation' or 'expense'
    category TEXT NOT NULL, -- Source or Expense Category
    description TEXT, -- Donor name or expense description
    amount DECIMAL(12, 2) NOT NULL,
    date DATE NOT NULL,
    status TEXT DEFAULT 'pending', -- 'received', 'paid', 'pending'
    reference_code TEXT,
    receipt_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- YOUTH ISSUES (Topics)
CREATE TABLE public.youth_issues (
    id TEXT PRIMARY KEY, -- slug, e.g., 'unemployment'
    title TEXT NOT NULL,
    description TEXT,
    color TEXT,
    stats JSONB, -- Key stats
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- POLITICIAN RESPONSES TO ISSUES
CREATE TABLE public.issue_responses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    issue_id TEXT REFERENCES public.youth_issues(id) ON DELETE CASCADE NOT NULL,
    politician_id UUID REFERENCES public.politicians(id) ON DELETE CASCADE NOT NULL,
    response_text TEXT NOT NULL,
    proposed_actions JSONB, -- Array of strings
    timeline TEXT,
    resources TEXT,
    success_metrics JSONB, -- Array of strings
    likes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- GAMIFICATION: LEARNING PATHS & BADGES
CREATE TABLE public.badges (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    rarity TEXT,
    xp_reward INTEGER,
    requirements JSONB
);

CREATE TABLE public.user_progress (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
    level INTEGER DEFAULT 1,
    current_xp INTEGER DEFAULT 0,
    total_xp INTEGER DEFAULT 0,
    badges JSONB DEFAULT '[]'::jsonb, -- Array of badge IDs
    completed_modules JSONB DEFAULT '[]'::jsonb,
    streak INTEGER DEFAULT 0,
    last_login DATE
);

-- POLICY IDEAS (Crowdsourced)
CREATE TABLE public.policy_ideas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT,
    votes INTEGER DEFAULT 0,
    status TEXT DEFAULT 'submitted',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS POLICIES

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_team ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manifesto_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.finance_records ENABLE ROW LEVEL SECURITY;

-- Profiles: Public read, User edit own
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Campaigns: Public read (or restricted?), Owners edit
CREATE POLICY "Campaigns are viewable by everyone" ON public.campaigns FOR SELECT USING (true);
CREATE POLICY "Users can insert their own campaign" ON public.campaigns FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own campaign" ON public.campaigns FOR UPDATE USING (auth.uid() = user_id);

-- Finance: Restricted to campaign owners
CREATE POLICY "Finance records viewable by campaign owners" ON public.finance_records FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.campaigns WHERE id = finance_records.campaign_id AND user_id = auth.uid())
);
CREATE POLICY "Finance records editable by campaign owners" ON public.finance_records FOR ALL USING (
    EXISTS (SELECT 1 FROM public.campaigns WHERE id = finance_records.campaign_id AND user_id = auth.uid())
);

-- Helper function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  
  INSERT INTO public.user_progress (user_id) VALUES (new.id);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

