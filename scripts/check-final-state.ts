import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkFinalState() {
    console.log("Checking final state of payments...");
    const { data: payments, error: pError } = await supabase
        .from('campaign_payments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

    if (pError) console.error("Error fetching payments:", pError.message);
    else console.table(payments.map(p => ({ ref: p.reference, status: p.status, user: p.user_id })));

    console.log("\nChecking wallets...");
    const { data: wallets, error: wError } = await supabase
        .from('wallets')
        .select('*');
        
    if (wError) console.error("Error fetching wallets:", wError.message);
    else console.table(wallets.map(w => ({ user: w.user_id, balance: w.balance })));
}

checkFinalState();
