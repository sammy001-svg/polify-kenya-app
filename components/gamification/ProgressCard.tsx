"use client";

import { UserProgress, LEVEL_NAMES, LEVEL_THRESHOLDS } from "@/lib/gamification";
import { TrendingUp, Flame, Award, Calendar } from "lucide-react";

interface ProgressCardProps {
  progress: UserProgress;
}

export function ProgressCard({ progress }: ProgressCardProps) {
  const levelName = LEVEL_NAMES[progress.level];
  const progressToNext = ((progress.currentXP - LEVEL_THRESHOLDS[progress.level]) / 
    (progress.nextLevelXP - LEVEL_THRESHOLDS[progress.level])) * 100;
  
  const xpInCurrentLevel = progress.currentXP - LEVEL_THRESHOLDS[progress.level];
  const xpNeededForNext = progress.nextLevelXP - LEVEL_THRESHOLDS[progress.level];
  
  return (
    <div className="bg-linear-to-br from-kenya-red/10 to-kenya-gold/10 border border-kenya-gold/30 rounded-xl p-6 space-y-6">
      {/* Level & XP */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-kenya-red to-kenya-gold flex items-center justify-center text-2xl font-black text-white">
              {progress.level}
            </div>
            <div>
              <p className="text-xs text-brand-text-muted uppercase tracking-wider">Level {progress.level}</p>
              <h3 className="text-2xl font-bold text-brand-text">{levelName}</h3>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-xs text-brand-text-muted mb-1">Total XP</p>
          <p className="text-2xl font-bold text-kenya-gold">{progress.totalXP.toLocaleString()}</p>
        </div>
      </div>
      
      {/* Progress to Next Level */}
      {progress.level < 7 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-brand-text-muted">Progress to Level {progress.level + 1}</span>
            <span className="text-sm font-bold text-brand-text">
              {xpInCurrentLevel.toLocaleString()} / {xpNeededForNext.toLocaleString()} XP
            </span>
          </div>
          <div className="h-3 bg-brand-surface-highlight rounded-full overflow-hidden">
            <div 
              className="h-full bg-linear-to-r from-kenya-red to-kenya-gold transition-all duration-500"
              style={{ width: `${Math.min(progressToNext, 100)}%` }}
            />
          </div>
          <p className="text-xs text-brand-text-muted mt-1 text-right">
            {Math.round(progressToNext)}% complete
          </p>
        </div>
      )}
      
      {progress.level === 7 && (
        <div className="text-center py-4 bg-kenya-gold/20 rounded-lg">
          <Award className="w-8 h-8 text-kenya-gold mx-auto mb-2" />
          <p className="text-sm font-bold text-kenya-gold">Maximum Level Reached!</p>
          <p className="text-xs text-brand-text-muted mt-1">You are a true Civic Champion</p>
        </div>
      )}
      
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Flame className={`w-5 h-5 ${progress.currentStreak > 0 ? 'text-orange-500' : 'text-brand-text-muted'}`} />
          </div>
          <p className="text-2xl font-bold text-brand-text">{progress.currentStreak}</p>
          <p className="text-[10px] text-brand-text-muted uppercase tracking-wider">Day Streak</p>
        </div>
        
        <div className="text-center border-l border-r border-border">
          <div className="flex items-center justify-center mb-2">
            <Award className="w-5 h-5 text-kenya-gold" />
          </div>
          <p className="text-2xl font-bold text-brand-text">{progress.badges.length}</p>
          <p className="text-[10px] text-brand-text-muted uppercase tracking-wider">Badges</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="w-5 h-5 text-kenya-green" />
          </div>
          <p className="text-2xl font-bold text-brand-text">{progress.completedPaths.length}</p>
          <p className="text-[10px] text-brand-text-muted uppercase tracking-wider">Paths Done</p>
        </div>
      </div>
      
      {/* Member Since */}
      <div className="flex items-center gap-2 pt-4 border-t border-border">
        <Calendar className="w-4 h-4 text-brand-text-muted" />
        <p className="text-xs text-brand-text-muted">
          Member since {new Date(progress.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      </div>
    </div>
  );
}
