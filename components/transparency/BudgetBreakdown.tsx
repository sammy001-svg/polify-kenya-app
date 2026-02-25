"use client";

import { BudgetAllocation, NATIONAL_BUDGET_2025, TOTAL_BUDGET } from "@/lib/finance-data";
import { cn } from "@/lib/utils";
import { AlertTriangle, TrendingUp, CheckCircle, AlertOctagon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function BudgetBreakdown() {
  return (
    <div className="space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           {/* Summary Stats */}
           <Card className="bg-brand-surface border-white/5">
              <CardContent className="pt-6">
                 <div className="text-2xl font-black text-white">KES {TOTAL_BUDGET}B</div>
                 <div className="text-xs text-brand-text-muted uppercase tracking-wider font-bold">Total Budget 2025/26</div>
              </CardContent>
           </Card>
           <Card className="bg-brand-surface border-white/5">
              <CardContent className="pt-6">
                 <div className="text-2xl font-black text-kenya-red">KES 1.2T</div>
                 <div className="text-xs text-brand-text-muted uppercase tracking-wider font-bold">Public Debt Service</div>
              </CardContent>
           </Card>
           <Card className="bg-brand-surface border-white/5">
              <CardContent className="pt-6">
                 <div className="text-2xl font-black text-kenya-gold">12.5%</div>
                 <div className="text-xs text-brand-text-muted uppercase tracking-wider font-bold">Deficit (Projected)</div>
              </CardContent>
           </Card>
       </div>

       <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
             <TrendingUp className="w-5 h-5 text-kenya-gold" /> Sector Allocation & Risk Analysis
          </h3>
          
          <div className="grid grid-cols-1 gap-4">
             {NATIONAL_BUDGET_2025.map((sector) => (
                <BudgetCard key={sector.id} data={sector} />
             ))}
          </div>
       </div>
    </div>
  );
}

function BudgetCard({ data }: { data: BudgetAllocation }) {
  const percentageAbsorbed = Math.round((data.amountAbsorbed / data.amountAllocated) * 100);
  
  return (
    <div className="bg-brand-surface-secondary border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all group">
       <div className="flex justify-between items-start mb-4">
           <div>
               <h4 className="font-bold text-base text-white">{data.sector}</h4>
               <p className="text-xs text-brand-text-muted">
                  Absorbed <span className="text-white font-medium">{percentageAbsorbed}%</span> of KES {data.amountAllocated}B
               </p>
           </div>
           
           <div className={cn(
             "px-2 py-1 rounded text-[10px] uppercase font-black tracking-wider border flex items-center gap-1.5",
             data.riskLevel === 'High' && "bg-red-500/10 text-red-400 border-red-500/20",
             data.riskLevel === 'Medium' && "bg-amber-500/10 text-amber-400 border-amber-500/20",
             data.riskLevel === 'Low' && "bg-green-500/10 text-green-400 border-green-500/20",
           )}>
               {data.riskLevel === 'High' && <AlertOctagon className="w-3 h-3" />}
               {data.riskLevel === 'Medium' && <AlertTriangle className="w-3 h-3" />}
               {data.riskLevel === 'Low' && <CheckCircle className="w-3 h-3" />}
               {data.riskLevel} Risk
           </div>
       </div>

       {/* Progress Bar */}
       <div className="relative h-2.5 w-full bg-black/40 rounded-full overflow-hidden mb-3">
           <div 
             className={cn(
               "absolute top-0 left-0 h-full rounded-full transition-all duration-1000",
               percentageAbsorbed < 50 ? "bg-red-500" : percentageAbsorbed < 80 ? "bg-amber-500" : "bg-green-500"
             )}
             style={{ width: `${percentageAbsorbed}%` }}
           />
       </div>
       
       {data.flaggedProjects > 0 && (
          <div className="flex items-center gap-2 text-xs text-brand-text-muted bg-white/5 p-2 rounded-lg">
              <AlertTriangle className="w-3.5 h-3.5 text-kenya-gold" />
              <span>
                 <strong className="text-white">{data.flaggedProjects} projects</strong> currently flagged by Auditor General.
              </span>
          </div>
       )}
    </div>
  )
}
