"use client";

/* cspell:ignore Scanlines */

import { useEffect, useState, useMemo } from "react";
import { Toaster } from "sonner";
import dynamic from "next/dynamic";
import { SummaryHeader } from "./SummaryHeader";
import { DetailedResultCard } from "./DetailedResultCard";
import { DataProcessingNodeV2 } from "./DataProcessingNodeV2";
import { AIAlertsPane } from "./AIAlertsPane";
import { AuditLogPane } from "./AuditLogPane";
import { VerifiedBadge } from "./VerifiedBadge";
import { Heart, Cpu, Sparkles, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";


// Lazy-load heavy visualization components
const ElectionHeatMap = dynamic(() => import("./ElectionHeatMap").then(mod => mod.ElectionHeatMap), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#0A1612]/40 animate-pulse border border-[#18362A]" />
});

const ResultProjectionsNode = dynamic(() => import("./ResultProjectionsNode").then(mod => mod.ResultProjectionsNode), { ssr: false });

interface Candidate {
  name: string;
  votes: number;
  photo?: string;
  party_color: string;
  party_symbol?: string;
}

export function TallyDashboard() {
  const [presidential, setPresidential] = useState<Candidate[]>([
    { name: "Candidate A", votes: 1, photo: "/images/candidates/william_ruto.png", party_color: "bg-yellow-400", party_symbol: "/parties/uda-wheelbarrow.png" },
    { name: "Candidate B", votes: 1, photo: "/images/candidates/raila_odinga.png", party_color: "bg-orange-500", party_symbol: "/parties/odm-orange.png" },
    { name: "Candidate C", votes: 0, photo: "/images/candidates/david_mwaure.png", party_color: "bg-blue-900", party_symbol: "/parties/agano-lamp.png" },
    { name: "Candidate D", votes: 0, photo: "/images/candidates/george_wajackoyah.png", party_color: "bg-green-500", party_symbol: "/parties/roots-leaf.png" }
  ]);

  const [parliamentary, setParliamentary] = useState<Candidate[]>([
    { name: "Candidate M", votes: 1, photo: "/images/candidates/p1.png", party_color: "bg-yellow-400", party_symbol: "/parties/uda-wheelbarrow.png" },
    { name: "Candidate N", votes: 1, photo: "/images/candidates/p2.png", party_color: "bg-orange-500", party_symbol: "/parties/odm-orange.png" },
    /* cspell:disable-next-line */
    { name: "M. Ochieng", votes: 0, photo: "/images/candidates/p3.png", party_color: "bg-blue-400", party_symbol: "/parties/wiper-umbrella.png" },
    /* cspell:disable-next-line */
    { name: "S. Kamau", votes: 0, photo: "/images/candidates/p4.png", party_color: "bg-red-600", party_symbol: "/parties/jubilee-dove.png" }
  ]);

  const [governor, setGovernor] = useState<Candidate[]>([
    { name: "Candidate X", votes: 1, photo: "/images/candidates/p1.png", party_color: "bg-yellow-400", party_symbol: "/parties/uda-wheelbarrow.png" },
    { name: "Candidate Y", votes: 1, photo: "/images/candidates/p2.png", party_color: "bg-orange-500", party_symbol: "/parties/odm-orange.png" },
    { name: "Candidate Z", votes: 0, photo: "/images/candidates/p3.png", party_color: "bg-blue-400", party_symbol: "/parties/wiper-umbrella.png" }
  ]);

  const [senator, setSenator] = useState<Candidate[]>([
    { name: "Candidate P", votes: 1, photo: "/images/candidates/p4.png", party_color: "bg-yellow-400", party_symbol: "/parties/uda-wheelbarrow.png" },
    { name: "Candidate Q", votes: 1, photo: "/images/candidates/p1.png", party_color: "bg-orange-500", party_symbol: "/parties/odm-orange.png" }
  ]);

  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  useEffect(() => {
    // Show support modal after small delay
    const timer = setTimeout(() => {
      setIsSupportModalOpen(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Aggressive Real-Time Tally Simulation (Sprinting from 0)
  useEffect(() => {
    const interval = setInterval(() => {
      // Pick multiple categories to surge simultaneously for more "action"
      const surgeCount = Math.floor(Math.random() * 2) + 1; // 1 or 2 categories per tick
      
      for(let i = 0; i < surgeCount; i++) {
        const categorySelector = Math.random();
        
        if (categorySelector > 0.7) { // Presidential
          setPresidential(prev => {
            const next = [...prev];
            const idx = Math.floor(Math.random() * next.length);
            // Massive spikes to create position swaps
            const boost = Math.floor(Math.random() * 15000) + 1000;
            next[idx].votes += boost;
            return next;
          });
        } else if (categorySelector > 0.45) { // Parliamentary
          setParliamentary(prev => {
            const next = [...prev];
            const idx = Math.floor(Math.random() * next.length);
            next[idx].votes += Math.floor(Math.random() * 10000) + 500;
            return next;
          });
        } else if (categorySelector > 0.2) { // Governor
          setGovernor(prev => {
            const next = [...prev];
            const idx = Math.floor(Math.random() * next.length);
            next[idx].votes += Math.floor(Math.random() * 8000) + 300;
            return next;
          });
        } else { // Senator
          setSenator(prev => {
            const next = [...prev];
            const idx = Math.floor(Math.random() * next.length);
            next[idx].votes += Math.floor(Math.random() * 5000) + 100;
            return next;
          });
        }
      }
    }, 400); // Super fast 400ms "Surge" interval

    return () => clearInterval(interval);
  }, []);

  const sortedPresidential = useMemo(() => {
    const total = presidential.reduce((acc, c) => acc + c.votes, 0);
    return [...presidential]
      .sort((a, b) => b.votes - a.votes)
      .map(c => ({
        ...c,
        votes: c.votes.toLocaleString(),
        pct: total > 0 ? ((c.votes / total) * 100).toFixed(1) + "%" : "0%"
      }));
  }, [presidential]);

  const sortedParliamentary = useMemo(() => {
    const total = parliamentary.reduce((acc, c) => acc + c.votes, 0);
    return [...parliamentary]
      .sort((a, b) => b.votes - a.votes)
      .map(c => ({
        ...c,
        votes: c.votes.toLocaleString(),
        pct: total > 0 ? ((c.votes / total) * 100).toFixed(1) + "%" : "0%"
      }));
  }, [parliamentary]);

  const sortedGovernor = useMemo(() => {
    const total = governor.reduce((acc, c) => acc + c.votes, 0);
    return [...governor]
      .sort((a, b) => b.votes - a.votes)
      .map(c => ({
        ...c,
        votes: c.votes.toLocaleString(),
        pct: total > 0 ? ((c.votes / total) * 100).toFixed(1) + "%" : "0%"
      }));
  }, [governor]);

  const sortedSenator = useMemo(() => {
    const total = senator.reduce((acc, c) => acc + c.votes, 0);
    return [...senator]
      .sort((a, b) => b.votes - a.votes)
      .map(c => ({
        ...c,
        votes: c.votes.toLocaleString(),
        pct: total > 0 ? ((c.votes / total) * 100).toFixed(1) + "%" : "0%"
      }));
  }, [senator]);

  return (
    <div className="tally-hub-overhaul flex flex-col gap-0 min-h-screen bg-transparent relative overflow-hidden selection:bg-brand-primary/30 selection:text-white">
      <style dangerouslySetInnerHTML={{ __html: `
        .main-content-container:has(.tally-hub-overhaul) {
          max-width: none !important;
          padding: 0 !important;
          margin: 0 !important;
          width: 100% !important;
        }
      `}} />
      
      <SummaryHeader />

      {/* Global HUD Layer - Toned down for new image background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-size-[60px_60px] mask-[radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_40%,rgba(0,0,0,0.02),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(0,0,0,0.01),rgba(0,0,0,0.01),rgba(0,0,0,0.01))] bg-size-[100%_4px,3px_100%]" />
      </div>

      <div className="flex-1 p-4 md:p-6 flex flex-col relative z-10 w-full overflow-x-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 md:gap-5 flex-1 w-full">
            
            {/* LEFT COLUMN */}
            <div className="md:col-span-1 xl:col-span-3 flex flex-col gap-4 md:gap-5 h-full order-2 xl:order-1">
                <DetailedResultCard 
                   title="Presidential Results"
                   reporting="458 / 600"
                   candidates={sortedPresidential}
                   /* cspell:disable */
                   form34As={[
                     { id: "34A-ELD-08", stationName: "Eldoret Town Hall", county: "Uasin Gishu", constituency: "Kesses", timestamp: "31 mins ago" },
                     { id: "34A-NKR-22", stationName: "Nakuru High School", county: "Nakuru", constituency: "Nakuru Town East", timestamp: "45 mins ago" },
                     { id: "34A-MAC-03", stationName: "Machakos Boys", county: "Machakos", constituency: "Machakos Town", timestamp: "1 hr ago" },
                     { id: "34A-MER-11", stationName: "Meru Primary", county: "Meru", constituency: "Imenti North", timestamp: "1 hr 12 mins ago" },
                     { id: "34A-KAK-07", stationName: "Bukhungu Stadium", county: "Kakamega", constituency: "Lurambi", timestamp: "2 hrs ago" },
                     { id: "34A-NYR-14", stationName: "Ruring'u Stadium", county: "Nyeri", constituency: "Nyeri Town", timestamp: "2 hrs 30 mins ago" },
                     { id: "34A-GAR-02", stationName: "Garissa Primary", county: "Garissa", constituency: "Garissa Township", timestamp: "3 hrs ago" },
                   ]}
                />
                <DetailedResultCard 
                   title="Parliamentary Results"
                   reporting="328 / 600"
                   showDropdown={true}
                   dropdownType="constituency"
                   candidates={sortedParliamentary}
                />
                <div className="grow">
                    <DataProcessingNodeV2 />
                </div>
            </div>

            {/* CENTER COLUMN */}
            <div className="md:col-span-2 xl:col-span-6 flex flex-col gap-4 md:gap-6 h-full pb-10 md:pb-20 order-1 xl:order-2"> 
                <div className="flex-1 w-full min-h-[350px] md:min-h-[450px]">
                   <ElectionHeatMap />
                </div>
                <div className="h-auto md:h-[180px] w-full shrink-0">
                   <AIAlertsPane />
                </div>
                <div className="h-auto md:h-[160px] w-full shrink-0">
                   <ResultProjectionsNode />
                </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="md:col-span-1 xl:col-span-3 flex flex-col gap-4 md:gap-5 h-full order-3">
                <DetailedResultCard 
                   title="Governor Results"
                   reporting="875 / 1200"
                   showDropdown={true}
                   dropdownType="county"
                   candidates={sortedGovernor}
                />
                <DetailedResultCard 
                   title="Senator / Women Rep Results"
                   reporting="210 / 300"
                   showDropdown={true}
                   dropdownType="county"
                   roleOptions={["SENATOR", "WOMEN REP"]}
                   candidates={sortedSenator}
                />
                <div className="grow">
                   <AuditLogPane />
                </div>
                <div className="p-4 bg-linear-to-br from-brand-primary/10 to-transparent border border-brand-primary/20 rounded-2xl shrink-0 backdrop-blur-md">
                   <VerifiedBadge variant="small" />
                </div>
            </div>
        </div>
      </div>

      <AnimatePresence>
        <Dialog open={isSupportModalOpen} onOpenChange={setIsSupportModalOpen}>
          <DialogContent className="max-w-md bg-[#06120E]/95 border-[#00FF8C]/30 p-0 overflow-hidden shadow-[0_0_50px_rgba(0,255,140,0.2)] rounded-3xl backdrop-blur-2xl">
            <div className="relative">
              {/* Futuristic Accent Line */}
              <div className="h-1.5 w-full bg-[#00FF8C]/10 relative overflow-hidden">
                <motion.div 
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="absolute top-0 left-0 w-1/3 h-full bg-[#00FF8C] shadow-[0_0_15px_#00FF8C]"
                />
              </div>

              <div className="p-8 space-y-8">
                <div className="flex flex-col items-center text-center space-y-6">
                  {/* Icon Cluster */}
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-[#00FF8C]/5 border border-[#00FF8C]/20 flex items-center justify-center relative z-10">
                        <Cpu className="w-10 h-10 text-[#00FF8C] animate-pulse" />
                    </div>
                    <motion.div 
                       animate={{ 
                         scale: [1, 1.2, 1],
                         opacity: [0.3, 0.6, 0.3]
                       }}
                       transition={{ repeat: Infinity, duration: 2 }}
                       className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-[#00FF8C]/10 border border-[#00FF8C]/20 flex items-center justify-center"
                    >
                       <Heart className="w-5 h-5 text-red-500 fill-red-500/20" />
                    </motion.div>
                    <div className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full bg-[#00FF8C]/10 border border-[#00FF8C]/20 flex items-center justify-center animate-bounce">
                       <Sparkles className="w-4 h-4 text-yellow-400" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none">
                      Support Polify AI Core
                    </h3>
                    <p className="text-sm text-[#00FF8C]/80 font-bold uppercase tracking-widest leading-relaxed">
                      Support our AIs as they continue to prepare to tally results for all Kenyans
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={() => setIsSupportModalOpen(false)}
                    className="w-full h-16 bg-[#00FF8C] text-black font-black uppercase tracking-[0.3em] text-xs hover:bg-white transition-all shadow-[0_0_30px_rgba(0,255,140,0.3)] flex items-center justify-center gap-3 group rounded-xl"
                  >
                    Initiate Support <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button 
                    onClick={() => setIsSupportModalOpen(false)}
                    className="w-full py-4 text-[9px] font-black text-white/30 hover:text-[#00FF8C] uppercase tracking-[0.4em] transition-colors"
                  >
                    Dismiss Core Access
                  </button>
                </div>

                {/* Telemetry Footer */}
                <div className="flex justify-between items-center text-[7px] font-mono text-[#00FF8C]/30 tracking-widest">
                   <span>NODE_AI_SUPPORT_SECURE</span>
                   <div className="flex gap-1 items-center">
                      <div className="w-1 h-1 bg-[#00FF8C] rounded-full animate-ping" />
                      <span>UPLINK_READY</span>
                   </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </AnimatePresence>

      <Toaster position="top-right" theme="dark" closeButton richColors />
    </div>
  );
}
