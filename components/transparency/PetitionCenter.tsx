"use client";

import { useState } from "react";
import { Petition, MOCK_PETITIONS, PetitionService } from "@/lib/petition-service";
import { Button } from "@/components/ui/button";
import { Users, FileSignature, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function PetitionCenter() {
  const [petitions, setPetitions] = useState<Petition[]>(MOCK_PETITIONS);
  const [signedIds, setSignedIds] = useState<string[]>([]);

  const handleSign = (id: string) => {
    if (signedIds.includes(id)) return;
    PetitionService.signPetition(id);
    setPetitions([...MOCK_PETITIONS]);
    setSignedIds([...signedIds, id]);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
         <div className="space-y-1">
            <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase flex items-center gap-2">
              <FileSignature className="w-6 h-6 text-brand-primary" /> Momentum Petitions
            </h2>
            <p className="text-sm text-brand-text-muted">Direct citizen pressure on legislative and executive branches.</p>
         </div>
         <Button variant="outline" className="h-12 px-8 font-black uppercase tracking-widest text-[10px] border-white/10 hover:bg-white/5 rounded-2xl group transition-all">
            <span className="group-hover:text-brand-primary transition-colors">Start Collective Action</span>
         </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
        {petitions.map((petition, idx) => (
          <div key={petition.id} className="relative bg-white/2 border border-white/5 rounded-[32px] p-8 flex flex-col gap-6 group hover:border-brand-primary/30 transition-all duration-500 overflow-hidden">
             {/* Momentum Indicator Background */}
             <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                <FileSignature className="w-32 h-32 text-brand-primary" />
             </div>

             <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary/60">{petition.category}</span>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                        <span className="text-[10px] font-bold text-white/40 uppercase">Trending Now</span>
                    </div>
                </div>
                <h3 className="text-xl font-black text-white group-hover:text-brand-primary transition-colors tracking-tight leading-none italic">{petition.title}</h3>
                <p className="text-sm text-brand-text-muted leading-relaxed line-clamp-2 italic">&quot;{petition.description}&quot;</p>
             </div>

             <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <div className="text-[9px] font-black text-white/30 uppercase tracking-widest">Growth Velocity</div>
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-brand-primary/60" />
                            <span className="text-sm font-black text-white">{petition.signatures.toLocaleString()}</span>
                            <span className="text-[10px] text-white/20 font-mono italic">/ {petition.threshold.toLocaleString()} GOAL</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-xl font-black text-brand-primary italic tracking-tighter">
                            {Math.round((petition.signatures / petition.threshold) * 100)}%
                        </span>
                    </div>
                </div>
                <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden relative border border-white/5">
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(petition.signatures / petition.threshold) * 100}%` }}
                        transition={{ duration: 1.5, delay: idx * 0.1 }}
                        className="h-full bg-linear-to-r from-brand-primary/60 to-brand-primary rounded-full relative z-10 shadow-[0_0_10px_rgba(0,255,128,0.3)]" 
                    />
                    <div className="absolute inset-0 bg-white/5" />
                </div>
             </div>

             <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[8px] font-black text-white/40">
                        {petition.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                        <div className="text-[9px] font-black text-white/20 uppercase tracking-widest leading-none">Initiated By</div>
                        <div className="text-[11px] font-bold text-white/60">{petition.author}</div>
                    </div>
                </div>
                <Button 
                   size="sm" 
                   disabled={signedIds.includes(petition.id) || petition.status === 'Goal Reached'}
                   onClick={() => handleSign(petition.id)}
                   className={cn(
                     "h-10 px-6 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-xl",
                     signedIds.includes(petition.id) 
                       ? 'bg-kenya-green/10 text-kenya-green border border-kenya-green/30 cursor-default' 
                       : 'bg-brand-primary text-black hover:scale-105 active:scale-95'
                   )}
                >
                   {signedIds.includes(petition.id) ? (
                     <span className="flex items-center gap-2">
                       <CheckCircle className="w-3.5 h-3.5" /> Signature Recorded
                     </span>
                   ) : petition.status === 'Goal Reached' ? 'Goal Reached' : 'Sign Petition'}
                </Button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
