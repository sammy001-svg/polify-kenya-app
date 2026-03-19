/**
 * @title Create Super Admin Script
 * @description Run this script to seed a 'super_admin' user in your local repository.
 * 
 * Usage:
 * npx tsx scripts/create-admin.ts
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("\n❌ Missing Supabase Environment Variables!");
  console.log("\nTo fix this, please ensure the following variables are in your .env.local file:");
  console.log("1. NEXT_PUBLIC_SUPABASE_URL");
  console.log("2. SUPABASE_SERVICE_ROLE_KEY (Found in Supabase Dashboard -> Settings -> API)");
  console.log("\n⚠️  Note: DO NOT share the Service Role Key publicly.\n");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdmin() {
  const email = "admin@polify.ke";
  const password = "SuperSecureAdmin2024!";

  console.log(`🚀 Creating Super Admin: ${email}...`);

  // 1. Create User in Auth
  const { data: userData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (authError) {
    console.error("❌ Auth Error:", authError.message);
    return;
  }

  const userId = userData.user.id;
  console.log(`✅ Auth user created with ID: ${userId}`);

  // 2. Update Role in Profiles
  const { error: profileError } = await supabase
    .from("profiles")
    .update({ role: "admin" })
    .eq("id", userId);

  if (profileError) {
    console.error("❌ Profile Error:", profileError.message);
    // Attempt insert if update fail
    const { error: insertError } = await supabase
      .from("profiles")
      .insert({ id: userId, email, role: "admin", full_name: "System Super Admin" });
    
    if (insertError) {
      console.error("❌ Insert Profile Error:", insertError.message);
      return;
    }
  }

  console.log("\n--- SUCCESS ---");
  console.log(`📧 Email: ${email}`);
  console.log(`🔑 Password: ${password}`);
  console.log("----------------\n");
}

createAdmin();
