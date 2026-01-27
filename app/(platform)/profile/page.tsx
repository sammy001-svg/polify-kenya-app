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
      <div>
        <h1 className="text-3xl font-black">Account Settings</h1>
        <p className="text-brand-text-muted">Manage your profile and view your platform activity.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Profile Details */}
        <div className="lg:col-span-4">
           <ProfileForm />
        </div>

        {/* Right Column: Activity Feed */}
        <div className="lg:col-span-8">
           <MyActivity />
        </div>
      </div>
    </div>
  );
}
