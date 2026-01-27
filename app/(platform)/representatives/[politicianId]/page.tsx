"use client";

import { use } from "react";
import { SAMPLE_POLITICIANS, getCountyById } from "@/lib/representatives";
import { notFound } from "next/navigation";
import { BadgeCheck, Phone, Mail, Twitter, Facebook, MapPin, Award, TrendingUp, FileText, ArrowLeft, Gavel, ScrollText, Mic2, Users } from "lucide-react";
import Link from "next/link";
import { YOUTH_ISSUES, MOCK_RESPONSES, PoliticianResponse } from "@/lib/youth-issues";
import { MOCK_PERFORMANCE, MOCK_BILLS, MOCK_VOTES, MOCK_HANSARD } from "@/lib/parliament-watch";

export default function PoliticianProfilePage({ params }: { params: Promise<{ politicianId: string }> }) {
  const { politicianId } = use(params);
  const politician = SAMPLE_POLITICIANS.find(p => p.id === politicianId);
  
  if (!politician) {
    notFound();
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
            <div className="w-32 h-32 rounded-full bg-linear-to-br from-kenya-red to-kenya-gold flex items-center justify-center text-white font-bold text-4xl border-4 border-brand-surface-secondary shrink-0">
              {politician.name.split(' ').map(n => n[0]).join('')}
            </div>
            
            {/* Basic Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-brand-text">{politician.name}</h1>
                    {politician.verified && (
                      <BadgeCheck className="w-6 h-6 text-kenya-green" />
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className={`${getPositionColor(politician.position)} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                      {politician.position}
                    </span>
                    {politician.isIncumbent && (
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
                      {county?.name} County
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Slogan */}
              <div className="bg-brand-surface-highlight rounded-lg p-4 mb-4">
                <p className="text-xl font-bold text-brand-text italic text-center">
                  &quot;{politician.slogan}&quot;
                </p>
              </div>
              
              {/* Contact Buttons */}
              <div className="flex flex-wrap gap-3">
                {politician.phone && (
                  <button className="flex items-center gap-2 px-4 py-2 bg-kenya-green text-white rounded-lg hover:bg-green-600 transition-colors">
                    <Phone className="w-4 h-4" />
                    <span>Call</span>
                  </button>
                )}
                {politician.email && (
                  <button className="flex items-center gap-2 px-4 py-2 bg-kenya-gold text-black rounded-lg hover:bg-kenya-gold/80 transition-colors">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </button>
                )}
                {politician.socialMedia.twitter && (
                  <a href={`https://twitter.com/${politician.socialMedia.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    <Twitter className="w-4 h-4" />
                    <span>Twitter</span>
                  </a>
                )}
                {politician.socialMedia.facebook && (
                  <a href={`https://facebook.com/${politician.socialMedia.facebook}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
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
      {politician.isIncumbent && politician.trackRecord && (
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
              <p className="text-3xl font-bold text-brand-text">{politician.trackRecord.projectsCompleted}</p>
              <p className="text-sm text-brand-text-muted mt-1">Projects Completed</p>
            </div>
            <div className="text-center p-4 bg-brand-surface-highlight rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <FileText className="w-6 h-6 text-kenya-gold" />
              </div>
              <p className="text-3xl font-bold text-brand-text">{politician.trackRecord.billsSponsored}</p>
              <p className="text-sm text-brand-text-muted mt-1">Bills Sponsored</p>
            </div>
            <div className="text-center p-4 bg-brand-surface-highlight rounded-lg">
              <p className="text-3xl font-bold text-brand-text">{politician.trackRecord.attendanceRate}%</p>
              <p className="text-sm text-brand-text-muted mt-1">Attendance Rate</p>
            </div>
            <div className="text-center p-4 bg-brand-surface-highlight rounded-lg">
              <p className="text-3xl font-bold text-brand-text">{politician.trackRecord.committeeMemberships.length}</p>
              <p className="text-sm text-brand-text-muted mt-1">Committees</p>
            </div>
          </div>
          
          {politician.trackRecord.committeeMemberships.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-bold text-brand-text mb-3">Committee Memberships</h3>
              <div className="flex flex-wrap gap-2">
                {politician.trackRecord.committeeMemberships.map((committee, index) => (
                  <span key={index} className="px-3 py-1 bg-kenya-gold/20 text-kenya-gold rounded-full text-sm font-medium">
                    {committee}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Bio & Education */}
      <div className="bg-brand-surface-secondary border border-border rounded-xl p-6">
        <h2 className="text-2xl font-bold text-brand-text mb-4">About</h2>
        <p className="text-brand-text leading-relaxed mb-6">{politician.bio}</p>
        
        <h3 className="text-lg font-bold text-brand-text mb-3">Education</h3>
        <ul className="space-y-2">
          {politician.education.map((edu, index) => (
            <li key={index} className="flex items-center gap-2 text-brand-text">
              <span className="w-2 h-2 rounded-full bg-kenya-gold"></span>
              <span>{edu}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Manifesto & Agenda */}
      <div className="bg-brand-surface-secondary border border-border rounded-xl p-6">
        <h2 className="text-2xl font-bold text-brand-text mb-4">Manifesto</h2>
        <p className="text-brand-text leading-relaxed mb-6">{politician.manifesto}</p>
        
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
      </div>
      
      {/* Parliamentary Performance (MPs & Senators) */}
      {(() => {
        const perf = MOCK_PERFORMANCE[politician.id];
        if (!perf) return null;
        
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
        // Find all responses by this politician across all youth issues
        // We cast to any[] first to avoid strict type checking on the MOCK_RESPONSES entries which might be loose
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
