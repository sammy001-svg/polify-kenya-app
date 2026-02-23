import { AuthCarousel } from "@/components/auth/AuthCarousel";
import { EnvStatus } from "@/components/auth/EnvStatus";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-brand-bg">
      <EnvStatus />
      
      {/* Left Side: Branding & Carousel (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-[#0D0D0D]">
        <AuthCarousel />
      </div>

      {/* Right Side: Auth Forms */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 lg:p-16 bg-brand-bg relative overflow-y-auto">
        {/* Top Logo/Back Mobile branding (Visible only on mobile/tablet) */}
        <div className="lg:hidden mb-8 text-center">
            <h1 className="text-3xl font-bold bg-linear-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent italic">
                PoliFy
            </h1>
        </div>

        <div className="w-full max-w-xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
          {children}
        </div>

        {/* Support links/Footer for Right side */}
        <div className="mt-12 text-center text-sm text-brand-muted">
          Need help? <a href="#" className="text-brand-primary hover:underline">Contact Support</a>
        </div>
      </div>
    </div>
  );
}
