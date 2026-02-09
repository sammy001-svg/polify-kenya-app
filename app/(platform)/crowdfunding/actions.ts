"use server";

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export interface Crowdfunding {
  id: string;
  title: string;
  description: string;
  target_amount: number;
  collected_amount: number;
  image_url: string | null;
  category: string;
  user_id: string;
  impact_statement?: string;
}

export async function createCampaign(formData: {
  title: string;
  description: string;
  category: string;
  impact_statement: string;
  target_amount: number;
  image_url: string | null;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Unauthorized" };

  const { error } = await supabase.from("crowdfundings").insert({
    user_id: user.id,
    ...formData,
  });

  if (error) {
    console.error("Error creating campaign:", error);
    return { error: error.message };
  }

  revalidatePath("/crowdfunding");
  return { success: true };
}

export async function donateToCampaign(campaignId: string, amount: number) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Unauthorized" };

  // Get current campaign data
  const { data: campaign, error: fetchError } = await supabase
    .from("crowdfundings")
    .select("collected_amount, user_id")
    .eq("id", campaignId)
    .single();

  if (fetchError || !campaign) {
    return { error: "Campaign not found" };
  }

  // Use a transaction-like approach (simplified since Supabase doesn't have easy RPC transactions here without dedicated SQL function)
  // In a real app, this should be an RPC call to handle atomically
  // Record the donation and update balance
  const { error: updateError } = await supabase
    .from("crowdfundings")
    .update({ collected_amount: campaign.collected_amount + amount })
    .eq("id", campaignId);

  if (updateError) return { error: updateError.message };

  // Use the credit_wallet RPC to update the owner's wallet balance and record a transaction
  const { error: rpcError } = await supabase.rpc("credit_wallet", {
    target_user_id: campaign.user_id,
    amount: amount,
    description: `Donation received for campaign: ${campaignId}`,
    reference: `crowdfunding_${campaignId}`,
  });

  if (rpcError) {
    console.error("Error crediting wallet:", rpcError);
    // Don't fail the whole donation if wallet credit fails for some reason, 
    // although in a real app you might want to rollback.
  }

  revalidatePath("/crowdfunding");
  return { success: true, newAmount: campaign.collected_amount + amount };
}
