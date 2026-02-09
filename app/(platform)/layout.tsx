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
        {/* Background Decorative Elements - Responsive */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-kenya-green/10 blur-[120px] rounded-full hide-on-mobile" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-kenya-red/5 blur-[120px] rounded-full hide-on-mobile" />
        </div>

        <Sidebar />

        <main className="flex-1 md:ml-72 w-full relative bg-linear-to-br from-[#00704A]/15 via-black/50 to-black/80 border-l border-white/5">
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
