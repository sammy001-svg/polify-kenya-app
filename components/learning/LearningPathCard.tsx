"use client";

import { LearningPath } from "@/lib/gamification";
import { Clock, Award, Play, CheckCircle2, Lock } from "lucide-react";
import Link from "next/link";
import { BadgeCard } from "../gamification/BadgeCard";

interface LearningPathCardProps {
  path: LearningPath;
  progress?: number; // 0-100
  isLocked?: boolean;
}

export function LearningPathCard({ path, progress = 0, isLocked = false }: LearningPathCardProps) {
  const completedModules = Math.floor((progress / 100) * path.modules.length);
  const isCompleted = progress === 100;
  
  return (
    <Link 
      href={isLocked ? '#' : `/learn/${path.id}`}
      className={`block bg-brand-surface-secondary border border-border rounded-xl overflow-hidden hover:border-kenya-gold/50 transition-all group ${
        isLocked ? 'opacity-60 cursor-not-allowed' : ''
      }`}
    >
      {/* Header */}
      <div className={`${path.color} bg-opacity-10 p-6 relative`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={`text-6xl ${isLocked ? 'opacity-30' : ''}`}>
              {isLocked ? <Lock className="w-16 h-16 text-brand-text-muted" /> : path.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-brand-text mb-1">{path.title}</h3>
              <p className="text-sm text-brand-text-muted">{path.description}</p>
            </div>
          </div>
          
          {isCompleted && (
            <div className="absolute top-4 right-4">
              <div className="w-12 h-12 rounded-full bg-kenya-green flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
            </div>
          )}
        </div>
        
        {/* Progress Bar */}
        {!isLocked && progress > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-brand-text-muted">
                {completedModules} / {path.modules.length} modules
              </span>
              <span className="text-xs font-bold text-brand-text">{progress}%</span>
            </div>
            <div className="h-2 bg-brand-surface-highlight rounded-full overflow-hidden">
              <div 
                className={`h-full ${path.color} transition-all duration-500`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Meta Info */}
        <div className="flex items-center gap-6 text-sm text-brand-text-muted">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{path.estimatedTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            <span>{path.totalXP} XP</span>
          </div>
          <div>
            <span className="px-2 py-1 bg-brand-surface-highlight rounded text-xs font-medium">
              {path.difficulty}
            </span>
          </div>
        </div>
        
        {/* Modules Preview */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-brand-text-muted mb-2">
            Modules ({path.modules.length})
          </p>
          <div className="space-y-1">
            {path.modules.slice(0, 3).map((module, index) => (
              <div key={module.id} className="flex items-center gap-2 text-sm text-brand-text-muted">
                <span className="w-5 h-5 rounded-full bg-brand-surface-highlight flex items-center justify-center text-xs font-bold shrink-0">
                  {index + 1}
                </span>
                <span className="truncate">{module.title}</span>
              </div>
            ))}
            {path.modules.length > 3 && (
              <p className="text-xs text-brand-text-muted italic pl-7">
                +{path.modules.length - 3} more modules
              </p>
            )}
          </div>
        </div>
        
        {/* Badge Reward */}
        <div className="pt-4 border-t border-border">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-text-muted mb-3">
            Earn This Badge
          </p>
          <div className="flex justify-center">
            <BadgeCard badge={path.badge} isEarned={isCompleted} size="sm" />
          </div>
        </div>
        
        {/* CTA Button */}
        {!isLocked && (
          <button className={`w-full py-3 rounded-lg font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all ${
            isCompleted
              ? 'bg-kenya-green text-white shadow-lg shadow-kenya-green/20'
              : progress > 0
              ? 'bg-kenya-gold text-black hover:bg-white transition-all'
              : 'bg-white text-black hover:bg-kenya-gold transition-all'
          }`}>
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                View Certificate
              </>
            ) : progress > 0 ? (
              <>
                <Play className="w-4 h-4 fill-current" />
                Continue Learning
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                Start Path
              </>
            )}
          </button>
        )}
        
        {isLocked && (
          <div className="text-center py-3 bg-brand-surface-highlight rounded-lg">
            <Lock className="w-5 h-5 text-brand-text-muted mx-auto mb-1" />
            <p className="text-xs text-brand-text-muted">Complete previous paths to unlock</p>
          </div>
        )}
      </div>
    </Link>
  );
}
