"use client";

import React from "react";
import { X, Mic, MicOff, PhoneOff, Settings, Users, MessageSquare } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface VoiceRoomProps {
  topic: string;
  onClose: () => void;
}

const PARTICIPANTS = [
  { id: "1", name: "You", isMuted: false, isSpeaking: true, avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=You" },
  { id: "2", name: "Baba Ngina", isMuted: true, isSpeaking: false, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Baba" },
  { id: "3", name: "Youth Rep", isMuted: false, isSpeaking: false, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Youth" },
  { id: "4", name: "Mama Soko", isMuted: false, isSpeaking: false, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mama" },
  { id: "5", name: "Citizen 1", isMuted: true, isSpeaking: false, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1" },
  { id: "6", name: "Citizen 2", isMuted: true, isSpeaking: false, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2" },
];

export function VoiceRoom({ topic, onClose }: VoiceRoomProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className="fixed inset-0 z-overlay flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 md:p-8"
    >
      <div className="w-full max-w-5xl h-full max-h-[800px] flex flex-col bg-brand-bg rounded-[40px] border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="p-8 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-kenya-red/20 text-kenya-red rounded-2xl border border-kenya-red/20 shadow-lg shadow-kenya-red/10">
                 <Users className="w-6 h-6" />
              </div>
              <div>
                 <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">{topic || "Community Town Hall"}</h2>
                 <p className="text-[10px] text-brand-text-muted font-black uppercase tracking-[0.2em] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-kenya-red animate-pulse" /> Live Voice Discussion
                 </p>
              </div>
           </div>
           <button 
              onClick={onClose}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-brand-text-muted hover:text-white"
            >
              <X className="w-6 h-6" />
           </button>
        </div>

        {/* Participants Grid */}
        <div className="flex-1 overflow-y-auto p-8 pt-0 custom-scrollbar">
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {PARTICIPANTS.map((participant) => (
                <div key={participant.id} className="relative group">
                   <div className={cn(
                     "aspect-square rounded-3xl bg-brand-surface-secondary border transition-all duration-500 flex flex-col items-center justify-center gap-4 relative overflow-hidden",
                     participant.isSpeaking ? "border-kenya-green shadow-[0_0_30px_rgba(0,255,100,0.15)] scale-105" : "border-white/5 grayscale-[0.3]"
                   )}>
                      <div className="w-20 h-20 rounded-full bg-brand-surface relative overflow-hidden border-2 border-white/10">
                         <Image src={participant.avatar} alt={participant.name} fill className="object-cover" />
                      </div>
                      <h4 className="font-bold text-sm text-white uppercase tracking-tight">{participant.name}</h4>

                      {participant.isSpeaking && (
                        <div className="absolute top-4 right-4 flex gap-1 items-end h-3">
                           {[1, 2, 3].map(i => (
                             <div key={i} className={cn("w-1 bg-kenya-green rounded-full animate-bounce", i === 2 ? "h-3" : "h-2")} style={{ animationDelay: `${i * 0.1}s` }} />
                           ))}
                        </div>
                      )}

                      {participant.isMuted && (
                        <div className="absolute top-4 right-4 p-2 bg-kenya-red/20 text-kenya-red rounded-xl">
                           <MicOff className="w-3 h-3" />
                        </div>
                      )}
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Controls Bar */}
        <div className="p-8 pt-0">
           <div className="bg-brand-surface/50 border border-white/10 rounded-[30px] p-6 flex items-center justify-between backdrop-blur-xl">
              <div className="flex items-center gap-4">
                 <button className="p-4 rounded-2xl bg-white/5 text-brand-text-muted hover:bg-white/10 transition-all border border-white/5">
                    <MessageSquare className="w-6 h-6" />
                 </button>
                 <button className="p-4 rounded-2xl bg-white/5 text-brand-text-muted hover:bg-white/10 transition-all border border-white/5">
                    <Settings className="w-6 h-6" />
                 </button>
              </div>

              <div className="flex items-center gap-6">
                 <button className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all shadow-xl group">
                    <Mic className="w-7 h-7 group-hover:scale-110 transition-transform" />
                 </button>
                 <button 
                    onClick={onClose}
                    className="h-16 px-10 rounded-3xl bg-kenya-red text-white font-black uppercase tracking-widest flex items-center gap-3 hover:bg-kenya-red/90 transition-all shadow-2xl shadow-kenya-red/20 active:scale-95"
                  >
                    <PhoneOff className="w-6 h-6" />
                    Leave Talk
                 </button>
              </div>

              <div className="flex items-center gap-3 bg-white/5 px-6 py-4 rounded-2xl border border-white/5">
                 <Users className="w-5 h-5 text-brand-text-muted" />
                 <span className="text-sm font-black text-white italic">24 <span className="text-brand-text-muted font-medium uppercase text-[10px] tracking-widest ml-1">Listeners</span></span>
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
