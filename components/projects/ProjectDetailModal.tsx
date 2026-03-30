"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  MapPin, 
  Target, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Briefcase, 
  AlertTriangle,
  Building2,
  DollarSign,
  Users
} from 'lucide-react';
import { NationalProject } from '@/lib/national-projects';
import { cn } from '@/lib/utils';

interface ProjectDetailModalProps {
  project: NationalProject | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-100 cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-4xl max-h-[90vh] bg-black/40 border border-white/10 rounded-4xl backdrop-blur-3xl z-101 overflow-hidden flex flex-col shadow-2xl shadow-kenya-gold/10"
          >
            {/* Header / Banner Area */}
            <div className="relative h-48 sm:h-64 bg-linear-to-br from-white/10 via-white/5 to-transparent p-8 flex flex-col justify-end">
              <div className="absolute top-6 right-6">
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                >
                  <X className="w-5 h-5 text-white/50 group-hover:text-white" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                    project.status === 'Completed' ? "bg-kenya-green/20 border-kenya-green/30 text-kenya-green" :
                    project.status === 'In Progress' ? "bg-kenya-gold/20 border-kenya-gold/30 text-kenya-gold" :
                    project.status === 'Stalled' ? "bg-kenya-red/20 border-kenya-red/30 text-kenya-red" :
                    "bg-white/10 border-white/20 text-brand-text-muted"
                  )}>
                    {project.status}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/5 border border-white/10 text-brand-text-muted">
                    {project.category}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white leading-tight">
                  {project.title}
                </h2>
              </div>
              
              {/* Animated Progress Bar at bottom of header */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={cn(
                    "h-full",
                    project.status === 'Completed' ? "bg-kenya-green" :
                    project.status === 'In Progress' ? "bg-kenya-gold" :
                    "bg-kenya-red"
                  )}
                />
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* Left Column: Core Info */}
                <div className="lg:col-span-2 space-y-10">
                  {/* Overview */}
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 text-kenya-gold">
                      <Zap className="w-5 h-5" />
                      <h3 className="text-xs font-black uppercase tracking-[0.2em]">Platform Overview</h3>
                    </div>
                    <p className="text-lg text-brand-text-muted font-medium leading-relaxed">
                      {project.description}
                    </p>
                  </section>

                  {/* Comprehensive Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-3xl bg-white/2 border border-white/5">
                    {project.totalBudget && (
                      <div className="space-y-1">
                        <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest flex items-center gap-2">
                          <DollarSign className="w-3 h-3" /> Total Budget
                        </div>
                        <div className="text-sm font-black text-white">{project.totalBudget}</div>
                      </div>
                    )}
                    {project.contractor && (
                      <div className="space-y-1">
                        <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest flex items-center gap-2">
                          <Building2 className="w-3 h-3" /> Contractor
                        </div>
                        <div className="text-sm font-black text-white">{project.contractor}</div>
                      </div>
                    )}
                    {project.location && (
                      <div className="space-y-1">
                        <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest flex items-center gap-2">
                          <MapPin className="w-3 h-3" /> Primary Location
                        </div>
                        <div className="text-sm font-black text-white">{project.location}</div>
                      </div>
                    )}
                    {project.expectedCompletion && (
                      <div className="space-y-1">
                        <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest flex items-center gap-2">
                          <Clock className="w-3 h-3" /> Expected Completion
                        </div>
                        <div className="text-sm font-black text-white">{project.expectedCompletion}</div>
                      </div>
                    )}
                  </div>

                  {/* Key Components / Milestones */}
                  {project.mainComponents && project.mainComponents.length > 0 && (
                    <section className="space-y-6">
                      <div className="flex items-center gap-2 text-blue-400">
                        <ShieldCheck className="w-5 h-5" />
                        <h3 className="text-xs font-black uppercase tracking-[0.2em]">Structural Modules</h3>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {project.mainComponents.map((component, i) => (
                          <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 group hover:bg-white/10 hover:border-white/20 transition-all">
                            <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-150 transition-transform" />
                            <span className="text-sm font-bold text-white/80">{component}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Key Challenges */}
                  {project.keyChallenges && project.keyChallenges.length > 0 && (
                    <section className="space-y-6">
                      <div className="flex items-center gap-2 text-kenya-red">
                        <AlertTriangle className="w-5 h-5" />
                        <h3 className="text-xs font-black uppercase tracking-[0.2em]">Implementation Risks</h3>
                      </div>
                      <div className="space-y-3">
                        {project.keyChallenges.map((challenge, i) => (
                          <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-kenya-red/5 border border-kenya-red/10">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-kenya-red shrink-0" />
                            <p className="text-sm font-medium text-brand-text-muted leading-relaxed">
                              {challenge}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>

                {/* Right Column: Meta Info */}
                <div className="space-y-10">
                  {/* Delivery Metrics */}
                  <div className="space-y-6 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted">Delivery Progress</h4>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                          <span className="text-white/40">Completion Rate</span>
                          <span className="text-kenya-gold">{project.progress}%</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${project.progress}%` }}
                            className="h-full bg-kenya-gold"
                          />
                        </div>
                      </div>
                      
                      {project.socialImpact && (
                        <div className="space-y-2">
                          <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest flex items-center gap-2">
                            <Users className="w-3 h-3" /> Social Impact Score
                          </div>
                          <p className="text-xs font-medium text-brand-text-muted leading-relaxed italic">
                            "{project.socialImpact}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Strategic Tags */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted">Strategic Metadata</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-white/50 hover:text-white hover:border-white/20 transition-all cursor-default">
                          #{tag.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Context Links */}
                  <div className="pt-6 border-t border-white/5">
                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4">Delivery Timeline</div>
                    <div className="space-y-4">
                      {project.startDate && (
                        <div className="flex items-center gap-3">
                          <div className="w-1 h-8 bg-kenya-green rounded-full" />
                          <div>
                            <div className="text-[10px] text-white/40 font-bold uppercase">Initiated</div>
                            <div className="text-xs font-black text-white">{project.startDate}</div>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-1 h-8 rounded-full",
                          project.status === 'Completed' ? "bg-kenya-green" : "bg-white/10"
                        )} />
                        <div>
                          <div className="text-[10px] text-white/40 font-bold uppercase">Current Phase</div>
                          <div className="text-xs font-black text-white">{project.status}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer / Meta Footer */}
            <div className="p-6 bg-white/5 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">
                National Projects Oversight Platform • 2026 BETA Agenda
              </div>
              <button 
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-kenya-gold hover:text-white transition-all shadow-xl shadow-white/5 active:scale-95"
              >
                Exit Monitor
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
