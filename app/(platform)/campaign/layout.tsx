import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { SubscriptionGuard } from "@/components/campaign/SubscriptionGuard";

export default async function CampaignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Check Role
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  // Check Subscription
  const { data: subscription } = await supabase
    .from("campaign_subscriptions")
    .select("status, current_period_end")
    .eq("user_id", user.id)
    .single();

  const isSubscribed = subscription?.status === 'active';

  // Allow 'politician' and 'admin' only
  if (profile?.role !== "politician" && profile?.role !== "admin") {
    // Redirect to profile with an error query param or just back to profile
    redirect("/profile?error=access_denied_campaign_hq");
  }

  return (
    <SubscriptionGuard isSubscribed={isSubscribed}>
       {children}
    </SubscriptionGuard>
  );
}
