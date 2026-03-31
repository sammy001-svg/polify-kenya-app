"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Lock, ShieldCheck } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";

interface ForgotPasswordModalProps {
  trigger: React.ReactNode;
}

export function ForgotPasswordModal({ trigger }: ForgotPasswordModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const supabase = createClient();
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset state when closed
      setTimeout(() => {
        setStep(1);
        setEmail("");
        setCode("");
        setNewPassword("");
        setConfirmPassword("");
        setError(null);
        setSuccess(false);
      }, 300);
    }
  };

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!email) return;
    
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      
      setStep(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndReset = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!code || !newPassword || !confirmPassword) return;
    
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Step 1: Verify the OTP
      const { error: otpError } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: "recovery",
      });

      if (otpError) throw otpError;

      // Step 2: Update the user's password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) throw updateError;

      setSuccess(true);
      
      // Auto-redirect to feed after successful reset since verifyOtp logs them in
      setTimeout(() => {
        setIsOpen(false);
        router.push("/feed");
        router.refresh();
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset password. Please check the code and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-brand-bg border-brand-border text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold font-baskerville">Reset Password</DialogTitle>
          <DialogDescription className="text-brand-muted">
            {step === 1 
              ? "Enter your email address to receive a verification code." 
              : "Enter the code sent to your email and your new password."}
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
              <ShieldCheck className="h-8 w-8 text-green-500" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Password Reset Successful</h3>
              <p className="text-sm text-brand-muted">Your password has been securely updated. Redirecting...</p>
            </div>
          </div>
        ) : step === 1 ? (
          <form onSubmit={handleRequestCode} className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="reset-email" className="text-sm font-medium">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10 bg-brand-surface border-brand-border"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
            
            <Button 
              type="submit" 
              className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white"
              disabled={loading || !email}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {loading ? "Sending..." : "Send Verification Code"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyAndReset} className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="reset-code" className="text-sm font-medium">Verification Code</label>
              <Input
                id="reset-code"
                type="text"
                placeholder="6-digit code"
                className="bg-brand-surface border-brand-border text-center tracking-[0.5em] text-lg font-mono"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
                required
              />
              <p className="text-xs text-brand-muted text-center pt-1">
                Sent to: <span className="text-brand-primary/80">{email}</span>
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="new-password" className="text-sm font-medium">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <PasswordInput
                  id="new-password"
                  className="pl-10 bg-brand-surface border-brand-border"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Must be at least 6 characters"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirm-password" className="text-sm font-medium">Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <PasswordInput
                  id="confirm-password"
                  className="pl-10 bg-brand-surface border-brand-border"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your new password"
                  required
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
            
            <Button 
              type="submit" 
              className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white mt-4"
              disabled={loading || !code || !newPassword || !confirmPassword}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {loading ? "Verifying..." : "Secure Reset & Login"}
            </Button>
            
            <Button 
              type="button" 
              variant="ghost" 
              className="w-full text-brand-muted hover:text-white mt-2"
              onClick={() => setStep(1)}
              disabled={loading}
            >
              Back to change email
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
