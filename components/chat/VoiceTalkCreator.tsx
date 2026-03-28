"use client";

import React, { useState } from "react";
import { X, Mic, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface VoiceTalkCreatorProps {
  onClose: () => void;
  onSuccess: (topic: string) => void;
}

export function VoiceTalkCreator({ onClose, onSuccess }: VoiceTalkCreatorProps) {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStart = () => {
    if (!topic.trim()) return;
    setLoading(true);
    // Simulate a bit of delay for effect
    setTimeout(() => {
      onSuccess(topic);
      onClose();
    }, 800);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
    >
      <div className="w-full max-w-lg bg-[#111b21] rounded-[32px] border border-white/10 shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Start <span className="text-kenya-red">Voice Talk</span></h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-[#aebac1] transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-kenya-red/20 mx-auto flex items-center justify-center text-kenya-red border border-kenya-red/20 shadow-lg shadow-kenya-red/10">
             <Mic className="w-10 h-10" />
          </div>

          <div className="space-y-4 text-center">
             <h3 className="text-lg font-bold text-white italic uppercase tracking-tight">Set the baraza topic</h3>
             <p className="text-xs text-[#8696a0]">This topic will be visible to everyone who can join the talk.</p>
          </div>

          <div className="space-y-2">
            <input
              type="text"
              placeholder="e.g. Discussing the new Finance Bill..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-[#202c33] border border-white/5 rounded-2xl p-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-kenya-red transition-all"
              autoFocus
            />
          </div>

          <button 
            disabled={!topic.trim() || loading}
            onClick={handleStart}
            className="w-full py-4 rounded-2xl bg-kenya-red text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-kenya-red/90 transition-all shadow-lg shadow-kenya-red/20 active:scale-95 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mic className="w-4 h-4" />}
            Start Voice Discussion
          </button>
        </div>
      </div>
    </motion.div>
  );
}
