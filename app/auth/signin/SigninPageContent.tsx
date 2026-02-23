"use client";

import { useSearchParams } from "next/navigation";
import { SigninForm } from "@/components/auth/AuthForms";

export function SigninPageContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  return (
    <div className="w-full space-y-8">
      {message && (
        <div className="w-full bg-green-500/10 border border-green-500/20 text-green-500 px-4 py-3 rounded-lg text-sm font-medium text-center">
          {message}
        </div>
      )}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white font-baskerville">Welcome Back</h1>
        <p className="text-brand-muted">Sign in to your account to continue</p>
      </div>
      <SigninForm />
    </div>
  );
}
