"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  Search,
  CheckCircle2
} from "lucide-react";

export function AnalyticsOverview() {
  return (
    <div className="space-y-4">
      <Card className="bg-brand-surface border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-black text-white">Engagement Pulse</CardTitle>
              <p className="text-sm text-brand-text-muted">Real-time platform interaction metrics</p>
            </div>
            <TrendingUp className="w-5 h-5 text-brand-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-brand-text-muted uppercase tracking-widest">Growth Rate</span>
              <div className="text-2xl font-black text-white">+12.4%</div>
              <p className="text-[10px] text-green-500">↑ vs last week</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-brand-text-muted uppercase tracking-widest">Active Votes</span>
              <div className="text-2xl font-black text-white">45,892</div>
              <p className="text-[10px] text-brand-text-muted">Current House division</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-brand-text-muted uppercase tracking-widest">AI Queries</span>
              <div className="text-2xl font-black text-white">8,102</div>
              <p className="text-[10px] text-blue-500">Legal Aid chatbot</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-brand-text-muted uppercase tracking-widest">Verified Ads</span>
              <div className="text-2xl font-black text-white">1,245</div>
              <p className="text-[10px] text-brand-text-muted">Advocates on platform</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-brand-surface border-border">
          <CardHeader>
             <CardTitle className="text-sm font-bold text-white uppercase tracking-tight">Most Searched Locations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             {[
               { name: "Nairobi County", count: 1240, trend: "+5%" },
               { name: "Mombasa County", count: 890, trend: "+12%" },
               { name: "Kisumu County", count: 750, trend: "-2%" },
             ].map((loc) => (
               <div key={loc.name} className="flex items-center justify-between text-sm">
                 <span className="text-brand-text-muted">{loc.name}</span>
                 <div className="flex items-center gap-4">
                   <span className="font-bold text-white">{loc.count}</span>
                   <span className={loc.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}>{loc.trend}</span>
                 </div>
               </div>
             ))}
          </CardContent>
        </Card>

        <Card className="bg-brand-surface border-border">
          <CardHeader>
             <CardTitle className="text-sm font-bold text-white uppercase tracking-tight">System Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <Search className="w-4 h-4 text-yellow-500 mt-0.5" />
                <div>
                   <p className="text-xs font-bold text-white">IEBC Data Sync Delayed</p>
                   <p className="text-[10px] text-brand-text-muted">Voter registration delta pending update for 2 hours.</p>
                </div>
             </div>
             <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                <div>
                   <p className="text-xs font-bold text-white">New Hansard Scanned</p>
                   <p className="text-[10px] text-brand-text-muted">Mar 18 Session documents indexed successfully.</p>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
