"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TermsContent } from "./TermsContent";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TermsModalProps {
  trigger: React.ReactNode;
}

export function TermsModal({ trigger }: TermsModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-brand-bg border-white/10 text-white max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 border-b border-white/5">
          <DialogTitle className="text-xl font-black font-baskerville tracking-tight">Governance Perimeter Protocol</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full max-h-[calc(90vh-80px)] px-6">
          <TermsContent />
          <div className="h-12" /> {/* Bottom Padding */}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
