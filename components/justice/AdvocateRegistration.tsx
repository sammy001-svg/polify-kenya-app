"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, BadgeCheck, GraduationCap, MapPinned, Star } from "lucide-react";
import { KENYA_LOCATIONS } from "@/lib/location-data";
import { cn } from "@/lib/utils";

const PRACTICE_AREAS = [
  "Civil Litigation",
  "Criminal Law",
  "Family & Divorce",
  "Commercial/Corporate",
  "Real Estate/Land Law",
  "Constitutional Law",
  "Employment/Labor",
  "Intellectual Property"
];

export function AdvocateRegistration() {
  const [fullName, setFullName] = useState("");
  const [lskNumber, setLskNumber] = useState("");
  const [selectedCounty, setSelectedCounty] = useState<string>("");
  const [selectedConstituency, setSelectedConstituency] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [registering, setRegistering] = useState(false);

  const constituencies = selectedCounty
    ? KENYA_LOCATIONS.find((c) => c.name === selectedCounty)?.constituencies || []
    : [];

  const wards = selectedConstituency
    ? constituencies.find((c) => c.name === selectedConstituency)?.wards || []
    : [];

  const toggleArea = (area: string) => {
    setSelectedAreas(prev => 
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
    );
  };

  const handleRegister = () => {
    setRegistering(true);
    setTimeout(() => {
      setRegistering(false);
      alert("Registration submitted for verification. Our team will verify your LSK credentials within 24 hours.");
    }, 2000);
  };

  const isFormValid = 
    fullName.trim().length > 3 && 
    lskNumber.trim().length > 4 && 
    selectedCounty && 
    selectedAreas.length > 0;

  return (
    <div className="relative animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-150">
      <div className="absolute top-0 right-0 w-32 h-32 bg-kenya-gold/5 rounded-full -mr-16 -mt-16 blur-3xl" />
      
      <div className="space-y-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted">Full Name</label>
            <div className="relative">
              <BadgeCheck className="absolute left-3 top-3 h-4 w-4 text-kenya-gold/50" />
              <Input 
                placeholder="As per LSK practicing certificate" 
                className="pl-10 bg-brand-surface/30 border-white/5 focus:border-kenya-gold/50 transition-colors"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted">LSK Number</label>
            <div className="relative">
              <ShieldCheck className="absolute left-3 top-3 h-4 w-4 text-kenya-gold/50" />
              <Input 
                placeholder="e.g. LSK/2024/12345" 
                className="pl-10 bg-brand-surface/30 border-white/5 focus:border-kenya-gold/50 transition-colors"
                value={lskNumber}
                onChange={(e) => setLskNumber(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted flex items-center gap-2">
            <GraduationCap className="h-3 w-3" /> Areas of Practice (Select all that apply)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {PRACTICE_AREAS.map((area) => (
              <div 
                key={area}
                className={cn(
                  "p-2 rounded-lg border text-[10px] font-bold cursor-pointer transition-all flex items-center gap-2",
                  selectedAreas.includes(area) 
                    ? "bg-kenya-gold/10 border-kenya-gold/30 text-kenya-gold" 
                    : "bg-brand-surface/20 border-white/5 text-brand-text-muted hover:border-white/10"
                )}
                onClick={() => toggleArea(area)}
              >
                <div className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  selectedAreas.includes(area) ? "bg-kenya-gold animate-pulse" : "bg-white/10"
                )} />
                {area}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted flex items-center gap-2">
            <MapPinned className="h-3 w-3" /> Service Coverage Area
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Select value={selectedCounty} onValueChange={(v) => { setSelectedCounty(v); setSelectedConstituency(""); setSelectedWard(""); }}>
              <SelectTrigger className="bg-brand-surface/30 border-white/5 text-xs">
                <SelectValue placeholder="County" />
              </SelectTrigger>
              <SelectContent className="bg-brand-bg border-white/10">
                {KENYA_LOCATIONS.map(c => <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>

            <Select value={selectedConstituency} onValueChange={(v) => { setSelectedConstituency(v); setSelectedWard(""); }} disabled={!selectedCounty}>
              <SelectTrigger className="bg-brand-surface/30 border-white/5 text-xs">
                <SelectValue placeholder="Constituency" />
              </SelectTrigger>
              <SelectContent className="bg-brand-bg border-white/10">
                {constituencies.map(c => <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>

            <Select value={selectedWard} onValueChange={setSelectedWard} disabled={!selectedConstituency}>
              <SelectTrigger className="bg-brand-surface/30 border-white/5 text-xs">
                <SelectValue placeholder="Ward" />
              </SelectTrigger>
              <SelectContent className="bg-brand-bg border-white/10">
                {wards.map(w => <SelectItem key={w} value={w}>{w}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="pt-4">
          <Button
            className={cn(
              "w-full h-12 text-xs font-black uppercase tracking-widest shadow-xl transition-all duration-500",
              isFormValid 
                ? "bg-kenya-gold text-black hover:bg-white hover:scale-[1.02] shadow-kenya-gold/10" 
                : "bg-white/5 text-brand-text-muted cursor-not-allowed opacity-50"
            )}
            onClick={handleRegister}
            disabled={!isFormValid || registering}
          >
            {registering ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Validating LSK ID...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-current" />
                Register as Verified Practitioner
              </div>
            )}
          </Button>
          <p className="text-[9px] text-center mt-3 text-brand-text-muted opacity-50">
            By registering, you agree to be indexed in the Judicial Transparency Portal and provide pro-bono consultations where applicable.
          </p>
        </div>
      </div>
    </div>
  );
}
