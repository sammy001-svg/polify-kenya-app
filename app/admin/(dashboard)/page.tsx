import { createClient } from "@/lib/supabase-server";
import { ShieldAlert, Zap, Globe, Database } from "lucide-react";
import { SystemMonitor } from "@/components/admin/SystemMonitor";
import { AnalyticsOverview } from "@/components/admin/AnalyticsOverview";
import { AdminFinancialStats } from "@/components/admin/AdminFinancialStats";
import { AdminActivityGraphs } from "@/components/admin/AdminActivityGraphs";

async function getStats() {
  const supabase = await createClient();

  // Mock stats for demo
  return {
    users: 10420,
    petitions: 158,
    activePetitions: 12,
    pendingVerifications: 22, // Combined advocates and politicians
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="space-y-10 pb-12">
      {/* 1. System Health Ticker */}
      <div className="flex items-center justify-between p-4 bg-brand-surface border border-border rounded-xl">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-[10px] font-bold text-brand-text-muted uppercase tracking-widest">AI Status:</span>
            <span className="text-xs font-bold text-green-500">OPERATIONAL</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-500" />
            <span className="text-[10px] font-bold text-brand-text-muted uppercase tracking-widest">Network:</span>
            <span className="text-xs font-bold text-white">LOW LATENCY (18ms)</span>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <Database className="w-4 h-4 text-purple-500" />
            <span className="text-[10px] font-bold text-brand-text-muted uppercase tracking-widest">DB Sync:</span>
            <span className="text-xs font-bold text-white">99.9% COHERENCY</span>
          </div>
        </div>
        <div className="text-[10px] font-mono text-brand-text-muted">
          NODE: POL_ID_094 // {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* 2. Critical Actions Strip */}
      {stats.pendingVerifications > 0 && (
        <div className="p-4 bg-kenya-red/10 border border-kenya-red/20 rounded-xl flex items-center justify-between group cursor-pointer hover:bg-kenya-red/20 transition-all">
           <div className="flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-kenya-red animate-pulse" />
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-tight">Critical Verification Queue</p>
                <p className="text-[10px] text-brand-text-muted">There are {stats.pendingVerifications} high-profile credentials awaiting secondary system audit.</p>
              </div>
           </div>
           <a href="/admin/verification" className="px-4 py-1.5 bg-kenya-red text-white text-[10px] font-black rounded uppercase hover:bg-red-700 transition-all shadow-lg shadow-kenya-red/20">
              Launch Audit
           </a>
        </div>
      )}

      {/* 3. Financial & Role Metrics (NEW) */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black text-brand-text-muted uppercase tracking-[0.3em]">Financial Oversight & Community Roles</h3>
        <AdminFinancialStats />
      </section>

      {/* 4. Infrastructure Pulse */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black text-brand-text-muted uppercase tracking-[0.3em]">System Engine Status</h3>
        <SystemMonitor />
      </section>

      {/* 5. Activity & Sales Graphs (NEW) */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black text-brand-text-muted uppercase tracking-[0.3em]">Growth & Marketplace Trajectory</h3>
        <AdminActivityGraphs />
      </section>

      {/* 6. High Level Demographic Analytics */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black text-brand-text-muted uppercase tracking-[0.3em]">Democratic Engagement Metrics</h3>
        <AnalyticsOverview />
      </section>
    </div>
  );
}
