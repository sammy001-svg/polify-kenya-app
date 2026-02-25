"use client";

import { useState, useEffect } from "react";
import { Sparkles, Trophy, Award, BookOpen, TrendingUp } from "lucide-react";
import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CivicLeaderboard } from "@/components/gamification/CivicLeaderboard";
import { BadgeShowcase } from "@/components/gamification/BadgeShowcase";
import { UserLevelProgress } from "@/components/gamification/UserLevelProgress";
import {
  MOCK_USER_PROGRESS,
  ACHIEVEMENT_BADGES,
  LEARNING_PATHS,
} from "@/lib/gamification";
import { GamificationService } from "@/lib/gamification-service";

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<
    {
      rank: number;
      userId: string;
      name: string;
      avatar: string;
      level: number;
      xp: number;
      badges: string[];
      department: string;
    }[]
  >([]);
  const [userProgress, setUserProgress] = useState(MOCK_USER_PROGRESS);
  // const [currentUser, setCurrentUser] = useState<{ id: string } | null>(null); // Removed unused state

  // Combine all possible badges for the showcase
  const allBadges = [
    ...ACHIEVEMENT_BADGES,
    ...LEARNING_PATHS.map((path) => path.badge),
  ];

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      // setCurrentUser(user);

      const leaders = await GamificationService.getLeaderboard(10);
      setLeaderboard(leaders);

      if (user) {
        const progress = await GamificationService.getUserProgress(user.id, supabase);
        if (progress) {
          setUserProgress(progress);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 animate-in fade-in zoom-in-95 duration-500">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black uppercase tracking-tighter text-white flex items-center gap-3">
          <Trophy className="w-8 h-8 text-kenya-gold" />
          Civic Leaderboard
        </h1>
        <p className="text-brand-text-muted max-w-2xl">
          Compete with fellow citizens, earn badges for learning, and climb the
          ranks by engaging in Kenya&apos;s democratic process.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Progress & Leaderboard */}
        <div className="lg:col-span-2 space-y-8">
          {/* Current Progress */}
          <section className="space-y-4">
            <h2 className="text-sm font-black uppercase tracking-widest text-brand-text-muted flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-primary" /> Your Progress
            </h2>
            <UserLevelProgress progress={userProgress} />
          </section>

          {/* Badge Showcase */}
          <section className="space-y-4">
            <h2 className="text-sm font-black uppercase tracking-widest text-brand-text-muted flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-400" /> Achievements &
              Badges
            </h2>
            <BadgeShowcase
              badges={allBadges}
              unlockedBadgeIds={userProgress.badges}
            />
          </section>
        </div>

        {/* Right Column: Leaderboard */}
        <div className="space-y-4">
          <h2 className="text-sm font-black uppercase tracking-widest text-brand-text-muted flex items-center gap-2">
            <Trophy className="w-4 h-4 text-kenya-gold" /> Top Citizens
          </h2>
          <CivicLeaderboard
            users={leaderboard.length > 0 ? leaderboard : undefined}
          />

          {/* Mini Call to Action */}
          <div className="p-5 rounded-2xl bg-linear-to-br from-brand-primary/20 to-brand-bg border border-brand-primary/30 mt-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-120 transition-transform">
              <BookOpen className="w-12 h-12" />
            </div>
            <p className="text-sm font-bold text-white mb-2 relative z-10">
              Want to climb faster?
            </p>
            <p className="text-xs text-brand-text-muted mb-4 leading-relaxed relative z-10">
              Complete the <span className="text-white font-bold">&quot;Budget Basics&quot;</span> path to earn <span className="text-brand-primary font-bold">+500 XP</span> and the <span className="text-kenya-gold font-bold">Budget Master</span> badge instantly.
            </p>
            <Link href="/learn">
              <Button className="w-full bg-brand-primary hover:bg-white text-white hover:text-black font-black text-xs uppercase rounded-xl transition-all shadow-lg shadow-brand-primary/20">
                Start Learning
              </Button>
            </Link>
          </div>

          {/* Achievement Tips Section */}
          <div className="p-5 rounded-2xl bg-brand-surface border border-white/5 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-brand-text-muted flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" /> Pro Tips
            </h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-3 h-3 text-kenya-green" />
                </div>
                <p className="text-[10px] text-brand-text-muted leading-tight">
                  <span className="text-white font-bold">Streak Bonus:</span> Login 5 days in a row to get a 1.2x XP multiplier on all modules.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Award className="w-3 h-3 text-kenya-gold" />
                </div>
                <p className="text-[10px] text-brand-text-muted leading-tight">
                  <span className="text-white font-bold">Fast-Track:</span> Advanced paths give double the badges but require passing a pre-quiz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
