"use client";

import { useEffect, useState, MouseEvent, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X } from "lucide-react";

interface RegionData {
  name: string;
  ruto: number;
  raila: number;
  undecided: number;
  sampleSize: number;
}

function PollHeatMapComponent() {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [activeRegion, setActiveRegion] = useState<RegionData | null>(null);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
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
        const container = e.currentTarget.getBoundingClientRect();
        let x = e.clientX - container.left;
        let y = e.clientY - container.top;
        
        x += 20;
        y += 20;

        const popWidth = 220;
        const popHeight = 180;
        
        if (x + popWidth > container.width) x = container.width - popWidth - 10;
        if (y + popHeight > container.height) y = container.height - popHeight - 10;

        setPopupPos({ x, y });

        const rando = regionName.length * 10432;
        const rutoPct = 35 + (rando % 35);
        const railaPct = 95 - rutoPct - (rando % 5);
        const undecided = 100 - rutoPct - railaPct;

        setActiveRegion({
          name: regionName.toUpperCase(),
          ruto: rutoPct,
          raila: railaPct,
          undecided,
          sampleSize: 1200 + (rando % 800)
        });
      }
    } else if (!target.closest('.region-popup')) {
      setActiveRegion(null);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-black/20 rounded-2xl border border-white/10 overflow-hidden shadow-2xl min-h-0">
      {/* HUD Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 h-9 bg-black/40 backdrop-blur-md border-b border-white/5">
         <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse shadow-[0_0_8px_#f1c40f]" />
            <h3 className="text-[9px] font-black text-white/80 tracking-widest uppercase truncate">Regional Heatmap</h3>
         </div>
         <div className="flex gap-3 text-[8px] font-bold text-white/40 tracking-tighter uppercase whitespace-nowrap">
            <span>Uplink: Active</span>
         </div>
      </div>

      {/* Map Body */}
      <div className="relative flex-1 flex items-center justify-center p-4 min-h-0 overflow-hidden">
        <style dangerouslySetInnerHTML={{__html: `
          .kenya-poll-map-container { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
          .kenya-poll-map-container svg { width: auto; height: 100%; max-width: 100%; max-height: 100%; filter: drop-shadow(0 0 20px rgba(0,0,0,0.4)); }
          .kenya-poll-map-container svg path { fill: rgba(255, 255, 255, 0.03); stroke: rgba(255, 255, 255, 0.1); stroke-width: 0.5px; transition: all 0.3s ease; cursor: pointer; }
          .kenya-poll-map-container svg path:hover { fill: rgba(253, 185, 49, 0.2); stroke: rgba(253, 185, 49, 0.8); stroke-width: 1.5px; scale: 1.01; z-index: 50; }
          
          .kenya-poll-map-container svg path:nth-child(3n) { fill: rgba(253, 185, 49, 0.12); }
          .kenya-poll-map-container svg path:nth-child(7n) { fill: rgba(59, 130, 246, 0.12); }
          .kenya-poll-map-container svg path:nth-child(11n) { fill: rgba(34, 197, 94, 0.12); }
        `}} />

        {svgContent ? (
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1.5 }}
             className="kenya-poll-map-container w-full h-full"
             dangerouslySetInnerHTML={{ __html: svgContent }} 
             onClick={handleMapClick}
             onMouseMove={handleMouseMove}
             onMouseLeave={() => setHoveredRegion(null)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 text-white/20">
            <div className="w-10 h-10 border-2 border-white/10 border-t-yellow-500 rounded-full animate-spin" />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase">Initializing Vector Render...</span>
          </div>
        )}

        {/* Hover Tooltip */}
        <AnimatePresence>
          {hoveredRegion && !activeRegion && (
             <motion.div 
               initial={{ opacity: 0, y: 5 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0 }}
               className="fixed z-50 pointer-events-none"
               style={{ left: tooltipPos.x + 15, top: tooltipPos.y - 30 }}
             >
                <div className="bg-black/90 backdrop-blur-md border border-white/20 p-2 py-1 shadow-2xl rounded text-[9px] font-black text-white/90 uppercase tracking-widest">
                   {hoveredRegion}
                </div>
             </motion.div>
          )}
        </AnimatePresence>

        {/* Info Pop-up */}
        <AnimatePresence>
          {activeRegion && (
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 10 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9 }}
               className="region-popup absolute z-40 bg-black/95 border border-yellow-500/30 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col w-[200px] overflow-hidden rounded-lg pointer-events-none"
               style={{ left: popupPos.x, top: popupPos.y }}
             >
                <div className="flex items-center justify-between bg-yellow-500/10 px-3 py-2 border-b border-white/5">
                   <div className="flex items-center gap-2">
                     <MapPin className="w-3 h-3 text-yellow-500" />
                     <span className="text-[10px] font-black text-white uppercase tracking-tighter">{activeRegion.name}</span>
                   </div>
                   <X className="w-3 h-3 text-white/40" />
                </div>
                <div className="p-3 flex flex-col gap-2">
                   <div className="flex items-center justify-between text-[9px] font-bold text-white/40 uppercase">
                      <span>Sample Size</span>
                      <span className="text-white font-mono">{activeRegion.sampleSize}</span>
                   </div>
                   
                   <div className="space-y-1.5 mt-1">
                      {/* Ruto */}
                      <div className="space-y-0.5">
                        <div className="flex justify-between text-[8px] font-black uppercase text-yellow-500">
                           <span>William Ruto</span>
                           <span>{activeRegion.ruto}%</span>
                        </div>
                        <div className="h-1 bg-white/5 overflow-hidden">
                           <div className="h-full bg-yellow-500" style={{ width: `${activeRegion.ruto}%` }} />
                        </div>
                      </div>
                      {/* Raila */}
                      <div className="space-y-0.5">
                        <div className="flex justify-between text-[8px] font-black uppercase text-blue-500">
                           <span>Raila Odinga</span>
                           <span>{activeRegion.raila}%</span>
                        </div>
                        <div className="h-1 bg-white/5 overflow-hidden">
                           <div className="h-full bg-blue-500" style={{ width: `${activeRegion.raila}%` }} />
                        </div>
                      </div>
                   </div>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-6 flex flex-col gap-2 p-3 bg-black/40 backdrop-blur-md rounded-lg border border-white/5 z-20">
         <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-yellow-500/40 border border-yellow-500/60 rounded-sm" />
            <span className="text-[8px] font-black text-white/60 uppercase tracking-widest">Ruto Support</span>
         </div>
         <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-blue-500/40 border border-blue-500/60 rounded-sm" />
            <span className="text-[8px] font-black text-white/60 uppercase tracking-widest">Raila Support</span>
         </div>
         <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500/40 border border-green-500/60 rounded-sm" />
            <span className="text-[8px] font-black text-white/60 uppercase tracking-widest">Competitive</span>
         </div>
      </div>
    </div>
  );
}

export const PollHeatMap = memo(PollHeatMapComponent);
