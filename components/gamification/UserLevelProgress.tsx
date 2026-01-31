"use client";

import {
  UserProgress,
  getXPForNextLevel,
  LEVEL_NAMES,
} from "@/lib/gamification";
import { Zap } from "lucide-react";

interface UserLevelProgressProps {
  progress: UserProgress;
}

export function UserLevelProgress({ progress, compact = false }: UserLevelProgressProps & { compact?: boolean }) {
  const nextLevelTotal = getXPForNextLevel(progress.level);
  const percent = Math.min(
    100,
    Math.max(0, (progress.currentXP / nextLevelTotal) * 100),
  );

  if (compact) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-end text-xs">
                <span className="font-bold text-white">Lvl {progress.level}</span>
                <span className="text-brand-text-muted">{progress.currentXP} / {nextLevelTotal} XP</span>
            </div>
            <div className="h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                <div
                    className="h-full bg-kenya-green rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    )
  }

  return (
    <div className="bg-brand-surface border border-white/5 rounded-2xl p-5 relative overflow-hidden group">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-kenya-green/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="relative z-10 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted mb-1">
              Current Rank
            </p>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              {LEVEL_NAMES[progress.level]}
              <span className="text-xs bg-kenya-green/10 text-kenya-green px-2 py-0.5 rounded-full border border-kenya-green/20">
                Lvl {progress.level}
              </span>
            </h3>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 justify-end text-kenya-gold font-black">
              <Zap className="w-4 h-4 fill-current" />
              <span className="text-lg">
                {progress.currentXP.toLocaleString()}
              </span>
            </div>
            <p className="text-[10px] text-brand-text-muted uppercase tracking-wide">
              / {nextLevelTotal.toLocaleString()} XP
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-4 bg-black/40 rounded-full overflow-hidden border border-white/5 relative">
          <div
            className="h-full bg-linear-to-r from-kenya-green to-emerald-400 relative transition-all duration-1000 ease-out"
            style={{ width: `${percent}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
          </div>
        </div>

        {/* Motivational Text */}
        <p className="text-xs text-brand-text-muted text-center italic">
          Earn{" "}
          <span className="text-white font-bold">
            {nextLevelTotal - progress.currentXP} more XP
          </span>{" "}
          to reach Level {progress.level + 1}
        </p>
      </div>
    </div>
  );
}
