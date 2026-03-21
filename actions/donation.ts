"use server";

import { initiateStkPush } from "@/lib/payhero";
import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export async function processDonationPayment(amount: number, phone: string, campaignId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: "User not authenticated" };
  }

  // Validate phone number (Basic check for Kenya Format)
  const phoneRegex = /^(?:254|\+254|0)?((?:7|1)[0-9]{8})$/;
  if (!phoneRegex.test(phone)) {
     return { success: false, message: "Invalid phone number format. Use 07... or 01..." };
  }

  // Create a unique reference for tracking
  const reference = `DON-${campaignId.substring(0, 4)}-${user.id.substring(0, 4)}-${Date.now()}`;

  // 1. Record the pending payment
  const { error: dbError } = await supabase
    .from('campaign_payments')
    .insert({
      user_id: user.id,
      amount: amount,
      phone_number: phone,
      reference: reference,
      campaign_id: campaignId,
      plan_id: 'donation',
      status: 'pending'
    });

  if (dbError) {
      console.error("Database Error:", dbError);
      return { success: false, message: "Failed to initialize payment record" };
  }

  // 2. Initiate STK Push
  const result = await initiateStkPush(amount, phone, reference);
  
  // 3. Update the record with provider info if successful
  if (result.success && result.checkout_request_id) {
      await supabase
        .from('campaign_payments')
        .update({ checkout_request_id: result.checkout_request_id })
        .eq('reference', reference);
  } else if (!result.success) {
      // Mark as failed
      await supabase
        .from('campaign_payments')
        .update({ status: 'failed', result_description: result.message })
        .eq('reference', reference);
  }
  
  return {
    ...result,
    reference 
  };
}

export async function finalizeDonation(campaignId: string, amount: number) {
    const supabase = await createClient();
    
    // 1. Update collected amount
    const { data: campaign, error: fetchError } = await supabase
        .from("crowdfundings")
        .select("collected_amount, user_id")
        .eq("id", campaignId)
        .single();

    if (fetchError || !campaign) return { error: "Campaign not found" };

    const { error: updateError } = await supabase
        .from("crowdfundings")
        .update({ collected_amount: campaign.collected_amount + amount })
        .eq("id", campaignId);

    if (updateError) return { error: updateError.message };

    // 2. Credit wallet
    await supabase.rpc("credit_wallet", {
        target_user_id: campaign.user_id,
        amount: amount,
        description: `Donation received for campaign: ${campaignId}`,
        reference: `donation_${Date.now()}`,
    });

    revalidatePath("/crowdfunding");
    return { success: true };
}
