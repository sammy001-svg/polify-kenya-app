"use client";

import { WardSentiment } from "@/lib/campaign-data";
import { cn } from "@/lib/utils";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

export function VoterHeatmap({ data }: { data: WardSentiment[] }) {
  // Simulating a map grid for demo purposes since we don't have GeoJSON
  return (
    <div className="bg-brand-surface border border-white/5 rounded-2xl p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider">Regional Sentiment Map</h3>
        <div className="flex gap-2 text-[10px] uppercase font-bold text-brand-text-muted">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-kenya-red" /> Critical</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-kenya-gold" /> Mixed</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-kenya-green" /> Strong</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 aspect-video bg-black/20 rounded-xl p-4 border border-white/5 relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
        
        {data.map((ward) => {
          const colorClass = 
            ward.sentimentScore > 70 ? "bg-kenya-green/20 border-kenya-green/40 hover:bg-kenya-green/40" :
            ward.sentimentScore > 50 ? "bg-kenya-gold/20 border-kenya-gold/40 hover:bg-kenya-gold/40" :
            "bg-kenya-red/20 border-kenya-red/40 hover:bg-kenya-red/40";

          return (
            <TooltipProvider key={ward.id}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <div className={cn(
                    "rounded-lg border backdrop-blur-sm flex flex-col items-center justify-center p-4 transition-all duration-300 cursor-help group",
                    colorClass
                  )}>
                    <span className="text-xs font-black text-white mb-1">{ward.name}</span>
                    <span className="text-2xl font-black opacity-80">{ward.sentimentScore}%</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-black/90 border-white/10 backdrop-blur-xl p-3">
                  <div className="space-y-1">
                    <p className="font-bold text-white text-sm">{ward.name}</p>
                    <p className="text-xs text-brand-text-muted">Voters: <span className="text-white">{ward.voterCount.toLocaleString()}</span></p>
                    <p className="text-xs text-brand-text-muted">Top Issue: <span className="text-kenya-gold font-bold">{ward.topIssue}</span></p>
                    <p className="text-[10px] uppercase font-bold text-brand-text-muted mt-2">
                       Trend: {ward.trend.toUpperCase()}
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </div>
  );
}
