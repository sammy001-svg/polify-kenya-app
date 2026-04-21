import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, TrendingUp, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase-server";

async function getPartyStats(partyId: string) {
  const supabase = await createClient();
  
  // Real stats from DB
  const { count: totalMembers } = await supabase
    .from("party_memberships")
    .select("*", { count: "exact", head: true })
    .eq("party_id", partyId)
    .eq("status", "active");

  const { count: recentJoiners } = await supabase
    .from("party_memberships")
    .select("*", { count: "exact", head: true })
    .eq("party_id", partyId)
    .gte("joined_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

  return {
    totalMembers: totalMembers || 0,
    recentJoiners: recentJoiners || 0,
    growth: "12%", // Mock
    trustScore: "98%" // Mock
  };
}

export default async function PartyDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  // Fetch party profile
  const { data: member } = await supabase
    .from("party_memberships")
    .select("party_id")
    .eq("user_id", user?.id)
    .single();

  const stats = await getPartyStats(member?.party_id || "");

  const dashboardStats = [
    {
      title: "Total Members",
      value: stats.totalMembers.toLocaleString(),
      description: "Active registered members",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "New Joiners (30d)",
      value: `+${stats.recentJoiners}`,
      description: "Growth this month",
      icon: UserPlus,
      color: "text-green-500",
    },
    {
      title: "Growth Rate",
      value: stats.growth,
      description: "MoM Increase",
      icon: TrendingUp,
      color: "text-kenya-red",
    },
    {
      title: "System Trust",
      value: stats.trustScore,
      description: "ID Verification rate",
      icon: ShieldCheck,
      color: "text-kenya-gold",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-tight text-white">Party Hub</h1>
        <p className="text-brand-text-muted font-medium">Strategic overview of your organization&apos;s digital infrastructure.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, i) => (
          <Card key={i} className="bg-brand-surface border-white/5 relative overflow-hidden group hover:border-brand-primary/30 transition-all">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <stat.icon className="w-12 h-12" />
             </div>
             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-muted">
                 {stat.title}
               </CardTitle>
             </CardHeader>
             <CardContent>
               <div className="text-2xl font-black text-white">{stat.value}</div>
               <p className="text-[10px] text-brand-text-muted font-bold mt-1 uppercase tracking-wider">
                 {stat.description}
               </p>
             </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <Card className="lg:col-span-2 bg-brand-surface border-white/5">
            <CardHeader>
               <CardTitle className="text-sm font-bold text-white uppercase tracking-widest">Growth Trajectory</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center border-t border-white/5">
                <div className="text-center space-y-3">
                   <TrendingUp className="w-12 h-12 text-brand-primary/20 mx-auto" />
                   <div className="space-y-1">
                      <p className="font-bold text-white">Analytics Engine Initializing</p>
                      <p className="text-xs text-brand-text-muted">Aggregating demographic data from all counties.</p>
                   </div>
                </div>
            </CardContent>
         </Card>

         <Card className="bg-brand-surface border-white/5">
            <CardHeader>
               <CardTitle className="text-sm font-bold text-white uppercase tracking-widest">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="border-t border-white/5 p-0">
               <div className="divide-y divide-white/5">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="p-4 flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                          <UserPlus className="w-4 h-4 text-brand-primary" />
                       </div>
                       <div>
                          <p className="text-xs font-bold text-white">New Membership Request</p>
                          <p className="text-[10px] text-brand-text-muted">Verified ID: 29***12 // 4 mins ago</p>
                       </div>
                    </div>
                  ))}
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
