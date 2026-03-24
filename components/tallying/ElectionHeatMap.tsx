"use client";

import { useEffect, useState, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, X, Activity } from "lucide-react";

interface RegionData {
  name: string;
  registered: number;
  voted: number;
  rejected: number;
  menRatio: number; // percentage
  womenRatio: number; // percentage
  topCandidates: { name: string; votes: number; color: string }[];
}

export function ElectionHeatMap() {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [activeRegion, setActiveRegion] = useState<RegionData | null>(null);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Fetch the 3MB SVG on the client side to prevent SSR/bundle bloat
    fetch("/kenyaHigh.svg")
      .then(res => res.text())
      .then(data => {
        setSvgContent(data);
      })
      .catch(err => console.error("Failed to load map SVG:", err));
  }, []);

  const handleMapClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as SVGElement;
    if (target.tagName.toLowerCase() === 'path') {
      const regionName = target.getAttribute('data-name') || target.getAttribute('title');
      if (regionName) {
        
        // Ensure pop-up stays within bounds
        const container = e.currentTarget.getBoundingClientRect();
        let x = e.clientX - container.left;
        let y = e.clientY - container.top;
        
        // Offset so it doesn't cover the mouse
        x += 20;
        y += 20;

        // Prevent overflow based on popup size (approx 260px wide, ~220px tall)
        const popWidth = 260;
        const popHeight = 250;
        
        if (x + popWidth > container.width) {
           x = container.width - popWidth - 10;
        }
        if (y + popHeight > container.height) {
           y = container.height - popHeight - 10;
        }

        setPopupPos({ x, y });

        // Mock deterministic data generation based on name length/chars
        // cspell:disable-next-line
        const rando = regionName.length * 10432;
        // cspell:disable-next-line
        const registered = 100000 + (rando % 400000);
        // cspell:disable-next-line
        const voted = Math.floor(registered * (0.55 + ((rando % 35) / 100)));
        const rejected = Math.floor(voted * 0.02);
        
        // cspell:disable-next-line
        const menRatio = 48 + (rando % 6);
        const womenRatio = 100 - menRatio;
        
        setActiveRegion({
          name: regionName.toUpperCase(),
          registered,
          voted,
          rejected,
          menRatio,
          womenRatio,
          topCandidates: [
            { name: "Candidate X", votes: Math.floor(voted * 0.52), color: "bg-[#00FF8C]" },
            { name: "Candidate Y", votes: Math.floor(voted * 0.45), color: "bg-[#ffcc00]" },
          ]
        });
      }
    } else if (!target.closest('.region-popup')) {
      setActiveRegion(null);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col group">
      {/* 1. ANGLED TITLE TAB */}
      <div className="relative z-20 flex w-full md:w-fit min-w-0 md:min-w-[300px] h-8 bg-[#091813] border-t border-l border-r border-[#18362A] [clip-path:polygon(0_0,calc(100%-10px)_0,100%_100%,0_100%)] md:[clip-path:polygon(0_0,calc(100%-15px)_0,100%_100%,0_100%)]">
         <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00FF8C] shadow-[0_0_8px_#00FF8C]" />
         <div className="absolute inset-0 bg-linear-to-r from-[#00FF8C]/10 to-transparent pointer-events-none" />
         
         <div className="flex items-center gap-3 px-3 w-full">
            <h3 className="text-[10px] md:text-xs font-black text-[#00FF8C] tracking-[0.2em] md:tracking-[0.4em] uppercase truncate">KENYA ELECTION MAP</h3>
         </div>
      </div>

      {/* 2. MAIN CARD BODY (Chamfered) */}
      <div className="relative z-10 -mt-px bg-black border-2 border-[#18362A] p-3 md:p-6 [clip-path:polygon(0_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%)] md:[clip-path:polygon(0_0,100%_0,100%_calc(100%-25px),calc(100%-25px)_100%,0_100%)] shadow-[inset_0_0_40px_rgba(0,0,0,1)] flex-1 flex flex-col items-center justify-center overflow-hidden min-h-[400px] md:min-h-0">
        
        {/* Inner Border Lines */}
        <div className="absolute inset-x-0 top-0 h-px bg-[#00FF8C]/20" />
        <div className="absolute left-0 top-0 bottom-25 w-px bg-[#00FF8C]/10" />

        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,140,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,140,0.05)_1px,transparent_1px)] bg-size-[20px_20px] md:bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]" />
        
        {/* HUD Borders / Corners */}
        <div className="absolute top-4 md:top-6 left-4 md:left-6 w-4 md:w-8 h-4 md:h-8 border-t-2 md:border-t-[3px] border-l-2 md:border-l-[3px] border-[#00FF8C]/40 transition-all opacity-50" />
        <div className="absolute top-4 md:top-6 right-4 md:right-6 w-4 md:w-8 h-4 md:h-8 border-t-2 md:border-t-[3px] border-r-2 md:border-r-[3px] border-[#00FF8C]/40 transition-all opacity-50" />
        
        {/* Coordinate Labels - Hidden on small mobile */}
        <div className="hidden sm:flex absolute top-8 right-12 flex-col items-end gap-1 opacity-60">
           <span className="text-[7px] md:text-[9px] font-mono text-[#00FF8C] tracking-widest uppercase">LAT: 1.2921 N</span>
           <span className="text-[7px] md:text-[9px] font-mono text-[#00FF8C] tracking-widest uppercase">LON: 36.8219 E</span>
        </div>

        {/* Dynamic High-Res Map Container */}
        <div className="relative w-full max-w-[500px] aspect-4/5 z-10 flex items-center justify-center">
          
          {/* Apply CSS to the injected SVG to match HUD style */}
          <style dangerouslySetInnerHTML={{__html: `
            .kenya-map-container svg {
              width: 100%;
              height: 100%;
              filter: drop-shadow(0 0 20px rgba(0,255,140,0.2));
            }
            .kenya-map-container svg path {
              fill: rgba(0, 255, 140, 0.05);
              stroke: rgba(0, 255, 140, 0.4);
              stroke-width: 0.5px;
              transition: all 0.3s ease;
              cursor: pointer;
            }
            .kenya-map-container svg path:hover {
              fill: rgba(0, 255, 140, 0.4);
              stroke: rgba(0, 255, 140, 0.8);
              stroke-width: 1px;
            }
          `}} />

          {svgContent ? (
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1 }}
               className="kenya-map-container w-[90%] h-[90%]"
               dangerouslySetInnerHTML={{ __html: svgContent }} 
               onClick={handleMapClick}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-[#00FF8C]/50 gap-3">
              <div className="w-8 h-8 border-2 border-[#00FF8C]/30 border-t-[#00FF8C] rounded-full animate-spin" />
              <span className="text-[10px] font-mono tracking-widest">LOADING HIGH-RES MAP...</span>
            </div>
          )}

          {/* Radar Scan Effect */}
          <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             className="absolute inset-0 rounded-full border border-dashed border-[#00FF8C]/10 pointer-events-none scale-125"
          />
          <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
             className="absolute inset-0 pointer-events-none"
          >
               <div className="absolute top-[10%] left-1/2 w-px h-[40%] bg-linear-to-b from-[#00FF8C] to-transparent opacity-30 shadow-[0_0_15px_#00FF8C]" />
          </motion.div>
        </div>

        {/* Floating Alert Highlight (Matching the image) */}
        <div className="absolute bottom-12 left-12 flex items-center gap-3 px-4 py-2 bg-[#ff0000]/10 border border-[#ff0000]/30 backdrop-blur-md">
           <MapPin className="w-4 h-4 text-[#ff0000]" />
           <div className="flex flex-col">
              <span className="text-[8px] font-black text-white/40 uppercase tracking-widest leading-none">AI Alert</span>
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">High Turnout: Kisumu</span>
           </div>
        </div>

        {/* Bottom Right Decorative Triangle Cutout Accent */}
        <div className="absolute bottom-0 right-0 w-6 h-[2px] bg-[#00FF8C]/50" />
        
        {/* Interaction Hint */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity">
           <span className="text-[9px] font-black text-[#00FF8C] uppercase tracking-[0.3em]">Click region for live data</span>
           <div className="w-1.5 h-1.5 bg-[#00FF8C] rounded-full animate-pulse shadow-[0_0_5px_#00FF8C]" />
        </div>

        {/* Region Data Pop-up Overlay */}
        <AnimatePresence>
          {activeRegion && (
             <motion.div 
               initial={{ opacity: 0, y: 10, scale: 0.95 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="region-popup absolute z-50 bg-[#06120E]/95 border border-[#00FF8C]/50 backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,140,0.15)] flex flex-col w-[260px] overflow-hidden rounded-sm pointer-events-none"
               style={{
                  left: popupPos.x,
                  top: popupPos.y
               }}
             >
                {/* Pop-up Header */}
                <div className="flex items-center justify-between bg-[#00FF8C]/10 px-3 py-2 border-b border-[#00FF8C]/30">
                   <div className="flex items-center gap-2">
                     <MapPin className="w-3 h-3 text-[#00FF8C]" />
                     <span className="text-[10px] font-black text-[#00FF8C] tracking-widest">{activeRegion.name} COUNTY</span>
                   </div>
                   <button onClick={() => setActiveRegion(null)} className="text-[#00FF8C]/50 hover:text-[#00FF8C] transition-colors pointer-events-auto">
                     <X className="w-3 h-3" />
                   </button>
                </div>
                
                {/* Data Grid */}
                <div className="flex flex-col gap-3 p-3">
                   
                   <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col bg-black/60 border border-[#18362A] p-2 rounded-sm">
                         <span className="text-[8px] font-bold text-white/40 uppercase tracking-wider flex items-center gap-1"><Users className="w-2.5 h-2.5" /> Registered</span>
                         <span className="text-[11px] font-mono text-white mt-1">{activeRegion.registered.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-col bg-black/60 border border-[#18362A] p-2 rounded-sm">
                         <span className="text-[8px] font-bold text-[#00FF8C]/60 uppercase tracking-wider flex items-center gap-1"><Activity className="w-2.5 h-2.5" /> Total Voted</span>
                         <span className="text-[11px] font-mono text-[#00FF8C] mt-1">{activeRegion.voted.toLocaleString()}</span>
                      </div>
                   </div>

                   {/* Stats Row */}
                   <div className="flex items-center justify-between border-t border-[#18362A] pt-2">
                      <div className="flex flex-col">
                         <span className="text-[8px] font-bold text-white/40 uppercase">Rejected Votes</span>
                         <span className="text-[10px] text-[#ff0000] font-mono font-bold mt-0.5">{activeRegion.rejected.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-col items-end">
                         <span className="text-[8px] font-bold text-white/40 uppercase">Turnout</span>
                         <span className="text-[10px] text-white font-mono font-bold mt-0.5">
                           {((activeRegion.voted / activeRegion.registered) * 100).toFixed(1)}%
                         </span>
                      </div>
                   </div>

                   {/* Gender Split */}
                   <div className="flex flex-col gap-1 border-t border-[#18362A] pt-2">
                      <span className="text-[8px] font-bold text-white/40 uppercase flex items-center gap-1">Voter Demographics (Men vs Women)</span>
                      <div className="flex w-full h-1.5 bg-[#18362A] rounded-full overflow-hidden mt-1">
                         <div className="h-full bg-[#00FF8C]/70" style={{ width: `${activeRegion.menRatio}%` }} />
                         <div className="h-full bg-white/40" style={{ width: `${activeRegion.womenRatio}%` }} />
                      </div>
                      <div className="flex justify-between mt-1">
                         <span className="text-[8px] text-[#00FF8C] font-mono">{activeRegion.menRatio}% M</span>
                         <span className="text-[8px] text-white/60 font-mono">{activeRegion.womenRatio}% W</span>
                      </div>
                   </div>

                   {/* Top Candidates inside region */}
                   <div className="flex flex-col gap-1.5 border-t border-[#18362A] pt-2">
                      <span className="text-[8px] font-bold text-white/40 uppercase">Top Candidates</span>
                      {/* cspell:disable-next-line */}
                      {activeRegion.topCandidates.map((cand, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                           <div className="flex items-center gap-2">
                             {/* cspell:disable-next-line */}
                             <div className={`w-1.5 h-1.5 rounded-full ${cand.color}`} />
                             {/* cspell:disable-next-line */}
                             <span className="text-[9px] text-white/80 font-bold">{cand.name}</span>
                           </div>
                           {/* cspell:disable-next-line */}
                           <span className="text-[9px] font-mono text-white/60">{cand.votes.toLocaleString()}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
