"use client";

import { useState } from "react";
import { Vote as VoteType } from "@/lib/parliament-data";
import { Vote as VoteIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface VotingTableProps {
  initialVotes: VoteType[];
}

export function VotingTable({ initialVotes }: VotingTableProps) {
  const [filterVote, setFilterVote] = useState<string>("all");
  const [filterParty, setFilterParty] = useState<string>("all");

  const votes = initialVotes.filter(vote => {
    const matchVote = filterVote === "all" || vote.vote.toLowerCase() === filterVote;
    const matchParty = filterParty === "all" || vote.party === filterParty;
    return matchVote && matchParty;
  });

  const getVoteBadgeColor = (vote: VoteType["vote"]) => {
    switch (vote) {
      case "Yes": return "bg-kenya-green/10 text-kenya-green border-kenya-green/20";
      case "No": return "bg-kenya-red/10 text-kenya-red border-kenya-red/20";
      case "Abstain": return "bg-kenya-gold/10 text-kenya-gold border-kenya-gold/20";
      default: return "bg-white/5 text-brand-text-muted border-white/10";
    }
  };

  const uniqueParties = Array.from(new Set(initialVotes.map(v => v.party)));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex gap-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
            {["all", "yes", "no", "abstain"].map((v) => (
                <button
                    key={v}
                    onClick={() => setFilterVote(v)}
                    className={cn(
                        "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300",
                        filterVote === v ? "bg-white/10 text-white shadow-lg" : "text-brand-text-muted hover:text-white"
                    )}
                >
                    {v === "all" ? "Full Roll Call" : v}
                </button>
            ))}
        </div>

        <Select value={filterParty} onValueChange={setFilterParty}>
          <SelectTrigger className="w-[200px] h-11 bg-white/5 border-white/10 text-white rounded-2xl font-bold uppercase text-[10px] tracking-widest focus:ring-kenya-gold/30">
            <SelectValue placeholder="Filter by Party" />
          </SelectTrigger>
          <SelectContent className="bg-brand-surface-secondary border-white/10 rounded-2xl">
            <SelectItem value="all" className="text-[10px] font-bold uppercase tracking-widest">All Coalitions</SelectItem>
            {uniqueParties.map(party => (
                <SelectItem key={party} value={party} className="text-[10px] font-bold uppercase tracking-widest">{party}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Modern High-Density Table */}
      <div className="bg-white/2 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-xl">
        <div className="grid grid-cols-12 gap-6 px-8 py-6 border-b border-white/5 bg-white/5">
            <div className="col-span-5 text-[10px] font-black text-brand-text-muted uppercase tracking-[0.2em]">Representative</div>
            <div className="col-span-2 text-[10px] font-black text-brand-text-muted uppercase tracking-[0.2em]">Party</div>
            <div className="col-span-3 text-[10px] font-black text-brand-text-muted uppercase tracking-[0.2em]">Constituency</div>
            <div className="col-span-2 text-right text-[10px] font-black text-brand-text-muted uppercase tracking-[0.2em]">Decision</div>
        </div>
        <div className="max-h-[600px] overflow-y-auto custom-scrollbar divide-y divide-white/5">
            {votes.length === 0 ? (
                <div className="p-20 text-center flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                        <VoteIcon className="w-8 h-8 text-brand-text-muted opacity-20" />
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest text-brand-text-muted">No division records found</p>
                </div>
            ) : (
                votes.map((vote, i) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        key={vote.id} 
                        className="grid grid-cols-12 gap-6 px-8 py-5 items-center hover:bg-white/3 transition-colors group"
                    >
                        <div className="col-span-5 flex items-center gap-5">
                            <div className="relative">
                                <Avatar className="h-12 w-12 border-2 border-white/10 shadow-2xl group-hover:border-kenya-gold/50 transition-colors duration-500">
                                    <AvatarFallback className="bg-linear-to-br from-brand-primary/20 to-transparent text-brand-primary text-xs font-black">
                                        {vote.mpName.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className={cn(
                                    "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black z-10",
                                    vote.vote === "Yes" ? "bg-kenya-green" : vote.vote === "No" ? "bg-kenya-red" : "bg-kenya-gold"
                                )} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-black text-white group-hover:text-kenya-gold transition-colors">{vote.mpName}</span>
                                <span className="text-[10px] text-brand-text-muted font-bold uppercase tracking-tighter opacity-50">Honourable Member</span>
                            </div>
                        </div>
                        <div className="col-span-2">
                             <div className="inline-flex items-center px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black text-brand-text-muted uppercase tracking-widest">
                                {vote.party}
                             </div>
                        </div>
                        <div className="col-span-3">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-white/90">{vote.constituency}</span>
                                <span className="text-[10px] text-brand-text-muted uppercase tracking-tighter">Constituency</span>
                            </div>
                        </div>
                        <div className="col-span-2 flex justify-end">
                            <span className={cn(
                                "text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-xl border shadow-lg transition-transform group-hover:scale-110 duration-300", 
                                getVoteBadgeColor(vote.vote)
                            )}>
                                {vote.vote}
                            </span>
                        </div>
                    </motion.div>
                ))
            )}
        </div>
      </div>
    </div>
  );
}
