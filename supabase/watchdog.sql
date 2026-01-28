-- Extension for Citizen Watchdog Reporting System

-- 1. DEVELOPMENT PROJECTS
CREATE TABLE IF NOT EXISTS public.development_projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL, -- 'Education', 'Health', 'Infrastructure', etc.
    budget BIGINT,
    constituency TEXT NOT NULL,
    ward TEXT,
    status TEXT DEFAULT 'Ongoing', -- 'Completed', 'Ongoing', 'Stalled'
    completion_rate INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. PROJECT REPORTS (Citizen Feedback)
CREATE TABLE IF NOT EXISTS public.project_reports (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    project_id UUID REFERENCES public.development_projects(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    status_report TEXT NOT NULL, -- User's description of what they see
    sentiment TEXT DEFAULT 'Neutral', -- 'Positive', 'Neutral', 'Negative' (for Veracity score)
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ENABLE ROW LEVEL SECURITY
ALTER TABLE public.development_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_reports ENABLE ROW LEVEL SECURITY;

-- 4. RLS POLICIES
CREATE POLICY "Public read access for development projects" ON public.development_projects FOR SELECT USING (true);
CREATE POLICY "Public read access for project reports" ON public.project_reports FOR SELECT USING (true);

CREATE POLICY "Authenticated users can submit reports" ON public.project_reports 
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 5. INITIAL SEED DATA (Optional, but helpful for development)
-- In a real app, this might be handled via a migration or admin panel.
-- INSERT INTO public.development_projects (title, description, category, budget, constituency, status, completion_rate)
-- VALUES ('Westlands Primary Upgrade', 'Renovation of 12 classrooms', 'Education', 15000000, 'Westlands', 'Ongoing', 45);
