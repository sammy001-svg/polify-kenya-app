import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    console.log("Checking for ANY logs in debug_logs...");
    const { data: count, error: cError } = await supabase
        .from('debug_logs')
        .select('*', { count: 'exact', head: true });

    if (cError) {
        console.error("Count Error:", cError.message);
        return;
    }
    console.log("Total logs:", count);

    const { data: logs, error } = await supabase
        .from('debug_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

    if (error) {
        console.error("Fetch Error:", error.message);
        return;
    }

    if (logs.length === 0) {
        console.log("NO LOGS FOUND.");
    } else {
        logs.forEach(l => console.log(`- ${l.event_name} at ${l.created_at}`));
    }
}

check();
