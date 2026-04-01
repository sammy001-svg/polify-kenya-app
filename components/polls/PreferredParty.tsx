"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import dynamic from "next/dynamic";

const PollHeatMap = dynamic(() => import("./PollHeatMap").then(mod => mod.PollHeatMap), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-black/20 animate-pulse border border-white/5 rounded-2xl" />
});

const PARTY_DATA = [
  { name: "UDA", value: 37, color: "#f1c40f" },
  { name: "ODM", value: 30, color: "#f39c12" },
  { name: "Wiper", value: 8, color: "#2ecc71" },
  { name: "Jubilee", value: 5, color: "#e74c3c" },
  { name: "ANC", value: 4, color: "#27ae60" },
  { name: "FORD-K", value: 3, color: "#16a085" },
  { name: "KANU", value: 2, color: "#c0392b" },
  { name: "DAP-K", value: 2, color: "#3498db" },
  { name: "TSP", value: 1, color: "#2980b9" },
  { name: "Safina", value: 1, color: "#8e44ad" },
  { name: "Agano", value: 0.5, color: "#2c3e50" },
  { name: "Roots", value: 0.5, color: "#27ae60" },
  { name: "MCCP", value: 1, color: "#d35400" },
  { name: "PNU", value: 1, color: "#bdc3c7" },
  { name: "Narc-K", value: 1, color: "#e67e22" },
  { name: "PAA", value: 0.5, color: "#1abc9c" },
  { name: "Democracy for the Citizens Party", value: 0.5, color: "#39FF14" },
  { name: "UDP", value: 0.5, color: "#34495e" },
  { name: "DP", value: 0.5, color: "#7f8c8d" },
  { name: "Mazingira", value: 1, color: "#27ae60" },
];

export function PreferredParty() {
  return (
    <div className="w-full h-full flex flex-col bg-transparent overflow-hidden min-h-[600px] md:min-h-[700px]">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2 px-6 pt-3">
        <div className="w-6 h-px bg-white/20"></div>
        <h3 className="text-white font-bold text-base md:text-lg uppercase tracking-tight">
          Political Party Preferences: National Overview
        </h3>
        <div className="flex-1 h-px bg-white/10"></div>
      </div>

      <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-4 px-6 pb-4">
        {/* Donut Chart and Scrollable Legend */}
        <div className="xl:col-span-4 flex flex-col bg-black/10 rounded-2xl p-4 border border-white/5 overflow-hidden">
          <div className="w-full h-[140px] shrink-0 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PARTY_DATA}
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={1}
                  dataKey="value"
                  stroke="none"
                >
                  {PARTY_DATA.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      className="drop-shadow-lg"
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md shadow-inner flex flex-col items-center justify-center border border-white/10">
                    <span className="text-[8px] text-white/40 font-bold uppercase leading-none">Parties</span>
                    <span className="text-sm font-black text-white">{PARTY_DATA.length}</span>
                </div>
             </div>
          </div>

          {/* New Scrollable Grid Legend */}
          <div className="flex-1 mt-4 overflow-y-auto no-scrollbar pr-1">
             <div className="grid grid-cols-1 gap-1.5">
                {PARTY_DATA.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white/5 p-2 rounded border border-white/5 transition-colors hover:bg-white/10">
                    <div 
                      className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.1)]" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div className="flex flex-col">
                       <span className="text-[10px] font-black text-white uppercase tracking-wider leading-none">
                         {item.name}
                       </span>
                       <span className="text-[8px] font-bold text-white/30 uppercase mt-0.5">Registered Party</span>
                    </div>
                    <span className="ml-auto text-[10px] font-mono text-yellow-500 font-bold">
                      {item.value}%
                    </span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Dynamic Heatmap */}
        <div className="xl:col-span-8 h-full">
           <PollHeatMap />
        </div>
      </div>
    </div>
  );
}
