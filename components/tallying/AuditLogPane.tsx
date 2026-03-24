"use client";

import { useEffect, useState, useRef } from "react";
import { Bell, AlertCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LogEntry {
  id: number;
  text: string;
  type: 'success' | 'alert' | 'info';
  location: string;
  timestamp: string;
  bars: number;
}

const COUNTIES = ["NAIROBI", "MOMBASA", "KISUMU", "NAKURU", "UASIN GISHU", "KILIFI", "KWALE", "MACHAKOS", "GARISSA", "NYERI", "BOMET"];
const EVENTS = [
  { text: "Form 34A Uploaded", type: 'success' as const },
  { text: "Anomaly Flagged", type: 'alert' as const },
  { text: "Validation Complete", type: 'success' as const },
  { text: "Duplicate Form Alert", type: 'alert' as const },
  { text: "Station Sync Success", type: 'info' as const },
  { text: "Audit Trail Hash Generated", type: 'info' as const },
  { text: "Verified by AI Scout", type: 'success' as const },
];

export function AuditLogPane() {
  const [isHovered, setIsHovered] = useState(false);
  const [totalVerifiedVoters, setTotalVerifiedVoters] = useState(12840552);
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 1, text: "System Initialized", type: 'info', location: "MAIN GATEWAY", timestamp: "INIT", bars: 5 },
    { id: 2, text: "Data Streams Connected", type: 'success', location: "TALLY_HUB", timestamp: "10:15:02", bars: 4 },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  // Simulated live feed
  useEffect(() => {
    const interval = setInterval(() => {
      const event = EVENTS[Math.floor(Math.random() * EVENTS.length)];
      const county = COUNTIES[Math.floor(Math.random() * COUNTIES.length)];
      const now = new Date();
      const timestamp = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      const newLog: LogEntry = {
        id: Date.now(),
        text: event.text,
        type: event.type,
        location: county,
        timestamp,
        bars: Math.floor(Math.random() * 5) + 1
      };
      
      setLogs(prev => [...prev.slice(-49), newLog]); // Keep last 50
      
      // Increment voters
      setTotalVerifiedVoters(prev => prev + Math.floor(Math.random() * 450) + 50);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="relative w-full flex flex-col group h-full min-h-[300px] cursor-help"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. ANGLED TITLE TAB */}
      <div className="relative z-20 flex w-full h-8 bg-[#091813] border-t border-l border-r border-[#18362A] [clip-path:polygon(0_0,calc(100%-15px)_0,100%_100%,0_100%)]">
         <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00FF8C] shadow-[0_0_8px_#00FF8C]" />
         <div className="absolute inset-0 bg-linear-to-r from-[#00FF8C]/10 to-transparent pointer-events-none" />
         
         <div className="flex items-center gap-3 px-3 w-full justify-between">
            <div className="flex items-center gap-2">
               <Bell className="w-3 h-3 text-[#00FF8C] fill-[#00FF8C] shrink-0" />
               <h3 className="text-[10px] md:text-xs font-black text-white uppercase tracking-widest leading-none pt-0.5 truncate">LIVE RESULT STREAMS</h3>
            </div>
            
            <div className="flex items-center gap-2 border-l border-[#18362A] pl-3">
               <span className="text-[8px] font-bold text-white/40 uppercase tracking-tighter hidden sm:inline">TOTAL VERIFIED:</span>
               <div className="flex flex-col items-end">
                  <span className="text-[11px] font-mono font-black text-[#00FF8C] drop-shadow-[0_0_5px_rgba(0,255,140,0.5)] leading-none">
                    {totalVerifiedVoters.toLocaleString()}
                  </span>
                  <div className="flex items-center gap-1">
                     <span className="w-1 h-1 bg-[#00FF8C] rounded-full animate-pulse" />
                     <span className="text-[6px] font-mono text-[#00FF8C]/60 uppercase tracking-tighter">STREAMING</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* 2. MAIN CARD BODY (Chamfered) */}
      <div className="relative z-10 -mt-px bg-[#06120E] border-2 border-[#18362A] p-3 [clip-path:polygon(0_0,100%_0,100%_calc(100%-15px),calc(100%-15px)_100%,0_100%)] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] flex-1 flex flex-col overflow-hidden max-h-[400px]">
        
        {/* BETA AI TOOLTIP OVERLAY (Side-Floating) */}
        <AnimatePresence>
          {isHovered && (
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="absolute top-2 -left-2 z-50 w-[220px] bg-[#091813]/98 backdrop-blur-xl p-3 border border-[#00FF8C]/40 shadow-2xl [clip-path:polygon(0_0,calc(100%-10px)_0,100%_10px,100%_100%,10px_100%,0_calc(100%-10px))]"
             >
                <div className="flex flex-col gap-2">
                   <div className="flex items-center gap-2 border-b border-[#00FF8C]/20 pb-1">
                      <Info className="w-3.5 h-3.5 text-[#00FF8C]" />
                      <span className="text-[8px] font-black text-[#00FF8C] tracking-widest uppercase">INGESTION ENGINE</span>
                   </div>
                   <p className="text-[9px] font-bold text-white/90 leading-relaxed tracking-wide uppercase">
                     <span className="text-[#00FF8C]">Beta 1 and Beta 2 AI</span> are pulling results live on the clould after being uploaded by retuning office via KIM skit. It capture all results verify and pass them to <span className="text-[#00FF8C]">Poly 1 AI</span> for allocation
                   </p>
                </div>
             </motion.div>
          )}
        </AnimatePresence>

        {/* Inner Border Lines */}
        <div className="absolute inset-x-0 top-0 h-px bg-[#00FF8C]/20" />
        <div className="absolute left-0 top-0 bottom-15 w-px bg-[#00FF8C]/10" />

        <div 
          ref={scrollRef}
          className="flex flex-col gap-2 pt-1 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#00FF8C]/20 scrollbar-track-transparent pr-1"
        >
          <AnimatePresence initial={false}>
            {logs.map((log) => (
               <motion.div 
                 key={log.id} 
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="flex flex-col py-2 border-b border-[#00FF8C]/5 last:border-0 hover:bg-[#00FF8C]/5 px-2 transition-colors cursor-pointer group/log"
               >
                  <div className="flex items-center gap-3">
                    {/* Status Icon */}
                    {log.type === 'alert' ? (
                      <AlertCircle className="w-3 h-3 text-[#ff4444] shrink-0" />
                    ) : (
                      <div className="w-0 h-0 border-t-4 border-t-transparent border-l-[6px] border-l-[#00FF8C] border-b-4 border-b-transparent shrink-0 drop-shadow-[0_0_3px_#00FF8C]" />
                    )}
                    
                    <div className="flex flex-col min-w-0 flex-1">
                      <div className="flex justify-between items-start gap-2">
                        <span className={`text-[10px] font-black tracking-wide truncate ${log.type === 'alert' ? 'text-[#ff4444]' : 'text-[#00FF8C]'}`}>
                          {log.text.toUpperCase()}
                        </span>
                        <span className="text-[7px] font-mono text-white/40 tabular-nums">{log.timestamp}</span>
                      </div>
                      <div className="flex justify-between items-center mt-0.5">
                        <span className="text-[7px] font-bold text-white/30 uppercase tracking-widest truncate">{log.location}</span>
                        
                        {/* Status Bars */}
                        <div className="flex gap-px shrink-0 items-end h-2">
                           {[...Array(5)].map((_, i) => (
                             <div 
                               key={i} 
                               className={`w-[2px] bg-[#00FF8C] rounded-[1px] ${i < log.bars ? 'h-full opacity-100 shadow-[0_0_3px_#00FF8C]' : 'h-1/2 opacity-10'}`} 
                             />
                           ))}
                        </div>
                      </div>
                    </div>
                  </div>
               </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Right Decorative Triangle Cutout Accent */}
        <div className="absolute bottom-0 right-0 w-4 h-[2px] bg-[#00FF8C]/50" />
      </div>
    </div>
  );
}
