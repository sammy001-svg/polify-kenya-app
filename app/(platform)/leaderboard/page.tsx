"use client";

import { useState, useEffect } from "react";
import { Sparkles, Trophy, Award } from "lucide-react";
import { createClient } from "@/lib/supabase";
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
          <div className="p-4 rounded-xl bg-linear-to-br from-kenya-green/20 to-brand-bg border border-kenya-green/30 mt-4">
            <p className="text-xs font-bold text-white mb-2">
              Want to climb faster?
            </p>
            <p className="text-[10px] text-brand-text-muted mb-3">
              Complete &quot;Budget Basics&quot; to earn +500 XP instantly.
            </p>
            <button className="w-full py-2 bg-kenya-green text-black font-black text-xs uppercase rounded hover:bg-white transition-colors">
              Start Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
