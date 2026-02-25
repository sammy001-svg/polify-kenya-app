"use client";

import { useState } from "react";
import { AUDIT_REPORTS, AuditReport } from "@/lib/auditor-data";
import { AuditReportCard } from "@/components/auditor/AuditReportCard";
import { Search, ShieldAlert, Database, Scale, Filter, Info, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ForensicEvidenceVault } from "@/components/auditor/ForensicEvidenceVault";
import { LeakageHeatmap } from "@/components/auditor/LeakageHeatmap";
import { RequestScanModal } from "@/components/auditor/RequestScanModal";
import { motion } from "framer-motion";

export default function AuditorGeneralPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeReport, setActiveReport] = useState<AuditReport | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const filteredReports = AUDIT_REPORTS.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.entity.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const criticalFindings = AUDIT_REPORTS.filter(r => r.opinion === "Adverse").length;
  const totalQueried = "KES 14.2B"; // Mock aggregated value

  const handleInvestigate = (report: AuditReport) => {
    setActiveReport(report);
    const element = document.getElementById('forensic-vault');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Investigation HUD Header */}
      <div className="relative p-8 bg-brand-bg rounded-[40px] border border-white/5 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <ShieldAlert className="w-64 h-64 text-kenya-dark-orange" />
        </div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-1 border border-kenya-dark-orange bg-kenya-dark-orange" />
                    <span className="text-[10px] font-black text-kenya-dark-orange uppercase tracking-[0.4em]">Forensic Audit Division</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none italic uppercase">
                    Auditor General&apos;s <span className="text-kenya-dark-orange">Forensic</span> Eye
                </h1>
                <p className="text-brand-text-muted max-w-xl text-lg leading-relaxed">
                    Analyzing public expenditure through the lens of algorithmic accountability. 
                    Search for specific audit queries or explore AI-highlighted anomalies.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-white/3 border border-white/5 rounded-3xl backdrop-blur-md">
                    <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Critical Opinions</div>
                    <div className="text-3xl font-black text-kenya-dark-orange italic tracking-tighter">{criticalFindings}</div>
                    <div className="text-[9px] font-bold text-kenya-dark-orange/60 uppercase mt-1 flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3" /> ADVERSE_OPINIONS
                    </div>
                </div>
                <div className="p-6 bg-white/3 border border-white/5 rounded-3xl backdrop-blur-md">
                    <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Total Funds Queried</div>
                    <div className="text-3xl font-black text-white italic tracking-tighter">{totalQueried}</div>
                    <div className="text-[9px] font-bold text-white/20 uppercase mt-1 flex items-center gap-1">
                        <Database className="w-3 h-3" /> FORENSIC_SCAN_2024
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Featured Investigation: Evidence Vault */}
      <div id="forensic-vault" className="space-y-6">
        <div className="flex items-center justify-between px-4">
            <h2 className="text-xs font-black text-white uppercase tracking-[0.3em] flex items-center gap-2">
                <Scale className="w-4 h-4 text-brand-primary" />
                Featured_Investigation_Module_V1.2
            </h2>
            <div className="flex items-center gap-2 text-[10px] font-black text-white/30 uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-kenya-green animate-pulse" />
                Live_Sync_Stable
            </div>
        </div>
        <ForensicEvidenceVault key={activeReport?.id || 'empty'} report={activeReport} />
      </div>

      {/* Leakage Heatmap Section */}
      <div className="space-y-6">
         <div className="flex items-center justify-between px-4">
            <h2 className="text-xs font-black text-white uppercase tracking-[0.3em] flex items-center gap-2">
                <Database className="w-4 h-4 text-kenya-dark-orange" />
                Regional_Loss_Vector_Analysis
            </h2>
         </div>
         <LeakageHeatmap />
      </div>

      {/* Global Repository Explorer */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
            <div className="space-y-1">
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Repository Explorer</h3>
                <p className="text-sm text-brand-text-muted">Browse the full database of digitized OAG reports.</p>
            </div>

            <div className="flex items-center gap-3">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 h-4 w-4 group-focus-within:text-brand-primary transition-colors" />
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Filter by Entity or Keyword..." 
                        className="bg-white/3 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition-all w-full md:w-80"
                    />
                </div>
                <button className="p-3 bg-white/3 border border-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <Filter className="w-4 h-4 text-white/40" />
                </button>
            </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {filteredReports.slice(0, 9).map((report, idx) => (
                <motion.div
                    key={report.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                >
                    <AuditReportCard 
                      report={report} 
                      onInvestigate={handleInvestigate}
                      isActive={activeReport?.id === report.id}
                    />
                </motion.div>
            ))}
        </div>

        {/* Pagination / Load More HUD */}
        <div className="flex flex-col items-center gap-4 py-12">
            <div className="h-px w-32 bg-linear-to-r from-transparent via-white/10 to-transparent" />
            <Button variant="outline" className="rounded-full border-white/10 hover:bg-white/5 text-xs font-black uppercase tracking-widest h-12 px-10 gap-2">
                Scan More Documents <ChevronDown className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2 text-[10px] text-white/20 font-mono">
                [ SHOWING {Math.min(9, filteredReports.length)} OF {filteredReports.length} ENTRIES ]
            </div>
        </div>
      </div>

      {/* Support / Request Section */}
      <div className="p-12 border border-dashed border-white/10 rounded-[40px] text-center bg-white/1 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,119,6,0.02),transparent_70%)]" />
            <div className="relative z-10 max-w-xl mx-auto space-y-6">
                <div className="w-16 h-16 bg-brand-surface rounded-2xl flex items-center justify-center mx-auto border border-white/10 shadow-xl">
                    <Info className="w-8 h-8 text-brand-primary" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Request Forensic Scan</h3>
                    <p className="text-brand-text-muted">
                        Can&apos;t find a specific parastatal or county report? Our AI engine is constantly digitizing 
                        hard-copy OAG reports. Submit a request to prioritize a specific entity.
                    </p>
                </div>
                <div className="flex gap-4 justify-center">
                    <Button 
                      variant="primary" 
                      onClick={() => setIsRequestModalOpen(true)}
                      className="h-12 px-8 font-black uppercase tracking-widest text-xs"
                    >
                      Submit Request
                    </Button>
                    <Button variant="secondary" className="h-12 px-8 font-black uppercase tracking-widest text-xs">View Status</Button>
                </div>
            </div>
       </div>

       <RequestScanModal isOpen={isRequestModalOpen} onClose={() => setIsRequestModalOpen(false)} />
    </div>
  );
}
