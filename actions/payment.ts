"use server";

import { initiateStkPush } from "@/lib/payhero";
import { createClient } from "@/lib/supabase-server";

export async function processSubscriptionPayment(amount: number, phone: string, planId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: "User not authenticated" };
  }

  // Validate phone number (Basic check for Kenya Format)
  // Accept: 07xxxxxxxx or 01xxxxxxxx or 2547xxxxxxxx
  const phoneRegex = /^(?:254|\+254|0)?((?:7|1)[0-9]{8})$/;
  if (!phoneRegex.test(phone)) {
     return { success: false, message: "Invalid phone number format. Use 07... or 01..." };
  }

  // Create a unique reference for tracking
  const reference = `SUB-${user.id.substring(0, 8)}-${Date.now()}`;

  // 1. Record the pending payment
  const { error: dbError } = await supabase
    .from('campaign_payments')
    .insert({
      user_id: user.id,
      amount: amount,
      phone_number: phone,
      reference: reference,
      plan_id: planId,
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
    reference // Return the internal reference so frontend can poll its status
  };
}
