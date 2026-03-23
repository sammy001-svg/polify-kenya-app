import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

async function check() {
    const ref = "WALLET-2b326e03-1774282769412";
    console.log(`Checking for reference: ${ref}`);
    
    const { data, error } = await supabase
        .from('campaign_payments')
        .select('*')
        .eq('reference', ref)
        .single();
    
    if (error) {
        console.error("Fetch Error:", error.message);
        if (error.code === 'PGRST116') console.log("RECORD NOT FOUND.");
    } else {
        console.log("RECORD FOUND:", JSON.stringify(data, null, 2));
    }
}

check();
