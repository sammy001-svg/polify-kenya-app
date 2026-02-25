import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { XPNotification } from "@/components/gamification/XPNotification";
import { PolifyAI } from "@/components/trust/PolifyAI";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform | PoliFy Keny",
  description: "Engage, participate, and track your political impact.",
};

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex pt-16 min-h-screen bg-brand-bg relative">


        <Sidebar />

        <main className="flex-1 md:ml-72 relative bg-brand-bg border-l border-brand-border">
          <div className="main-content-container py-6 pb-24 md:pb-8 min-h-[calc(100vh-4rem)]">
            {children}
          </div>
        </main>
      </div>
      <BottomNav />
      <XPNotification />
      <PolifyAI />
    </>
  );
}
