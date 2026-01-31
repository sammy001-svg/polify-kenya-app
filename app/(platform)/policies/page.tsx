import { DecodedPolicyCard } from "@/components/policy/DecodedPolicyCard";
import { DECODED_POLICIES } from "@/lib/policy-data";
import { Sparkles } from "lucide-react";

export default function PoliciesPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      
      {/* Header Section */}
      <div className="flex items-center gap-4">
         <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
            <Sparkles className="w-6 h-6 text-brand-primary" />
         </div>
         <div>
            <h1 className="text-3xl font-black tracking-tight text-white">Policy Decoded</h1>
            <p className="text-brand-text-muted font-medium">
               Complex legislation broken down into plain English. Know the facts before you debate.
            </p>
         </div>
      </div>

      {/* Grid of Policies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {DECODED_POLICIES.map((policy) => (
            <DecodedPolicyCard key={policy.id} policy={policy} />
         ))}
      </div>
    </div>
  );
}
