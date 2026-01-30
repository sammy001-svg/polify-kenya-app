import { ProfileForm } from "@/components/profile/ProfileForm";
import { MyActivity } from "@/components/profile/MyActivity";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile | PoliFy",
  description: "Manage your account and contributions.",
};

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-brand-text">Account Settings</h1>
        <p className="text-brand-text-muted">Manage your profile, update your bio, and view your platform activity.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Column: Profile Details */}
        <div className="xl:col-span-5 space-y-6">
           <ProfileForm />
        </div>

        {/* Right Column: Activity Feed */}
        <div className="xl:col-span-7 space-y-6">
           <div className="bg-brand-surface rounded-xl border border-border overflow-hidden h-full">
             <MyActivity />
           </div>
        </div>
      </div>
    </div>
  );
}
