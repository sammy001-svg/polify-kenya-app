import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// If Inter fails to load (no internet), it falls back to sans-serif defined in globals.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "PoliFy | Political Intelligence & Civic Engagement",
  description: "PoliFy: The next-generation platform for Kenyan political transparency and civic education.",
  icons: {
    icon: "/polify-logo.jpg",
  },
};

import { BackgroundGrain } from "@/components/ui/BackgroundGrain";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased bg-brand-bg text-brand-text min-h-screen relative`}>
        <BackgroundGrain />
        {children}
      </body>
    </html>
  );
}
