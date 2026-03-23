import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchemaAndData() {
    console.log("Checking Supabase connection...");
    const { data: profiles, error: pError } = await supabase.from('profiles').select('*').limit(10);
    if (pError) console.error("Profiles Error:", pError);
    else console.log("Profiles count:", profiles?.length);

    const admins = profiles?.filter(p => p.role === 'admin');
    console.log("Admins found:", admins?.map(a => ({ id: a.id, email: a.email, role: a.role })));
}

checkSchemaAndData();
