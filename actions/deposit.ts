"use server";

import { initiateKopoKopoStkPush } from "@/lib/kopokopo";
import { createClient } from "@/lib/supabase-server";

export async function initiateWalletDeposit(amount: number, phone: string) {
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

  // Use WALLET- prefix to distinguish from SUB-
  const reference = `WALLET-${user.id.substring(0, 8)}-${Date.now()}`;

  // Log in pending payments table (reusing campaign_payments for unified STK logging)
  // We mark plan_id as 'wallet_deposit' to distinguish purpose
  const { error: dbError } = await supabase
    .from('campaign_payments')
    .insert({
      user_id: user.id,
      amount: amount,
      phone_number: phone,
      reference: reference,
      plan_id: 'wallet_deposit', 
      status: 'pending'
    });

  if (dbError) {
      console.error("Wallet DB Init Error:", dbError);
      return { success: false, message: "Failed to initialize deposit." };
  }

  // Trigger Kopo Kopo
  const result = await initiateKopoKopoStkPush({
    amount,
    phone,
    reference,
    firstName: user.user_metadata?.full_name?.split(' ')[0],
    lastName: user.user_metadata?.full_name?.split(' ')[1],
    email: user.email
  });
  
  if (result.success) {
    await supabase.from('campaign_payments')
        .update({ checkout_request_id: result.location })
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
