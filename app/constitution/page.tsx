import { LearningModule } from "@/components/learning/LearningModule";
import { DEMO_LEARNING } from "@/lib/demo-data";

export default function ConstitutionPage() {
  const items = DEMO_LEARNING.filter(item => item.category === "Constitution");

  return (
    <div className="p-4">
      <LearningModule 
        title="Constitution of Kenya 2010" 
        description="Master the supreme law of the land. Understand your rights, devolution, and the structure of government."
        items={items}
      />
    </div>
  );
}
