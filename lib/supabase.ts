import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tlrmxgptetlfdekxegyp.supabase.co'; // Use the actual project URL as fallback to prevent format errors
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';
    
    return createBrowserClient(supabaseUrl, supabaseAnonKey);
  } catch (e) {
    console.error('Failed to create Supabase client:', e);
    // Return a dummy client as a last resort to prevent build/render crash
    return createBrowserClient('https://tlrmxgptetlfdekxegyp.supabase.co', 'placeholder');
  }
}
