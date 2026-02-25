"use client";

import { Trophy, TrendingUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { DEMO_LEADERBOARD } from "@/lib/gamification";
import Image from "next/image";

export interface LeaderboardUser {
    rank: number;
    userId: string;
    name: string;
    avatar: string; // URL or Initials
    level: number;
    xp: number;
    badges: string[];
    department?: string;
    highlight?: boolean;
    isTrendUp?: boolean;
    badge?: string; // For mock data compatibility
}

export function CivicLeaderboard({ users }: { users?: LeaderboardUser[] }) {
  const displayUsers = (users || DEMO_LEADERBOARD) as LeaderboardUser[];
  
  return (
    <div className="bg-brand-surface border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl">
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/20">
        <h3 className="font-black uppercase tracking-widest text-xs flex items-center gap-2 text-brand-text-muted">
          <Trophy className="w-4 h-4 text-kenya-gold" />
          Top Contributors
        </h3>
        <span className="text-[10px] bg-white/5 px-2 py-1 rounded-full text-brand-text-muted">
          This Week
        </span>
      </div>

      <div className="divide-y divide-white/5">
        {displayUsers.map((user, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center gap-4 p-4 transition-colors hover:bg-white/5",
              user.highlight && "bg-kenya-gold/5 border-l-2 border-kenya-gold",
            )}
          >
            {/* Rank */}
            <div
              className={cn(
                "w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-black shrink-0",
                index === 0
                  ? "bg-kenya-gold text-black"
                  : index === 1
                    ? "bg-gray-300 text-black"
                    : index === 2
                      ? "bg-amber-700 text-white"
                      : "bg-white/5 text-brand-text-muted",
              )}
            >
              {user.rank}
            </div>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-brand-surface-highlight border border-white/10 flex items-center justify-center text-[10px] font-black text-white relative overflow-hidden shrink-0">
               {user.avatar.startsWith('http') || user.avatar.startsWith('/') ? (
                  <Image 
                    src={user.avatar} 
                    alt={user.name} 
                    fill 
                    className="object-cover"
                  />
               ) : (
                  <span className="relative z-10">{user.avatar}</span>
               )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  "text-sm font-bold truncate",
                  user.highlight ? "text-kenya-gold" : "text-brand-text",
                )}
              >
                {user.name}
              </p>
              <div className="flex items-center gap-2 text-[10px] text-brand-text-muted">
                <span className="bg-white/5 px-1.5 rounded uppercase tracking-wider">
                  {user.badge || (user.badges && user.badges.length > 0 ? `${user.badges.length} Badges` : 'Citizen')}
                </span>
                <span>Lvl {user.level || 1}</span>
              </div>
            </div>

            {/* XP & Trend */}
            <div className="text-right">
              <p className="text-sm font-black text-brand-text tabular-nums">
                {(user.xp || 0).toLocaleString()}
              </p>
              <div className="flex justify-end">
                {user.isTrendUp ? (
                  <TrendingUp className="w-3 h-3 text-kenya-green" />
                ) : (
                  <Minus className="w-3 h-3 text-brand-text-muted opacity-50" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 text-center border-t border-white/5 bg-black/20">
        <button className="text-[10px] font-bold uppercase tracking-widest text-brand-text-muted hover:text-white transition-colors">
          View Full Rankings
        </button>
      </div>
    </div>
  );
}
