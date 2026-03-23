async function simulate() {
    const reference = "WALLET-2b326e03-1774283267349";
    const url = "https://polify-kenya-app.vercel.app/api/payments/callback";
    
    console.log(`Simulating SUCCESS callback to ${url} for ${reference}...`);
    
    const payload = {
        data: {
            id: "SIMULATED-SUCCESS",
            type: "incoming_payment",
            attributes: {
                status: "Success",
                metadata: {
                    reference: reference
                }
            }
        }
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-KopoKopo-Secret': 'f88b2ccf6c434bf0aea41a3b3f544b74' // From your .env.local
        },
        body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log("Status:", response.status);
    console.log("Result:", result);
}

simulate();
