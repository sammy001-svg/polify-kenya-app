import { ShieldAlert } from "lucide-react";

export const metadata = {
  title: "Security Gateway | PoliFy Kenya Admin",
  description: "Secure administrative access portal.",
};

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-[#050505] text-white selection:bg-red-500/30 relative font-sans">
      {/* Technical Backdrop */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
         <div className="absolute top-[10%] left-[10%] w-[50%] h-[50%] bg-red-900/10 rounded-full blur-[150px] opacity-40" />
         <div className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] bg-slate-900/10 rounded-full blur-[150px] opacity-40" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50" />
         <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_4px,3px_100%] pointer-events-none" />
      </div>

      {/* Security Header Bar */}
      <header className="fixed top-0 left-0 right-0 h-1 border-b border-brand-surface z-50">
         <div className="h-full bg-linear-to-r from-transparent via-kenya-red to-transparent animate-pulse" />
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen">
         {children}
      </main>

      {/* Minimal Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-8 flex items-center justify-between text-[10px] font-bold text-brand-text-muted uppercase tracking-widest z-50">
         <div className="flex items-center gap-2">
            <ShieldAlert className="w-3 h-3 text-kenya-red" />
            <span>Encrypted Session</span>
         </div>
         <div>
            &copy; {new Date().getFullYear()} PoliFy Kenya Intelligence Platform
         </div>
      </footer>
    </div>
  );
}
