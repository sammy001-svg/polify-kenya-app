'use server';

import { createClient } from '@/lib/supabase-server'; // ensure we use the server-safe client
import { revalidatePath } from 'next/cache';

export interface Advertisement {
    id: string;
    politician_id: string;
    title: string;
    image_url: string;
    target_url?: string;
    status: 'active' | 'inactive';
    created_at: string;
}

export type CreateAdState = {
    error?: string;
    success?: boolean;
};

export async function createAd(prevState: CreateAdState, formData: FormData): Promise<CreateAdState> {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Unauthorized" };
    }

    const title = formData.get('title') as string;
    const image_url = formData.get('image_url') as string;
    const target_url = formData.get('target_url') as string;

    if (!title || !image_url) {
        return { error: "Title and Image URL are required." };
    }

    try {
        // 1. Archive any existing active ads for this politician
        // We do this to enforce the "one active ad per politician" rule
        await supabase
            .from('advertisements')
            .update({ status: 'inactive' })
            .eq('politician_id', user.id)
            .eq('status', 'active');

        // 2. Insert the new ad
        const { error } = await supabase
            .from('advertisements')
            .insert({
                politician_id: user.id,
                title,
                image_url,
                target_url: target_url || null,
                status: 'active' // New ad is always active by default
            });

        if (error) throw error;

        revalidatePath('/campaign/ads');
        revalidatePath('/(platform)'); // Revalidate home feed

        return { success: true };
    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : "Failed to create ad.";
        return { error: errorMessage };
    }
}

export async function getMyActiveAd(): Promise<Advertisement | null> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data } = await supabase
        .from('advertisements')
        .select('*')
        .eq('politician_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
    
    return data;
}

export async function getActiveAds() {
     const supabase = await createClient();
     // Get random 5 active ads
     const { data } = await supabase
        .from('advertisements')
        .select('*')
        .eq('status', 'active')
        .limit(10); // get a pool
     
     if (!data) return [];
     
     // Shuffle
     return data.sort(() => 0.5 - Math.random()).slice(0, 5);
}
