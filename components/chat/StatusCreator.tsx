"use client";

import React, { useState } from "react";
import { X, Send, Loader2, Camera } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { motion } from "framer-motion";
import Image from "next/image";

interface StatusCreatorProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function StatusCreator({ onClose, onSuccess }: StatusCreatorProps) {
  const [content, setContent] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<"text" | "image">("text");
  const supabase = createClient();

  const handlePost = async () => {
    if (!content.trim() && !mediaUrl) return;

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("user_statuses")
        .insert({
          user_id: user.id,
          content: content,
          media_url: mediaUrl || null,
          type: type,
        });

      if (error) throw error;
      
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error posting status:", err);
      alert("Failed to post status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
    >
      <div className="w-full max-w-lg bg-brand-bg rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">Create <span className="text-kenya-red">Status</span></h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-brand-text-muted transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          {/* Preview Area */}
          <div className="aspect-square rounded-2xl bg-brand-surface border border-dashed border-white/10 flex flex-col items-center justify-center gap-4 relative overflow-hidden group">
            {mediaUrl ? (
              <Image src={mediaUrl} alt="Status Preview" fill className="object-cover" />
            ) : (
              <div className="text-center p-8">
                 <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Camera className="w-8 h-8 text-brand-text-muted" />
                 </div>
                 <p className="text-xs text-brand-text-muted font-medium italic">Click to upload an image or type below</p>
              </div>
            )}
            <input 
              type="file" 
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // In a real app, we'd upload to Supabase Storage first
                  // For now, we'll use a placeholder URL to simulate
                  setMediaUrl(URL.createObjectURL(file));
                  setType("image");
                }
              }}
            />
          </div>

          <div className="space-y-2">
            <textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              className="w-full bg-brand-surface border border-white/5 rounded-2xl p-4 text-sm focus:outline-none focus:ring-1 focus:ring-kenya-red transition-all resize-none"
            />
          </div>

          <div className="flex gap-4">
             <button 
                onClick={() => { setMediaUrl(""); setType("text"); }}
                className={`flex-1 py-3 rounded-2xl border transition-all text-xs font-black uppercase tracking-widest ${type === 'text' ? 'bg-white/10 border-white/20 text-white' : 'border-white/5 text-brand-text-muted hover:border-white/10'}`}
              >
                Text Only
             </button>
             <button 
                disabled={loading}
                onClick={handlePost}
                className="flex-2 py-3 rounded-2xl bg-kenya-red text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-kenya-red/90 transition-all shadow-lg shadow-kenya-red/20 active:scale-95 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                Post Status
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
