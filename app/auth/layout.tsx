import Image from "next/image";
import { EnvStatus } from "@/components/auth/EnvStatus";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-black">
      <EnvStatus />
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/nairobi-night-bg.jpg"
          alt="Nairobi City Skyline at Night"
          fill
          className="object-cover object-center opacity-80"
          priority
          quality={100}
          sizes="100vw"
        />
        {/* Cinematic Overlay - Gradient to emphasize center content */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,var(--tw-gradient-stops)] from-black/40 via-black/70 to-black/90 backdrop-blur-[2px]" />
      </div>
      
      {/* Content */}
      <div className="w-full relative z-10 animate-in fade-in zoom-in-95 duration-700">
        {children}
      </div>
    </div>
  );
}
