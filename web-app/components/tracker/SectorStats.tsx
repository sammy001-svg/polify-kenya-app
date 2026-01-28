'use client';

import { Card } from "@/components/ui/card";
import { ConstituencyStats } from "@/lib/tracker-data";

interface SectorStatsProps {
  stats: ConstituencyStats;
}

export function SectorStats({ stats }: SectorStatsProps) {
    const sortedSectors = Object.entries(stats.sectorDistribution).sort(([,a], [,b]) => b - a);

  return (
    <Card className="p-6 bg-brand-surface border-border">
      <h3 className="text-lg font-bold mb-4">Sector Allocation</h3>
      <div className="space-y-4">
        {sortedSectors.map(([sector, percentage]) => (
            <div key={sector} className="space-y-1">
                <div className="flex justify-between text-sm">
                    <span className="text-brand-text-muted">{sector}</span>
                    <span className="font-medium">{percentage}%</span>
                </div>
                <div className="h-2 w-full bg-brand-surface-highlight rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-brand-primary rounded-full" 
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>
        ))}
      </div>
      
      <div className="mt-8 pt-6 border-t border-border grid grid-cols-2 gap-4">
           <div>
               <div className="text-sm text-brand-text-muted mb-1">Total Allocated</div>
               <div className="text-xl font-bold font-mono text-kenya-green">
                   KES {(stats.cdfAllocation / 1000000).toFixed(1)}M
               </div>
           </div>
           <div>
               <div className="text-sm text-brand-text-muted mb-1">Utilization</div>
               <div className="text-xl font-bold font-mono text-blue-400">
                   {Math.round((stats.cdfUtilized / stats.cdfAllocation) * 100)}%
               </div>
           </div>
      </div>
    </Card>
  );
}
