import { TallyDashboard } from "@/components/tallying/TallyDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tallying Centre | Political Intelligence",
  description:
    "Real-time election results from National, County, and Constituency tallying centres.",
};

export default function TallyingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black overflow-x-hidden">
      <TallyDashboard />
    </div>
  );
}
