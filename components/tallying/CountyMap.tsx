"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { COUNTY_PATHS } from "@/lib/county-paths";
import { RegionalBreakdownData } from "@/actions/tallying";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CountyMapProps {
  data: RegionalBreakdownData[];
  onRegionSelect?: (region: string) => void;
}

export function CountyMap({ data, onRegionSelect }: CountyMapProps) {
  const [hoveredCounty, setHoveredCounty] = useState<string | null>(null);

  // Map data for lookup by name
  const dataMap = new Map(data.map((d) => [d.location.toLowerCase(), d]));

  // Helper to get party color with opacity
  const getCountyStyle = (countyName: string) => {
    const regionData = dataMap.get(countyName.toLowerCase());
    if (!regionData)
      return {
        fill: "rgba(255, 255, 255, 0.05)",
        stroke: "rgba(255, 255, 255, 0.1)",
      };

    // Extract color from Tailwind class (rough mapping)
    let baseColor = "rgba(100, 100, 100, 0.2)";
    if (regionData.color.includes("yellow"))
      baseColor = "rgba(250, 204, 21, 0.6)";
    if (regionData.color.includes("orange"))
      baseColor = "rgba(249, 115, 22, 0.6)";
    if (regionData.color.includes("blue"))
      baseColor = "rgba(96, 165, 250, 0.6)";
    if (regionData.color.includes("green"))
      baseColor = "rgba(34, 197, 94, 0.6)";

    return {
      fill: baseColor,
      stroke: "rgba(255, 255, 255, 0.3)",
    };
  };

  return (
    <div className="card-premium p-4 md:p-8 flex flex-col items-center relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-kenya-red/5 to-transparent pointer-events-none" />

      <div className="w-full flex justify-between items-start mb-6 md:mb-8 z-10">
        <div>
          <h3 className="text-lg md:text-2xl font-black text-white flex items-center gap-2 md:gap-3 tracking-tighter">
            <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-kenya-green shadow-[0_0_15px_rgba(34,197,94,1)] animate-pulse" />
            GEOGRAPHIC DISTRIBUTION
          </h3>
          <p className="text-[10px] text-white/50 font-mono mt-1 uppercase tracking-widest">
            Real-time tally data
          </p>
        </div>

        {/* Stats Badge */}
        <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl flex gap-3 items-center">
          <div className="flex flex-col">
            <span className="text-[8px] md:text-[10px] text-white/40 font-black uppercase tracking-widest leading-none">
              Processed
            </span>
            <span className="text-xs md:text-sm font-black text-white">
              47/47
            </span>
          </div>
        </div>
      </div>

      <div className="relative w-full aspect-[4/5] max-w-[600px] flex justify-center items-center">
        <svg
          viewBox="0 0 600 650"
          width="100%"
          height="100%"
          className="filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          style={{ transform: "translate3d(0,0,0)" }}
        >
          <TooltipProvider delayDuration={0}>
            {COUNTY_PATHS.map((county) => {
              const regionData = dataMap.get(county.name.toLowerCase());
              const hasData = !!regionData;
              const isHovered = hoveredCounty === county.id;
              const style = getCountyStyle(county.name);

              return (
                <Tooltip key={county.id}>
                  <TooltipTrigger asChild>
                    <motion.path
                      d={county.path}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        fill: isHovered
                          ? "rgba(255, 255, 255, 0.2)"
                          : style.fill,
                        stroke: isHovered
                          ? "rgba(255, 255, 255, 0.8)"
                          : style.stroke,
                        strokeWidth: isHovered ? 2 : 1,
                      }}
                      transition={{ duration: 0.4 }}
                      onMouseEnter={() => setHoveredCounty(county.id)}
                      onMouseLeave={() => setHoveredCounty(null)}
                      onClick={() => onRegionSelect?.(county.name)}
                      className={`
                                                cursor-pointer transition-colors duration-200
                                                ${hasData ? "hover:brightness-125" : "grayscale-[0.5]"}
                                            `}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="bg-black/95 border border-white/20 text-white p-4 shadow-[0_0_40px_rgba(0,0,0,0.7)] backdrop-blur-2xl rounded-xl min-w-[200px]"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <h4 className="font-black text-lg uppercase tracking-tight">
                          {county.name}
                        </h4>
                        <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-white/60">
                          {county.id}
                        </span>
                      </div>

                      {regionData ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">
                                Leading
                              </p>
                              <p className="font-bold text-white leading-tight">
                                {regionData.winner}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">
                                Party
                              </p>
                              <p className="font-bold text-kenya-gold underline decoration-kenya-red/50 leading-tight">
                                {regionData.party}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between items-end text-[10px] font-mono">
                              <span className="text-white/60">
                                processed votes
                              </span>
                              <span className="text-white font-bold">
                                {regionData.votes.toLocaleString()}
                              </span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "65%" }}
                                className={`h-full ${regionData.color} shadow-[0_0_10px_rgba(255,255,255,0.2)]`}
                              />
                            </div>
                          </div>

                          <div className="pt-2 border-t border-white/5 flex items-center justify-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-kenya-green animate-ping" />
                            <span className="text-[9px] font-black text-kenya-green tracking-widest">
                              CLICK TO DRILL-DOWN
                            </span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-white/40 italic py-2">
                          Transmitting polling data...
                        </p>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-12 flex flex-wrap gap-8 justify-center items-center px-6 py-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md">
        {[
          {
            label: "UDA",
            color: "bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]",
          },
          {
            label: "ODM",
            color: "bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]",
          },
          {
            label: "WIPER",
            color: "bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.5)]",
          },
          {
            label: "ROOTS",
            color: "bg-green-600 shadow-[0_0_15_rgba(22,163,74,0.5)]",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 group/item cursor-help"
          >
            <div
              className={`w-4 h-4 ${item.color} rounded-sm transition-transform group-hover/item:scale-125 duration-300`}
            />
            <span className="text-[11px] font-black tracking-widest text-white/60 group-hover/item:text-white transition-colors uppercase">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
