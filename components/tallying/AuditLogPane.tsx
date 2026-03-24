"use client";

import { Bell } from "lucide-react";

const LOGS = [
  { id: 1, text: "Form 34A from Mandera Uploaded", color: "text-[#00FF8C]", bg: "bg-[#00FF8C]", bars: 4 },
  { id: 2, text: "Anomaly Flagged in Kisii", color: "text-[#00FF8C]", bg: "bg-[#00FF8C]", bars: 2 },
  { id: 3, text: "Validation Complete for Kilifi", color: "text-[#00FF8C]", bg: "bg-[#00FF8C]", bars: 5 },
  { id: 4, text: "Duplicate Form Alert in Machakos", color: "text-[#ff4444]", bg: "bg-[#ff4444]", bars: 1 },
];

export function AuditLogPane() {
  return (
    <div className="relative w-full flex flex-col group h-full">
      {/* 1. ANGLED TITLE TAB */}
      <div className="relative z-20 flex w-full md:w-fit min-w-0 md:min-w-[240px] h-8 bg-[#091813] border-t border-l border-r border-[#18362A] [clip-path:polygon(0_0,calc(100%-10px)_0,100%_100%,0_100%)] md:[clip-path:polygon(0_0,calc(100%-15px)_0,100%_100%,0_100%)] ml-auto">
         <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00FF8C] shadow-[0_0_8px_#00FF8C]" />
         <div className="absolute inset-0 bg-linear-to-r from-[#00FF8C]/10 to-transparent pointer-events-none" />
         
         <div className="flex items-center gap-2 px-3 w-full">
            <Bell className="w-3 h-3 text-[#00FF8C] fill-[#00FF8C] shrink-0" />
            <h3 className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest leading-none pt-0.5 truncate">LIVE FEED & AUDIT LOG</h3>
         </div>
      </div>

      {/* 2. MAIN CARD BODY (Chamfered) */}
      <div className="relative z-10 -mt-px bg-[#06120E] border-2 border-[#18362A] p-3 [clip-path:polygon(0_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%)] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] flex-1 flex flex-col">
        {/* Inner Border Lines */}
        <div className="absolute inset-x-0 top-0 h-px bg-[#00FF8C]/20" />
        <div className="absolute left-0 top-0 bottom-15 w-px bg-[#00FF8C]/10" />

        <div className="flex flex-col gap-2 pt-1 flex-1">
          {LOGS.map((log) => (
             <div key={log.id} className="flex items-center gap-3 py-1.5 border-b border-[#00FF8C]/10 last:border-0 hover:bg-[#00FF8C]/5 px-2 transition-colors cursor-pointer group/log">
                {/* Green/Red Triangle Arrow */}
                <div className={`w-0 h-0 border-t-4 border-t-transparent border-l-[6px] border-b-4 border-b-transparent shrink-0 ${
                   log.bg === 'bg-[#00FF8C]' ? 'border-l-[#00FF8C] drop-shadow-[0_0_3px_#00FF8C]' : 'border-l-[#ff4444] drop-shadow-[0_0_3px_#ff0000]'
                }`} />
                
                <span className={`text-[11px] font-bold tracking-wide flex-1 truncate ${log.bg === 'bg-[#00FF8C]' ? 'text-[#00FF8C]' : 'text-[#ff4444]'}`}>
                   {log.text}
                </span>

                {/* Status Bars */}
                <div className="flex gap-[2px] shrink-0 items-end h-3">
                   {[...Array(5)].map((_, i) => (
                     <div 
                       key={i} 
                       className={`w-[4px] bg-[#00FF8C] rounded-[1px] ${i < log.bars ? 'h-full opacity-100 shadow-[0_0_5px_#00FF8C]' : 'h-1/2 opacity-20'}`} 
                     />
                   ))}
                </div>
             </div>
          ))}
        </div>

        {/* Bottom Right Decorative Triangle Cutout Accent */}
        <div className="absolute bottom-0 right-0 w-4 h-[2px] bg-[#00FF8C]/50" />
      </div>
    </div>
  );
}
