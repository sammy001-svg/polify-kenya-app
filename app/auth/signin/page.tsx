import { Metadata } from "next";
import { Suspense } from "react";
import { SigninPageContent } from "./SigninPageContent";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign In | PoliFy",
  description: "Sign in to access your platform dashboard",
};

export default function SigninPage() {
  return (
    <Suspense fallback={
        <div className="container mx-auto flex h-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-brand-muted" />
        </div>
    }>
      <SigninPageContent />
    </Suspense>
  );
}
