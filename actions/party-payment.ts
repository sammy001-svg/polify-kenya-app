"use server";

import { initiateStkPush, type STKPushResponse } from "@/lib/payhero";
import { createClient } from "@/lib/supabase-server";

export interface PartyPaymentResponse extends STKPushResponse {
  reference: string;
}

export async function initiatePartyMembershipPayment(amount: number, phone: string, partyId: string): Promise<PartyPaymentResponse | { success: false; message: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: "User not authenticated" };
  }

  // Validate phone
  const phoneRegex = /^(?:254|\+254|0)?((?:7|1)[0-9]{8})$/;
  if (!phoneRegex.test(phone)) {
     return { success: false, message: "Invalid phone number format." };
  }

  // Reference for Party Membership
  const reference = `PARTY-${partyId.substring(0, 4).toUpperCase()}-${user.id.substring(0, 4)}-${Date.now()}`;

  // Log in pending payments table
  const { error: dbError } = await supabase
    .from('campaign_payments')
    .insert({
      user_id: user.id,
      amount: amount,
      phone_number: phone,
      reference: reference,
      plan_id: `party_join_${partyId}`, 
      status: 'pending'
    });

  if (dbError) {
      console.error("Party Payment DB Error:", dbError);
      return { success: false, message: "Failed to initialize payment." };
  }

  // Trigger PayHero STK Push
  const result = await initiateStkPush(amount, phone, reference);
  
  if (result.success && result.checkout_request_id) {
    await supabase.from('campaign_payments')
        .update({ checkout_request_id: result.checkout_request_id })
        .eq('reference', reference);
  } else if (!result.success) {
      await supabase.from('campaign_payments')
        .update({ status: 'failed', result_description: result.message })
        .eq('reference', reference);
  }

  return {
      ...result,
      reference
  };
}
