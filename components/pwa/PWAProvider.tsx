'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface Window {
    deferredPrompt: BeforeInstallPromptEvent | null;
  }
}

const PWAContext = createContext<{
  isInstallable: boolean;
  install: () => Promise<void>;
} | null>(null);

export function PWAProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Initialize window variable
    if (typeof window !== 'undefined' && window.deferredPrompt === undefined) {
      window.deferredPrompt = null;
    }

    // 1. Register Service Worker Immediately & Robustly
    const registerSW = () => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', { scope: '/' })
          .then((reg) => console.log('PWA SW Registered:', reg.scope))
          .catch((err) => console.error('PWA SW Failed:', err));
      }
    };

    if (document.readyState === 'complete') {
      registerSW();
    } else {
      window.addEventListener('load', registerSW);
    }

    // 2. Capture Install Prompt
    const handler = (e: Event) => {
      console.log('beforeinstallprompt event fired');
      e.preventDefault();
      // Store on window to prevent React state proxying/delay from breaking the user-gesture requirement
      window.deferredPrompt = e as BeforeInstallPromptEvent;
      setIsReady(true);
      
      const lastDismissed = localStorage.getItem('pwa-prompt-dismissed');
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000;

      if (!lastDismissed || now - parseInt(lastDismissed) > oneDay) {
        setShowPopup(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);
    
    // 3. Fallback: Show popup even if event doesn't fire (e.g. iOS or already installed)
    const timer = setTimeout(() => {
      const lastDismissed = localStorage.getItem('pwa-prompt-dismissed');
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000;
      if (!lastDismissed || now - parseInt(lastDismissed) > oneDay) {
        setShowPopup(true);
      }
    }, 8000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      clearTimeout(timer);
    };
  }, []);

  const install = async () => {
    const promptEvent = window.deferredPrompt;
    if (promptEvent) {
      try {
        console.log("Attempting native prompt...");
        // Call it and wait
        await promptEvent.prompt();
        const { outcome } = await promptEvent.userChoice;
        console.log('PWA Install Outcome:', outcome);
        window.deferredPrompt = null;
        setIsReady(false);
        setShowPopup(false);
        if (outcome === 'accepted') {
          alert('Installation started! Check your applications or home screen.');
        }
      } catch (err: unknown) {
        console.error('PWA Install Error:', err);
        const errorMessage = err instanceof Error ? err.message : String(err);
        alert(`Browser blocked the installation prompt:\n${errorMessage}\n\nPlease install manually via your browser's menu (⋮ or ︙) -> "Install App".`);
      }
    } else {
      // Manual instruction alert or toast
      alert('To install: \n\n1. Open browser menu (⋮ or ︙) \n2. Click "Install App" or "Add to Home Screen"\n\nNote: Please ensure you are not visiting in Incognito mode.');
    }
  };

  const dismiss = () => {
    setShowPopup(false);
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString());
  };

  return (
    <PWAContext.Provider value={{ isInstallable: isReady, install }}>
      {children}
      
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-9999 w-[90%] max-w-md"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-black/80 p-6 backdrop-blur-2xl shadow-2xl">
              <div className="absolute inset-0 bg-linear-to-br from-kenya-green/30 to-kenya-red/30 opacity-40" />
              
              <button 
                onClick={dismiss}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors p-2 cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="relative flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-white/20 shadow-lg bg-white/10 p-2">
                  <Image
                    src="/icon.png"
                    alt="App Icon"
                    fill
                    className="object-contain p-2"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-base font-bold text-white tracking-tight leading-none mb-1">
                    Download PoliFy App
                  </h3>
                  <p className="text-sm text-white/50 font-medium">
                    {isReady ? 'Ready for instant installation' : 'Install via browser menu for a native experience.'}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <button 
                  onClick={install}
                  className="w-full flex items-center justify-center bg-kenya-green hover:bg-kenya-green/90 text-white font-bold h-12 rounded-xl shadow-[0_4px_25px_rgba(1,96,90,0.4)] cursor-pointer transition-all active:scale-95"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {isReady ? 'Install Now' : 'How to Install'}
                </button>
                <p className="text-[10px] text-center text-white/40 uppercase tracking-[0.2em] font-bold">
                  Works on Laptop • Desktop • Mobile
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PWAContext.Provider>
  );
}

export const usePWA = () => {
  const context = useContext(PWAContext);
  if (!context) throw new Error('usePWA must be used within PWAProvider');
  return context;
};
