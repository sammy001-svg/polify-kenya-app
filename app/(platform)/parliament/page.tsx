"use client";

import { useState } from "react";
import { BILLS, VOTING_RECORDS } from "@/lib/parliament-data";
import { BillKanban } from "@/components/parliament/BillKanban";
import { VotingTable } from "@/components/parliament/VotingTable";
import { HansardSearch } from "@/components/parliament/HansardSearch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gavel, FileText, Vote } from "lucide-react";
import { GamificationService } from "@/lib/gamification-service";

export default function ParliamentPage() {
  const [bills, setBills] = useState(BILLS);

  const handleVote = async (id: string, vote: 'yay' | 'nay') => {
    // Award XP
    await GamificationService.voteOnBill("current-user", id);
    
    // Update local state (simulate count increment)
    setBills(prev => prev.map(b => {
      if (b.id === id) {
        return {
          ...b,
          supportCount: vote === 'yay' ? b.supportCount + 1 : b.supportCount,
          opposeCount: vote === 'nay' ? b.opposeCount + 1 : b.opposeCount,
          myVote: vote
        };
      }
      return b;
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 overflow-hidden h-full flex flex-col">
      {/* Header section */}
      <div className="flex flex-col gap-2 shrink-0">
        <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
          <Gavel className="w-10 h-10 text-brand-primary" />
          Parliament Watch
        </h1>
        <p className="text-brand-text-muted text-lg max-w-2xl">
          Track legislative progress, monitor representation, and search parliamentary records in real-time.
        </p>
      </div>

      <Tabs defaultValue="bills" className="w-full flex-1 flex flex-col min-h-0">
        <TabsList className="bg-brand-surface border border-white/5 mb-4 p-1 rounded-xl h-auto self-start">
          <TabsTrigger 
            value="bills" 
            className="data-[state=active]:bg-brand-primary data-[state=active]:text-black px-6 py-2.5 rounded-lg flex gap-2 items-center transition-all"
          >
            <FileText className="w-4 h-4" />
            Active Bills
          </TabsTrigger>
          <TabsTrigger 
            value="voting" 
            className="data-[state=active]:bg-brand-primary data-[state=active]:text-black px-6 py-2.5 rounded-lg flex gap-2 items-center transition-all"
          >
            <Vote className="w-4 h-4" />
            Voting Records
          </TabsTrigger>
          <TabsTrigger 
            value="hansard" 
            className="data-[state=active]:bg-brand-primary data-[state=active]:text-black px-6 py-2.5 rounded-lg flex gap-2 items-center transition-all"
          >
            <Gavel className="w-4 h-4" />
            Hansard Search
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bills" className="animate-in slide-in-from-bottom-4 duration-500 flex-1 min-h-0">
            <BillKanban bills={bills} onVote={handleVote} />
        </TabsContent>

        <TabsContent value="voting" className="animate-in slide-in-from-bottom-4 duration-500 overflow-y-auto">
          <div className="bg-brand-surface border border-white/5 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Vote className="w-5 h-5 text-brand-primary" />
                Latest Division Votes
            </h2>
            <VotingTable initialVotes={VOTING_RECORDS} />
          </div>
        </TabsContent>

        <TabsContent value="hansard" className="animate-in slide-in-from-bottom-4 duration-500 overflow-y-auto">
          <div className="bg-brand-surface border border-white/5 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-primary" />
                Parliamentary Records (Hansard)
            </h2>
            <HansardSearch />
          </div>
        </TabsContent>
        
      </Tabs>
    </div>
  );
}
