import { SigninForm } from "@/components/auth/AuthForms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | PoliFy",
  description: "Sign in to access your platform dashboard",
};

export default function SigninPage() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center space-y-6">
      <SigninForm />
    </div>
  );
}
