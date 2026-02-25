import { CAMPAIGN_METRICS, MOCK_WARD_DATA, CAMPAIGN_ALERTS } from "@/lib/campaign-data";
import { VoterHeatmap } from "./VoterHeatmap";
import { EventsCalendar } from "./EventsCalendar";
import { CampaignStrategyAI } from "./CampaignStrategyAI";
import { Users, ThumbsUp, Activity, TrendingUp, AlertTriangle, Lightbulb, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  users: Users,
  'thumbs-up': ThumbsUp,
  activity: Activity,
  'trending-up': TrendingUp,
};

export function CandidateDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Top Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {CAMPAIGN_METRICS.map((metric) => {
          const Icon = iconMap[metric.icon];
          return (
            <div key={metric.label} className="bg-brand-surface/40 backdrop-blur-md border border-white/5 p-5 rounded-2xl relative overflow-hidden group hover:border-brand-primary/30 transition-all duration-500 shadow-xl">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 group-hover:scale-125 transition-all duration-700 text-brand-primary">
                <Icon className="w-16 h-16" />
              </div>
              
              <div className="relative z-10 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-muted">{metric.label}</p>
                <div className="flex items-end justify-between">
                   <h3 className="text-3xl font-black text-white tabular-nums tracking-tighter">{metric.value}</h3>
                   <div className={cn(
                     "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm",
                     metric.isPositive 
                       ? "bg-kenya-green/10 text-kenya-green border border-kenya-green/20" 
                       : "bg-kenya-red/10 text-kenya-red border border-kenya-red/20"
                   )}>
                     <TrendingUp className={cn("w-3 h-3", !metric.isPositive && "rotate-180")} />
                     {metric.change}
                   </div>
                </div>
              </div>
              
              {/* Bottom Glow */}
              <div className={cn(
                "absolute bottom-0 left-0 w-full h-0.5 opacity-0 group-hover:opacity-100 transition-opacity",
                metric.isPositive ? "bg-kenya-green" : "bg-kenya-red"
              )} />
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Main Chart Area (Heatmap) */}
         <div className="lg:col-span-2 space-y-8">
            <div className="bg-brand-surface/30 backdrop-blur-sm border border-white/5 rounded-3xl p-1 overflow-hidden shadow-2xl">
               <VoterHeatmap data={MOCK_WARD_DATA} />
            </div>
            
            {/* Strategy Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <EventsCalendar />
               <CampaignStrategyAI />
            </div>
         </div>

         {/* Alerts & Insights Feed */}
         <div className="bg-brand-surface border border-white/5 rounded-3xl p-6 space-y-6 h-full flex flex-col shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />
            
            <div className="flex items-center justify-between relative z-10">
              <h3 className="font-black text-white text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                <Activity className="w-4 h-4 text-brand-primary animate-pulse" /> Live Intel
              </h3>
              <span className="text-[9px] font-bold bg-white/5 px-2 py-1 rounded text-brand-text-muted uppercase tracking-wider">Realtime</span>
            </div>
            
            <div className="space-y-4 relative z-10 overflow-y-auto max-h-[500px] pr-2 scrollbar-none">
              {CAMPAIGN_ALERTS.map((alert) => (
                <div key={alert.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex gap-4 items-start hover:bg-white/10 hover:border-white/10 transition-all duration-300 cursor-pointer group/alert">
                   <div className={cn(
                     "shrink-0 p-2 rounded-xl border border-current/20 transition-transform group-hover/alert:scale-110",
                     alert.type === 'critical' ? "text-kenya-red bg-kenya-red/5" :
                     alert.type === 'opportunity' ? "text-kenya-green bg-kenya-green/5" :
                     "text-brand-text-muted bg-white/5"
                   )}>
                      {alert.type === 'critical' && <AlertTriangle className="w-4 h-4" />}
                      {alert.type === 'opportunity' && <Lightbulb className="w-4 h-4" />}
                      {alert.type === 'info' && <Info className="w-4 h-4" />}
                   </div>
                   <div className="space-y-1">
                      <p className="text-[13px] text-brand-text leading-relaxed font-medium group-hover/alert:text-white transition-colors">{alert.message}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] uppercase font-black text-brand-text-muted/60">Intelligence Update</span>
                        <span className="w-1 h-1 rounded-full bg-white/10" />
                        <span className="text-[9px] font-bold text-brand-text-muted/40 italic">2m ago</span>
                      </div>
                   </div>
                </div>
              ))}
            </div>

            <button className="w-full py-4 mt-auto bg-brand-primary text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-white hover:text-black transition-all shadow-xl shadow-brand-primary/10 border border-brand-primary/20 relative z-10 overflow-hidden group">
               <span className="relative z-10">Generate Comprehensive Report</span>
               <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
         </div>
      </div>
    </div>
  );
}
