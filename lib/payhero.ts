export interface STKPushResponse {
  success: boolean;
  message?: string;
  checkout_request_id?: string;
  response_code?: number;
  response_message?: string;
  data?: unknown;
}

export async function initiateStkPush(
  amount: number,
  phone: string,
  reference: string
): Promise<STKPushResponse> {
  // Fallback to provided credentials for immediate testing
  const username = process.env.PAYHERO_API_USERNAME || "Yu688UJCFRjuAXeR67VG";
  // const password = process.env.PAYHERO_API_PASSWORD || "viT85dAAjTBo3BajNUsd3433ihMbUNHzy73gl9q5";
  const channelId = process.env.PAYHERO_CHANNEL_ID || "4368"; 
  const callbackUrl = process.env.PAYHERO_CALLBACK_URL || "https://polify-kenya-app.vercel.app/api/payments/callback";

  // Use the pre-calculated token if provided or generate it
  // User provided: Basic WXU2ODhVSkNGUmp1QVhlUjY3Vkc6dmlUODVkQUFqVEJvM0Jhak5Vc2QzNDMzaWhNYlVOSHp5NzNnbDlxNQ==
  // We can use this directly to avoid any encoding issues
  const hardcodedAuth = "Basic WXU2ODhVSkNGUmp1QVhlUjY3Vkc6dmlUODVkQUFqVEJvM0Jhak5Vc2QzNDMzaWhNYlVOSHp5NzNnbDlxNQ==";

  if (!username) {
    console.error("PayHero API credentials are missing");
    return {
      success: false,
      message: "Payment service configuration error",
    };
  }

  // Normalize phone number to 254 format
  let formattedPhone = phone.replace(/\D/g, ''); // Remove non-digits
  if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.substring(1);
  } else if (formattedPhone.startsWith('7') || formattedPhone.startsWith('1')) {
      formattedPhone = '254' + formattedPhone;
  }
  // Ensure it starts with 254
  if (!formattedPhone.startsWith('254')) {
      console.warn("Phone formatting warning: could not normalize", phone);
  }

  const payload = {
    amount: amount,
    phone_number: formattedPhone,
    channel_id: parseInt(channelId),
    provider: "m-pesa",
    external_reference: reference,
    callback_url: callbackUrl,
  };
  
  console.log("PayHero Request Payload:", JSON.stringify(payload, null, 2));

  try {
    // const auth = Buffer.from(`${username}:${password}`).toString('base64');
    // Using hardcoded auth for debugging consistency
    const authHeader = hardcodedAuth;

    console.log("PayHero URL: https://backend.payhero.co.ke/api/v2.5/stkpush (Attempting v2.5)");
    
    // NOTE: Conflicting docs found. Some say /api/v2/payments, others v2.5/stkpush. 
    // Let's try v2.5 first as it's more specific to STK push, but if it fails we might need v2/payments.
    // User says "not working". 
    // Let's try v2.5/stkpush (current) but keep logging deep.
    // actually, let's SWITCH to v2.5/stkpush if v2 doesn't work? No, let's stick to v2.5/stkpush as per recent docs usually.
    // Wait, the SEARCH results said v2/payments.
    // Let's use the one from search result [1]: https://backend.payhero.co.ke/api/v2/payments
    
    const response = await fetch("https://backend.payhero.co.ke/api/v2/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authHeader,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("PayHero API Response STATUS:", response.status);
    console.log("PayHero API Response DATA:", JSON.stringify(data, null, 2));

    if (!response.ok) {
        return {
            success: false,
            message: data?.message || "Failed to initiate payment",
        };
    }

    // Adapt to PayHero response structure
    // Sometimes it is data.response.CheckoutRequestID or just data.CheckoutRequestID
    const checkoutId = data?.response?.CheckoutRequestID || data?.CheckoutRequestID || data?.checkout_request_id;

    return {
      success: true,
      message: "STK Push initiated successfully",
      checkout_request_id: checkoutId,
      data: data
    };

  } catch (error) {
    console.error("PayHero Network Error:", error);
    return {
      success: false,
      message: "Network error connecting to payment provider",
    };
  }
}
