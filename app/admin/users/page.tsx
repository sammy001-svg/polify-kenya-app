import { createClient } from "@/lib/supabase-server";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { AdminUsersTable } from "@/components/admin/AdminUsersTable";

export default async function AdminUsersPage() {
  const supabase = await createClient();

  const { data: users, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching users:", error);
    return <div>Error loading users.</div>;
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

