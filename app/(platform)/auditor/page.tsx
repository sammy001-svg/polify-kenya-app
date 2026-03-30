"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Fingerprint,
  LayoutGrid,
  List as ListIcon,
  AlertCircle,
  Database,
  ShieldCheck
} from 'lucide-react';
import { AUDIT_REPORTS, AuditReport } from '@/lib/auditor-data';
import { AuditReportCard } from '@/components/auditor/AuditReportCard';
import { CyberTelemetry } from '@/components/auditor/CyberTelemetry';
import { ForensicEvidenceVault } from '@/components/auditor/ForensicEvidenceVault';

export default function AuditorGeneralPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedReport, setSelectedReport] = useState<AuditReport | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const regions = ["All", "Nairobi", "Coast", "Rift Valley", "Central", "Western", "Nyanza", "North Eastern", "Eastern", "National"];
  const entityTypes = ["All", "National", "County", "Parastatal", "Commission"];

  const filteredReports = useMemo(() => {
    return AUDIT_REPORTS.filter(report => {
      const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           report.entity.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = selectedRegion === "All" || report.region === selectedRegion;
      const matchesType = selectedType === "All" || report.entityType === selectedType;
      return matchesSearch && matchesRegion && matchesType;
    });
  }, [searchQuery, selectedRegion, selectedType]);

  const totalLoss = "KES 8.4 Trillion";

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      {/* HUD Scanlines & Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_2px,3px_100%]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Terminal Header */}
        <header className="border-b border-white/10 pb-6 mb-8 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-emerald-500 font-mono text-xs tracking-[0.3em] uppercase">
              <Fingerprint className="w-5 h-5" />
              <span>Identity Verified :: Citizen Auditor Access</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase italic">
              Forensic <span className="text-emerald-500">HUD</span>
            </h1>
            <p className="text-white/40 max-w-xl font-mono text-xs leading-relaxed uppercase tracking-widest">
              Automated telemetry & audit reconciliation for public expenditure. 
              Real-time anomaly detection across 47 counties and national ministries.
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-2 font-mono">
            <div className="text-[10px] text-white/30 uppercase tracking-widest">System Load Metrics</div>
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-3 rounded-lg backdrop-blur-md">
              <div className="flex flex-col">
                <span className="text-[10px] text-emerald-500/50 uppercase">Anomaly Flag Rate</span>
                <span className="text-xl font-bold">14.2%</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-[10px] text-red-500/50 uppercase">Est. Cumulative Leakage</span>
                <span className="text-xl font-bold text-red-500">{totalLoss}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Telemetry Section */}
        <CyberTelemetry />

        {/* Action Bar / Filtering */}
        <div className="sticky top-4 z-40 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-2xl space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-emerald-500 transition-colors" />
              <input 
                type="text" 
                placeholder="PROBE SYSTEM BY ENTITY OR REPORT ID..."
                className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm font-mono focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-white/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-lg border transition-all ${viewMode === 'grid' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-500' : 'bg-white/5 border-white/10 text-white/40'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-lg border transition-all ${viewMode === 'list' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-500' : 'bg-white/5 border-white/10 text-white/40'}`}
              >
                <ListIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5 font-mono text-[10px]">
            <span className="text-white/30 mr-2 uppercase tracking-tighter flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filters::
            </span>
            <div className="flex flex-wrap gap-1">
              {regions.map(region => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-2 py-1 rounded border transition-all uppercase ${selectedRegion === region ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-500' : 'bg-white/5 border-white/10 text-white/30 hover:text-white'}`}
                >
                  {region === "All" ? "Global" : region}
                </button>
              ))}
            </div>
            <div className="w-px h-4 bg-white/10 mx-1" />
            <div className="flex flex-wrap gap-1">
              {entityTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-2 py-1 rounded border transition-all uppercase ${selectedType === type ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' : 'bg-white/5 border-white/10 text-white/30 hover:text-white'}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredReports.length > 0 ? (
              <motion.div 
                key="results-grid"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-4"
                }
              >
                {filteredReports.map((report) => (
                  <AuditReportCard 
                    key={report.id} 
                    report={report} 
                    onSelect={setSelectedReport}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-2xl bg-white/2"
              >
                <Database className="w-12 h-12 text-white/10 mb-4 animate-pulse" />
                <h3 className="text-xl font-bold text-white/40 font-mono">NO_DATA_RETURNED</h3>
                <p className="text-white/20 text-sm font-mono mt-1">Zero matches for current probe vectors.</p>
                <button 
                  onClick={() => { setSelectedRegion("All"); setSelectedType("All"); setSearchQuery(""); }}
                  className="mt-6 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-emerald-500 text-xs font-mono uppercase hover:bg-emerald-500/20 transition-all"
                >
                  Reset Telemetry
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Forensic Evidence Vault Modal */}
      <AnimatePresence>
        {selectedReport && (
          <div key="modal-container" className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReport(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-5xl h-[85vh] bg-[#0A0A0A] border border-white/20 rounded-xl overflow-hidden relative shadow-[0_0_50px_rgba(16,185,129,0.15)] flex flex-col"
            >
              <div className="p-4 border-b border-white/10 bg-black/40 flex justify-between items-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-emerald-500/50 to-transparent animate-scan" />
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <div className="font-mono">
                    <div className="text-[8px] text-white/40 uppercase tracking-widest leading-none">Confidential Dossier</div>
                    <div className="text-sm font-bold text-white leading-none mt-1 uppercase tracking-tighter">
                      SECURE_FILE::{selectedReport.id.toUpperCase()}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedReport(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"
                >
                  <AlertCircle className="w-5 h-5 rotate-45" />
                </button>
              </div>
              
              <div className="flex-1 overflow-hidden">
                <ForensicEvidenceVault key={selectedReport.id} report={selectedReport} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
