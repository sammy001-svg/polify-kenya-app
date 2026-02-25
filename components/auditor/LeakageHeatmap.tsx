"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Map as MapIcon, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const COUNTIES_LEAKAGE = [
  { name: "Nairobi", loss: "KES 4.2B", intensity: 0.9, flags: 42 },
  { name: "Kiambu", loss: "KES 2.1B", intensity: 0.7, flags: 18 },
  { name: "Mombasa", loss: "KES 1.8B", intensity: 0.6, flags: 12 },
  { name: "Turkana", loss: "KES 3.4B", intensity: 0.85, flags: 31 },
  { name: "Nakuru", loss: "KES 1.2B", intensity: 0.4, flags: 8 },
  { name: "Kisumu", loss: "KES 0.9B", intensity: 0.3, flags: 5 },
];

export function LeakageHeatmap() {
  return (
    <div className="bg-white/2 border border-white/10 rounded-[40px] p-8 space-y-8 relative overflow-hidden">
      {/* Background HUD Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-kenya-dark-orange/5 blur-[100px] pointer-events-none" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="space-y-1">
          <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase flex items-center gap-2">
            <MapIcon className="w-6 h-6 text-kenya-dark-orange" /> Corruption Leakage Heatmap
          </h3>
          <p className="text-sm text-brand-text-muted">Visualizing financial loss intensity based on OAG Adverse Opinions.</p>
        </div>
        <div className="flex items-center gap-4 bg-black/40 p-2 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 px-3 py-1">
             <div className="w-3 h-3 rounded-full bg-kenya-dark-orange shadow-[0_0_10px_rgba(194,65,12,0.5)]" />
             <span className="text-[10px] font-black text-white uppercase italic">Critical</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 border-l border-white/10">
             <div className="w-3 h-3 rounded-full bg-kenya-dark-orange/30" />
             <span className="text-[10px] font-black text-white/40 uppercase italic">Low Risk</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Interactive Map Stand-in */}
        <div className="lg:col-span-7 relative aspect-square lg:aspect-video bg-black/40 rounded-[32px] border border-white/5 overflow-hidden group">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
           
           {/* Simulated Map Regions */}
           <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="w-[80%] h-[80%] border border-white/5 rounded-full border-dashed opacity-20" 
              />
              <div className="absolute flex flex-wrap gap-4 justify-center max-w-md">
                 {COUNTIES_LEAKAGE.map((county, i) => (
                    <motion.div
                       key={county.name}
                       initial={{ scale: 0 }}
                       animate={{ scale: 1 }}
                       transition={{ delay: i * 0.1 }}
                       whileHover={{ scale: 1.1, zIndex: 50 }}
                       className="relative cursor-help"
                    >
                       <div 
                         className={cn(
                           "flex flex-col items-center gap-2 transition-all p-4 rounded-3xl",
                           county.intensity > 0.8 ? "bg-kenya-dark-orange/20 border-kenya-dark-orange/30" : "bg-white/5 border-white/10"
                         )}
                       >
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center relative"
                            style={{ 
                              background: `radial-gradient(circle, rgba(194, 65, 12, ${county.intensity}) 0%, transparent 70%)` 
                            }}
                          >
                             <ShieldAlert className={cn("w-6 h-6", county.intensity > 0.8 ? "text-kenya-dark-orange" : "text-white/20")} />
                             {county.intensity > 0.8 && (
                                <span className="absolute inset-0 rounded-full border border-kenya-dark-orange animate-ping" />
                             )}
                          </div>
                          <span className="text-[10px] font-black text-white italic uppercase tracking-tighter">{county.name}</span>
                       </div>
                    </motion.div>
                 ))}
              </div>
           </div>

           <div className="absolute bottom-6 left-6 p-4 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 space-y-1">
              <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">Global Scan Status</div>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-kenya-green animate-pulse" />
                 <span className="text-sm font-black text-white italic uppercase">Satellite Link Stable</span>
              </div>
           </div>
        </div>

        {/* Right: Data Breakdown */}
        <div className="lg:col-span-5 space-y-6">
           <h4 className="text-xs font-black text-white uppercase tracking-[0.3em] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-kenya-dark-orange" />
              TOP_LEAKAGE_VECTORS
           </h4>
           
           <div className="space-y-4">
              {COUNTIES_LEAKAGE.sort((a,b) => b.intensity - a.intensity).map((county, idx) => (
                <div key={county.name} className="p-4 bg-white/3 border border-white/5 rounded-2xl flex items-center justify-between group hover:bg-white/5 transition-all">
                   <div className="flex items-center gap-4">
                      <div className="text-sm font-black text-white/20 italic">0{idx + 1}</div>
                      <div>
                         <div className="text-sm font-black text-white uppercase italic tracking-tighter">{county.name}</div>
                         <div className="text-[9px] font-bold text-brand-text-muted uppercase tracking-widest">{county.flags} Forensic Flags Found</div>
                      </div>
                   </div>
                   <div className="text-right">
                      <div className="text-lg font-black text-kenya-dark-orange italic tracking-tighter">{county.loss}</div>
                      <div className="h-1 w-24 bg-white/5 rounded-full overflow-hidden mt-1">
                         <div 
                           className="h-full bg-kenya-dark-orange" 
                           style={{ width: `${county.intensity * 100}%` }}
                         />
                      </div>
                   </div>
                </div>
              ))}
           </div>

           <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.4em] transition-all">
              Initialize Data Reconstruction Workflow
           </button>
        </div>
      </div>
    </div>
  );
}
