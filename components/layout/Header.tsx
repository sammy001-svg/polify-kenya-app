"use client";

import React from 'react';
import Link from 'next/link';
import { Search, Bell, Video, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-brand-bg/95 backdrop-blur-md border-b border-border flex items-center justify-between px-4 z-50">
      
      {/* Left: Menu & Brand */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-6 h-6" />
        </Button>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-kenya-red rounded-lg flex items-center justify-center">
            <span className="font-bold text-white text-lg">P</span>
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:block">Political Intell.</span>
        </Link>
      </div>

      {/* Center: Search */}
      <div className="hidden md:flex flex-1 max-w-xl mx-4">
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-brand-text-muted group-focus-within:text-brand-text" />
          </div>
          <input 
            type="text"
            className="w-full bg-brand-surface-secondary border border-border rounded-full py-2 pl-10 pr-4 text-brand-text placeholder-brand-text-muted focus:outline-none focus:ring-1 focus:ring-kenya-red/50 focus:border-kenya-red/50 transition-all"
            placeholder="Search for policies, bills, or maandamano..."
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
          <Video className="w-6 h-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="w-6 h-6" />
        </Button>
        
        <div className="w-px h-6 bg-border mx-1" />
        
        <Button variant="ghost" size="icon" className="rounded-full overflow-hidden bg-brand-highlight">
           <User className="w-5 h-5 text-brand-text" />
        </Button>
      </div>
    </header>
  );
}
