"use client";

import { useState } from "react";
import { MCA_PERFORMANCE_DATA } from "@/lib/mca-performance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, Fingerprint, Gift, Megaphone, Star, ExternalLink, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function IntegrityHub() {
  const [isReporting, setIsReporting] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* MCA Performance Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Fingerprint className="w-5 h-5 text-kenya-gold" />
            MCA Performance Tracker
          </h3>
          <span className="text-[10px] bg-kenya-gold/10 text-kenya-gold px-2 py-1 rounded font-black uppercase">Citizen Verified</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MCA_PERFORMANCE_DATA.map((mca) => (
            <Card key={mca.id} className="bg-brand-surface border-white/5 overflow-hidden group hover:border-kenya-gold/30 transition-all">
               <div className="h-1 w-full bg-white/5 relative overflow-hidden">
                  <div 
                    className={cn(
                        "absolute top-0 left-0 h-full transition-all duration-1000",
                        mca.rating >= 4 ? "bg-kenya-green" : mca.rating >= 3 ? "bg-kenya-gold" : "bg-kenya-red"
                    )}
                    style={{ width: `${(mca.rating / 5) * 100}%` }}
                  />
               </div>
               <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                     <div>
                        <CardTitle className="text-base font-bold">{mca.name}</CardTitle>
                        <p className="text-xs text-brand-text-muted">{mca.ward}, {mca.county}</p>
                     </div>
                     <div className="flex items-center gap-1 text-kenya-gold bg-kenya-gold/10 px-1.5 py-0.5 rounded">
                        <Star className="w-3 h-3 fill-kenya-gold" />
                        <span className="text-[10px] font-black">{mca.rating}</span>
                     </div>
                  </div>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white/5 p-2 rounded-lg text-center">
                         <div className="text-xs font-black text-white">{mca.attendance}%</div>
                         <div className="text-[9px] text-brand-text-muted uppercase tracking-tighter">Attendance</div>
                      </div>
                      <div className="bg-white/5 p-2 rounded-lg text-center">
                         <div className="text-xs font-black text-white">{mca.billsSponsored}</div>
                         <div className="text-[9px] text-brand-text-muted uppercase tracking-tighter">Bills</div>
                      </div>
                  </div>
                  
                  <div className="space-y-1">
                     <div className="flex justify-between text-[10px] font-black text-brand-text-muted">
                        <span>WDF UTILIZATION</span>
                        <span className="text-white">{mca.wdfUtilization}%</span>
                     </div>
                     <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden">
                        <div 
                           className="bg-kenya-green h-full" 
                           style={{ width: `${mca.wdfUtilization}%` }}
                        />
                     </div>
                  </div>

                  <div className="pt-2 border-t border-white/5">
                     <p className="text-[10px] text-brand-text-muted italic leading-relaxed">
                        Last Action: &quot;{mca.lastAction}&quot;
                     </p>
                  </div>
               </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Asset Declarations & Gifts */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
               <ShieldCheck className="w-5 h-5 text-kenya-green" />
               Public Life Declarations
            </h3>
            <div className="bg-brand-surface border border-white/5 rounded-2xl p-6 space-y-4">
               <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                     <Gift className="w-5 h-5 text-kenya-gold" />
                     <div>
                        <div className="font-bold text-sm">Official Gift Registry</div>
                        <div className="text-xs text-brand-text-muted">Check what your leaders received this month.</div>
                     </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-brand-text-muted group-hover:text-white" />
               </div>

               <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                     <div className="w-5 h-5 bg-kenya-red/20 rounded flex items-center justify-center">
                        <ShieldAlert className="w-3.5 h-3.5 text-kenya-red" />
                     </div>
                     <div>
                        <div className="font-bold text-sm">Asset Declarations</div>
                        <div className="text-xs text-brand-text-muted">Public wealth reports for CS & Governors.</div>
                     </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-brand-text-muted group-hover:text-white" />
               </div>
            </div>
         </div>

         {/* Whistleblower Portal */}
         <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
               <Megaphone className="w-5 h-5 text-kenya-red" />
               Truth Messenger (Whistleblower)
            </h3>
            <div className="bg-kenya-red/5 border border-kenya-red/20 rounded-2xl p-6 flex flex-col items-center text-center space-y-4">
               <div className="w-16 h-16 bg-kenya-red/10 rounded-full flex items-center justify-center">
                  <Megaphone className="w-8 h-8 text-kenya-red animate-pulse" />
               </div>
               <div>
                  <h4 className="font-bold">See something, say something.</h4>
                  <p className="text-xs text-brand-text-muted max-w-xs mt-1">
                     Anonymously report corruption or misuse of public funds at the county level.
                  </p>
               </div>
               <Button 
                  onClick={() => setIsReporting(true)}
                  className="w-full bg-kenya-red hover:bg-kenya-red/90 text-white font-black uppercase text-xs h-10 tracking-widest"
               >
                  {isReporting ? "Loading Secure Portal..." : "Start Anonymous Report"}
               </Button>
               <p className="text-[10px] text-brand-text-muted italic">
                  End-to-end encrypted & metadata-stripped.
               </p>
            </div>
         </div>
      </section>
    </div>
  );
}
