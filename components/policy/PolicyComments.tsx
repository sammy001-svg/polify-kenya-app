"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, Trash2, User, Ghost } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

/* cSpell:ignore supabase */

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: {
    full_name: string;
  };
}

interface PolicyCommentsProps {
  policyId: string;
}

export function PolicyComments({ policyId }: PolicyCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ id: string } | null>(null);
  const supabase = useMemo(() => createClient(), []);

  const fetchComments = useCallback(async () => {
    const { data } = await supabase
      .from('policy_comments')
      .select(`
        *,
        profiles (full_name)
      `)
      .eq('policy_id', policyId)
      .order('created_at', { ascending: true });
    
    if (data) setComments(data as Comment[]);
  }, [policyId, supabase]);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
      await fetchComments();
    };
    init();

    const channel = supabase
      .channel(`comments-${policyId}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'policy_comments',
        filter: `policy_id=eq.${policyId}`
      }, () => {
        fetchComments();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [policyId, supabase, fetchComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;

    const content = newComment.trim();
    setNewComment("");
    setLoading(true);

    // Optimistic Update
    const optimisticComment: Comment = {
      id: `temp-${Date.now()}`,
      content: content,
      created_at: new Date().toISOString(),
      user_id: currentUser.id,
      profiles: {
        full_name: "You"
      }
    };

    setComments(prev => [optimisticComment, ...prev.filter(c => !c.id.startsWith('temp-'))]);

    const { error } = await supabase
      .from('policy_comments')
      .insert({
        policy_id: policyId,
        user_id: currentUser.id,
        content: content
      });

    if (error) {
      console.error("Comment Error:", error);
      toast.error(`Could not post comment: ${error.message}`);
      // Revert optimistic update on error
      fetchComments();
    } else {
      toast.success("Comment posted!");
    }
    setLoading(false);
  };

  const handleDelete = async (commentId: string) => {
    // Optimistic Delete
    setComments(prev => prev.filter(c => c.id !== commentId));

    const { error } = await supabase
      .from('policy_comments')
      .delete()
      .eq('id', commentId);
    
    if (error) {
      toast.error("Error deleting comment.");
      fetchComments(); // Revert
    } else {
      toast.success("Comment deleted");
    }
  };

  return (
    <div className="space-y-4 pt-4 animate-in fade-in slide-in-from-top-2 duration-500">
      <div className="flex items-center gap-2 px-1 text-brand-text-muted">
        <MessageSquare className="w-4 h-4" />
        <h4 className="text-xs font-bold uppercase tracking-widest">Community Discussion</h4>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto pr-2 no-scrollbar">
        {comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center glass rounded-2xl border-dashed border-white/10">
            <Ghost className="w-8 h-8 text-brand-text-muted mb-2 animate-pulse" />
            <p className="text-xs text-brand-text-muted italic px-4">No comments yet. Be the first to weigh in!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="glass p-3 rounded-xl border border-white/5 group relative hover-lift transition-all">
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-brand-surface-highlight flex items-center justify-center border border-white/10">
                    <User className="w-3.5 h-3.5 text-brand-text-muted" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black text-kenya-gold leading-none">{comment.profiles?.full_name || 'Anonymous'}</span>
                    <span className="text-[9px] text-brand-text-muted mt-0.5">
                      {formatDistanceToNow(new Date(comment.created_at))} ago
                    </span>
                  </div>
                </div>
                {currentUser?.id === comment.user_id && !comment.id.startsWith('temp-') && (
                  <button 
                    onClick={() => handleDelete(comment.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-kenya-red/20 hover:text-kenya-red rounded-full transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <p className="text-sm text-brand-text leading-relaxed pl-8">{comment.content}</p>
            </div>
          ))
        )}
      </div>

      {currentUser ? (
        <form onSubmit={handleSubmit} className="flex gap-2 group/form">
          <Input 
            placeholder="Share your thoughts..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 bg-white/5 border-white/10 h-10 rounded-full text-xs focus:ring-1 focus:ring-kenya-gold transition-all"
          />
          <Button 
            disabled={loading || !newComment.trim()} 
            size="icon" 
            className="bg-kenya-gold text-black rounded-full shrink-0 press-effect hover:scale-105 transition-transform"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </Button>
        </form>
      ) : (
        <div className="p-3 bg-brand-surface rounded-xl border border-dashed border-border text-center">
          <p className="text-xs text-brand-text-muted">Sign in to join the discussion.</p>
        </div>
      )}
    </div>
  );
}
