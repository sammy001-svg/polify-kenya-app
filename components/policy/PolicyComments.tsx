"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, Trash2, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

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
  const supabase = createClient();

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

    setLoading(true);
    const { error } = await supabase
      .from('policy_comments')
      .insert({
        policy_id: policyId,
        user_id: currentUser.id,
        content: newComment.trim()
      });

    if (!error) {
      setNewComment("");
      // Real-time listener will fetch the new comment automatically
    } else {
      console.error("Comment Error:", error);
      alert(`Could not post comment: ${error.message}`);
    }
    setLoading(false);
  };

  const handleDelete = async (commentId: string) => {
    const { error } = await supabase
      .from('policy_comments')
      .delete()
      .eq('id', commentId);
    
    if (error) alert("Error deleting comment.");
  };

  return (
    <div className="space-y-4 pt-4 animate-in fade-in slide-in-from-top-2 duration-500">
      <div className="flex items-center gap-2 px-1 text-brand-text-muted">
        <MessageSquare className="w-4 h-4" />
        <h4 className="text-xs font-bold uppercase tracking-widest">Community Discussion</h4>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
        {comments.length === 0 ? (
          <p className="text-sm text-brand-text-muted italic px-1">No comments yet. Be the first to weigh in!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-brand-surface p-3 rounded-xl border border-border group relative">
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-brand-surface-highlight flex items-center justify-center">
                    <User className="w-3 h-3 text-brand-text-muted" />
                  </div>
                  <span className="text-xs font-black text-brand-primary">{comment.profiles.full_name}</span>
                  <span className="text-[10px] text-brand-text-muted">
                    {formatDistanceToNow(new Date(comment.created_at))} ago
                  </span>
                </div>
                {currentUser?.id === comment.user_id && (
                  <button 
                    onClick={() => handleDelete(comment.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-kenya-red transition-all"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
              <p className="text-sm text-brand-text leading-relaxed">{comment.content}</p>
            </div>
          ))
        )}
      </div>

      {currentUser ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input 
            placeholder="Share your thoughts..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 bg-brand-surface h-10 rounded-full text-xs"
          />
          <Button 
            disabled={loading || !newComment.trim()} 
            size="icon" 
            className="bg-brand-primary rounded-full shrink-0"
          >
            <Send className="w-4 h-4" />
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
