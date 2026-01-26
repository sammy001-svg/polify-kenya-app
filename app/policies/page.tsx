import { LearningModule } from "@/components/learning/LearningModule";
import { DEMO_LEARNING } from "@/lib/demo-data";

export default function PoliciesPage() {
  const items = DEMO_LEARNING.filter(item => item.category === "Policy");

  return (
    <div className="p-4">
      <LearningModule 
        title="Policy Decoded" 
        description="Visual breakdowns of complex bills, manifestos, and government projects. Know what you are voting for."
        items={items}
      />
    </div>
  );
}
