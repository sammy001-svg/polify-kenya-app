import { TrackerDashboard } from "@/components/tracker/TrackerDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Development Tracker | Political Intelligence",
  description: "Track constituency projects, CDF usage, and development initiatives.",
};

export default function TrackerPage() {
  return (
    <div className="min-h-screen">
      <TrackerDashboard />
    </div>
  );
}
