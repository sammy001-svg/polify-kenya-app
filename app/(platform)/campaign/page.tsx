'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CandidateDashboard } from '@/components/campaign/CandidateDashboard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ShieldCheck, FileCheck, Flag, Users, FileText, Target, BarChart3, Calendar, Wallet, LayoutDashboard, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const HERO_SLIDES = [
  { 
    title: "AI-Powered Strategy", 
    description: "Harness elite AI to generate data-driven manifestos, speeches, and social campaigns.", 
    image: "/images/platform-impact.jpg", 
    color: "from-purple-600/40" 
  },
  { 
    title: "Transparent Finance", 
    description: "Track campaign budgets, monitor donor contributions, and ensure accountability.", 
    image: "/images/platform-transparency.jpg", 
    color: "from-kenya-gold/40" 
  },
  { 
    title: "Live Data Analytics", 
    description: "Monitor voter sentiment, survey data, and live polling to adjust your strategy on the fly.", 
    image: "/nairobi-night-bg.jpg", 
    color: "from-blue-600/40" 
  },
  { 
    title: "Civic Team Synergy", 
    description: "Unify your campaign staff securely. Assign roles, manage events, and win together.", 
    image: "/images/platform-victory.jpg", 
    color: "from-kenya-red/40" 
  }
];

