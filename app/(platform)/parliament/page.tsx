"use client";

import React from "react";
import { 
  NATIONAL_PROJECTS, 
  BETA_AGENDA, 
  VISION_2030_FLAGSHIP 
} from "@/lib/national-projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectStatusTable } from "@/components/projects/ProjectStatusTable";
import { ChallengesCard } from "@/components/projects/ChallengesCard";
import { CountyProjectMonitor } from "@/components/projects/CountyProjectMonitor";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function NationalProjectsPage() {
  return (
    <div className="min-h-screen text-white font-sans selection:bg-kenya-gold/30">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-kenya-gold/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-kenya-red/5 blur-[120px] rounded-full animate-pulse delay-700" />
      </div>

      <div className="relative z-10 p-6 lg:p-10 space-y-6 max-w-[1800px] mx-auto">
        {/* Project Gallery Hero - Now at the Top */}
        <section className="animate-in fade-in slide-in-from-top-4 duration-1000 w-full">
          <ProjectGallery />
        </section>

        {/* Oversight Info */}
        <div className="py-8 border-b border-white/5">
          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl group">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kenya-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-kenya-green"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-muted group-hover:text-white transition-colors">National & County Tracker • 2026-2030</span>
            </div>
            <p className="text-[11px] md:text-sm text-brand-text-muted font-bold uppercase tracking-wider whitespace-nowrap overflow-hidden text-ellipsis">
               Comprehensive oversight of Major Infrastructure, the BETA Agenda, and localized projects across all 47 Counties.
            </p>
          </div>
        </div>

        {/* Project Lists Tabs */}
        <Tabs defaultValue="national" className="w-full space-y-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between border-b border-white/5 pb-8">
            <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="w-1 h-6 bg-kenya-red rounded-full" />
                Delivery Modules
            </h2>
            <TabsList className="bg-white/5 border border-white/10 p-1 rounded-2xl h-14 backdrop-blur-xl">
              <TabsTrigger value="national" className="px-8 rounded-xl font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-kenya-red data-[state=active]:text-white transition-all h-full">
                Major Infrastructure
              </TabsTrigger>
              <TabsTrigger value="county" className="px-8 rounded-xl font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all h-full">
                County Monitor
              </TabsTrigger>
              <TabsTrigger value="beta" className="px-8 rounded-xl font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-kenya-gold data-[state=active]:text-white transition-all h-full">
                BETA Agenda
              </TabsTrigger>
              <TabsTrigger value="vision" className="px-8 rounded-xl font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-kenya-green data-[state=active]:text-white transition-all h-full">
                Vision 2030
              </TabsTrigger>
              <TabsTrigger value="challenges" className="px-8 rounded-xl font-black uppercase text-[10px] tracking-widest data-[state=active]:bg-orange-600 data-[state=active]:text-white transition-all h-full">
                Challenges
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="national" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {NATIONAL_PROJECTS.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="county" className="m-0 focus-visible:ring-0">
             <CountyProjectMonitor />
          </TabsContent>

          <TabsContent value="promises" className="m-0 focus-visible:ring-0">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {BETA_AGENDA.map((agenda, index) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={agenda.title}
                    className="p-8 rounded-[2.5rem] bg-white/2 border border-white/5 hover:bg-white/5 transition-all space-y-6"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-black text-white leading-tight">{agenda.title}</h3>
                      <span className="px-3 py-1 rounded-full bg-kenya-gold/10 text-kenya-gold text-[9px] font-black uppercase tracking-widest border border-kenya-gold/20">
                        {agenda.status}
                      </span>
                    </div>
                    <div className="space-y-4">
                      {agenda.promises.map((promise, i) => (
                        <div key={i} className="flex items-center gap-3">
                           <div className="w-2 h-2 rounded-full bg-kenya-gold shadow-[0_0_10px_rgba(255,193,7,0.5)]" />
                           <span className="text-sm font-medium text-brand-text-muted">{promise}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
             </div>
          </TabsContent>

          <TabsContent value="flagship" className="m-0 focus-visible:ring-0">
             <div className="space-y-8">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-black text-white mb-2 underline decoration-kenya-gold decoration-4 underline-offset-8">Vision 2030 Status Report</h2>
                    <p className="text-brand-text-muted font-medium">Tracking the flagship projects that form the backbone of Kenya&apos;s long-term transformation strategy.</p>
                </div>
                <ProjectStatusTable />
             </div>
          </TabsContent>

          <TabsContent value="challenges" className="m-0 focus-visible:ring-0">
             <div className="space-y-8">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-black text-white mb-2 border-l-4 border-kenya-red pl-6">Implementation Obstacles</h2>
                    <p className="text-brand-text-muted font-medium">Key factors affecting the timely completion and funding of national government projects.</p>
                </div>
                <ChallengesCard />
             </div>
          </TabsContent>
        </Tabs>

        {/* Strategic Dashboard Footer */}
        <div className="mt-24 p-12 rounded-[3.5rem] bg-brand-surface-secondary border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12">
                <TrendingUp className="w-64 h-64 text-kenya-green" />
            </div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="space-y-6">
                    <h3 className="text-2xl font-black text-white">Project Summary</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5">
                            <span className="text-[10px] font-black text-brand-text-muted uppercase tracking-widest">Completed</span>
                            <span className="text-xl font-black text-kenya-green">Expressway, SGR Tech</span>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                            <span className="text-[10px] font-black text-brand-text-muted uppercase tracking-widest">Active County Projects</span>
                            <span className="text-sm font-bold text-white px-2">47 Counties Live</span>
                        </div>
                    </div>
                </div>
                <div className="space-y-6 lg:col-span-2">
                    <h3 className="text-2xl font-black text-white">Regional Development Nodes</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-6 rounded-3xl bg-white/2 border border-white/5">
                            <h4 className="font-black text-kenya-gold mb-1">Coast Region Hub</h4>
                            <p className="text-xs text-brand-text-muted font-medium">Monitoring Dongo Kundu and Port Expansion delivery.</p>
                        </div>
                        <div className="p-6 rounded-3xl bg-white/2 border border-white/5">
                            <h4 className="font-black text-blue-400 mb-1">Rift Valley Geothermal</h4>
                            <p className="text-xs text-brand-text-muted font-medium">Strategic power capacity tracking at Olkaria sites.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Modern Footer */}
      <footer className="border-t border-white/5 py-12 px-6 lg:px-12 mt-24">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-kenya-red flex items-center justify-center font-black text-white">P</div>
             <div>
                <div className="font-black text-sm uppercase tracking-tighter">Polify Intelligence</div>
                <div className="text-[10px] text-brand-text-muted uppercase tracking-widest font-black">Citizen Oversight Platform</div>
             </div>
          </div>
          <div className="flex gap-8 text-[10px] font-black text-brand-text-muted uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Project API</a>
            <a href="#" className="hover:text-white transition-colors">County Data</a>
            <a href="#" className="hover:text-white transition-colors">Strategic Portal</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
