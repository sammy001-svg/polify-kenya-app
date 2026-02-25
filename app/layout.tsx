import type { Metadata } from "next";
import { Inter, Libre_Baskerville } from "next/font/google";
import "./globals.css";

// If Inter fails to load (no internet), it falls back to sans-serif defined in globals.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const libre_baskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-baskerville",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://polify-kenya-app.vercel.app"),
  title: {
    default: "PoliFy Kenya | AI-Powered Civic Intelligence",
    template: "%s | PoliFy Kenya",
  },
  description:
    "Empowering Kenyan citizens with real-time transparency, accountability, and grassroots AI crowd-sourcing. Track budgets, monitor parliament, and report community issues.",
  keywords: [
    "Kenya",
    "Politics",
    "Transparency",
    "Accountability",
    "Government",
    "Budget",
    "Parliament",
    "Civic Tech",
    "AI",
    "Democracy",
  ],
  authors: [{ name: "PoliFy Kenya Team" }],
  creator: "PoliFy Kenya",
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "/",
    siteName: "PoliFy Kenya",
    title: "PoliFy Kenya | AI-Powered Civic Intelligence",
    description:
      "The future of civic engagement in Kenya. Track leaders, visualize budgets, and make your voice count with AI.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PoliFy Kenya | AI-Powered Civic Intelligence",
    description:
      "The future of civic engagement in Kenya. Track leaders, visualize budgets, and make your voice count with AI.",
    creator: "@polify_kenya",
  },
  icons: {
    icon: "/polify-logo.jpg",
    apple: "/polify-logo.jpg",
  },
};

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${libre_baskerville.variable} antialiased bg-brand-bg text-brand-text min-h-screen relative`}
      >
        {children}
      </body>
    </html>
  );
}
