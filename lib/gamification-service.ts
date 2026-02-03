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
      if (error.code === 'PGRST116') {
         // User has no progress record yet, return default empty progress instead of null or error
         return {
            userId: userId,
            level: 1,
            currentXP: 0,
            totalXP: 0,
            nextLevelXP: LEVEL_THRESHOLDS[2],
            badges: [],
            completedPaths: [],
            completedModules: [],
            currentStreak: 0,
            longestStreak: 0,
            lastLoginDate: new Date().toISOString(),
            joinDate: new Date().toISOString(),
         };
      }
      console.error("Error fetching user progress:", JSON.stringify(error, null, 2));
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
    const result = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", userId)
      .single();
    
    let current = result.data;
    const fetchError = result.error;

    // If no record exists, initialize a default one
    if (fetchError && fetchError.code === 'PGRST116') {
      const defaultProgress = {
        user_id: userId,
        level: 1,
        current_xp: 0,
        total_xp: 0,
        badges: [],
        completed_modules: [],
        streak: 0,
        updated_at: new Date().toISOString()
      };
      
      const { data: inserted, error: insertError } = await supabase
        .from("user_progress")
        .insert(defaultProgress)
        .select()
        .single();
        
      if (insertError) {
        console.error("Failed to initialize user progress:", insertError);
        return { success: false };
      }
      current = inserted;
    } else if (fetchError || !current) {
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

    return (data as unknown[]).map((row, index) => {
      const entry = row as { 
        user_id: string; 
        level: number; 
        total_xp: number; 
        badges: string[];
        profiles: { full_name: string; avatar_url: string } | null;
      };
      return {
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
      };
    });
  },

  // Specific Civic Actions
  async verifyProject(userId: string, projectId: string) {
    return this.awardXP(userId, 50, `Verified project: ${projectId}`);
  },

  async voteOnBill(userId: string, billId: string) {
    return this.awardXP(userId, 20, `Voted on bill: ${billId}`);
  },

  async shareInsight(userId: string) {
    return this.awardXP(userId, 30, "Shared a civic insight");
  },

  async watchShort(userId: string, shortId: string) {
    return this.awardXP(userId, 10, `Watched Bunge Bite: ${shortId}`);
  },

  async reactToShort(userId: string, shortId: string, reaction: 'yay' | 'nay') {
    return this.awardXP(userId, 15, `Reacted ${reaction} to Bunge Bite: ${shortId}`);
  }
};
