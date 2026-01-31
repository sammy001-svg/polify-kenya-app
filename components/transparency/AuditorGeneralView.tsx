"use client";

import { AUDIT_REPORTS, AuditReport } from "@/lib/auditor-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Download, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export function AuditorGeneralView() {
  return (
    <div className="space-y-6">
      <div className="bg-brand-surface border border-red-500/20 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-kenya-red" /> Simplified Audit Reports
        </h2>
        <p className="text-sm text-brand-text-muted">
          We translate complex Auditor General reports into clear &quot;opinions&quot; and &quot;key findings&quot; to help you understand where public money might be at risk.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {AUDIT_REPORTS.map((report) => (
          <AuditCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  );
}

function AuditCard({ report }: { report: AuditReport }) {
  const getOpinionColor = (opinion: string) => {
    switch (opinion) {
      case "Unmodified (Clean)": return "text-green-400 bg-green-400/10 border-green-400/20";
      case "Qualified": return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      case "Adverse": return "text-red-400 bg-red-400/10 border-red-400/20";
      case "Disclaimer": return "text-red-500 bg-red-500/10 border-red-500/20";
      default: return "text-brand-text-muted";
    }
  };

  return (
    <Card className="bg-brand-surface border-white/5 overflow-hidden group hover:border-white/10 transition-all">
      <CardHeader className="p-5 flex flex-row items-center justify-between border-b border-white/5 bg-white/[0.02]">
        <div>
          <CardTitle className="text-white text-lg">{report.entity}</CardTitle>
          <div className="text-[10px] text-brand-text-muted uppercase font-black tracking-widest mt-1">
            Fiscal Year: {report.fiscalYear}
          </div>
        </div>
        <div className={cn("px-3 py-1 rounded-full text-xs font-bold border", getOpinionColor(report.opinion))}>
          {report.opinion}
        </div>
      </CardHeader>
      <CardContent className="p-5 space-y-4">
        <p className="text-sm text-brand-text leading-relaxed">
          {report.summary}
        </p>

        {report.financialLoss && (
           <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl">
              <div className="text-[10px] uppercase font-black tracking-widest text-red-400 mb-1">Impact / Variance</div>
              <div className="text-lg font-black text-white">{report.financialLoss}</div>
           </div>
        )}

        <div className="space-y-2">
           <h4 className="text-[10px] uppercase font-black tracking-widest text-brand-text-muted">Key Audit Findings</h4>
           <ul className="space-y-2">
              {report.keyFindings.map((finding, i) => (
                <li key={i} className="text-xs text-brand-text flex items-start gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-kenya-gold mt-1.5 shrink-0" />
                   {finding}
                </li>
              ))}
           </ul>
        </div>

        <div className="flex gap-2 pt-2">
           <Button variant="ghost" size="sm" className="text-[10px] uppercase font-black tracking-widest h-8 gap-1.5 text-brand-text-muted hover:text-white">
              <Download className="w-3.5 h-3.5" /> Full PDF
           </Button>
           <Button variant="ghost" size="sm" className="text-[10px] uppercase font-black tracking-widest h-8 gap-1.5 text-brand-text-muted hover:text-white">
              <ExternalLink className="w-3.5 h-3.5" /> Official Source
           </Button>
        </div>
      </CardContent>
    </Card>
  );
}

import { Button } from "@/components/ui/button";
