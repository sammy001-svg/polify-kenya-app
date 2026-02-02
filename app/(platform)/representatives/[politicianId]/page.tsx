"use client";

import { use } from "react";
import { getCountyById, SAMPLE_POLITICIANS } from "@/lib/representatives";
import { BadgeCheck, Phone, Mail, Twitter, Facebook, MapPin, Award, TrendingUp, FileText, ArrowLeft, Gavel, ScrollText, Mic2, Users, History } from "lucide-react";
import Link from "next/link";
import { YOUTH_ISSUES, MOCK_RESPONSES, PoliticianResponse } from "@/lib/youth-issues";
import { MOCK_PERFORMANCE, MOCK_BILLS, MOCK_VOTES, MOCK_HANSARD } from "@/lib/parliament-watch";
import { createClient } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { FollowButton } from "@/components/ui/FollowButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AccountabilityService, SyncScore } from "@/lib/accountability-service";
import { PublicEventsList } from "@/components/representatives/PublicEventsList";

interface Politician {
  id: string;
  name: string;
  position: string;
  party: string;
  county?: string;
  constituency?: string;
  ward?: string;
  is_incumbent: boolean;
  bio: string;
  photo_url?: string;
  slogan?: string;
  manifesto?: string;
  contact_info?: {
    phone?: string;
    email?: string;
    socialMedia?: {
      twitter?: string;
      facebook?: string;
    };
  };
  track_record?: { // Keeping this structure compatible with the UI for now, even if DB JSON might differ slightly
    projectsCompleted: number;
    billsSponsored: number;
    attendanceRate: number;
    committeeMemberships: string[];
  };
  // Adding for UI compatibility from mocks if missing in DB
  education: string[];
  keyAgenda: string[];
  whyRunning: string;
  familyBackground?: string;
}

