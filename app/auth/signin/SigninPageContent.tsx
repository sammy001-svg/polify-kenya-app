"use client";

import { useSearchParams } from "next/navigation";
import { SigninForm } from "@/components/auth/AuthForms";

export function SigninPageContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  return (
    <div className="container mx-auto flex flex-col items-center justify-center space-y-6 pt-20">
      {message && (
        <div className="w-full max-w-md bg-green-500/10 border border-green-500/20 text-green-500 px-4 py-3 rounded-lg text-sm font-medium text-center">
          {message}
        </div>
      )}
      <SigninForm />
    </div>
  );
}
