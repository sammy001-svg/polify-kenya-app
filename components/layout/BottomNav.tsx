"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Tv, Landmark, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { CommandCenter } from "@/components/search/CommandCenter";
import { motion } from "framer-motion";

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
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-brand-bg/80 glass backdrop-blur-2xl border-t border-white/5 flex items-center justify-around px-2 z-50 md:hidden safe-area-bottom">
      <div className="noise-overlay opacity-[0.01]" />

      {navItems.map((item) => {
        const Icon = item.icon;

        if (item.isSearch) {
          return (
            <div
              key="search-trigger"
              className="flex flex-col items-center justify-center flex-1 relative"
            >
              <CommandCenter isMobileTrigger />
              <span className="text-[9px] font-black uppercase tracking-widest text-brand-text-muted mt-1">
                Search
              </span>
            </div>
          );
        }

        const href = item.href || "#";
        const isActive =
          pathname === href || (href !== "/" && pathname.startsWith(href));

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-col items-center justify-center flex-1 gap-1 transition-all duration-300 relative py-1",
              isActive
                ? "text-white scale-110"
                : "text-brand-text-muted hover:text-white",
            )}
          >
            <div className="relative">
              <Icon
                className={cn(
                  "w-5 h-5 transition-transform duration-300",
                  isActive ? "text-kenya-red" : "text-current",
                )}
              />
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-kenya-red rounded-full glow-red"
                />
              )}
            </div>
            <span
              className={cn(
                "text-[9px] font-black uppercase tracking-widest transition-opacity duration-300",
                isActive ? "opacity-100" : "opacity-60",
              )}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
