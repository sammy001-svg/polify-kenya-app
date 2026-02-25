"use client";

import { AuditReport } from "@/lib/auditor-data";
import { AlertCircle, CheckCircle, FileWarning, HelpCircle, Download, Fingerprint } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AuditReportCardProps {
  report: AuditReport;
  onInvestigate?: (report: AuditReport) => void;
  isActive?: boolean;
}

const getOpinionColor = (opinion: AuditReport["opinion"]) => {
  switch (opinion) {
    case "Unmodified (Clean)": return "text-kenya-green border-kenya-green/20 bg-kenya-green/10";
    case "Qualified": return "text-kenya-gold border-kenya-gold/20 bg-kenya-gold/10";
    case "Adverse": return "text-kenya-dark-orange border-kenya-dark-orange/20 bg-kenya-dark-orange/10";
    case "Disclaimer": return "text-brand-text-muted border-white/20 bg-white/5";
    default: return "text-brand-text-muted";
  }
};

export function AuditReportCard({ report, onInvestigate, isActive }: AuditReportCardProps) {
  return (
    <div className={cn(
      "group relative bg-brand-surface border rounded-2xl p-6 transition-all duration-300 hover:shadow-lg overflow-hidden",
      isActive ? "border-kenya-gold ring-1 ring-kenya-gold/30 shadow-[0_0_20px_rgba(253,185,49,0.1)]" : "border-white/5 hover:border-kenya-gold/50"
    )}>
      {/* Background Gradient for Adverse/Qualified */}
      {report.opinion === "Adverse" && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-kenya-dark-orange/5 blur-3xl rounded-full pointer-events-none" />
      )}

      <div className="flex justify-between items-start mb-4">
        <div>
            <div className="text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-1">
                {report.fiscalYear} • {report.entity}
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-kenya-gold transition-colors tracking-tight leading-none italic uppercase">
                {report.title}
            </h3>
        </div>
        <Badge variant="outline" className={cn("flex items-center gap-1.5 whitespace-nowrap", getOpinionColor(report.opinion))}>
            {report.opinion === "Unmodified (Clean)" && <CheckCircle className="w-3.5 h-3.5" />}
            {report.opinion === "Qualified" && <HelpCircle className="w-3.5 h-3.5" />}
            {report.opinion === "Adverse" && <AlertCircle className="w-3.5 h-3.5" />}
            {report.opinion === "Disclaimer" && <FileWarning className="w-3.5 h-3.5" />}
            {report.opinion}
        </Badge>
      </div>

      <p className="text-xs text-brand-text-muted mb-6 line-clamp-2 italic">
        {report.summary}
      </p>

      {report.financialLoss && (
        <div className="mb-6 p-3 bg-kenya-dark-orange/10 border border-kenya-dark-orange/20 rounded-lg flex items-center gap-3">
             <div className="p-2 bg-kenya-dark-orange/20 rounded-full">
                <AlertCircle className="w-4 h-4 text-kenya-dark-orange" />
             </div>
             <div>
                <p className="text-[9px] text-kenya-dark-orange font-black uppercase tracking-widest">Potential Leakage</p>
                <p className="text-base font-black text-white italic tracking-tighter">{report.financialLoss}</p>
             </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <button 
            onClick={() => onInvestigate?.(report)}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white hover:text-kenya-gold transition-colors group/btn"
          >
            {isActive ? "Currently Inspecting" : "Initiate Audit"}
            <Fingerprint className={cn("w-4 h-4 transition-transform", !isActive && "group-hover:scale-110", isActive && "text-kenya-gold")} />
          </button>
         <div className="flex gap-2">
            <button className="p-2 text-brand-text-muted hover:text-white transition-colors" title="Download OAG PDF">
                <Download className="w-4 h-4" />
            </button>
         </div>
      </div>
    </div>
  );
}
