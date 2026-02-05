"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { CrowdfundingCard } from "@/components/crowdfunding/CrowdfundingCard";
import { Loader2 } from "lucide-react";

interface Crowdfunding {
  id: string;
  title: string;
  description: string;
  target_amount: number;
  collected_amount: number;
  image_url: string | null;
  user_id: string;
}

export default function CrowdfundingPage() {
  const [campaigns, setCampaigns] = useState<Crowdfunding[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const { data, error } = await supabase
          .from('crowdfundings')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setCampaigns(data || []);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCampaigns();
  }, [supabase]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">Mkenya Crowdfunding</h1>
          <p className="text-brand-text-muted">Support local causes and initiatives.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
        </div>
      ) : campaigns.length === 0 ? (
        <div className="text-center py-12 bg-brand-surface rounded-xl border border-border">
          <h3 className="text-lg font-medium">No campaigns yet</h3>
          <p className="text-brand-text-muted mt-2">Check back later for new fundraising initiatives.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <CrowdfundingCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      )}
    </div>
  );
}
