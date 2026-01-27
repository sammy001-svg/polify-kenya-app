import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
