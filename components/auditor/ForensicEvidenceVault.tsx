"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  CheckCircle,
  Eye,
  Fingerprint,
  ShieldAlert,
  Download,
  Share2,
  ChevronRight,
  Maximize2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AuditReport, ForensicQuery } from "@/lib/auditor-data";

interface ForensicEvidenceVaultProps {
  report: AuditReport | null;
}

export function ForensicEvidenceVault({ report }: ForensicEvidenceVaultProps) {
  const [activeQuery, setActiveQuery] = useState<ForensicQuery | null>(null);
  const [isScanning, setIsScanning] = useState(true); // Initialize as true to avoid sync setState in effect
  const [visibleQueries, setVisibleQueries] = useState<ForensicQuery[]>([]);

  useEffect(() => {
    if (!report) return;

    // We initialize isScanning to true in useState to avoid sync setState here.
    // The key-based remount (in parent) handles state reset for new reports.

    const timer = setTimeout(() => {
      setVisibleQueries(report.forensicData || []);
      setIsScanning(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [report]); 

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center h-[700px] bg-black/40 backdrop-blur-xl border border-white/10 rounded-[40px] opacity-40">
        <Fingerprint className="w-20 h-20 mb-6 text-white/20" />
        <p className="text-sm font-black uppercase tracking-widest text-white/40">Select a report below to initiate forensic scan</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="grid grid-cols-12 gap-6 h-[700px] bg-black/40 backdrop-blur-xl border border-white/10 rounded-[40px] overflow-hidden"
    >
      {/* Left Pane: Document Viewer */}
      <div className="col-span-12 lg:col-span-7 relative border-r border-white/5 bg-black/20 flex flex-col">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/2">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-kenya-dark-orange/20 rounded-lg">
                    <FileText className="w-5 h-5 text-kenya-dark-orange" />
                </div>
                <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-tighter truncate max-w-[300px]">
                      {report.id.toUpperCase().replace(/-/g, '_')}.PDF
                    </h3>
                    <p className="text-[10px] text-brand-text-muted font-mono uppercase">
                      ENTITY: {report.entity} {" // "} FISCAL: {report.fiscalYear}
                    </p>
                </div>
            </div>
            <div className="flex gap-2">
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white">
                    <Download className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white">
                    <Maximize2 className="w-4 h-4" />
                </button>
            </div>
        </div>

        {/* Simulated PDF Content */}
        <div className="flex-1 overflow-y-auto p-12 space-y-8 font-serif text-white/70 relative">
            <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
            
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="text-center space-y-2 mb-12">
                    <h4 className="text-2xl font-bold italic text-white/90 underline decoration-kenya-dark-orange/50 uppercase tracking-tighter">OFFICE OF THE AUDITOR GENERAL</h4>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">{report.fiscalYear} Audit Review</p>
                </div>

                <div className="space-y-4 text-justify leading-relaxed">
                    <h5 className="text-lg font-bold text-white mb-4 underline decoration-white/20">{report.title}</h5>
                    <p className="text-sm">
                      {report.summary} Our forensic audit team sampled 24% of the total expenditure to determine if value for money was achieved in accordance with Article 229 of the Constitution.
                    </p>
                    
                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl italic space-y-4">
                      <p className="text-xs font-black uppercase text-kenya-gold tracking-widest">Key Findings Summary</p>
                      <ul className="text-xs space-y-2">
                        {report.keyFindings.map((finding, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-kenya-dark-orange shrink-0">0{i+1}.</span> {finding}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="opacity-50">
                      [...] The lack of documentation suggests a systemic failure in the procurement process. 
                      Further scanning of subsequent quarters is required to determine the full extent of the leakage. 
                      The OAG recommends immediate recovery of funds for projects certified but not completed.
                    </p>
                </div>

                {/* AI Analysis Overlay */}
                <div className="pt-8 border-t border-white/5 space-y-4 italic text-[10px] font-mono text-white/20 uppercase tracking-widest">
                    <p>[ END OF DIGITIZED SUMMARY ] -- STANDBY FOR FULL ANOMALY SCAN...</p>
                </div>
            </div>
        </div>

        {/* Viewer Footer Hub */}
        <div className="p-4 border-t border-white/10 bg-black/40 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-black bg-brand-surface flex items-center justify-center text-[8px] font-bold text-white/60">
                            {i}
                        </div>
                    ))}
                </div>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">3 AI Auditors Active</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="h-1.5 w-24 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${report.completionPct || 10}%` }}
                        transition={{ duration: 2 }}
                        className="h-full bg-kenya-dark-orange" 
                    />
                </div>
                <span className="text-[10px] font-mono text-kenya-dark-orange">{report.completionPct || 10}% SCANNED</span>
            </div>
        </div>
      </div>

      {/* Right Pane: AI Analysis */}
      <div className="col-span-12 lg:col-span-5 p-6 flex flex-col gap-6 overflow-y-auto">
        <div className="flex items-center justify-between">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                <Fingerprint className="w-4 h-4 text-kenya-dark-orange" />
                FORENSIC_ANOMALIES
            </h4>
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-kenya-dark-orange/10 border border-kenya-dark-orange/30 text-[9px] font-bold text-kenya-dark-orange animate-pulse">
                SCANNED_LIVE
            </span>
        </div>

        <div className="space-y-4">
            <AnimatePresence mode="popLayout">
                {isScanning ? (
                    <div className="py-20 flex flex-col items-center justify-center text-center opacity-40">
                        <RefreshCwIcon className="w-8 h-8 text-white animate-spin mb-3" />
                        <p className="text-[10px] font-black uppercase tracking-widest">Feeding document to Neural Audit...</p>
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
                                "group p-4 bg-white/3 border rounded-2xl cursor-pointer transition-all",
                                activeQuery?.id === query.id ? "border-kenya-dark-orange/50 bg-kenya-dark-orange/5" : "border-white/5 hover:border-white/10"
                            )}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-mono text-white/40">{query.id}</span>
                                        <Badge variant={query.status === 'flagged' ? 'destructive' : 'secondary'} className="text-[8px] h-4 uppercase tracking-tighter">
                                            {query.category}
                                        </Badge>
                                    </div>
                                    <h5 className="font-bold text-white text-sm tracking-tight leading-none group-hover:text-kenya-dark-orange transition-colors">
                                        Amount: Ksh {query.amount}
                                    </h5>
                                </div>
                                <div className="p-1.5 bg-black/40 rounded-lg group-hover:bg-kenya-dark-orange/20 transition-colors">
                                    <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-kenya-dark-orange" />
                                </div>
                            </div>
                            <p className="text-xs text-brand-text-muted leading-relaxed line-clamp-2">
                                {query.description}
                            </p>
                            <div className="mt-3 pt-3 border-t border-white/5 flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                                <span className="text-white/20">FOUND ON PAGE {query.page}</span>
                                {query.status === 'flagged' && <span className="text-kenya-dark-orange flex items-center gap-1"><ShieldAlert className="w-3 h-3" /> CRITICAL</span>}
                            </div>
                        </motion.div>
                    ))
                ) : (
                  <div className="py-20 flex flex-col items-center justify-center text-center opacity-40">
                    <CheckCircle className="w-8 h-8 text-kenya-green mb-3" />
                    <p className="text-[10px] font-black uppercase tracking-widest">No anomalies detected in this section</p>
                  </div>
                )}
            </AnimatePresence>
        </div>

        {/* Global Action Terminal */}
        <div className="mt-auto p-4 bg-kenya-dark-orange/5 border border-kenya-dark-orange/20 rounded-2xl space-y-3">
            <h6 className="text-[10px] font-black text-kenya-dark-orange uppercase tracking-widest">Direct Citizen Action</h6>
            <p className="text-xs text-white/50 leading-relaxed italic">
                Our AI has flagged these entries based on OAG Report inconsistencies. 
            </p>
            <div className="flex gap-2">
                <button className="flex-1 py-2 bg-kenya-dark-orange text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg shadow-kenya-dark-orange/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                    <Share2 className="w-3 h-3" /> Export Evidence
                </button>
                <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2">
                    <Eye className="w-3 h-3" /> Verify Link
                </button>
            </div>
        </div>
      </div>
    </motion.div>
  );
}

function RefreshCwIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'destructive' | 'secondary';
  className?: string;
}

function Badge({ children, variant, className }: BadgeProps) {
    return (
        <span className={cn(
            "px-2 py-0.5 rounded-md font-bold text-center",
            variant === 'destructive' ? "bg-kenya-dark-orange/20 text-kenya-dark-orange border border-kenya-dark-orange/30" : "bg-white/10 text-white/60 border border-white/10",
            className
        )}>
            {children}
        </span>
    )
}
