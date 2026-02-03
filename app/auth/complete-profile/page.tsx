import { ProfileSetupForm } from "@/components/auth/ProfileSetupForm";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Complete Your Profile",
  description: "Add your profile photo and bio to personalize your account",
};

export default function CompleteProfilePage() {
  return (
    <div className="w-full max-w-md mx-auto">
      <Suspense fallback={<div className="flex justify-center p-8">Loading...</div>}>
        <ProfileSetupForm />
      </Suspense>
    </div>
  );
}
