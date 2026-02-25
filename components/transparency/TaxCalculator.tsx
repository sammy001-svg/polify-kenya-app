"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Coins, Receipt, PieChart } from "lucide-react";
import { NATIONAL_BUDGET_2025 } from "@/lib/finance-data";

export function TaxCalculator() {
  const [income, setIncome] = useState<number>(50000);
  const [monthlySpend, setMonthlySpend] = useState<number>(30000);

  // Simplified tax logic for Kenya
  const calculateTotalAnnualTax = () => {
    // Basic PAYE (simplistic for demo)
    const annualIncome = income * 12;
    const paye = annualIncome * 0.25; // 25% avg
    
    // VAT (avg 10% of spending goes to VAT directly/indirectly)
    const annualVat = (monthlySpend * 12) * 0.16 * 0.6; // 60% of spend is vatable
    
    return paye + annualVat;
  };

  const totalTax = calculateTotalAnnualTax();
  const totalBudget = NATIONAL_BUDGET_2025.reduce((acc, s) => acc + s.amountAllocated, 0);

  return (
    <Card className="bg-brand-surface border-white/5 overflow-hidden">
      <CardHeader className="bg-brand-surface-secondary border-b border-white/5">
        <CardTitle className="flex items-center gap-2 text-white">
          <Coins className="w-5 h-5 text-kenya-gold" />
          Where Do My Taxes Go?
        </CardTitle>
        <p className="text-xs text-brand-text-muted">Estimation based on current spending and income.</p>
      </CardHeader>
      <CardContent className="p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-bold text-white uppercase tracking-wider">Monthly Income (KES)</label>
              <Input 
                type="number" 
                value={income} 
                onChange={(e) => setIncome(Number(e.target.value))}
                className="bg-black/20 border-white/10 text-white"
              />
              <Slider 
                value={[income]} 
                max={500000} 
                step={5000} 
                onValueChange={(val: number[]) => setIncome(val[0])}
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-white uppercase tracking-wider">Monthly Expenses (KES)</label>
              <Input 
                type="number" 
                value={monthlySpend} 
                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                className="bg-black/20 border-white/10 text-white"
              />
              <Slider 
                value={[monthlySpend]} 
                max={income} 
                step={1000} 
                onValueChange={(val: number[]) => setMonthlySpend(val[0])}
              />
            </div>

            <div className="pt-4 p-4 border border-kenya-gold/20 bg-kenya-gold/5 rounded-xl">
               <div className="flex items-center gap-2 mb-2">
                 <Receipt className="w-4 h-4 text-kenya-gold" />
                 <span className="text-xs font-black uppercase tracking-widest text-kenya-gold">Estimated Annual Tax</span>
               </div>
               <div className="text-3xl font-black text-white">KES {(totalTax / 1e3).toFixed(1)}k</div>
            </div>
          </div>

          {/* Breakdown */}
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-brand-text-muted flex items-center gap-2">
              <PieChart className="w-4 h-4" /> Breakdown of Your KES {(totalTax/1e3).toFixed(1)}k
            </h3>
            
            <div className="space-y-3">
               {NATIONAL_BUDGET_2025.map((sector) => {
                 const share = (sector.amountAllocated / totalBudget) * totalTax;
                 return (
                   <div key={sector.id} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-white">{sector.sector}</span>
                        <span className="font-bold text-kenya-gold">KES {share.toFixed(0)}</span>
                      </div>
                      <div className="w-full bg-white/5 h-1 rounded-full">
                        <div 
                          className="bg-kenya-gold h-full rounded-full" 
                          style={{ width: `${(sector.amountAllocated / totalBudget) * 100}%` }} 
                        />
                      </div>
                   </div>
                 );
               })}
            </div>

            <div className="pt-4 text-center">
              <p className="text-[10px] text-brand-text-muted italic">
                *This is a demo calculator using simplified tax rates and average VAT impact.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
