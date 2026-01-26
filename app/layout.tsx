import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter for that clean, editorial look
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

// If Inter fails to load (no internet), it falls back to sans-serif defined in globals.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Political Intelligence & Civic Engagement System",
  description: "The next-generation platform for Kenyan political transparency and civic education.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased bg-brand-bg text-brand-text min-h-screen`}>
        <Header />
        
        <div className="flex pt-16">
          <Sidebar />
          
          <main className="flex-1 md:ml-64 p-6 min-h-[calc(100vh-4rem)]">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
