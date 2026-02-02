import { ProfileSetupForm } from "@/components/auth/ProfileSetupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete Your Profile",
  description: "Add your profile photo and bio to personalize your account",
};

export default function CompleteProfilePage() {
  return (
    <div className="w-full max-w-md mx-auto">
      <ProfileSetupForm />
    </div>
  );
}
