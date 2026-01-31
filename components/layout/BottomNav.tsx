"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Tv, 
  Landmark, 
  Search,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CommandCenter } from "@/components/search/CommandCenter";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Tv, label: "Shorts", href: "/shorts" },
    { icon: Search, label: "Search", isSearch: true },
    { icon: Landmark, label: "Parliament", href: "/parliament" },
    { icon: User, label: "Profile", href: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-brand-bg/80 glass backdrop-blur-xl border-t border-white/5 flex items-center justify-around px-2 z-50 md:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;
        
        if (item.isSearch) {
          return (
            <div key="search-trigger" className="flex flex-col items-center justify-center flex-1">
               <CommandCenter isMobileTrigger />
            </div>
          );
        }

        const href = item.href || '#';
        const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));

        return (
          <Link 
            key={href} 
            href={href} 
            className={cn(
              "flex flex-col items-center justify-center flex-1 gap-1 transition-colors",
              isActive ? "text-kenya-red" : "text-brand-text-muted hover:text-white"
            )}
          >
            <Icon className={cn("w-5 h-5", isActive && "glow-red scale-110")} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
