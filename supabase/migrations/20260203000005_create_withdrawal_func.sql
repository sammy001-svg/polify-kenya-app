-- Function to safely request withdrawal
-- 1. Checks bounds
-- 2. Deducts balance
-- 3. Logs transaction
-- Returns transaction ID or error

CREATE OR REPLACE FUNCTION public.request_withdrawal(user_id UUID, amount DECIMAL, phone TEXT)
RETURNS UUID AS $$
DECLARE
    target_wallet_id UUID;
    current_balance DECIMAL;
    new_tx_id UUID;
BEGIN
    -- Get Wallet and Lock Row
    SELECT id, balance INTO target_wallet_id, current_balance 
    FROM public.wallets 
    WHERE public.wallets.user_id = request_withdrawal.user_id 
    FOR UPDATE;
    
    IF target_wallet_id IS NULL THEN
        RAISE EXCEPTION 'Wallet not found';
    END IF;

    IF current_balance < amount THEN
        RAISE EXCEPTION 'Insufficient funds';
    END IF;
    
    -- Deduct Balance
    UPDATE public.wallets
    SET balance = balance - amount, updated_at = NOW()
    WHERE id = target_wallet_id;
    
    -- Record Transaction
    INSERT INTO public.wallet_transactions (wallet_id, type, amount, status, description, reference)
    VALUES (target_wallet_id, 'withdrawal', amount, 'pending', 'Withdrawal to ' || phone, phone)
    RETURNING id INTO new_tx_id;
    
    RETURN new_tx_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
