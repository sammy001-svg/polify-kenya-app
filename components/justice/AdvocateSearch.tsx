"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Scale, Briefcase, Gavel, GraduationCap, Star, ShieldAlert } from "lucide-react";
import { KENYA_LOCATIONS } from "@/lib/location-data";
import { cn } from "@/lib/utils";

// Mock Advocate Database
const MOCK_ADVOCATES = [
  {
    id: "1",
    name: "Caleb Kiprono",
    lskId: "LSK/2021/4492",
    specialty: "Constitutional & Civil Law",
    county: "Nairobi",
    constituency: "Dagoretti North",
    ward: "Kawangware",
    rating: 4.9,
    cases: 124,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Faith Mutisya",
    lskId: "LSK/2019/3105",
    specialty: "Family & Human Rights",
    county: "Nairobi",
    constituency: "Dagoretti North",
    ward: "Kawangware",
    rating: 4.8,
    cases: 87,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "David Ochieng",
    lskId: "LSK/2020/5521",
    specialty: "Commercial & Land Law",
    county: "Mombasa",
    constituency: "Nyali",
    ward: "Kongowea",
    rating: 4.7,
    cases: 156,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&h=100&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Sarah Wambui",
    lskId: "LSK/2022/1183",
    specialty: "Employment & Labor Law",
    county: "Kiambu",
    constituency: "Ruiru",
    ward: "Biashara",
    rating: 4.6,
    cases: 42,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop"
  }
];

