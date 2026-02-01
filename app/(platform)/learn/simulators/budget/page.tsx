"use client";

import { useState, useMemo } from "react";
import { INITIAL_BUDGET, BudgetCategory, calculateBudgetOutcome } from "@/lib/budget-data";
import { BudgetSlider } from "@/components/learn/BudgetSliders";
import { Button } from "@/components/ui/button";
import { Calculator, Wallet, TrendingUp, AlertTriangle, Smile, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from 'next/link';

export default function BudgetSimulatorPage() {
  // Deep copy initial state
  const [budget, setBudget] = useState<BudgetCategory[]>(JSON.parse(JSON.stringify(INITIAL_BUDGET)));
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleUpdate = (id: string, newVal: number) => {
    setBudget(prev => prev.map(item => 
      item.id === id ? { ...item, value: newVal } : item
    ));
    setIsSubmitted(false); // Reset analysis if changed
  };

  const { totalRevenue, totalExpenditure, deficit, happinessScore, growthScore } = useMemo(() => 
    calculateBudgetOutcome(budget), 
  [budget]);

  return (
    <div className="h-full flex flex-col space-y-4 p-4 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <Link href="/learn" className="text-xs font-bold text-brand-text-muted hover:text-white mb-2 block uppercase tracking-wider">
              ← Back to Learning
           </Link>
           <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-2">
             <Calculator className="w-8 h-8 text-kenya-gold" />
             Budget Simulator 2026
           </h1>
           <p className="text-brand-text-muted text-sm max-w-xl">
             You are the Cabinet Secretary for Treasury. Balance the books, satisfy the citizens, and grow the economy.
           </p>
        </div>
        
        {/* Scorecards */}
        <div className="flex gap-4">
             <div className="bg-brand-surface border border-white/5 p-3 rounded-xl min-w-[120px]">
                 <p className="text-[10px] uppercase font-bold text-brand-text-muted mb-1">Citizen Happiness</p>
                 <div className="flex items-center gap-2">
                    <Smile className={cn("w-5 h-5", happinessScore > 50 ? "text-kenya-green" : "text-kenya-red")} />
                    <span className="text-2xl font-black">{happinessScore.toFixed(0)}%</span>
                 </div>
             </div>
             <div className="bg-brand-surface border border-white/5 p-3 rounded-xl min-w-[120px]">
                 <p className="text-[10px] uppercase font-bold text-brand-text-muted mb-1">GDP Growth</p>
                 <div className="flex items-center gap-2">
                    <TrendingUp className={cn("w-5 h-5", growthScore > 3 ? "text-kenya-green" : "text-kenya-red")} />
                    <span className="text-2xl font-black">{growthScore.toFixed(1)}%</span>
                 </div>
             </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 overflow-hidden min-h-0">
          
          {/* Revenue Column */}
          <div className="flex flex-col gap-4 overflow-y-auto pr-2">
              <div className="bg-brand-surface/50 p-3 rounded-lg border-l-4 border-kenya-green">
                  <h2 className="font-bold text-kenya-green uppercase tracking-wider text-sm flex items-center gap-2">
                      <Wallet className="w-4 h-4" /> Revenue (Citations)
                  </h2>
                  <p className="text-3xl font-black text-white mt-1">KES {(totalRevenue / 1000).toFixed(1)}T</p>
              </div>
              
              <div className="space-y-4">
                  {budget.filter(c => c.type === 'revenue').map(category => (
                      <BudgetSlider 
                        key={category.id} 
                        category={category} 
                        value={category.value}
                        onChange={(val) => handleUpdate(category.id, val)}
                      />
                  ))}
              </div>
          </div>

          {/* Expenditure Column */}
          <div className="flex flex-col gap-4 overflow-y-auto pr-2">
              <div className="bg-brand-surface/50 p-3 rounded-lg border-l-4 border-kenya-red">
                  <h2 className="font-bold text-kenya-red uppercase tracking-wider text-sm flex items-center gap-2">
                      <TrendingDown className="w-4 h-4" /> Expenditure
                  </h2>
                  <p className="text-3xl font-black text-white mt-1">KES {(totalExpenditure / 1000).toFixed(1)}T</p>
              </div>

              <div className="space-y-4">
                  {budget.filter(c => c.type === 'expenditure').map(category => (
                      <BudgetSlider 
                        key={category.id} 
                        category={category} 
                        value={category.value}
                        onChange={(val) => handleUpdate(category.id, val)}
                      />
                  ))}
              </div>
          </div>
          
          {/* Analysis Column */}
          <div className="flex flex-col gap-6 bg-brand-surface border border-white/5 rounded-2xl p-6 h-full overflow-y-auto">
              <div className="space-y-2 text-center py-4 border-b border-white/5">
                  <h3 className="text-sm font-bold text-brand-text-muted uppercase tracking-widest">Fiscal Deficit</h3>
                  <div className={cn(
                      "text-4xl font-black",
                      deficit < 0 ? "text-kenya-red" : "text-kenya-green"
                  )}>
                      {deficit > 0 ? "+" : ""}{deficit}B
                  </div>
                  <p className="text-xs text-brand-text-muted">
                      {deficit < -700 ? "CRITICAL: IMF Warning Issued" : deficit < 0 ? "Manageable Deficit" : "Budget Surplus"}
                  </p>
              </div>

              {!isSubmitted ? (
                  <div className="flex-1 flex flex-col justify-center items-center text-center space-y-4 opacity-50">
                      <Calculator className="w-16 h-16 text-brand-text-muted" />
                      <p className="text-sm text-brand-text-muted">Adjust sliders to balance the budget, then analyze the outcome.</p>
                      <Button onClick={() => setIsSubmitted(true)} size="lg" className="w-full font-bold">
                          Submit Budget for Review
                      </Button>
                  </div>
              ) : (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="bg-white/5 p-4 rounded-xl space-y-3">
                          <h4 className="font-bold text-white flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 text-kenya-gold" /> AI Analyst Feedback
                          </h4>
                          <p className="text-sm text-brand-text-muted leading-relaxed">
                              {deficit < -800 
                                ? "Your deficit is dangerously high. Borrowing costs will spike, likely leading to a credit downgrade. Consider raising VAT or cutting non-essential spending." 
                                : happinessScore < 40
                                ? "Citizens are unhappy despite the stable economy. High taxes and low social spending are causing unrest. Review your Health and Education allocations."
                                : "This is a balanced budget. You successfully maintained growth while keeping debt manageable. Good job, Waziri!"
                              }
                          </p>
                      </div>

                      <Button onClick={() => setIsSubmitted(false)} variant="secondary" className="w-full">
                          Adjust Budget
                      </Button>
                  </div>
              )}
          </div>

      </div>
    </div>
  );
}
