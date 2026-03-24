"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface StreamItem {
  id: string;
  constituency: string;
  candidate: string;
  votes: string;
  pct: string;
  status: string;
}

const INITIAL_STREAMS: StreamItem[] = [
  // cspell:disable
  { id: "1", constituency: "Kibra", candidate: "Raila Odinga", votes: "45,231", pct: "72%", status: "VERIFIED" },
  { id: "2", constituency: "Westlands", candidate: "William Ruto", votes: "38,904", pct: "48%", status: "OK" },
  { id: "3", constituency: "Lang'ata", candidate: "Raila Odinga", votes: "41,120", pct: "55%", status: "SYNCING" },
  { id: "4", constituency: "Dagoretti N.", candidate: "William Ruto", votes: "35,780", pct: "52%", status: "OK" },
  { id: "5", constituency: "Mathare", candidate: "Raila Odinga", votes: "29,450", pct: "68%", status: "VERIFIED" },
  // cspell:enable
];

const MOCK_POOL = [
  // cspell:disable
  { constituency: "Starehe", candidate: "William Ruto", votes: "31,220", pct: "44%", status: "SYNCING" },
  { constituency: "Kasarani", candidate: "Kalonzo Musyoka", votes: "22,890", pct: "38%", status: "OK" },
  { constituency: "Ruaraka", candidate: "Raila Odinga", votes: "27,660", pct: "61%", status: "VERIFIED" },
  { constituency: "Embakasi N.", candidate: "William Ruto", votes: "33,410", pct: "50%", status: "OK" },
  { constituency: "Roysambu", candidate: "William Ruto", votes: "28,900", pct: "46%", status: "SYNCING" },
  { constituency: "Tetue", candidate: "William Ruto", votes: "24,500", pct: "58%", status: "OK" },
  { constituency: "Othaya", candidate: "William Ruto", votes: "42,100", pct: "82%", status: "VERIFIED" },
  { constituency: "Gichugu", candidate: "Martha Karua", votes: "38,200", pct: "88%", status: "VERIFIED" },
  { constituency: "Bondo", candidate: "Raila Odinga", votes: "52,400", pct: "94%", status: "VERIFIED" },
  { constituency: "Eldoret East", candidate: "William Ruto", votes: "48,900", pct: "91%", status: "VERIFIED" },
  { constituency: "Kisumu Central", candidate: "Raila Odinga", votes: "61,200", pct: "89%", status: "OK" },
  { constituency: "Mvita", candidate: "Abdulswamad Nassir", votes: "35,600", pct: "65%", status: "SYNCING" },
  { constituency: "Malindi", candidate: "Amina Mnyazi", votes: "29,800", pct: "58%", status: "OK" },
  // cspell:enable
];

export function DataStreamsTable() {
  const [streams, setStreams] = useState(INITIAL_STREAMS);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-Streaming Logic
  useEffect(() => {
    const interval = setInterval(() => {
      const randomEntry = MOCK_POOL[Math.floor(Math.random() * MOCK_POOL.length)];
      // Randomized values to simulate real updates
      const updatedEntry: StreamItem = {
        ...randomEntry,
        id: Math.random().toString(36).substring(2, 9) + Date.now(),
        votes: (parseInt(randomEntry.votes.replace(/,/g, '')) + Math.floor(Math.random() * 50)).toLocaleString(),
        status: Math.random() > 0.7 ? "SYNCING" : "OK"
      };

      setStreams(prev => {
        const next = [...prev, updatedEntry];
        // Keep only last 20 for performance and UI clarity
        return next.length > 20 ? next.slice(next.length - 20) : next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Auto-Scroll Logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [streams]);

  useEffect(() => {
    // Auto-streaming listener cleanup if needed
  }, []);

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="flex items-center justify-between px-2 shrink-0 mb-1.5">
        <div className="flex items-center gap-2">
          <div className="w-1 h-3.5 bg-kenya-green animate-pulse" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70">
            Data Streams [Live]
          </h3>
        </div>
        <div className="flex items-center gap-2 text-[9px] font-mono text-kenya-green uppercase tracking-widest animate-pulse bg-kenya-green/5 px-2.5 py-1 rounded-full border border-kenya-green/10">
          AUTO-STREAM: <span className="font-black">ACTIVE</span>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 rounded-2xl overflow-y-auto no-scrollbar border border-white/10 bg-black/60 relative shadow-inner"
      >
        {/* cspell:disable-next-line */}
        <div className="top-0 left-0 w-full h-[2px] bg-kenya-green animate-scanline z-20 opacity-40 sticky" />
        
        <table className="w-full text-left text-[9px] border-collapse">
          <thead className="bg-kenya-green/20 text-kenya-green uppercase tracking-[0.2em] font-black sticky top-0 z-10 backdrop-blur-xl border-b border-white/10">
            <tr>
              <th className="px-4 py-2">Constituency</th>
              <th className="px-4 py-2 text-right font-mono">Votes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <AnimatePresence mode="popLayout">
              {streams.map((stream: StreamItem, idx: number) => (
                <motion.tr
                  key={stream.id || `stream-${idx}`}
                  initial={{ opacity: 0, y: 10, backgroundColor: "rgba(0, 255, 128, 0.1)" }}
                  animate={{ opacity: 1, y: 0, backgroundColor: "rgba(0, 0, 0, 0)" }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="hover:bg-brand-primary/5 transition-colors group cursor-crosshair border-l-2 border-transparent hover:border-brand-primary/40"
                >
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full ${stream.status === "SYNCING" ? "bg-yellow-400 animate-pulse" : "bg-kenya-green"} shadow-[0_0_8px_currentColor]`} />
                      <div className="flex flex-col gap-0">
                        <span className="font-black text-white text-[10px] uppercase tracking-tighter truncate max-w-[170px] group-hover:text-brand-primary transition-colors">
                          {stream.constituency}
                        </span>
                        <span className="text-[7.5px] text-white/30 uppercase tracking-widest font-bold leading-none">{stream.candidate}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-right font-mono text-[10px]">
                    <div className="text-white font-black group-hover:text-brand-primary transition-colors leading-none">{stream.votes}</div>
                    <div className="text-[8.5px] text-kenya-green font-bold opacity-60 leading-none mt-0.5">{stream.pct}</div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      
      {/* Table Footer Detail */}
      <div className="flex justify-between items-center px-1 text-[7px] font-mono text-white/20 uppercase tracking-[0.2em]">
        <span>Buffer: {(streams.length * 0.4).toFixed(1)} MB</span>
        <span>Packets: {102441 + streams.length}</span>
      </div>
    </div>
  );
}
