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

  let users = [];
  let error = null;

  if (!isDemo) {
    const { data, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    users = data || [];
    error = fetchError;
  }

  // Fallback to Mock Data if in demo or if error occurs
  if (isDemo || (error && users.length === 0)) {
    if (error) console.warn("Supabase Fetch Error (Falling back to Mock):", error);
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

