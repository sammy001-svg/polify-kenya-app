"use client";

import { useState } from "react";
import { Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Comment {
  id: string;
  user: string;
  avatar?: string;
  text: string;
  timestamp: string;
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: "1",
    user: "Citizen Jane",
    text: "This is a crucial development for our democracy. We need more transparency like this!",
    timestamp: "2h ago",
  },
  {
    id: "2",
    user: "John Doe",
    text: "I hope the committee takes these recommendations seriously.",
    timestamp: "4h ago",
  },
  {
    id: "3",
    user: "Sarah K.",
    text: "Wait, does this affect the previous amendment regarding county funds?",
    timestamp: "5h ago",
  },
];

export function CommentSection() {
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [newComment, setNewComment] = useState("");

  const handlePost = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      user: "You", // Placeholder for authenticated user
      text: newComment,
      timestamp: "Just now",
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <div className="flex flex-col h-full bg-neutral-900/50 border-l border-white/5">
      <div className="p-4 border-b border-white/5 bg-neutral-900/80 backdrop-blur-sm sticky top-0 z-10">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          Discussion <span className="text-brand-text-muted font-normal text-xs">({comments.length})</span>
        </h3>
      </div>

      <ScrollArea className="flex-1 p-4">
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
                <p className="text-xs text-brand-text leading-relaxed">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-white/5 bg-neutral-900/80 backdrop-blur-sm mt-auto">
        <div className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handlePost()}
            placeholder="Add to the discussion..."
            className="flex-1 bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm text-white placeholder:text-brand-text-muted focus:outline-none focus:ring-1 focus:ring-brand-primary/50 transition-all"
          />
          <Button 
            size="icon" 
            onClick={handlePost} 
            disabled={!newComment.trim()}
            className="h-9 w-9 bg-brand-primary text-black hover:bg-brand-primary/90 shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
