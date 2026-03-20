"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { VoterVerificationPopup } from "@/components/iebc/VoterVerificationPopup";
import { RegistrationCentrePopup } from "@/components/iebc/RegistrationCentrePopup";

interface VoterRegistrationPopupProps {
  delay?: number;
}

export const VoterRegistrationPopup: React.FC<VoterRegistrationPopupProps> = ({ 
  delay = 3000 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Always show the popup on refresh as requested
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleOptionClick = (option: string) => {
    console.log(`User selected: ${option}`);
    // "Yes" and "No" are now both handled by their respective popup triggers
    // We let both cards stay in the background to show depth
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="p-8 flex flex-col items-center text-center">
              {/* Name Logo */}
              <div className="mb-6 relative w-44 h-12 grayscale brightness-0 dark:invert opacity-90 transition-all hover:opacity-100">
                <Image
                  src="/images/polify-logo-v3.png"
                  alt="Polify Logo"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Title & Description */}
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                Are you a registered voter?
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-8 font-medium">
                Stand out and be counted.
              </p>

              {/* Options */}
              <div className="w-full space-y-3">
                <VoterVerificationPopup>
                  <button
                    onClick={() => handleOptionClick("Yes")}
                    className="w-full py-3.5 px-6 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold transition-all transform active:scale-[0.98] shadow-md hover:shadow-lg cursor-pointer"
                  >
                    Yes, I am a Registered voter
                  </button>
                </VoterVerificationPopup>
                
                <RegistrationCentrePopup>
                  <button
                    onClick={() => handleOptionClick("No")}
                    className="w-full py-3.5 px-6 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all transform active:scale-[0.98] cursor-pointer"
                  >
                    No, Not yet registered as a voter
                  </button>
                </RegistrationCentrePopup>
              </div>
            </div>
            
            {/* Bottom Accent */}
            <div className="h-1.5 w-full bg-linear-to-r from-orange-500 via-red-500 to-primary" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
