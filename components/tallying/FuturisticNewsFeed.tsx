"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const TYPE_STYLES: Record<string, string> = {
  LIVE: "text-kenya-green bg-kenya-green/10 border-kenya-green/40",
  ALERT: "text-red-400 bg-red-400/10 border-red-400/40",
  DATA: "text-blue-400 bg-blue-400/10 border-blue-400/40",
  INFO: "text-white/50 bg-white/5 border-white/20",
  UPDATE: "text-yellow-400 bg-yellow-400/10 border-yellow-400/40",
};

const MOCK_NEWS = [
  {
    id: 1,
    title: "Mombasa Tallying Complete",
    time: "2 mins ago",
    type: "LIVE",
    avatar: "https://i.pravatar.cc/150?u=1",
    summary: "Presidential tallies from Coast regions show high voter integrity.",
  },
  {
    id: 2,
    title: "Nairobi Turnout Hits 72%",
    time: "15 mins ago",
    type: "DATA",
    avatar: "https://i.pravatar.cc/150?u=2",
    summary: "Urban voter turnout exceeds 2022 records by 15%.",
  },
  {
    id: 3,
    title: "IEBC System Verified",
    time: "1 hr ago",
    type: "INFO",
    avatar: "https://i.pravatar.cc/150?u=3",
    summary: "Independent audit confirms blockchain-backed tally security.",
  },
  {
    id: 4,
    title: "Suspicious Activity Flagged",
    time: "1 hr 20 mins ago",
    type: "ALERT",
    avatar: "https://i.pravatar.cc/150?u=4",
    summary: "Anomaly detection triggered in 3 Rift Valley constituencies.",
  },
  {
    id: 5,
    title: "Form 34A Data Uploaded",
    time: "2 hrs ago",
    type: "UPDATE",
    avatar: "https://i.pravatar.cc/150?u=5",
    summary: "41 additional returning officers upload verified forms.",
  },
  {
    id: 6,
    title: "North Eastern Tallying",
    time: "2 hrs 30 mins ago",
    type: "LIVE",
    avatar: "https://i.pravatar.cc/150?u=6",
    summary: "Garissa, Wajir, and Mandera results streaming in now.",
  },
  {
    id: 7,
    title: "Rift Valley Count Update",
    time: "3 hrs ago",
    type: "DATA",
    avatar: "https://i.pravatar.cc/150?u=7",
    summary: "28 constituencies now fully reporting. 6 still pending.",
  },
  {
    id: 8,
    title: "Diaspora Votes Transmitted",
    time: "4 hrs ago",
    type: "INFO",
    avatar: "https://i.pravatar.cc/150?u=8",
    summary: "IEBC confirms encrypted diaspora ballot data received from 12 countries.",
  },
];

export function FuturisticNewsFeed() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Slow auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animId: number;
    let paused = false;

    const scroll = () => {
      if (!paused && el) {
        el.scrollTop += 0.4;
        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
          el.scrollTop = 0;
        }
      }
      animId = requestAnimationFrame(scroll);
    };

    animId = requestAnimationFrame(scroll);

    const pause = () => { paused = true; };
    const resume = () => { paused = false; };
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(animId);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <div className="flex flex-col gap-3 h-full overflow-hidden">
      {/* World Map Representation (HUD Style) */}
      <div className="relative w-full aspect-video bg-black/40 border border-white/5 rounded-2xl overflow-hidden mb-2 group">
        <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        {/* Mock World Map with Points */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 200 100" className="w-full h-full opacity-40">
             <path d="M30,40 Q50,20 80,30 T120,40 T170,30" fill="none" stroke="var(--accent-green)" strokeWidth="0.5" strokeDasharray="2 2" />
             <circle cx="50" cy="35" r="1.5" fill="var(--accent-green)" className="animate-pulse" />
             <circle cx="100" cy="45" r="1.5" fill="var(--accent-green)" className="animate-pulse delay-500" />
             <circle cx="140" cy="25" r="1.5" fill="var(--accent-green)" className="animate-pulse delay-1000" />
          </svg>
        </div>
        
        <div className="absolute top-2 left-2 text-[7px] font-mono text-kenya-green/60 uppercase tracking-[0.3em]">
          Global_Intelligence_Network
        </div>
        <div className="absolute bottom-2 right-2 flex gap-1 items-center">
           <div className="w-2 h-[2px] bg-red-400" />
           <span className="text-[6px] font-mono text-red-400">ALERT_ACTIVE</span>
        </div>
      </div>

      <div className="flex items-center justify-between px-1">
        <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50">
          Intelligence Feed
        </h3>
        <span className="text-[8px] font-mono text-kenya-green/40">
          U_TIME: 14:38:12
        </span>
      </div>

      <div
        ref={scrollRef}
        className="space-y-2.5 flex-1 overflow-y-auto no-scrollbar pr-1"
        style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)" }}
      >
        {MOCK_NEWS.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex gap-3 p-2.5 bg-white/2 border border-white/5 rounded-xl hover:bg-kenya-green/5 hover:border-kenya-green/30 transition-all group cursor-pointer"
          >
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/5 group-hover:border-kenya-green/40 transition-colors relative">
                <Image
                  src={item.avatar}
                  alt=""
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100"
                />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-kenya-green rounded-full border border-black shadow-[0_0_4px_currentColor]" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-[7px] font-mono text-white/20 uppercase">{item.time}</span>
                <span className={`text-[6px] font-black uppercase tracking-widest px-1 py-0.5 rounded border ${TYPE_STYLES[item.type]}`}>
                  {item.type}
                </span>
              </div>
              <p className="text-[9px] font-bold text-white leading-tight line-clamp-1 group-hover:text-kenya-green transition-colors">
                {item.title}
              </p>
              <p className="text-[7px] text-white/30 leading-snug line-clamp-1">
                {item.summary}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
