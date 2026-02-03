"use server";

import { createClient } from "@/lib/supabase-server";

export async function requestWithdrawal(amount: number, phone: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: "User not authenticated" };
  }

  // Basic validation
  if (amount < 50) return { success: false, message: "Minimum withdrawal is KES 50" };

  try {
      const { error } = await supabase.rpc('request_withdrawal', {
          user_id: user.id,
          amount: amount,
          phone: phone
      });

      if (error) {
          console.error("Withdrawal Error:", error);
          return { success: false, message: error.message || "Withdrawal failed" };
      }

      return { success: true, message: "Withdrawal request submitted successfully" };

  } catch {
      return { success: false, message: "System error processing withdrawal" };
  }
}
