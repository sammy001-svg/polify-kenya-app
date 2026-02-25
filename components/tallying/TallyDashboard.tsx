"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import {
  getResults,
  getProjections,
  CandidateResult,
  TallyStats,
} from "@/actions/tallying";
import { createClient } from "@/lib/supabase";
import { Toaster } from "sonner";
import { VerifiedBadge } from "./VerifiedBadge";
import { FuturisticNewsFeed } from "./FuturisticNewsFeed";
import { DataStreamsTable } from "./DataStreamsTable";
import { AIVerificationNode } from "./AIVerificationNode";
import { CandidateResultsGrid } from "./CandidateResultsGrid";
import { LiveTicker } from "./LiveTicker";
import { DataVelocityHub } from "./DataVelocityHub";
import { Shield, Activity } from "lucide-react";

export function TallyDashboard() {
  const [level] = useState<
    "national" | "county" | "constituency" | "ward"
  >("national");
  const [locationName] = useState<string>("Kenya");

  const [results, setResults] = useState<CandidateResult[]>([]);
  const [stats, setStats] = useState<TallyStats | null>(null);

  const [loading, setLoading] = useState(true);
  const [showProjections] = useState(false);

  const supabase = useMemo(() => createClient(), []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const resData = await (showProjections && level === "national"
          ? getProjections()
          : getResults(level, locationName));

      setResults(Array.isArray(resData) ? resData : resData.results);
      if (!(Array.isArray(resData)) && resData.stats) setStats(resData.stats);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  }, [level, locationName, showProjections]);

  useEffect(() => {
    fetchData();
    const channel = supabase
      .channel("public:election_results")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "election_results" },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchData, supabase]);

  // Derived stat values
  const totalVotes = results.reduce((acc, c) => acc + (c.votes || 0), 0);
  const stationsReportingPct = stats
    ? ((stats.reporting_stations / stats.total_stations) * 100).toFixed(1)
    : "--";

  return (
    <div className="flex flex-col gap-0 min-h-screen lg:h-screen lg:max-h-[1080px] bg-brand-bg rounded-[48px] border border-white/10 relative overflow-hidden shadow-[0_0_150px_rgba(0,0,0,1)]">
      {/* Live Ticker at the absolute top */}
      <LiveTicker />

      {/* Background HUD Grid & Scanline */}
      <div className="absolute inset-0 pointer-events-none mt-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,128,0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-brand-primary/2 to-transparent" />
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(transparent_0%,rgba(0,255,128,0.05)_50%,transparent_100%)] bg-size-[100%_4px] animate-scanline" />
      </div>

      <div className="p-4 md:p-8 flex flex-col h-full relative z-10 pt-16">
        {/* Top Header Section */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 border-b border-white/5 pb-6 mb-6">
            <div className="flex items-center gap-6">
                {/* Kenya Flag - Premium HUD Styled */}
                <div className="w-14 h-9 border border-white/20 rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.05)] overflow-hidden flex flex-col relative shrink-0 group">
                    <div className="h-[30%] bg-black" />
                    <div className="h-[5%] bg-white" />
                    <div className="h-[30%] bg-kenya-red" />
                    <div className="h-[5%] bg-white" />
                    <div className="h-[30%] bg-kenya-green" />
                </div>

                <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                        {/* ELEC_SYNC_001_ACTIVE */}
                        <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.4em]">ELEC_SYNC_001_ACTIVE</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-white uppercase holographic-glow flex items-center gap-3">
                        TALLYING_CENTRE <span className="text-white/20 text-xl font-thin">{" // "}</span> <span className="text-brand-primary">HUD_V2</span>
                    </h2>
                </div>
            </div>

            <div className="flex gap-4 items-center">
               <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3 backdrop-blur-xl">
                  <div className="flex -space-x-2">
                     {[1,2,3].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full border border-black bg-brand-surface flex items-center justify-center">
                           <Shield className="w-3 h-3 text-brand-primary" />
                        </div>
                     ))}
                  </div>
                  <div className="text-left leading-none">
                     <span className="text-[7px] font-black text-white/30 uppercase block">Trust Rating</span>
                     <span className="text-[10px] font-black text-white">AA+ CERTIFIED</span>
                  </div>
               </div>
               <VerifiedBadge variant="small" />
            </div>
        </div>

        {/* Main Tripartite Layout - Fixed Unified Height */}
        <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
            
            {/* LEFT SIDEBAR: AI Auditor & Feed */}
            <div className="col-span-12 lg:col-span-3 flex flex-col gap-6 h-full min-h-0">
                 <div className="flex-3 min-h-0">
                    <AIVerificationNode />
                 </div>
                
                <div className="flex-2 min-h-0 bg-black/40 backdrop-blur-md border border-white/5 rounded-[32px] p-5 shadow-inner overflow-hidden">
                    <FuturisticNewsFeed />
                </div>
            </div>

            {/* CENTER: Main Results Grid & Stats */}
            <div className="col-span-12 lg:col-span-6 flex flex-col gap-6 h-full min-h-0">
                {/* 1. Candidate Results Grid */}
                <div className="flex-4 min-h-0">
                    <div className="flex items-center justify-between mb-4 px-2">
                        <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em] flex items-center gap-2">
                            <Activity className="w-4 h-4 text-brand-primary" />
                            Live_Candidate_Telemetry
                        </h3>
                        {loading && <span className="text-[8px] font-black text-brand-primary animate-pulse tracking-widest uppercase">Fetching_Data...</span>}
                    </div>
                    <div className="h-full overflow-y-auto no-scrollbar">
                        <CandidateResultsGrid candidates={results} />
                    </div>
                </div>

                {/* 2. Secondary stats */}
                <div className="flex-[1.8] bg-white/2 border border-white/10 rounded-[40px] p-6 relative overflow-hidden group min-h-0">
                    <div className="grid grid-cols-2 gap-6 h-full relative z-10">
                        <div className="p-5 bg-white/3 border border-white/5 rounded-[32px] group/stat hover:border-brand-primary/20 transition-all flex flex-col justify-center">
                            <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-2 flex justify-between">
                                <span>Total_Votes</span>
                                <span className="text-brand-primary">SYNC_OK</span>
                            </div>
                            <div className="text-3xl font-black text-white tracking-tighter">
                                {totalVotes.toLocaleString()}
                            </div>
                        </div>
                        <div className="p-5 bg-white/3 border border-white/5 rounded-[32px] group/stat hover:border-kenya-green/20 transition-all flex flex-col justify-center">
                            <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-2 flex justify-between">
                                <span>Station_Sync</span>
                                <span className="text-kenya-green">LIVE</span>
                            </div>
                            <div className="text-3xl font-black text-kenya-green tracking-tighter">
                                {stationsReportingPct}%
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDEBAR: Data Streams & Velocity */}
            <div className="col-span-12 lg:col-span-3 flex flex-col gap-6 h-full min-h-0">
                <div className="flex-[1.5]">
                    <DataVelocityHub />
                </div>
                
                <div className="flex-[2.5] min-h-0 bg-black/40 backdrop-blur-md border border-white/5 rounded-[32px] p-6 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-kenya-red animate-ping" />
                    </div>
                    <DataStreamsTable />
                </div>

                <div className="p-6 bg-linear-to-br from-brand-primary/10 to-transparent border border-brand-primary/20 rounded-[40px] shadow-2xl relative group shrink-0">
                   <VerifiedBadge variant="large" />
                </div>
            </div>
        </div>
      </div>

      <Toaster position="top-right" theme="dark" />
    </div>
  );
}
