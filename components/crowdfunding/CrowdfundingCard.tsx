"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Loader2 } from "lucide-react";
import Image from "next/image";

interface Crowdfunding {
  id: string;
  title: string;
  description: string;
  target_amount: number;
  collected_amount: number;
  image_url: string | null;
  user_id: string;
}

export function CrowdfundingCard({ campaign }: { campaign: Crowdfunding }) {
  const [loading, setLoading] = useState(false);
  const [collected, setCollected] = useState(campaign.collected_amount);
  const supabase = createClient();

  const progress = Math.min((collected / campaign.target_amount) * 100, 100);

  const handleDonate = async () => {
    setLoading(true);
    try {
      // simulate donation of 1000 KES
      const donationAmount = 1000;
      
      // Update collected amount
      const { error: updateError } = await supabase
        .from('crowdfundings')
        .update({ collected_amount: collected + donationAmount })
        .eq('id', campaign.id);

      if (updateError) throw updateError;
      
      // Update wallet balance of the campaign owner
      // First get the owner's wallet
      const { data: wallet } = await supabase
        .from('wallets')
        .select('id, balance')
        .eq('user_id', campaign.user_id)
        .single();
        
      if (wallet) {
         await supabase
          .from('wallets')
          .update({ balance: wallet.balance + donationAmount })
          .eq('id', wallet.id);
      } else {
        // Create wallet if not exists (should handle by trigger usually but manual here for now)
         await supabase.from('wallets').insert({
             user_id: campaign.user_id,
             balance: donationAmount
         });
      }

      setCollected(prev => prev + donationAmount);
      alert(`Donated ${donationAmount} KES!`);
    } catch (error) {
      console.error("Error donating:", error);
      alert("Failed to donate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden bg-brand-surface border-border flex flex-col h-full">
      <div className="relative h-48 w-full bg-brand-bg/50">
        {campaign.image_url ? (
          <Image 
            src={campaign.image_url} 
            alt={campaign.title} 
            fill 
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-brand-text-muted">
            No Image
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1 text-lg">{campaign.title}</CardTitle>
        <CardDescription className="line-clamp-2 text-xs">{campaign.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 grow">
        <div className="space-y-2">
           <div className="flex justify-between text-sm">
             <span className="font-bold text-brand-primary">KES {collected.toLocaleString()}</span>
             <span className="text-brand-text-muted">of KES {campaign.target_amount.toLocaleString()}</span>
           </div>
           <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary border border-brand-primary/50"
          onClick={handleDonate}
          disabled={loading}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Heart className="w-4 h-4 mr-2" />}
          Donate KES 1,000
        </Button>
      </CardFooter>
    </Card>
  );
}
