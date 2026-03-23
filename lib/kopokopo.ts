import { createClient } from "@supabase/supabase-js";

export interface KopoKopoSTKResponse {
  success: boolean;
  message?: string;
  location?: string;
  data?: unknown;
}

/**
 * Gets the OAuth2 access token for Kopo Kopo API
 */
async function getKopoKopoToken() {
  const clientId = process.env.KOPOKOPO_CLIENT_ID;
  const clientSecret = process.env.KOPOKOPO_CLIENT_SECRET;
  const baseUrl = process.env.KOPOKOPO_BASE_URL || "https://api.kopokopo.com";

  if (!clientId || !clientSecret) {
    throw new Error("Kopo Kopo credentials missing in environment");
  }

  const response = await fetch(`${baseUrl}/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "client_credentials",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Kopo Kopo Token Error:", errorText);
    throw new Error(`Failed to get Kopo Kopo access token: ${response.statusText}`);
  }

  const data = await response.json();
  return data.access_token;
}

/**
 * Initiates an M-Pesa STK Push via Kopo Kopo
 */
export async function initiateKopoKopoStkPush(params: {
  amount: number;
  phone: string;
  reference: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}): Promise<KopoKopoSTKResponse> {
  try {
    const accessToken = await getKopoKopoToken();
    const baseUrl = process.env.KOPOKOPO_BASE_URL || "https://api.kopokopo.com";
    const callbackUrl = process.env.KOPOKOPO_CALLBACK_URL;
    
    // Normalize phone number to +254 format
    // Normalize phone number to 254 format (No +)
    let formattedPhone = params.phone.replace(/\D/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.substring(1);
    } else if (formattedPhone.startsWith('+')) {
      formattedPhone = formattedPhone.substring(1);
    } else if (formattedPhone.startsWith('7') || formattedPhone.startsWith('1')) {
      formattedPhone = '254' + formattedPhone;
    }

    const payload = {
      payment_channel: "mpesa_stk_push",
      till_number: process.env.KOPOKOPO_TILL_NUMBER || "K777777", // Replace with actual or env
      subscriber: {
        first_name: params.firstName || "Citizen",
        last_name: params.lastName || "User",
        phone_number: formattedPhone,
        email: params.email || "support@polify.co.ke"
      },
      amount: {
        currency: "KES",
        value: params.amount
      },
      metadata: {
        reference: params.reference
      },
      _links: {
        callback_url: callbackUrl
      }
    };

    console.log("Kopo Kopo STK Request:", JSON.stringify(payload, null, 2));

    const response = await fetch(`${baseUrl}/api/v1/incoming_payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });

    // Kopo Kopo returns 201 Created and a Location header on success
    const data = await response.json().catch(() => ({}));
    console.log("Kopo Kopo Response:", response.status, data);

    // Log to Supabase for debugging
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.from('debug_logs').insert({
        event_name: 'kopokopo_initiation_response',
        data: { 
            status: response.status, 
            data, 
            phone: formattedPhone,
            reference: params.reference
        }
    });

    if (response.status === 201) {
      return {
        success: true,
        message: "STK Push initiated successfully",
        location: response.headers.get("Location") || "",
        data: data
      };
    }

    return {
      success: false,
      message: data.errors?.[0]?.message || "Failed to initiate payment",
      data: data
    };

  } catch (error: unknown) {
    console.error("Kopo Kopo Integration Error:", error);
    return {
      success: false,
      message: (error as Error).message || "An unexpected error occurred"
    };
  }
}
