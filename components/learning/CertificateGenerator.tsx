"use client";

import { LearningPath } from "@/lib/gamification";
import { Award, Calendar, Share2, Download, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CertificateGeneratorProps {
  path: LearningPath;
  userName?: string;
  completionDate?: string;
}

export function CertificateGenerator({ 
  path, 
  userName = "Kenyan Citizen", 
  completionDate = new Date().toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' }) 
}: CertificateGeneratorProps) {

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      {/* Certificate Canvas */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-linear-to-r from-kenya-red via-kenya-gold to-kenya-green rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-opacity" />
        
        <div className="relative bg-[#fafaf9] text-[#1c1917] rounded-xl p-8 md:p-16 border-8 border-double border-[#e7e5e4] shadow-2xl overflow-hidden aspect-[1.414/1] flex flex-col items-center justify-between text-center">
          {/* Decorative Corner Borders */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-kenya-red/20 m-4" />
          <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-kenya-gold/20 m-4" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-kenya-green/20 m-4" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-brand-primary/20 m-4" />

          {/* Background Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
            <Award className="w-[500px] h-[500px]" />
          </div>

          {/* Header */}
          <div className="space-y-4 z-10">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-linear-to-tr from-kenya-red via-kenya-gold to-kenya-green p-1 shadow-lg">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-4xl">
                   🇰🇪
                </div>
              </div>
            </div>
            <h1 className="text-sm font-black uppercase tracking-[0.3em] text-brand-text-muted">Certificate of Completion</h1>
            <div className="h-0.5 w-24 bg-linear-to-r from-kenya-red via-kenya-gold to-kenya-green mx-auto" />
          </div>

          {/* Body */}
          <div className="space-y-6 z-10 w-full max-w-2xl">
            <p className="text-lg font-medium italic serif">This is to certify that</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[#0c0a09] border-b-2 border-black/5 pb-2 inline-block px-12 capitalize">
               {userName}
            </h2>
            <p className="text-lg leading-relaxed text-[#44403c] max-w-lg mx-auto">
              has successfully completed the <span className="font-black text-black">{path.title}</span> learning path, 
              demonstrating mastery of foundational civic intelligence and government transparency.
            </p>
          </div>

          {/* Footer / Seals */}
          <div className="w-full grid grid-cols-3 items-end z-10 border-t border-black/5 pt-8">
            <div className="text-left space-y-1">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-kenya-green">
                <ShieldCheck className="w-4 h-4" /> Verified Citizen
              </div>
              <p className="text-[10px] text-brand-text-muted uppercase font-bold tracking-tighter">Polify ID: {path.id.toUpperCase()}-{(Math.random()*1000).toFixed(0)}</p>
            </div>

            <div className="flex justify-center">
               <div className="w-24 h-24 relative flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-double border-kenya-gold animate-spin-slow" />
                  <div className="text-4xl">{path.badge.icon}</div>
                  <div className="absolute -bottom-2 bg-kenya-gold text-black text-[8px] font-black px-2 py-0.5 rounded-full uppercase">
                     {path.badge.rarity}
                  </div>
               </div>
            </div>

            <div className="text-right flex flex-col items-end gap-1">
               <p className="text-xs font-black border-t-2 border-black pt-1 w-32 uppercase tracking-widest text-[#1c1917]">Polify Registry</p>
               <div className="flex items-center gap-1 text-[10px] text-brand-text-muted font-bold">
                  <Calendar className="w-3 h-3" /> {completionDate}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap justify-center gap-4">
        <Button className="bg-brand-surface-secondary border border-white/10 hover:bg-brand-surface-highlight text-white gap-2 h-12 px-6">
          <Download className="w-5 h-5" /> Download PDF
        </Button>
        <Button className="bg-linear-to-r from-kenya-red to-kenya-gold hover:scale-105 transition-all text-white font-bold gap-2 h-12 px-8">
          <Share2 className="w-5 h-5" /> Share Achievement
        </Button>
        <Button variant="outline" className="h-12 border-white/5 text-brand-text-muted hover:text-white">
           Add to LinkedIn
        </Button>
      </div>
    </div>
  );
}
