"use client";

import { useState } from "react";
import { Shield, Lock, Mail, ArrowRight, AlertCircle, Loader2, ShieldCheck, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { AdminMarketingCarousel } from "@/components/admin/AdminMarketingCarousel";
import { createClient } from "@/lib/supabase";

export default function AdminLoginPage() {
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
      // 1. TRY REAL LOGIN FIRST
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (data.user && !authError) {
        // Check if user has admin role (optional, layout will check anyway)
        window.location.href = "/admin";
        return;
      }

      // 2. FALLBACK FOR THE NEW SPECIFIC CREDENTIALS (if real login fails or user not in Supabase yet)
      const targetEmail = "support@polifykenya.co.ke";
      const targetPassword = "Admin@123@1p";

      if (email === targetEmail && password === targetPassword) {
        // Set a demo cookie that the layout can read
        document.cookie = "admin-demo-session=true; path=/; max-age=3600; SameSite=Lax";
        window.location.href = "/admin";
      } else {
        setError(authError?.message || "Invalid administrative credentials. Please verify your identity.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("An unexpected authentication error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen grid lg:grid-cols-2 bg-[#050505] overflow-hidden">
      {/* 1. Marketing Section (Left - Hidden on Mobile) */}
      <div className="hidden lg:block relative border-r border-white/5">
         <AdminMarketingCarousel />
      </div>

      {/* 2. Login Section (Right - Full on Mobile) */}
      <div className="relative flex items-center justify-center p-6 md:p-12 overflow-hidden">
         {/* Background Effects for the Form side */}
         <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-kenya-red/5 rounded-full blur-[120px] pointer-events-none" />
         
         <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md z-10"
         >
            <div className="flex flex-col items-center mb-12">
               <div className="w-16 h-16 bg-[#111111] border border-white/10 rounded-lg flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(187,25,25,0.2)]">
                  <Shield className="w-8 h-8 text-[#bb1919]" />
               </div>
               <h1 className="text-3xl font-black text-white tracking-tighter uppercase font-mono">Terminal: Admin_Access</h1>
               <p className="text-[10px] text-slate-500 font-bold tracking-[0.3em] uppercase mt-2">
                  Level 7 Encrypted Perimeter
               </p>
            </div>

            <Card className="bg-[#0a0a0a]/80 backdrop-blur-2xl border-white/5 shadow-2xl rounded-none border-t-2 border-t-[#bb1919]">
               <CardHeader>
                  <CardTitle className="text-lg font-bold text-white font-mono uppercase tracking-tight">Identity Verification</CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                     Provide authorization tokens for system initialization.
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <form onSubmit={handleLogin} className="space-y-6">
                     <AnimatePresence>
                        {error && (
                           <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="p-3 bg-red-950/30 border border-red-500/30 rounded-none flex items-start gap-2 text-xs text-red-500 font-mono"
                           >
                              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                              <span>[ERROR]: {error}</span>
                           </motion.div>
                        )}
                     </AnimatePresence>

                     <div className="space-y-4">
                        <div className="space-y-2">
                           <div className="relative">
                              <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-600" />
                              <Input
                                 type="email"
                                 placeholder="Access ID (Email)"
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                                 className="pl-10 bg-black border-white/10 focus:border-[#bb1919]/50 rounded-none text-white font-mono placeholder:text-slate-800"
                                 required
                              />
                           </div>
                        </div>

                        <div className="space-y-2">
                           <div className="relative">
                              <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-600" />
                              <Input
                                 type="password"
                                 placeholder="Security Token"
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                 className="pl-10 bg-black border-white/10 focus:border-[#bb1919]/50 rounded-none text-white font-mono placeholder:text-slate-800"
                                 required
                              />
                           </div>
                        </div>
                     </div>

                     <div className="space-y-4 pt-2">
                        <Button
                           type="submit"
                           disabled={isLoading}
                           className="w-full h-12 bg-[#bb1919] text-white font-black uppercase tracking-widest hover:bg-red-700 transition-all rounded-none shadow-[0_0_20px_rgba(187,25,25,0.3)] hover:shadow-[0_0_30px_rgba(187,25,25,0.5)] border-none"
                        >
                           {isLoading ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                           ) : (
                              <>
                                 Execute Authorization
                                 <ArrowRight className="w-4 h-4 ml-2" />
                              </>
                           )}
                        </Button>
                                             </div>
                  </form>
               </CardContent>
            </Card>

            <div className="mt-12 flex items-center justify-between">
               <div className="text-[9px] text-slate-700 uppercase tracking-[0.4em] font-black opacity-30">
                  Hardware RSA Enabled // Auth_Node_04
               </div>
               <div className="flex gap-4">
                  <ShieldCheck className="w-4 h-4 text-white/10" />
                  <Globe className="w-4 h-4 text-white/10" />
               </div>
            </div>
         </motion.div>
      </div>
    </div>
  );
}
