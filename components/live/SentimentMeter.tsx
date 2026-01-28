"use client";

import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useEffect, useState } from "react";

export function SentimentMeter() {
  const [sentiment, setSentiment] = useState(65); // 0-100 (Support)

  // Simulate live fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setSentiment(prev => {
        const delta = Math.floor(Math.random() * 10) - 5;
        return Math.min(100, Math.max(0, prev + delta));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/80 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-4 border border-white/10">
      <div className="flex items-center gap-2 text-green-400">
        <ThumbsUp className="w-4 h-4" />
        <span className="text-xs font-bold">{sentiment}%</span>
      </div>
      
      {/* Bar */}
      <div className="w-24 h-1.5 bg-white/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-700" 
          style={{ width: `${sentiment}%` }} 
        />
      </div>

      <div className="flex items-center gap-2 text-red-400">
        <span className="text-xs font-bold">{100 - sentiment}%</span>
        <ThumbsDown className="w-4 h-4" />
      </div>
    </div>
  );
}
