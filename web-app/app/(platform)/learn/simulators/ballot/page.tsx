import { BallotSimulator } from "@/components/learning/BallotSimulator";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BallotSimulatorPage() {
  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <Link href="/learn" className="inline-flex items-center gap-2 text-brand-text-muted hover:text-brand-text mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Learning Hub
      </Link>

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-black mb-3">Practice Voting</h1>
        <p className="text-lg text-brand-text-muted max-w-2xl mx-auto">
          Get comfortable with the ballot paper before the big day. 
          Learn how to mark your vote correctly so it counts!
        </p>
      </div>

      <BallotSimulator />
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-brand-surface p-6 rounded-xl border border-border">
              <h3 className="font-bold text-lg mb-2 text-kenya-red">Common Mistakes</h3>
              <ul className="space-y-3 list-disc list-inside text-brand-text-muted">
                  <li>Marking more than one candidate.</li>
                  <li>Writing your name or ID number on the ballot.</li>
                  <li>Marking outside the designated box.</li>
                  <li>Using a different symbol instead of a tick (✓) or cross (X).</li>
              </ul>
          </div>
          <div className="bg-brand-surface p-6 rounded-xl border border-border">
               <h3 className="font-bold text-lg mb-2 text-kenya-green">Voting Tips</h3>
               <ul className="space-y-3 list-disc list-inside text-brand-text-muted">
                  <li>Use the biometrics kit (KIEMS) to identify yourself first.</li>
                  <li>Ensure your ballot paper is stamped on the back by the clerk.</li>
                  <li>Fold your ballot paper vertically before casting it.</li>
                  <li>Do not take photos inside the polling booth.</li>
              </ul>
          </div>
      </div>
    </div>
  );
}
