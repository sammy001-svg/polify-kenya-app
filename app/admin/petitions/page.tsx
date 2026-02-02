import { createClient } from "@/lib/supabase-server";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { AdminPetitionsTable } from "@/components/admin/AdminPetitionsTable";

export default async function AdminPetitionsPage() {
  const supabase = await createClient();

  const { data: petitions, error } = await supabase
    .from('petitions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching petitions:", error);
    return <div>Error loading petitions.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <h1 className="text-2xl font-bold">Petitions Manager</h1>
         <div className="relative w-72">
           <Search className="absolute left-2 top-2.5 h-4 w-4 text-brand-text-muted" />
           <Input placeholder="Search petitions..." className="pl-8 bg-brand-surface" />
         </div>
      </div>

      <AdminPetitionsTable petitions={petitions || []} />
    </div>
  );
}

