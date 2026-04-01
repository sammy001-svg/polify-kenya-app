import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { ClientLayoutUtilities } from "@/components/layout/ClientLayoutUtilities";
import { PlatformContentWrapper } from "@/components/layout/PlatformContentWrapper";
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
          <PlatformContentWrapper>
            {children}
          </PlatformContentWrapper>
        </main>
      </div>
      <BottomNav />
      <ClientLayoutUtilities />
    </div>
  );
}
