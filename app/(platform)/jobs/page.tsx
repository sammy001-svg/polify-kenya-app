import { Metadata } from "next";
import { getJobs } from "@/app/(platform)/jobs/actions";
import { JobsClient } from "@/app/(platform)/jobs/JobsClient";

export const metadata: Metadata = {
  title: "Job Board | PoliFy Kenya",
  description: "Find meaningful work in government, NGOs, and civic-tech organizations.",
};

export default async function JobsPage() {
  const jobs = await getJobs();
  
  return <JobsClient initialJobs={jobs} />;
}
