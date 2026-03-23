import fetch from "node-fetch";

async function simulateCallback() {
    const reference = process.argv[2];
    if (!reference) {
        console.error("Usage: npx tsx scripts/simulate-callback.ts <REFERENCE>");
        console.log("Example: npx tsx scripts/simulate-callback.ts WALLET-abcd-1234");
        return;
    }

    const payload = {
        data: {
            id: "b59a686b-f45a-466d-8a21-4f056d6d8495",
            type: "incoming_payment",
            attributes: {
                id: "b59a686b-f45a-466d-8a21-4f056d6d8495",
                status: "Success",
                amount: "10.00",
                currency: "KES",
                metadata: {
                    reference: reference
                },
                event: {
                    type: "Buygoods Received",
                    resource: {
                        reference: reference, // Fallback
                        amount: "10.00",
                        status: "Success"
                    }
                }
            }
        }
    };

    console.log(`Simulating callback for reference: ${reference}...`);
    
    try {
        const response = await fetch("http://localhost:3000/api/payments/callback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "X-KopoKopo-Secret": "..." // Not enforced in current logic for local testing
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        console.log("Response status:", response.status);
        console.log("Response body:", result);
    } catch (error) {
        console.error("Simulation failed:", error);
    }
}

simulateCallback();
