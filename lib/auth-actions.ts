"use server";

import { createAdminClient } from "@/lib/supabase-admin";

/**
 * Resolves an email address from a username or civic ID string.
 * This runs on the server using the Admin/Service Role client to bypass RLS,
 * allowing us to find the email even if the user is not logged in.
 * 
 * @param identifier - Username or Civic ID
 * @returns The resolved email or null
 */
export async function lookupEmailByIdentifier(identifier: string): Promise<string | null> {
    const supabase = createAdminClient();
    
    // Safety check: Don't allow massive queries or fuzzy matching here
    const cleanId = identifier.trim();
    if (!cleanId) return null;

    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('email')
            .or(`username.eq.${cleanId},civic_id.eq.${cleanId}`)
            .single();

        if (error || !data) {
            return null;
        }

        return data.email;
    } catch (e) {
        console.error("Failed to lookup email:", e);
        return null;
    }
}
