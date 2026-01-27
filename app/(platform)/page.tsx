import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { PlayCircle, CheckCircle, BadgeCheck, Info } from "lucide-react";
import { DEMO_STREAMS } from "@/lib/demo-data";
import { ViewpointBalance } from "@/components/feed/ViewpointBalance";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero / Featured */}
      <section className="relative rounded-2xl overflow-hidden bg-brand-surface-secondary aspect-video md:aspect-21/9 flex items-end">
         <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent z-10" />
         {/* Placeholder Image replacement */}
         <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-brand-text-muted">
            [Featured Stream Wrapper]
         </div>
         
         <div className="relative z-20 p-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-kenya-red text-white text-xs font-bold uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Live Now
            </div>
            <h1 className="text-4xl font-bold max-w-2xl text-white">
              National Assembly: The Finance Bill Second Reading
            </h1>
            <p className="text-lg text-gray-200 max-w-xl">
              Watch live as MPs debate the proposed tax amendments. Get real-time fact-checking and historical context overlay.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200">
                <PlayCircle className="mr-2 w-5 h-5" />
                Watch Broadcast
              </Button>
              <Button size="lg" variant="secondary">
                <CheckCircle className="mr-2 w-5 h-5 text-kenya-green" />
                Read Fact Sheet
              </Button>
            </div>
         </div>
      </section>

      {/* Feed Filters */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
        {["All", "Parliament", "County Assemblies", "Explainer Videos", "Interviews", "Town Halls"].map((filter, i) => (
          <Button 
            key={filter} 
            variant={i === 0 ? "primary" : "secondary"} 
            size="sm"
            className="whitespace-nowrap"
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Content Grid + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content - 3 columns */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {DEMO_STREAMS.map((item) => (
            <Card key={item.id} className="border-0 bg-transparent shadow-none group cursor-pointer">
              <div className="relative aspect-video rounded-xl bg-brand-surface-highlight mb-3 overflow-hidden">
                 <Image 
                   src={item.thumbnailUrl} 
                   alt={item.title} 
                   fill
                   className="object-cover group-hover:scale-105 transition-transform duration-500" 
                 />
                 <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 rounded text-xs font-medium text-white">
                   {item.duration}
                 </div>
                 
                 {/* Truth Layer Badge */}
                 <div className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm
                    ${item.verificationStatus === 'Verified' ? 'bg-kenya-green/90 text-black' : 
                      item.verificationStatus === 'Pending' ? 'bg-kenya-gold/90 text-black' : 
                      'bg-kenya-gold/90 text-black'
                    }`}>
                    {item.verificationStatus}
                 </div>
                 
                 {/* Why Recommended Icon */}
                 <HoverCard>
                   <HoverCardTrigger asChild>
                     <button className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-black/90 transition-colors">
                       <Info className="w-3 h-3 text-white" />
                     </button>
                   </HoverCardTrigger>
                   <HoverCardContent className="w-64 bg-brand-surface border-border shadow-xl">
                     <div className="space-y-2">
                       <h4 className="text-xs font-bold text-brand-text-muted uppercase">Why you&apos;re seeing this</h4>
                       <p className="text-sm text-brand-text">{item.recommendationReason}</p>
                       <a href="/transparency" className="text-xs text-blue-400 hover:underline block pt-2 border-t border-border">
                         Learn about our algorithm →
                       </a>
                     </div>
                   </HoverCardContent>
                 </HoverCard>
              </div>
              <div className="flex gap-3">
                <div className="relative w-10 h-10 rounded-full bg-brand-surface-highlight shrink-0 overflow-hidden">
                   <Image src={item.thumbnailUrl} alt={item.host} fill className="object-cover opacity-80" />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold leading-tight line-clamp-2 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-brand-text-muted">
                      <span>{item.host}</span>
                      {item.isVerifiedChannel && <BadgeCheck className="w-3.5 h-3.5 text-blue-500 fill-blue-500/10" />}
                      <span>• {item.views} views • {item.timeAgo}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Sidebar - 1 column */}
        <div className="lg:col-span-1 space-y-4">
          <ViewpointBalance />
          
          {/* Campaign Tools CTA */}
          <Card className="border-kenya-green/50 bg-linear-to-br from-brand-surface to-kenya-green/10 p-4">
              <h3 className="font-bold text-lg mb-2">Running for Office?</h3>
              <p className="text-sm text-brand-text-muted mb-4">
                  Access professional campaign tools, manage your team, and publish verified content.
              </p>
              <a href="/campaign">
                  <Button className="w-full bg-kenya-green hover:bg-kenya-green/90 text-white font-bold">
                      Enter Campaign HQ
                  </Button>
              </a>
          </Card>
        </div>
      </div>
    </div>
  );
}
