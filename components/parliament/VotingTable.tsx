"use client";

import { useState } from "react";
import { Vote } from "@/lib/parliament-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface VotingTableProps {
  initialVotes: Vote[];
}

export function VotingTable({ initialVotes }: VotingTableProps) {
  const [filterVote, setFilterVote] = useState<string>("all");
  const [filterParty, setFilterParty] = useState<string>("all");

  const votes = initialVotes.filter(vote => {
    const matchVote = filterVote === "all" || vote.vote.toLowerCase() === filterVote;
    const matchParty = filterParty === "all" || vote.party === filterParty;
    return matchVote && matchParty;
  });

  const getVoteBadgeColor = (vote: Vote["vote"]) => {
    switch (vote) {
      case "Yes": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "No": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "Abstain": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const uniqueParties = Array.from(new Set(initialVotes.map(v => v.party)));

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-4">
        <Select value={filterVote} onValueChange={setFilterVote}>
          <SelectTrigger className="w-[140px] bg-white/5 border-white/10 text-white">
            <SelectValue placeholder="Vote Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Votes</SelectItem>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
            <SelectItem value="abstain">Abstain</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterParty} onValueChange={setFilterParty}>
          <SelectTrigger className="w-[140px] bg-white/5 border-white/10 text-white">
            <SelectValue placeholder="Party" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Parties</SelectItem>
            {uniqueParties.map(party => (
                <SelectItem key={party} value={party}>{party}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-brand-surface border border-white/5 rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 bg-white/5 text-xs font-bold text-brand-text-muted uppercase tracking-wider">
            <div className="col-span-5">Member of Parliament</div>
            <div className="col-span-3">Party</div>
            <div className="col-span-3">Constituency</div>
            <div className="col-span-1 text-center">Vote</div>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
            {votes.length === 0 ? (
                <div className="p-8 text-center text-brand-text-muted">No records found matching filters.</div>
            ) : (
                votes.map((vote) => (
                    <div key={vote.id} className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 items-center hover:bg-white/5 transition-colors">
                        <div className="col-span-5 flex items-center gap-3">
                            <Avatar className="h-8 w-8 border border-white/10">
                                <AvatarFallback className="bg-brand-primary/20 text-brand-primary text-xs">
                                    {vote.mpName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium text-white">{vote.mpName}</span>
                        </div>
                        <div className="col-span-3 text-sm text-brand-text-muted">{vote.party}</div>
                        <div className="col-span-3 text-sm text-brand-text-muted">{vote.constituency}</div>
                        <div className="col-span-1 flex justify-center">
                            <span className={cn("text-xs font-bold px-2.5 py-1 rounded-full border", getVoteBadgeColor(vote.vote))}>
                                {vote.vote}
                            </span>
                        </div>
                    </div>
                ))
            )}
        </div>
      </div>
    </div>
  );
}
