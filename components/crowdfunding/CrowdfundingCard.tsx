"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Heart, Loader2, Users, TrendingUp } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
interface Crowdfunding {
  id: string;
  title: string;
  description: string;
  target_amount: number;
  collected_amount: number;
  image_url: string | null;
  category: string;
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
        .from("crowdfundings")
        .update({ collected_amount: collected + donationAmount })
        .eq("id", campaign.id);

      if (updateError) throw updateError;

      // Update wallet balance of the campaign owner
      // First get the owner's wallet
      const { data: wallet } = await supabase
        .from("wallets")
        .select("id, balance")
        .eq("user_id", campaign.user_id)
        .single();

      if (wallet) {
        await supabase
          .from("wallets")
          .update({ balance: wallet.balance + donationAmount })
          .eq("id", wallet.id);
      } else {
        // Create wallet if not exists (should handle by trigger usually but manual here for now)
        await supabase.from("wallets").insert({
          user_id: campaign.user_id,
          balance: donationAmount,
        });
      }

      setCollected((prev) => prev + donationAmount);
      alert(`Donated ${donationAmount} KES!`);
    } catch (error) {
      console.error("Error donating:", error);
      alert("Failed to donate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="group overflow-hidden bg-brand-surface/40 backdrop-blur-md border-white/10 hover:border-brand-primary/30 transition-all duration-500 flex flex-col h-full shadow-2xl relative">
      <div className="relative h-48 w-full bg-brand-bg/50 overflow-hidden">
        {campaign.image_url ? (
          <Image
            src={campaign.image_url}
            alt={campaign.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-brand-text-muted bg-linear-to-br from-white/5 to-transparent">
            No Image
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />

        <Badge className="absolute top-4 left-4 bg-brand-primary text-black font-black uppercase text-[9px] tracking-widest px-3 py-1 border-none shadow-lg">
          {campaign.category}
        </Badge>

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white z-20">
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
            <Users className="w-3.5 h-3.5 text-brand-primary" />
            <span className="text-[10px] font-bold">124 Backers</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
            <TrendingUp className="w-3.5 h-3.5 text-kenya-green" />
            <span className="text-[10px] font-bold">Trending</span>
          </div>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1 text-xl font-black italic tracking-tighter text-white group-hover:text-brand-primary transition-colors">
          {campaign.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-xs font-medium text-brand-text-muted leading-relaxed">
          {campaign.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 grow pt-4">
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <div className="space-y-0.5">
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted">
                Raised So Far
              </p>
              <p className="text-xl font-black text-white italic tracking-tighter">
                KES {collected.toLocaleString()}
              </p>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-primary">
              {Math.round(progress)}%
            </p>
          </div>

          <div className="relative h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute top-0 left-0 h-full bg-linear-to-r from-brand-primary to-kenya-green shadow-[0_0_10px_rgba(255,193,7,0.3)]"
            />
          </div>

          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-brand-text-muted">
            <span>Goal: KES {campaign.target_amount.toLocaleString()}</span>
            <span>12 days left</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2 pb-6 px-6">
        <Button
          className="w-full bg-linear-to-r from-brand-primary to-brand-primary/80 hover:scale-[1.02] active:scale-95 text-black font-black uppercase tracking-widest text-xs h-12 rounded-2xl shadow-[0_10px_20px_rgba(255,193,7,0.2)] transition-all flex items-center justify-center gap-2 border-none"
          onClick={handleDonate}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Heart className="w-5 h-5 fill-current" />
              Support This Cause
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
