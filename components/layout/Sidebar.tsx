"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Scale,
  Users,
  BookOpen,
  Landmark,
  Radio,
  MessageSquare,
  Sparkles,
  Flag,
  Megaphone,
  FileCheck,
  BarChart3,
  Vote,
  Handshake,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
}

function SidebarItem({
  icon: Icon,
  label,
  href,
  isActive,
  onClick,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group flex items-center gap-4 px-4 py-3 rounded-2xl text-[13px] font-bold transition-all duration-300 relative overflow-hidden",
        isActive
          ? "bg-white/5 text-white shadow-[0_0_20px_rgba(255,255,255,0.03)] border border-white/5"
          : "text-brand-text-muted hover:bg-white/5 hover:text-white",
      )}
    >
      <div className="relative z-10 flex items-center gap-4">
        <div
          className={cn(
            "p-2 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
            isActive
              ? "bg-kenya-red/10 text-kenya-red glow-red"
              : "bg-white/5 text-current",
          )}
        >
          <Icon className="w-4 h-4" />
        </div>
        <span className="tracking-tight">{label}</span>
      </div>

      {isActive && (
        <motion.div
          layoutId="sidebar-active-glow"
          className="absolute inset-0 bg-linear-to-r from-kenya-red/5 to-transparent z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
    </Link>
  );
}

export function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-8 h-full overflow-y-auto p-4 custom-scrollbar">
      {/* Section 1: Core Navigation */}
      <div className="space-y-1.5">
        <h3 className="px-4 text-[10px] font-black text-brand-text-muted uppercase tracking-[0.2em] mb-4">
          Main Dashboard
        </h3>
        <SidebarItem
          icon={Home}
          label="Civic Feed (Baraza)"
          href="/"
          isActive={pathname === "/"}
          onClick={onLinkClick}
        />
        <SidebarItem
          icon={Flag}
          label="Campaign HQ"
          href="/campaign"
          isActive={pathname.startsWith("/campaign")}
          onClick={onLinkClick}
        />
        <SidebarItem
          icon={BarChart3}
          label="Tallying Centre"
          href="/tallying"
          isActive={pathname.startsWith("/tallying")}
          onClick={onLinkClick}
        />
        <SidebarItem
          icon={Megaphone}
          label="Political Parties"
          href="/parties"
          isActive={pathname.startsWith("/parties")}
          onClick={onLinkClick}
        />
        <SidebarItem
          icon={Users}
          label="My Representative"
          href="/representatives"
          isActive={pathname.startsWith("/representatives")}
          onClick={onLinkClick}
        />
        <SidebarItem
          icon={Radio}
          label="Mashinani (Town Halls)"
          href="/live"
          isActive={pathname === "/live"}
          onClick={onLinkClick}
        />
        <SidebarItem
          icon={Vote}
          label="IEBC"
          href="/iebc"
          isActive={pathname === "/iebc"}
          onClick={onLinkClick}
        />
      </div>

      <div className="h-px bg-white/5 mx-4" />

      {/* Section 2: Political Intelligence Hub */}
      <div className="space-y-1.5">
        <h3 className="px-4 text-[10px] font-black text-brand-text-muted uppercase tracking-[0.2em] mb-4">
          Intelligence Hub
        </h3>
        <SidebarItem
          icon={Landmark}
          label="Parliament Watch"
          href="/parliament"
          isActive={pathname.startsWith("/parliament")}
          onClick={onLinkClick}
        />
        <SidebarItem
          icon={Sparkles}
          label="Bunge AI (Analysts)"
          href="/policy-ideas"
          isActive={pathname.startsWith("/policy-ideas")}
          onClick={onLinkClick}
        />
        <SidebarItem
          icon={FileCheck}
          label="Auditor General"
          href="/auditor"
          isActive={pathname.startsWith("/auditor")}
          onClick={onLinkClick}
        />
        <SidebarItem
          icon={Scale}
          label="Constitution"
          href="/constitution"
          isActive={pathname.startsWith("/constitution")}
          onClick={onLinkClick}
        />
        <SidebarItem
          icon={BookOpen}
          label="Policy Decoded"
          href="/policies"
          isActive={pathname.startsWith("/policies")}
          onClick={onLinkClick}
        />
      </div>

      <div className="h-px bg-white/5 mx-4" />

      {/* Section 3: Youth Engagement */}
      <div className="space-y-1.5">
        <h3 className="px-4 text-[10px] font-black text-brand-text-muted uppercase tracking-[0.2em] mb-4">
          Youth & Future
        </h3>
        <SidebarItem
          icon={MessageSquare}
          label="Youth Issue Hubs"
          href="/youth"
          isActive={pathname.startsWith("/youth")}
          onClick={onLinkClick}
        />
        <SidebarItem
          icon={Users}
          label="Kenyan Groups"
          href="/societies"
          isActive={pathname.startsWith("/societies")}
          onClick={onLinkClick}
        />
        <SidebarItem
          icon={Handshake}
          label="Mkenya Crowdfunding"
          href="/crowdfunding"
          isActive={pathname.startsWith("/crowdfunding")}
          onClick={onLinkClick}
        />
        <SidebarItem
          icon={Sparkles}
          label="Civic Creators"
          href="/creators"
          isActive={pathname.startsWith("/creators")}
          onClick={onLinkClick}
        />
      </div>

      <div className="mt-auto pt-8 pb-4 px-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 glass-dark relative overflow-hidden group">
          <div className="absolute inset-0 bg-linear-to-br from-kenya-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="relative z-10 text-[10px] font-black text-white tracking-widest uppercase mb-1">
            PoliFy Kenya
          </p>
          <p className="relative z-10 text-[9px] text-brand-text-muted font-bold leading-relaxed">
            Building transparency & accountability through technology.
          </p>
        </div>
      </div>
    </div>
  );
}

interface SidebarProps {
  forceShow?: boolean;
}

export function Sidebar({ forceShow }: SidebarProps) {
  return (
    <aside
      className={cn(
        "w-72 fixed left-0 top-16 bottom-0 bg-brand-bg/80 glass-dark border-r border-white/5 flex flex-col z-40 transition-all duration-500",
        !forceShow && "hidden md:flex transform translate-x-0",
      )}
    >
      <div className="noise-overlay opacity-[0.01]" />
      <SidebarContent />
    </aside>
  );
}
