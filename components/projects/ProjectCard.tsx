"use client";

import React from "react";
import { NationalProject } from "@/lib/national-projects";
import { cn } from "@/lib/utils";
import { 
  MapPin, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  AlertTriangle, 
  Clock, 
  Target 
} from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: NationalProject;
  onClick?: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const statusConfig = {
    'Completed': { color: 'text-kenya-green', bg: 'bg-kenya-green/10', border: 'border-kenya-green/20', icon: ShieldCheck },
    'In Progress': { color: 'text-kenya-gold', bg: 'bg-kenya-gold/10', border: 'border-kenya-gold/20', icon: Zap },
    'Stalled': { color: 'text-kenya-red', bg: 'bg-kenya-red/10', border: 'border-kenya-red/20', icon: AlertTriangle },
    'Not Started': { color: 'text-brand-text-muted', bg: 'bg-white/5', border: 'border-white/10', icon: Clock },
    'Planned': { color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20', icon: Target }
  };

  const config = statusConfig[project.status as keyof typeof statusConfig] || statusConfig['Not Started'];

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={onClick}
      className="group relative bg-black/40 backdrop-blur-2xl border border-white/10 rounded-4xl p-8 hover:bg-white/5 hover:border-white/20 transition-all duration-500 cursor-pointer overflow-hidden shadow-2xl hover:shadow-kenya-gold/5 flex flex-col justify-between h-full"
    >
      {/* HUD Accent Glitch Effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative space-y-6">
        {/* Card Header */}
        <div className="flex justify-between items-start gap-4">
          <div className={cn("p-4 rounded-2xl backdrop-blur-xl border transition-all duration-500 group-hover:scale-110", config.bg, config.border)}>
            <config.icon className={cn("w-6 h-6", config.color)} />
          </div>
          <div className="text-right">
            <div className={cn("text-[10px] font-black uppercase tracking-[0.2em] mb-1", config.color)}>
              {project.status}
            </div>
            <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
              {project.category}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-2xl font-black tracking-tighter text-white leading-tight group-hover:text-kenya-gold transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-brand-text-muted font-medium leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Dynamic Detail Sections */}
        <div className="grid grid-cols-1 gap-4 pt-4">
          {project.location && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/2 border border-white/5 group-hover:bg-white/5 transition-colors">
              <MapPin className="w-3.5 h-3.5 text-white/30" />
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest truncate">{project.location}</span>
            </div>
          )}
          
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/2 border border-white/5 group-hover:bg-white/5 transition-colors">
            <TrendingUp className="w-3.5 h-3.5 text-white/30" />
            <div className="flex-1">
              <div className="flex justify-between text-[9px] font-bold text-white/40 uppercase mb-1.5">
                <span>Implementation Progress</span>
                <span className="text-white/80">{project.progress}%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${project.progress}%` }}
                  className={cn("h-full", 
                    project.status === 'Completed' ? "bg-kenya-green shadow-[0_0_10px_rgba(34,197,94,0.3)]" : 
                    project.status === 'Stalled' ? "bg-kenya-red shadow-[0_0_10px_rgba(239,68,68,0.3)]" : "bg-kenya-gold shadow-[0_0_10px_rgba(255,193,7,0.3)]"
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative HUD corners */}
      <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/10 group-hover:border-white/30 transition-colors" />
      <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/10 group-hover:border-white/30 transition-colors" />
    </motion.div>
  );
}
