"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  CheckCircle,
  Fingerprint,
  ShieldAlert,
  Download,
  Share2,
  ChevronRight,
  Maximize2,
  AlertTriangle,
  FileSearch,
  Lock,
  Terminal
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AuditReport, ForensicQuery } from "@/lib/auditor-data";

interface ForensicEvidenceVaultProps {
  report: AuditReport | null;
}

export function ForensicEvidenceVault({ report }: ForensicEvidenceVaultProps) {
  const [activeQuery, setActiveQuery] = useState<ForensicQuery | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [visibleQueries, setVisibleQueries] = useState<ForensicQuery[]>([]);

  useEffect(() => {
    if (!report) return;

    const timer = setTimeout(() => {
      setVisibleQueries(report.forensicData || []);
      setIsScanning(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [report]); 

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl opacity-40">
        <Fingerprint className="w-16 h-16 mb-6 text-white/20" />
        <p className="text-sm font-mono uppercase tracking-widest text-white/40">Probe system to initiate scan</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 h-full bg-black/20 overflow-hidden font-mono">
      {/* Left Pane: Document Viewer (The "Dossier") */}
      <div className="col-span-12 lg:col-span-7 relative border-r border-white/10 bg-black/40 flex flex-col overflow-hidden">
        {/* Scanned Paper Texture & Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-20">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-size-[100%_2px,3px_100%]" />
        </div>

        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/60 relative z-30">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded border border-emerald-500/30">
                    <FileText className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-tighter truncate max-w-[250px]">
                      {report.id.toUpperCase().replace(/-/g, '_')}_SCAN.PDF
                    </h3>
                    <div className="flex items-center gap-2 text-[8px] text-emerald-500/50 uppercase font-bold tracking-widest mt-0.5">
                      <span className="animate-pulse">●</span> READ_ONLY_ENCRYPTED_STREAM
                    </div>
                </div>
            </div>
            <div className="flex gap-2">
                <button className="p-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-all">
                    <Maximize2 className="w-3.5 h-3.5 text-white/40" />
                </button>
            </div>
        </div>

        {/* Simulated Document Content */}
        <div className="flex-1 overflow-y-auto p-10 space-y-8 relative z-10 selection:bg-red-500/30">
            <div className="max-w-2xl mx-auto space-y-8">
                {/* OAG Header */}
                <div className="flex flex-col items-center text-center space-y-4 mb-12 relative">
                    {/* Flagged Stamp for Adverse/Disclaimer */}
                    {(report.opinion === 'Adverse' || report.opinion === 'Disclaimer') && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 2, rotate: -20 }}
                        animate={{ opacity: 0.6, scale: 1 }}
                        className="absolute top-10 -right-4 border-4 border-red-600 px-4 py-1 text-red-600 font-bold text-2xl uppercase tracking-[0.2em] -rotate-12 pointer-events-none"
                      >
                        {report.opinion === 'Adverse' ? 'FLAGGED' : 'RESTRICTED'}
                      </motion.div>
                    )}
                    
                    <div className="w-12 h-12 border-2 border-white/20 rounded-full flex items-center justify-center">
                      <ShieldAlert className="w-6 h-6 text-white/40" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold text-white uppercase tracking-tighter">Office of the Auditor General</h4>
                      <p className="text-[10px] uppercase tracking-[0.5em] text-white/30">Republic of Kenya :: Audit Summary</p>
                    </div>
                    <div className="w-full h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)]" />
                </div>

                <div className="space-y-6 text-sm text-white/60 leading-relaxed font-serif italic text-justify">
                    <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                      <span className="text-[10px] font-bold text-white/40 uppercase font-mono tracking-widest italic">Subject:</span>
                      <span className="text-white font-bold uppercase tracking-tighter font-serif">{report.title}</span>
                    </div>

                    <p>
                      {report.summary} In accordance with Article 229 of the Constitution of Kenya, we have audited the financial statements for the period ended {report.fiscalYear}. 
                    </p>
                    
                    <div className="p-6 bg-white/2 border border-white/10 rounded-lg space-y-4 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
                        <Terminal className="w-8 h-8 text-white" />
                      </div>
                      <h5 className="text-[10px] font-bold uppercase text-emerald-500 tracking-[0.3em]">EXECUTIVE_SUMMARY_FINDINGS</h5>
                      <ul className="text-xs space-y-3 font-mono not-italic mt-2">
                        {report.keyFindings.map((finding, i) => (
                          <li key={i} className="flex gap-3 text-white/70">
                            <span className="text-emerald-500 shrink-0 font-bold">[{i+1}]</span> 
                            <span>{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="opacity-40 text-xs">
                      [DATA_TRUNCATED] :: Full judicial report available via encrypted link. 
                      Evidence chain suggests significant deviation from the Public Procurement and Asset Disposal Act (2015).
                    </p>
                </div>
            </div>
        </div>

        {/* Metadata Footer */}
        <div className="p-4 bg-black/60 border-t border-white/10 flex justify-between items-center text-[9px] font-bold text-white/40 uppercase tracking-widest relative z-30">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><Lock className="w-3 h-3 text-emerald-500/50" /> SHA-256::VERIFIED</span>
            <span className="hidden md:inline">COMPLIANCE_SCORE::{(100 - (report.opinion === 'Adverse' ? 45 : report.opinion === 'Qualified' ? 15 : 0))}%</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-500/70">
            <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${report.completionPct || 15}%` }}
                    className="h-full bg-emerald-500" 
                />
            </div>
            <span>{report.completionPct || 15}% SCAN_COMPLETED</span>
          </div>
        </div>
      </div>

      {/* Right Pane: AI Forensic Analysis */}
      <div className="col-span-12 lg:col-span-5 p-6 flex flex-col gap-6 bg-black/20 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.02] z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1),transparent_70%)]" />
        </div>

        <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <FileSearch className="w-5 h-5 text-emerald-500" />
              <h4 className="text-xs font-black text-white uppercase tracking-[0.25em]">ANOMALY_ENGINE</h4>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[8px] font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full animate-pulse uppercase tracking-tighter">
                Scanning_Live
              </span>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2 relative z-10 custom-scrollbar">
            <AnimatePresence mode="popLayout">
                {isScanning ? (
                    <div className="flex flex-col items-center justify-center h-full opacity-40 py-20">
                        <Terminal className="w-10 h-10 mb-4 animate-bounce text-emerald-500" />
                        <div className="text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2">
                          RUNNING_NEURAL_AUDIT <span className="animate-pulse">...</span>
                        </div>
                    </div>
                ) : visibleQueries.length > 0 ? (
                    visibleQueries.map((query, idx) => (
                        <motion.div
                            key={query.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setActiveQuery(query)}
                            className={cn(
                                "group p-4 bg-white/3 border rounded-lg cursor-pointer transition-all relative overflow-hidden",
                                activeQuery?.id === query.id ? "border-red-500/50 bg-red-500/5" : "border-white/10 hover:border-emerald-500/30"
                            )}
                        >
                            {/* Alert Flash for Active Query */}
                            {activeQuery?.id === query.id && (
                              <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
                            )}

                            <div className="flex justify-between items-start mb-3">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[8px] font-mono text-white/30 tracking-widest">{query.id}</span>
                                        <span className={cn(
                                          "text-[8px] font-bold uppercase px-1.5 py-0.5 rounded border tracking-tighter",
                                          query.status === 'flagged' ? "bg-red-500/10 text-red-500 border-red-500/30" : "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                                        )}>
                                            {query.category}
                                        </span>
                                    </div>
                                    <h5 className="font-bold text-white text-xs tracking-tight uppercase group-hover:text-emerald-400 transition-colors">
                                        Value:: <span className={query.status === 'flagged' ? 'text-red-500' : 'text-emerald-500'}>KES {query.amount}</span>
                                    </h5>
                                </div>
                                <div className="p-1 bg-black/40 rounded border border-white/5 opacity-40">
                                    <ChevronRight className="w-3.5 h-3.5" />
                                </div>
                            </div>
                            <p className="text-[10px] text-white/50 leading-relaxed line-clamp-2 italic font-serif">
                                &ldquo;{query.description}&rdquo;
                            </p>
                            <div className="mt-3 pt-3 border-t border-white/5 flex justify-between items-center text-[8px] font-bold uppercase tracking-widest">
                              <span className="text-white/20">LOC::PAGE_{query.page}</span>
                              {query.status === 'flagged' && (
                                <span className="text-red-500 flex items-center gap-1 animate-pulse">
                                  <AlertTriangle className="w-2.5 h-2.5" /> HIGH_RISK
                                </span>
                              )}
                            </div>
                        </motion.div>
                    ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full opacity-30 py-20">
                    <CheckCircle className="w-10 h-10 mb-4 text-emerald-500" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em]">No direct anomalies detected</p>
                  </div>
                )}
            </AnimatePresence>
        </div>

        {/* Global Terminal Actions */}
        <div className="mt-auto space-y-3 relative z-10 pt-4">
            <div className="flex items-center gap-2 text-[8px] font-bold text-white/30 uppercase tracking-widest mb-1 border-white/5 border-t pt-4">
              <Terminal className="w-3 h-3" /> Execute_Query_Matrix
            </div>
            <div className="grid grid-cols-2 gap-3">
                <button className="py-2.5 bg-red-600/10 hover:bg-red-600/20 border border-red-600/30 text-red-500 text-[10px] font-black uppercase tracking-widest rounded transition-all flex items-center justify-center gap-2 group">
                    <Share2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" /> Export Evidence
                </button>
                <button className="py-2.5 bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-600/30 text-emerald-500 text-[10px] font-black uppercase tracking-widest rounded transition-all flex items-center justify-center gap-2 group">
                    <Download className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" /> Source Report
                </button>
            </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.2);
        }
      `}</style>
    </div>
  );
}
