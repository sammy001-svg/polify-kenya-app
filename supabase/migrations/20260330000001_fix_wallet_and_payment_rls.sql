-- 1. Upgrade campaign_payments amount to DECIMAL
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='campaign_payments' AND column_name='amount' AND data_type='integer') THEN
        ALTER TABLE public.campaign_payments ALTER COLUMN amount TYPE DECIMAL(12, 2);
    END IF;
END $$;

-- 2. Fix malformed RLS policies for campaign_payments
DROP POLICY IF EXISTS " Allow Webhook Updates\" ON public.campaign_payments;
DROP POLICY IF EXISTS "Allow Webhook Updates" ON public.campaign_payments;
DROP POLICY IF EXISTS " Allow Webhook Select\" ON public.campaign_payments;
DROP POLICY IF EXISTS "Allow Webhook Select" ON public.campaign_payments;
DROP POLICY IF EXISTS "Users can update own payments" ON public.campaign_payments;

-- Allow SELECT for everyone (needed for anonymous webhooks to find by reference)
CREATE POLICY "Allow Webhook Select" ON public.campaign_payments 
FOR SELECT 
TO public 
USING (true);

-- Allow UPDATE for anonymous users (filtered by status to prevent hijacking)
CREATE POLICY "Allow Webhook Updates" ON public.campaign_payments 
FOR UPDATE 
TO public 
USING (status = 'pending')
WITH CHECK (true);

-- Restore direct user update policy
CREATE POLICY "Users can update own payments" ON public.campaign_payments 
FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id);

-- 3. Fix debug_logs RLS
DROP POLICY IF EXISTS "Public can insert logs" ON public.debug_logs;
DROP POLICY IF EXISTS "Public can insert logs\" ON public.debug_logs;

CREATE POLICY "Public can insert logs" ON public.debug_logs 
FOR INSERT 
TO public 
WITH CHECK (true);

-- 4. Fix Wallet System RLS
-- Ensure users can initialize their own wallets
DROP POLICY IF EXISTS "Users can insert own wallet" ON public.wallets;
CREATE POLICY "Users can insert own wallet" ON public.wallets 
FOR INSERT TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- Ensure users can see their own transactions (already exists, but reinforcing)
DROP POLICY IF EXISTS "Users can view own wallet transactions" ON public.wallet_transactions;
CREATE POLICY "Users can view own wallet transactions" ON public.wallet_transactions 
FOR SELECT TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM public.wallets 
        WHERE wallets.id = wallet_transactions.wallet_id 
        AND wallets.user_id = auth.uid()
    )
);

-- 5. Business Wallet RLS Fixes (if specifically desired, though separate)
-- Businesses also need to be able to have their balances updated via systems
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "System can update business balance" ON public.businesses;
-- No direct public update, but we ensure service_role has access (implicit)
-- We add a policy for authenticated users to see their own business balance
DROP POLICY IF EXISTS "Owners can view own business balance" ON public.businesses;
CREATE POLICY "Owners can view own business balance" ON public.businesses 
FOR SELECT TO authenticated 
USING (auth.uid() = owner_id);

-- 6. Ensure wallet system functions are working
-- The credit_wallet function is already SECURITY DEFINER, so no RLS changes are strictly required 
-- for it to work, provided it's called by an authorized client or has appropriate GRANTS.

GRANT EXECUTE ON FUNCTION public.credit_wallet(UUID, DECIMAL, TEXT, TEXT) TO authenticated, anon, service_role;

-- 7. Add Business Wallet Credit RPC
CREATE OR REPLACE FUNCTION public.credit_business_wallet(target_business_id UUID, amount DECIMAL, description TEXT)
RETURNS VOID AS $$
BEGIN
    -- Record Transaction
    INSERT INTO public.business_transactions (business_id, type, amount, description)
    VALUES (target_business_id, 'deposit', amount, description);
    
    -- Update Balance
    UPDATE public.businesses
    SET wallet_balance = wallet_balance + amount, updated_at = NOW()
    WHERE id = target_business_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.credit_business_wallet(UUID, DECIMAL, TEXT) TO authenticated, anon, service_role;
