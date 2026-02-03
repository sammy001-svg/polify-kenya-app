import { createClient } from '@supabase/supabase-js';

// Note: This file should ONLY be used in server-side contexts.
// The SERVICE_ROLE_KEY must never be exposed to the client.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.warn('⚠️ SUPABASE_SERVICE_ROLE_KEY is missing. Admin operations will fail.');
}

export const createAdminClient = () => {
    const key = supabaseServiceKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
    
    if (!supabaseServiceKey) {
        console.error('❌ CRITICAL: SUPABASE_SERVICE_ROLE_KEY is missing. Falling back to Anon Key (admin operations will likely fail).');
    }

    return createClient(supabaseUrl, key, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
};
