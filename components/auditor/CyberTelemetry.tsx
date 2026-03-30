"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

export const CyberTelemetry = () => {
  const [hexRows, setHexRows] = useState<string[]>([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [activeAnomalies, setActiveAnomalies] = useState(0);

  // Generate random hex strings
  const generateHex = () => {
    return Array.from({ length: 8 }, () => 
      Math.floor(Math.random() * 16).toString(16).toUpperCase()
    ).join(' ');
  };

  // Pre-generate random values for the "crypto" visualization to keep render pure
  const cryptoHeights = useMemo(() => 
    Array.from({ length: 20 }, () => ({
      initialHeight: Math.random() * 8 + 4,
      peakHeight: Math.random() * 12 + 6,
      duration: 0.5 + Math.random() * 1.5
    })), []);

  useEffect(() => {
    // Hex rain effect
    const interval = setInterval(() => {
      setHexRows(prev => {
        const next = [generateHex(), ...prev.slice(0, 12)];
        return next;
      });
    }, 150);

    // Scan progress simulation
    const scanInterval = setInterval(() => {
      setScanProgress(prev => (prev + 0.5) % 100);
      if (Math.random() > 0.95) {
        setActiveAnomalies(Math.floor(Math.random() * 12));
      }
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(scanInterval);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 font-mono text-[10px]">
      {/* Hex Stream Terminal */}
      <div className="bg-black/40 border border-emerald-500/30 p-3 rounded-lg overflow-hidden relative group">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px)] bg-size-[100%_4px] pointer-events-none" />
        <div className="flex justify-between items-center mb-2 text-emerald-400/70 border-b border-emerald-500/20 pb-1">
          <span>DATA_STREAM::LIVE</span>
          <span className="animate-pulse text-emerald-500">●</span>
        </div>
        <div className="h-32 overflow-hidden space-y-1">
          {hexRows.map((hex, i) => (
            <motion.div
              key={`${hex}-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1 - (i * 0.08), x: 0 }}
              className="text-emerald-500/60 whitespace-nowrap"
            >
              {hex} {hex} {hex}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scan Vector Matrix */}
      <div className="bg-black/40 border border-blue-500/30 p-3 rounded-lg flex flex-col justify-between">
        <div className="flex justify-between items-center text-blue-400/70 border-b border-blue-500/20 pb-1 mb-2">
          <span>SYSTEM_SCAN::VECTORS</span>
          <span>{scanProgress.toFixed(1)}%</span>
        </div>
        <div className="flex-1 flex items-center justify-center relative py-4">
          <svg className="w-24 h-24 -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="2"
              strokeOpacity="0.2"
              fill="transparent"
              className="text-blue-500"
            />
            <motion.circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray="251.2"
              animate={{ strokeDashoffset: 251.2 - (251.2 * scanProgress) / 100 }}
              className="text-blue-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-blue-400 text-xs font-bold">{activeAnomalies}</span>
            <span className="text-[8px] text-blue-500/50 uppercase font-bold tracking-tighter">Anomalies Detected</span>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-4 gap-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
              style={{
                backgroundColor: scanProgress > (i * 12) ? 'rgb(59, 130, 246)' : 'rgba(59, 130, 246, 0.1)'
              }}
              className="h-1 rounded-sm"
            />
          ))}
        </div>
      </div>

      {/* Network Latency & Load */}
      <div className="bg-black/40 border border-amber-500/30 p-3 rounded-lg">
        <div className="flex justify-between items-center text-amber-400/70 border-b border-amber-500/20 pb-1 mb-2">
          <span>GATEWAY::STATUS</span>
          <span className="text-[8px] bg-amber-500/20 px-1 rounded font-bold">ENCRYPTED</span>
        </div>
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-[8px] text-amber-500/50 font-bold">
              <span>DB_RELATION_LOAD</span>
              <span>74%</span>
            </div>
            <div className="h-1.5 bg-amber-950/30 rounded-full overflow-hidden border border-amber-500/20">
              <motion.div 
                animate={{ width: ['60%', '85%', '74%'] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="h-full bg-amber-500/50 shadow-[0_0_8px_rgba(245,158,11,0.5)]" 
              />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[8px] text-amber-500/50 font-bold">
              <span>CRYPTO_VERIFICATION</span>
              <span>ACTIVE</span>
            </div>
            <div className="flex gap-1 h-6 items-end">
              {cryptoHeights.map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [h.initialHeight, h.peakHeight, h.initialHeight] }}
                  transition={{ repeat: Infinity, duration: h.duration }}
                  className="w-1 bg-amber-500/30 rounded-t-sm"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
