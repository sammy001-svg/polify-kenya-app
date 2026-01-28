"use client";

import { IssueChannel } from "@/components/youth/IssueChannel";
import { use } from "react";

export default function IssueChannelPage({
  params,
}: {
  params: Promise<{ issueId: string }>;
}) {
  const { issueId } = use(params);
  
  return (
    <div className="p-4">
      <IssueChannel issueId={issueId} />
    </div>
  );
}
