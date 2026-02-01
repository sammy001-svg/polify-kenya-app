"use client";

import { ShortsFeed } from "@/components/shorts/ShortsFeed";

export default function ShortsPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] md:h-[calc(100vh-6rem)] w-full overflow-hidden bg-black rounded-xl">
      <div className="flex-1 w-full max-w-md mx-auto h-full relative">
        <ShortsFeed />
      </div>
    </div>
  );
}
