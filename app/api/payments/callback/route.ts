import { createClient } from "@/lib/supabase-server";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("Kopo Kopo Callback Received:", JSON.stringify(data, null, 2));
    
    // 0. Security Check
    // Kopo Kopo recommends checking the signature, but we'll use our shared secret header 
    // if you configured it in Kopo Kopo portal or just a simple validation.
    const secret = req.headers.get("X-Payhero-Secret") || req.headers.get("X-KopoKopo-Secret"); 
    const expectedSecret = process.env.PAYHERO_CALLBACK_SECRET; // Reusing for consistency or add KOPOKOPO_WEBHOOK_SECRET
    
    if (expectedSecret && secret !== expectedSecret) {
       console.error("Payment Callback Security Violation: Invalid Secret");
       // return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Kopo Kopo Payload can be nested in several ways depending on event type
    const attributes = data?.data?.attributes || data?.attributes || data;
    const event = attributes?.event;
    const resource = event?.resource;
    
    // Status can be in attributes or nested in resource
    const status = (resource?.status || attributes?.status || data?.status || "").toLowerCase();
    
    // Reference can be in metadata, external_reference, or nested in resource.reference
    const reference = 
        attributes?.metadata?.reference || 
        resource?.metadata?.reference ||
        resource?.reference || 
        attributes?.external_reference || 
        attributes?.reference ||
        data?.reference;

    console.log("Processing Callback - Status:", status, "Reference:", reference, "Event:", event?.type);

    if (status === 'success' || status === 'completed' || status === 'confirmed') {
       // Payment Successful
       console.log("Payment Confirmed, processing reference:", reference);

       const supabase = await createClient();
       
       const { data: payment } = await supabase
         .from('campaign_payments')
         .select('*')
         .eq('reference', reference)
         .single();
          
       if (payment) {
          console.log(`- Found payment record for user: ${payment.user_id}, amount: ${payment.amount}, plan: ${payment.plan_id}`);
          let actionSuccess = true;

          if (payment.plan_id === 'donation' || reference.startsWith('DON-')) {
              const { data: success, error: rpcError } = await supabase.rpc('process_crowdfunding_donation', {
                  payment_reference: reference
              });

              if (rpcError || !success) {
                  console.error("Donation processing failed:", rpcError || "Unknown error");
                  actionSuccess = false;
              }

          } else if (payment.plan_id === 'wallet_deposit' || reference.startsWith('WALLET-')) {
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
                  console.log("Wallet credited successfully via RPC");
              }
              
          } else if (reference.startsWith('PARTY-')) {
              // Extract party ID from reference: PARTY-ID-USER-TIME
              
              // We'll need a way to find the full party ID or just use what's in plan_id
              const partyId = payment.plan_id.replace('party_join_', '');
              
              const { error: joinError } = await supabase
                .from('party_memberships')
                .upsert({
                    user_id: payment.user_id,
                    party_id: partyId,
                    status: 'active',
                    joined_at: new Date().toISOString()
                }, { onConflict: 'user_id,party_id' });

              if (joinError) {
                  console.error("Failed to join party:", joinError);
                  actionSuccess = false;
              }

          } else {
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
              }
          }

          if (actionSuccess) {
              console.log("Action succeeded, updating payment status to completed");
              const { error: updateError } = await supabase
                .from('campaign_payments')
                .update({ 
                    status: 'completed', 
                    result_code: 'success', 
                    result_description: attributes?.description || 'Payment confirmed via Kopo Kopo' 
                })
                .eq('id', payment.id);
              
              if (updateError) console.error("Failed to update payment status:", updateError.message);
          }
       } else {
           console.warn("Payment record not found for reference:", reference);
       }
       
       return NextResponse.json({ received: true });
    }
    
    // Payment Failed or Cancelled
    if (status === 'failed' || status === 'cancelled') {
        const supabase = await createClient();
        console.log("Payment Failed/Cancelled:", attributes?.description);
        
        if (reference) {
            await supabase
                .from('campaign_payments')
                .update({ 
                    status: 'failed', 
                    result_code: 'failed', 
                    result_description: attributes?.description || 'Payment failed via Kopo Kopo' 
                })
                .eq('reference', reference);
        }
            
        return NextResponse.json({ received: true });
    }

  } catch (error) {
    console.error("Callback Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
