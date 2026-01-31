"use client";

import { GrassrootsReport } from "@/lib/grassroots-service";
import { CheckCircle2, Clock, Building2, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResponseTimelineProps {
  report: GrassrootsReport;
}

export function ResponseTimeline({ report }: ResponseTimelineProps) {
  if (!report.responseTimeline) return (
     <div className="p-4 bg-white/5 rounded-xl text-center">
        <p className="text-xs text-brand-text-muted italic">No official response actions recorded for this report yet.</p>
     </div>
  );

  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-white/10">
      {report.responseTimeline.map((step, i) => (
        <div key={i} className="relative group">
          <div className={cn(
            "absolute -left-[22px] top-1 w-4 h-4 rounded-full border-2 bg-brand-bg transition-all",
            step.status === 'Addressed' ? "border-kenya-green bg-kenya-green/20" : 
            step.status === 'Investigating' ? "border-kenya-gold bg-kenya-gold/20" : "border-white/20"
          )}>
             {step.status === 'Addressed' && <CheckCircle2 className="w-3 h-3 text-kenya-green absolute -top-0.5 -left-0.5" />}
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h5 className="text-sm font-bold text-white">{step.label}</h5>
              <span className="text-[10px] text-brand-text-muted font-bold flex items-center gap-1">
                <Clock className="w-3 h-3" /> {new Date(step.timestamp).toLocaleDateString()}
              </span>
            </div>
            
            <p className="text-xs text-brand-text-muted leading-relaxed">
               {step.notes || `Report status transitioned to ${step.status}.`}
            </p>

            {step.agency && (
              <div className="flex items-center gap-1.5 mt-2 bg-white/5 w-fit px-2 py-1 rounded border border-white/5">
                 <Building2 className="w-3 h-3 text-brand-text-muted" />
                 <span className="text-[10px] font-black uppercase tracking-tight text-white">{step.agency}</span>
              </div>
            )}
          </div>
        </div>
      ))}
      
      {report.status !== 'Addressed' && (
        <div className="pt-2">
           <button className="flex items-center gap-2 text-[10px] font-black uppercase text-kenya-red hover:underline tracking-widest">
              <MessageCircle className="w-3.5 h-3.5" /> Request Agency Update
           </button>
        </div>
      )}
    </div>
  );
}
