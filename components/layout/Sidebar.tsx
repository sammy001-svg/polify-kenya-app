"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Flame, 
  Tv, 
  Scale, 
  Users, 
  BookOpen,
  Landmark,
  Radio,
  MessageSquare,
  Sparkles,
  Award,
  Flag,
  User,
  Megaphone
} from 'lucide-react';
import { cn } from '@/components/ui/button';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
}

function SidebarItem({ icon: Icon, label, href, isActive }: SidebarItemProps) {
  return (
    <Link 
      href={href}
      className={cn(
        "group flex items-center gap-4 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden",
        isActive 
          ? "bg-white/5 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]" 
          : "text-brand-text-muted hover:bg-white/5 hover:text-white"
      )}
    >
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-kenya-red rounded-r-full glow-red" />
      )}
      <Icon className={cn("w-5 h-5 transition-transform duration-300 group-hover:scale-110", isActive ? "text-kenya-red" : "text-current")} />
      <span className="relative z-10">{label}</span>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 fixed left-0 top-16 bottom-0 overflow-y-auto bg-brand-bg/80 glass-dark border-r border-white/5 p-3 hidden md:flex flex-col gap-6 z-40">
      
      {/* Section 1: Core Navigation */}
      <div className="space-y-1">
        <SidebarItem icon={Home} label="Civic Feed (Baraza)" href="/" isActive={pathname === '/'} />
        <SidebarItem icon={Tv} label="Bunge Bites (Shorts)" href="/shorts" isActive={pathname === '/shorts'} />
        <SidebarItem icon={Radio} label="Mashinani (Town Halls)" href="/live" isActive={pathname === '/live'} />
        <SidebarItem icon={Flag} label="Campaign HQ" href="/campaign" isActive={pathname.startsWith('/campaign')} />
        <SidebarItem icon={Sparkles} label="Bunge AI (Analysts)" href="/policy-ideas" isActive={pathname.startsWith('/policy-ideas')} />
        <SidebarItem icon={Megaphone} label="Political Parties" href="/parties" isActive={pathname.startsWith('/parties')} />
        <SidebarItem icon={Users} label="My Representative" href="/representatives" isActive={pathname.startsWith('/representatives')} />
      </div>

      <div className="h-px bg-border mx-2" />

      {/* Section 2: Political Intelligence Hub */}
      <div className="space-y-1">
        <h3 className="px-3 text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-2">
          Knowledge Base
        </h3>
        <SidebarItem icon={Landmark} label="Parliament Watch" href="/parliament" isActive={pathname.startsWith('/parliament')} />
        <SidebarItem icon={Scale} label="Constitution" href="/constitution" isActive={pathname.startsWith('/constitution')} />
        <SidebarItem icon={BookOpen} label="Policy Decoded" href="/policies" isActive={pathname.startsWith('/policies')} />
      </div>

      <div className="h-px bg-border mx-2" />

      {/* Section 3: Youth Engagement */}
      <div className="space-y-1">
        <h3 className="px-3 text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-2">
          Youth & Future Leaders
        </h3>
        <SidebarItem icon={MessageSquare} label="Youth Issue Hubs" href="/youth" isActive={pathname.startsWith('/youth')} />
        <SidebarItem icon={Sparkles} label="Civic Creators" href="/creators" isActive={pathname.startsWith('/creators')} />
      </div>

      <div className="h-px bg-border mx-2" />

      {/* Section 4: Participate & Learn */}
      <div className="space-y-1">
        <h3 className="px-3 text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-2">
          Participate & Learn
        </h3>
        <SidebarItem icon={Award} label="My Progress" href="/participate" isActive={pathname === '/participate'} />
        <SidebarItem icon={BookOpen} label="Learning Paths" href="/learn" isActive={pathname.startsWith('/learn')} />
      </div>

      <div className="h-px bg-border mx-2" />

      {/* Section 4: My Engagement */}
      <div className="space-y-1">
        <h3 className="px-3 text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-2">
          My Civic Duty
        </h3>
        <SidebarItem icon={Users} label="My Representatives" href="/my-reps" isActive={pathname.startsWith('/my-reps')} />
        <SidebarItem icon={Flame} label="Active Petitions" href="/petitions" isActive={pathname.startsWith('/petitions')} />
        <SidebarItem icon={User} label="My Profile" href="/profile" isActive={pathname.startsWith('/profile')} />
      </div>
      
      <div className="mt-auto px-3 py-4 text-xs text-brand-text-muted">
        <p>© 2026 PoliFy Kenya</p>
        <p>Transparency. Accountability. Truth.</p>
      </div>
    </aside>
  );
}
