"use client";

import { MapPin } from "lucide-react";

const ALERTS = [
  { 
    id: 1, 
    msg: "High Turnout Anomaly: Kisumu", 
    detail: "AI detected 15% surge in voter turnout within 20 mins. Validating station logs..." 
  },
  { 
    id: 2, 
    msg: "Form Mismatch: Eldoret", 
    detail: "Discrepancy found between Form 34A digital scan and OCR results. Manual audit triggered." 
  },
  { 
    id: 3, 
    msg: "Duplicate Entry: Nakuru", 
    detail: "Identical serial numbers flagged across multiple submission streams. Isolating node..." 
  },
  { 
    id: 4, 
    msg: "Data Sync Lag: Mombasa", 
    detail: "Real-time stream delay detected in 4 clusters. Redirecting traffic to secondary backup." 
  },
  { 
    id: 5, 
    msg: "Voter Registry Pulse: Nyeri", 
    detail: "Unusual verification patterns in 12 stations. AI cross-referencing biometric logs." 
  },
  { 
    id: 6, 
    msg: "Log Integrity Check: Garissa", 
    detail: "System checksum mismatch in regional hub. Initiating deep packet inspection." 
  },
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
      <div className="relative z-10 -mt-px bg-white border-2 border-slate-200 p-4 [clip-path:polygon(0_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%)] shadow-2xl flex-1 overflow-hidden">
        {/* Inner Border Lines */}
        <div className="absolute inset-x-0 top-0 h-px bg-slate-100" />
        <div className="absolute left-0 top-0 bottom-15 w-px bg-slate-100" />

        {/* Scrollable Container */}
        <div className="h-[120px] md:h-full overflow-y-auto pr-2 custom-scrollbar-minimal flex flex-col gap-4 py-1 font-mono">
          {ALERTS.map((alert) => (
             <div key={alert.id} className="flex gap-4 group/alert transition-colors">
                {/* Red Triangle Arrow */}
                <div className="mt-1 w-0 h-0 border-t-4 border-t-transparent border-l-[6px] border-l-[#ff0000] border-b-4 border-b-transparent shrink-0" />

                <div className="flex flex-col gap-0.5">
                   <span className="text-[11px] font-black text-slate-900 uppercase tracking-wider group-hover/alert:text-[#ff4444] transition-colors">{alert.msg}</span>
                   <p className="text-[9px] font-bold text-slate-500 leading-tight uppercase tracking-tight max-w-[90%]">
                      {alert.detail}
                   </p>
                </div>
             </div>
          ))}
        </div>

        {/* Bottom Right Decorative Triangle Cutout Accent */}
        <div className="absolute bottom-0 right-0 w-4 h-[2px] bg-slate-200" />
      </div>
    </div>
  );
}
