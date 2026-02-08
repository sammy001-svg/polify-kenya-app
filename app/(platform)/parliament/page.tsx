"use client";

import { useState } from "react";
import { BILLS, VOTING_RECORDS } from "@/lib/parliament-data";
import { BillKanban } from "@/components/parliament/BillKanban";
import { VotingTable } from "@/components/parliament/VotingTable";
import { HansardSearch } from "@/components/parliament/HansardSearch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gavel, FileText, Vote, Search, Info, TrendingUp } from "lucide-react";
import { GamificationService } from "@/lib/gamification-service";
import { AccountabilityService } from "@/lib/accountability-service";
import { motion } from "framer-motion";

export default function ParliamentPage() {
  const [bills, setBills] = useState(BILLS);
  const [activeTab, setActiveTab] = useState("bills");

  const handleVote = async (id: string, vote: "yay" | "nay") => {
    // Award XP
    await GamificationService.voteOnBill("current-user", id);

    // Persist vote for Accountability Sync
    AccountabilityService.saveUserVote(id, vote);

    // Update local state (simulate count increment)
    setBills((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          return {
            ...b,
            supportCount: vote === "yay" ? b.supportCount + 1 : b.supportCount,
            opposeCount: vote === "nay" ? b.opposeCount + 1 : b.opposeCount,
            myVote: vote,
          };
        }
        return b;
      }),
    );
  };

  const tabs = [
    {
      id: "bills",
      label: "Active Bills",
      icon: FileText,
      color: "text-brand-primary",
    },
    {
      id: "voting",
      label: "Voting Records",
      icon: Vote,
      color: "text-kenya-red",
    },
    {
      id: "hansard",
      label: "Hansard Search",
      icon: Search,
      color: "text-blue-400",
    },
  ];

  return (
    <div className="animate-in fade-in duration-700 h-[calc(100vh-8rem)] md:h-[calc(100vh-10rem)] flex flex-col min-h-0 overflow-hidden">
      {/* Premium Header Section */}
      <div className="relative p-8 rounded-3xl bg-brand-surface/40 border border-white/10 glass-dark overflow-hidden group">
        <div className="absolute inset-0 bg-linear-to-br from-brand-primary/10 via-transparent to-kenya-red/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-primary/10 blur-[100px] rounded-full" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-kenya-red/10 blur-[100px] rounded-full" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-3 h-3" />
              Live Legislative Tracking
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter flex items-center gap-4">
              <span className="p-3 bg-brand-primary rounded-2xl shadow-[0_0_30px_rgba(255,193,7,0.3)]">
                <Gavel className="w-8 h-8 md:w-10 md:h-10 text-black" />
              </span>
              Parliament Watch
            </h1>
            <p className="text-brand-text-muted text-lg max-w-2xl leading-relaxed">
              Real-time monitoring of legislative progress. Watch how laws are
              made, monitor representation, and search parliamentary records in
              seconds.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-2xl font-black text-white">
                {bills.length}
              </div>
              <div className="text-[10px] text-brand-text-muted uppercase font-bold tracking-widest">
                Active Bills
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-2xl font-black text-brand-primary">2.4k</div>
              <div className="text-[10px] text-brand-text-muted uppercase font-bold tracking-widest">
                Citizen Votes
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs
        defaultValue="bills"
        onValueChange={setActiveTab}
        className="w-full flex-1 flex flex-col min-h-0 mt-6"
      >
        <div className="flex items-center justify-between mb-6">
          <TabsList className="bg-brand-surface/50 border border-white/10 p-1.5 rounded-2xl h-auto self-start backdrop-blur-md relative overflow-hidden">
            <div className="flex gap-1">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white px-6 py-3 rounded-xl flex gap-3 items-center transition-all duration-300 relative group z-10"
                >
                  <tab.icon
                    className={`w-4 h-4 transition-transform duration-300 group-hover:scale-125 ${activeTab === tab.id ? tab.color : "text-brand-text-muted"}`}
                  />
                  <span className="font-bold text-sm">{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-white/5 rounded-xl border border-white/10 -z-10 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </TabsTrigger>
              ))}
            </div>
          </TabsList>

          <div className="hidden lg:flex items-center gap-4 text-brand-text-muted text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
              Live Sync
            </span>
            <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">
              Updated 2 mins ago
            </span>
          </div>
        </div>

        <div className="flex-1 min-h-0 relative">
          <TabsContent
            value="bills"
            className="animate-in slide-in-from-bottom-6 fade-in duration-500 flex-1 min-h-0 outline-none"
          >
            <BillKanban bills={bills} onVote={handleVote} />
          </TabsContent>

          <TabsContent
            value="voting"
            className="animate-in slide-in-from-bottom-6 fade-in duration-500 overflow-y-auto outline-none h-full"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 pb-8">
              <div className="lg:col-span-2 bg-brand-surface border border-white/10 rounded-3xl p-8 glass-dark shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Vote className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                    <div className="p-2 bg-kenya-red/20 rounded-xl">
                      <Vote className="w-6 h-6 text-kenya-red" />
                    </div>
                    Latest Division Votes
                  </h2>
                  <VotingTable initialVotes={VOTING_RECORDS} />
                </div>
              </div>

              <div className="bg-brand-surface border border-white/10 rounded-3xl p-8 glass-dark">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-text-muted mb-8 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-brand-primary" />
                  Sentiment Alignment
                </h3>

                <div className="space-y-8">
                  {[
                    {
                      title: "Finance Bill 2026",
                      user: 82,
                      house: 45,
                      status: "High Divergence",
                    },
                    {
                      title: "Health Laws Amdt",
                      user: 30,
                      house: 88,
                      status: "Low Alignment",
                    },
                    {
                      title: "Eco-Levy Repeal",
                      user: 95,
                      house: 12,
                      status: "Critical Gap",
                    },
                  ].map((item, i) => (
                    <div key={i} className="space-y-4 group">
                      <div className="flex justify-between items-center group-hover:translate-x-1 transition-transform">
                        <span className="text-white font-bold text-sm tracking-tight">
                          {item.title}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-brand-text-muted font-black uppercase">
                          {item.status}
                        </span>
                      </div>
                      <div className="space-y-3">
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[10px] text-brand-text-muted uppercase font-black tracking-wider">
                            <span>Public Support</span>
                            <span className="text-brand-primary">
                              {item.user}%
                            </span>
                          </div>
                          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.user}%` }}
                              transition={{ duration: 1, delay: i * 0.1 }}
                              className="bg-brand-primary h-full rounded-full shadow-[0_0_10px_rgba(255,193,7,0.3)]"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[10px] text-brand-text-muted uppercase font-black tracking-wider">
                            <span>House Approval</span>
                            <span className="text-kenya-red">
                              {item.house}%
                            </span>
                          </div>
                          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.house}%` }}
                              transition={{ duration: 1, delay: i * 0.1 + 0.2 }}
                              className="bg-kenya-red h-full rounded-full shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                        <p className="text-[10px] text-brand-text-muted font-bold italic">
                          Divergence Score
                        </p>
                        <span className="text-white font-black text-xs">
                          {Math.abs(item.user - item.house)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="hansard"
            className="animate-in slide-in-from-bottom-6 fade-in duration-500 overflow-y-auto outline-none h-full"
          >
            <div className="bg-brand-surface border border-white/10 rounded-3xl p-8 glass-dark shadow-2xl relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Search className="w-32 h-32" />
              </div>

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-white flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-xl">
                      <Search className="w-6 h-6 text-blue-400" />
                    </div>
                    Parliamentary Hansard
                  </h2>
                  <div className="flex items-center gap-2 text-brand-text-muted text-xs font-bold bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                    <Info className="w-3.5 h-3.5" />
                    Archive back to 1963
                  </div>
                </div>
                <div className="flex-1">
                  <HansardSearch />
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
