"use client";

import React from "react";
import Image from "next/image";

const CANDIDATES = [
  {
    name: "William Ruto",
    percentage: 42,
    color: "from-yellow-400 to-yellow-500",
    image: "/images/candidates/ruto.png",
  },
  {
    name: "Raila Odinga",
    percentage: 35,
    color: "from-blue-500 to-blue-600",
    image: "/images/candidates/raila.png",
  },
  {
    name: "Kalonzo Musyoka",
    percentage: 8,
    color: "from-green-500 to-green-600",
    image: "/images/candidates/kalonzo.png",
  },
  {
    name: "Martha Karua",
    percentage: 7,
    color: "from-red-500 to-red-600",
    image: "/images/candidates/martha.png",
  },
];

export function PresidentialPoll() {
  return (
    <div className="w-full h-full flex flex-col bg-transparent overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2 px-6 pt-3">
        <div className="w-6 h-px bg-white/20"></div>
        <h3 className="text-white font-bold text-base md:text-lg shrink-0 uppercase tracking-tight">
          Presidential Poll: 2024
        </h3>
        <div className="flex-1 h-px bg-white/10"></div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 pb-4 gap-2">
        {CANDIDATES.map((candidate, idx) => (
          <div key={idx} className="flex items-center gap-3 group">
            {/* Candidate Avatar */}
            <div className="relative w-12 h-12 md:w-14 md:h-14 shrink-0">
               <div className="absolute inset-0 rounded-full border-2 border-white/20 overflow-hidden bg-white/10 shadow-lg z-10 transition-transform group-hover:scale-105">
                 <Image
                   src={candidate.image}
                   alt={candidate.name}
                   fill
                   className="object-cover"
                 />
               </div>
               <div className={`absolute -inset-1 rounded-full bg-linear-to-tr ${candidate.color} opacity-40 blur-[2px]`}></div>
            </div>

            {/* Candidate Bar Section */}
            <div className="flex-1 space-y-0.5">
              <div className="flex justify-between items-end">
                <span className="font-extrabold text-white text-xs md:text-sm tracking-tight uppercase">
                  {candidate.name}
                </span>
              </div>
              <div className="relative h-7 md:h-8 bg-black/20 border border-white/10 shadow-inner overflow-hidden">
                <div 
                  className={`h-full bg-linear-to-r ${candidate.color} shadow-[2px_0_10px_rgba(0,0,0,0.3)] relative overflow-hidden`}
                  style={{ width: `${candidate.percentage}%` }}
                >
                  <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
                </div>
                <div 
                  className="absolute top-1/2 -translate-y-1/2 right-3 text-white font-black text-sm md:text-base drop-shadow-md"
                >
                  {candidate.percentage}%
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Undecided Footer */}
        <div className="flex justify-end mt-1">
           <div className="text-white/40 font-bold text-[10px] uppercase tracking-widest border-t border-white/10 pt-1 px-3 italic">
             Undecided: 8%
           </div>
        </div>
      </div>
    </div>
  );
}
