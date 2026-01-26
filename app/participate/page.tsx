"use client";

import { LEARNING_PATHS, MOCK_USER_PROGRESS, MOCK_POLICY_IDEAS, ACHIEVEMENT_BADGES } from "@/lib/gamification";
import { ProgressCard } from "@/components/gamification/ProgressCard";
import { BadgeCard } from "@/components/gamification/BadgeCard";
import { LearningPathCard } from "@/components/learning/LearningPathCard";
import { PolicyIdeaCard } from "@/components/policy/PolicyIdeaCard";
import { Award, BookOpen, Lightbulb, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ParticipatePage() {
  // Calculate path progress based on mock user data
  const getPathProgress = (pathId: string) => {
    if (MOCK_USER_PROGRESS.completedPaths.includes(pathId)) return 100;
    const path = LEARNING_PATHS.find(p => p.id === pathId);
    if (!path) return 0;
    
    const completedModules = path.modules.filter(m => 
      MOCK_USER_PROGRESS.completedModules.includes(m.id)
    ).length;
    
    return Math.round((completedModules / path.modules.length) * 100);
  };
  
  // Get earned badges
  const earnedBadges = [...LEARNING_PATHS.map(p => p.badge), ...ACHIEVEMENT_BADGES]
    .filter(b => MOCK_USER_PROGRESS.badges.includes(b.id));
  
  // Get top policy ideas (most votes)
  const topPolicyIdeas = [...MOCK_POLICY_IDEAS]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 2);
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 py-6">
        <div className="flex items-center justify-center gap-3">
          <Award className="w-10 h-10 text-kenya-gold animate-pulse" />
          <h1 className="text-5xl font-black tracking-tight">Participate & Learn</h1>
          <TrendingUp className="w-10 h-10 text-kenya-green" />
        </div>
        <p className="text-lg text-brand-text-muted max-w-3xl mx-auto">
          Your civic journey: Learn, earn badges, and shape policy. Every action brings you closer to becoming an informed civic leader.
        </p>
      </div>
      
      {/* User Progress */}
      <div>
        <h2 className="text-2xl font-bold text-brand-text mb-4">Your Progress</h2>
        <ProgressCard progress={MOCK_USER_PROGRESS} />
      </div>
      
      {/* Recent Badges */}
      {earnedBadges.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-brand-text">Your Badges</h2>
            <Link href="/profile" className="text-sm text-kenya-gold hover:underline flex items-center gap-1">
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-none">
            {earnedBadges.slice(0, 6).map(badge => (
              <BadgeCard key={badge.id} badge={badge} isEarned={true} size="md" />
            ))}
          </div>
        </div>
      )}
      
      {/* Learning Paths */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-kenya-green" />
            <h2 className="text-2xl font-bold text-brand-text">Learning Paths</h2>
          </div>
          <Link href="/learn" className="text-sm text-kenya-gold hover:underline flex items-center gap-1">
            View All Paths
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {LEARNING_PATHS.slice(0, 2).map(path => (
            <LearningPathCard 
              key={path.id} 
              path={path} 
              progress={getPathProgress(path.id)}
            />
          ))}
        </div>
      </div>
      
      {/* Policy Ideas */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Lightbulb className="w-6 h-6 text-kenya-gold" />
            <h2 className="text-2xl font-bold text-brand-text">Top Policy Ideas</h2>
          </div>
          <Link href="/policy-ideas" className="text-sm text-kenya-gold hover:underline flex items-center gap-1">
            View All & Submit
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topPolicyIdeas.map(idea => (
            <PolicyIdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-linear-to-r from-kenya-red to-kenya-gold rounded-xl p-8 text-center">
        <h3 className="text-3xl font-bold text-white mb-3">Ready to Make an Impact?</h3>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          Complete learning paths to earn badges, submit policy ideas to influence government, and climb the leaderboard to become a civic champion.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link 
            href="/learn"
            className="bg-white text-kenya-red font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Start Learning
          </Link>
          <Link 
            href="/policy-ideas"
            className="bg-kenya-green text-white font-bold px-8 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            Submit an Idea
          </Link>
        </div>
      </div>
    </div>
  );
}
