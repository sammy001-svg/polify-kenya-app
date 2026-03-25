'use server';

import { createClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';

export async function saveDocumentMetadata(doc: {
  name: string;
  type: string;
  size: string;
  url: string;
  campaign_id?: string;
}) {
  const supabase = await createClient();
  
  // Get current user session
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    throw new Error('You must be logged in to upload documents');
  }

  const { data, error } = await supabase
    .from('campaign_documents')
    .insert([
      {
        ...doc,
        user_id: user.id,
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error saving document metadata:', error);
    throw new Error(`Failed to save document metadata: ${error.message}`);
  }

  revalidatePath('/campaign/finance');
  return data;
}

export async function getCampaignDocuments() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('campaign_documents')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching campaign documents:', error);
    return [];
  }

  return data || [];
}

export async function deleteCampaignDocument(id: string, fileName: string) {
  const supabase = await createClient();
  
  // 1. Delete from database
  const { error: dbError } = await supabase
    .from('campaign_documents')
    .delete()
    .eq('id', id);

  if (dbError) {
    throw new Error(`Failed to delete document metadata: ${dbError.message}`);
  }

  // 2. Delete from storage (Optional, but good practice)
  // filePath would need to be stored or reconstructed. For now, we'll focus on DB.
  
  revalidatePath('/campaign/finance');
  return { success: true };
}
