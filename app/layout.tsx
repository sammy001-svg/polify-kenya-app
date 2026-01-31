import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// If Inter fails to load (no internet), it falls back to sans-serif defined in globals.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Polify Kenya | AI-Powered Civic Intelligence",
  description: "Empowering Kenyan citizens with transparency, accountability, and grassroots AI crowdsourcing. Track budgets, monitor parliament, and report community issues.",
  keywords: ["Kenya", "Politics", "Transparency", "Government", "Budget", "Parliament", "Grassroots", "AI"],
  authors: [{ name: "Polify Kenya Team" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://polify-kenya-app.vercel.app", // Adjust if needed
    siteName: "PoliFy Kenya",
    title: "PoliFy Kenya | Political Intelligence & Civic Engagement",
    description: "Empowering Kenyan citizens with real-time political insights and verified civic data.",
    images: [
      {
        url: "/polify-seo-banner.png",
        width: 1200,
        height: 630,
        alt: "PoliFy Kenya Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PoliFy Kenya | Political Intelligence & Civic Engagement",
    description: "Empowering Kenyan citizens with real-time political insights and verified civic data.",
    images: ["/polify-seo-banner.png"],
    creator: "@polify_kenya",
  },
  icons: {
    icon: "/polify-logo.jpg",
    apple: "/polify-logo.jpg",
  },
};

export const viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
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
