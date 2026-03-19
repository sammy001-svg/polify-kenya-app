import { AnalyticsOverview } from "@/components/admin/AnalyticsOverview";
import { BarChart3, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tighter">System Analytics</h1>
            <p className="text-brand-text-muted text-sm">Deep-dive into platform engagement and democratic participation metrics.</p>
         </div>
         <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="bg-brand-surface border-border text-xs font-bold uppercase tracking-widest">
               <Filter className="w-3 h-3 mr-2" />
               Filter
            </Button>
            <Button size="sm" className="bg-brand-primary text-black text-xs font-bold uppercase tracking-widest hover:bg-brand-primary/80">
               <Download className="w-3 h-3 mr-2" />
               Export CSV
            </Button>
         </div>
      </div>

      <AnalyticsOverview />

      <div className="grid gap-6 md:grid-cols-3">
         <div className="md:col-span-2 p-6 rounded-2xl bg-brand-surface border border-border">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-sm font-bold text-white uppercase tracking-widest">Growth Forecast (Q2)</h3>
               <BarChart3 className="w-4 h-4 text-brand-primary" />
            </div>
            <div className="h-64 flex items-end gap-2 px-4">
               {[45, 62, 58, 75, 90, 82, 95].map((h, i) => (
                  <div key={i} className="flex-1 bg-brand-primary/20 rounded-t-lg group relative cursor-pointer hover:bg-brand-primary/40 transition-colors">
                     <div 
                        className="absolute bottom-0 w-full bg-brand-primary rounded-t-lg shadow-[0_0_15px_rgba(255,193,7,0.3)] transition-all group-hover:shadow-[0_0_20px_rgba(255,193,7,0.5)]" 
                        style={{ height: `${h}%` }} 
                     />
                  </div>
               ))}
            </div>
            <div className="flex justify-between mt-4 px-4 text-[10px] font-bold text-brand-text-muted uppercase tracking-widest">
               <span>Week 1</span>
               <span>Week 2</span>
               <span>Week 3</span>
               <span>Week 4</span>
               <span>Week 5</span>
               <span>Week 6</span>
               <span>Week 7</span>
            </div>
         </div>

         <div className="p-6 rounded-2xl bg-brand-surface border border-border">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Device Distribution</h3>
            <div className="space-y-6">
               {[
                  { name: "Mobile (PWA)", value: 72, color: "bg-brand-primary" },
                  { name: "Desktop", value: 24, color: "bg-blue-500" },
                  { name: "Tablets", value: 4, color: "bg-purple-500" },
               ].map((d) => (
                  <div key={d.name} className="space-y-2">
                     <div className="flex justify-between text-xs">
                        <span className="text-brand-text-muted">{d.name}</span>
                        <span className="font-bold text-white">{d.value}%</span>
                     </div>
                     <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full ${d.color}`} style={{ width: `${d.value}%` }} />
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
