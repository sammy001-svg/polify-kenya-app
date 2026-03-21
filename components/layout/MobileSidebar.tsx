"use client";

import React from "react";
import { Menu } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SidebarContent } from "./Sidebar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function MobileSidebar() {
  const [isMounted, setIsMounted] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-brand-text-muted hover:text-white transition-colors p-0"
        >
          <Menu className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogPrimitive.Content 
          className={cn(
            "fixed p-0 border-none bg-transparent left-0 top-0 bottom-0 translate-x-0 translate-y-0 h-full w-[300px] max-w-[85vw] duration-500 data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left rounded-none z-200 focus:outline-none",
          )}
        >
          <DialogTitle className="sr-only">Navigation Menu</DialogTitle>
          <DialogDescription className="sr-only">
            PoliFy Kenya Main Navigation
          </DialogDescription>

          <div className="h-full bg-[#005f4f] border-r border-white/10 flex flex-col relative overflow-hidden">
            {/* Mobile Sidebar Brand Header */}
            <div className="p-6 border-b border-white/5 flex items-center gap-3">
              <div className="relative h-12 w-40">
                <Image
                  src="/images/polify-logo-v3.png"
                  alt="PoliFy Kenya"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-0">
                <SidebarContent onLinkClick={() => setOpen(false)} />
              </div>
            </ScrollArea>

            <div className="p-6 border-t border-white/5 mt-auto">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-muted">
                <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                Kenya Platform V2
              </div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
