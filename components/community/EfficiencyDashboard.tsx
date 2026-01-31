"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Clock, Target, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function EfficiencyDashboard() {
  const stats = [
    { label: "Avg. Acknowledge Time", value: "4.2 hrs", trend: "-12%", icon: Clock, color: "text-blue-400" },
    { label: "Resolution Rate", value: "68%", trend: "+5%", icon: Target, color: "text-kenya-green" },
    { label: "Urgent Escalations", value: "14", trend: "+2", icon: AlertCircle, color: "text-kenya-red" },
  ];

  const countyPerformance = [
    { name: "Nairobi", score: 82, resolved: 450, time: "48h" },
    { name: "Mombasa", score: 74, resolved: 210, time: "72h" },
    { name: "Kisumu", score: 65, resolved: 180, time: "96h" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-brand-surface border-white/5">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted">{stat.label}</p>
                <div className="text-xl font-bold">{stat.value}</div>
              </div>
              <div className={cn("p-2 rounded-lg bg-white/5", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-brand-surface border-white/5 overflow-hidden">
        <CardHeader className="bg-white/5 border-b border-white/5 py-4">
          <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
             <BarChart3 className="w-4 h-4 text-kenya-gold" />
             County Efficiency Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-white/5">
            {countyPerformance.map((county, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-white/2 transition-colors">
                <div className="flex items-center gap-4">
                   <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-black">
                      #{i+1}
                   </div>
                   <div>
                      <h4 className="font-bold text-sm">{county.name}</h4>
                      <p className="text-[10px] text-brand-text-muted uppercase font-black">{county.resolved} Issues Resolved</p>
                   </div>
                </div>
                
                <div className="text-right">
                   <div className="text-sm font-bold text-kenya-green">{county.score}/100</div>
                   <div className="text-[10px] text-brand-text-muted">Avg: {county.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-kenya-gold/5 border border-kenya-gold/20 rounded-xl p-4 flex items-start gap-4">
         <TrendingUp className="w-5 h-5 text-kenya-gold mt-1 shrink-0" />
         <div>
            <h5 className="text-sm font-bold text-white">Efficiency Insight</h5>
            <p className="text-[11px] text-brand-text-muted leading-relaxed mt-1">
               Water related issues in **Upper Hill** are being resolved 15% faster than last month. 
               This correlates with the new County Water Taskforce deployment.
            </p>
         </div>
      </div>
    </div>
  );
}
