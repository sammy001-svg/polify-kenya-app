import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function getKopoKopoToken() {
  const clientId = process.env.KOPOKOPO_CLIENT_ID;
  const clientSecret = process.env.KOPOKOPO_CLIENT_SECRET;
  const baseUrl = process.env.KOPOKOPO_BASE_URL || "https://api.kopokopo.com";

  const response = await fetch(`${baseUrl}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId!,
      client_secret: clientSecret!,
      grant_type: "client_credentials",
    }),
  });

  const data = await response.json();
  return data.access_token;
}

async function bruteForcePhoneFormat() {
    const rawPhone = process.argv[2];
    if (!rawPhone) {
        console.error("Usage: npx tsx scripts/brute-force-phone.ts <PHONE>");
        return;
    }

    const accessToken = await getKopoKopoToken();
    const baseUrl = process.env.KOPOKOPO_BASE_URL || "https://api.kopokopo.com";
    const tillNumber = process.env.KOPOKOPO_TILL_NUMBER;

    // Clean number
    const base = rawPhone.replace(/\D/g, '');
    let short;
    if (base.startsWith('0')) short = base.substring(1);
    else if (base.startsWith('254')) short = base.substring(3);
    else short = base;

    const formats = [
        `+254${short}`,
        `254${short}`,
        `0${short}`,
        `${short}`
    ];

    console.log(`Testing formats for ${rawPhone}...`);

    for (const fmt of formats) {
        console.log(`\n--- Testing Format: [${fmt}] ---`);
        const payload = {
            payment_channel: "mpesa_stk_push",
            till_number: tillNumber,
            subscriber: {
                first_name: "Test",
                last_name: "User",
                phone_number: fmt,
                email: "test@example.com"
            },
            amount: { currency: "KES", value: 1 },
            metadata: { reference: `BRUTE-${Date.now()}` },
            _links: { callback_url: "https://example.com" }
        };

        try {
            const response = await fetch(`${baseUrl}/api/v1/incoming_payments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json().catch(() => ({}));
            console.log("Status:", response.status);
            console.log("Body:", JSON.stringify(data));

            if (response.status === 201) {
                console.log(`✅ SUCCESS! Format [${fmt}] is CORRECT.`);
                process.exit(0);
            }
        } catch (error) {
            console.error("Error with format", fmt, error);
        }
    }

    console.log("\n❌ ALL FORMATS FAILED.");
}

bruteForcePhoneFormat();
