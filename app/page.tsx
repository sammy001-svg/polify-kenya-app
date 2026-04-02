import { LandingCarousel } from "@/components/landing/LandingCarousel";
import { VoterRegistrationPopup } from "@/components/landing/VoterRegistrationPopup";
import { LaunchScreenPopup } from "@/components/landing/LaunchScreenPopup";

export default function LandingPage() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-black">
      <LaunchScreenPopup />
      <LandingCarousel />
      <VoterRegistrationPopup delay={8000} />
    </main>
  );
}
