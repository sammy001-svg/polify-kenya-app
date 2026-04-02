import { CitizenOpinionPolls } from "./CitizenOpinionPolls";

export function CitizenDashboard() {
  return (
    <div className="space-y-6 h-full overflow-y-auto pr-2 pb-20">
      {/* Main Feature: Opinion Polls Hub */}
      <CitizenOpinionPolls />
    </div>
  );
}
