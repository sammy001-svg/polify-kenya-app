"use client";

import { useState } from "react";
import { Shield, Lock, Mail, ArrowRight, AlertCircle, Loader2, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase";

export default function PartyAdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const supabase = createClient();

    try {
      // Demo Mode Fallback
      if (email === "party@demo.com" && password === "demo123") {
        document.cookie = "demo_party_session=true; path=/; max-age=3600";
        window.location.href = "/party-admin";
        return;
      }

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (data.user && !authError) {
        // Check if user is actually a party admin in the database
        const { data: membership } = await supabase
          .from("party_memberships")
          .select("role")
          .eq("user_id", data.user.id)
          .eq("role", "party_admin")
          .single();

        if (membership) {
          window.location.href = "/party-admin";
          return;
        } else {
          await supabase.auth.signOut();
          throw new Error("You do not have administrative permissions for this portal.");
        }
      }

      setError(authError?.message || "Invalid credentials. Please ensure you have official party administrative access.");
      setIsLoading(false);
    } catch (err) {
      console.error("Login Error:", err);
      const message = err instanceof Error ? err.message : "An unexpected authentication error occurred.";
      setError(message);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#020202] overflow-hidden p-6 relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-kenya-green/5 rounded-full blur-[150px] opacity-20 pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-kenya-green/10 rounded-full blur-[100px] opacity-30 pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] opacity-30 pointer-events-none" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-brand-surface border border-white/10 rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_40px_rgba(0,128,0,0.15)] ring-1 ring-white/5">
            <Landmark className="w-8 h-8 text-brand-primary" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Party Console</h1>
          <p className="text-xs text-brand-text-muted font-bold tracking-widest uppercase mt-2">
            Official Administrative Gateway
          </p>
        </div>

        <Card className="bg-brand-surface/80 backdrop-blur-3xl border-white/5 shadow-2xl rounded-3xl overflow-hidden">
          <div className="h-1.5 w-full bg-linear-to-r from-kenya-green via-brand-primary to-kenya-green" />
          <CardHeader className="pt-8">
            <CardTitle className="text-xl font-bold text-white tracking-tight text-center">Auth Required</CardTitle>
            <CardDescription className="text-sm text-brand-text-muted text-center">
              Please provide your party credentials to access the console.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl flex items-start gap-3 text-sm text-red-500"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-5 h-5 text-brand-text-muted transition-colors group-focus-within:text-brand-primary" />
                    <Input
                      type="email"
                      placeholder="Official Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-11 h-11 bg-black/40 border-white/5 focus:border-brand-primary/50 focus:ring-brand-primary/20 rounded-xl text-white placeholder:text-brand-text-muted/50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 w-5 h-5 text-brand-text-muted transition-colors group-focus-within:text-brand-primary" />
                    <PasswordInput
                      placeholder="Administrative Token"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-11 h-11 bg-black/40 border-white/5 focus:border-brand-primary/50 focus:ring-brand-primary/20 rounded-xl text-white placeholder:text-brand-text-muted/50"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-white text-black font-black uppercase tracking-widest hover:bg-white/90 transition-all rounded-xl shadow-xl active:scale-[0.98]"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Verify Authorization
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center space-y-3">
          <p className="text-[10px] text-brand-text-muted font-bold uppercase tracking-[0.3em]">
            Secure Node // Polify Political Intelligence
          </p>
          <p className="text-xs text-white/30">
            Not registered yet?{" "}
            <a
              href="/party-admin/register"
              className="text-green-400 hover:text-green-300 hover:underline font-semibold transition-colors"
            >
              Register your party →
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
