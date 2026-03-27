-- Manual Submissions Table for Tallying Centre
CREATE TABLE IF NOT EXISTS public.manual_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    form_type TEXT DEFAULT 'Form-34A',
    image_url TEXT NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
    ai_validation_details JSONB DEFAULT '{}',
    constituency TEXT,
    polling_station TEXT,
    is_deleted BOOLEAN DEFAULT FALSE
);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_manual_submissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_manual_submissions_updated_at
BEFORE UPDATE ON public.manual_submissions
FOR EACH ROW
EXECUTE FUNCTION public.handle_manual_submissions_updated_at();

-- Enable RLS
ALTER TABLE public.manual_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own submissions" 
ON public.manual_submissions FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all submissions" 
ON public.manual_submissions FOR SELECT 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

CREATE POLICY "Authenticated users can submit result forms" 
ON public.manual_submissions FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pending submissions" 
ON public.manual_submissions FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id AND status = 'pending')
WITH CHECK (auth.uid() = user_id AND status = 'pending');

-- Indexes
CREATE INDEX IF NOT EXISTS idx_manual_submissions_user ON public.manual_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_manual_submissions_status ON public.manual_submissions(status);
CREATE INDEX IF NOT EXISTS idx_manual_submissions_created_at ON public.manual_submissions(created_at);
