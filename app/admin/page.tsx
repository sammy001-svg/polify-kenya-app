import { createClient } from "@/lib/supabase-server";
import { Users, FileText, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function getStats() {
  const supabase = await createClient();

  // Basic counts (Approximate for now)
  const { count: usersCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
  const { count: petitionsCount } = await supabase.from('petitions').select('*', { count: 'exact', head: true });
  // const { count: postsCount } = await supabase.from('posts').select('*', { count: 'exact', head: true }); // Assuming posts table exists or will exist

  return {
    users: usersCount || 0,
    petitions: petitionsCount || 0,
    activePetitions: 0, // Need filtering
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-brand-surface border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Citizens</CardTitle>
            <Users className="h-4 w-4 text-brand-text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users}</div>
            <p className="text-xs text-brand-text-muted">Registered users on platform</p>
          </CardContent>
        </Card>
        
        <Card className="bg-brand-surface border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Petitions</CardTitle>
            <FileText className="h-4 w-4 text-brand-text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.petitions}</div>
            <p className="text-xs text-brand-text-muted">Total campaigns launched</p>
          </CardContent>
        </Card>

        <Card className="bg-brand-surface border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-brand-text-muted">Politicians awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-brand-surface border-border">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-brand-text-muted text-center py-8">
               No recent system activity logs available yet.
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-brand-surface border-border">
           <CardHeader>
             <CardTitle>System Health</CardTitle>
           </CardHeader>
           <CardContent>
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                 <span className="text-sm font-medium">Operational</span>
              </div>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
