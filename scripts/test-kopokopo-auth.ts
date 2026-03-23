import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function testAuth() {
    const clientId = process.env.KOPOKOPO_CLIENT_ID;
    const clientSecret = process.env.KOPOKOPO_CLIENT_SECRET;
    const baseUrl = process.env.KOPOKOPO_BASE_URL || "https://api.kopokopo.com";

    console.log("Testing Kopo Kopo Auth with:");
    console.log("- Client ID:", clientId?.substring(0, 5) + "...");
    console.log("- Base URL:", baseUrl);

    if (!clientId || !clientSecret) {
        console.error("Credentials missing in .env.local");
        return;
    }

    try {
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

        const data = await response.json();
        console.log("Response Status:", response.status);
        if (response.ok) {
            console.log("SUCCESS: Token obtained!");
            console.log("Token starts with:", data.access_token?.substring(0, 10) + "...");
        } else {
            console.error("FAILURE:", data);
        }
    } catch (error) {
        console.error("ERROR:", error);
    }
}

testAuth();
