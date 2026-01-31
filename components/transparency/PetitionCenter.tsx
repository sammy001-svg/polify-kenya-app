"use client";

import { useState } from "react";
import { Petition, MOCK_PETITIONS, PetitionService } from "@/lib/petition-service";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Users, FileSignature, CheckCircle } from "lucide-react";

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <h2 className="text-xl font-bold text-white flex items-center gap-2">
           <FileSignature className="w-5 h-5 text-brand-primary" /> Collective Action & Petitions
         </h2>
         <Button variant="outline" size="sm" className="text-[10px] uppercase font-black border-white/10">
           Start a Petition
         </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {petitions.map((petition) => (
          <div key={petition.id} className="bg-brand-surface-secondary border border-white/5 rounded-xl p-5 flex flex-col gap-4 group hover:border-brand-primary/30 transition-all">
             <div className="space-y-1">
                <span className="text-[9px] font-black uppercase tracking-widest text-brand-primary">{petition.category}</span>
                <h3 className="font-bold text-white group-hover:text-brand-primary transition-colors">{petition.title}</h3>
                <p className="text-xs text-brand-text-muted line-clamp-2 italic">&quot;{petition.description}&quot;</p>
             </div>

             <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold">
                   <span className="text-brand-text-muted flex items-center gap-1">
                     <Users className="w-3 h-3" /> {petition.signatures.toLocaleString()} Supporters
                   </span>
                   <span className="text-white">{petition.threshold.toLocaleString()} Goal</span>
                </div>
                <Progress value={(petition.signatures / petition.threshold) * 100} className="h-1.5" />
             </div>

             <div className="flex items-center justify-between mt-auto pt-2">
                <div className="text-[10px] text-brand-text-muted">
                   By: {petition.author}
                </div>
                <Button 
                   size="sm" 
                   disabled={signedIds.includes(petition.id) || petition.status === 'Goal Reached'}
                   onClick={() => handleSign(petition.id)}
                   className={`h-8 font-bold text-xs ${
                     signedIds.includes(petition.id) 
                       ? 'bg-green-500/10 text-green-500 hover:bg-green-500/10' 
                       : 'bg-brand-primary text-black'
                   }`}
                >
                   {signedIds.includes(petition.id) ? (
                     <>
                       <CheckCircle className="w-3 h-3 mr-1" /> Signed
                     </>
                   ) : petition.status === 'Goal Reached' ? 'Goal Reached' : 'Sign Now'}
                </Button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
