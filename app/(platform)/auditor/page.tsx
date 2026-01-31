import { AUDIT_REPORTS } from "@/lib/auditor-data";
import { AuditReportCard } from "@/components/auditor/AuditReportCard";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuditorGeneralPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">
            Auditor General&apos;s <span className="text-kenya-red">Eye</span>
          </h1>
          <p className="text-brand-text-muted max-w-2xl text-lg">
            Tracking accountability in government spending. Read the reports, discuss the findings, and demand transparency.
          </p>
        </div>
        <div className="flex gap-2">
             {/* Filter placeholders */}
            <Button variant="outline" size="sm" className="hidden md:flex">Filter by Year</Button>
            <Button variant="outline" size="sm" className="hidden md:flex">Filter by Entity</Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-text-muted h-5 w-5" />
        <input 
            type="text" 
            placeholder="Search reports by ministry, county, or keyword..." 
            className="w-full bg-brand-surface border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-brand-text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all"
        />
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {AUDIT_REPORTS.map((report) => (
            <AuditReportCard key={report.id} report={report} />
        ))}
      </div>

       <div className="p-8 border border-dashed border-white/10 rounded-2xl text-center">
            <h3 className="text-white font-bold mb-2">Can&apos;t find a specific report?</h3>
            <p className="text-brand-text-muted mb-4">We are constantly digitizing new reports from the OAG website.</p>
            <Button variant="secondary">Request a Report</Button>
       </div>
    </div>
  );
}
