"use client";

import React from 'react';
import { Menu } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Sidebar } from './Sidebar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export function MobileSidebar() {
  const [isMounted, setIsMounted] = React.useState(false);

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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 border-none bg-transparent left-0 top-0 bottom-0 translate-x-0 translate-y-0 h-full w-[280px] max-w-[80vw] duration-300 data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left rounded-none">
        <DialogTitle className="sr-only">Navigation Menu</DialogTitle>
        <DialogDescription className="sr-only">PoliFy Kenya Main Navigation</DialogDescription>
        <div className="h-full bg-brand-bg/95 glass backdrop-blur-2xl border-r border-white/10 flex flex-col pt-16">
          <ScrollArea className="flex-1">
             {/* We use a modified/plain version of sidebar content here or just reuse Sidebar if it's stateless */}
             <div className="p-2">
                <Sidebar forceShow />
             </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
