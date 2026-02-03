"use server";

import { createClient } from "@/lib/supabase-server";

export async function checkPaymentStatus(reference: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('campaign_payments')
    .select('status')
    .eq('reference', reference)
    .single();

  if (error || !data) {
    return { success: false, status: 'unknown' };
  }

  return { success: true, status: data.status };
}
