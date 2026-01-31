"use client";

import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-white/5", className)}
      {...props}
    />
  );
}

export function ReportSkeleton() {
  return (
    <div className="bg-brand-surface border border-white/5 rounded-xl p-5 space-y-4">
      <div className="flex justify-between">
        <div className="flex gap-2">
           <Skeleton className="h-4 w-16" />
           <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-6 w-3/4" />
      <div className="space-y-2">
         <Skeleton className="h-3 w-full" />
         <Skeleton className="h-3 w-5/6" />
      </div>
      <div className="flex justify-between pt-4 border-t border-white/5">
         <div className="flex gap-4">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-16" />
         </div>
         <div className="flex gap-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
         </div>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-brand-surface border border-white/5 rounded-2xl p-6 space-y-4">
       <Skeleton className="h-4 w-24" />
       <Skeleton className="h-8 w-full" />
       <Skeleton className="h-3 w-32" />
    </div>
  );
}
