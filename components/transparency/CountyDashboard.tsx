"use client";

import { useState, useMemo } from "react";
import { getCountyBudget } from "@/lib/county-data";
import { COUNTIES } from "@/lib/constants/counties";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  Wallet, 
  Building2, 
  Projector,
  PieChart,
  MapPin,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

export function CountyDashboard() {
  const [selectedCounty, setSelectedCounty] = useState("Nairobi");
  const budget = useMemo(() => getCountyBudget(selectedCounty), [selectedCounty]);
  
  const absorptionRate = budget.totalAllocation > 0 
    ? (budget.totalSpent / budget.totalAllocation) * 100 
    : 0;

  return (
    <div className="space-y-6">
      {/* County Selector Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-brand-surface border border-white/5 p-4 rounded-2xl relative">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-kenya-red/10 flex items-center justify-center">
               <MapPin className="w-5 h-5 text-kenya-red" />
            </div>
            <div className="relative">
               <div className="flex items-center gap-2 cursor-pointer group">
                  <h3 className="font-bold text-white text-lg">{selectedCounty} County</h3>
                  <ChevronDown className="w-4 h-4 text-brand-text-muted group-hover:text-white transition-colors" />
               </div>
               <select 
                  value={selectedCounty} 
                  onChange={(e) => setSelectedCounty(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
               >
                  {COUNTIES.map(c => <option key={c.code} value={c.name}>{c.name}</option>)}
               </select>
               <p className="text-xs text-brand-text-muted">Fiscal Oversight Dashboard</p>
            </div>
         </div>
         <div className="flex gap-4">
            <div className="text-right">
               <p className="text-[10px] uppercase font-black text-brand-text-muted tracking-widest">Absorption Rate</p>
               <p className={cn("text-lg font-bold", absorptionRate > 85 ? "text-kenya-green" : "text-kenya-gold")}>
                  {absorptionRate.toFixed(1)}%
               </p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-brand-surface border-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] uppercase font-black text-brand-text-muted flex items-center gap-2">
              <Wallet className="w-3 h-3" /> Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES {budget.totalAllocation}B</div>
            <p className="text-[10px] text-brand-text-muted mt-1">FY {budget.fiscalYear} Allocation</p>
          </CardContent>
        </Card>

        <Card className="bg-brand-surface border-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] uppercase font-black text-brand-text-muted flex items-center gap-2">
              <TrendingUp className="w-3 h-3" /> Total Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES {budget.totalSpent}B</div>
            <p className="text-[10px] text-brand-text-muted mt-1">Direct Expenditures</p>
          </CardContent>
        </Card>

        <Card className="bg-brand-surface border-white/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] uppercase font-black text-brand-text-muted flex items-center gap-2">
              <Building2 className="w-3 h-3" /> Departments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{budget.departmentalBreakdown.length}</div>
            <p className="text-[10px] text-brand-text-muted mt-1">Active Portfolios</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-brand-surface border-white/5">
        <CardHeader className="bg-white/5 border-b border-white/5 py-4">
          <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
            <PieChart className="w-4 h-4 text-kenya-gold" />
            Departmental Absorption
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-white/5">
            {budget.departmentalBreakdown.map((dept, i) => (
              <div key={i} className="p-4 hover:bg-white/5 transition-colors group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-kenya-red/10 transition-colors">
                      <Projector className="w-4 h-4 text-brand-text-muted group-hover:text-kenya-red" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{dept.department}</h4>
                      <p className="text-[10px] text-brand-text-muted uppercase font-black">{dept.projectsCount} Active Projects</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">KES {dept.spent}B</div>
                    <div className="text-[9px] text-brand-text-muted">of {dept.allocated}B</div>
                  </div>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full transition-all duration-1000",
                      (dept.spent / dept.allocated) > 0.8 ? "bg-kenya-green" : "bg-kenya-gold"
                    )}
                    style={{ width: `${(dept.spent / dept.allocated) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
