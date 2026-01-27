"use client";

import { useState, useEffect } from "react";
import { X, ThumbsUp, ThumbsDown, Share2, Send, MessageSquare, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export function CivicVideoTheater({ isOpen, onClose, videoId, videoUrl, title, host, views, timeAgo }: CivicVideoTheaterProps) {
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
        .from('video_comments')
        .select(`
          id,
          text,
          created_at,
          user_id,
          likes,
          profiles:profiles (
            full_name,
            avatar_url
          )
        `)
        .eq('video_id', videoId)
        .order('created_at', { ascending: false });

      if (commentsData) {
        const formattedComments: Comment[] = (commentsData as unknown as CommentResponse[]).map((c) => {
          const profile = Array.isArray(c.profiles) ? c.profiles[0] : c.profiles;
          return {
            id: c.id,
            text: c.text,
            user: profile?.full_name || 'Anonymous',
            avatar: profile?.avatar_url || '',
            time: new Date(c.created_at).toLocaleDateString(),
            likes: c.likes || 0,
            user_id: c.user_id
          };
        });
        setComments(formattedComments);
      }

      // 2. Fetch Reaction Counts
      const { data: reactionsData } = await supabase
        .from('video_reactions')
        .select('reaction_type')
        .eq('video_id', videoId);

      if (reactionsData) {
        setLikes(reactionsData.filter(r => r.reaction_type === 'like').length);
        setDislikes(reactionsData.filter(r => r.reaction_type === 'dislike').length);
      }

      // 3. Fetch Current User's Reaction
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: myReaction } = await supabase
          .from('video_reactions')
          .select('reaction_type')
          .eq('video_id', videoId)
          .eq('user_id', user.id)
          .single();
        
        if (myReaction) {
          setHasLiked(myReaction.reaction_type === 'like');
          setHasDisliked(myReaction.reaction_type === 'dislike');
        }
      }
    };

    fetchData();
  }, [isOpen, videoId, supabase]);

  if (!isOpen) return null;

  const handleLike = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert("Please log in to like videos");

    const newType = hasLiked ? null : 'like';
    
    if (newType === null) {
      await supabase.from('video_reactions').delete().eq('video_id', videoId).eq('user_id', user.id);
      setLikes(Math.max(0, likes - 1));
      setHasLiked(false);
    } else {
      await supabase.from('video_reactions').upsert({ video_id: videoId, user_id: user.id, reaction_type: 'like' });
      setLikes(likes + 1);
      setHasLiked(true);
      if (hasDisliked) {
        setDislikes(Math.max(0, dislikes - 1));
        setHasDisliked(false);
      }
    }
  };

  const handleDislike = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert("Please log in to dislike videos");

    const newType = hasDisliked ? null : 'dislike';
    
    if (newType === null) {
      await supabase.from('video_reactions').delete().eq('video_id', videoId).eq('user_id', user.id);
      setDislikes(Math.max(0, dislikes - 1));
      setHasDisliked(false);
    } else {
      await supabase.from('video_reactions').upsert({ video_id: videoId, user_id: user.id, reaction_type: 'dislike' });
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
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert("Please log in to comment");

    const { data } = await supabase
      .from('video_comments')
      .insert({
        video_id: videoId,
        user_id: user.id,
        text: newComment
      })
      .select(`
        id,
        text,
        created_at,
        profiles (full_name, avatar_url)
      `)
      .single();

    if (data) {
      const profileData = Array.isArray(data.profiles) ? data.profiles[0] : (data.profiles as unknown as Profile);
      const formatted: Comment = {
        id: data.id,
        text: data.text,
        user: profileData?.full_name || 'You',
        avatar: profileData?.avatar_url || '',
        time: 'Just now',
        likes: 0,
        user_id: user.id
      };
      setComments([formatted, ...comments]);
      setNewComment("");
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300 backdrop-blur-xl bg-black/90">
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-50 overflow-hidden"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative w-full max-w-7xl h-full max-h-[90vh] flex flex-col lg:flex-row bg-brand-bg rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/10 translate-y-0 scale-100 animate-in zoom-in-95 duration-500">
        
        {/* Left: Video Section (Protrudes/Expands) */}
        <div className="flex-2 bg-black flex flex-col justify-center relative overflow-hidden group">
          <CivicVideoPlayer 
            src={videoUrl} 
            autoPlay 
            className="w-full h-full object-contain"
          />
          
          {/* Mobile Overlay Title (Hidden on Large Screen) */}
          <div className="lg:hidden absolute bottom-0 inset-x-0 p-4 bg-linear-to-t from-black to-transparent pointer-events-none">
             <h2 className="text-white font-bold text-lg line-clamp-1">{title}</h2>
          </div>
        </div>

        {/* Right: Engagement & Comments Section */}
        <div className="flex-1 flex flex-col w-full lg:w-[400px] bg-brand-surface border-l border-white/5 overflow-hidden">
          {/* Header Info */}
          <div className="p-6 border-b border-white/5 space-y-4">
             <h2 className="text-xl font-bold leading-tight">{title}</h2>
             
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <div className="w-10 h-10 rounded-full bg-kenya-green/20 flex items-center justify-center text-kenya-green font-bold">
                      {host.charAt(0)}
                   </div>
                   <div>
                      <p className="font-bold text-sm tracking-tight">{host}</p>
                      <p className="text-[10px] text-brand-text-muted uppercase tracking-widest">{views} views • {timeAgo}</p>
                   </div>
                </div>
                <FollowButton 
                  targetId={videoId} // Note: Usually this would be hostId, using videoId as placeholder
                  targetType="profile" 
                  className="h-8 px-4"
                />
             </div>

             {/* Engagement Bar */}
             <div className="flex items-center gap-2 pt-2">
                <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/5">
                   <button 
                    onClick={handleLike}
                    className={cn(
                      "flex items-center gap-2 px-4 py-1.5 rounded-full transition-all text-sm font-bold",
                      hasLiked ? "bg-white text-black" : "text-white hover:bg-white/10"
                    )}
                   >
                     <ThumbsUp className={cn("w-4 h-4", hasLiked ? "fill-current" : "")} />
                     {likes}
                   </button>
                   <div className="w-px h-4 bg-white/20" />
                   <button 
                    onClick={handleDislike}
                    className={cn(
                      "flex items-center px-4 py-1.5 rounded-full transition-all text-sm",
                      hasDisliked ? "bg-white text-black" : "text-white hover:bg-white/10"
                    )}
                   >
                     <ThumbsDown className={cn("w-4 h-4", hasDisliked ? "fill-current" : "")} />
                   </button>
                </div>
                
                <button className="flex items-center gap-2 p-2 px-4 bg-white/5 hover:bg-white/10 rounded-full border border-white/5 transition-all text-sm font-bold text-white">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>

                <button className="p-2.5 bg-white/5 hover:bg-white/10 rounded-full border border-white/5 transition-all text-white ml-auto">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
             </div>
          </div>

          {/* Comments Section */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
            <div className="flex items-center gap-2 mb-2">
               <MessageSquare className="w-4 h-4 text-brand-text-muted" />
               <span className="text-sm font-bold uppercase tracking-widest text-brand-text-muted">{comments.length} Comments</span>
            </div>

            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3 group/comment">
                <div className="w-8 h-8 rounded-full bg-brand-surface-secondary border border-white/10 flex items-center justify-center text-[10px] font-bold shrink-0">
                  {comment.user.charAt(0)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold">{comment.user}</span>
                    <span className="text-[10px] text-brand-text-muted">{comment.time}</span>
                  </div>
                  <p className="text-sm text-brand-text-muted leading-relaxed line-clamp-3 group-hover/comment:line-clamp-none transition-all">
                    {comment.text}
                  </p>
                  <div className="flex items-center gap-4 pt-1">
                    <button className="flex items-center gap-1.5 text-xs text-brand-text-muted hover:text-white transition-colors">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      {comment.likes}
                    </button>
                    <button className="text-xs text-brand-text-muted hover:text-white transition-colors">Reply</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comment input field */}
          <div className="p-4 border-t border-white/5 bg-brand-surface-secondary/50">
            <div className="relative">
              <input 
                type="text" 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
                placeholder="Add a comment..." 
                className="w-full bg-brand-surface border border-white/10 rounded-2xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-kenya-green/50 transition-all"
              />
              <button 
                onClick={handlePostComment}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-kenya-green hover:text-kenya-green/80 transition-all disabled:opacity-50"
                disabled={!newComment.trim()}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[10px] text-center text-brand-text-muted mt-3 uppercase tracking-tighter opacity-50">
               Community standards enforced by PoliFy AI ⚖️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
