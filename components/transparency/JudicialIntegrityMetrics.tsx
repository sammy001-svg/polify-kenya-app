"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  BarChart3, 
  Users, 
  Scale, 
  CheckCircle2, 
  AlertCircle,
  TrendingDown,
  ExternalLink,
  MessageSquareQuote
} from "lucide-react";
import { cn } from "@/lib/utils";

export function JudicialIntegrityMetrics() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
      {/* Performance Overview */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-kenya-gold" />
              Judiciary Performance Dashboard
            </h3>
            <p className="text-xs text-brand-text-muted font-medium">Annual accountability metrics for the 2025/2026 fiscal year.</p>
          </div>
          <span className="text-[10px] bg-kenya-gold/10 text-kenya-gold border border-kenya-gold/20 px-3 py-1 rounded-full font-black uppercase tracking-wider">
            Verified Source: JSC
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Backlog Cleared", value: "68%", sub: "14% vs last year", icon: TrendingDown, color: "kenya-green" },
            { label: "Automation Rate", value: "92%", sub: "e-filing adoption", icon: CheckCircle2, color: "brand-primary" },
            { label: "Asset Compliance", value: "100%", sub: "Judicial officers", icon: ShieldCheck, color: "kenya-gold" },
            { label: "Public Conf.", value: "76%", sub: "Citizen survey", icon: Users, color: "white" },
          ].map((item, i) => (
            <Card key={i} className="bg-brand-surface border-white/5 group hover:border-white/10 transition-all">
              <CardHeader className="pb-2 space-y-0 flex flex-row items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted">{item.label}</p>
                <item.icon className={cn("w-4 h-4", `text-${item.color}`)} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black text-white">{item.value}</div>
                <p className="text-[10px] text-brand-text-muted mt-1">{item.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* JSC & Wealth Declarations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="space-y-4">
           <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-brand-primary" />
              JSC Oversight
           </h3>
           <Card className="bg-brand-surface border-white/5 overflow-hidden">
              <CardHeader className="bg-white/5 border-b border-white/5">
                 <CardTitle className="text-sm font-bold">Judicial Service Commission Decisions</CardTitle>
                 <CardDescription className="text-xs">Recent disciplinary actions and appointments.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                 {[
                   { type: "Appointment", name: "12 New High Court Judges", status: "Gazetted", date: "Mar 10" },
                   { type: "Discipline", name: "Inquiry into Magistrate Conduct", status: "Ongoing", date: "Mar 05" },
                   { type: "Policy", name: "New Digital Conduct Guidelines", status: "Implemented", date: "Feb 28" }
                 ].map((action, i) => (
                   <div key={i} className="p-4 flex items-center justify-between border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer group">
                      <div className="space-y-1">
                         <div className="flex items-center gap-2">
                           <span className={cn(
                             "text-[8px] font-black uppercase px-1.5 py-0.5 rounded border",
                             action.type === "Appointment" ? "bg-kenya-green/10 text-kenya-green border-kenya-green/20" : 
                             action.type === "Discipline" ? "bg-kenya-red/10 text-kenya-red border-kenya-red/20" : 
                             "bg-brand-primary/10 text-brand-primary border-brand-primary/20"
                           )}>
                             {action.type}
                           </span>
                           <span className="text-[10px] text-brand-text-muted font-bold">{action.date}</span>
                         </div>
                         <h4 className="text-xs font-bold text-white group-hover:text-brand-primary transition-colors">{action.name}</h4>
                      </div>
                      <div className="text-[10px] font-black uppercase text-brand-text-muted group-hover:text-white flex items-center gap-1">
                         {action.status}
                         <ExternalLink className="w-3 h-3" />
                      </div>
                   </div>
                 ))}
                 <div className="p-4">
                    <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 text-[10px] font-black uppercase tracking-widest h-9">
                       View Comprehensive JSC Archive
                    </Button>
                 </div>
              </CardContent>
           </Card>
        </section>

        {/* JuriCheck Community Feedback */}
        <section className="space-y-4">
           <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquareQuote className="w-5 h-5 text-kenya-green" />
              JuriCheck™ Feedback
           </h3>
           <Card className="bg-linear-to-br from-kenya-green/10 via-transparent to-transparent border-kenya-green/20">
              <CardContent className="p-6 space-y-4 text-center">
                 <div className="w-16 h-16 bg-kenya-green/10 rounded-full flex items-center justify-center mx-auto mb-2 border border-kenya-green/20">
                    <Users className="w-8 h-8 text-kenya-green" />
                 </div>
                 <div className="space-y-2">
                    <h4 className="font-bold text-white">How was your court experience?</h4>
                    <p className="text-xs text-brand-text-muted leading-relaxed max-w-xs mx-auto">
                       Help us map judicial integrity by reporting transparency, delays, or excellence in service. 
                       Your feedback is anonymous and aggregated into our public reports.
                    </p>
                 </div>
                 <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button variant="outline" className="border-white/10 hover:bg-white/5 text-[10px] font-black uppercase tracking-widest py-6 flex flex-col gap-1">
                       <AlertCircle className="w-4 h-4 text-kenya-red" />
                       Report Delay
                    </Button>
                    <Button variant="outline" className="border-white/10 hover:bg-white/5 text-[10px] font-black uppercase tracking-widest py-6 flex flex-col gap-1 text-kenya-green">
                       <CheckCircle2 className="w-4 h-4" />
                       Report Excellence
                    </Button>
                 </div>
                 <p className="text-[9px] text-brand-text-muted italic">
                    Note: This is for monitoring purposes only and does not constitute a legal appeal.
                 </p>
              </CardContent>
           </Card>
        </section>
      </div>
    </div>
  );
}
