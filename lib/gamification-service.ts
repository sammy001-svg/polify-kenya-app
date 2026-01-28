import { createClient } from "@/lib/supabase";
import { UserProgress, LEVEL_THRESHOLDS, UserLevel } from "@/lib/gamification";

export const GamificationService = {
  async getUserProgress(userId: string): Promise<UserProgress | null> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching user progress:", error);
      return null;
    }

    // Map DB fields to TypeScript interface
    return {
      userId: data.user_id,
      level: data.level as UserLevel,
      currentXP: data.current_xp,
      totalXP: data.total_xp,
      nextLevelXP:
        LEVEL_THRESHOLDS[((data.level as number) + 1) as UserLevel] || 999999,
      badges: data.badges || [],
      completedPaths: [], // Not yet in DB schema explicitly, maybe in jsonb?
      completedModules: data.completed_modules || [],
      currentStreak: data.streak || 0,
      longestStreak: 0, // Not in DB schema
      lastLoginDate: data.last_login,
      joinDate: new Date().toISOString(), // Placeholder
    };
  },

  async awardXP(userId: string, amount: number, action: string) {
    const supabase = createClient();

    // 1. Get current progress
    const { data: current, error: fetchError } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (fetchError || !current) {
      console.error("Error fetching progress for XP award:", fetchError);
      return { success: false };
    }

    let currentLevel = current.level || 1;
    let leveledUp = false;

    // 2. Check for Level Up
    const nextLevelThreshold =
      LEVEL_THRESHOLDS[(currentLevel + 1) as UserLevel];

    // 3. Calculate new values (these are effectively const in this scope before update)
    const newTotalXP = (current.total_xp || 0) + amount;
    const newCurrentXP = (current.current_xp || 0) + amount;

    if (nextLevelThreshold && newTotalXP >= nextLevelThreshold) {
      currentLevel++;
      leveledUp = true;
      // In a complex system, we might reset currentXP or keep it accumulating.
      // Based on the type definition `nextLevelXP`, it seems `currentXP` might be "XP within this level" or "Total XP".
      // Let's assume Total XP for simplicity in this implementation phase.
    }

    // 3. Update DB
    const { error: updateError } = await supabase
      .from("user_progress")
      .update({
        total_xp: newTotalXP,
        current_xp: newCurrentXP, // Assuming this tracks total for now, or use logic to reset
        level: currentLevel,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId);

    if (updateError) {
      console.error("Error naming XP:", updateError);
      return { success: false };
    }

    // 4. Dispatch Event for UI
    if (typeof window !== "undefined") {
      const event = new CustomEvent("xp-gained", {
        detail: {
          amount,
          reason: action,
          levelUp: leveledUp,
          newLevel: currentLevel,
        },
      });
      window.dispatchEvent(event);
    }

    return {
      success: true,
      leveledUp,
      newLevel: currentLevel,
      xpEarned: amount,
    };
  },

  async getLeaderboard(limit = 10) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("user_progress")
      .select(
        `
        *,
        profiles (
          full_name,
          avatar_url
        )
      `,
      )
      .order("total_xp", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching leaderboard:", error);
      return [];
    }

    return data.map((entry, index) => ({
      rank: index + 1,
      userId: entry.user_id,
      name: entry.profiles?.full_name || "Anonymous Citizen",
      avatar:
        entry.profiles?.avatar_url ||
        `https://api.dicebear.com/7.x/micah/svg?seed=${entry.user_id}`,
      level: entry.level,
      xp: entry.total_xp,
      badges: entry.badges || [],
      department: "Nairobi", // Placeholder
    }));
  },
};
