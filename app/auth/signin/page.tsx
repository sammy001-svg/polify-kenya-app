import { Metadata } from "next";
import { Suspense } from "react";
import { SigninPageContent } from "./SigninPageContent";

export const metadata: Metadata = {
  title: "Sign In | PoliFy",
  description: "Sign in to access your platform dashboard",
};

export default function SigninPage() {
  return (
    <Suspense fallback={<div className="container mx-auto flex items-center justify-center h-screen text-brand-text-muted">Loading...</div>}>
      <SigninPageContent />
    </Suspense>
  );
}
