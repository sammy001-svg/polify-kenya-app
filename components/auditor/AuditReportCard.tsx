"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { AuditReport } from '@/lib/auditor-data';
import { 
  Download, 
  ExternalLink,
  MapPin,
  Building2,
  Fingerprint
} from 'lucide-react';

interface AuditReportCardProps {
  report: AuditReport;
  onSelect?: (report: AuditReport) => void;
}

export const AuditReportCard: React.FC<AuditReportCardProps> = ({ report, onSelect }) => {
  const getOpinionColor = (opinion: string) => {
    switch (opinion) {
      case 'Unmodified (Clean)': return 'text-emerald-400 border-emerald-500/30';
      case 'Qualified': return 'text-blue-400 border-blue-500/30';
      case 'Adverse': return 'text-red-400 border-red-500/30';
      case 'Disclaimer': return 'text-amber-400 border-amber-500/30';
      default: return 'text-gray-400 border-gray-500/30';
    }
  };

  const getOpinionBg = (opinion: string) => {
    switch (opinion) {
      case 'Unmodified (Clean)': return 'bg-emerald-500/5';
      case 'Qualified': return 'bg-blue-500/5';
      case 'Adverse': return 'bg-red-500/5';
      case 'Disclaimer': return 'bg-amber-500/5';
      default: return 'bg-gray-500/5';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      onClick={() => onSelect?.(report)}
      className={`group relative border ${getOpinionColor(report.opinion)} ${getOpinionBg(report.opinion)} rounded-lg p-5 cursor-pointer overflow-hidden backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.3)]`}
    >
      {/* HUD Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-inherit opacity-20" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-inherit opacity-20" />
      
      {/* Background Pulse for Adverse/Disclaimer */}
      {(report.opinion === 'Adverse' || report.opinion === 'Disclaimer') && (
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className={`absolute inset-0 ${report.opinion === 'Adverse' ? 'bg-red-500/5' : 'bg-amber-500/5'}`}
        />
      )}

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest text-white/40">
              <Fingerprint className="w-3 h-3" />
              <span>SCAN_ID::{report.id.toUpperCase()}</span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-inherit transition-colors leading-tight">
              {report.title}
            </h3>
          </div>
          <div className={`px-2 py-1 rounded bg-black/40 border border-white/10 text-[10px] font-mono font-bold ${getOpinionColor(report.opinion)}`}>
            {report.opinion.toUpperCase()}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 font-mono text-[11px]">
          <div className="flex items-center gap-2 text-white/50">
            <Building2 className="w-3.5 h-3.5" />
            <span className="truncate">{report.entity}</span>
          </div>
          <div className="flex items-center gap-2 text-white/50 justify-end">
            <MapPin className="w-3.5 h-3.5" />
            <span>{report.region}</span>
          </div>
        </div>

        <p className="text-xs text-gray-400 mb-6 line-clamp-2 leading-relaxed italic border-l-2 border-white/10 pl-3 min-h-[32px]">
          &ldquo;{report.summary}&rdquo;
        </p>

        <div className="flex justify-between items-center bg-black/20 -mx-5 -mb-5 p-4 border-t border-white/10">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-white/40 font-mono">Forensic Risk</span>
            <span className={`text-sm font-bold ${report.financialLoss && report.financialLoss !== 'KES 0' ? 'text-white' : 'text-emerald-400/50'}`}>
              {report.financialLoss || "NOT FLAGGED"}
            </span>
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-white/5 hover:bg-white/10 rounded-md transition-colors border border-white/10">
              <Download className="w-4 h-4 text-white/70" />
            </button>
            <button className="p-2 bg-white/5 hover:bg-white/10 rounded-md transition-colors border border-white/10">
              <ExternalLink className="w-4 h-4 text-white/70" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
