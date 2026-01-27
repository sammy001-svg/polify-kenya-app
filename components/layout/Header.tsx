/* cSpell:ignore PoliFy maandamano */
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Video, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserMenu } from '@/components/layout/UserMenu';
import { createClient } from '@/lib/supabase';
import { NotificationsPopover } from '@/components/layout/NotificationsPopover';
import type { User } from '@supabase/supabase-js';

export function Header() {
  const [user, setUser] = React.useState<User | null>(null);
  const supabase = createClient();

  React.useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      supabase.auth.getUser().then(({ data: { user } }) => {
        setUser(user ?? null);
      });
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-brand-bg/95 backdrop-blur-md border-b border-border flex items-center justify-between px-4 z-50">
      
      {/* Left: Menu & Brand */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-6 h-6" />
        </Button>
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 overflow-hidden rounded-full shadow-sm border border-white/10 group-hover:scale-105 transition-transform bg-white relative">
            <Image 
              src="/polify-logo.jpg" 
              alt="PoliFy Logo" 
              fill
              className="object-cover scale-110" 
            />
          </div>
          <span className="font-black text-2xl tracking-tighter hidden sm:block bg-linear-to-r from-[#922529] via-white to-[#008C51] bg-clip-text text-transparent ml-1">
            PoliFy
          </span>
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
        <Link href="/shorts">
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex" title="Bunge Bites (Shorts)">
            <Video className="w-6 h-6" />
          </Button>
        </Link>
        
        {user ? (
          <>
            <NotificationsPopover />
            <div className="w-px h-6 bg-border mx-1" />
            <UserMenu />
          </>
        ) : (
          <Link href="/auth/signin">
            <Button className="bg-kenya-red hover:bg-kenya-red/90 text-white rounded-full px-6">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
