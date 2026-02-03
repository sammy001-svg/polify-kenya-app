import { ProfileForm } from "@/components/profile/ProfileForm";
import { MyActivity } from "@/components/profile/MyActivity";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { CivicIDCard } from "@/components/profile/CivicIDCard";
import { MyRepresentatives } from "@/components/profile/MyRepresentatives";
import { WalletCard } from "@/components/wallet/WalletCard";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "My Profile | Political Intelligence",
  description: "Manage your civic identity and track your impact.",
};


interface UserProfile {
  fullName: string;
  role: string;
  id: string;
  civicId?: string;
  username?: string;
  avatarUrl?: string;
  ward?: string;
}

async function getUser(): Promise<UserProfile> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    // Fallback mock data if not logged in
    if (!user) {
      return { 
        fullName: "Guest Citizen", 
        role: "Voter", 
        id: "00000000",
        civicId: "KE-00000000",
        username: "guest"
      };
    }

    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    
    return {
        fullName: data?.full_name || user.email?.split('@')[0] || "Citizen",
        role: data?.role || "Citizen",
        id: user.id,
        civicId: data?.civic_id || "KE-PENDING",
        username: data?.username || "citizen",
        avatarUrl: data?.avatar_url || undefined,
        ward: data?.ward || undefined
    };
}

export default async function ProfilePage() {
  const user = await getUser();

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto p-4 md:p-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl md:text-4xl font-black text-brand-text uppercase tracking-tight">Command Center</h1>
        <p className="text-brand-text-muted">Your digital civic identity and impact tracking dashboard.</p>
      </div>

      {/* Top Row: Identity & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 flex flex-col gap-6">
            <CivicIDCard user={user} />
        </div>
        <div className="lg:col-span-4 flex flex-col gap-6">
            <WalletCard />
            <ProfileStats />
        </div>
        <div className="lg:col-span-3">
             <MyRepresentatives />
        </div>
      </div>

      <div className="h-px bg-white/5 w-full" />

      {/* Bottom Row: Settings & Feed */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Column: Profile Details */}
        <div className="xl:col-span-4 space-y-6">
           <ProfileForm />
        </div>

        {/* Right Column: Activity Feed */}
        <div className="xl:col-span-8 space-y-6">
             <MyActivity />
        </div>
      </div>
    </div>
  );
}
