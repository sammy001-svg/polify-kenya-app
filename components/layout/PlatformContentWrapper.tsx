"use client";

import { usePathname } from "next/navigation";
import React from "react";

export function PlatformContentWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Routes that should be edge-to-edge full width
  const isFullWidth = pathname?.startsWith("/polls") || pathname?.startsWith("/tallying");

  if (isFullWidth) {
    return <div className="w-full h-full min-h-[calc(100vh-64px)] bg-[#005043]">{children}</div>;
  }

  return (
    <div className="main-content-container py-6 pb-24 md:pb-8">
      {children}
    </div>
  );
}
