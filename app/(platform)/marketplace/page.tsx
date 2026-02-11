import { Metadata } from "next";
import { getMarketplaceItems } from "@/app/(platform)/marketplace/actions";
import { MarketplaceClient } from "@/app/(platform)/marketplace/MarketplaceClient";

export const metadata: Metadata = {
  title: "Mkenya Marketplace | PoliFy Kenya",
  description: "Buy and sell local goods and services. Support Kenyan businesses.",
};

import { getBusinessProfile } from "./business-actions";

export default async function MarketplacePage() {
  const items = await getMarketplaceItems();
  const businessProfile = await getBusinessProfile();
  
  return <MarketplaceClient initialItems={items} businessProfile={businessProfile} />;
}
