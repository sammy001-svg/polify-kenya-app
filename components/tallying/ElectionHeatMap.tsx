"use client";

import { useEffect, useState, MouseEvent, memo } from "react";
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

function ElectionHeatMapComponent() {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [activeRegion, setActiveRegion] = useState<RegionData | null>(null);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Fetch the 3MB SVG on the client side to prevent SSR/bundle bloat
    fetch("/kenyaHigh.svg")
      .then(res => res.text())
      .then(data => {
        setSvgContent(data);
      })
      .catch(err => console.error("Failed to load map SVG:", err));
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as SVGElement;
    if (target.tagName.toLowerCase() === 'path') {
      const regionName = target.getAttribute('data-name') || target.getAttribute('title');
      if (regionName) {
        setHoveredRegion(regionName.toUpperCase());
        setTooltipPos({ x: e.clientX, y: e.clientY });
      } else {
        setHoveredRegion(null);
      }
    } else {
      setHoveredRegion(null);
    }
  };

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
      <div className="relative z-10 -mt-px bg-[#FFD786] border-2 border-[#18362A]/20 p-3 md:p-6 [clip-path:polygon(0_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%)] md:[clip-path:polygon(0_0,100%_0,100%_calc(100%-25px),calc(100%-25px)_100%,0_100%)] shadow-[inset_0_0_60px_rgba(0,0,0,0.1)] flex-1 flex flex-col items-center justify-center overflow-hidden min-h-[600px] md:min-h-0">
        
        {/* -- TECH BACKGROUND LAYERS -- */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-size-[20px_20px] md:bg-size-[40px_40px] opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-size-[100px_100px] md:bg-size-[200px_200px] opacity-60 pointer-events-none" />

        <motion.div 
           initial={{ top: "-10%" }}
           animate={{ top: "110%" }}
           transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
           className="absolute left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-black/20 to-transparent blur-[1px] z-20 pointer-events-none"
        />

        <div className="absolute inset-6 pointer-events-none opacity-40">
           {/* Top-Left */}
           <motion.div 
             animate={{ opacity: [0.4, 0.8, 0.4] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-black/40" 
           />
           {/* Top-Right */}
           <motion.div 
             animate={{ opacity: [0.4, 0.8, 0.4] }}
             transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
             className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-black/40" 
           />
           {/* Bottom-Left */}
           <motion.div 
             animate={{ opacity: [0.4, 0.8, 0.4] }}
             transition={{ duration: 2, repeat: Infinity, delay: 1 }}
             className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-black/40" 
           />
           {/* Bottom-Right */}
           <motion.div 
             animate={{ opacity: [0.4, 0.8, 0.4] }}
             transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
             className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-black/40" 
           />
        </div>

        <div className="absolute top-4 left-4 flex-col items-start opacity-30 hidden md:flex pointer-events-none">
           <span className="text-[7px] font-mono text-black uppercase tracking-tighter">SEC: 01-A</span>
           <span className="text-[7px] font-mono text-black uppercase tracking-tighter">VER: AF827D</span>
        </div>

        {/* Coordinate Labels */}
        <div className="hidden sm:flex absolute top-8 right-12 flex-col items-end gap-1 opacity-60 pointer-events-none">
           <span className="text-[7px] md:text-[9px] font-mono text-black tracking-widest uppercase">LAT: 1.2921 N</span>
           <span className="text-[7px] md:text-[9px] font-mono text-black tracking-widest uppercase">LON: 36.8219 E</span>
        </div>

        {/* Dynamic High-Res Map Container */}
        <div className="relative w-full max-w-[800px] aspect-4/5 z-10 flex items-center justify-center">
          <style dangerouslySetInnerHTML={{__html: `
            .kenya-map-container svg { width: 100%; height: 100%; filter: drop-shadow(0 0 40px rgba(0,0,0,0.1)); }
            .kenya-map-container svg path { fill: rgba(0, 0, 0, 0.08); stroke: rgba(0, 0, 0, 0.2); stroke-width: 0.8px; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; }
            .kenya-map-container svg path:hover { fill: rgba(0, 0, 0, 0.2); stroke: rgba(0, 0, 0, 0.8); stroke-width: 1.5px; filter: drop-shadow(0 0 15px rgba(0,0,0,0.2)); z-index: 50; }
            @keyframes mapPulse { 0% { opacity: 0.9; } 50% { opacity: 1; } 100% { opacity: 0.9; } }
            .kenya-map-container { animation: mapPulse 4s infinite ease-in-out; }
            .kenya-map-container svg path:nth-child(3n) { fill: rgba(0, 80, 40, 0.2); }
            .kenya-map-container svg path:nth-child(7n) { fill: rgba(180, 60, 0, 0.25); }
            .kenya-map-container svg path:nth-child(11n) { fill: rgba(0, 60, 180, 0.15); }
          `}} />

          {svgContent ? (
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1 }}
               className="kenya-map-container w-full h-full"
               dangerouslySetInnerHTML={{ __html: svgContent }} 
               onClick={handleMapClick}
               onMouseMove={handleMouseMove}
               onMouseLeave={() => setHoveredRegion(null)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-[#00FF8C]/50 gap-3">
              <div className="w-8 h-8 border-2 border-[#00FF8C]/30 border-t-[#00FF8C] rounded-full animate-spin" />
              <span className="text-[10px] font-mono tracking-widest">LOADING HIGH-RES MAP...</span>
            </div>
          )}

          <AnimatePresence>
            {hoveredRegion && !activeRegion && (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.9 }}
                 className="fixed z-100 pointer-events-none"
                 style={{ left: tooltipPos.x + 20, top: tooltipPos.y - 40 }}
               >
                  <div className="bg-[#091813]/95 backdrop-blur-md border border-[#00FF8C]/40 p-2 shadow-2xl [clip-path:polygon(0_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%)] flex flex-col gap-1 min-w-[200px] max-w-[280px]">
                     <div className="flex items-center gap-2 border-b border-[#00FF8C]/20 pb-0.5">
                        <Activity className="w-3 h-3 text-[#00FF8C]" />
                        <span className="text-[8px] font-black text-[#00FF8C] tracking-[0.2em] uppercase">ALPHA 1 AI ACTIVE</span>
                     </div>
                     <p className="text-[9px] font-bold text-white/90 leading-tight tracking-wide uppercase">
                        <span className="text-[#00FF8C] font-black">{hoveredRegion}</span> | AI is tracking live results
                     </p>
                  </div>
               </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Region Data Pop-up Overlay */}
        <AnimatePresence>
          {activeRegion && (
             <motion.div 
               initial={{ opacity: 0, y: 10, scale: 0.95 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="region-popup absolute z-50 bg-[#06120E]/95 border border-[#00FF8C]/50 backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,140,0.15)] flex flex-col w-[260px] overflow-hidden rounded-sm pointer-events-none"
               style={{ left: popupPos.x, top: popupPos.y }}
             >
                <div className="flex items-center justify-between bg-[#00FF8C]/10 px-3 py-2 border-b border-[#00FF8C]/30">
                   <div className="flex items-center gap-2">
                     <MapPin className="w-3 h-3 text-[#00FF8C]" />
                     <span className="text-[10px] font-black text-[#00FF8C] tracking-widest">{activeRegion.name}</span>
                   </div>
                   <button onClick={() => setActiveRegion(null)} className="text-[#00FF8C]/50 pointer-events-auto"><X className="w-3 h-3" /></button>
                </div>
                <div className="p-3 flex flex-col gap-3">
                   <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col bg-black/60 p-2 rounded-sm border border-[#18362A]">
                         <span className="text-[8px] text-white/40 uppercase">Registered</span>
                         <span className="text-[11px] font-mono text-white mt-1">{activeRegion.registered.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-col bg-black/60 p-2 rounded-sm border border-[#18362A]">
                         <span className="text-[8px] text-[#00FF8C]/60 uppercase">Voted</span>
                         <span className="text-[11px] font-mono text-[#00FF8C] mt-1">{activeRegion.voted.toLocaleString()}</span>
                      </div>
                   </div>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export const ElectionHeatMap = memo(ElectionHeatMapComponent);
