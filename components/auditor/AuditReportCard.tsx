import Link from "next/link";
import { AuditReport } from "@/lib/auditor-data";
import { AlertCircle, CheckCircle, FileWarning, HelpCircle, ArrowRight, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AuditReportCardProps {
  report: AuditReport;
}

const getOpinionColor = (opinion: AuditReport["opinion"]) => {
  switch (opinion) {
    case "Unmodified (Clean)": return "text-kenya-green border-kenya-green/20 bg-kenya-green/10";
    case "Qualified": return "text-yellow-500 border-yellow-500/20 bg-yellow-500/10";
    case "Adverse": return "text-kenya-red border-kenya-red/20 bg-kenya-red/10";
    case "Disclaimer": return "text-brand-text-muted border-white/20 bg-white/5";
    default: return "text-brand-text-muted";
  }
};

export function AuditReportCard({ report }: AuditReportCardProps) {
  return (
    <div className="group relative bg-brand-surface border border-white/5 rounded-2xl p-6 hover:border-brand-primary/50 transition-all duration-300 hover:shadow-lg overflow-hidden">
      {/* Background Gradient for Adverse/Qualified */}
      {report.opinion === "Adverse" && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-kenya-red/5 blur-3xl rounded-full pointer-events-none" />
      )}

      <div className="flex justify-between items-start mb-4">
        <div>
            <div className="text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-1">
                {report.fiscalYear} • {report.entity}
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-brand-primary transition-colors">
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

      <p className="text-sm text-brand-text-muted mb-6 line-clamp-3">
        {report.summary}
      </p>

      {report.financialLoss && (
        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
             <div className="p-2 bg-red-500/20 rounded-full">
                <AlertCircle className="w-4 h-4 text-kenya-red" />
             </div>
             <div>
                <p className="text-[10px] text-red-300 font-semibold uppercase tracking-wider">Potential Loss</p>
                <p className="text-sm font-bold text-white">{report.financialLoss}</p>
             </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
         <Link href={`/auditor/${report.id}`} className="flex items-center gap-2 text-sm font-medium text-white hover:text-brand-primary transition-colors">
            Read Full Report
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
         </Link>
         <button className="text-brand-text-muted hover:text-white transition-colors" title="Download PDF">
            <Download className="w-4 h-4" />
         </button>
      </div>
    </div>
  );
}
