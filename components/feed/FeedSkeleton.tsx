import { Card } from "@/components/ui/card";
// import { cn } from "@/lib/utils";

export function FeedSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="border-0 bg-transparent shadow-none">
          {/* Thumbnail Skeleton */}
          <div className="relative aspect-video rounded-xl bg-white/5 mb-3 overflow-hidden border border-white/5 animate-pulse">
            <div className="absolute top-2 left-2 w-16 h-4 bg-white/10 rounded" />
            <div className="absolute bottom-2 right-2 w-10 h-4 bg-white/10 rounded" />
          </div>

          <div className="flex gap-3">
            {/* Avatar Skeleton */}
            <div className="w-10 h-10 rounded-full bg-white/5 shrink-0 animate-pulse" />

            <div className="flex-1 space-y-2 py-1">
              {/* Title Skeleton */}
              <div className="h-4 bg-white/5 rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-white/5 rounded w-1/2 animate-pulse" />

              {/* Meta Skeleton */}
              <div className="flex items-center gap-2 pt-1">
                <div className="h-3 bg-white/5 rounded w-20 animate-pulse" />
                <div className="h-3 bg-white/5 rounded w-24 animate-pulse" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
