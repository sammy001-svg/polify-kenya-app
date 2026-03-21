"use client";

import { Bill, BillStage, STAGES } from "@/lib/parliament-data";
import { BillCard } from "./BillCard";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useRef } from "react";
import { ChevronRight } from "lucide-react";

interface BillKanbanProps {
  bills: Bill[];
  onVote: (id: string, vote: "yay" | "nay") => void;
}

export function BillKanban({ bills, onVote }: BillKanbanProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Group bills by stage
  const billsByStage = STAGES.reduce(
    (acc, stage) => {
      acc[stage] = bills.filter((b) => b.stage === stage);
      return acc;
    },
    {} as Record<BillStage, Bill[]>,
  );

  return (
    <div className="relative h-full" ref={containerRef}>
      <ScrollArea className="w-full whitespace-nowrap h-full">
        <div className="flex w-max gap-8 p-8 snap-x snap-mandatory">
          {STAGES.map((stage, index) => {
            const stageBills = billsByStage[stage] || [];

            return (
              <div
                key={stage}
                className="w-[85vw] sm:w-[380px] shrink-0 flex flex-col h-full bg-white/2 rounded-[2.5rem] border border-white/5 overflow-hidden snap-center group/column transition-all duration-500 hover:bg-white/4"
              >
                {/* Column Header */}
                <div
                  className={cn(
                    "p-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-black/40 backdrop-blur-xl z-10",
                    stage === "Presidential Assent" &&
                      "bg-kenya-green/5 border-kenya-green/10",
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black text-brand-text-muted group-hover/column:border-kenya-gold/50 group-hover/column:text-kenya-gold transition-colors duration-500">
                      {index + 1}
                    </div>
                    <h3 className="font-black text-xs text-white uppercase tracking-[0.2em]">
                      {stage}
                    </h3>
                  </div>
                  <span className="text-[10px] font-black text-brand-text-muted bg-white/5 px-3 py-1 rounded-full border border-white/5">
                    {stageBills.length}
                  </span>
                </div>

                {/* Bills List */}
                <div className="p-5 flex-1 overflow-y-auto space-y-5 custom-scrollbar">
                  {stageBills.length === 0 ? (
                    <div className="h-40 flex flex-col items-center justify-center text-brand-text-muted/20 border-2 border-dashed border-white/5 rounded-3xl group-hover/column:border-white/10 transition-colors">
                      <p className="text-[10px] font-black uppercase tracking-widest">No active bills</p>
                    </div>
                  ) : (
                    stageBills.map((bill) => (
                      <BillCard key={bill.id} bill={bill} onVote={onVote} />
                    ))
                  )}
                </div>

                {/* Decorative Arrow for Flow */}
                {index < STAGES.length - 1 && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 text-white/5 pointer-events-none z-0 hidden">
                    <ChevronRight className="w-12 h-12" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" className="bg-white/5" />
      </ScrollArea>
    </div>
  );
}
