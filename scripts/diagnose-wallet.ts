import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function runDiagnostics() {
    console.log("=== Polify Wallet Diagnostics ===");
    
    // 1. Check Profiles
    console.log("\n1. Checking Users...");
    const { data: users, error: uError } = await supabase.from('profiles').select('id, full_name, email').limit(5);
    if (uError) console.error("Error fetching profiles:", uError.message);
    else {
        console.log(`Found ${users.length} users.`);
        users.forEach(u => console.log(`- ${u.full_name} (${u.id})`));
    }

    if (!users || users.length === 0) return;
    const testUser = users[0];

    // 2. Check Wallets
    console.log("\n2. Checking Wallets...");
    const { data: wallets, error: wError } = await supabase.from('wallets').select('*').eq('user_id', testUser.id);
    if (wError) console.error("Error fetching wallets:", wError.message);
    else if (wallets.length === 0) console.log(`- No wallet found for user ${testUser.full_name}`);
    else console.log(`- Wallet for ${testUser.full_name}: Balance ${wallets[0].balance} ${wallets[0].currency}`);

    // 3. Check Recent Payments
    console.log("\n3. Checking Recent Payments (campaign_payments)...");
    const { data: payments, error: pError } = await supabase
        .from('campaign_payments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
    
    if (pError) console.error("Error fetching payments:", pError.message);
    else if (payments.length === 0) console.log("- No payment records found in campaign_payments.");
    else {
        console.table(payments.map(p => ({
            ref: p.reference,
            amount: p.amount,
            status: p.status,
            created: p.created_at
        })));
    }

    // 4. Check Wallet Transactions
    console.log("\n4. Checking Wallet Transactions...");
    const { data: txs, error: tError } = await supabase
        .from('wallet_transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
        
    if (tError) console.error("Error fetching transactions:", tError.message);
    else if (txs.length === 0) console.log("- No transactions found in wallet_transactions.");
    else {
        console.table(txs.map(t => ({
            id: t.id,
            type: t.type,
            amount: t.amount,
            status: t.status,
            ref: t.reference
        })));
    }

    console.log("\nDiagnostics Complete.");
}

runDiagnostics();
