import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function readLogs() {
    const { data: logs, error } = await supabase
        .from('debug_logs')
        .select('*');

    if (error) {
        console.error("DB Error:", error.message);
        return;
    }

    console.log("LOGS_START");
    console.log(JSON.stringify(logs, null, 2));
    console.log("LOGS_END");
}

readLogs();
