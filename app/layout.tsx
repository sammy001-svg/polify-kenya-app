import type { Metadata } from "next";
import { Inter, Libre_Baskerville, Dancing_Script } from "next/font/google";
import "./globals.css";
import { baseMetadata } from "@/lib/metadata";
import { SecurityProvider } from "@/components/security/SecurityProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const libre_baskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-baskerville",
});
const dancing_script = Dancing_Script({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-dancing",
});

export const metadata: Metadata = {
  ...baseMetadata,
};

export const viewport = {
  themeColor: "#01605A",
  width: "device-width",
  initialScale: 1,
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${libre_baskerville.variable} ${dancing_script.variable} antialiased selection:bg-kenya-gold selection:text-black`}
      >
        <SecurityProvider>
          {children}
        </SecurityProvider>
      </body>
    </html>
  );
}
