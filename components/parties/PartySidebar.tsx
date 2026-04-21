"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Settings,
  Shield,
  LogOut,
  UserCheck,
  BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase";

const navItems = [
  { name: "Dashboard", href: "/party-admin", icon: LayoutDashboard },
  { name: "Membership", href: "/party-admin/members", icon: Users },
  { name: "Nominations", href: "/party-admin/nominations", icon: UserCheck },
  { name: "Bulk SMS", href: "/party-admin/sms", icon: MessageSquare },
  { name: "Analytics", href: "/party-admin/analytics", icon: BarChart3 },
  { name: "Party Settings", href: "/party-admin/settings", icon: Settings },
];

export function PartySidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/party-admin/login");
    router.refresh();
  };

  return (
    <div className="flex flex-col h-full bg-brand-surface border-r border-border w-64">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
           <Shield className="w-8 h-8 text-brand-primary" />
           <div>
             <h1 className="font-black text-xl tracking-tighter">POLIFY</h1>
             <p className="text-[10px] text-brand-text-muted uppercase tracking-widest font-bold">Party Console</p>
           </div>
        </div>
      </div>
      
      <div className="flex-1 py-6 px-4 space-y-1">
        {navItems.map((item) => {
           const Icon = item.icon;
           const isActive = pathname === item.href;
           
           return (
             <Link key={item.href} href={item.href}>
                <div className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-brand-primary/10 text-brand-primary" 
                    : "text-brand-text-muted hover:bg-brand-surface-secondary hover:text-brand-text"
                )}>
                  <Icon className="w-5 h-5" />
                  {item.name}
                </div>
             </Link>
           );
        })}
      </div>

      <div className="p-4 border-t border-border">
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-500/10 border-red-500/20"
          >
             <LogOut className="w-4 h-4 mr-2" />
             Exit Console
          </Button>
      </div>
    </div>
  );
}
