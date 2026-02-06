"use client";

import Link from "next/link";
import { PoliticalParty } from "@/lib/parties-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface PartyCardProps {
  party: PoliticalParty;
}

export function PartyCard({ party }: PartyCardProps) {
  return (
    <Card className="group overflow-hidden border-border/50 bg-brand-surface hover:bg-brand-surface-highlight transition-all duration-300 hover:shadow-lg hover:shadow-kenya-red/5 hover:-translate-y-1">
      <div className={cn("h-2 w-full", party.color)} />
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
                <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl text-white shadow-inner",
                    party.color
                )}>
                    {party.abbreviation.charAt(0)}
                </div>
                <div>
                    <h3 className="font-black text-lg leading-tight group-hover:text-kenya-red transition-colors">
                        {party.abbreviation}
                    </h3>
                    <p className="text-xs font-medium text-brand-text-muted uppercase tracking-wider line-clamp-1">
                        {party.name}
                    </p>
                </div>
            </div>
        </div>

        <div className="space-y-4 mb-6">
            <div className="p-3 bg-brand-surface-secondary rounded-lg border border-white/5">
                <p className="text-xs text-brand-text-muted mb-1 font-medium">Party Leader</p>
                <p className="font-bold text-sm truncate">{party.leadership.leader.name}</p>
            </div>
            
            <div className="flex gap-4">
               <div>
                  <p className="flex items-center gap-1.5 text-xs text-brand-text-muted mb-1">
                     <Users className="w-3.5 h-3.5" /> Members
                  </p>
                  <p className="font-bold text-sm">{party.stats.membersCount}</p>
               </div>
               <div>
                  <p className="flex items-center gap-1.5 text-xs text-brand-text-muted mb-1">
                     <Trophy className="w-3.5 h-3.5" /> MPs
                  </p>
                  <p className="font-bold text-sm">{party.stats.electedMPs}</p>
               </div>
            </div>
        </div>

        <div className="pt-4 border-t border-white/5">
             <Link href={`/parties/${party.id}`}>
                <Button className="w-full bg-black text-white hover:bg-neutral-900 border border-white/10 group-hover:border-kenya-red/30 transition-all font-bold text-xs uppercase tracking-widest h-9">
                    View Party <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
            </Link>
        </div>
      </div>
    </Card>
  );
}
