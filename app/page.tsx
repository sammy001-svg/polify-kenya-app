import { LandingCarousel } from "@/components/landing/LandingCarousel";
import { VoterRegistrationPopup } from "@/components/landing/VoterRegistrationPopup";

export default function LandingPage() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-black">
      <LandingCarousel />
      <VoterRegistrationPopup delay={3000} />
    </main>
  );
}
