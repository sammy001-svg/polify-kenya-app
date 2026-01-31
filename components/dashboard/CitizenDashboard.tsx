"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase";
import { GamificationService } from "@/lib/gamification-service";
import { MOCK_USER_PROGRESS } from "@/lib/gamification";
import { SAMPLE_POLITICIANS } from "@/lib/representatives";
import { UserLevelProgress } from "@/components/gamification/UserLevelProgress";
import { Shield, MapPin, ChevronRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectVerificationModal } from "@/components/tracker/ProjectVerificationModal";

export function CitizenDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState(MOCK_USER_PROGRESS);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  // Mock location for "My Representatives"
  // In a real app, this would come from the user's profile
  const MOCK_USER_LOCATION = {
    county: "c47", // Nairobi
    constituency: "Kibra",
    ward: "Sarang'ombe"
  };

  const myReps = SAMPLE_POLITICIANS.filter(p => 
    (p.county === MOCK_USER_LOCATION.county && p.position === "Governor") ||
    (p.constituency === MOCK_USER_LOCATION.constituency && p.position === "MP") ||
    (p.ward === MOCK_USER_LOCATION.ward && p.position === "MCA")
  );

  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [selectedProject] = useState({
      id: "road-ward-1",
      title: `Road Upgrade in ${MOCK_USER_LOCATION.ward}`,
      location: MOCK_USER_LOCATION.ward
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        if (user) {
          const userProgress = await GamificationService.getUserProgress(user.id);
          if (userProgress) {
            setProgress(userProgress);
          }
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();

    // Listen for XP gains to refresh local state
    const handleXPGain = () => fetchData();
    window.addEventListener("xp-gained", handleXPGain);
    return () => window.removeEventListener("xp-gained", handleXPGain);
  }, [supabase]);

  const handleVerifyClick = () => {
    setIsVerificationOpen(true);
  };

  if (loading) {
    return <div className="space-y-4 animate-pulse">
        <div className="h-32 w-full bg-white/5 rounded-xl" />
        <div className="h-64 w-full bg-white/5 rounded-xl" />
    </div>;
  }
// ... (middle content same)
            <div className="p-4 rounded-lg bg-brand-surface-secondary text-center">
                <p className="text-xs text-brand-text-muted">
                    Set your location to see your representatives.
                </p>
                <Button variant="ghost" className="text-xs text-kenya-gold h-auto p-0 mt-1 hover:bg-transparent hover:text-white hover:underline">
                    Update Profile
                </Button>
            </div>


  return (
    <div className="space-y-6 h-full overflow-y-auto pr-2">
      
      {/* Identity Card */}
      <div className="bg-brand-surface border border-border rounded-xl p-5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-kenya-gold/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-kenya-gold/20 transition-colors duration-700" />
        
        <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-xl font-black text-white">
                        {user?.email?.split('@')[0] || "Citizen"}
                    </h2>
                    <p className="text-brand-text-muted text-xs font-medium uppercase tracking-wider">
                        Civic Identity Verified
                    </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-brand-surface-highlight flex items-center justify-center border border-white/10">
                    <Shield className="w-5 h-5 text-kenya-green" />
                </div>
            </div>
            
            <UserLevelProgress progress={progress} compact />
            
            <Link href="/leaderboard" className="block mt-4 text-xs text-center text-brand-text-muted hover:text-kenya-gold transition-colors">
                View Leaderboard →
            </Link>
        </div>
      </div>

      {/* Action Items */}
      <div className="space-y-3">
        <h3 className="text-xs font-black uppercase tracking-widest text-brand-text-muted flex items-center gap-2">
            <AlertCircle className="w-3 h-3 text-brand-primary" /> Action Items
        </h3>
        
        {/* Interactive Action Item 1 */}
        <div 
            onClick={handleVerifyClick}
            className="bg-brand-surface-secondary border border-l-4 border-l-brand-primary border-y-border border-r-border rounded-r-lg p-4 hover:bg-brand-surface-highlight transition-all cursor-pointer group active:scale-[0.98]"
        >
            <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-bold text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded">Verify</span>
                <span className="text-[10px] text-brand-text-muted">+50 XP</span>
            </div>
            <h4 className="font-bold text-sm text-white group-hover:text-brand-primary transition-colors mb-1">
                {selectedProject.title}
            </h4>
            <p className="text-xs text-brand-text-muted line-clamp-2">
                Contractors reported on site. Can you confirm work is ongoing?
            </p>
            <div className="text-[10px] font-bold text-white mt-2 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Verify Now <ChevronRight className="w-3 h-3" />
            </div>
        </div>

        {/* Mock Action Item 2 */}
        <div className="bg-brand-surface-secondary border border-l-4 border-l-kenya-gold border-y-border border-r-border rounded-r-lg p-4 hover:bg-brand-surface-highlight transition-colors cursor-pointer group">
            <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-bold text-kenya-gold bg-kenya-gold/10 px-2 py-0.5 rounded">Debate</span>
                <span className="text-[10px] text-brand-text-muted">+20 XP</span>
            </div>
            <h4 className="font-bold text-sm text-white group-hover:text-kenya-gold transition-colors mb-1">
                Finance Bill 2026
            </h4>
            <p className="text-xs text-brand-text-muted line-clamp-2">
                New taxes proposed on digital content. Share your view.
            </p>
            <Link href="/policies" className="text-[10px] font-bold text-white mt-2 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Join Discussion <ChevronRight className="w-3 h-3" />
            </Link>
        </div>
      </div>

      {/* My Representatives */}
      <div className="space-y-3">
        <h3 className="text-xs font-black uppercase tracking-widest text-brand-text-muted flex items-center gap-2">
            <MapPin className="w-3 h-3 text-kenya-red" /> My Representatives
        </h3>
        
        {myReps.length > 0 ? (
            <div className="space-y-2">
                {myReps.map(rep => (
                    <Link key={rep.id} href={`/representatives/${rep.id}`}>
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group">
                            <div className="w-10 h-10 rounded-full bg-brand-surface-highlight overflow-hidden border border-white/5 group-hover:border-kenya-red/50 transition-colors">
                                {/* Placeholder for rep image if real one missing */}
                                <div className="w-full h-full bg-linear-to-br from-gray-700 to-gray-800 flex items-center justify-center text-xs font-bold">
                                    {rep.name.charAt(0)}
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-white truncate group-hover:text-kenya-red transition-colors">
                                    {rep.name}
                                </p>
                                <p className="text-xs text-brand-text-muted flex items-center gap-1">
                                    {rep.position} • {rep.party}
                                </p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-brand-text-muted group-hover:text-white transition-colors" />
                        </div>
                    </Link>
                ))}
            </div>
        ) : (
            <div className="p-4 rounded-lg bg-brand-surface-secondary text-center">
                <p className="text-xs text-brand-text-muted">
                    Set your location to see your representatives.
                </p>
                <Button variant="link" className="text-xs text-kenya-gold h-auto p-0 mt-1">
                    Update Profile
                </Button>
            </div>
        )}
      </div>

      <ProjectVerificationModal 
        isOpen={isVerificationOpen}
        onClose={() => setIsVerificationOpen(false)}
        userId={user?.id || "anonymous"}
        project={selectedProject}
      />
    </div>
  );
}
