"use client";

import { ShortsFeed } from "@/components/shorts/ShortsFeed";

export default function ShortsPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] sm:h-[calc(100dvh-64px)] w-full overflow-hidden bg-black">
      <div className="flex-1 w-full max-w-md mx-auto h-full relative">
        <ShortsFeed />
      </div>
    </div>
  );
}
