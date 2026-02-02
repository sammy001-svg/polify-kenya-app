"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, FileText, Settings, Shield, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users & Roles", icon: Users },
  { href: "/admin/petitions", label: "Petitions", icon: FileText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-brand-surface border-r border-border w-64">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
           <Shield className="w-8 h-8 text-kenya-red" />
           <div>
             <h1 className="font-black text-xl tracking-tighter">POLIFY</h1>
             <p className="text-[10px] text-brand-text-muted uppercase tracking-widest font-bold">Admin Console</p>
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
                  {item.label}
                </div>
             </Link>
           );
        })}
      </div>

      <div className="p-4 border-t border-border">
         <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-500/10 border-red-500/20">
            <LogOut className="w-4 h-4 mr-2" />
            Exit Admin
         </Button>
      </div>
    </div>
  );
}
