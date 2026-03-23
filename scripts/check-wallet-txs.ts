import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    console.log("Searching for WALLET- transactions...");
    const { data: recs, error } = await supabase
        .from('campaign_payments')
        .select('*')
        .ilike('reference', 'WALLET-%')
        .order('created_at', { ascending: false })
        .limit(10);

    if (error) {
        console.error("Error:", error.message);
        return;
    }

    if (!recs || recs.length === 0) {
        console.log("No WALLET- transactions found.");
    } else {
        recs.forEach(r => console.log(`[${r.status}] ${r.reference} - ${r.amount} KES at ${r.created_at}`));
    }
}

check();
