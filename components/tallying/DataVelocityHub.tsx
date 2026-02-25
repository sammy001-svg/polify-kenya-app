"use client";

import { motion } from "framer-motion";
import { Zap, Activity, TrendingUp, Cpu } from "lucide-react";
import { useEffect, useState } from "react";

export function DataVelocityHub() {
  const [velocity, setVelocity] = useState(1284);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setVelocity(prev => prev + (Math.floor(Math.random() * 200) - 100));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const [waveformData] = useState(() => 
    Array.from({ length: 24 }).map(() => ({
      heights: [
        `${20 + Math.random() * 60}%`,
        `${40 + Math.random() * 40}%`,
        `${20 + Math.random() * 60}%`
      ],
      duration: 1 + Math.random()
    }))
  );

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 space-y-6 relative overflow-hidden group">
        {/* Background Decorative Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[20px_20px]" />
        </div>

        <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-kenya-gold/20 rounded-xl border border-kenya-gold/30">
                    <Zap className="w-5 h-5 text-kenya-gold animate-pulse" />
                </div>
                <div>
                    <h4 className="text-[11px] font-black text-white uppercase tracking-[0.2em]">Data Velocity Hub</h4>
                    <p className="text-[9px] text-white/30 font-black uppercase tracking-[0.3em]">Network_Throttling: OFF</p>
                </div>
            </div>
            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-2">
                <Activity className="w-3 h-3 text-kenya-green" />
                <span className="text-[9px] font-black text-kenya-green uppercase tracking-widest">Stream_Live</span>
            </div>
        </div>

        <div className="space-y-2 relative z-10">
            <div className="flex items-end justify-between">
                <div>
                    <div className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Votes Ingested / Sec</div>
                    <div className="text-3xl font-black text-white tracking-tighter">
                        {velocity.toLocaleString()}
                        <span className="text-[10px] text-kenya-gold ml-2 font-mono">TPS</span>
                    </div>
                </div>
                <div className="text-right">
                    <div className="flex items-center gap-1 justify-end text-kenya-green font-black text-[10px] uppercase mb-1">
                        <TrendingUp className="w-3 h-3" /> +12.4%
                    </div>
                    <div className="text-[8px] font-black text-white/20 uppercase tracking-widest">Vs Last Sync</div>
                </div>
            </div>

            {/* Simulated Live Waveform */}
            <div className="h-16 flex items-end gap-1 pt-4">
                {waveformData.map((data, i) => (
                    <motion.div
                        key={i}
                        initial={{ height: "20%" }}
                        animate={{ height: data.heights }}
                        transition={{ duration: data.duration, repeat: Infinity, ease: "easeInOut" }}
                        className="flex-1 bg-linear-to-t from-kenya-gold/40 to-kenya-gold rounded-t-sm"
                    />
                ))}
            </div>
        </div>

        <div className="grid grid-cols-2 gap-3 relative z-10">
            <div className="p-3 bg-white/5 border border-white/5 rounded-2xl flex flex-col justify-between">
                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Node Health</span>
                <div className="flex items-center gap-2 mt-2">
                    <Cpu className="w-3 h-3 text-white/40" />
                    <span className="text-xs font-black text-white">OPTIMAL</span>
                </div>
            </div>
            <div className="p-3 bg-white/5 border border-white/5 rounded-2xl flex flex-col justify-between">
                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Active Links</span>
                <div className="flex items-center gap-2 mt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-kenya-green shadow-[0_0_8px_#00ff80]" />
                    <span className="text-xs font-black text-white">47,204</span>
                </div>
            </div>
        </div>
    </div>
  );
}
