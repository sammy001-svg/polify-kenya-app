import { TallyDashboard } from "@/components/tallying/TallyDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tallying Centre | Political Intelligence",
  description:
    "Real-time election results from National, County, and Constituency tallying centres.",
};

export default function TallyingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="mb-6 shrink-0">
        <h1 className="text-3xl md:text-4xl font-black tracking-tighter bg-linear-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent mb-1">
          National Tallying Centre
        </h1>
        <p className="text-brand-text-muted text-sm md:text-base font-medium">
          Real-time verified results streaming from Bomas of Kenya.
        </p>
      </div>

      <TallyDashboard />
    </div>
  );
}
