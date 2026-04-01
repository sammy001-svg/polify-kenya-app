"use client";

import React from "react";
import { PresidentialPoll } from "@/components/polls/PresidentialPoll";
import { PreferredParty } from "@/components/polls/PreferredParty";
import { PollTrends } from "@/components/polls/PollTrends";
import { VoterTurnout } from "@/components/polls/VoterTurnout";
import { PollDemographics } from "@/components/polls/PollDemographics";

export default function OpinionPollsPage() {
  return (
    <div className="min-h-screen w-full bg-[#005043] flex flex-col font-sans">
      
      {/* Full-Width Transparent Header */}
      <div className="shrink-0 border-l-30 border-l-[#d2312b] border-r-30 border-r-[#d2312b] relative bg-black/20">
        <h1 className="text-center text-xl md:text-4xl font-black tracking-tight py-3 md:py-5 font-serif text-white drop-shadow-xl relative z-10 uppercase">
          Kenya Opinion Polls Dashboard
        </h1>
      </div>

      {/* Main Content Area filling remaining height */}
      <div className="flex-1 flex flex-col lg:flex-row w-full divide-y lg:divide-y-0 lg:divide-x divide-white/10">
        
        {/* Left Column */}
        <div className="flex flex-col w-full lg:w-[48%] divide-y divide-white/5 divide-dashed">
          <div className="flex-none min-h-[300px]">
            <PresidentialPoll />
          </div>
          <div className="flex-none min-h-[250px]">
            <PollTrends />
          </div>
          <div className="flex-none min-h-[180px]">
            <VoterTurnout />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col w-full lg:w-[52%] divide-y divide-white/5 divide-dashed">
          <div className="flex-1 min-h-[600px]">
            <PreferredParty />
          </div>
          <div className="flex-none min-h-[200px]">
            <PollDemographics />
          </div>
        </div>

      </div>

      {/* Transparent Footer */}
      <div className="bg-black/30 p-2 border-t border-white/10 flex justify-between items-center text-[10px] font-bold text-gray-300 uppercase tracking-widest px-8 shrink-0">
         <div className="flex items-center gap-4">
           <span>Source: PoliFy Intelligence</span>
           <span className="w-px h-3 bg-white/20"></span>
           <span>April 2024 Report</span>
         </div>
         <span className="text-white/60">Restricted Intellectual Property — 2024</span>
      </div>
    </div>
  );
}
