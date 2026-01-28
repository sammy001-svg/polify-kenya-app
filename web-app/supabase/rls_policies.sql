-- Enable RLS on all tables
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

-- 1. PROFILES
-- Public read access
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);

-- User can update their own profile
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. POLITICIANS
-- Everyone can view politicians
DROP POLICY IF EXISTS "Politicians are publicly viewable" ON public.politicians;
CREATE POLICY "Politicians are publicly viewable" ON public.politicians FOR SELECT USING (true);

-- 3. CAMPAIGNS
-- Everyone can view campaigns
DROP POLICY IF EXISTS "Campaigns are viewable by everyone" ON public.campaigns;
CREATE POLICY "Campaigns are viewable by everyone" ON public.campaigns FOR SELECT USING (true);

-- Users can create/update their own campaign
DROP POLICY IF EXISTS "Users can insert their own campaign" ON public.campaigns;
CREATE POLICY "Users can insert their own campaign" ON public.campaigns FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own campaign" ON public.campaigns;
CREATE POLICY "Users can update their own campaign" ON public.campaigns FOR UPDATE USING (auth.uid() = user_id);

-- 4. CAMPAIGN TEAM
-- Viewable by campaign owner and team members (Complex, simplifying to: Campaign Owners can view/edit)
DROP POLICY IF EXISTS "Campaign owners manage team" ON public.campaign_team;
CREATE POLICY "Campaign owners manage team" ON public.campaign_team FOR ALL USING (
    EXISTS (SELECT 1 FROM public.campaigns WHERE id = campaign_team.campaign_id AND user_id = auth.uid())
);

-- 5. MANIFESTO ITEMS
-- Public read
DROP POLICY IF EXISTS "Manifesto items are public" ON public.manifesto_items;
CREATE POLICY "Manifesto items are public" ON public.manifesto_items FOR SELECT USING (true);

-- Campaign Owners can edit
DROP POLICY IF EXISTS "Campaign owners manage manifesto" ON public.manifesto_items;
CREATE POLICY "Campaign owners manage manifesto" ON public.manifesto_items FOR ALL USING (
    EXISTS (SELECT 1 FROM public.campaigns WHERE id = manifesto_items.campaign_id AND user_id = auth.uid())
);

-- 6. FINANCE RECORDS
-- Already restricted in schema.sql, re-affirming
DROP POLICY IF EXISTS "Finance records viewable by campaign owners" ON public.finance_records;
CREATE POLICY "Finance records viewable by campaign owners" ON public.finance_records FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.campaigns WHERE id = finance_records.campaign_id AND user_id = auth.uid())
);

DROP POLICY IF EXISTS "Finance records editable by campaign owners" ON public.finance_records;
CREATE POLICY "Finance records editable by campaign owners" ON public.finance_records FOR ALL USING (
    EXISTS (SELECT 1 FROM public.campaigns WHERE id = finance_records.campaign_id AND user_id = auth.uid())
);

-- 7. YOUTH ISSUES
-- Public read
DROP POLICY IF EXISTS "Youth issues are public" ON public.youth_issues;
CREATE POLICY "Youth issues are public" ON public.youth_issues FOR SELECT USING (true);

-- 8. ISSUE RESPONSES
-- Public read
DROP POLICY IF EXISTS "Issue responses are public" ON public.issue_responses;
CREATE POLICY "Issue responses are public" ON public.issue_responses FOR SELECT USING (true);

-- 9. BADGES
-- Public read
DROP POLICY IF EXISTS "Badges are public" ON public.badges;
CREATE POLICY "Badges are public" ON public.badges FOR SELECT USING (true);

-- 10. USER PROGRESS
-- Users read/write their own
DROP POLICY IF EXISTS "Users manage own progress" ON public.user_progress;
CREATE POLICY "Users manage own progress" ON public.user_progress FOR ALL USING (auth.uid() = user_id);

-- 11. POLICY IDEAS
-- Public read
DROP POLICY IF EXISTS "Policy ideas are public" ON public.policy_ideas;
CREATE POLICY "Policy ideas are public" ON public.policy_ideas FOR SELECT USING (true);

-- Authenticated users can submit
DROP POLICY IF EXISTS "Users can submit policy ideas" ON public.policy_ideas;
CREATE POLICY "Users can submit policy ideas" ON public.policy_ideas FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users update own
DROP POLICY IF EXISTS "Users update own ideas" ON public.policy_ideas;
CREATE POLICY "Users update own ideas" ON public.policy_ideas FOR UPDATE USING (auth.uid() = user_id);
