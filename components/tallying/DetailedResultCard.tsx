"use client";

/* cspell:ignore EMBAKASI, cand */

import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronDown, Download, FileText, Search } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
/* cspell:disable-next-line */
import { COUNTIES } from "@/lib/constants/counties";
import { KENYA_LOCATIONS } from "@/lib/location-data";

const ALL_CONSTITUENCIES = KENYA_LOCATIONS.flatMap(county => county.constituencies.map(c => c.name)).sort();

interface Candidate {
  name: string;
  pct: string;
  votes?: string;
  photo?: string;
  party_color: string;
  party_symbol?: string;
}

export interface Form34A {
  id: string;
  stationName: string;
  county: string;
  constituency: string;
  timestamp: string;
}

interface DetailedResultCardProps {
  title: string;
  candidates: Candidate[];
  reporting: string;
  showDropdown?: boolean;
  dropdownType?: "county" | "constituency";
  roleOptions?: string[];
  form34As?: Form34A[];
  className?: string;
}

function DetailedResultCardComponent({ 
  title, 
  candidates, 
  reporting, 
  showDropdown = false,
  dropdownType = "county",
  roleOptions,
  form34As,
  className
}: DetailedResultCardProps) {
  const [showFormsMenu, setShowFormsMenu] = useState(false);
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const defaultLocation = dropdownType === "county" ? "NAIROBI" : "EMBAKASI SOUTH";
  const [selectedLocation, setSelectedLocation] = useState(defaultLocation);
  
  const [selectedRole, setSelectedRole] = useState(roleOptions?.[0] || "");

  const dropdownOptions = dropdownType === "county" 
    ? COUNTIES.map(c => c.name) 
    : ALL_CONSTITUENCIES;
  
  const filteredOptions = dropdownOptions.filter(opt => 
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className={cn(
      "relative w-full flex flex-col group",
      className
    )}>
      
      {/* 1. ANGLED TITLE TAB */}
      <div 
        className={cn(
          "relative z-30 flex w-full md:w-fit min-w-0 md:min-w-[280px] h-8 bg-[#091813] border-t border-l border-r border-[#18362A] [clip-path:polygon(0_0,calc(100%-10px)_0,100%_100%,0_100%)] md:[clip-path:polygon(0_0,calc(100%-15px)_0,100%_100%,0_100%)]",
          form34As && "cursor-pointer hover:bg-[#0B1E18] transition-colors"
        )}
        onClick={() => form34As && setShowFormsMenu(!showFormsMenu)}
      >
         {/* Green left accent */}
         <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00FF8C] shadow-[0_0_8px_#00FF8C]" />
         {/* Subtle gradient background */}
         <div className="absolute inset-0 bg-linear-to-r from-[#00FF8C]/20 to-transparent pointer-events-none" />
         
         <div className="flex items-center gap-2 md:gap-3 px-2 md:px-3 w-full">
            {/* Tiny Kenyan Flag Badge */}
            <div className="w-[14px] md:w-[18px] h-2 md:h-2.5 flex flex-col border border-white/20 shrink-0">
               <div className="h-1/3 bg-black" />
               <div className="h-1/3 bg-[#ff0000]" />
               <div className="h-1/3 bg-[#00FF8C]" />
            </div>
            <h3 className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-widest flex-1 truncate">{title}</h3>
            
            {/* Pulsing LIVE indicator */}
            <div className="flex items-center gap-1 md:gap-1.5 shrink-0 px-1.5 md:px-2 py-0.5 bg-[#00FF8C]/10 border border-[#00FF8C]/20">
               <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-[#00FF8C] rounded-full animate-pulse shadow-[0_0_5px_#00FF8C]" />
               <span className="text-[7px] md:text-[8px] font-black text-[#00FF8C] tracking-tighter">LIVE</span>
            </div>

            {form34As && (
              <ChevronDown className={cn("w-3 md:w-3.5 h-3 md:h-3.5 text-[#00FF8C] transition-transform duration-300", showFormsMenu && "rotate-180")} />
            )}
         </div>
      </div>

      {/* FORM 34A DROPDOWN MENU */}
      <AnimatePresence>
        {showFormsMenu && form34As && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-8 left-0 z-40 w-full md:w-[400px] bg-black/90 backdrop-blur-xl border border-[#00FF8C]/40 shadow-[0_10px_40px_rgba(0,0,0,1)] [clip-path:polygon(0_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%)]"
          >
            <div className="p-3 border-b border-[#00FF8C]/20 flex justify-between items-center bg-[#00FF8C]/5">
              <span className="text-[10px] font-black tracking-widest text-[#00FF8C] uppercase">Counted Form 34As</span>
              <span className="text-[10px] text-white/50">{form34As.length} Forms</span>
            </div>
            
            <div className="flex flex-col gap-1 p-2 max-h-[250px] md:max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#00FF8C]/30 scrollbar-track-transparent pr-1">
              {form34As.map((form) => (
                <div key={form.id} className="flex items-center justify-between p-2 bg-[#0A1612] hover:bg-[#18362A]/50 border left-0 border-[#18362A] group transition-colors">
                  <div className="flex gap-2 md:gap-3 items-center min-w-0">
                    <FileText className="w-3.5 md:w-4 h-3.5 md:h-4 text-[#00FF8C]/50 group-hover:text-[#00FF8C] shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] md:text-[11px] font-bold text-white truncate">{form.stationName}</span>
                      <span className="text-[8px] md:text-[9px] text-white/50 truncate uppercase tracking-widest">{form.county} • {form.constituency}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
                    <span className="text-[7px] md:text-[8px] text-[#00FF8C]/70 font-mono">{form.timestamp}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toast.success(`Downloading ${form.id}`, {
                           description: `Source: ${form.stationName}`,
                           duration: 3000
                        });
                      }}
                      className="flex items-center gap-1 text-[8px] md:text-[9px] font-bold text-[#00FF8C] hover:text-white transition-colors bg-[#00FF8C]/10 hover:bg-[#00FF8C]/20 px-1.5 md:px-2 py-0.5 md:py-1"
                    >
                      <Download className="w-2.5 md:w-3 h-2.5 md:h-3" />
                      DL
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Bottom Right Cutout line */}
            <div className="absolute bottom-0 right-0 w-3 h-px bg-[#00FF8C]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MAIN CARD BODY (Chamfered) */}
      <div className="relative z-10 -mt-px bg-white border-2 border-slate-200/50 p-3 md:p-4 [clip-path:polygon(0_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%)] shadow-2xl flex-1 flex flex-col h-[400px] md:h-[450px]">
        
        {/* Inner Border (subtle top line) */}
        <div className="absolute inset-x-0 top-0 h-px bg-slate-100" />
        <div className="absolute left-0 top-0 bottom-15 w-px bg-slate-100" />
        
        <div className="p-1 md:p-2 flex flex-col gap-4 relative">
           {/* Top Header: Location Selection & Reporting Status */}
        <div className="flex items-center justify-between gap-2 mb-4">
           {showDropdown ? (
              <div className="relative">
                 <button 
                  onClick={() => setShowLocationMenu(!showLocationMenu)}
                  className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-2 md:px-3 py-1 text-[9px] md:text-[10px] font-black text-slate-900 hover:border-brand-primary transition-colors uppercase tracking-widest"
                 >
                    <Search className="w-3 h-3 text-brand-primary" />
                    <span className="truncate max-w-[80px] md:max-w-none">{selectedLocation}</span>
                    <ChevronDown className={cn("w-3 h-3 text-slate-400 transition-transform", showLocationMenu && "rotate-180")} />
                 </button>
                 
                 <AnimatePresence>
                    {showLocationMenu && (
                       <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 mt-2 z-50 w-[200px] md:w-[240px] bg-white border border-slate-200 shadow-2xl p-2 flex flex-col"
                     >
                       <div className="p-2 border-b border-slate-100 sticky top-0 bg-white z-10">
                         <div className="relative flex items-center">
                           <Search className="absolute left-2 w-3 h-3 text-slate-400" />
                           <input 
                             type="text"
                             placeholder="SEARCH..."
                             value={searchTerm}
                             onChange={(e) => setSearchTerm(e.target.value)}
                             onClick={(e) => e.stopPropagation()}
                             className="w-full bg-slate-50 border border-slate-200 rounded-sm py-1.5 pl-7 pr-2 text-[10px] text-slate-900 font-mono placeholder:text-slate-400 focus:outline-hidden focus:border-brand-primary transition-colors"
                           />
                         </div>
                       </div>

                       <div className="max-h-[220px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                         {filteredOptions.length > 0 ? filteredOptions.map(option => (
                            <div 
                             key={option}
                             onClick={() => {
                               setSelectedLocation(option.toUpperCase());
                               setShowLocationMenu(false);
                               setSearchTerm("");
                             }}
                             className={cn(
                               "px-3 py-2 text-[10px] font-black tracking-widest cursor-pointer uppercase transition-colors hover:bg-slate-50 hover:text-brand-primary",
                               selectedLocation === option.toUpperCase() ? "text-brand-primary bg-slate-50" : "text-slate-600"
                             )}
                           >
                             {option}
                           </div>
                         )) : (
                           <div className="px-3 py-4 text-[10px] text-slate-400 text-center italic uppercase tracking-widest">
                             No Matches Found
                           </div>
                         )}
                       </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
              </div>
             ) : <div />}

             {roleOptions && roleOptions.length > 0 && (
                <div className="relative">
                  <button 
                    onClick={() => setShowRoleMenu(!showRoleMenu)}
                    className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-2 md:px-3 py-1 text-[9px] md:text-[10px] font-black text-slate-900 hover:border-brand-primary transition-colors uppercase tracking-widest"
                  >
                     <span className="truncate max-w-[80px] md:max-w-none">{selectedRole}</span>
                     <ChevronDown className={cn("w-3 h-3 text-slate-400 transition-transform", showRoleMenu && "rotate-180")} />
                  </button>

                  <AnimatePresence>
                    {showRoleMenu && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full mt-2 left-0 w-full min-w-[150px] bg-white border border-slate-200 shadow-xl z-50 flex flex-col"
                      >
                        {roleOptions.map(role => (
                          <div 
                            key={role}
                            onClick={() => {
                              setSelectedRole(role);
                              setShowRoleMenu(false);
                            }}
                            className={cn(
                              "px-3 py-2 text-[10px] font-black tracking-widest cursor-pointer uppercase transition-colors hover:bg-slate-50 hover:text-brand-primary",
                              selectedRole === role ? "text-brand-primary bg-slate-50" : "text-slate-600"
                            )}
                          >
                            {role}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
             )}
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                 Reporting: <span className="text-slate-900 ml-1">{reporting}</span>
              </span>
           </div>
        </div>

        {/* Candidates List with Scroll */}
        <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          <div className="flex flex-col gap-2 md:gap-3 py-1">
            <AnimatePresence mode="popLayout">
              {candidates.map((candidate) => (
                <motion.div 
                  layout
                  key={candidate.name} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                      layout: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                  }}
                  className="relative group/cand bg-linear-to-r from-[#25671E] to-[#18362A] border-x-2 border-y border-[#18362A]/50 shadow-xl p-1.5 md:p-2 mb-1"
                >
                    {/* Gloss Overlay */}
                    <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent pointer-events-none" />
                    
                    <div className="flex items-center gap-2 md:gap-3 mb-1.5 flex-1 relative z-10">
                      {/* Candidate Photo Block */}
                      <div className="relative w-10 h-10 md:w-12 md:h-12 shrink-0 border border-[#00FF8C]/30 bg-black/40 overflow-hidden">
                          {candidate.photo ? (
                            <Image 
                                src={candidate.photo} 
                                alt={candidate.name} 
                                fill
                                priority
                                sizes="(max-width: 768px) 40px, 48px"
                                className="object-cover grayscale group-hover/cand:grayscale-0 transition-all duration-700 brightness-125 contrast-[1.1]"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-[#091813]">
                              <span className="text-xs font-black text-white/40">{candidate.name[0]}</span>
                            </div>
                          )}
                          {/* Status glow */}
                          <div className={cn("absolute inset-0 opacity-0 group-hover/cand:opacity-20 transition-opacity", candidate.party_color)} />
                      </div>

                      <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <div className="flex items-center gap-1.5 min-w-0">
                                {candidate.party_symbol && (
                                   <div className="w-5 h-5 rounded-full bg-white p-0.5 shrink-0 border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.2)] flex items-center justify-center overflow-hidden">
                                      <Image 
                                         src={candidate.party_symbol} 
                                         alt="Party Symbol" 
                                         width={18} 
                                         height={18}
                                         className="object-contain"
                                      />
                                   </div>
                                )}
                                <span className="text-[10px] md:text-[11px] font-black text-white uppercase tracking-wide truncate font-mono">
                                    {candidate.name}
                                </span>
                            </div>
                            <span className="text-sm md:text-lg font-black text-[#00FF8C] font-mono tracking-tighter drop-shadow-[0_0_5px_rgba(0,255,140,0.5)]">
                                {candidate.pct}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-black/30 relative overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: candidate.pct }}
                                  transition={{ duration: 1.5, ease: "easeOut" }}
                                  className={cn("absolute left-0 top-0 bottom-0 shadow-[0_0_10px_rgba(0,0,0,0.5)]", candidate.party_color)}
                                />
                                {/* Scrape Line */}
                                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] bg-size-[200%_100%] animate-[shine_3s_infinite]" />
                            </div>
                            <span className="text-[10px] md:text-[11px] font-bold text-white font-mono tracking-tighter">
                                {candidate.votes}
                            </span>
                          </div>
                      </div>
                    </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Right Decorative Triangle Cutout Accent */}
        <div className="absolute bottom-0 right-0 w-4 h-[2px] bg-slate-200" />
      </div>
    </div>
  );
}

export const DetailedResultCard = memo(DetailedResultCardComponent);
