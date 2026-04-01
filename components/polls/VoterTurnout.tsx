"use client";

import React from "react";

export function VoterTurnout() {
  return (
    <div className="w-full h-full flex flex-col bg-transparent overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2 px-6 pt-3">
        <div className="w-6 h-px bg-white/20"></div>
        <h3 className="text-white font-bold text-base md:text-lg uppercase tracking-tight">
          Voter Turnout Intent
        </h3>
        <div className="flex-1 h-px bg-white/10"></div>
      </div>

      <div className="flex-1 flex flex-row items-center justify-between px-6 pb-2 gap-4">
        {/* Donut Progress Rings */}
        <div className="flex gap-6">
          <div className="flex flex-col items-center gap-1">
            <div className="relative w-20 h-20 md:w-24 md:h-24">
              <svg className="w-full h-full -rotate-90">
                <circle 
                  cx="50%" cy="50%" r="40%" 
                  className="stroke-white/5 fill-none" 
                  strokeWidth="8"
                />
                <circle 
                  cx="50%" cy="50%" r="40%" 
                  className="stroke-green-500 fill-none transition-all duration-1000" 
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 * (1 - 0.82)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-lg font-black text-white">82%</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="relative w-20 h-20 md:w-24 md:h-24">
              <svg className="w-full h-full -rotate-90">
                <circle 
                  cx="50%" cy="50%" r="40%" 
                  className="stroke-white/5 fill-none" 
                  strokeWidth="8"
                />
                <circle 
                  cx="50%" cy="50%" r="40%" 
                  className="stroke-gray-500 fill-none transition-all duration-1000" 
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 * (1 - 0.18)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-lg font-black text-white/60">18%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Issue Bars */}
        <div className="flex-1 flex flex-col gap-2 max-w-[200px]">
          {[
            { label: "Cost of Living", value: 34, color: "bg-red-500" },
            { label: "Corruption", value: 22, color: "bg-blue-500" },
            { label: "Unemployment", value: 18, color: "bg-yellow-500" },
          ].map((issue, idx) => (
            <div key={idx} className="relative h-6 bg-black/20 overflow-hidden border border-white/5">
              <div 
                className={`h-full ${issue.color} shadow-sm overflow-hidden`}
                style={{ width: `${issue.value * 2}%` }}
              >
                 <div className="absolute inset-0 flex items-center justify-between px-2 text-[8px] font-black uppercase text-white">
                    <span className="drop-shadow-md">{issue.label}</span>
                    <span className="drop-shadow-md">{issue.value}%</span>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

