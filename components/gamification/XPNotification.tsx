"use client";

import { useEffect, useState } from "react";
import { Sparkles, Trophy } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export interface XPEventDetail {
  amount: number;
  reason: string;
  levelUp?: boolean;
  newLevel?: number;
}

export const XP_EVENT_NAME = "xp-gained";

export function XPNotification() {
  const [notifications, setNotifications] = useState<XPEventDetail[]>([]);

  useEffect(() => {
    const handleXP = (event: CustomEvent<XPEventDetail>) => {
      setNotifications((prev) => [...prev, event.detail]);

      // Auto dismiss
      setTimeout(() => {
        setNotifications((prev) => prev.slice(1));
      }, 4000);
    };

    window.addEventListener(
      XP_EVENT_NAME as unknown as string,
      handleXP as EventListener,
    );
    return () =>
      window.removeEventListener(
        XP_EVENT_NAME as unknown as string,
        handleXP as EventListener,
      );
  }, []);

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notif, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, x: 50 }}
            className={`
              p-4 rounded-xl border shadow-2xl backdrop-blur-md flex items-center gap-3 pr-6 pointer-events-auto
              ${
                notif.levelUp
                  ? "bg-linear-to-r from-yellow-500/90 to-amber-600/90 border-yellow-300/50 text-white"
                  : "bg-slate-900/90 border-slate-700 text-white"
              }
            `}
          >
            <div
              className={`
              w-10 h-10 rounded-full flex items-center justify-center shrink-0
              ${notif.levelUp ? "bg-white text-yellow-600" : "bg-brand-primary/20 text-brand-primary"}
            `}
            >
              {notif.levelUp ? (
                <Trophy className="w-5 h-5 fill-current" />
              ) : (
                <Sparkles className="w-5 h-5 fill-current" />
              )}
            </div>

            <div>
              <h4 className="font-black uppercase tracking-wider text-xs">
                {notif.levelUp ? "Level Up!" : "XP Gained"}
              </h4>
              <p className="text-sm font-bold flex items-center gap-1">
                {notif.levelUp ? (
                  `You reached Level ${notif.newLevel}!`
                ) : (
                  <>
                    <span className="text-brand-primary font-black">
                      +{notif.amount} XP
                    </span>
                    : {notif.reason}
                  </>
                )}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
