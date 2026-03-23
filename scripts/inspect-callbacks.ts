import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspect() {
    const { data: logs, error } = await supabase
        .from('debug_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

    if (error) {
        console.error("Error:", error.message);
        return;
    }

    const callbacks = logs.filter(l => l.event_name === 'payment_callback');
    if (callbacks.length === 0) {
        console.log("No callbacks found.");
        return;
    }

    callbacks.forEach(cb => {
        console.log(`\n--- CALLBACK at ${cb.created_at} ---`);
        console.log(JSON.stringify(cb.data, null, 2));
    });
}

inspect();
