-- Create campaign_payments table
CREATE TABLE IF NOT EXISTS public.campaign_payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL,
  phone_number TEXT NOT NULL,
  
  -- Identifiers
  reference TEXT NOT NULL, -- Our internal reference (e.g., SUB-UID-TIMESTAMP)
  checkout_request_id TEXT, -- M-Pesa/PayHero Checkout Request ID
  merchant_request_id TEXT, -- Optional, from provider
  
  -- Status
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'cancelled'
  result_code INTEGER,
  result_description TEXT,
  
  -- Metadata
  plan_id TEXT, -- 'campaigner', 'national'
  provider TEXT DEFAULT 'm-pesa',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.campaign_payments ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own payments
CREATE POLICY "Users can view own payments" 
ON public.campaign_payments 
FOR SELECT 
USING (auth.uid() = user_id);

-- Policy: Admins can view all payments
CREATE POLICY "Admins can view all payments" 
ON public.campaign_payments 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Policy: Service role or Server Actions can insert/update
-- (We allow authenticated users to insert their *initiation* record via server action which runs as them, 
--  but updates should ideally be system/webhook only. 
--  For simplicity in this app's architecture where actions use user auth, we allow insert/update own)

CREATE POLICY "Users can insert own payments" 
ON public.campaign_payments 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own payments" 
ON public.campaign_payments 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Indexes for fast lookup
CREATE INDEX IF NOT EXISTS idx_campaign_payments_reference ON public.campaign_payments(reference);
CREATE INDEX IF NOT EXISTS idx_campaign_payments_checkout_id ON public.campaign_payments(checkout_request_id);
CREATE INDEX IF NOT EXISTS idx_campaign_payments_user_id ON public.campaign_payments(user_id);

-- Trigger for updated_at
CREATE TRIGGER update_campaign_payments_updated_at
BEFORE UPDATE ON public.campaign_payments
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();
