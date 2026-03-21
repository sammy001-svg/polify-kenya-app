-- 1. Clean up existing duplicates to allow unique constraint creation
-- (Keeps only one record with same reference, deleting others)
DELETE FROM public.wallet_transactions a
USING public.wallet_transactions b
WHERE a.id > b.id AND a.reference = b.reference;

DELETE FROM public.campaign_payments a
USING public.campaign_payments b
WHERE a.id > b.id AND a.reference = b.reference;

-- 2. Ensure unique references (now safe to add)
ALTER TABLE public.campaign_payments DROP CONSTRAINT IF EXISTS campaign_payments_reference_key;
ALTER TABLE public.campaign_payments ADD CONSTRAINT campaign_payments_reference_key UNIQUE (reference);

ALTER TABLE public.wallet_transactions DROP CONSTRAINT IF EXISTS wallet_transactions_reference_key;
ALTER TABLE public.wallet_transactions ADD CONSTRAINT wallet_transactions_reference_key UNIQUE (reference);

-- 3. Create/Update the robust donation handler
CREATE OR REPLACE FUNCTION public.process_crowdfunding_donation(payment_reference TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    p_record RECORD;
    c_record RECORD;
BEGIN
    SELECT * INTO p_record FROM public.campaign_payments 
    WHERE reference = payment_reference FOR UPDATE;
    
    IF NOT FOUND THEN RETURN FALSE; END IF;
    IF p_record.status = 'completed' THEN RETURN TRUE; END IF;
    
    SELECT user_id INTO c_record FROM public.crowdfundings WHERE id = p_record.campaign_id;
    IF NOT FOUND THEN RETURN FALSE; END IF;
    
    UPDATE public.crowdfundings SET collected_amount = collected_amount + p_record.amount
    WHERE id = p_record.campaign_id;
    
    PERFORM public.credit_wallet(c_record.user_id, p_record.amount::DECIMAL, 'Campaign Donation (' || p_record.campaign_id || ')', payment_reference);
    
    UPDATE public.campaign_payments SET status = 'completed', updated_at = NOW()
    WHERE id = p_record.id;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
