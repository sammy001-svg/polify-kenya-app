import { createClient } from "@/lib/supabase-server";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { AdminUsersTable } from "@/components/admin/AdminUsersTable";
import { cookies } from "next/headers";

const MOCK_USERS = [
  { 
    id: "1", 
    full_name: "Admin User", 
    username: "admin_01", 
    email: "admin@polify.ke", 
    phone: "+254 711 000 000",
    role: "admin", 
    civic_id: "ID-8829-001",
    wallet_balance: 15400,
    avatar_url: "",
    is_verified: true,
    county: "Nairobi",
    created_at: new Date().toISOString() 
  },
  { 
    id: "2", 
    full_name: "John Citizen", 
    username: "j_citizen", 
    email: "citizen.one@kenya.com", 
    phone: "+254 722 123 456",
    role: "user", 
    civic_id: "ID-4412-992",
    wallet_balance: 1250,
    avatar_url: "",
    is_verified: true,
    county: "Mombasa",
    created_at: new Date(Date.now() - 86400000).toISOString() 
  },
  { 
    id: "3", 
    full_name: "Hon. Sarah Kweli", 
    username: "skweli_mp", 
    email: "politician.kenya@gmail.com", 
    phone: "+254 733 987 654",
    role: "politician", 
    civic_id: "ID-1102-334",
    wallet_balance: 85200,
    avatar_url: "",
    is_verified: false,
    county: "Kisumu",
    created_at: new Date(Date.now() - 172800000).toISOString() 
  },
  { 
    id: "4", 
    full_name: "Eric Advocate", 
    username: "eadvocate_lsk", 
    email: "advocate.lsk@justice.go.ke", 
    phone: "+254 700 111 222",
    role: "advocate", 
    civic_id: "ID-5567-112",
    wallet_balance: 42300,
    avatar_url: "",
    is_verified: true,
    county: "Nakuru",
    created_at: new Date(Date.now() - 259200000).toISOString() 
  },
];

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const isDemo = cookieStore.get("admin-demo-session")?.value === "true";

  let users: any[] = [];
  let error: { message: string; details?: string; hint?: string } | null = null;
  console.log("[ADMIN] Attempting to fetch citizens from Supabase...");
  
  // 1. Try a simple fetch first to verify the profiles table exists
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .order('updated_at', { ascending: false });

  if (profileError) {
    console.error("[ADMIN] Profile Fetch Error:", profileError.message, profileError.details, profileError.hint);
    error = profileError;
  } else {
    console.log(`[ADMIN] Successfully fetched ${profileData?.length || 0} profiles.`);
    
    // 2. If profiles exist, try getting their wallets separately or via join
    const { data: joinedData, error: joinError } = await supabase
      .from('profiles')
      .select('*, wallets(balance)')
      .order('updated_at', { ascending: false });

    if (joinError) {
      console.error("[ADMIN] Join Fetch Error (wallets):", joinError.message, joinError.details, joinError.hint);
      // Fallback: use profile data without balances
      users = (profileData || []).map(u => ({ ...u, wallet_balance: 0 }));
    } else if (joinedData) {
      users = joinedData.map((u) => {
        const wallets = u.wallets as unknown as { balance: number } | { balance: number }[];
        return {
          ...u,
          wallet_balance: Array.isArray(wallets) ? (wallets[0]?.balance || 0) : (wallets?.balance || 0)
        };
      });
    }
  }

  // Debug: Is it falling back to Mock?
  if ((error && users.length === 0) || (isDemo && users.length === 0)) {
    console.warn(`[ADMIN] Falling back to Mock Users (error=${!!error}, isDemo=${isDemo}, userCount=${users.length})`);
    users = MOCK_USERS;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <h1 className="text-2xl font-bold">User Management</h1>
         <div className="relative w-72">
           <Search className="absolute left-2 top-2.5 h-4 w-4 text-brand-text-muted" />
           <Input placeholder="Search users..." className="pl-8 bg-brand-surface" />
         </div>
      </div>

      <AdminUsersTable users={users || []} />
    </div>
  );
}

