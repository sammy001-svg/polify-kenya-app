"use client";

import { useState } from "react";
import { BILLS, VOTING_RECORDS } from "@/lib/parliament-data";
import { BillKanban } from "@/components/parliament/BillKanban";
import { VotingTable } from "@/components/parliament/VotingTable";
import { HansardSearch } from "@/components/parliament/HansardSearch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gavel, FileText, Vote } from "lucide-react";
import { GamificationService } from "@/lib/gamification-service";
import { AccountabilityService } from "@/lib/accountability-service";

export default function ParliamentPage() {
  const [bills, setBills] = useState(BILLS);

  const handleVote = async (id: string, vote: 'yay' | 'nay') => {
    // Award XP
    await GamificationService.voteOnBill("current-user", id);
    
    // Persist vote for Accountability Sync
    AccountabilityService.saveUserVote(id, vote);
    
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-brand-surface border border-white/5 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Vote className="w-5 h-5 text-brand-primary" />
                  Latest Division Votes
              </h2>
              <VotingTable initialVotes={VOTING_RECORDS} />
            </div>
            
            <div className="bg-brand-surface border border-white/5 rounded-2xl p-6">
               <h3 className="text-sm font-black uppercase tracking-widest text-brand-text-muted mb-6">
                 Sentiment Alignment
               </h3>
               
               <div className="space-y-6">
                  {[
                    { title: "Finance Bill 2026", user: 82, house: 45 },
                    { title: "Health Laws Amdt", user: 30, house: 88 },
                    { title: "Eco-Levy Repeal", user: 95, house: 12 }
                  ].map((item, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-white">{item.title}</span>
                      </div>
                      <div className="space-y-1.5">
                         <div className="flex justify-between text-[9px] text-brand-text-muted uppercase font-bold">
                           <span>Public Support</span>
                           <span>{item.user}%</span>
                         </div>
                         <div className="w-full bg-white/5 h-1.5 rounded-full">
                           <div className="bg-brand-primary h-full rounded-full" style={{ width: `${item.user}%` }} />
                         </div>
                         
                         <div className="flex justify-between text-[9px] text-brand-text-muted uppercase font-bold">
                           <span>House Approval</span>
                           <span>{item.house}%</span>
                         </div>
                         <div className="w-full bg-white/5 h-1.5 rounded-full">
                           <div className="bg-kenya-red h-full rounded-full" style={{ width: `${item.house}%` }} />
                         </div>
                      </div>
                      <div className="pt-2 border-t border-white/5">
                        <p className="text-[10px] text-brand-text-muted italic">
                          Divergence: {Math.abs(item.user - item.house)}%
                        </p>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
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
