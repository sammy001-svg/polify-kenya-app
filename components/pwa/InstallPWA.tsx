'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
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

export function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show the popup after a short delay if not dismissed recently
      const lastDismissed = localStorage.getItem('pwa-prompt-dismissed');
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000;

      if (!lastDismissed || now - parseInt(lastDismissed) > oneDay) {
        setTimeout(() => setShowPopup(true), 3000);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    console.log('Install button clicked, deferredPrompt status:', !!deferredPrompt);
    if (!deferredPrompt) {
      console.error('No installation prompt available.');
      return;
    }

    try {
      // Show the install prompt
      console.log('Triggering PWA install prompt...');
      await deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);

      if (outcome === 'accepted') {
        console.log('App installation accepted by user.');
      } else {
        console.log('App installation dismissed by user.');
      }

      // We've used the prompt, and can't use it again, throw it away
      setDeferredPrompt(null);
      setShowPopup(false);
    } catch (err) {
      console.error('Error during PWA installation:', err);
    }
  };

  const handleDismiss = () => {
    setShowPopup(false);
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString());
  };

  if (!showPopup || !deferredPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-100 w-[90%] max-w-md"
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-black/40 p-6 backdrop-blur-xl shadow-2xl">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-linear-to-br from-kenya-green/20 via-transparent to-kenya-red/20 opacity-50" />
          
          <button 
            onClick={handleDismiss}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          <div className="relative flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-white/10 shadow-lg">
              <Image
                src="/images/polify-logo-v3.png"
                alt="PoliFy Logo"
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white leading-tight">
                Install PoliFy Kenya
              </h3>
              <p className="text-sm text-white/70">
                Download for a faster, native experience on your device.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <Button 
              onClick={handleInstallClick}
              className="w-full bg-kenya-green hover:bg-kenya-green/90 text-white font-semibold py-6 rounded-xl shadow-lg shadow-kenya-green/20"
            >
              <Download className="mr-2 h-5 w-5" />
              Download & Install
            </Button>
            <p className="text-[10px] text-center text-white/40 uppercase tracking-widest font-medium">
              Available on Desktop & Mobile
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
