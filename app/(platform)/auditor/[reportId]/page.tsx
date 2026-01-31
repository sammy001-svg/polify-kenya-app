import { notFound } from "next/navigation";
import Link from "next/link";
import { AUDIT_REPORTS } from "@/lib/auditor-data";
import { AuditComments } from "@/components/auditor/AuditComments";
import { ChevronLeft, Calendar, Building2, Download, Share2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{
    reportId: string;
  }>;
}

export default async function AuditReportDetailPage({ params }: PageProps) {
  const { reportId } = await params;
  const report = AUDIT_REPORTS.find((r) => r.id === reportId);

  if (!report) {
    notFound();
  }

  const isAdverse = report.opinion === "Adverse" || report.opinion === "Disclaimer";

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Navigation */}
      <Link 
        href="/auditor" 
        className="inline-flex items-center text-sm text-brand-text-muted hover:text-white transition-colors"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to Reports
      </Link>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 text-sm text-brand-text-muted font-medium">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full">
                <Building2 className="w-3.5 h-3.5" />
                {report.entity}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full">
                <Calendar className="w-3.5 h-3.5" />
                {report.fiscalYear}
            </span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
            {report.title}
        </h1>

        <div className="flex items-center gap-4 flex-wrap">
             <Badge 
                variant="outline" 
                className={cn(
                    "text-sm px-3 py-1", 
                    isAdverse ? "text-kenya-red border-kenya-red/50 bg-kenya-red/10 animate-pulse" : "text-kenya-green border-kenya-green/50 bg-kenya-green/10"
                )}
            >
                {report.opinion} Opinion
             </Badge>
             
             {report.financialLoss && (
                 <span className="text-red-400 font-bold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Possible Loss: {report.financialLoss}
                 </span>
             )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Report Details */}
        <div className="lg:col-span-2 space-y-8">
            {/* Summary */}
            <div className="bg-brand-surface border border-white/5 rounded-2xl p-6 md:p-8">
                <h2 className="text-xl font-bold text-white mb-4">Executive Summary</h2>
                <p className="text-brand-text-muted leading-relaxed text-lg">
                    {report.summary}
                </p>
            </div>

            {/* Key Findings */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">Key Findings</h2>
                <div className="grid gap-4">
                    {report.keyFindings.map((finding, index) => (
                        <div key={index} className="flex gap-4 bg-brand-surface-secondary border border-white/5 p-4 rounded-xl">
                            <div className="shrink-0 w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary font-bold text-sm">
                                {index + 1}
                            </div>
                            <p className="text-brand-text leading-relaxed">
                                {finding}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

             {/* Actions */}
             <div className="flex gap-4 pt-4">
                {report.officialUrl && (
                    <a href={report.officialUrl} target="_blank" rel="noopener noreferrer">
                        <Button className="gap-2 bg-brand-primary text-black hover:bg-brand-primary/90">
                            <Download className="w-4 h-4" />
                            View Official PDF
                        </Button>
                    </a>
                )}
                <Button variant="outline" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Share Report
                </Button>
             </div>
        </div>

        {/* Right Column: Discussion */}
        <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
                <div className="p-4 bg-linear-to-br from-purple-900/40 to-brand-bg border border-purple-500/20 rounded-2xl">
                    <h3 className="font-bold text-white mb-1">Citizen Verdict</h3>
                    <p className="text-sm text-brand-text-muted mb-3">Does this report align with your experience on the ground?</p>
                    <div className="flex gap-2">
                         <Button size="sm" variant="ghost" className="flex-1 bg-green-500/10 hover:bg-green-500/20 text-green-400">
                            Verified
                         </Button>
                         <Button size="sm" variant="ghost" className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400">
                            Disputed
                         </Button>
                    </div>
                </div>

                <AuditComments reportId={report.id} />
            </div>
        </div>

      </div>
    </div>
  );
}
