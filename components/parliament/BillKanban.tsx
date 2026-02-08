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
      <ScrollArea className="w-full whitespace-nowrap rounded-md h-full">
        <div className="flex w-max space-x-4 sm:space-x-6 p-4 snap-x snap-mandatory">
          {STAGES.map((stage, index) => {
            const stageBills = billsByStage[stage] || [];

            return (
              <div
                key={stage}
                className="w-[85vw] sm:w-[320px] shrink-0 flex flex-col h-full bg-brand-surface/30 rounded-2xl border border-white/5 overflow-hidden snap-center"
              >
                {/* Column Header */}
                <div
                  className={cn(
                    "p-4 border-b border-white/5 flex items-center justify-between sticky top-0 bg-brand-surface/90 backdrop-blur-md z-10",
                    stage === "Presidential Assent" &&
                      "bg-kenya-green/10 border-kenya-green/30",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-brand-text-muted">
                      {index + 1}
                    </span>
                    <h3 className="font-bold text-sm text-white uppercase tracking-tight">
                      {stage}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-brand-text-muted bg-white/5 px-2 py-0.5 rounded-full">
                    {stageBills.length}
                  </span>
                </div>

                {/* Bills List */}
                <div className="p-3 flex-1 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-white/10">
                  {stageBills.length === 0 ? (
                    <div className="h-32 flex flex-col items-center justify-center text-brand-text-muted/40 border-2 border-dashed border-white/5 rounded-xl">
                      <p className="text-xs font-medium">No active bills</p>
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
