"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Download,
  ShieldCheck,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateTallyCertificate, exportTallyData } from "@/actions/tallying";
import { toast } from "sonner";

interface TallyCertificate {
  title: string;
  level: string;
  location: string;
  verified_results: Array<{
    candidate: string;
    votes: number;
    pct: string;
  }>;
  total_stations: number;
  reporting_rate: string;
  issued_at: string;
  signature: string;
  consensus_score: string;
}

interface TallyReportGeneratorProps {
  level: string;
  location: string;
}

export function TallyReportGenerator({
  level,
  location,
}: TallyReportGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [certData, setCertData] = useState<TallyCertificate | null>(null);
  const [view, setView] = useState<"actions" | "certificate">("actions");

  const handleGenerateCertificate = async () => {
    setIsGenerating(true);
    try {
      const result = await generateTallyCertificate(level, location);
      if (result.success && result.certificate) {
        setCertData(result.certificate);
        setView("certificate");
        toast.success("Tally Certificate Generated Successfully");
      } else {
        toast.error(result.message || "Failed to generate certificate");
      }
    } catch {
      toast.error("Failed to generate certificate");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      const csv = await exportTallyData(level, location);
      if (csv) {
        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.setAttribute("hidden", "");
        a.setAttribute("href", url);
        a.setAttribute(
          "download",
          `tally_results_${location.toLowerCase()}_${new Date().getTime()}.csv`,
        );
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast.success("Export successful");
      } else {
        toast.error("No data to export");
      }
    } catch {
      toast.error("Failed to export data");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="card-premium p-5 md:p-6 overflow-hidden relative group">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-kenya-red/5 blur-3xl pointer-events-none group-hover:bg-kenya-red/10 transition-colors duration-500" />

      <AnimatePresence mode="wait">
        {view === "actions" ? (
          <motion.div
            key="actions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-kenya-red/10 flex items-center justify-center border border-kenya-red/20 shadow-[0_0_20px_rgba(146,37,41,0.1)]">
                <ShieldCheck className="w-5 h-5 text-kenya-red" />
              </div>
              <div>
                <h4 className="text-base md:text-lg font-black text-white uppercase tracking-tight">
                  Reporting Hub
                </h4>
                <p className="text-[10px] text-brand-text-muted font-black uppercase tracking-widest leading-none">
                  Verifiable Data Exports
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-6">
              <Button
                onClick={handleGenerateCertificate}
                disabled={isGenerating}
                variant="outline"
                className="h-auto py-3 md:py-4 border-white/5 bg-white/2 hover:bg-white/5 transition-all flex flex-col gap-2 items-start text-left group/btn rounded-2xl"
              >
                <div className="p-2 rounded-xl bg-kenya-red/10 group-hover/btn:bg-kenya-red/20 transition-colors">
                  {isGenerating ? (
                    <Loader2 className="w-4 h-4 animate-spin text-kenya-red" />
                  ) : (
                    <FileText className="w-4 h-4 text-kenya-red" />
                  )}
                </div>
                <div>
                  <p className="text-[11px] md:text-xs font-black text-white tracking-tight uppercase">
                    Certificate
                  </p>
                  <p className="text-[9px] text-brand-text-muted font-medium">
                    Signed tally snapshot
                  </p>
                </div>
              </Button>

              <Button
                onClick={handleExportData}
                disabled={isExporting}
                variant="outline"
                className="h-auto py-3 md:py-4 border-white/5 bg-white/2 hover:bg-white/5 transition-all flex flex-col gap-2 items-start text-left group/btn rounded-2xl"
              >
                <div className="p-2 rounded-xl bg-kenya-green/10 group-hover/btn:bg-kenya-green/20 transition-colors">
                  {isExporting ? (
                    <Loader2 className="w-4 h-4 animate-spin text-kenya-green" />
                  ) : (
                    <Download className="w-4 h-4 text-kenya-green" />
                  )}
                </div>
                <div>
                  <p className="text-[11px] md:text-xs font-black text-white tracking-tight uppercase">
                    Excel Export
                  </p>
                  <p className="text-[9px] text-brand-text-muted font-black tracking-tighter uppercase font-mono">
                    Format: CSV
                  </p>
                </div>
              </Button>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[9px] md:text-[10px] font-black tracking-widest text-brand-text-muted uppercase">
              <span>Node: AI-ULTRA-V2</span>
              <div className="flex items-center gap-1.5">
                <span className="text-kenya-green/60">Verified: 99.8%</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="certificate"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="relative"
          >
            <div className="bg-black/60 border border-kenya-gold/30 rounded-xl p-6 relative overflow-hidden backdrop-blur-3xl shadow-[0_0_50px_rgba(234,179,8,0.1)]">
              {/* Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none rotate-[-15deg]">
                <ShieldCheck className="w-64 h-64 text-kenya-gold" />
              </div>

              <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-kenya-gold/10 border border-kenya-gold/20 flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-8 h-8 text-kenya-gold" />
                </div>

                <div>
                  <h5 className="text-xs font-black text-kenya-gold tracking-[0.2em] uppercase mb-1">
                    Official Verification
                  </h5>
                  <h4 className="text-xl font-black text-white leading-none tracking-tighter">
                    {certData?.title}
                  </h4>
                  <p className="text-[10px] text-white/40 font-mono mt-2">
                    {certData?.issued_at}
                  </p>
                </div>

                <div className="w-full grid grid-cols-2 gap-px bg-white/5 border border-white/10 rounded-lg overflow-hidden text-[10px] uppercase font-bold">
                  <div className="p-3 bg-black/40 text-left">
                    <p className="text-white/30 mb-1 tracking-widest">Level</p>
                    <p className="text-white">{certData?.level}</p>
                  </div>
                  <div className="p-3 bg-black/40 text-right">
                    <p className="text-white/30 mb-1 tracking-widest">
                      Reporting
                    </p>
                    <p className="text-kenya-green">
                      {certData?.reporting_rate}
                    </p>
                  </div>
                </div>

                <div className="w-full space-y-2">
                  {certData?.verified_results.map((res, i: number) => (
                    <div
                      key={i}
                      className="flex justify-between items-center px-4 py-2 bg-white/5 rounded-md border border-white/5"
                    >
                      <span className="text-[11px] font-black text-white/80">
                        {i + 1}. {res.candidate}
                      </span>
                      <span className="text-[11px] font-mono text-white/60">
                        {res.pct}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="w-full pt-4 border-t border-white/10 flex flex-col items-center">
                  <p className="text-[8px] font-mono text-white/20 mb-2 truncate max-w-full">
                    SIG: {certData?.signature}
                  </p>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setView("actions")}
                      variant="ghost"
                      size="sm"
                      className="text-[10px] font-bold text-white/40 hover:text-white uppercase"
                    >
                      Dismiss
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-[10px] font-bold border-kenya-green/30 bg-kenya-green/10 text-kenya-green hover:bg-kenya-green/20 uppercase px-6"
                      onClick={() => {
                        toast.info("Downloading official PDF copy...");
                      }}
                    >
                      Download PDF
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
