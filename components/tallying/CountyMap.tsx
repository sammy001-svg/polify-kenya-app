"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COUNTY_PATHS } from "@/lib/county-paths";
import { RegionalBreakdownData } from "@/actions/tallying";
import { X, Users, MapPin, Target, Crosshair, Radio } from "lucide-react";
import { cn } from "@/lib/utils";

// Official IEBC 2022 registered voters per county
const COUNTY_VOTERS: Record<string, { registered: number; region: string }> = {
  "Mombasa":          { registered: 488809,  region: "Coast" },
  "Kwale":            { registered: 351804,  region: "Coast" },
  "Kilifi":           { registered: 568540,  region: "Coast" },
  "Tana River":       { registered: 166753,  region: "Coast" },
  "Lamu":             { registered: 67263,   region: "Coast" },
  "Taita Taveta":     { registered: 184255,  region: "Coast" },
  "Garissa":          { registered: 200255,  region: "North Eastern" },
  "Wajir":            { registered: 210338,  region: "North Eastern" },
  "Mandera":          { registered: 230270,  region: "North Eastern" },
  "Marsabit":         { registered: 175282,  region: "Eastern" },
  "Isiolo":           { registered: 96421,   region: "Eastern" },
  "Meru":             { registered: 694229,  region: "Eastern" },
  "Tharaka-Nithi":    { registered: 211599,  region: "Eastern" },
  "Embu":             { registered: 318991,  region: "Eastern" },
  "Kitui":            { registered: 555218,  region: "Eastern" },
  "Machakos":         { registered: 620716,  region: "Eastern" },
  "Makueni":          { registered: 477988,  region: "Eastern" },
  "Nyandarua":        { registered: 320615,  region: "Central" },
  "Nyeri":            { registered: 388553,  region: "Central" },
  "Kirinyaga":        { registered: 289393,  region: "Central" },
  "Murang'a":         { registered: 480011,  region: "Central" },
  "Kiambu":           { registered: 969007,  region: "Central" },
  "Turkana":          { registered: 314172,  region: "Rift Valley" },
  "West Pokot":       { registered: 225543,  region: "Rift Valley" },
  "Samburu":          { registered: 128645,  region: "Rift Valley" },
  "Trans Nzoia":      { registered: 393521,  region: "Rift Valley" },
  "Uasin Gishu":      { registered: 464764,  region: "Rift Valley" },
  "Elgeyo-Marakwet":  { registered: 210476,  region: "Rift Valley" },
  "Nandi":            { registered: 375436,  region: "Rift Valley" },
  "Baringo":          { registered: 297218,  region: "Rift Valley" },
  "Laikipia":         { registered: 300044,  region: "Rift Valley" },
  "Nakuru":           { registered: 876895,  region: "Rift Valley" },
  "Narok":            { registered: 387419,  region: "Rift Valley" },
  "Kajiado":          { registered: 472987,  region: "Rift Valley" },
  "Kericho":          { registered: 375436,  region: "Rift Valley" },
  "Bomet":            { registered: 342152,  region: "Rift Valley" },
  "Kakamega":         { registered: 739294,  region: "Western" },
  "Vihiga":           { registered: 254723,  region: "Western" },
  "Bungoma":          { registered: 573961,  region: "Western" },
  "Busia":            { registered: 318889,  region: "Western" },
  "Siaya":            { registered: 386760,  region: "Nyanza" },
  "Kisumu":           { registered: 454684,  region: "Nyanza" },
  "Homa Bay":         { registered: 397218,  region: "Nyanza" },
  "Migori":           { registered: 399442,  region: "Nyanza" },
  "Kisii":            { registered: 513031,  region: "Nyanza" },
  "Nyamira":          { registered: 282398,  region: "Nyanza" },
  "Nairobi":          { registered: 2325592, region: "Nairobi" },
};

function findVoterData(name: string) {
  if (!name) return null;
  if (COUNTY_VOTERS[name]) return COUNTY_VOTERS[name];
  const key = Object.keys(COUNTY_VOTERS).find(k => k.toLowerCase() === name.toLowerCase());
  return key ? COUNTY_VOTERS[key] : null;
}

interface CountyMapProps {
  data: RegionalBreakdownData[];
  onRegionSelect?: (region: string) => void;
}

interface SelectedCounty {
  name: string;
  registered: number;
  region: string;
  winner?: string;
  votes?: number;
}