export default function PoliticianProfilePage({ params }: { params: Promise<{ politicianId: string }> }) {
  const { politicianId } = use(params);
  const supabase = createClient();
  const [politician, setPolitician] = useState<Politician | null>(null);
  const [loading, setLoading] = useState(true);
  const [followersCount, setFollowersCount] = useState(0);
  const [syncScore, setSyncScore] = useState<SyncScore | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let foundPolitician: Politician | null = null;
        
        // 1. Try fetching from Supabase
        const { data: pol } = await supabase
          .from('politicians')
          .select('*')
          .eq('id', politicianId)
          .single();

        if (pol) {
           // Transform Supabase data
           foundPolitician = {
              ...pol,
              is_incumbent: pol.is_incumbent || false,
              education: (pol.bio && pol.bio.includes('Education')) ? [] : ["University of Nairobi (Bachelor's)", "Strathmore Business School"],
              keyAgenda: ["Youth Employment", "Digital Economy", "Healthcare Reform"],
              whyRunning: pol.manifesto || "To serve the people representing their true interests.",
              contact_info: pol.contact_info || {}, 
              track_record: pol.track_record || {
                 projectsCompleted: 12,
                 billsSponsored: 3,
                 attendanceRate: 85,
                 committeeMemberships: ["Finance", "ICT"]
              }
           };
        } else {
            // 2. Fallback to Mock Data
            const mockPol = SAMPLE_POLITICIANS.find(p => p.id === politicianId);
            if (mockPol) {
                foundPolitician = {
                    id: mockPol.id,
                    name: mockPol.name,
                    position: mockPol.position,
                    party: mockPol.party,
                    county: mockPol.county,
                    constituency: mockPol.constituency,
                    ward: mockPol.ward,
                    is_incumbent: mockPol.isIncumbent,
                    bio: mockPol.bio,
                    photo_url: mockPol.photo,
                    slogan: mockPol.slogan,
                    manifesto: mockPol.manifesto,
                    contact_info: {
                        phone: mockPol.phone,
                        email: mockPol.email,
                        socialMedia: mockPol.socialMedia
                    },
                    track_record: mockPol.trackRecord,
                    education: mockPol.education,
                    keyAgenda: mockPol.keyAgenda,
                    whyRunning: mockPol.whyRunning,
                    familyBackground: mockPol.familyBackground
                };
            }
        }

        setPolitician(foundPolitician);
        
        // Fetch Follower Count (only if valid ID)
        if (politicianId) {
             const { count } = await supabase
              .from('follows')
              .select('*', { count: 'exact', head: true })
              .eq('following_politician_id', politicianId);
            
            if (count !== null) {
              setFollowersCount(count || 0);
            }
        }

        // Calculate Sync Score
        const userVotes = AccountabilityService.getUserVotes();
        const score = AccountabilityService.calculateSyncScore(userVotes, foundPolitician?.name || "");
        setSyncScore(score);

      } catch (error) {
        console.error("Error fetching politician:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [politicianId, supabase]);

  if (loading) {
     return <div className="flex justify-center py-20"><div className="animate-spin h-8 w-8 border-4 border-brand-primary border-t-transparent rounded-full"></div></div>;
  }
  
  if (!politician) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-brand-text mb-4">Politician not found</h2>
        <Link href="/representatives" className="text-kenya-gold hover:underline">
          ← Back to Representatives
        </Link>
      </div>
    );
  }
  
  const county = politician.county ? getCountyById(politician.county) : null;
  
  const getPositionColor = (position: string) => {
    switch (position) {
      case 'President':
      case 'Deputy President':
        return 'bg-purple-500';
      case 'Governor':
      case 'Senator':
        return 'bg-kenya-red';
      case 'MP':
      case 'Woman Rep':
        return 'bg-kenya-gold';
      case 'MCA':
        return 'bg-kenya-green';
      default:
        return 'bg-blue-500';
    }
  };
  
  const getPartyColor = (party: string) => {
    switch (party) {
      case 'UDA':
        return 'bg-kenya-gold';
      case 'ODM':
        return 'bg-orange-500';
      case 'Jubilee':
        return 'bg-red-500';
      case 'Wiper':
        return 'bg-blue-500';
      case 'Independent':
        return 'bg-gray-500';
      default:
        return 'bg-gray-600';
    }
  };
  
  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link href="/representatives" className="inline-flex items-center gap-2 text-brand-text-muted hover:text-kenya-gold transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Representatives</span>
      </Link>
      
      {/* Header Card */}
      <div className="bg-brand-surface-secondary border border-border rounded-xl overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-linear-to-r from-kenya-red to-kenya-gold"></div>
        
        {/* Profile Info */}
        <div className="px-8 py-6 -mt-16">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full bg-linear-to-br from-kenya-red to-kenya-gold p-1 flex items-center justify-center shrink-0">
               <Avatar className="w-full h-full border-4 border-brand-surface-secondary">
                  <AvatarImage src={politician.photo_url || ""} alt={politician.name} />
                  <AvatarFallback className="text-4xl font-bold bg-brand-surface-secondary text-brand-text">
                     {politician.name ? politician.name.substring(0, 2).toUpperCase() : "PO"}
                  </AvatarFallback>
               </Avatar>
            </div>
            
            {/* Basic Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-brand-text">{politician.name}</h1>
                    <BadgeCheck className="w-6 h-6 text-kenya-green" />
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className={`${getPositionColor(politician.position)} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                      {politician.position}
                    </span>
                    {politician.is_incumbent && (
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold">
                        Incumbent
                      </span>
                    )}
                    <span className={`${getPartyColor(politician.party)} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                      {politician.party}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-brand-text-muted">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {politician.ward && `${politician.ward} Ward, `}
                      {politician.constituency && `${politician.constituency}, `}
                      {county?.name ? `${county.name} County` : (politician.county || "Kenya")}
                    </span>
                  </div>
                </div>

                {/* Follow Button & Stats */}
                <div className="flex flex-col items-end gap-2">
                   <FollowButton 
                      targetId={politician.id} 
                      targetType="politician" 
                      onFollowChange={(isFollowing) => {
                         setFollowersCount(prev => isFollowing ? prev + 1 : prev - 1);
                      }}
                   />
                   <div className="text-sm text-brand-text-muted font-medium">
                      {followersCount} Followers
                   </div>
                   
                   {syncScore && syncScore.totalCommonBills > 0 && (
                      <div className="mt-4 p-3 bg-brand-surface-highlight border border-white/5 rounded-xl text-center">
                        <div className={`text-2xl font-black ${
                          syncScore.score > 70 ? 'text-green-500' : 
                          syncScore.score > 40 ? 'text-kenya-gold' : 
                          'text-red-500'
                        }`}>
                          {syncScore.score}%
                        </div>
                        <div className="text-[10px] uppercase font-black text-brand-text-muted tracking-widest mt-1">
                          Consensus Sync
                        </div>
                      </div>
                   )}
                </div>
              </div>
              
              {/* Slogan */}
              {politician.slogan && (
                 <div className="bg-brand-surface-highlight rounded-lg p-4 mb-4">
                   <p className="text-xl font-bold text-brand-text italic text-center">
                     &quot;{politician.slogan}&quot;
                   </p>
                 </div>
              )}
              
              {/* Contact Buttons */}
              <div className="flex flex-wrap gap-3">
                {politician.contact_info?.phone && (
                  <button className="flex items-center gap-2 px-4 py-2 bg-kenya-green text-white rounded-lg hover:bg-green-600 transition-colors">
                    <Phone className="w-4 h-4" />
                    <span>Call</span>
                  </button>
                )}
                {politician.contact_info?.email && (
                  <button className="flex items-center gap-2 px-4 py-2 bg-kenya-gold text-black rounded-lg hover:bg-kenya-gold/80 transition-colors">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </button>
                )}
                {politician.contact_info?.socialMedia?.twitter && (
                  <a href={`https://twitter.com/${politician.contact_info.socialMedia.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    <Twitter className="w-4 h-4" />
                    <span>Twitter</span>
                  </a>
                )}
                {politician.contact_info?.socialMedia?.facebook && (
                  <a href={`https://facebook.com/${politician.contact_info.socialMedia.facebook}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
                    <Facebook className="w-4 h-4" />
                    <span>Facebook</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Track Record (if incumbent) */}
      {politician.is_incumbent && politician.track_record && (
        <div className="bg-brand-surface-secondary border border-border rounded-xl p-6">
          <h2 className="text-2xl font-bold text-brand-text mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-kenya-gold" />
            Track Record
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-brand-surface-highlight rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-kenya-green" />
              </div>
              <p className="text-3xl font-bold text-brand-text">{politician.track_record.projectsCompleted}</p>
              <p className="text-sm text-brand-text-muted mt-1">Projects Completed</p>
            </div>
            <div className="text-center p-4 bg-brand-surface-highlight rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <FileText className="w-6 h-6 text-kenya-gold" />
              </div>
              <p className="text-3xl font-bold text-brand-text">{politician.track_record.billsSponsored}</p>
              <p className="text-sm text-brand-text-muted mt-1">Bills Sponsored</p>
            </div>
            <div className="text-center p-4 bg-brand-surface-highlight rounded-lg">
              <p className="text-3xl font-bold text-brand-text">{politician.track_record.attendanceRate}%</p>
              <p className="text-sm text-brand-text-muted mt-1">Attendance Rate</p>
            </div>
            <div className="text-center p-4 bg-brand-surface-highlight rounded-lg">
              <p className="text-3xl font-bold text-brand-text">{politician.track_record.committeeMemberships.length}</p>
              <p className="text-sm text-brand-text-muted mt-1">Committees</p>
            </div>
          </div>
          
          {politician.track_record.committeeMemberships.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-bold text-brand-text mb-3">Committee Memberships</h3>
              <div className="flex flex-wrap gap-2">
                {politician.track_record.committeeMemberships.map((committee, index) => (
                  <span key={index} className="px-3 py-1 bg-kenya-gold/20 text-kenya-gold rounded-full text-sm font-medium">
                    {committee}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Public Events Feed */}
      <PublicEventsList politicianId={politician.id} />
      
      {/* Bio & Education */}
      <div className="bg-brand-surface-secondary border border-border rounded-xl p-6">
        <h2 className="text-2xl font-bold text-brand-text mb-4">About</h2>
        <p className="text-brand-text leading-relaxed mb-6">{politician.bio}</p>

        {politician.familyBackground && (
           <div className="mb-6 pb-6 border-b border-border/50">
               <h3 className="text-lg font-bold text-brand-text mb-3 flex items-center gap-2">
                   <Users className="w-5 h-5 text-kenya-gold" /> Family Background
               </h3>
               <p className="text-brand-text leading-relaxed">
                   {politician.familyBackground}
               </p>
           </div>
        )}
        
        {politician.education && politician.education.length > 0 && (
           <>
              <h3 className="text-lg font-bold text-brand-text mb-3">Education</h3>
              <ul className="space-y-2">
                {politician.education.map((edu, index) => (
                  <li key={index} className="flex items-center gap-2 text-brand-text">
                    <span className="w-2 h-2 rounded-full bg-kenya-gold"></span>
                    <span>{edu}</span>
                  </li>
                ))}
              </ul>
           </>
        )}
      </div>
      
      {/* Manifesto & Agenda */}
      {politician.manifesto && (
        <div className="bg-brand-surface-secondary border border-border rounded-xl p-6">
          <h2 className="text-2xl font-bold text-brand-text mb-4">Manifesto</h2>
          <p className="text-brand-text leading-relaxed mb-6">{politician.manifesto}</p>
          
          {politician.keyAgenda && politician.keyAgenda.length > 0 && (
             <>
                <h3 className="text-lg font-bold text-brand-text mb-4">Key Agenda</h3>
                <div className="space-y-3">
                  {politician.keyAgenda.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-kenya-gold text-black font-bold text-sm shrink-0">
                        {index + 1}
                      </span>
                      <p className="text-brand-text leading-relaxed flex-1 pt-1">{item}</p>
                    </div>
                  ))}
                </div>
             </>
          )}
        </div>
      )}

      {/* Promises vs. Reality Timeline */}
      <div className="bg-brand-surface-secondary border border-border rounded-xl p-6">
        <h2 className="text-2xl font-bold text-brand-text mb-6 flex items-center gap-2">
          <History className="w-6 h-6 text-brand-primary" />
          Promises vs. Reality
        </h2>
        
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-white/5">
          {[
            { 
              promise: "200,000 Digital Jobs for Youth", 
              reality: "45,000 verified jobs in 2024. Majority in gig economy.", 
              status: "Ongoing", 
              type: "Economy",
              date: "2022 Manifesto"
            },
            { 
              promise: "Universal Health Coverage for all households", 
              reality: "SHIF implementation ongoing. Hospital empanelment at 60%.", 
              status: "Context Added", 
              type: "Health",
              date: "2023 Policy Speech"
            },
            { 
              promise: "50% Reduction in Fertilizer Prices", 
              reality: "Subsidized prices achieved. Distribution challenges reported in Rift Valley.", 
              status: "Verified", 
              type: "Agriculture",
              date: "Aug 2022 Slogan"
            }
          ].map((item, idx) => (
            <div key={idx} className="relative pl-12">
              <div className={`absolute left-2 top-0 w-4 h-4 rounded-full border-4 border-brand-surface-secondary ${
                item.status === 'Verified' ? 'bg-green-500' : 
                item.status === 'Ongoing' ? 'bg-kenya-gold' : 'bg-blue-400'
              }`} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-brand-primary/5 border border-brand-primary/10 rounded-xl">
                  <span className="text-[9px] font-black uppercase tracking-widest text-brand-primary block mb-2">{item.date}</span>
                  <h4 className="font-bold text-white mb-2 italic">&quot;{item.promise}&quot;</h4>
                </div>
                <div className="p-4 bg-white/5 border border-white/5 rounded-xl">
                   <div className="flex justify-between items-start mb-2">
                     <span className="text-[9px] font-black uppercase tracking-widest text-brand-text-muted">Verification Result</span>
                     <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                        item.status === 'Verified' ? 'bg-green-500/10 text-green-500' : 
                        item.status === 'Ongoing' ? 'bg-kenya-gold/10 text-kenya-gold' : 'bg-blue-400/10 text-blue-400'
                     }`}>
                        {item.status}
                     </span>
                   </div>
                   <p className="text-sm text-brand-text leading-relaxed">
                     {item.reality}
                   </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Parliamentary Performance (MPs & Senators) */}
      {(() => {
        // Fallback to MOCK_PERFORMANCE using a hash or just generic if ID doesn't match
        // For now, we only show if the ID matches mock data, otherwise hide to avoid emptiness
        // Ideally we'd have this in the DB too.
        if (!MOCK_PERFORMANCE[politician.id]) return null;
        
        const perf = MOCK_PERFORMANCE[politician.id];
        const bills = MOCK_BILLS.filter(b => b.sponsorId === politician.id);
        const votes = MOCK_VOTES.filter(v => v.politicianId === politician.id);
        const hansard = MOCK_HANSARD.filter(h => h.politicianId === politician.id);
        
        return (
          <div className="bg-brand-surface-secondary border border-border rounded-xl p-6">
            <h2 className="text-2xl font-bold text-brand-text mb-6 flex items-center gap-2">
              <Gavel className="w-6 h-6 text-kenya-gold" />
              Parliamentary Performance
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Attendance & Committees */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-brand-text mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-brand-text-muted" />
                    Attendance (Last Session)
                  </h3>
                  <div className="bg-black/20 rounded-lg p-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-brand-text">Present</span>
                      <span className="font-bold text-kenya-green">{perf.attendance.present} sittings</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full mb-4">
                      <div 
                        className="bg-kenya-green h-2 rounded-full" 
                        style={{ width: `${(perf.attendance.present / perf.attendance.totalSittings) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-text-muted">Absent (Apology): {perf.attendance.absentWithApology}</span>
                      <span className="text-brand-text-muted">Absent: {perf.attendance.absent}</span>
                    </div>
                  </div>
                </div>
                
                {perf.committeeRoles.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-brand-text mb-3">Committee Roles</h3>
                    <ul className="space-y-2">
                      {perf.committeeRoles.map((role, idx) => (
                        <li key={idx} className="flex items-center justify-between bg-brand-surface-highlight p-3 rounded-lg">
                          <span className="text-sm font-medium text-brand-text">{role.committee}</span>
                          <span className="text-xs bg-kenya-gold/20 text-kenya-gold px-2 py-1 rounded-full font-bold">
                            {role.role}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* Voting Record */}
              <div>
                <h3 className="text-lg font-bold text-brand-text mb-3 flex items-center gap-2">
                  <ScrollText className="w-5 h-5 text-brand-text-muted" />
                  Recent Votes
                </h3>
                {votes.length > 0 ? (
                  <div className="space-y-3">
                    {votes.map(vote => (
                      <div key={vote.id} className="flex items-center justify-between bg-brand-surface-highlight p-3 rounded-lg border-l-4 border-l-transparent hover:border-l-kenya-gold transition-all">
                        <div className="flex-1 mr-4">
                          <p className="text-sm font-medium text-brand-text line-clamp-1">{vote.billTitle}</p>
                          <p className="text-xs text-brand-text-muted">{vote.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          vote.vote === 'Yes' ? 'bg-green-500/20 text-green-400' :
                          vote.vote === 'No' ? 'bg-red-500/20 text-red-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {vote.vote}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-brand-text-muted text-sm italic">No recent voting data available.</p>
                )}
              </div>
            </div>
            
            {/* Sponsored Bills */}
            {bills.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-bold text-brand-text mb-3 flex items-center gap-2">
                  <ScrollText className="w-5 h-5 text-brand-text-muted" />
                  Sponsored Bills
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {bills.map(bill => (
                    <div key={bill.id} className="bg-brand-surface-highlight p-4 rounded-lg border border-border">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-brand-text">{bill.title}</h4>
                        <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                          {bill.status}
                        </span>
                      </div>
                      <p className="text-sm text-brand-text-muted mb-2">{bill.summary}</p>
                      <p className="text-xs text-brand-text-muted">Introduced: {bill.introductionDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Hansard Contributions */}
            {hansard.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-bold text-brand-text mb-3 flex items-center gap-2">
                  <Mic2 className="w-5 h-5 text-brand-text-muted" />
                  Recent Hansard Contributions
                </h3>
                <div className="space-y-4">
                  {hansard.map(h => (
                    <div key={h.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-kenya-gold mb-1"></div>
                        <div className="w-0.5 flex-1 bg-border"></div>
                      </div>
                      <div className="pb-4">
                        <p className="text-xs text-kenya-gold font-bold mb-1">{h.date} • {h.type}</p>
                        <p className="text-sm font-bold text-brand-text mb-1">{h.topic}</p>
                        <p className="text-sm text-brand-text-muted">{h.summary}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })()}
      
      {/* Youth Issue Responses */}
      {(() => {
        // Similar check for mock responses matched by name/position
        const politicianResponses: Array<{issue: typeof YOUTH_ISSUES[0], response: PoliticianResponse}> = [];
        
        Object.entries(MOCK_RESPONSES).forEach(([issueId, responses]) => {
          const response = responses.find((r) => 
            r.politicianName.toLowerCase().includes(politician.name.toLowerCase().split(' ')[1]) ||
            r.position.toLowerCase().includes(politician.position.toLowerCase())
          );
          
          if (response) {
            const issue = YOUTH_ISSUES.find((i) => i.id === issueId);
            if (issue) {
              politicianResponses.push({ issue, response });
            }
          }
        });
        
        if (politicianResponses.length === 0) return null;
        
        return (
          <div className="bg-brand-surface-secondary border border-border rounded-xl p-6">
            <h2 className="text-2xl font-bold text-brand-text mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-kenya-gold" />
              Youth Issue Responses ({politicianResponses.length})
            </h2>
            <p className="text-brand-text-muted mb-6">
              See how {politician.name.split(' ')[0]} has responded to key youth concerns
            </p>
            
            <div className="space-y-6">
              {politicianResponses.map(({ issue, response }) => {
                const Icon = issue.icon;
                return (
                  <Link
                    key={issue.id}
                    href={`/youth/issues/${issue.id}`}
                    className="block bg-brand-surface-highlight rounded-lg p-5 border border-border hover:border-kenya-gold transition-colors group"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg ${issue.color} bg-opacity-10 flex items-center justify-center shrink-0`}>
                        <Icon className={`w-6 h-6 ${issue.color.replace('bg-', 'text-')}`} />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-brand-text mb-2 group-hover:text-kenya-gold transition-colors">
                          {issue.title}
                        </h3>
                        <p className="text-sm text-brand-text mb-3 line-clamp-2">
                          {response.response.position}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-brand-text-muted">
                          <span className="flex items-center gap-1">
                            <span className="text-kenya-gold">★</span>
                            {response.rating.toFixed(1)} ({response.ratingCount} ratings)
                          </span>
                          <span>•</span>
                          <span>{response.likes.toLocaleString()} likes</span>
                          <span>•</span>
                          <span className="text-kenya-gold group-hover:text-kenya-gold">View full response →</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            
            <div className="mt-6 pt-6 border-t border-border text-center">
              <Link 
                href="/youth/issues" 
                className="inline-flex items-center gap-2 hover:text-kenya-gold/80 transition-colors font-medium"
              >
                <span>Explore All Youth Issues</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>
        );
      })()}
      
      {/* Why Running */}
      <div className="bg-linear-to-r from-kenya-red/10 to-kenya-gold/10 border border-kenya-gold/30 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-brand-text mb-4">Why I&apos;m Running</h2>
        <p className="text-brand-text leading-relaxed text-lg">{politician.whyRunning}</p>
      </div>
    </div>
  );
}
