import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

async function run() {
    const { data: logs, error } = await supabase
        .from('debug_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
    
    if (error) {
        console.error(error);
        return;
    }

    logs.forEach(l => {
        console.log(`[${l.created_at}] ${l.event_name}`);
        if (l.event_name.includes('wallet') || l.event_name.includes('failed')) {
            console.log(JSON.stringify(l.data, null, 2));
        }
    });
}

run();
