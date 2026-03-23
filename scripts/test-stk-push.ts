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

async function testPush() {
    const phone = process.argv[2];
    if (!phone) {
        console.error("Usage: npx tsx scripts/test-stk-push.ts <PHONE>");
        return;
    }

    const accessToken = await getKopoKopoToken();
    const baseUrl = process.env.KOPOKOPO_BASE_URL || "https://api.kopokopo.com";
    const tillNumber = process.env.KOPOKOPO_TILL_NUMBER;
    const callbackUrl = process.env.KOPOKOPO_CALLBACK_URL;

    console.log(`Initiating STK push to ${phone} for Till ${tillNumber}...`);

    let formattedPhone = phone.replace(/\D/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '+254' + formattedPhone.substring(1);
    } else if (formattedPhone.startsWith('254')) {
      formattedPhone = '+' + formattedPhone;
    } else if (formattedPhone.startsWith('7') || formattedPhone.startsWith('1')) {
      formattedPhone = '+254' + formattedPhone;
    } else if (!formattedPhone.startsWith('+')) {
      formattedPhone = '+' + formattedPhone;
    }

    const payload = {
      payment_channel: "mpesa_stk_push",
      till_number: tillNumber,
      subscriber: {
        first_name: "Test",
        last_name: "User",
        phone_number: formattedPhone,
        email: "test@example.com"
      },
      amount: {
        currency: "KES",
        value: 1
      },
      metadata: {
        reference: `TEST-${Date.now()}`
      },
      _links: {
        callback_url: callbackUrl
      }
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
        console.log("Response Status:", response.status);
        console.log("Response Body:", JSON.stringify(data, null, 2));

        if (response.status === 201) {
            console.log("SUCCESS! Check your phone.");
            console.log("Location:", response.headers.get("Location"));
        } else {
            console.error("FAILED.");
        }
    } catch (error) {
        console.error("ERROR:", error);
    }
}

testPush();
