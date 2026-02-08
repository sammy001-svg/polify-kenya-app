import { MOCK_PETITIONS, MOCK_EVENTS } from "@/lib/action-data";
import { PetitionCard } from "@/components/action/PetitionCard";
import { EventList } from "@/components/action/EventList";
import { Award, PenTool, MapPin, Users } from "lucide-react";
import Link from "next/link";

export default function ParticipatePage() {
  return (
    <div className="space-y-12 pb-20">
      {/* Hero Header */}
      <div className="relative py-12 px-6 bg-brand-surface border-b border-white/5 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-kenya-green/20 rounded-full blur-3xl" />
          
          <div className="relative max-w-5xl mx-auto text-center space-y-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-kenya-red/10 border border-kenya-red/20 text-kenya-red text-xs font-bold uppercase tracking-wider mb-2">
                 <PenTool className="w-3.5 h-3.5" /> Civic Action Hub
             </div>
             <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
                Don&apos;t Just Watch. <span className="text-transparent bg-clip-text bg-linear-to-r from-kenya-green to-emerald-400">Act.</span>
             </h1>
             <p className="text-lg text-brand-text-muted max-w-2xl mx-auto leading-relaxed">
                Sign petitions that matter, attend local town halls, and engage directly with your leaders. Your voice is the most powerful tool in democracy.
             </p>
          </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 space-y-16">
          {/* Section 1: Petitions */}
          <div id="petitions" className="space-y-6 scroll-mt-24">
              <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-kenya-red/10 flex items-center justify-center border border-kenya-red/20">
                          <PenTool className="w-5 h-5 text-kenya-red" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">Active Petitions</h2>
                  </div>
                  <Link href="/participate" className="text-sm font-bold text-brand-text-muted hover:text-white transition-colors">
                      View All →
                  </Link>
              </div>
              
              <div className="overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
                  <div className="flex gap-6 w-max">
                      {MOCK_PETITIONS.map(petition => (
                          <PetitionCard key={petition.id} petition={petition} />
                      ))}
                      {/* Create New Card */}
                      <div className="w-[320px] shrink-0 bg-white/5 border border-dashed border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all flex flex-col items-center justify-center gap-4 group cursor-pointer">
                          <div className="w-16 h-16 rounded-full bg-brand-surface border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <PenTool className="w-6 h-6 text-brand-text-muted group-hover:text-white" />
                          </div>
                          <div className="text-center">
                              <h3 className="font-bold text-white">Start a Petition</h3>
                              <p className="text-xs text-brand-text-muted max-w-[200px] mt-1">
                                 Rally your community around a cause you care about.
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          {/* Section 2: Events & Surveys */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Events Column */}
              <div className="lg:col-span-2 space-y-6">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-kenya-green/10 flex items-center justify-center border border-kenya-green/20">
                              <MapPin className="w-5 h-5 text-kenya-green" />
                          </div>
                          <h2 className="text-2xl font-bold text-white">Town Halls & Meetups</h2>
                      </div>
                   </div>
                   <EventList events={MOCK_EVENTS} />
              </div>

              {/* Surveys Column */}
              <div className="space-y-6">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-kenya-gold/10 flex items-center justify-center border border-kenya-gold/20">
                          <Users className="w-5 h-5 text-kenya-gold" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">Quick Pulse</h2>
                   </div>
                   
                   <div className="bg-brand-surface-secondary border border-white/5 rounded-xl p-6 relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-kenya-gold/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                       
                       <div className="mb-4">
                           <span className="text-[10px] font-bold uppercase tracking-wider text-kenya-gold bg-kenya-gold/10 px-2 py-0.5 rounded">Weekly Survey</span>
                           <h3 className="text-lg font-bold text-white mt-2 leading-tight">
                               Should the county prioritize road repairs over new market stalls?
                           </h3>
                       </div>
                       
                       <div className="space-y-3">
                           <button className="w-full text-left p-3 rounded-lg bg-brand-surface border border-white/5 hover:border-kenya-gold/50 transition-all text-sm font-medium text-brand-text-muted hover:text-white group">
                               <span className="font-bold text-white mr-2">A.</span> Prioritize Roads
                           </button>
                           <button className="w-full text-left p-3 rounded-lg bg-brand-surface border border-white/5 hover:border-kenya-gold/50 transition-all text-sm font-medium text-brand-text-muted hover:text-white group">
                               <span className="font-bold text-white mr-2">B.</span> Prioritize Markets
                           </button>
                           <button className="w-full text-left p-3 rounded-lg bg-brand-surface border border-white/5 hover:border-kenya-gold/50 transition-all text-sm font-medium text-brand-text-muted hover:text-white group">
                               <span className="font-bold text-white mr-2">C.</span> Balance Both (50/50)
                           </button>
                       </div>
                       
                       <p className="text-xs text-brand-text-muted mt-4 text-center">
                           2,450 residents have voted today.
                       </p>
                   </div>
                   
                   {/* Gamification Teaser */}
                   <div className="bg-linear-to-br from-purple-500/10 to-blue-500/10 border border-white/5 rounded-xl p-6 text-center">
                       <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                       <h3 className="font-bold text-white">Earn Process Badges</h3>
                       <p className="text-xs text-brand-text-muted mb-4">
                           Every petition signed and event attended earns you points towards the &quot;Civic Champion&quot; badge.
                       </p>
                       <Link href="/leaderboard" className="text-xs font-bold text-purple-400 hover:text-purple-300 hover:underline">
                           View Leaderboard →
                       </Link>
                   </div>
              </div>
          </div>
      </div>
    </div>
  );
}
