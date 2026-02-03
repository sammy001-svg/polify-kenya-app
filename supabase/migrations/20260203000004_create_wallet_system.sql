-- Create wallets table
CREATE TABLE IF NOT EXISTS public.wallets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
    balance DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'KES',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create wallet_transactions table
CREATE TABLE IF NOT EXISTS public.wallet_transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    wallet_id UUID REFERENCES public.wallets(id) ON DELETE CASCADE NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('deposit', 'withdrawal')),
    amount DECIMAL(12, 2) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
    reference VARCHAR(100), -- External reference or related table ID
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;

-- Policies for Wallets
CREATE POLICY "Users can view own wallet" ON public.wallets
    FOR SELECT USING (auth.uid() = user_id);

-- Policies for Transactions
CREATE POLICY "Users can view own wallet transactions" ON public.wallet_transactions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.wallets 
            WHERE wallets.id = wallet_transactions.wallet_id 
            AND wallets.user_id = auth.uid()
        )
    );

-- Admin policies (optional)
CREATE POLICY "Admins can view all wallets" ON public.wallets
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- Function to safely credit wallet
CREATE OR REPLACE FUNCTION public.credit_wallet(target_user_id UUID, amount DECIMAL, description TEXT, reference TEXT)
RETURNS VOID AS $$
DECLARE
    target_wallet_id UUID;
BEGIN
    -- Get or Create Wallet
    INSERT INTO public.wallets (user_id) VALUES (target_user_id)
    ON CONFLICT (user_id) DO NOTHING;
    
    SELECT id INTO target_wallet_id FROM public.wallets WHERE user_id = target_user_id;
    
    -- Record Transaction
    INSERT INTO public.wallet_transactions (wallet_id, type, amount, status, reference, description)
    VALUES (target_wallet_id, 'deposit', amount, 'completed', reference, description);
    
    -- Update Balance
    UPDATE public.wallets
    SET balance = balance + amount, updated_at = NOW()
    WHERE id = target_wallet_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
