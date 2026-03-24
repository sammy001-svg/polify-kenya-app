import { TallyDashboard } from "@/components/tallying/TallyDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tallying Centre | Political Intelligence",
  description:
    "Real-time election results from National, County, and Constituency tallying centres.",
};

export default function TallyingPage() {
  return (
    <div className="relative flex flex-col min-h-screen overflow-x-hidden">
      {/* Static Background Image with Gray Overlay */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat brightness-[1.2] opacity-80"
        style={{ backgroundImage: 'url("/images/tally-bg.jpg")' }}
      />
      {/* Semi-transparent Gray Overlay Tint for high-end professional feel */}
      <div className="fixed inset-0 z-0 bg-[#BFC9D1]/40 backdrop-blur-[1px]" />
      
      <div className="relative z-10 w-full">
        <TallyDashboard />
      </div>
    </div>
  );
}
