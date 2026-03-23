import { NextResponse } from "next/server";

export async function GET() {
  const envStatus = {
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? `PRESENT (Starts with ${process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 15)}...)` : "MISSING",
    SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? `PRESENT (Starts with ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 15)}...)` : "MISSING",
    KOPOKOPO_CLIENT_ID: process.env.KOPOKOPO_CLIENT_ID ? `PRESENT (Starts with ${process.env.KOPOKOPO_CLIENT_ID.substring(0, 5)}...)` : "MISSING",
    KOPOKOPO_TILL_NUMBER: process.env.KOPOKOPO_TILL_NUMBER ? `PRESENT (${process.env.KOPOKOPO_TILL_NUMBER})` : "MISSING",
    KOPOKOPO_CALLBACK_URL: process.env.KOPOKOPO_CALLBACK_URL || "MISSING",
    CURRENT_TIME: new Date().toISOString()
  };

  return NextResponse.json(envStatus);
}
