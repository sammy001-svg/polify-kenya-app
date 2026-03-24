"use client";

import { MapPin } from "lucide-react";

const ALERTS = [
  { id: 1, msg: "High Turnout Anomaly in Kisumu" },
  { id: 2, msg: "Form Mismatch in Eldoret" },
  { id: 3, msg: "Duplicate Entry Detected in Nakuru" },
];

export function AIAlertsPane() {
  return (
    <div className="relative w-full flex flex-col group h-full">
      {/* 1. ANGLED TITLE TAB */}
      <div className="relative z-20 flex w-full md:w-fit min-w-0 md:min-w-[200px] h-8 bg-[#091813] border-t border-l border-r border-[#18362A] [clip-path:polygon(0_0,calc(100%-10px)_0,100%_100%,0_100%)] md:[clip-path:polygon(0_0,calc(100%-15px)_0,100%_100%,0_100%)]">
         <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ff0000] shadow-[0_0_8px_#ff0000]" />
         <div className="absolute inset-0 bg-linear-to-r from-[#ff0000]/10 to-transparent pointer-events-none" />
         
         <div className="flex items-center gap-2 px-3 w-full">
            <MapPin className="w-3 h-3 text-[#ff0000] fill-[#ff0000] shrink-0" />
            <h3 className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest truncate">AI ALERTS</h3>
         </div>
      </div>

      {/* 2. MAIN CARD BODY (Chamfered) */}
      <div className="relative z-10 -mt-px bg-[#06120E] border-2 border-[#18362A] p-3 [clip-path:polygon(0_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%)] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] flex-1">
        {/* Inner Border Lines */}
        <div className="absolute inset-x-0 top-0 h-px bg-[#00FF8C]/20" />
        <div className="absolute left-0 top-0 bottom-15 w-px bg-[#00FF8C]/10" />

        <div className="flex flex-col gap-2 pt-1">
          {ALERTS.map((alert) => (
             <div key={alert.id} className="flex items-center gap-3 py-1">
                {/* Red Triangle Arrow */}
                <div className="w-0 h-0 border-t-4 border-t-transparent border-l-[6px] border-l-[#ff4444] border-b-4 border-b-transparent shrink-0 drop-shadow-[0_0_3px_#ff0000]" />

                <span className="text-xs font-bold text-white/90 tracking-wide">{alert.msg}</span>
             </div>
          ))}
        </div>

        {/* Bottom Right Decorative Triangle Cutout Accent */}
        <div className="absolute bottom-0 right-0 w-4 h-[2px] bg-[#00FF8C]/50" />
      </div>
    </div>
  );
}
