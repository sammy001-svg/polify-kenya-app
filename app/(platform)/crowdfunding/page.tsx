import { Metadata } from "next";
import { getCampaigns } from "./actions";
import { CrowdfundingClient } from "./CrowdfundingClient";

export const metadata: Metadata = {
  title: "Crowdfunding | PoliFy Kenya",
  description: "Raise funds for community projects and social causes in Kenya.",
};

export default async function CrowdfundingPage() {
  const campaigns = await getCampaigns();
  
  return <CrowdfundingClient initialCampaigns={campaigns} />;
}
