import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkPayments() {
    console.log("Checking recent payments...");
    const { data: payments, error } = await supabase
        .from('campaign_payments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

    if (error) {
        console.error("Error fetching payments:", error);
        return;
    }

    console.table(payments.map(p => ({
        id: p.id,
        ref: p.reference,
        amount: p.amount,
        status: p.status,
        plan: p.plan_id,
        created: p.created_at
    })));
}

checkPayments();
