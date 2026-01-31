"use client";

import { useState, useEffect } from "react";
import { Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MOCK_AUDIT_COMMENTS } from "@/lib/auditor-data";

interface AuditCommentsProps {
    reportId: string;
}

interface Comment {
    id: string;
    user: string;
    text: string;
    timestamp: string;
    reportId: string;
    isLocal?: boolean;
}

export function AuditComments({ reportId }: AuditCommentsProps) {
  // 1. Initialize with Mock Data directly
  const [comments, setComments] = useState<Comment[]>(() => {
    return MOCK_AUDIT_COMMENTS.filter(c => c.reportId === reportId);
  });
  const [newComment, setNewComment] = useState("");

  // 2. Load LocalStorage comments on mount/change
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
        const saved = localStorage.getItem(`audit_comments_${reportId}`);
        if (saved) {
            const localComments: Comment[] = JSON.parse(saved);
            // Verify we don't already have them (though initialization above resets on reportId change)
            // We just need to merge: Local (Recent) + Mock (History)
            // But wait, our mock data is static. Local data is user added.
            setTimeout(() => {
                setComments(prev => {
                    // simple dedupe check by ID to be safe, though not strictly necessary if logic is clean
                    const existingIds = new Set(prev.map(c => c.id));
                    const newLocals = localComments.filter(c => !existingIds.has(c.id));
                    
                    if (newLocals.length === 0) return prev; // Avoid unnecessary re-render
                    
                    return [...newLocals, ...prev];
                });
            }, 0);
        }
    } catch (e) {
        console.error("Failed to load comments", e);
    }
  }, [reportId]);

  const handlePost = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      user: "You", // Real user name would come from auth context
      text: newComment,
      timestamp: "Just now",
      reportId: reportId,
      isLocal: true
    };

    const updatedComments = [comment, ...comments];
    setComments(updatedComments);
    setNewComment("");

    // Persist only local comments to avoid duplicating mock data in storage
    const currentLocal = updatedComments.filter(c => c.isLocal);
    localStorage.setItem(`audit_comments_${reportId}`, JSON.stringify(currentLocal));
  };

  return (
    <div className="flex flex-col h-[500px] bg-brand-surface border border-white/5 rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-white/5 bg-white/5">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          Public Discussion <span className="text-brand-text-muted font-normal text-xs">({comments.length})</span>
        </h3>
      </div>

      <ScrollArea className="flex-1 p-4">
        {comments.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-50">
                <p className="text-sm text-brand-text-muted">No comments yet. Be the first to discuss this report.</p>
            </div>
        ) : (
            <div className="space-y-6">
            {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3 group animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/5">
                    <User className="w-4 h-4 text-brand-text-muted" />
                </div>
                <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{comment.user}</span>
                    <span className="text-[10px] text-brand-text-muted">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-brand-text leading-relaxed">{comment.text}</p>
                </div>
                </div>
            ))}
            </div>
        )}
      </ScrollArea>

      <div className="p-4 border-t border-white/5 bg-white/5 mt-auto">
        <div className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handlePost()}
            placeholder="Share your thoughts on this finding..."
            className="flex-1 bg-brand-surface-secondary border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder:text-brand-text-muted focus:outline-none focus:ring-1 focus:ring-brand-primary/50 transition-all"
          />
          <Button 
            size="icon" 
            onClick={handlePost} 
            disabled={!newComment.trim()}
            className="h-10 w-10 rounded-full bg-brand-primary text-black hover:bg-brand-primary/90 shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
