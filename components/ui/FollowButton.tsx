/* cSpell:ignore supabase */
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { UserPlus, UserMinus, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FollowButtonProps {
  targetId: string;
  targetType: "profile" | "politician";
  className?: string;
  onFollowChange?: (isFollowing: boolean) => void;
}

export function FollowButton({
  targetId,
  targetType,
  className,
  onFollowChange,
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function checkFollowStatus() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const query = supabase
        .from("follows")
        .select("id")
        .eq("follower_id", user.id);

      if (targetType === "profile") {
        query.eq("following_profile_id", targetId);
      } else {
        query.eq("following_politician_id", targetId);
      }

      const { data } = await query.single();
      setIsFollowing(!!data);
      setLoading(false);
    }

    checkFollowStatus();
  }, [targetId, targetType, supabase]);

  const handleFollow = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      alert("Please log in to follow.");
      return;
    }

    setIsProcessing(true);

    if (isFollowing) {
      // Unfollow
      const query = supabase
        .from("follows")
        .delete()
        .eq("follower_id", user.id);

      if (targetType === "profile") {
        query.eq("following_profile_id", targetId);
      } else {
        query.eq("following_politician_id", targetId);
      }

      const { error } = await query;
      if (!error) {
        setIsFollowing(false);
        onFollowChange?.(false);
      }
    } else {
      // Follow
      const followData: {
        follower_id: string;
        following_profile_id?: string;
        following_politician_id?: string;
      } = {
        follower_id: user.id,
      };

      if (targetType === "profile") {
        followData.following_profile_id = targetId;
      } else {
        followData.following_politician_id = targetId;
      }

      const { error } = await supabase.from("follows").insert(followData);
      if (!error) {
        setIsFollowing(true);
        onFollowChange?.(true);
      }
    }

    setIsProcessing(false);
  };

  if (loading) {
    return (
      <Button
        variant="outline"
        size="sm"
        disabled
        className={cn("gap-2", className)}
      >
        <Loader2 className="w-4 h-4 animate-spin" />
        Processing
      </Button>
    );
  }

  return (
    <Button
      onClick={handleFollow}
      variant={isFollowing ? "secondary" : "primary"}
      size="sm"
      disabled={isProcessing}
      className={cn(
        "gap-2 transition-all duration-300",
        isFollowing
          ? "bg-brand-surface-highlight text-brand-text-muted hover:bg-kenya-red/10 hover:text-kenya-red hover:border-kenya-red/30"
          : "bg-kenya-green hover:bg-kenya-green/90 text-white",
        className,
      )}
    >
      {isProcessing ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : isFollowing ? (
        <UserMinus className="w-4 h-4" />
      ) : (
        <UserPlus className="w-4 h-4" />
      )}
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
}
