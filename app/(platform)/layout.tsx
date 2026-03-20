import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { XPNotification } from "@/components/gamification/XPNotification";
import { PolifyAI } from "@/components/trust/PolifyAI";
import { SystemTour } from "@/components/layout/SystemTour";
import type { Metadata } from "next";
import { baseMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Platform | Polify Kenya",
  description: "Engage, participate, and track your political impact.",
};

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-brand-bg text-brand-text min-h-screen relative">
      <Header />
      <div className="md:flex pt-16 min-h-screen bg-brand-bg relative overflow-x-hidden">
        <Sidebar />
        <main className="flex-1 md:pl-72 relative md:border-l md:border-white/5 min-w-0">
          <div className="main-content-container py-6 pb-24 md:pb-8">
            {children}
          </div>
        </main>
      </div>
      <BottomNav />
      <XPNotification />
      <PolifyAI />
      <SystemTour />
    </div>
  );
}
