"use client";

import React from 'react';
import { VISION_2030_FLAGSHIP } from '@/lib/national-projects';
import { motion } from 'framer-motion';

export function ProjectStatusTable() {
  return (
    <div className="overflow-hidden rounded-4xl border border-white/5 bg-white/2 backdrop-blur-3xl">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-kenya-gold">Project</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-muted">Sector</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-muted text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {VISION_2030_FLAGSHIP.map((item, index) => (
              <motion.tr 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                key={item.project} 
                className="group hover:bg-white/5 transition-colors"
              >
                <td className="px-8 py-5">
                  <div className="font-bold text-sm text-white group-hover:text-kenya-gold transition-colors">
                    {item.project}
                  </div>
                </td>
                <td className="px-8 py-5 text-[11px] font-bold text-brand-text-muted uppercase tracking-wider">
                  {item.sector}
                </td>
                <td className="px-8 py-5 text-right">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    item.status.toLowerCase().includes('completed') 
                      ? 'bg-kenya-green/10 text-kenya-green border border-kenya-green/20' 
                      : 'bg-kenya-gold/10 text-kenya-gold border border-kenya-gold/20'
                  }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${
                      item.status.toLowerCase().includes('completed') ? 'bg-kenya-green animate-pulse' : 'bg-kenya-gold animate-pulse'
                    }`} />
                    {item.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
