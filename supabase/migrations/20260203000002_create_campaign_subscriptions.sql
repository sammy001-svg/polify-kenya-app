-- Create campaign_subscriptions table
CREATE TABLE IF NOT EXISTS public.campaign_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  plan_id TEXT NOT NULL, -- 'free', 'basic', 'pro'
  status TEXT NOT NULL DEFAULT 'inactive', -- 'active', 'inactive', 'cancelled'
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.campaign_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own subscription
CREATE POLICY "Users can view own subscription" 
ON public.campaign_subscriptions 
FOR SELECT 
USING (auth.uid() = user_id);

-- Policy: Admin can view all subscriptions
CREATE POLICY "Admins can view all subscriptions" 
ON public.campaign_subscriptions 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Policy: Users can insert/update their own subscription (for our mock flow)
-- In a real app, this would be handled by a webhook or server-side function
CREATE POLICY "Users can update own subscription" 
ON public.campaign_subscriptions 
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Add unique constraint to ensure one subscription per user
CREATE UNIQUE INDEX IF NOT EXISTS campaign_subscriptions_user_id_idx ON public.campaign_subscriptions (user_id);

-- Function to handle updated_at
CREATE TRIGGER update_campaign_subscriptions_updated_at
BEFORE UPDATE ON public.campaign_subscriptions
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();
