'use server';

interface SendSmsParams {
  recipients: string[];
  message: string;
}

interface OnfonResponse {
  ErrorCode: number;
  ErrorDescription: string;
  Data: Array<{
    MessageErrorCode: number;
    MessageErrorDescription: string;
    MobileNumber: string;
    MessageId: string;
    Custom: string;
  }>;
}

export async function sendSmsBroadcast({ recipients, message }: SendSmsParams) {
  const API_KEY = process.env.ONFON_API_KEY;
  const CLIENT_ID = process.env.ONFON_CLIENT_ID;
  const SENDER_ID = process.env.ONFON_SENDER_ID;
  const ACCESS_KEY = process.env.ONFON_ACCESS_KEY; 

  if (!API_KEY || !CLIENT_ID || !SENDER_ID || !ACCESS_KEY) {
    return {
      success: false,
      error: 'SMS service not configured (Missing credentials or Access Key)',
    };
  }
  
  const API_URL = 'https://api.onfonmedia.co.ke/v1/sms/SendBulkSMS';

  try {
    const payload = {
      SenderId: SENDER_ID,
      MessageParameters: [
        {
          Number: recipients.join(','), 
          Text: message,
        },
      ],
      ApiKey: API_KEY,
      ClientId: CLIENT_ID,
      AccessKey: ACCESS_KEY, 
      IsUnicode: true,
      IsFlash: false,
    };

    console.log('Sending SMS to:', recipients.length, 'recipients');
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'AccessKey': ACCESS_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as OnfonResponse;

    console.log('Onfon API Response:', JSON.stringify(data, null, 2));

    // Updated success check based on actual log
    // ErrorCode 0 means the request was processed
    // We also check the first item in Data to ensure the message was accepted
    if (data.ErrorCode === 0) { 
        // Check if individual messages succeeded
        const firstMsg = data.Data?.[0];
        if (firstMsg && firstMsg.MessageErrorCode === 0) {
             return {
                success: true,
                data: data,
                count: recipients.length
             };
        } else {
             return {
                success: false,
                error: firstMsg?.MessageErrorDescription || data.ErrorDescription || 'Message rejected by gateway'
             };
        }
    } else {
        return {
            success: false,
            error: data.ErrorDescription || `Gateway Error Code: ${data.ErrorCode}`
        };
    }

  } catch (error: unknown) {
    console.error('SMS Send Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to send SMS';
    return {
      success: false,
      error: errorMessage,
    };
  }
}
