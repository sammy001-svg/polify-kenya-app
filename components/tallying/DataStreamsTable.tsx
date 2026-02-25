"use client";

import { motion } from "framer-motion";
const MOCK_STREAMS = [
  { constituency: "Kibra", candidate: "Raila Odinga", votes: "45,231", pct: "72%", status: "VERIFIED" },
  { constituency: "Westlands", candidate: "William Ruto", votes: "38,904", pct: "48%", status: "OK" },
  { constituency: "Lang'ata", candidate: "Raila Odinga", votes: "41,120", pct: "55%", status: "SYNCING" },
  { constituency: "Dagoretti N.", candidate: "William Ruto", votes: "35,780", pct: "52%", status: "OK" },
  { constituency: "Mathare", candidate: "Raila Odinga", votes: "29,450", pct: "68%", status: "VERIFIED" },
  { constituency: "Starehe", candidate: "William Ruto", votes: "31,220", pct: "44%", status: "SYNCING" },
  { constituency: "Kasarani", candidate: "Kalonzo Musyoka", votes: "22,890", pct: "38%", status: "OK" },
  { constituency: "Ruaraka", candidate: "Raila Odinga", votes: "27,660", pct: "61%", status: "VERIFIED" },
  { constituency: "Embakasi N.", candidate: "William Ruto", votes: "33,410", pct: "50%", status: "OK" },
  { constituency: "Roysambu", candidate: "William Ruto", votes: "28,900", pct: "46%", status: "SYNCING" },
];

export function DataStreamsTable() {
  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="w-1 h-3 bg-kenya-green" />
          <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50">
            Data Streams [Live]
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-[8px] font-mono text-kenya-green/40 uppercase tracking-widest">
          SYS_STATUS: NOMINAL
        </div>
      </div>

      <div className="flex-1 rounded-xl overflow-hidden border border-white/5 bg-black/40 relative">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-kenya-green animate-scanline z-20 opacity-30" />
        
        <table className="w-full text-left text-[8px] border-collapse">
          <thead className="bg-kenya-green/10 text-kenya-green uppercase tracking-widest font-black sticky top-0 z-10">
            <tr>
              <th className="px-3 py-1.5 border-b border-white/5">Constituency</th>
              <th className="px-3 py-1.5 border-b border-white/5 text-right font-mono">Votes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/3">
            {MOCK_STREAMS.map((stream, idx) => (
              <motion.tr
                key={idx}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="hover:bg-kenya-green/5 transition-colors group cursor-crosshair"
              >
                <td className="px-3 py-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`w-1 h-1 rounded-full ${stream.status === "SYNCING" ? "bg-yellow-400" : "bg-kenya-green"} shadow-[0_0_5px_currentColor]`} />
                    <div className="flex flex-col">
                      <span className="font-bold text-white uppercase tracking-tighter truncate max-w-[100px]">
                        {stream.constituency}
                      </span>
                      <span className="text-[6px] text-white/20 uppercase tracking-tight">{stream.candidate}</span>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-1.5 text-right font-mono">
                  <div className="text-white group-hover:text-kenya-green transition-colors">{stream.votes}</div>
                  <div className="text-[8px] text-kenya-green/60">{stream.pct}</div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Table Footer Detail */}
      <div className="flex justify-between items-center px-1 text-[7px] font-mono text-white/20 uppercase tracking-[0.2em]">
        <span>Buffer: 4.2 MB</span>
        <span>Packets: 102,441</span>
      </div>
    </div>
  );
}