export default function CampaignPage() {
  const [isVerified, setIsVerified] = useState(false);
  const [viewMode, setViewMode] = useState<'setup' | 'dashboard'>('setup');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const CAMPAIGN_MODULES = [
    { href: "/campaign/content", icon: Sparkles, color: "text-purple-400", label: "AI Studio", glow: "group-hover:shadow-purple-500/20 group-hover:border-purple-500/50", description: "Generate speeches, social posts, and campaign materials with AI." },
    { href: "/campaign/finance", icon: Wallet, color: "text-kenya-gold", label: "Finance", glow: "group-hover:shadow-kenya-gold/20 group-hover:border-kenya-gold/50", description: "Manage campaign budgets, donors, and fundraising analytics." },
    { href: "/campaign/events", icon: Calendar, color: "text-kenya-red", label: "Events", glow: "group-hover:shadow-kenya-red/20 group-hover:border-kenya-red/50", description: "Schedule rallies, town halls, and track voter turnout." },
    { href: "/campaign/analytics", icon: BarChart3, color: "text-blue-400", label: "Analytics", glow: "group-hover:shadow-blue-500/20 group-hover:border-blue-500/50", description: "Real-time voter sentiment, polling data, and campaign reach." },
    { href: "/campaign/commitments", icon: Target, color: "text-kenya-gold", label: "Promises", glow: "group-hover:shadow-kenya-gold/20 group-hover:border-kenya-gold/50", description: "Track public commitments and policy goals." },
    { href: "/campaign/manifesto", icon: FileText, color: "text-white", label: "Manifesto", glow: "group-hover:shadow-white/20 group-hover:border-white/50", description: "Draft and publish your official campaign manifesto." },
    { href: "/campaign/team", icon: Users, color: "text-gray-300", label: "Team", glow: "group-hover:shadow-gray-300/20 group-hover:border-gray-400/50", description: "Manage campaign staff, volunteers, and communications." },
  ];

  // Auto-switch to dashboard when verified
  const toggleVerification = () => {
    setIsVerified(!isVerified);
    if (!isVerified) setViewMode('dashboard');
    else setViewMode('setup');
  };

  return (
    <div className="container mx-auto max-w-7xl py-6 px-4 space-y-6 h-full flex flex-col animate-in fade-in duration-700">
      {/* Dynamic Action Toolbar */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 bg-brand-surface/50 backdrop-blur-xl border border-white/5 p-6 rounded-3xl shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-kenya-red via-kenya-gold to-kenya-green opacity-50" />
        
        <div className="flex gap-5 items-center relative z-10 shrink-0">
          <div className="w-14 h-14 bg-kenya-red/10 rounded-2xl flex items-center justify-center shrink-0 border border-kenya-red/20 shadow-lg shadow-kenya-red/5">
             <Flag className="w-7 h-7 text-kenya-red" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight leading-none text-white italic">Campaign HQ</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-kenya-green animate-pulse" />
              <p className="text-xs text-brand-text-muted font-bold uppercase tracking-widest">Live Monitoring Active</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 relative z-10 shrink-0">
            <Link href="/campaign/publish">
              <Button 
                variant="primary" 
                size="sm"
                className="px-4 h-10 text-[11px] font-black uppercase tracking-wider transition-all rounded-xl border border-white/5 bg-kenya-red hover:bg-white text-white hover:text-black shadow-lg shadow-kenya-red/20"
              >
                <span>Launch Campaign</span>
              </Button>
            </Link>
            
            <div className="w-px h-8 bg-white/5 mx-2 hidden lg:block" />
            
            <button 
              className={cn(
                "flex items-center gap-2.5 px-4 py-2 rounded-xl border transition-all cursor-pointer shadow-inner",
                isVerified 
                  ? "bg-kenya-green/10 border-kenya-green/30 text-kenya-green" 
                  : "bg-white/5 border-white/10 text-brand-text-muted hover:border-brand-primary"
              )}
              onClick={toggleVerification}
            >
                <ShieldCheck className={cn("w-4 h-4", isVerified ? "text-kenya-green" : "text-brand-text-muted")} />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {isVerified ? "Verified Identity" : "Verify Now"}
                </span>
            </button>
        </div>
      </div>
      
      {/* Hero Image Carousel */}
      <div className="relative w-full h-[250px] md:h-[300px] rounded-3xl overflow-hidden shadow-2xl group border border-white/10">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlideIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_SLIDES[currentSlideIndex].image}
              alt={HERO_SLIDES[currentSlideIndex].title}
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlay */}
            <div className={cn("absolute inset-0 bg-linear-to-r to-black/80 via-black/60", HERO_SLIDES[currentSlideIndex].color)} />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 z-10">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="max-w-2xl"
              >
                <h2 className="text-3xl md:text-5xl font-black text-white mb-3 text-shadow-xl font-baskerville">
                  {HERO_SLIDES[currentSlideIndex].title}
                </h2>
                <p className="text-sm md:text-lg text-white/90 font-medium leading-relaxed max-w-xl text-shadow-md">
                  {HERO_SLIDES[currentSlideIndex].description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 right-8 flex items-center gap-2 z-20">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlideIndex(i)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300 cursor-pointer",
                i === currentSlideIndex 
                  ? "w-8 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" 
                  : "bg-white/30 hover:bg-white/50"
              )}
            />
          ))}
        </div>
      </div>
      
      {/* View Toggle (Only visible if verified) */}
      {isVerified && (
        <div className="flex gap-2">
            <Button 
              size="sm" 
              variant={viewMode === 'dashboard' ? 'secondary' : 'ghost'} 
              onClick={() => setViewMode('dashboard')}
              className={cn("gap-2", viewMode === 'dashboard' && "bg-brand-surface-highlight text-white")}
            >
               <LayoutDashboard className="w-4 h-4" /> Live Dashboard
            </Button>
            <Button 
              size="sm" 
              variant={viewMode === 'setup' ? 'secondary' : 'ghost'} 
              onClick={() => setViewMode('setup')}
              className={cn("gap-2", viewMode === 'setup' && "bg-brand-surface-highlight text-white")}
            >
               <FileCheck className="w-4 h-4" /> Campaign Setup
            </Button>
        </div>
      )}

      {viewMode === 'dashboard' && isVerified ? (
         <CandidateDashboard />
      ) : (
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
             <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="w-1 h-6 bg-kenya-red rounded-full" />
                Campaign Modules
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {CAMPAIGN_MODULES.map((module) => (
                    <Link key={module.label} href={module.href}>
                      <div className="relative cursor-pointer transition-all duration-500 group rounded-3xl overflow-hidden h-full">
                        <div className={cn("absolute inset-0 bg-brand-surface/50 backdrop-blur-xl border-2 border-white/5 transition-all duration-500 hover:bg-brand-surface/70", module.glow)} />
                        <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent pointer-events-none" />
                        <div className="relative z-10 p-6 space-y-4">
                          <div className={cn("w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 transition-all duration-500 group-hover:bg-white/10", module.glow)}>
                            <module.icon className={cn("w-6 h-6 transition-colors duration-500", module.color)} />
                          </div>
                          <div className="space-y-2">
                              <h3 className="text-xl font-black text-white transition-colors duration-500">{module.label}</h3>
                              <p className="text-xs text-brand-text-muted leading-relaxed font-medium opacity-80 group-hover:opacity-100">{module.description}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                ))}
             </div>
          </div>
      )}
    </div>
  );
}
