import { Metadata } from "next";

const siteUrl = "https://polify-kenya-app.vercel.app";

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  manifest: "/manifest.json",
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
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "PoliFy Kenya - AI-Powered Civic Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PoliFy Kenya | AI-Powered Civic Intelligence",
    description:
      "The future of civic engagement in Kenya. Track leaders, visualize budgets, and make your voice count with AI.",
    images: ["/images/og-image.png"],
    creator: "@polify_kenya",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  verification: {
    google: "googlea95eac0361a44ed0",
  },
};
