import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TermsContent } from "@/components/auth/TermsContent";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-white font-inter">
      {/* Background Accent */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-screen pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-kenya-red blur-[120px] rounded-full opacity-50" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-12 md:py-24">
        {/* Navigation */}
        <div className="mb-12">
          <Link href="/auth" className="inline-flex items-center text-brand-muted hover:text-brand-primary transition-colors text-sm font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Application
          </Link>
        </div>

        <TermsContent />

        <section className="pt-12 border-t border-white/10 text-center space-y-8 mt-16">
          <div className="space-y-2">
            <h3 className="text-2xl font-black font-baskerville tracking-tight">Ready to engage?</h3>
            <p className="text-brand-muted">By continuing, you acknowledge you have read and agreed to these terms.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 h-12 rounded-full font-bold uppercase tracking-widest text-xs">
              <Link href="/auth">Accept & Continue</Link>
            </Button>
            <Button variant="ghost" asChild className="text-brand-muted hover:text-white px-8 h-12 rounded-full text-xs font-bold uppercase tracking-widest">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] text-brand-text-muted opacity-40">
          <div>&copy; 2026 PoliFy Kenya • All Rights Reserved</div>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
