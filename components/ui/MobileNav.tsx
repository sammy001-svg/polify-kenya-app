"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users2, Search, Bell, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Feed", href: "/(platform)/home" }, // Adjusting to actual routes
  { icon: Users2, label: "Community", href: "/(platform)/community" },
  { icon: Search, label: "Explore", href: "/(platform)/representatives" },
  { icon: Bell, label: "Notices", href: "/(platform)/notifications" },
  { icon: Menu, label: "More", href: "/(platform)/settings" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-brand-surface/80 backdrop-blur-xl border-t border-white/5 px-4 pb-safe-offset-2 pt-2">
      <nav className="flex items-center justify-between max-w-lg mx-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.label} 
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1.5 px-3 py-1 transition-all",
                isActive ? "text-kenya-red" : "text-brand-text-muted hover:text-white"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive && "animate-in zoom-in duration-300")} />
              <span className="text-[10px] font-black uppercase tracking-tighter">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
