"use client";

import { CheckCircle2, MessageCircle, Laugh } from "lucide-react";
import { type ContentType, CONTENT_TYPE_INFO } from "@/lib/creators";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface ContentTypeBadgeProps {
  type: ContentType;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function ContentTypeBadge({ type, size = 'md', showLabel = false }: ContentTypeBadgeProps) {
  const info = CONTENT_TYPE_INFO[type];
  
  const iconMap = {
    fact: CheckCircle2,
    opinion: MessageCircle,
    satire: Laugh,
  };
  
  const Icon = iconMap[type];
  
  const colorClasses = {
    green: {
      bg: 'bg-green-500/20',
      border: 'border-green-500/50',
      text: 'text-green-400',
      iconBg: 'bg-green-500',
    },
    blue: {
      bg: 'bg-blue-500/20',
      border: 'border-blue-500/50',
      text: 'text-blue-400',
      iconBg: 'bg-blue-500',
    },
    kenyaGold: { // Renamed from yellow to kenyaGold
      bg: 'bg-kenya-gold/20',
      border: 'border-kenya-gold/50',
      text: 'text-kenya-gold',
      iconBg: 'bg-kenya-gold',
    },
  };
  
  const sizeClasses = {
    sm: {
      container: 'px-2 py-0.5',
      icon: 'w-3 h-3',
      text: 'text-[10px]',
    },
    md: {
      container: 'px-2.5 py-1',
      icon: 'w-3.5 h-3.5',
      text: 'text-xs',
    },
    lg: {
      container: 'px-3 py-1.5',
      icon: 'w-4 h-4',
      text: 'text-sm',
    },
  };
  
  const colors = colorClasses[info.color as keyof typeof colorClasses];
  const sizes = sizeClasses[size];
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className={`inline-flex items-center gap-1.5 ${colors.bg} ${colors.border} ${colors.text} border rounded-full ${sizes.container} font-bold uppercase tracking-wider cursor-help`}>
          <Icon className={sizes.icon} />
          {showLabel && <span className={sizes.text}>{info.label}</span>}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-64 bg-brand-surface border-border shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full ${colors.iconBg} flex items-center justify-center`}>
              <Icon className="w-3.5 h-3.5 text-white" />
            </div>
            <h4 className={`text-sm font-bold ${colors.text}`}>{info.label}</h4>
          </div>
          <p className="text-xs text-brand-text-muted leading-relaxed">
            {info.description}
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
