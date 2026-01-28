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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {CAMPAIGN_METRICS.map((metric) => {
          const Icon = iconMap[metric.icon];
          return (
            <div key={metric.label} className="bg-brand-surface border border-white/5 p-4 rounded-xl relative overflow-hidden group hover:border-white/10 transition-colors">
              <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:scale-110 transition-transform">
                <Icon className="w-12 h-12" />
              </div>
              
              <div className="relative z-10 space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted">{metric.label}</p>
                <div className="flex items-end gap-2">
                   <h3 className="text-2xl font-black text-white">{metric.value}</h3>
                   <span className={cn(
                     "text-[10px] font-bold mb-1 px-1.5 py-0.5 rounded",
                     metric.isPositive ? "bg-kenya-green/20 text-kenya-green" : "bg-kenya-red/20 text-kenya-red"
                   )}>
                     {metric.change}
                   </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Main Chart Area (Heatmap) */}
         <div className="lg:col-span-2 space-y-6">
            <VoterHeatmap data={MOCK_WARD_DATA} />
            
            {/* Strategy Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <EventsCalendar />
               <CampaignStrategyAI />
            </div>
         </div>

         {/* Alerts & Insights Feed */}
         <div className="bg-brand-surface border border-white/5 rounded-2xl p-6 space-y-4 h-full flex flex-col">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-brand-primary" /> Live Intelligence
            </h3>
            
            <div className="space-y-3">
              {CAMPAIGN_ALERTS.map((alert) => (
                <div key={alert.id} className="p-3 rounded-xl bg-white/5 border border-white/5 flex gap-3 items-start hover:bg-white/10 transition-colors cursor-pointer">
                   <div className={cn(
                     "shrink-0 mt-0.5",
                     alert.type === 'critical' ? "text-kenya-red" :
                     alert.type === 'opportunity' ? "text-kenya-green" :
                     "text-brand-text-muted"
                   )}>
                      {alert.type === 'critical' && <AlertTriangle className="w-4 h-4" />}
                      {alert.type === 'opportunity' && <Lightbulb className="w-4 h-4" />}
                      {alert.type === 'info' && <Info className="w-4 h-4" />}
                   </div>
                   <div>
                      <p className="text-xs text-brand-text leading-snug">{alert.message}</p>
                      <span className="text-[9px] uppercase font-bold text-brand-text-muted mt-1 block opacity-60">Just now</span>
                   </div>
                </div>
              ))}
            </div>

            <button className="w-full py-3 mt-2 bg-brand-primary/10 text-brand-primary font-black text-xs uppercase tracking-widest rounded-xl hover:bg-brand-primary/20 transition-colors border border-brand-primary/20">
               Generate Strategy Report
            </button>
         </div>
      </div>
    </div>
  );
}
