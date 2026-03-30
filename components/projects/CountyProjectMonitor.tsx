"use client";

import React, { useState, useMemo } from 'react';
import { COUNTY_PROJECTS_DATA, CountyProjectStatus } from '@/lib/county-projects-data';
import { motion } from 'framer-motion';
import { Search, MapPin, CheckCircle2, Clock, Ban, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusConfig: Record<CountyProjectStatus, { color: string; icon: React.ElementType }> = {
  Completed: { color: "text-kenya-green bg-kenya-green/10 border-kenya-green/20", icon: CheckCircle2 },
  "In Progress": { color: "text-kenya-gold bg-kenya-gold/10 border-kenya-gold/20", icon: Clock },
  Stalled: { color: "text-kenya-red bg-kenya-red/10 border-kenya-red/20", icon: Ban },
  Planned: { color: "text-blue-400 bg-blue-400/10 border-blue-400/20", icon: LayoutGrid }
};

export function CountyProjectMonitor() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    return COUNTY_PROJECTS_DATA.map(region => ({
      ...region,
      counties: region.counties.filter(county => 
        county.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        county.projects.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    })).filter(region => region.counties.length > 0);
  }, [searchQuery]);

  return (
    <div className="space-y-8">
      {/* Local Search & Region Selector */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white/2 p-6 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted group-focus-within:text-kenya-gold transition-colors" />
          <input 
            type="text" 
            placeholder="Search county or local project..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-kenya-gold/30 focus:border-kenya-gold/50 transition-all"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
          {["All", ...COUNTY_PROJECTS_DATA.map(r => r.region)].map((region) => (
            <button
              key={region}
              onClick={() => setActiveRegion(region === "All" ? null : region)}
              className={cn(
                "px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap border",
                (activeRegion === region || (region === "All" && activeRegion === null))
                  ? "bg-white/10 border-white/20 text-white"
                  : "bg-white/2 border-white/5 text-brand-text-muted hover:border-white/10"
              )}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* Regions Grid/List */}
      <div className="grid grid-cols-1 gap-12">
        {filteredData
          .filter(r => !activeRegion || r.region === activeRegion)
          .map((region, rIdx) => (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: rIdx * 0.1 }}
            viewport={{ once: true }}
            key={region.region} 
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-kenya-gold py-2 px-4 bg-kenya-gold/5 border-l-2 border-kenya-gold">
                {region.region}
              </h2>
              <div className="h-px flex-1 bg-linear-to-r from-kenya-gold/20 to-transparent" />
              <span className="text-[10px] font-bold text-brand-text-muted uppercase tracking-widest">
                {region.counties.length} Counties Tracked
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {region.counties.map((county) => (
                <div 
                  key={county.name}
                  className="group relative p-6 rounded-[2.5rem] bg-black/40 border border-white/10 hover:bg-black/60 hover:border-white/20 transition-all overflow-hidden backdrop-blur-md"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5 -mr-4 -mt-4 translate-x-4 -translate-y-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
                    <MapPin className="w-24 h-24 text-white" />
                  </div>

                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                        <MapPin className="w-4 h-4 text-kenya-gold" />
                      </div>
                      <h3 className="text-xl font-black text-white">{county.name}</h3>
                    </div>

                    <div className="space-y-3 pt-2">
                      {county.projects.map((project, pIdx) => {
                        const StatusIcon = statusConfig[project.status].icon;
                        return (
                          <div key={pIdx} className="space-y-1 group/item">
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-xs font-bold text-brand-text-muted group-hover/item:text-white transition-colors truncate">
                                {project.name}
                              </span>
                              <div className={cn(
                                "shrink-0 w-4 h-4 flex items-center justify-center rounded-full bg-white/5",
                                statusConfig[project.status].color.split(' ')[0]
                              )}>
                                <StatusIcon className="w-2.5 h-2.5" />
                              </div>
                            </div>
                            {project.details && (
                              <p className="text-[10px] text-brand-text-muted/60 font-medium pl-0 border-l border-white/5 ml-2 mt-1 italic leading-tight">
                                {project.details}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
