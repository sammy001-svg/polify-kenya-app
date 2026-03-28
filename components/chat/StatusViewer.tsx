"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, MoreVertical } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface StatusViewerProps {
  onClose: () => void;
}

const MOCK_STATUSES = [
  {
    id: "1",
    user: "Baba Ngina",
    image: "/poli-landing-v2-1.jpg",
    time: "2h ago",
    caption: "Ground iko sawa. Kazi iendelee! 🇰🇪"
  },
  {
    id: "2",
    user: "Youth Council G7",
    image: "/poli-landing-v2-3.png",
    time: "4h ago",
    caption: "Launching our new portal tomorrow. Stay tuned."
  }
];

export function StatusViewer({ onClose }: StatusViewerProps) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleNext = useCallback(() => {
    if (index < MOCK_STATUSES.length - 1) {
      setIndex(prev => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  }, [index, onClose]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [index, handleNext]);

  const handlePrev = () => {
    if (index > 0) {
      setIndex(prev => prev - 1);
      setProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-3xl p-4">
      <div className="relative w-full max-w-md aspect-9/16 bg-brand-surface rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        
        {/* Progress Bars */}
        <div className="absolute top-4 left-4 right-4 flex gap-1 z-20">
          {MOCK_STATUSES.map((_, i) => (
            <div key={i} className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
               {i < index && <div className="h-full bg-white w-full" />}
               {i === index && <div className="h-full bg-white transition-all duration-75" style={{ width: `${progress}%` }} />}
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-20">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 p-0.5 border border-white/20">
                 <div className="w-full h-full rounded-full bg-brand-surface overflow-hidden relative">
                    <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${MOCK_STATUSES[index].user}`} alt="user" fill />
                 </div>
              </div>
              <div>
                 <h4 className="text-sm font-black text-white italic uppercase tracking-tighter">{MOCK_STATUSES[index].user}</h4>
                 <p className="text-[10px] text-white/60 font-medium">{MOCK_STATUSES[index].time}</p>
              </div>
           </div>
           <div className="flex items-center gap-4 text-white">
              <button className="hover:scale-110 transition-transform"><MoreVertical className="w-5 h-5" /></button>
              <button onClick={onClose} className="hover:scale-110 transition-transform"><X className="w-6 h-6" /></button>
           </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0"
          >
            <Image 
              src={MOCK_STATUSES[index].image} 
              alt="status" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/40 to-transparent p-12 pt-24 text-center">
               <p className="text-white font-bold text-lg leading-relaxed text-shadow-lg italic">
                  &quot;{MOCK_STATUSES[index].caption}&quot;
               </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="absolute inset-y-0 left-0 w-1/2 z-10 cursor-pointer" onClick={handlePrev} />
        <div className="absolute inset-y-0 right-0 w-1/2 z-10 cursor-pointer" onClick={handleNext} />
      </div>
    </div>
  );
}
