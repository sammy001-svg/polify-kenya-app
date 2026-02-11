"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase";
import { CrowdfundingCard } from "@/components/crowdfunding/CrowdfundingCard";
import { CreateCrowdfundingDialog } from "@/components/crowdfunding/CreateCrowdfundingDialog";
import {
  Search,
  Filter,
  TrendingUp,
  Heart,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Crowdfunding } from "./actions";

interface CrowdfundingClientProps {
  initialCampaigns: Crowdfunding[];
}

export function CrowdfundingClient({ initialCampaigns }: CrowdfundingClientProps) {
  const [campaigns, setCampaigns] = useState<Crowdfunding[]>(initialCampaigns);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const supabase = useMemo(() => createClient(), []);

  const categories = [
    "All",
    "Community",
    "Emergency",
    "Medical",
    "Climate",
    "Education",
  ];

  // Dynamic Stats Calculation
  const stats = useMemo(() => {
    const totalRaised = campaigns.reduce((acc, c) => acc + (c.collected_amount || 0), 0);
    const activeCount = campaigns.length;
    const livesImpacted = Math.floor(totalRaised / 1000) + 12400; // Mock scaling with data

    return [
      {
        label: "Total Raised",
        value: `KES ${(totalRaised / 1000000).toFixed(1)}M`,
        icon: TrendingUp,
        color: "text-kenya-green",
      },
      {
        label: "Lives Impacted",
        value: `${livesImpacted.toLocaleString()}+`,
        icon: Heart,
        color: "text-kenya-red",
      },
      {
        label: "Active Projects",
        value: activeCount.toString(),
        icon: ShieldCheck,
        color: "text-brand-primary",
      },
      {
        label: "Success Rate",
        value: "98.2%",
        icon: TrendingUp,
        color: "text-white",
      },
    ];
  }, [campaigns]);

  // Real-time updates
  useEffect(() => {
    const channel = supabase
      .channel("crowdfunding_updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "crowdfundings" },
        (payload) => {
          console.log("Real-time update:", payload);
          if (payload.eventType === "INSERT") {
            setCampaigns((prev) => [payload.new as Crowdfunding, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setCampaigns((prev) =>
              prev.map((c) => (c.id === payload.new.id ? (payload.new as Crowdfunding) : c))
            );
          } else if (payload.eventType === "DELETE") {
            setCampaigns((prev) => prev.filter((c) => c.id === payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const filteredCampaigns = campaigns.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.impact_statement?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesCategory =
      activeCategory === "All" || c.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-10 pb-20">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden mb-8 group">
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700" />

        <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-12 max-w-2xl space-y-6">
          <Badge className="w-fit bg-brand-primary/20 text-brand-primary border-brand-primary/30 py-1 px-4 font-black uppercase tracking-widest italic animate-pulse">
            Direct Impact
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold italic tracking-tighter text-white leading-none">
            MKENYA <span className="title-green">CROWDFUNDING</span>
          </h1>
          <p className="text-lg text-white/70 font-medium leading-relaxed">
            Raise funds for community projects, medical emergencies, or social
            causes. Transparent, secure, and community-driven.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="w-full md:w-auto">
              <CreateCrowdfundingDialog />
            </div>
            <button className="px-6 py-2.5 rounded-full border border-white/20 text-white font-bold text-sm hover:bg-white/10 transition-colors flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-kenya-green" /> Verified
              Giving
            </button>
          </div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-brand-surface/40 backdrop-blur-sm border border-white/5 p-4 rounded-2xl flex items-center gap-4"
          >
            <div className={cn("p-2 rounded-xl bg-white/5", stat.color)}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted">
                {stat.label}
              </p>
              <p className="text-xl font-black text-white italic tracking-tighter">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Control Bar */}
      <div className="sticky top-20 z-40 flex flex-col md:flex-row gap-4 justify-between items-center bg-black/80 p-4 rounded-2xl border border-white/10 backdrop-blur-2xl transition-all duration-300">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-surface border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-brand-primary transition-colors"
            />
          </div>
          <div className="h-8 w-px bg-white/10" />
          <Filter className="w-4 h-4 text-brand-text-muted cursor-pointer hover:text-brand-primary transition-colors" />
        </div>

        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all border",
                activeCategory === cat
                  ? "bg-brand-primary text-black border-brand-primary"
                  : "bg-white/5 text-brand-text-muted border-white/10 hover:border-white/20",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredCampaigns.length === 0 ? (
        <div className="text-center py-20 bg-brand-surface/20 rounded-3xl border border-dashed border-white/10 flex flex-col items-center space-y-6">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-brand-text-muted opacity-20" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black italic tracking-tighter">
              Project Not Found
            </h3>
            <p className="text-brand-text-muted max-w-xs mx-auto text-sm font-medium">
              We couldn&apos;t find any active campaigns matching your current
              filters or search query.
            </p>
          </div>
          <Button
            onClick={() => {
              setActiveCategory("All");
              setSearchQuery("");
            }}
            variant="outline"
            className="rounded-full border-white/20 text-xs font-black uppercase tracking-widest px-8"
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCampaigns.map((campaign) => (
            <CrowdfundingCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      )}
    </div>
  );
}
