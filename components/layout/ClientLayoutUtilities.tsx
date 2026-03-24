"use client";

import dynamic from "next/dynamic";

// Lazy-load non-critical global components
const XPNotification = dynamic(() => import("@/components/gamification/XPNotification").then(mod => mod.XPNotification), { ssr: false });
const PolifyAI = dynamic(() => import("@/components/trust/PolifyAI").then(mod => mod.PolifyAI), { ssr: false });
const SystemTour = dynamic(() => import("@/components/layout/SystemTour").then(mod => mod.SystemTour), { ssr: false });

export function ClientLayoutUtilities() {
  return (
    <>
      <XPNotification />
      <PolifyAI />
      <SystemTour />
    </>
  );
}
