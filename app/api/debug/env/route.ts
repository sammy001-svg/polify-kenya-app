import { NextResponse } from "next/server";

export async function GET() {
  const envStatus = {
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? "PRESENT" : "MISSING",
    SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "PRESENT" : "MISSING",
    KOPOKOPO_CLIENT_ID: process.env.KOPOKOPO_CLIENT_ID ? `PRESENT (Starts with ${process.env.KOPOKOPO_CLIENT_ID.substring(0, 5)}...)` : "MISSING",
    KOPOKOPO_CLIENT_SECRET: process.env.KOPOKOPO_CLIENT_SECRET ? "PRESENT" : "MISSING",
    KOPOKOPO_TILL_NUMBER: process.env.KOPOKOPO_TILL_NUMBER ? `PRESENT (${process.env.KOPOKOPO_TILL_NUMBER})` : "MISSING",
    KOPOKOPO_BASE_URL: process.env.KOPOKOPO_BASE_URL || "DEFAULT (https://api.kopokopo.com)",
    KOPOKOPO_CALLBACK_URL: process.env.KOPOKOPO_CALLBACK_URL ? "PRESENT" : "MISSING",
  };

  return NextResponse.json(envStatus);
}
