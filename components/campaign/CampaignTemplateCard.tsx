'use client';

import { CampaignTemplate } from '@/lib/campaign-data';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CampaignTemplateCardProps {
  template: CampaignTemplate;
  onSelect: () => void;
  isSelected?: boolean;
}

export function CampaignTemplateCard({ template, onSelect, isSelected }: CampaignTemplateCardProps) {
  const Icon = template.icon;

  return (
    <div 
      className={cn(
        "relative cursor-pointer transition-all duration-500 group rounded-3xl overflow-hidden",
        isSelected ? "scale-[1.02]" : "hover:scale-[1.02]"
      )}
      onClick={onSelect}
    >
      {/* Background with subtle glow */}
      <div className={cn(
        "absolute inset-0 bg-brand-surface/50 backdrop-blur-xl border-2 transition-all duration-500",
        isSelected ? "border-kenya-gold shadow-lg shadow-kenya-gold/20" : "border-white/5 group-hover:border-white/20 group-hover:bg-brand-surface/70"
      )} />

      {/* Gloss Effect */}
      <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent pointer-events-none" />

      <div className="relative z-10 p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-kenya-gold/10 group-hover:border-kenya-gold/30 transition-all duration-500">
            <Icon className={cn("w-6 h-6 transition-colors duration-500", isSelected ? "text-kenya-gold" : "text-brand-text-muted group-hover:text-kenya-gold")} />
          </div>
          {isSelected && (
            <div className="bg-kenya-gold text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-kenya-gold/30 animate-in fade-in zoom-in duration-300">
              Selected
            </div>
          )}
        </div>

        <div className="space-y-2">
            <h3 className="text-xl font-black text-white group-hover:text-kenya-gold transition-colors duration-500">{template.title}</h3>
            <p className="text-xs text-brand-text-muted leading-relaxed line-clamp-2 font-medium opacity-80 group-hover:opacity-100">{template.description}</p>
        </div>

        <div className="pt-4 border-t border-white/5 space-y-3">
            <h4 className="text-[10px] font-black uppercase text-brand-text-muted/60 tracking-[0.2em] flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5" /> Core Mandate
            </h4>
            <ul className="space-y-2">
                {template.mandate.slice(0, 2).map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-kenya-gold/40 shrink-0" />
                        <span className="text-[11px] text-brand-text-muted font-medium leading-normal group-hover:text-brand-text transition-colors duration-300">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
      </div>
      
      {/* Selection Overlay */}
      {isSelected && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-kenya-gold" />
      )}
    </div>
  );
}
