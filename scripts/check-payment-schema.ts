import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
    console.log("Checking Tables...");
    
    // Check campaign_payments
    const { data: payments, error: pError } = await supabase.from('campaign_payments').select('id').limit(1);
    if (pError) console.error("campaign_payments table missing or error:", pError.message);
    else console.log("campaign_payments table exists.");

    // Check campaign_subscriptions
    const { data: subs, error: sError } = await supabase.from('campaign_subscriptions').select('id').limit(1);
    if (sError) console.error("campaign_subscriptions table missing or error:", sError.message);
    else console.log("campaign_subscriptions table exists.");

    // Check wallets
    const { data: wallets, error: wError } = await supabase.from('wallets').select('id, balance').limit(1);
    if (wError) console.error("wallets table missing or error:", wError.message);
    else console.log("wallets table exists.");

    // Check RPCs (this is harder to check via JS client without knowing the arguments, but we can try a dummy call)
    console.log("Testing RPCs (expecting errors if not existing or wrong args)...");
    
    const { error: rpc1Error } = await supabase.rpc('process_crowdfunding_donation', { payment_reference: 'test' });
    console.log("process_crowdfunding_donation RPC status:", rpc1Error?.code === 'PGRST202' ? "MISSING" : "EXISTS (or has other error)");

    const { error: rpc2Error } = await supabase.rpc('credit_wallet', { target_user_id: 'test', amount: 0, description: 'test', reference: 'test' });
    console.log("credit_wallet RPC status:", rpc2Error?.code === 'PGRST202' ? "MISSING" : "EXISTS (or has other error)");
}

checkSchema();
