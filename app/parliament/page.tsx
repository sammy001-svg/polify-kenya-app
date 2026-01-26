import { LearningModule } from "@/components/learning/LearningModule";
import { DEMO_LEARNING } from "@/lib/demo-data";

export default function ParliamentPage() {
  const items = DEMO_LEARNING.filter(item => item.category === "Parliament");

  return (
    <div className="p-4">
      <LearningModule 
        title="Parliament Watch" 
        description="Follow the legislative process. Understand budgeting, oversight, and how to participate in committee sittings."
        items={items}
      />
    </div>
  );
}
