"use client";

export function BackgroundGrain() {
  return (
    <div className="fixed inset-0 z-[1] pointer-events-none bg-noise mix-blend-overlay opacity-[0.03]" aria-hidden="true" />
  );
}
