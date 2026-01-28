"use client";

import { Badge, BADGE_COLORS } from "@/lib/gamification";
import { Lock, Check } from "lucide-react";

interface BadgeCardProps {
  badge: Badge;
  isEarned?: boolean;
  progress?: number; // 0-100 for in-progress badges
  size?: 'sm' | 'md' | 'lg';
}

export function BadgeCard({ badge, isEarned = false, progress = 0, size = 'md' }: BadgeCardProps) {
  const rarityColor = BADGE_COLORS[badge.rarity];
  
  const sizeClasses = {
    sm: {
      container: 'w-20',
      badge: 'w-16 h-16 text-3xl',
      text: 'text-xs',
    },
    md: {
      container: 'w-32',
      badge: 'w-24 h-24 text-5xl',
      text: 'text-sm',
    },
    lg: {
      container: 'w-40',
      badge: 'w-32 h-32 text-6xl',
      text: 'text-base',
    },
  };
  
  const sizes = sizeClasses[size];
  
  return (
    <div className={`${sizes.container} group cursor-pointer`}>
      <div className="relative">
        {/* Badge Circle */}
        <div 
          className={`${sizes.badge} rounded-full flex items-center justify-center relative transition-all group-hover:scale-110 ${
            isEarned 
              ? 'bg-brand-surface-highlight border-4' 
              : 'bg-brand-surface-secondary border-4 border-dashed opacity-50'
          }`}
          style={{
            borderColor: isEarned ? rarityColor : '#444',
            boxShadow: isEarned && badge.rarity === 'legendary' 
              ? `0 0 20px ${rarityColor}` 
              : 'none',
          }}
        >
          {isEarned ? (
            <span className="relative z-10">{badge.icon}</span>
          ) : (
            <Lock className="w-8 h-8 text-brand-text-muted" />
          )}
          
          {/* Earned Checkmark */}
          {isEarned && (
            <div className="absolute top-0 right-0 w-6 h-6 rounded-full bg-kenya-green flex items-center justify-center border-2 border-brand-surface">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
        
        {/* Progress Ring (for in-progress badges) */}
        {!isEarned && progress > 0 && (
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={rarityColor}
              strokeWidth="4"
              strokeDasharray={`${progress * 2.83} 283`}
              opacity="0.6"
            />
          </svg>
        )}
      </div>
      
      {/* Badge Info */}
      <div className="mt-2 text-center space-y-1">
        <p className={`${sizes.text} font-bold text-brand-text group-hover:text-white transition-colors truncate`}>
          {badge.name}
        </p>
        <p 
          className="text-[10px] font-bold uppercase tracking-wider"
          style={{ color: rarityColor }}
        >
          {badge.rarity}
        </p>
        {progress > 0 && !isEarned && (
          <p className="text-[10px] text-brand-text-muted">
            {progress}% Complete
          </p>
        )}
      </div>
      
      {/* Hover Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-brand-surface border border-border rounded-lg p-3 shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-brand-text">{badge.name}</h4>
            <span className="text-xs" style={{ color: rarityColor }}>
              +{badge.xpReward} XP
            </span>
          </div>
          <p className="text-xs text-brand-text-muted leading-relaxed">
            {badge.description}
          </p>
          <div>
            <p className="text-[10px] font-bold uppercase text-brand-text-muted mb-1">
              Requirements:
            </p>
            <ul className="space-y-0.5">
              {badge.requirements.map((req, index) => (
                <li key={index} className="text-[10px] text-brand-text flex items-start gap-1">
                  <span className="text-kenya-gold shrink-0">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
