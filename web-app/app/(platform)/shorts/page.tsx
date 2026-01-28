"use client";

import { ShortsFeed } from "@/components/shorts/ShortsFeed";

export default function ShortsPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden">
      <ShortsFeed />
    </div>
  );
}
