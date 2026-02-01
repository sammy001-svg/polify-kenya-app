"use client";

import { Slider } from "@/components/ui/slider";
import { BudgetCategory } from "@/lib/budget-data";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface BudgetSlidersProps {
  category: BudgetCategory;
  value: number;
  onChange: (val: number) => void;
}

export function BudgetSlider({ category, value, onChange }: BudgetSlidersProps) {
  const isRevenue = category.type === 'revenue';
  const initialVal = category.value; // Determine change from baseline
  const diff = value - initialVal;

  return (
    <div className="bg-brand-surface border border-white/5 p-4 rounded-xl space-y-3">
      <div className="flex justify-between items-start">
         <div className="space-y-1">
             <h3 className="font-bold text-sm text-white flex items-center gap-2">
                 {category.name}
             </h3>
             <p className="text-[11px] text-brand-text-muted leading-tight max-w-[200px]">
                 {category.description}
             </p>
         </div>
         <div className="text-right">
             <span className={cn(
                 "text-lg font-black tracking-tight block",
                 isRevenue ? "text-kenya-green" : "text-kenya-red"
             )}>
                 KES {value}B
             </span>
             {diff !== 0 && (
                 <span className={cn(
                     "text-[10px] font-bold flex items-center justify-end gap-1",
                     (isRevenue ? diff > 0 : diff < 0) ? "text-green-400" : "text-red-400"
                 )}>
                     {diff > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                     {diff > 0 ? "+" : ""}{diff}B
                 </span>
             )}
         </div>
      </div>

      <Slider
        defaultValue={[value]}
        value={[value]}
        min={category.min}
        max={category.max}
        step={10}
        onValueChange={(vals) => onChange(vals[0])}
        className={cn(
            "py-2",
            isRevenue ? "cursor-pointer" : "cursor-pointer"
        )}
      />
      
      <div className="flex justify-between text-[10px] text-brand-text-muted font-mono">
          <span>{category.min}B</span>
          <span>{category.max}B</span>
      </div>
    </div>
  );
}
