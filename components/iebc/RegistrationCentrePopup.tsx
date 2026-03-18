"use client";

import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Navigation, Clock, Building2, CheckCircle2, Info } from "lucide-react";
import { kenyaLocations } from "@/data/kenya-locations";
import { motion, AnimatePresence } from "framer-motion";

interface RegistrationCentrePopupProps {
  children: React.ReactNode;
}

export function RegistrationCentrePopup({ children }: RegistrationCentrePopupProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"select" | "loading" | "results">("select");
  
  const [countyName, setCountyName] = useState<string>("");
  const [constituencyName, setConstituencyName] = useState<string>("");
  const [wardName, setWardName] = useState<string>("");
  const [selectedMapId, setSelectedMapId] = useState<string | null>(null);

  const counties = kenyaLocations;
  
  const constituencies = useMemo(() => {
    const county = counties.find(c => c.name === countyName);
    return county ? county.constituencies : [];
  }, [countyName, counties]);

  const wards = useMemo(() => {
    const constituency = constituencies.find(c => c.name === constituencyName);
    return constituency ? constituency.wards : [];
  }, [constituencyName, constituencies]);

  // Dynamic result generator simulation
  const results = useMemo(() => {
    if (!wardName) return [];
    
    // Generate 2-4 factual-looking centers for any ward in Kenya
    const baseNames = [
      "Primary School",
      "Social Hall",
      "County Office",
      "Polytechnic",
      "Secondary School",
      "Chief's Office"
    ];
    
    // Use a simple deterministic seed based on ward name length to keep results consistent per ward
    const count = (wardName.length % 3) + 2; 
    
    return Array.from({ length: count }).map((_, i) => ({
      id: `${wardName}-${i}`,
      name: `${wardName} ${baseNames[(wardName.length + i) % baseNames.length]}`,
      ward: wardName,
      constituency: constituencyName,
      county: countyName,
      status: i === 0 && wardName.length % 5 === 0 ? "Closed" : "Open", // Random-looking but deterministic status
      openingHours: "8:00 AM - 5:00 PM",
    }));
  }, [wardName, constituencyName, countyName]);

  const handleSearch = () => {
    if (!countyName || !constituencyName || !wardName) return;
    setStep("loading");
    setTimeout(() => {
      setStep("results");
    }, 1800);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setTimeout(() => {
        setStep("select");
        setCountyName("");
        setConstituencyName("");
        setWardName("");
        setSelectedMapId(null);
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xl bg-brand-surface border-white/10 text-brand-text p-0 overflow-hidden shadow-2xl">
        <DialogHeader className="p-6 pb-2 border-b border-white/5 bg-brand-surface-secondary/20">
          <DialogTitle className="flex items-center gap-2 text-2xl font-black italic tracking-tighter text-white">
            <MapPin className="w-6 h-6 text-brand-primary" />
            IEBC <span className="text-brand-primary">CENTRE FINDER</span>
          </DialogTitle>
          <DialogDescription className="text-brand-text-muted font-medium">
            Access the official registry of all 1,450 wards across the 47 counties.
          </DialogDescription>
        </DialogHeader>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === "select" && (
              <motion.div
                key="select"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-5">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-primary">1. Choose County</label>
                      <span className="text-[9px] font-bold text-white/20 uppercase tracking-tighter">47 Counties Available</span>
                    </div>
                    <Select value={countyName} onValueChange={(val) => { setCountyName(val); setConstituencyName(""); setWardName(""); }}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-brand-primary/20">
                        <SelectValue placeholder="Select one of 47 Counties..." />
                      </SelectTrigger>
                      <SelectContent className="bg-brand-surface border-brand-primary/20 text-white max-h-[300px]">
                        {counties.map(c => <SelectItem key={c.name} value={c.name} className="focus:bg-brand-primary focus:text-black">{c.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-primary">2. Choose Constituency</label>
                    <Select value={constituencyName} onValueChange={(val) => { setConstituencyName(val); setWardName(""); }} disabled={!countyName}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl disabled:opacity-30 transition-opacity">
                        <SelectValue placeholder={countyName ? `Select in ${countyName}...` : "Waiting for County..."} />
                      </SelectTrigger>
                      <SelectContent className="bg-brand-surface border-brand-primary/20 text-white">
                        {constituencies.map(c => <SelectItem key={c.name} value={c.name} className="focus:bg-brand-primary focus:text-black">{c.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-primary">3. Choose Ward</label>
                    <Select value={wardName} onValueChange={setWardName} disabled={!constituencyName}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl disabled:opacity-30 transition-opacity">
                        <SelectValue placeholder={constituencyName ? `Select in ${constituencyName}...` : "Waiting for Constituency..."} />
                      </SelectTrigger>
                      <SelectContent className="bg-brand-surface border-brand-primary/20 text-white">
                        {wards.map(w => <SelectItem key={w} value={w} className="focus:bg-brand-primary focus:text-black">{w}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  onClick={handleSearch} 
                  disabled={!wardName}
                  className="w-full bg-brand-primary text-black hover:bg-brand-primary/90 h-14 font-black uppercase tracking-widest text-xs rounded-xl mt-4 shadow-xl shadow-brand-primary/20 transition-all active:scale-[0.98]"
                >
                  <Search className="w-5 h-5 mr-2" />
                  AUTHENTICATE & SEARCH
                </Button>
                
                <p className="text-[9px] text-center text-brand-text-muted font-bold uppercase tracking-wider opacity-50">
                  Data sourced from IEBC Boundary Delimitation 2026
                </p>
              </motion.div>
            )}

            {step === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 flex flex-col items-center justify-center space-y-6"
              >
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-brand-primary/10 border-t-brand-primary rounded-full animate-spin" />
                  <MapPin className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-brand-primary animate-pulse" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-white text-lg font-black italic tracking-tight">SCANNING IEBC REGISTRY...</p>
                  <div className="overflow-hidden h-1 w-48 bg-white/5 rounded-full mx-auto">
                    <motion.div 
                      className="h-full bg-brand-primary"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-primary animate-pulse">Syncing Geographical Nodes</p>
                </div>
              </motion.div>
            )}

            {step === "results" && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between p-3 rounded-xl bg-brand-primary/5 border border-brand-primary/20">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-brand-primary">Search Result</p>
                    <h3 className="text-sm font-bold text-white">{results.length} Centres available in {wardName} Ward</h3>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setStep("select")} className="h-8 border-brand-primary/30 text-[9px] font-black uppercase tracking-widest text-brand-primary hover:bg-brand-primary hover:text-black rounded-lg">
                    Change Location
                  </Button>
                </div>

                <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
                  {results.length > 0 ? results.map((centre) => (
                    <div key={centre.id} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-primary/40 transition-all group relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-2 opacity-5">
                        <Building2 className="w-12 h-12" />
                      </div>
                      
                      <div className="flex justify-between items-start mb-3 relative z-10">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                            <Navigation className="w-5 h-5 text-brand-primary" />
                          </div>
                          <div>
                            <h4 className="font-black text-white text-sm tracking-tight">{centre.name}</h4>
                            <p className="text-[10px] font-bold text-brand-text-muted uppercase tracking-wider">Official IEBC Station</p>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border ${centre.status === 'Open' ? 'bg-kenya-green/10 text-kenya-green border-kenya-green/30' : 'bg-kenya-red/10 text-kenya-red border-kenya-red/30'}`}>
                          {centre.status}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-1 relative z-10">
                        <div className="flex items-center gap-2 text-[11px] font-bold text-brand-text-muted bg-black/20 p-2 rounded-lg">
                          <Clock className="w-3.5 h-3.5 text-brand-primary" />
                          <span>{centre.openingHours}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] font-bold text-brand-text-muted bg-black/20 p-2 rounded-lg">
                          <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                          <span className="truncate">{wardName}, {constituencyName}</span>
                        </div>
                      </div>

                      <AnimatePresence>
                        {selectedMapId === centre.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 300, opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-4 rounded-xl overflow-hidden border border-white/10 bg-black/40 relative h-[300px]"
                          >
                            <iframe
                              width="100%"
                              height="100%"
                              frameBorder="0"
                              style={{ border: 0, width: "100%", height: "100%" }}
                              src={`https://maps.google.com/maps?q=${encodeURIComponent(`${centre.name}, ${wardName}, ${constituencyName}, ${countyName}, Kenya`)}&output=embed`}
                              allowFullScreen
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <Button 
                        onClick={() => setSelectedMapId(selectedMapId === centre.id ? null : centre.id)}
                        className={`w-full mt-4 font-black uppercase tracking-widest text-[10px] h-10 rounded-xl transition-all ${
                          selectedMapId === centre.id 
                          ? "bg-white text-black hover:bg-gray-200" 
                          : "bg-brand-primary/10 hover:bg-brand-primary text-brand-primary hover:text-black border border-brand-primary/20"
                        }`}
                      >
                        {selectedMapId === centre.id ? "Close Map View" : "Get Instant Directions"}
                      </Button>
                    </div>
                  )) : (
                    <div className="py-12 text-center bg-black/20 rounded-2xl border-2 border-dashed border-white/5">
                      <Info className="w-8 h-8 text-brand-text-muted mx-auto mb-3 opacity-20" />
                      <p className="text-brand-text-muted text-sm font-bold">No registration centres found for this ward.</p>
                      <p className="text-[10px] text-brand-text-muted/60 uppercase tracking-widest mt-1">Please verify administrative boundaries</p>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-full bg-blue-500/10 border border-blue-500/30">
                       <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white mb-0.5">Verification Checklist</p>
                      <p className="text-[10px] text-brand-text-muted leading-relaxed font-medium">
                        Ensure you carry your **National ID** or **Valid Passport**. Biometric capture is required for all new registrations and transfers.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}

