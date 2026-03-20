"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { ShieldCheck, ExternalLink, X } from "lucide-react";

interface VoterVerificationPopupProps {
  children: React.ReactNode;
}

export function VoterVerificationPopup({ children }: VoterVerificationPopupProps) {
  const [open, setOpen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      if (!newOpen) setIframeLoaded(false);
    }}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="max-w-5xl w-full h-[85vh] bg-brand-surface border-white/10 text-brand-text flex flex-col p-4 sm:p-6 rounded-2xl shadow-2xl transition-all duration-300">
        <DialogHeader className="shrink-0 mb-4 relative pr-10">
          {/* Custom Clear Close Button for User Clarity */}
          <DialogClose className="absolute -top-2 -right-2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10">
            <X className="w-5 h-5" />
          </DialogClose>

          <DialogTitle className="flex items-center gap-2 text-xl md:text-3xl font-black italic tracking-tighter text-white">
            <ShieldCheck className="w-6 h-6 text-kenya-green" />
            IEBC OFFICIAL <span className="text-brand-primary">VERIFICATION PORTAL</span>
          </DialogTitle>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2 gap-2">
            <DialogDescription className="text-brand-text-muted text-sm md:text-base">
              Verify your registration status directly and securely via the official IEBC portal.
            </DialogDescription>
            <a 
              href="https://verify.iebc.or.ke/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-widest text-brand-primary hover:text-white flex items-center gap-1 transition-colors whitespace-nowrap"
            >
              Open in new tab <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </DialogHeader>

        <div className="relative flex-1 w-full bg-white rounded-xl overflow-hidden border border-white/10 shadow-2xl">
          {!iframeLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-surface z-10">
              <div className="w-12 h-12 border-4 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin mb-4" />
              <p className="text-brand-text-muted text-xs font-black uppercase tracking-widest animate-pulse">
                Loading Official IEBC Portal...
              </p>
            </div>
          )}
          <iframe 
            src="https://verify.iebc.or.ke/" 
            className={`w-full h-full border-0 transition-opacity duration-500 ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
            title="Official IEBC Voter Verification"
            onLoad={() => setIframeLoaded(true)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
