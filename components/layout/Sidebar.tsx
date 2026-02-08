"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Flame, 
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
  Megaphone,
  FileCheck,
  BarChart3,
  Vote,
  Handshake
} from 'lucide-react';
import { cn } from '@/components/ui/button';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
}

function SidebarItem({ icon: Icon, label, href, isActive, onClick }: SidebarItemProps) {
  return (
    <Link 
      href={href}
      onClick={onClick}
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

export function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto p-3">
      {/* Section 1: Core Navigation */}
      <div className="space-y-1">
        <SidebarItem icon={Home} label="Civic Feed (Baraza)" href="/" isActive={pathname === '/'} onClick={onLinkClick} />
        <SidebarItem icon={Flag} label="Campaign HQ" href="/campaign" isActive={pathname.startsWith('/campaign')} onClick={onLinkClick} />
        <SidebarItem icon={BarChart3} label="Tallying Centre" href="/tallying" isActive={pathname.startsWith('/tallying')} onClick={onLinkClick} />
        <SidebarItem icon={Megaphone} label="Political Parties" href="/parties" isActive={pathname.startsWith('/parties')} onClick={onLinkClick} />
        <SidebarItem icon={Users} label="My Representative" href="/representatives" isActive={pathname.startsWith('/representatives')} onClick={onLinkClick} />
        <SidebarItem icon={Radio} label="Mashinani (Town Halls)" href="/live" isActive={pathname === '/live'} onClick={onLinkClick} />
        <SidebarItem icon={Vote} label="IEBC" href="/iebc" isActive={pathname === '/iebc'} onClick={onLinkClick} />
        
      </div>

      <div className="h-px bg-border mx-2" />

      {/* Section 2: Political Intelligence Hub */}
      <div className="space-y-1">
        <h3 className="px-3 text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-2">
          Knowledge Base
        </h3>
        <SidebarItem icon={Landmark} label="Parliament Watch" href="/parliament" isActive={pathname.startsWith('/parliament')} onClick={onLinkClick} />
        <SidebarItem icon={Sparkles} label="Bunge AI (Analysts)" href="/policy-ideas" isActive={pathname.startsWith('/policy-ideas')} onClick={onLinkClick} />
        <SidebarItem icon={FileCheck} label="Auditor General" href="/auditor" isActive={pathname.startsWith('/auditor')} onClick={onLinkClick} />
        <SidebarItem icon={Scale} label="Constitution" href="/constitution" isActive={pathname.startsWith('/constitution')} onClick={onLinkClick} />
        <SidebarItem icon={BookOpen} label="Policy Decoded" href="/policies" isActive={pathname.startsWith('/policies')} onClick={onLinkClick} />
      </div>

      <div className="h-px bg-border mx-2" />

      {/* Section 3: Youth Engagement */}
      <div className="space-y-1">
        <h3 className="px-3 text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-2">
          Youth & Future Leaders
        </h3>
        <SidebarItem icon={MessageSquare} label="Youth Issue Hubs" href="/youth" isActive={pathname.startsWith('/youth')} onClick={onLinkClick} />
        <SidebarItem icon={Users} label="Kenyan Groups (Societies)" href="/societies" isActive={pathname.startsWith('/societies')} onClick={onLinkClick} />
        <SidebarItem icon={Handshake} label="Mkenya Crowdfunding" href="/crowdfunding" isActive={pathname.startsWith('/crowdfunding')} onClick={onLinkClick} />
        <SidebarItem icon={Sparkles} label="Civic Creators" href="/creators" isActive={pathname.startsWith('/creators')} onClick={onLinkClick} />
      </div>

      <div className="h-px bg-border mx-2" />

      {/* Section 4: Participate & Learn */}
      <div className="space-y-1">
        <h3 className="px-3 text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-2">
          Participate & Learn
        </h3>
        <SidebarItem icon={Award} label="My Progress" href="/participate" isActive={pathname === '/participate'} onClick={onLinkClick} />
        <SidebarItem icon={BookOpen} label="Learning Paths" href="/learn" isActive={pathname.startsWith('/learn')} onClick={onLinkClick} />
      </div>

      <div className="h-px bg-border mx-2" />

      {/* Section 4: My Engagement */}
      <div className="space-y-1">
        <h3 className="px-3 text-xs font-semibold text-brand-text-muted uppercase tracking-wider mb-2">
          My Civic Duty
        </h3>
        <SidebarItem icon={Flame} label="Active Petitions" href="/participate#petitions" isActive={pathname.startsWith('/petitions')} onClick={onLinkClick} />
        <SidebarItem icon={User} label="My Profile" href="/profile" isActive={pathname.startsWith('/profile')} onClick={onLinkClick} />
      </div>
      
      <div className="mt-auto px-3 py-4 text-xs text-brand-text-muted">
        <p>© 2026 PoliFy Kenya</p>
        <p>Transparency. Accountability. Truth.</p>
      </div>
    </div>
  );
}

interface SidebarProps {
  forceShow?: boolean;
}

export function Sidebar({ forceShow }: SidebarProps) {
  return (
    <aside className={cn(
      "w-64 fixed left-0 top-16 bottom-0 bg-brand-bg/80 glass-dark border-r border-white/5 flex flex-col z-40",
      !forceShow && "hidden md:flex"
    )}>
      <SidebarContent />
    </aside>
  );
}
