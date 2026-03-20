/* cSpell:ignore PoliFy maandamano */
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/layout/UserMenu";
import { createClient } from "@/lib/supabase";
import { NotificationsPopover } from "@/components/layout/NotificationsPopover";
import type { User } from "@supabase/supabase-js";
import { CommandCenter } from "@/components/search/CommandCenter";
import { MobileSidebar } from "@/components/layout/MobileSidebar";

export function Header() {
  const [user, setUser] = React.useState<User | null>(null);
  const supabase = React.useMemo(() => createClient(), []);

  React.useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      supabase.auth.getUser().then(({ data: { user } }) => {
        setUser(user ?? null);
      });
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 glass z-overlay flex items-center justify-between px-4 md:px-6 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
      {/* HUD Scanline Effect */}
      <div className="absolute inset-0 bg-scanline opacity-[0.02] pointer-events-none" />


      {/* Left: Menu & Brand */}
      <div className="flex items-center gap-3 md:gap-4 shrink-0">
        <MobileSidebar />
        <Link href="/feed" className="flex items-center gap-2 group relative press-effect">
          <div className="w-9 h-9 md:w-10 md:h-10 overflow-hidden rounded-full shadow-lg border border-white/10 group-hover:scale-110 transition-all duration-500 bg-white relative shrink-0">
            <Image
              src="/polify-logo.jpg"
              alt="PoliFy"
              fill
              className="object-cover scale-110"
            />
          </div>
          <div className="relative h-11 w-40 md:w-44 transition-all duration-500 group-hover:translate-x-1">
            <Image
              src="/images/polify-logo-v3.png"
              alt="PoliFy Kenya"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>
      </div>

      {/* Center: Search - Fluid width */}
      <div className="hidden md:flex flex-1 max-w-2xl mx-8 justify-center min-w-0">
        <CommandCenter />
      </div>

      {/* Right: Actions - Collapsed on tiny mobile */}
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        {user ? (
          <div className="flex items-center gap-2 md:gap-3">
            <NotificationsPopover />
            <div className="w-px h-6 bg-white/10 mx-1 hide-on-mobile" />
            <div className="hover-lift">
              <UserMenu />
            </div>
          </div>
        ) : (
          <Link href="/auth/signin">
            <Button className="bg-kenya-red hover:bg-kenya-red/90 text-white rounded-full px-4 md:px-6 h-9 md:h-10 text-xs md:text-sm font-bold shadow-lg shadow-kenya-red/20 transition-all hover:scale-105 active:scale-95">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
