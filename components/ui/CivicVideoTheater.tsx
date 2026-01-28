/* cSpell:ignore supabase PoliFy */
"use client";

import { useState, useEffect } from "react";
import {
  X,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Send,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react";
import { CivicVideoPlayer } from "@/components/ui/CivicVideoPlayer";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase";
import { FollowButton } from "@/components/ui/FollowButton";

interface Profile {
  full_name: string | null;
  avatar_url: string | null;
}

interface CommentResponse {
  id: string;
  text: string;
  created_at: string;
  user_id: string;
  likes: number;
  profiles: Profile | Profile[] | null;
}

interface Comment {
  id: string;
  user: string;
  text: string;
  time: string;
  avatar: string;
  likes: number;
  user_id: string;
}

interface CivicVideoTheaterProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  videoUrl: string;
  title: string;
  host: string;
  views: string;
  timeAgo: string;
}

export function CivicVideoTheater({
  isOpen,
  onClose,
  videoId,
  videoUrl,
  title,
  host,
  views,
  timeAgo,
}: CivicVideoTheaterProps) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  const supabase = createClient();

  useEffect(() => {
    if (!isOpen || !videoId) return;

    const fetchData = async () => {
      // 1. Fetch Comments with Profile Info
      const { data: commentsData } = await supabase
        .from("video_comments")
        .select(
          `
          id,
          text,
          created_at,
          user_id,
          likes,
          profiles:profiles (
            full_name,
            avatar_url
          )
        `,
        )
        .eq("video_id", videoId)
        .order("created_at", { ascending: false });

      if (commentsData) {
        const formattedComments: Comment[] = (
          commentsData as unknown as CommentResponse[]
        ).map((c) => {
          const profile = Array.isArray(c.profiles)
            ? c.profiles[0]
            : c.profiles;
          return {
            id: c.id,
            text: c.text,
            user: profile?.full_name || "Anonymous",
            avatar: profile?.avatar_url || "",
            time: new Date(c.created_at).toLocaleDateString(),
            likes: c.likes || 0,
            user_id: c.user_id,
          };
        });
        setComments(formattedComments);
      }

      // 2. Fetch Reaction Counts
      const { data: reactionsData } = await supabase
        .from("video_reactions")
        .select("reaction_type")
        .eq("video_id", videoId);

      if (reactionsData) {
        setLikes(
          reactionsData.filter((r) => r.reaction_type === "like").length,
        );
        setDislikes(
          reactionsData.filter((r) => r.reaction_type === "dislike").length,
        );
      }

      // 3. Fetch Current User's Reaction
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: myReaction } = await supabase
          .from("video_reactions")
          .select("reaction_type")
          .eq("video_id", videoId)
          .eq("user_id", user.id)
          .single();

        if (myReaction) {
          setHasLiked(myReaction.reaction_type === "like");
          setHasDisliked(myReaction.reaction_type === "dislike");
        }
      }
    };

    fetchData();
  }, [isOpen, videoId, supabase]);

  if (!isOpen) return null;

  const handleLike = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return alert("Please log in to like videos");

    const newType = hasLiked ? null : "like";

    if (newType === null) {
      await supabase
        .from("video_reactions")
        .delete()
        .eq("video_id", videoId)
        .eq("user_id", user.id);
      setLikes(Math.max(0, likes - 1));
      setHasLiked(false);
    } else {
      await supabase
        .from("video_reactions")
        .upsert({ video_id: videoId, user_id: user.id, reaction_type: "like" });
      setLikes(likes + 1);
      setHasLiked(true);
      if (hasDisliked) {
        setDislikes(Math.max(0, dislikes - 1));
        setHasDisliked(false);
      }
    }
  };

  const handleDislike = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return alert("Please log in to dislike videos");

    const newType = hasDisliked ? null : "dislike";

    if (newType === null) {
      await supabase
        .from("video_reactions")
        .delete()
        .eq("video_id", videoId)
        .eq("user_id", user.id);
      setDislikes(Math.max(0, dislikes - 1));
      setHasDisliked(false);
    } else {
      await supabase.from("video_reactions").upsert({
        video_id: videoId,
        user_id: user.id,
        reaction_type: "dislike",
      });
      setDislikes(dislikes + 1);
      setHasDisliked(true);
      if (hasLiked) {
        setLikes(Math.max(0, likes - 1));
        setHasLiked(false);
      }
    }
  };

  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return alert("Please log in to comment");

    const { data } = await supabase
      .from("video_comments")
      .insert({
        video_id: videoId,
        user_id: user.id,
        text: newComment,
      })
      .select(
        `
        id,
        text,
        created_at,
        profiles (full_name, avatar_url)
      `,
      )
      .single();

    if (data) {
      const profileData = Array.isArray(data.profiles)
        ? data.profiles[0]
        : (data.profiles as unknown as Profile);
      const formatted: Comment = {
        id: data.id,
        text: data.text,
        user: profileData?.full_name || "You",
        avatar: profileData?.avatar_url || "",
        time: "Just now",
        likes: 0,
        user_id: user.id,
      };
      setComments([formatted, ...comments]);
      setNewComment("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-300 backdrop-blur-3xl bg-black/95 overflow-hidden overscroll-none">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white hover:bg-white/20 hover:scale-110 transition-all z-50 group border border-white/10"
      >
        <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
      </button>

      <div className="relative w-full h-full flex flex-col lg:flex-row bg-neutral-900 overflow-hidden">
        {/* Left: Video Section (Cinema Mode) */}
        <div className="flex-[2.5] bg-black flex flex-col justify-center relative overflow-hidden">
          {/* If it's a YouTube URL, render iframe directly for best performance, else fallback to player */}
          {/* Note: videoUrl from feed-service is mostly 'https://www.youtube.com/embed/...' */}
          {videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be") ? (
            <iframe
              src={
                videoUrl.includes("embed")
                  ? `${videoUrl}${videoUrl.includes("?") ? "&" : "?"}autoplay=1&modestbranding=1&rel=0`
                  : `https://www.youtube.com/embed/${videoUrl.split("v=")[1]?.split("&")[0] || videoUrl.split("/").pop()}?autoplay=1&modestbranding=1&rel=0`
              }
              title={title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <CivicVideoPlayer
              src={videoUrl}
              autoPlay
              className="w-full h-full object-contain"
            />
          )}

          {/* Mobile Text Overlay */}
          <div className="lg:hidden absolute bottom-0 inset-x-0 p-5 bg-linear-to-t from-black via-black/80 to-transparent pointer-events-none">
            <h2 className="text-white font-bold text-lg line-clamp-2 leading-snug">
              {title}
            </h2>
          </div>
        </div>

        {/* Right: Engagement Panel */}
        <div className="flex-1 flex flex-col w-full lg:min-w-[400px] lg:max-w-[450px] bg-brand-surface border-l border-white/5 relative z-10 glass-effect min-h-0 max-h-full">
          {/* Header Info */}
          <div className="p-4 pb-3 border-b border-white/5 space-y-3 bg-brand-surface/90 backdrop-blur-md shrink-0">
            <div className="space-y-1">
              <h2 className="text-xl font-bold leading-snug text-white/95 line-clamp-2">
                {title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-brand-text-muted font-medium">
                <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider text-white/80">
                  {views.includes("Live") ? "🔴 LIVE" : "Video"}
                </span>
                <span>• {views} views</span>
                <span>• {timeAgo}</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-kenya-red to-kenya-black p-[2px]">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white font-bold uppercase">
                      {host.charAt(0)}
                    </div>
                  </div>
                  {/* Verified Badge */}
                  <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-[2px] border-2 border-brand-surface">
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={4}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-bold text-sm tracking-tight text-white group-hover:text-kenya-red transition-colors">
                    {host}
                  </p>
                  <p className="text-[10px] text-brand-text-muted">
                    Official Channel
                  </p>
                </div>
              </div>
              <FollowButton
                targetId={videoId}
                targetType="profile"
                className="h-8 px-5 rounded-full text-xs font-bold bg-white text-black hover:bg-white/90"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
                <button
                  onClick={handleLike}
                  className={cn(
                    "flex items-center gap-2 px-4 py-1.5 rounded-full transition-all text-xs font-bold",
                    hasLiked
                      ? "bg-white text-black shadow-lg shadow-white/10"
                      : "text-brand-text-muted hover:text-white hover:bg-white/5",
                  )}
                >
                  <ThumbsUp
                    className={cn("w-4 h-4", hasLiked ? "fill-current" : "")}
                  />
                  {likes || "Like"}
                </button>
                <div className="w-px h-4 bg-white/10" />
                <button
                  onClick={handleDislike}
                  className={cn(
                    "flex items-center px-4 py-1.5 rounded-full transition-all text-xs",
                    hasDisliked
                      ? "bg-white text-black shadow-lg shadow-white/10"
                      : "text-brand-text-muted hover:text-white hover:bg-white/5",
                  )}
                >
                  <ThumbsDown
                    className={cn("w-4 h-4", hasDisliked ? "fill-current" : "")}
                  />
                </button>
              </div>

              <div className="flex gap-2">
                <button className="p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all text-brand-text-muted hover:text-white">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all text-brand-text-muted hover:text-white">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <div className="flex items-center gap-2 sticky top-0 bg-brand-surface/95 backdrop-blur-xl py-2 z-10 border-b border-white/5 -mx-6 px-6">
              <span className="font-bold text-sm text-white">Comments</span>
              <span className="text-xs text-brand-text-muted font-medium">
                {comments.length}
              </span>
            </div>

            {comments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-brand-text-muted opacity-50 space-y-2">
                <MessageSquare className="w-8 h-8" />
                <p className="text-xs">No comments yet. Be the first!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex gap-3 group/comment animate-in fade-in slide-in-from-bottom-2 duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-surface-secondary border border-white/10 flex items-center justify-center text-[10px] font-black text-brand-text-muted shrink-0 uppercase">
                    {comment.user.charAt(0)}
                  </div>
                  <div className="space-y-1 w-full">
                    <div className="flex items-baseline justify-between w-full">
                      <span className="text-xs font-bold text-white/90">
                        {comment.user}
                      </span>
                      <span className="text-[10px] text-brand-text-muted">
                        {comment.time}
                      </span>
                    </div>
                    <p className="text-sm text-brand-text leading-relaxed font-light">
                      {comment.text}
                    </p>
                    <div className="flex items-center gap-4 pt-1 opacity-0 group-hover/comment:opacity-100 transition-opacity">
                      <button className="flex items-center gap-1.5 text-[10px] font-bold text-brand-text-muted hover:text-white transition-colors">
                        <ThumbsUp className="w-3 h-3" />
                        {comment.likes || "Like"}
                      </button>
                      <button className="text-[10px] font-bold text-brand-text-muted hover:text-white transition-colors">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Spacer for bottom input */}
            <div className="h-20" />
          </div>

          {/* Comment Input */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-brand-surface-secondary/80 backdrop-blur-xl border-t border-white/5">
            <div className="relative group/input">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handlePostComment()}
                placeholder="Share your opinion..."
                className="w-full bg-black/40 border border-white/10 rounded-full py-3.5 pl-5 pr-12 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all placeholder:text-white/20"
              />
              <button
                onClick={handlePostComment}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/10 text-white rounded-full hover:bg-white hover:text-black transition-all disabled:opacity-0 disabled:scale-75"
                disabled={!newComment.trim()}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