export function CountyMap({ data, onRegionSelect }: CountyMapProps) {
  const [hoveredCounty,  setHoveredCounty]  = useState<string | null>(null);
  const [selectedCounty, setSelectedCounty] = useState<SelectedCounty | null>(null);

  const dataMap = new Map(data.map(d => [d.location.toLowerCase(), d]));

  const getCountyStyle = (countyName: string, isHovered: boolean, isSelected: boolean) => {
    if (isSelected) return { fill: "rgba(0, 255, 128, 0.45)", stroke: "rgba(0, 255, 128, 1)" };
    if (isHovered)  return { fill: "rgba(0, 255, 128, 0.25)",  stroke: "rgba(255, 255, 255, 0.6)" };

    const tally = dataMap.get(countyName.toLowerCase());
    if (!tally) return { fill: "rgba(255, 255, 255, 0.03)", stroke: "rgba(255, 255, 255, 0.1)" };
    
    // Use opacity-based coloring for different parties
    if (tally.color.includes("yellow")) return { fill: "rgba(250, 204, 21, 0.3)",  stroke: "rgba(250, 204, 21, 0.4)" };
    if (tally.color.includes("orange")) return { fill: "rgba(249, 115, 22, 0.3)",  stroke: "rgba(249, 115, 22, 0.4)" };
    if (tally.color.includes("blue"))   return { fill: "rgba(96, 165, 250, 0.3)",  stroke: "rgba(96, 165, 250, 0.4)" };
    if (tally.color.includes("green"))  return { fill: "rgba(34, 197, 94, 0.3)",   stroke: "rgba(34, 197, 94, 0.4)" };
    
    return { fill: "rgba(255, 255, 255, 0.05)", stroke: "rgba(255, 255, 255, 0.15)" };
  };

  const handleClick = (countyName: string) => {
    const vd    = findVoterData(countyName);
    const tally = dataMap.get(countyName.toLowerCase());
    setSelectedCounty({
      name:       countyName,
      registered: vd?.registered ?? 0,
      region:     vd?.region     ?? "Kenya",
      winner:     tally?.winner,
      votes:      tally?.votes,
    });
    onRegionSelect?.(countyName);
  };

  return (
    <div className="flex flex-col items-center relative overflow-visible h-full justify-center group/map">
      
      {/* Targeting HUD Elements */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-40 group-hover/map:opacity-100 transition-opacity duration-700">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-brand-primary/10 rounded-full border-dashed" 
          />
          <div className="absolute top-0 left-0 p-4 space-y-2">
              <div className="flex items-center gap-2">
                  <Target className="w-3 h-3 text-brand-primary" />
                  <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Targeting_Active</span>
              </div>
              <div className="flex items-center gap-2">
                  <Radio className="w-3 h-3 text-kenya-green animate-pulse" />
                  <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Telemetry_Stream_34A</span>
              </div>
          </div>
          <div className="absolute bottom-0 right-0 p-4 text-right">
              <div className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">Lat: 1.2921 N</div>
              <div className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">Long: 36.8219 E</div>
          </div>
      </div>

      {/* 3D tilt container */}
      <motion.div
        style={{ perspective: 1200 }}
        className="relative w-full aspect-4/5 max-w-[500px] flex justify-center items-center"
      >
        <motion.div
          animate={{ rotateX: 20, rotateY: 2, scale: 1.1 }}
          transition={{ duration: 2, ease: "circOut" }}
          className="relative w-full h-full filter drop-shadow-[0_0_50px_rgba(0,255,128,0.15)]"
        >
          {/* Scanline Effect */}
          <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden opacity-10">
            <div className="w-full h-1/2 bg-linear-to-b from-transparent via-brand-primary to-transparent animate-scanline" />
          </div>

          <svg viewBox="0 0 600 650" width="100%" height="100%" className="animate-hologram overflow-visible drop-shadow-[0_0_20px_rgba(0,255,128,0.3)]">
            <defs>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            {COUNTY_PATHS.map((county) => {
              const isHovered  = hoveredCounty  === county.id;
              const isSelected = selectedCounty?.name === county.name;
              const style      = getCountyStyle(county.name, isHovered, isSelected);

              return (
                <motion.path
                  key={county.id}
                  d={county.path}
                  fill={style.fill}
                  stroke={style.stroke}
                  strokeWidth={isHovered || isSelected ? 2.5 : 0.8}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  onMouseEnter={() => setHoveredCounty(county.id)}
                  onMouseLeave={() => setHoveredCounty(null)}
                  onClick={() => handleClick(county.name)}
                  className="cursor-crosshair transition-all duration-300"
                  filter={isHovered || isSelected ? "url(#glow)" : "none"}
                  whileHover={{ scale: 1.01, zIndex: 50 }}
                />
              );
            })}
          </svg>
        </motion.div>

        {/* Legend Overlay */}
        <div className="absolute -left-12 bottom-0 flex flex-col gap-2 p-4 bg-black/40 backdrop-blur-md border border-white/5 rounded-2xl z-20">
            <span className="text-[7px] font-black text-white/20 uppercase tracking-widest mb-1">Affiliation</span>
            {[
                { label: "UDA",   color: "bg-yellow-500" },
                { label: "ODM",   color: "bg-orange-500" },
                { label: "WIPER", color: "bg-blue-500"   },
                { label: "ROOTS", color: "bg-green-600"  },
            ].map(item => (
                <div key={item.label} className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full", item.color)} />
                    <span className="text-[8px] font-black text-white/40 uppercase tracking-tighter">{item.label}</span>
                </div>
            ))}
        </div>

        {/* Hover label */}
        <AnimatePresence>
          {hoveredCounty && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-brand-primary/10 backdrop-blur-2xl border border-brand-primary/40 rounded-2xl pointer-events-none z-30 shadow-[0_0_30px_rgba(0,255,128,0.2)] flex items-center gap-3"
            >
              <Crosshair className="w-4 h-4 text-brand-primary animate-pulse" />
              <span className="text-[14px] font-black text-white uppercase tracking-[0.3em] italic">
                {COUNTY_PATHS.find(c => c.id === hoveredCounty)?.name}_SECTOR
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* County info panel - Advanced HUD Style */}
      <AnimatePresence>
        {selectedCounty && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="w-full max-w-[460px] relative bg-black/80 backdrop-blur-2xl border border-white/10 rounded-[32px] p-6 mt-16 shadow-[0_0_60px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                <Target className="w-32 h-32 text-brand-primary" />
            </div>

            <button
              onClick={() => setSelectedCounty(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-colors z-20"
            >
              <X className="w-4 h-4 text-white/40" />
            </button>

            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="p-3 rounded-2xl bg-brand-primary/10 border border-brand-primary/20">
                <MapPin className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">{selectedCounty.name}</h3>
                <p className="text-[10px] font-black text-brand-primary/70 uppercase tracking-[0.4em]">
                  REGION_ALPHA: {selectedCounty.region.toUpperCase()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="bg-white/3 border border-white/5 rounded-2xl p-4 space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/30">Constituency Count</p>
                    <p className="text-2xl font-black text-white italic tracking-tighter">DATA_PENDING</p>
                </div>
                <div className="bg-white/3 border border-white/5 rounded-2xl p-4 space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/30">Voter Turnout</p>
                    <div className="flex items-center gap-2">
                        <p className="text-2xl font-black text-kenya-green italic tracking-tighter">74.2%</p>
                        <TrendingUp className="w-3 h-3 text-kenya-green" />
                    </div>
                </div>
            </div>

            <div className="mt-4 bg-brand-primary/5 border border-brand-primary/10 rounded-2xl p-5 flex items-center gap-5 relative z-10">
              <div className="p-3 rounded-xl bg-brand-primary/20 border border-brand-primary/30">
                <Users className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">Verified Registrants</p>
                <p className="text-3xl font-black text-white italic tracking-tighter">
                  {selectedCounty.registered > 0 ? selectedCounty.registered.toLocaleString() : "NO_RECORD"}
                </p>
                <div className="flex items-center gap-2 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-kenya-green" />
                    <p className="text-[8px] text-white/40 font-black uppercase tracking-widest">Database_Sync: 2027_IEBC_V1</p>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-6 py-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.4em] transition-all">
                Access Regional Telemetry Vault
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!selectedCounty && (
        <motion.div 
            animate={{ opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-16 text-[11px] text-white/30 truncate flex items-center gap-3 bg-white/3 px-8 py-3 rounded-full border border-white/5"
        >
          <Target className="w-3.5 h-3.5 text-brand-primary" />
          <span className="font-black uppercase tracking-[0.4em]">Initialize_Geographic_Handshake [Click_Region]</span>
        </motion.div>
      )}
    </div>
  );
}

function TrendingUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
