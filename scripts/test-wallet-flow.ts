import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
// import fetch from "node-fetch"; // Use global fetch

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testFullFlow() {
    console.log("1. Creating dummy pending payment...");
    
    // Get a test user (ideally the first one in the DB)
    const { data: profiles } = await supabase.from('profiles').select('id').limit(1);
    if (!profiles || profiles.length === 0) {
        console.error("No users found in database. Please sign up first.");
        return;
    }
    
    const userId = profiles[0].id;
    const reference = `TEST-WALLET-${Date.now()}`;
    
    const { error: insertError } = await supabase
        .from('campaign_payments')
        .insert({
            user_id: userId,
            amount: 50,
            phone_number: "254700000000",
            reference: reference,
            plan_id: 'wallet_deposit',
            status: 'pending'
        });

    if (insertError) {
        console.error("Failed to create dummy payment:", insertError.message);
        return;
    }
    console.log(`- Created pending payment with reference: ${reference}`);

    console.log("2. Simulating Kopo Kopo callback...");
    const payload = {
        data: {
            attributes: {
                status: "Success",
                metadata: {
                    reference: reference
                }
            }
        }
    };

    try {
        const response = await fetch("http://localhost:3000/api/payments/callback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        console.log("- Callback Response:", result);
    } catch (error) {
        console.error("- Callback Simulation Failed:", error);
    }

    console.log("3. Verifying database state...");
    // Wait a bit for the async processing to finish (though it's awaited in the route)
    setTimeout(async () => {
        const { data: payment } = await supabase
            .from('campaign_payments')
            .select('status, result_description')
            .eq('reference', reference)
            .single();
            
        console.log(`- Payment record status: ${payment?.status}`);
        console.log(`- Payment description: ${payment?.result_description}`);

        const { data: wallet } = await supabase
            .from('wallets')
            .select('balance')
            .eq('user_id', userId)
            .single();
            
        console.log(`- User wallet balance: ${wallet?.balance}`);
        
        if (payment?.status === 'completed') {
            console.log("SUCCESS: The full flow is working correctly!");
        } else {
            console.log("FAILURE: The payment status did not transition to 'completed'.");
        }
    }, 2000);
}

testFullFlow();
