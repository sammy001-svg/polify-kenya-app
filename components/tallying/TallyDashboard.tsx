"use client";

import { Toaster } from "sonner";
import { SummaryHeader } from "./SummaryHeader";
import { ElectionHeatMap } from "./ElectionHeatMap";
import { DetailedResultCard } from "./DetailedResultCard";
import { DataProcessingNodeV2 } from "./DataProcessingNodeV2";
import { AIAlertsPane } from "./AIAlertsPane";
import { AuditLogPane } from "./AuditLogPane";
import { ResultProjectionsNode } from "./ResultProjectionsNode";
import { VerifiedBadge } from "./VerifiedBadge";

export function TallyDashboard() {
  return (
    <div className="tally-hub-overhaul flex flex-col gap-0 min-h-screen bg-transparent relative overflow-hidden selection:bg-brand-primary/30 selection:text-white">
      <style dangerouslySetInnerHTML={{ __html: `
        .main-content-container:has(.tally-hub-overhaul) {
          max-width: none !important;
          padding: 0 !important;
          margin: 0 !important;
          width: 100% !important;
        }
      `}} />
      
      {/* 1. TOP SUMMARY HEADER (HUD Title & Global Stats) */}
      <SummaryHeader />

      {/* Global HUD Layer (Background Grid & Scanlines) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Deep Field Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,128,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,128,0.03)_1px,transparent_1px)] bg-size-[60px_60px] mask-[radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
        
        {/* Atmospheric Glow */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_40%,rgba(0,255,128,0.04),transparent_70%)]" />
        
        {/* Heavy Scanlines */}
        <div className="absolute inset-0 opacity-[0.15] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-size-[100%_4px,3px_100%]" />
        
        {/* Floating Particles / Dust */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
      </div>

      <div className="flex-1 p-4 md:p-6 flex flex-col relative z-10 w-full overflow-x-hidden">
        
        {/* Main 3-Column Command Hub Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 md:gap-5 flex-1 w-full">
            
            {/* LEFT COLUMN (Presidential, Parliamentary, Data Processing) */}
            <div className="md:col-span-1 xl:col-span-3 flex flex-col gap-4 md:gap-5 h-full order-2 xl:order-1">
                <DetailedResultCard 
                   title="Presidential Results"
                   reporting="458 / 600"
                   candidates={[
                      { name: "Candidate A", pct: "54.2%", votes: "7,290,045", photo: "/images/candidates/william_ruto.png", party_color: "bg-brand-primary" },
                      { name: "Candidate B", pct: "44.8%", votes: "6,025,811", photo: "/images/candidates/raila_odinga.png", party_color: "bg-kenya-red" },
                      { name: "Candidate C", pct: "0.6%", votes: "80,705", photo: "", party_color: "bg-white/10" },
                      { name: "Candidate D", pct: "0.3%", votes: "40,352", photo: "", party_color: "bg-white/10" },
                      { name: "Others", pct: "0.1%", votes: "13,449", photo: "", party_color: "bg-white/10" }
                   ]}
                   /* cspell:disable */
                   form34As={[
                     { id: "34A-ELD-08", stationName: "Eldoret Town Hall", county: "Uasin Gishu", constituency: "Kesses", timestamp: "31 mins ago" },
                     { id: "34A-NKR-22", stationName: "Nakuru High School", county: "Nakuru", constituency: "Nakuru Town East", timestamp: "45 mins ago" },
                     { id: "34A-MAC-03", stationName: "Machakos Boys", county: "Machakos", constituency: "Machakos Town", timestamp: "1 hr ago" },
                     { id: "34A-MER-11", stationName: "Meru Primary", county: "Meru", constituency: "Imenti North", timestamp: "1 hr 12 mins ago" },
                     { id: "34A-KAK-07", stationName: "Bukhungu Stadium", county: "Kakamega", constituency: "Lurambi", timestamp: "2 hrs ago" },
                     { id: "34A-NYR-14", stationName: "Ruring'u Stadium", county: "Nyeri", constituency: "Nyeri Town", timestamp: "2 hrs 30 mins ago" },
                     { id: "34A-GAR-02", stationName: "Garissa Primary", county: "Garissa", constituency: "Garissa Township", timestamp: "3 hrs ago" },
                   ]}
                />
                <DetailedResultCard 
                   title="Parliamentary Results"
                   reporting="328 / 600"
                   showDropdown={true}
                   dropdownType="constituency"
                   candidates={[
                      { name: "Candidate M", pct: "52.5%", votes: "3,412,091", photo: "", party_color: "bg-kenya-green" },
                      { name: "Candidate N", pct: "45.3%", votes: "2,944,502", photo: "", party_color: "bg-kenya-gold" },
                      /* cspell:disable-next-line */
                      { name: "M. Ochieng", pct: "1.5%", votes: "97,500", photo: "", party_color: "bg-white/5" },
                      /* cspell:disable-next-line */
                      { name: "S. Kamau", pct: "0.5%", votes: "32,500", photo: "", party_color: "bg-white/5" },
                      { name: "Others", pct: "0.2%", votes: "13,000", photo: "", party_color: "bg-white/5" }
                   ]}
                />
                <div className="grow">
                    <DataProcessingNodeV2 />
                </div>
            </div>

            {/* CENTER COLUMN (Election Map, AI Alerts, Projections) - Mobile Order 1 */}
            <div className="md:col-span-2 xl:col-span-6 flex flex-col gap-4 md:gap-6 h-full pb-10 md:pb-20 order-1 xl:order-2"> 
                {/* Main Interactive Map (Tallest) */}
                <div className="flex-1 w-full min-h-[350px] md:min-h-[450px]">
                   <ElectionHeatMap />
                </div>
                
                {/* AI Alerts (Mid) */}
                <div className="h-auto md:h-[180px] w-full shrink-0">
                   <AIAlertsPane />
                </div>

                {/* Status & Projections (Bottom) */}
                <div className="h-auto md:h-[160px] w-full shrink-0">
                   <ResultProjectionsNode />
                </div>
            </div>

            {/* RIGHT COLUMN (Governor, MCA, Audit Feed) - Mobile Order 3 */}
            <div className="md:col-span-1 xl:col-span-3 flex flex-col gap-4 md:gap-5 h-full order-3">
                <DetailedResultCard 
                   title="Governor Results"
                   reporting="875 / 1200"
                   showDropdown={true}
                   dropdownType="county"
                   candidates={[
                      { name: "Candidate X", pct: "61.4%", votes: "1,203,501", photo: "/images/candidates/william_ruto.png", party_color: "bg-brand-primary" },
                      { name: "Candidate Y", pct: "37.6%", votes: "736,960", photo: "/images/candidates/raila_odinga.png", party_color: "bg-kenya-red" },
                      { name: "Candidate Z", pct: "0.8%", votes: "15,680", photo: "", party_color: "bg-white/10" },
                      { name: "Others", pct: "0.2%", votes: "3,920", photo: "", party_color: "bg-white/10" },
                   ]}
                />
                <DetailedResultCard 
                   title="Senator / Women Rep Results"
                   reporting="210 / 300"
                   showDropdown={true}
                   dropdownType="county"
                   roleOptions={["SENATOR", "WOMEN REP"]}
                   candidates={[
                      { name: "Candidate P", pct: "48.9%", votes: "42,054", party_color: "bg-kenya-green" },
                      { name: "Candidate Q", pct: "47.2%", votes: "40,592", party_color: "bg-kenya-gold" },
                      { name: "Others", pct: "3.9%", votes: "3,354", party_color: "bg-white/5" }
                   ]}
                />
                <div className="grow">
                   <AuditLogPane />
                </div>
                
                {/* Final Verification Stamp */}
                <div className="p-4 bg-linear-to-br from-brand-primary/10 to-transparent border border-brand-primary/20 rounded-2xl shrink-0 backdrop-blur-md">
                   <VerifiedBadge variant="small" />
                </div>
            </div>
        </div>
      </div>

      <Toaster position="top-right" theme="dark" closeButton richColors />
    </div>
  );
}