export function AdvocateSearch() {
  const [selectedCounty, setSelectedCounty] = useState<string>("");
  const [selectedConstituency, setSelectedConstituency] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");
  const [reason, setReason] = useState("");
  const [searching, setSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<typeof MOCK_ADVOCATES>([]);

  const constituencies = selectedCounty
    ? KENYA_LOCATIONS.find((c) => c.name === selectedCounty)?.constituencies || []
    : [];

  const wards = selectedConstituency
    ? constituencies.find((c) => c.name === selectedConstituency)?.wards || []
    : [];

  const handleSearch = () => {
    setSearching(true);
    
    // Simulate API delay
    setTimeout(() => {
      const filtered = MOCK_ADVOCATES.filter(adv => {
        const matchesCounty = adv.county === selectedCounty;
        const matchesConstituency = !selectedConstituency || adv.constituency === selectedConstituency;
        const matchesWard = !selectedWard || adv.ward === selectedWard;
        return matchesCounty && matchesConstituency && matchesWard;
      });
      
      setResults(filtered);
      setSearching(false);
      setShowResults(true);
    }, 1500);
  };

  const isFormValid = selectedCounty && reason.trim().length > 5;

  return (
    <>
      <Card className="border-brand-accent/20 bg-brand-bg/50 backdrop-blur-md overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-700">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-brand-primary via-kenya-gold to-brand-primary/50" />
        
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-brand-primary/10 rounded-lg">
              <Scale className="h-5 w-5 text-brand-primary" />
            </div>
            <CardTitle className="text-xl font-bold tracking-tight uppercase">
              Find Legal Representation
            </CardTitle>
          </div>
          <CardDescription className="text-brand-muted">
            Connect with verified advocates in your locality to assist with your legal needs.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-muted flex items-center gap-2">
                <MapPin className="h-3 w-3" /> County
              </label>
              <Select
                value={selectedCounty}
                onValueChange={(value) => {
                  setSelectedCounty(value);
                  setSelectedConstituency("");
                  setSelectedWard("");
                }}
              >
                <SelectTrigger className="bg-brand-surface/50 border-brand-accent/20 focus:ring-brand-primary/50">
                  <SelectValue placeholder="Select County" />
                </SelectTrigger>
                <SelectContent className="bg-brand-bg border-brand-accent/20 text-brand-text">
                  {KENYA_LOCATIONS.map((county) => (
                    <SelectItem key={county.name} value={county.name} className="focus:bg-brand-primary/20">
                      {county.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-muted">
                Constituency
              </label>
              <Select
                value={selectedConstituency}
                onValueChange={(value) => {
                  setSelectedConstituency(value);
                  setSelectedWard("");
                }}
                disabled={!selectedCounty}
              >
                <SelectTrigger className="bg-brand-surface/50 border-brand-accent/20">
                  <SelectValue placeholder="Select Constituency" />
                </SelectTrigger>
                <SelectContent className="bg-brand-bg border-brand-accent/20 text-brand-text">
                  {constituencies.map((constituency) => (
                    <SelectItem key={constituency.name} value={constituency.name} className="focus:bg-brand-primary/20">
                      {constituency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-muted">
                Ward
              </label>
              <Select
                value={selectedWard}
                onValueChange={setSelectedWard}
                disabled={!selectedConstituency}
              >
                <SelectTrigger className="bg-brand-surface/50 border-brand-accent/20">
                  <SelectValue placeholder="Select Ward" />
                </SelectTrigger>
                <SelectContent className="bg-brand-bg border-brand-accent/20 text-brand-text">
                  {wards.map((ward) => (
                    <SelectItem key={ward} value={ward} className="focus:bg-brand-primary/20">
                      {ward}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-brand-muted flex items-center gap-2">
              <Briefcase className="h-3 w-3" /> Nature of Legal Assistance
            </label>
            <Textarea
              placeholder="Please describe why you are looking for an advocate (e.g., civil litigation, land dispute, family law)..."
              className="min-h-[120px] bg-brand-surface/50 border-brand-accent/20 focus:ring-brand-primary/50 resize-none"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <p className="text-[10px] text-brand-muted italic">
              * Your request will be shared with the Law Society of Kenya (LSK) verified practitioners in your area.
            </p>
          </div>

          <div className="pt-2">
            <Button
              className={cn(
                "w-full h-12 text-sm font-bold uppercase tracking-widest transition-all duration-300",
                isFormValid 
                  ? "bg-brand-primary hover:bg-brand-primary/80 text-white shadow-[0_0_20px_rgba(var(--brand-primary-rgb),0.3)]" 
                  : "bg-brand-surface text-brand-muted cursor-not-allowed"
              )}
              onClick={handleSearch}
              disabled={!isFormValid || searching}
            >
              {searching ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Searching Registry...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Find Available Advocates
                </div>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-[10px] text-brand-text-muted opacity-60">
            <div className="flex items-start gap-2">
              <Gavel className="h-3 w-3 mt-0.5" />
              <span>Verified by the Judiciary & Law Society of Kenya (LSK)</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-3 w-3 mt-0.5 rounded-full bg-brand-primary" />
              <span>Real-time availability tracking for urgent matters</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showResults} onOpenChange={setShowResults}>
        <DialogContent className="max-w-2xl bg-brand-bg border-white/10 p-0 overflow-hidden">
          <div className="bg-linear-to-r from-brand-primary via-kenya-gold to-brand-primary/50 h-1 w-full" />
          <div className="p-8">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-3">
                <div className="p-2 bg-brand-primary/10 rounded-lg">
                  <Search className="h-5 w-5 text-brand-primary" />
                </div>
                Search Results
              </DialogTitle>
              <DialogDescription className="text-brand-text-muted">
                Available advocates found in {selectedWard || selectedConstituency || selectedCounty}.
              </DialogDescription>
            </DialogHeader>

            <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-4 scrollbar-hide">
              {results.length > 0 ? (
                results.map((adv) => (
                  <div 
                    key={adv.id}
                    className="group bg-brand-surface/40 border border-white/5 hover:border-brand-primary/30 p-4 rounded-2xl transition-all hover:scale-[1.01] flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-14 w-14 border-2 border-brand-primary/20">
                        <AvatarImage src={adv.avatar} />
                        <AvatarFallback className="bg-brand-primary/10 text-brand-primary font-black uppercase text-xs">
                          {adv.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white uppercase tracking-tight">{adv.name}</h4>
                          <Badge className="bg-kenya-gold/10 text-kenya-gold border-kenya-gold/20 text-[9px] font-black uppercase px-2 py-0">
                            Verified
                          </Badge>
                        </div>
                        <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest">{adv.lskId}</p>
                        <div className="flex items-center gap-3 text-xs text-brand-text-muted font-medium">
                          <span className="flex items-center gap-1"><GraduationCap className="h-3 w-3" /> {adv.specialty}</span>
                          <span className="flex items-center gap-1 text-kenya-gold"><Star className="h-3 w-3 fill-current" /> {adv.rating}</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-black font-black uppercase text-[10px] tracking-widest px-4 h-10 rounded-xl transition-all border border-brand-primary/20">
                      Request
                    </Button>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-in fade-in duration-700">
                  <div className="p-4 bg-kenya-red/5 rounded-full border border-kenya-red/10">
                    <ShieldAlert className="h-10 w-10 text-kenya-red/50" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xl font-black text-white uppercase tracking-tight">No Advocates Found</h4>
                    <p className="text-brand-text-muted max-w-xs text-sm font-medium leading-relaxed">
                      We couldn&apos;t find any practitioners listed in <span className="text-white">&quot;{selectedWard || selectedConstituency || selectedCounty}&quot;</span> matching your request.
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-white/10 hover:bg-white/5 text-[10px] font-black uppercase tracking-widest px-8"
                    onClick={() => setShowResults(false)}
                  >
                    Modify Selection
                  </Button>
                </div>
              )}
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-brand-text-muted opacity-40">
              <span>Updated: Real-time Registry Sync</span>
              <span>LSK Validated Platform</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
