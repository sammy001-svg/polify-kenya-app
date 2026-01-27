'use client';

import { MOCK_CAMPAIGN_PROFILE } from '@/lib/campaign-profile';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  MapPin, 
  Users, 
  Calendar, 
  Flag, 
  Briefcase, 
  Edit, 
  Share2, 
  CheckCircle2, 
  Circle, 
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
// import Image from 'next/image';

export default function CampaignProfilePage() {
  const profile = MOCK_CAMPAIGN_PROFILE;

  return (
    <div className="container mx-auto max-w-5xl py-8 px-4 space-y-8">
      {/* Header / Nav */}
      <div className="flex items-center gap-4">
        <Link href="/campaign" className="p-2 hover:bg-brand-surface-secondary rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-brand-text-muted" />
        </Link>
        <h1 className="text-2xl font-bold">Campaign Profile</h1>
      </div>

      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden bg-brand-surface border border-border">
          {/* Banner Background */}
          <div className="h-48 bg-linear-to-r from-kenya-green/20 to-kenya-black/20" />
          
          <div className="px-8 pb-8 flex flex-col md:flex-row items-end -mt-16 gap-6">
              {/* Avatar */}
              <div className="w-32 h-32 rounded-full border-4 border-brand-surface bg-brand-surface-secondary flex items-center justify-center text-4xl shadow-lg">
                   {/* Placeholder for image */}
                   👤
              </div>
              
              <div className="flex-1 mb-2">
                  <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-3xl font-black">{profile.candidateName}</h2>
                      <Badge className="bg-kenya-green hover:bg-kenya-green text-white">Verified Candidate</Badge>
                  </div>
                  <p className="text-lg text-brand-text-muted">{profile.office} • {profile.jurisdiction}</p>
              </div>

              <div className="flex gap-3 mb-4">
                  <Button variant="outline" className="gap-2">
                      <Edit className="w-4 h-4" /> Edit Profile
                  </Button>
                  <Button className="bg-brand-highlight hover:bg-brand-highlight/80 text-white gap-2">
                      <Share2 className="w-4 h-4" /> Share
                  </Button>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
              {/* Bio */}
              <Card className="border-border">
                  <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                          <Briefcase className="w-5 h-5 text-kenya-red" /> Leadership Background
                      </CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-brand-text leading-relaxed whitespace-pre-wrap">
                          {profile.bio}
                      </p>
                  </CardContent>
              </Card>

              {/* Timeline */}
              <Card className="border-border">
                  <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-kenya-green" /> Campaign Timeline
                      </CardTitle>
                      <CardDescription>Key milestones and upcoming events</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <div className="relative border-l-2 border-border pl-8 space-y-8 ml-3">
                          {profile.timeline.map((event) => (
                              <div key={event.id} className="relative">
                                  {/* Dot */}
                                  <div className={`absolute -left-[41px] top-1 w-6 h-6 rounded-full border-4 border-brand-surface flex items-center justify-center ${
                                      event.status === 'completed' ? 'bg-kenya-green text-white' :
                                      event.status === 'current' ? 'bg-kenya-orange animate-pulse' :
                                      'bg-brand-surface-secondary border-border'
                                  }`}>
                                      {event.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                                      {event.status === 'current' && <Circle className="w-3 h-3 fill-current" />}
                                  </div>
                                  
                                  <div>
                                      <div className="flex items-center gap-2 mb-1">
                                          <span className="text-sm font-bold text-brand-text-muted">
                                              {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                          </span>
                                          {event.status === 'current' && <Badge variant="secondary" className="text-xs bg-kenya-orange/20 text-kenya-orange border-none">Current Focus</Badge>}
                                      </div>
                                      <h3 className="text-lg font-bold">{event.title}</h3>
                                      <p className="text-brand-text-muted">{event.description}</p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </CardContent>
              </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
              {/* Party Info */}
              <Card className="border-border bg-brand-surface-highlight hover:border-kenya-green/50 transition-colors">
                  <CardContent className="p-6 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-3xl shadow-sm">
                          {profile.partyLogo}
                      </div>
                      <div>
                          <p className="text-xs font-bold uppercase text-brand-text-muted mb-1">Affiliation</p>
                          <h3 className="text-xl font-black">{profile.party}</h3>
                          <Badge variant="outline" className="border-kenya-green text-kenya-green text-xs mt-1">Confirmed</Badge>
                      </div>
                  </CardContent>
              </Card>

              {/* Stats */}
              <Card className="border-border">
                  <CardHeader>
                      <CardTitle className="text-lg">Campaign Reach</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-brand-surface-secondary">
                          <div className="flex items-center gap-3">
                              <Users className="w-5 h-5 text-blue-400" />
                              <span className="font-medium">Supporters</span>
                          </div>
                          <span className="font-bold text-lg">{profile.stats.supporters.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-brand-surface-secondary">
                          <div className="flex items-center gap-3">
                              <Flag className="w-5 h-5 text-kenya-red" />
                              <span className="font-medium">Volunteers</span>
                          </div>
                          <span className="font-bold text-lg">{profile.stats.volunteers.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-brand-surface-secondary">
                          <div className="flex items-center gap-3">
                              <MapPin className="w-5 h-5 text-kenya-orange" />
                              <span className="font-medium">Events Held</span>
                          </div>
                          <span className="font-bold text-lg">{profile.stats.eventsHeld}</span>
                      </div>
                  </CardContent>
              </Card>

              {/* Slogan */}
              <div className="p-6 rounded-xl bg-linear-to-br from-kenya-red/10 to-kenya-green/10 border border-border text-center">
                  <p className="text-xs font-bold uppercase text-brand-text-muted mb-2">Campaign Slogan</p>
                  <h3 className="text-xl font-black italic">&quot;{profile.slogan}&quot;</h3>
              </div>
          </div>
      </div>
    </div>
  );
}
