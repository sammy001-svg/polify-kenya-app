-- First, ensure the campaign_id column exists
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='campaign_payments' AND column_name='campaign_id') THEN
        ALTER TABLE public.campaign_payments 
        ADD COLUMN campaign_id UUID REFERENCES public.crowdfundings(id) ON DELETE SET NULL;
    END IF;
END $$;

-- Create index for faster lookups if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_campaign_payments_campaign_id ON public.campaign_payments(campaign_id);
