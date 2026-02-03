import { TallyDashboard } from "@/components/tallying/TallyDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tallying Centre | Political Intelligence",
  description: "Real-time election results from National, County, and Constituency tallying centres.",
};

export default function TallyingPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-2">National Tallying Centre</h1>
            <p className="text-muted-foreground text-lg">
                Real-time verified results streaming from polling stations across the country.
            </p>
        </div>

        <TallyDashboard />
    </div>
  );
}
