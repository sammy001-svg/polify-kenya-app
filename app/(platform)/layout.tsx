import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { XPNotification } from "@/components/gamification/XPNotification";
import { PoliBot } from "@/components/ai/PoliBot";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 md:ml-64 p-4 md:p-6 pb-24 md:pb-6 min-h-[calc(100vh-4rem)]">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
      <BottomNav />
      <XPNotification />
      <PoliBot />
    </>
  );
}
