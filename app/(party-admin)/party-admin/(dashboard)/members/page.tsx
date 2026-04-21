import { PartyMembersTable } from "@/components/parties/PartyMembersTable";
import { createClient } from "@/lib/supabase-server";

export default async function PartyMembersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch party profile to get party_id
  const { data: memberProfile } = await supabase
    .from("party_memberships")
    .select("party_id")
    .eq("user_id", user?.id)
    .single();

  const partyId = memberProfile?.party_id || "";

  // Fetch all members of this party
  const { data: memberships } = await supabase
    .from("party_memberships")
    .select(`
      id,
      role,
      joined_at,
      status,
      profiles:user_id (
        id,
        full_name,
        avatar_url,
        county
      )
    `)
    .eq("party_id", partyId);

  interface Profile {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    county: string | null;
  }

  interface MembershipRecord {
    id: string;
    role: string | null;
    joined_at: string;
    status: string | null;
    profiles: Profile | Profile[] | null;
  }

  const members = (memberships as unknown as MembershipRecord[] || []).map((m) => {
    const profile = Array.isArray(m.profiles) ? m.profiles[0] : m.profiles;
    return {
      id: profile?.id || m.id,
      full_name: profile?.full_name || "Unknown Member",
      avatar_url: profile?.avatar_url || undefined,
      email: "member@party.ke", // Fallback as email is in auth.users
      phone: "+254 7xx xxx xxx", // Fallback
      role: m.role || "member",
      county: profile?.county || "Unknown",
      is_verified: m.status === 'active',
      created_at: m.joined_at
    };
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-tight text-white">Membership Database</h1>
        <p className="text-brand-text-muted font-medium">Manage and audit your official party member registry.</p>
      </div>

      <div className="bg-brand-surface rounded-2xl border border-white/5 overflow-hidden">
        <PartyMembersTable members={members} />
      </div>
    </div>
  );
}
