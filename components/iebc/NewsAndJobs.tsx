"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ExternalLink, Globe, ShieldCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function IEBCNewsCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="bg-brand-surface border-white/5 relative overflow-hidden shadow-xl group border hover:border-brand-primary/20 transition-all duration-500">
      {/* Background decoration */}
      <div className="absolute -right-12 -top-12 opacity-5 rotate-12 group-hover:rotate-6 transition-transform duration-700">
         <FileText className="w-48 h-48 text-brand-primary" />
      </div>
      
      <CardHeader className="pb-3 border-b border-white/5 bg-brand-surface-secondary/20">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-primary">Official Portal</span>
          <ShieldCheck className="w-3.5 h-3.5 text-kenya-green" />
        </div>
        <CardTitle className="flex items-center gap-2 text-xl font-black italic tracking-tighter text-white">
           IEBC <span className="text-brand-primary">NEWS PORTAL</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
            <p className="text-sm font-bold text-white leading-tight">
              Access the latest official communiqués and press releases directly from the Commission.
            </p>
            <p className="text-xs text-brand-text-muted leading-relaxed">
              Real-time updates on electoral activities, boundary reviews, and national announcements sourced live from the IEBC Newsroom.
            </p>
        </div>

        <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
            <Globe className="w-5 h-5 text-brand-primary" />
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-brand-text-muted">Direct Feed</p>
            <p className="text-xs font-bold text-white">Secure Iframe Gateway</p>
          </div>
        </div>

        <Button 
          onClick={() => setIsOpen(true)}
          className="w-full bg-brand-primary text-black hover:bg-white hover:scale-[1.02] transition-all font-black uppercase tracking-widest text-xs h-12 rounded-xl mt-2 shadow-xl shadow-brand-primary/10"
        >
          OPEN NEWS PORTAL <ExternalLink className="w-4 h-4 ml-2" />
        </Button>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-[95vw] w-[1200px] h-[90vh] bg-brand-surface border-white/10 p-0 overflow-hidden flex flex-col rounded-3xl">
            <DialogHeader className="p-4 border-b border-white/5 bg-brand-surface-secondary/40 shrink-0">
              <div className="flex items-center justify-between px-2">
                <DialogTitle className="flex items-center gap-2 text-lg font-black italic tracking-tight text-white">
                  <Globe className="w-5 h-5 text-brand-primary" />
                  OFFICIAL <span className="text-brand-primary">IEBC NEWSROOM</span>
                </DialogTitle>
                <div className="flex items-center gap-2 text-[10px] font-bold text-brand-text-muted bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kenya-green opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-kenya-green"></span>
                  </span>
                  SECURE CONNECTION
                </div>
              </div>
            </DialogHeader>
            <div className="flex-1 w-full h-full bg-white relative overflow-hidden">
                <iframe 
                  src="https://www.iebc.or.ke/news/" 
                  className="w-full h-full border-0"
                  title="Official IEBC News"
                />
                
                {/* Fallback & Overlay for loading or restrictions */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-brand-surface border-t border-white/10 flex items-center justify-between pointer-events-none sm:pointer-events-auto">
                   <p className="text-[10px] font-medium text-brand-text-muted hidden sm:block">
                     Content served directly from iebc.or.ke via secure gateway.
                   </p>
                   <Button 
                    variant="link" 
                    className="h-auto p-0 text-[10px] text-brand-primary font-black uppercase tracking-widest"
                    onClick={() => window.open('https://www.iebc.or.ke/news/', '_blank')}
                   >
                     Launch external site <ExternalLink className="w-3 h-3 ml-1" />
                   </Button>
                </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
