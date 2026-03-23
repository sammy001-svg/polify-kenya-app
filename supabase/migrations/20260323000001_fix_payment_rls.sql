-- Allow webhooks to update payments by reference
DROP POLICY IF EXISTS " Allow Webhook Updates\ ON public.campaign_payments;
CREATE POLICY \Allow Webhook Updates\ ON public.campaign_payments 
FOR UPDATE 
TO public
USING (status = 'pending')
WITH CHECK (true);

-- Also allow webhooks to view payments by reference
DROP POLICY IF EXISTS \Allow Webhook Select\ ON public.campaign_payments;
CREATE POLICY \Allow Webhook Select\ ON public.campaign_payments 
FOR SELECT 
TO public
USING (true);

-- Ensure debug_logs is accessible for debugging
DROP POLICY IF EXISTS \Public can insert logs\ ON public.debug_logs;
CREATE POLICY \Public can insert logs\ ON public.debug_logs FOR INSERT TO public WITH CHECK (true);