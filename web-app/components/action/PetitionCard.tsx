"use client";

import { Petition } from "@/lib/action-data";
import { cn } from "@/lib/utils";
import { Clock, Share2, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface PetitionCardProps {
  petition: Petition;
}

export function PetitionCard({ petition }: PetitionCardProps) {
  const [signed, setSigned] = useState(false);
  
  const percentage = Math.min(Math.round((petition.signatures / petition.goal) * 100), 100);

  const handleSign = () => {
    setSigned(true);
    // In a real app, this would mutate backend state
  };

  return (
    <div className="w-[320px] shrink-0 bg-brand-surface-secondary border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-all flex flex-col h-full group">
       <div className="h-32 bg-cover bg-center relative" style={{ backgroundImage: `url(${petition.imageUrl})` }}>
           <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
           <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] uppercase font-bold text-white flex items-center gap-1">
               <Clock className="w-3 h-3 text-kenya-red" /> {petition.daysLeft} days left
           </div>
       </div>

       <div className="p-4 flex flex-col flex-1">
          <div className="text-[10px] text-kenya-green font-bold uppercase mb-1">To: {petition.target}</div>
          <h3 className="font-bold text-base text-white leading-tight mb-2 line-clamp-2 min-h-12">
             {petition.title}
          </h3>
          <p className="text-xs text-brand-text-muted line-clamp-3 mb-4 flex-1">
             {petition.description}
          </p>

          <div className="space-y-3 mt-auto">
             {/* Progress Bar */}
             <div className="space-y-1">
                 <div className="flex justify-between text-[10px] font-bold text-white">
                     <span>{petition.signatures.toLocaleString()} signed</span>
                     <span className="text-brand-text-muted">of {petition.goal.toLocaleString()} goal</span>
                 </div>
                 <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-kenya-green transition-all duration-1000" style={{ width: `${percentage}%` }} />
                 </div>
             </div>

             <div className="grid grid-cols-4 gap-2">
                 <Button 
                   onClick={handleSign}
                   disabled={signed}
                   className={cn(
                     "col-span-3 h-9 text-xs font-bold",
                     signed ? "bg-white/10 text-brand-text-muted" : "bg-kenya-red hover:bg-kenya-red/90 text-white"
                   )}
                 >
                    {signed ? (
                        <>Signed <CheckIcon className="w-3 h-3 ml-1" /></>
                    ) : (
                        <>Sign Petition <PenTool className="w-3 h-3 ml-1" /></>
                    )}
                 </Button>
                 <Button variant="outline" size="icon" className="h-9 w-9 border-white/10 bg-white/5 hover:bg-white/10 text-white">
                    <Share2 className="w-4 h-4" />
                 </Button>
             </div>
          </div>
       </div>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>
    )
}
