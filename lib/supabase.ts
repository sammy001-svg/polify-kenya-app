import { createBrowserClient } from '@supabase/ssr'
import { type SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient | null = null;

export const createClient = () => {
  if (supabaseInstance) return supabaseInstance;

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tlrmxgptetlfdekxegyp.supabase.co';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

    if (supabaseAnonKey === 'placeholder') {
      console.warn('⚠️ SUPABASE WARNING: Using placeholder API key. Authentication will fail.');
    }
    
    supabaseInstance = createBrowserClient(supabaseUrl, supabaseAnonKey);
    return supabaseInstance;
  } catch (e) {
    console.error('Failed to create Supabase client:', e);
    // Return a dummy client as a last resort
    return createBrowserClient('https://tlrmxgptetlfdekxegyp.supabase.co', 'placeholder');
  }
}
