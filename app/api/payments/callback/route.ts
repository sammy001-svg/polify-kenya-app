import { createClient } from "@/lib/supabase-server";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("PayHero Callback Received:", data);

    // PayHero sends different status details.
    // We assume 'Success' status or response code 0 indicates success.
    // Example: { response_code: 0, response_message: "Success...", external_reference: "..." }

    // Check for "Success" code (usually 0 from PayHero)
    if (data?.response_code === 0 || data?.ResultCode === 0) {
       // Payment Successful
       const reference = data?.external_reference || data?.CheckoutRequestID; 
       
       console.log("Payment Confirmed, processing reference:", reference);

       const supabase = await createClient(); // Create admin client ideally, but route handlers run server-side
       
       // 1. Find the payment record
       const { data: payment } = await supabase
         .from('campaign_payments')
         .select('*')
         .eq('reference', reference)
         .single();
         
       if (payment) {
          // 2. Perform Action (Credit Wallet or Activate Sub) BEFORE marking as completed
          // This prevents race condition where frontend sees 'completed' but balance isn't updated yet.
          
          let actionSuccess = true;

          if (payment.plan_id === 'wallet_deposit' || reference.startsWith('WALLET-')) {
              // --- Wallet Top-up ---
              const { error: rpcError } = await supabase.rpc('credit_wallet', {
                  target_user_id: payment.user_id,
                  amount: payment.amount,
                  description: `M-Pesa Top-up (${reference})`,
                  reference: reference
              });
              
              if (rpcError) {
                  console.error("Wallet Credit Failed:", rpcError);
                  actionSuccess = false;
              } else {
                  console.log("Wallet Credited:", payment.amount, "for user:", payment.user_id);
              }
              
          } else {
              // --- Subscription Activation ---
              const subscriptionData = {
                user_id: payment.user_id,
                plan_id: payment.plan_id || 'campaigner',
                status: 'active',
                current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
              };

              const { error: subError } = await supabase
                .from('campaign_subscriptions')
                .upsert(subscriptionData, { onConflict: 'user_id' });
                
              if (subError) {
                  console.error("Failed to activate subscription:", subError);
                  actionSuccess = false;
              } else {
                  console.log("Subscription activated for user:", payment.user_id);
              }
          }

          // 3. Update Payment Status in Payments Table (Only if action succeeded or we want to record completion anyway? 
          // Ideally only if success, but we should probably record the result_code regardless)
          
          if (actionSuccess) {
              await supabase
                .from('campaign_payments')
                .update({ status: 'completed', result_code: data?.response_code, result_description: data?.response_message })
                .eq('id', payment.id);
          } else {
             // Log that payment worked but provisioning failed?
             console.error("Payment received but provisioning failed for:", reference);
          }

       } else {
           console.warn("Payment record not found for reference:", reference);
       }
       
       return NextResponse.json({ received: true });
    }
    
    // Payment Failed or Cancelled
    if (data?.response_code !== 0) {
        const reference = data?.external_reference;
        const supabase = await createClient();
        console.log("Payment Failed/Cancelled:", data?.response_message);
        
        await supabase
            .from('campaign_payments')
            .update({ status: 'failed', result_code: data?.response_code, result_description: data?.response_message })
            .eq('reference', reference);
            
        return NextResponse.json({ received: true });
    }

  } catch (error) {
    console.error("Callback Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
