"use client";

import { NationalProject, ProjectStatus } from "@/lib/national-projects";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Calendar, CircleDollarSign, MapPin, TrendingUp, CheckCircle2, Clock, Ban } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: NationalProject;
}

const statusConfig: Record<ProjectStatus, { color: string; icon: any }> = {
  Completed: { color: "text-kenya-green bg-kenya-green/10 border-kenya-green/20", icon: CheckCircle2 },
  "In Progress": { color: "text-kenya-gold bg-kenya-gold/10 border-kenya-gold/20", icon: Clock },
  Stalled: { color: "text-kenya-red bg-kenya-red/10 border-kenya-red/20", icon: Ban },
  "Not Started": { color: "text-brand-text-muted bg-white/5 border-white/10", icon: CircleDollarSign },
};

export function ProjectCard({ project }: ProjectCardProps) {
  const status = statusConfig[project.status];
  const StatusIcon = status.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-brand-surface-secondary border border-white/5 rounded-3xl p-6 shadow-2xl hover:shadow-brand-primary/5 transition-all duration-500 group relative overflow-hidden flex flex-col gap-6"
    >
      {/* Background Accent */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-linear-to-bl from-white/5 to-transparent blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="flex justify-between items-start gap-4 relative z-10">
        <Badge 
          variant="outline" 
          className={cn("text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-xl border flex gap-2 items-center", status.color)}
        >
          <StatusIcon className="w-3.5 h-3.5" />
          {project.status}
        </Badge>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[9px] font-black text-brand-text-muted uppercase tracking-widest">
          <Calendar className="w-3 h-3 text-kenya-gold" /> {project.promiseDate}
        </div>
      </div>

      <div className="space-y-4 flex-1">
        <div className="space-y-1">
          <span className="text-[10px] font-black text-kenya-gold uppercase tracking-[0.2em]">{project.category}</span>
          <h3 className="font-black text-xl text-white leading-tight tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-white/50 transition-all duration-500">
            {project.title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
           <MapPin className="w-3.5 h-3.5 text-brand-text-muted" />
           <p className="text-[10px] font-bold text-brand-text-muted uppercase tracking-widest truncate">{project.location}</p>
        </div>

        <p className="text-sm text-brand-text-muted/80 leading-relaxed font-medium line-clamp-3">
          {project.description}
        </p>

        {/* Budget Stats */}
        <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-black/40 border border-white/5 relative overflow-hidden">
           <div className="space-y-1">
              <span className="text-[9px] font-black text-brand-text-muted uppercase tracking-widest block opacity-50">Budget Allocation</span>
              <p className="text-sm font-black text-white">{project.budget}</p>
           </div>
           <div className="space-y-1">
              <span className="text-[9px] font-black text-brand-text-muted uppercase tracking-widest block opacity-50">Actual Expenditure</span>
              <p className="text-sm font-black text-white">{project.amountUsed}</p>
           </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em]">
                <span className="text-brand-text-muted">Implementation Progress</span>
                <span className="text-white">{project.progress}%</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex shadow-inner border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }} 
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={cn(
                    "h-full rounded-full shadow-[0_0_15px]",
                    project.status === "Completed" ? "bg-kenya-green shadow-kenya-green/30" : "bg-kenya-gold shadow-kenya-gold/30"
                  )} 
                />
            </div>
        </div>

        <div className="space-y-2">
          <span className="text-[9px] font-black text-brand-text-muted uppercase tracking-widest block opacity-50">Top Achievements</span>
          <ul className="space-y-2">
            {project.achievements.map((ach, i) => (
              <li key={i} className="flex gap-2 text-[11px] font-medium text-white/90">
                 <div className="w-1.5 h-1.5 rounded-full bg-kenya-gold mt-1.5 shrink-0 shadow-[0_0_10px_rgba(255,193,7,0.5)]" />
                 {ach}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-4 border-t border-white/5 mt-auto">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-kenya-green" />
          <span className="text-[10px] font-black text-brand-text-muted uppercase tracking-widest">Economic Impact: </span>
          <span className="text-[10px] font-bold text-white/90 truncate">{project.impact}</span>
        </div>
      </div>
    </motion.div>
  );
}
