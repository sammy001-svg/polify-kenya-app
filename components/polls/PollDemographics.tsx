"use client";

import React from "react";

export function PollDemographics() {
  return (
    <div className="w-full h-full flex flex-col bg-transparent overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2 px-6 pt-3">
        <div className="w-6 h-px bg-white/20"></div>
        <h3 className="text-white font-bold text-base md:text-lg uppercase tracking-tight">
          Poll Demographics
        </h3>
        <div className="flex-1 h-px bg-white/10"></div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 px-6 pb-4">
        
        {/* By Age */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-px bg-white/30"></div>
            <h4 className="text-white/60 font-black text-[10px] uppercase tracking-tighter">By Age</h4>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { label: "18-24", value: 25, labelColor: "bg-yellow-500", barColor: "bg-green-600" },
              { label: "25-39", value: 40, labelColor: "bg-orange-600", barColor: "bg-green-600" },
              { label: "40-54", value: 20, labelColor: "bg-orange-600", barColor: "bg-white/20" },
              { label: "55+", value: 15, labelColor: "bg-green-700", barColor: "bg-white/20" },
            ].map((age, idx) => (
              <div key={idx} className="flex h-7 shadow-sm rounded-sm overflow-hidden border border-white/5 bg-black/10">
                <div className={`${age.labelColor} w-14 shrink-0 flex items-center justify-center text-white font-black text-[9px] shadow-inner`}>
                  {age.label}
                </div>
                <div 
                  className={`flex items-center pl-2 text-white font-black text-[10px] ${age.barColor} relative z-10 transition-all duration-1000`}
                  style={{ width: `${age.value}%`, minWidth: '30px' }}
                >
                  {age.value}%
                </div>
                <div className="flex-1 bg-white/5 shadow-inner"></div>
              </div>
            ))}
          </div>
        </div>

        {/* By Gender and Location Right Column */}
        <div className="flex flex-col justify-between gap-4">
          {/* By Gender */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-px bg-white/30"></div>
              <h4 className="text-white/60 font-black text-[10px] uppercase tracking-tighter">By Gender</h4>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>
            <div className="flex h-7 w-full shadow-sm rounded-sm overflow-hidden border border-white/5 bg-black/10">
               <div className="flex items-center px-4 text-white font-black text-[10px] bg-blue-600 w-[52%] justify-between z-10">
                 <span>Male</span>
                 <span>52%</span>
               </div>
               <div className="flex items-center px-4 text-white/60 font-black text-[10px] bg-white/10 flex-1 justify-between shadow-inner">
                 <span>Female</span>
                 <span>48%</span>
               </div>
            </div>
          </div>

          {/* By Location */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-px bg-white/30"></div>
              <h4 className="text-white/60 font-black text-[10px] uppercase tracking-tighter">By Location</h4>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex h-7 w-full shadow-sm rounded-sm overflow-hidden border border-white/5 bg-black/10">
                 <div className="flex items-center px-4 text-white font-black text-[10px] bg-green-700 w-[55%] justify-between z-10">
                   <span>Urban</span>
                   <span>55%</span>
                 </div>
                 <div className="flex items-center px-4 text-white font-black text-[10px] bg-red-600 flex-1 justify-between shadow-inner">
                   <span>Rural</span>
                   <span>45%</span>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                 <div className="flex flex-col gap-0.5">
                    <div className="h-5 bg-blue-700 flex items-center px-2 justify-between text-white font-black text-[8px] uppercase">
                       <span>Urban</span>
                       <span>55%</span>
                    </div>
                    <div className="h-0.5 w-full bg-yellow-500 opacity-60"></div>
                 </div>
                 <div className="flex flex-col gap-0.5">
                    <div className="h-5 bg-red-700 flex items-center px-2 justify-between text-white font-black text-[8px] uppercase">
                       <span>Rural</span>
                       <span>45%</span>
                    </div>
                    <div className="h-0.5 w-full bg-orange-500 opacity-60"></div>
                 </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

