"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Activity, 
  ShieldAlert, 
  Zap, 
  Database, 
  Server, 
  Lock,
  RefreshCw,
  Search
} from "lucide-react";
import { motion } from "framer-motion";

export default function SystemHealthPage() {
  return (
    <div className="space-y-8">
      <div>
         <h1 className="text-2xl font-black text-white uppercase tracking-tighter">System Health Monitor</h1>
         <p className="text-brand-text-muted text-sm">Real-time status of PoliFy Kenya infrastructure and services.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
         <Card className="bg-brand-surface border-border border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
               <CardTitle className="text-xs font-bold text-brand-text-muted uppercase tracking-widest">Global Status</CardTitle>
               <Activity className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
               <div className="text-3xl font-black text-white">OPERATIONAL</div>
               <p className="text-[10px] text-brand-text-muted mt-1 uppercase">All services performing within normal parameters</p>
            </CardContent>
         </Card>

         <Card className="bg-brand-surface border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
               <CardTitle className="text-xs font-bold text-brand-text-muted uppercase tracking-widest">Uptime (30d)</CardTitle>
               <Server className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
               <div className="text-3xl font-black text-white">99.98%</div>
               <p className="text-[10px] text-brand-text-muted mt-1 uppercase">2 incidents resolved this month</p>
            </CardContent>
         </Card>

         <Card className="bg-brand-surface border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
               <CardTitle className="text-xs font-bold text-brand-text-muted uppercase tracking-widest">Security Protocol</CardTitle>
               <Lock className="w-4 h-4 text-purple-500" />
            </CardHeader>
            <CardContent>
               <div className="text-3xl font-black text-white">LEVEL 4</div>
               <p className="text-[10px] text-brand-text-muted mt-1 uppercase">Advanced encryption and DDOS protection active</p>
            </CardContent>
         </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
         <Card className="bg-brand-surface border-border">
            <CardHeader>
               <CardTitle className="text-sm font-bold text-white uppercase tracking-widest">Active Background Processes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               {[
                  { name: "IEBC Scraper", status: "Running", progress: 85, icon: RefreshCw },
                  { name: "Bill Content Indexing", status: "Idle", progress: 100, icon: Search },
                  { name: "Sentiment Analyzer", status: "Processing", progress: 42, icon: Zap },
               ].map((proc) => (
                  <div key={proc.name} className="p-4 rounded-xl bg-black/20 border border-border">
                     <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                           <proc.icon className={`w-4 h-4 ${proc.status === 'Running' || proc.status === 'Processing' ? 'animate-spin text-brand-primary' : 'text-brand-text-muted'}`} />
                           <span className="text-xs font-bold text-white">{proc.name}</span>
                        </div>
                        <span className="text-[10px] font-mono text-brand-primary">{proc.progress}%</span>
                     </div>
                     <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                           className="h-full bg-brand-primary shadow-[0_0_10px_rgba(255,193,7,0.5)]" 
                           initial={{ width: 0 }}
                           animate={{ width: `${proc.progress}%` }}
                           transition={{ duration: 1 }}
                        />
                     </div>
                  </div>
               ))}
            </CardContent>
         </Card>

         <Card className="bg-brand-surface border-border">
            <CardHeader>
               <CardTitle className="text-sm font-bold text-white uppercase tracking-widest">System Incident Log</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  <div className="flex gap-4 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
                     <ShieldAlert className="w-5 h-5 text-yellow-500 shrink-0" />
                     <div>
                        <p className="text-xs font-bold text-white">Database Sync Warning</p>
                        <p className="text-[10px] text-brand-text-muted mb-2">Partial failure in constituency boundary update. Automatic retry in 15 mins.</p>
                        <span className="text-[10px] font-mono text-yellow-500 uppercase">MAR 19, 14:22 UTC</span>
                     </div>
                  </div>
                  <div className="flex gap-4 p-4 rounded-xl border border-green-500/20 bg-green-500/5">
                     <Activity className="w-5 h-5 text-green-500 shrink-0" />
                     <div>
                        <p className="text-xs font-bold text-white">Auto-Scale Event</p>
                        <p className="text-[10px] text-brand-text-muted mb-2">Instances increased to 4 due to traffic surge in National Projects.</p>
                        <span className="text-[10px] font-mono text-green-500 uppercase">MAR 19, 09:12 UTC</span>
                     </div>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
