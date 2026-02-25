"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, ShieldCheck, Search, Database, Fingerprint, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

const AUDIT_TASKS = [
  "Initializing AI Auditor Node V4.2...",
  "Establishing secure handshake with IEBC servers...",
  "Checksum verification: Form 34A (Constituency: Kibra)...",
  "Anomaly detected: Local tally discrepancy (Ward 4). Resolving...",
  "Integrity Lock: Block hash 0x77ae8 confirm...",
  "Scanning optical characters for candidate Raila Odinga...",
  "Cross-referencing polling station GPS coordinates...",
  "Verification Phase 1: COMPLETE. No tempering detected.",
  "Auditing digital signature for station PS-2201...",
  "Applying forensic data analysis on voter turnout...",
  "AI Node: Consensus reached on 1.2M votes.",
  "Monitoring data packet integrity (8.2 GB/s)...",
  "Live Tally Match: 99.98% accuracy confirmed.",
  "Neural verification: Form 34B batch processing...",
  "Analyzing biometric voter register logs...",
  "Detecting pattern anomalies in late-night transmission...",
  "Subsystem Alpha: Synchronized with 47,000 nodes.",
];

export function AIVerificationNode() {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) => {
        const nextLog = AUDIT_TASKS[Math.floor(Math.random() * AUDIT_TASKS.length)];
        return [...prev.slice(-15), nextLog];
      });
      setScanProgress(Math.floor(Math.random() * 100));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="flex flex-col h-full space-y-5">
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
            <div className="relative">
                <div className="p-2 bg-kenya-green/10 rounded-xl border border-kenya-green/20">
                    <Cpu className="w-5 h-5 text-kenya-green" />
                </div>
                <motion.div 
                   animate={{ opacity: [0.2, 1, 0.2] }}
                   transition={{ duration: 1.5, repeat: Infinity }}
                   className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-kenya-green rounded-full shadow-[0_0_10px_#00ff80] border-2 border-black"
                />
            </div>
            <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Neural Auditor</h3>
                <p className="text-[6px] font-black text-kenya-green uppercase tracking-[0.4em]">Subsystem_47_Active</p>
            </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-kenya-green/10 border border-kenya-green/30">
            <ShieldCheck className="w-3.5 h-3.5 text-kenya-green" />
            <span className="text-[8px] font-black text-kenya-green uppercase tracking-widest">Integrity_Secure</span>
        </div>
      </div>

      {/* Hardware Monitoring View */}
      <div className="grid grid-cols-2 gap-3 shrink-0">
        <div className="p-3 bg-white/2 border border-white/5 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-[7px] font-black text-white/30 uppercase tracking-widest">
                <span>Core_Load</span>
                <span>82%</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div animate={{ width: "82%" }} className="h-full bg-linear-to-r from-kenya-green/40 to-kenya-green" />
            </div>
        </div>
        <div className="p-3 bg-white/2 border border-white/5 rounded-2xl space-y-2">
            <div className="flex justify-between items-center text-[7px] font-black text-white/30 uppercase tracking-widest">
                <span>Scan_Index</span>
                <span>{scanProgress}%</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div animate={{ width: `${scanProgress}%` }} className="h-full bg-linear-to-r from-kenya-gold/40 to-kenya-gold" />
            </div>
        </div>
      </div>

      {/* Terminal Display - Darkened and Refined */}
      <div 
        ref={scrollRef}
        className="flex-1 bg-black/80 rounded-2xl border border-white/10 p-5 overflow-y-auto scrollbar-none font-mono text-[9px] space-y-2.5 relative min-h-0"
      >
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-kenya-green/2 to-transparent pointer-events-none" />
        
        <AnimatePresence initial={false}>
            {logs.map((log, i) => (
                <motion.div 
                    key={log + i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex gap-4 items-start group"
                >
                    <span className="text-white/10 shrink-0 select-none">#{1000 + i}</span>
                    <span className={cn(
                        "leading-relaxed transition-colors",
                        log.includes("Anomaly") ? "text-kenya-red font-black" : 
                        log.includes("COMPLETE") || log.includes("confirmed") ? "text-kenya-green font-black" : "text-white/40 group-hover:text-white/80"
                    )}>
                        {log.includes("COMPLETE") ? ">> " + log : log}
                    </span>
                </motion.div>
            ))}
        </AnimatePresence>
        <motion.div 
           animate={{ opacity: [0, 1] }} 
           transition={{ duration: 0.8, repeat: Infinity }}
           className="w-2 h-3 bg-kenya-green/50 mt-1 inline-block blur-[1px]"
        />
      </div>

      <div className="grid grid-cols-4 gap-2 shrink-0">
        {[
            { icon: Search, label: 'SCAN', active: true, color: 'text-kenya-green' },
            { icon: Database, label: 'IEBC', active: true, color: 'text-kenya-gold' },
            { icon: Fingerprint, label: 'Forensic', active: true, color: 'text-kenya-red' },
            { icon: Layers, label: 'Stack', active: true, color: 'text-brand-primary' }
        ].map((btn) => (
            <div key={btn.label} className="flex flex-col items-center gap-1.5 group cursor-pointer">
                <div className={cn(
                    "w-full aspect-square rounded-xl border flex items-center justify-center transition-all bg-white/2 border-white/5 group-hover:scale-105 group-hover:border-white/20",
                )}>
                    <btn.icon className={cn("w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity", btn.color)} />
                </div>
                <span className="text-[7px] font-black text-white/20 uppercase tracking-[0.3em] group-hover:text-white/40 transition-colors">{btn.label}</span>
            </div>
        ))}
      </div>
    </div>
  );
}
