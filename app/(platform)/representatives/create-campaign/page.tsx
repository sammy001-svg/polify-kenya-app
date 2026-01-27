"use client";

import { useState } from "react";
import { KENYA_COUNTIES, PositionType, PartyAffiliation } from "@/lib/representatives";
import { User, MapPin, FileText, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CreateCampaignPage() {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    position: "" as PositionType | "",
    county: "",
    constituency: "",
    ward: "",
    party: "" as PartyAffiliation | "",
    slogan: "",
    bio: "",
    education: "",
    manifesto: "",
    keyAgenda: ["", "", "", "", ""],
    whyRunning: "",
    phone: "",
    email: "",
    twitter: "",
    facebook: "",
  });
  
  const positions: PositionType[] = ["MCA", "MP", "Woman Rep", "Senator", "Governor", "President", "Deputy President"];
  const parties: PartyAffiliation[] = ["UDA", "ODM", "Jubilee", "Wiper", "Independent", "Other"];
  
  const selectedCounty = KENYA_COUNTIES.find(c => c.id === formData.county);
  
  const updateAgenda = (index: number, value: string) => {
    const newAgenda = [...formData.keyAgenda];
    newAgenda[index] = value;
    setFormData({ ...formData, keyAgenda: newAgenda });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Campaign data:", formData);
    alert("Campaign profile created! (This is a demo - no data was saved)");
  };
  
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link href="/representatives" className="inline-flex items-center gap-2 text-brand-text-muted hover:text-kenya-gold transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Representatives</span>
      </Link>
      
      <div className="text-center space-y-3 py-6">
        <div className="flex items-center justify-center gap-3">
          <User className="w-10 h-10 text-kenya-gold" />
          <h1 className="text-5xl font-black tracking-tight">Create Campaign Profile</h1>
        </div>
        <p className="text-lg text-brand-text-muted">
          Join Kenya&apos;s digital democracy platform and connect with voters
        </p>
      </div>
      
      <div className="flex items-center justify-center gap-2">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              formStep >= step ? 'bg-kenya-gold text-black' : 'bg-brand-surface-secondary text-brand-text-muted'
            }`}>
              {step}
            </div>
            {step < 4 && <div className={`w-12 h-1 ${formStep > step ? 'bg-kenya-gold' : 'bg-brand-surface-secondary'}`} />}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="bg-brand-surface-secondary border border-border rounded-xl p-8 space-y-8">
        {formStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-brand-text flex items-center gap-2">
              <User className="w-6 h-6 text-kenya-gold" />
              Basic Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-brand-text mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-black border border-border rounded-lg text-white focus:outline-none focus:border-kenya-gold"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-brand-text mb-2">Position Running For *</label>
                  <select
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value as PositionType })}
                    className="w-full px-4 py-3 bg-black border border-border rounded-lg text-white focus:outline-none focus:border-kenya-gold"
                  >
                    <option value="">Select position</option>
                    {positions.map(pos => (
                      <option key={pos} value={pos}>{pos}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-brand-text mb-2">Party Affiliation *</label>
                  <select
                    required
                    value={formData.party}
                    onChange={(e) => setFormData({ ...formData, party: e.target.value as PartyAffiliation })}
                    className="w-full px-4 py-3 bg-black border border-border rounded-lg text-white focus:outline-none focus:border-kenya-gold"
                  >
                    <option value="">Select party</option>
                    {parties.map(party => (
                      <option key={party} value={party}>{party}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-brand-text mb-2">Campaign Slogan *</label>
                <input
                  type="text"
                  required
                  value={formData.slogan}
                  onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                  className="w-full px-4 py-3 bg-black border border-border rounded-lg text-white focus:outline-none focus:border-kenya-gold"
                  placeholder="e.g., Building a Better Future Together"
                />
              </div>
            </div>
            
            <Button type="button" onClick={() => setFormStep(2)} variant="primary" className="w-full">
              Next Step →
            </Button>
          </div>
        )}
        
        {formStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-brand-text flex items-center gap-2">
              <MapPin className="w-6 h-6 text-kenya-gold" />
              Electoral Area
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-brand-text mb-2">County *</label>
                <select
                  required
                  value={formData.county}
                  onChange={(e) => setFormData({ ...formData, county: e.target.value, constituency: "", ward: "" })}
                  className="w-full px-4 py-3 bg-black border border-border rounded-lg text-white focus:outline-none focus:border-kenya-gold"
                >
                  <option value="">Select county</option>
                  {KENYA_COUNTIES.map(county => (
                    <option key={county.id} value={county.id}>{county.name}</option>
                  ))}
                </select>
              </div>
              
              {selectedCounty && formData.position === "MP" && (
                <div>
                  <label className="block text-sm font-semibold text-brand-text mb-2">Constituency *</label>
                  <select
                    required
                    value={formData.constituency}
                    onChange={(e) => setFormData({ ...formData, constituency: e.target.value })}
                    className="w-full px-4 py-3 bg-black border border-border rounded-lg text-white focus:outline-none focus:border-kenya-gold"
                  >
                    <option value="">Select constituency</option>
                    {selectedCounty.constituencies.map(constituency => (
                      <option key={constituency.id} value={constituency.id}>{constituency.name}</option>
                    ))}
                  </select>
                </div>
              )}
              
              {formData.position === "MCA" && formData.constituency && (
                <div>
                  <label className="block text-sm font-semibold text-brand-text mb-2">Ward *</label>
                  <input
                    type="text"
                    required
                    value={formData.ward}
                    onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                    className="w-full px-4 py-3 bg-black border border-border rounded-lg text-white focus:outline-none focus:border-kenya-gold"
                    placeholder="Enter ward name"
                  />
                </div>
              )}
            </div>
            
            <div className="flex gap-4">
              <Button type="button" onClick={() => setFormStep(1)} variant="secondary" className="flex-1">
                ← Previous
              </Button>
              <Button type="button" onClick={() => setFormStep(3)} variant="primary" className="flex-1">
                Next Step →
              </Button>
            </div>
          </div>
        )}
        
        {formStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-brand-text flex items-center gap-2">
              <FileText className="w-6 h-6 text-kenya-gold" />
              Campaign Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-brand-text mb-2">Bio &amp; Background *</label>
                <textarea
                  required
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-black border border-border rounded-lg text-white focus:outline-none focus:border-kenya-gold resize-none"
                  placeholder="Tell voters about yourself, your experience, and qualifications..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-brand-text mb-2">Education</label>
                <input
                  type="text"
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  className="w-full px-4 py-3 bg-black border border-border rounded-lg text-white focus:outline-none focus:border-kenya-gold"
                  placeholder="e.g., University of Nairobi - Bachelor of Law"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-brand-text mb-2">Full Manifesto *</label>
                <textarea
                  required
                  value={formData.manifesto}
                  onChange={(e) => setFormData({ ...formData, manifesto: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 bg-black border border-border rounded-lg text-white focus:outline-none focus:border-kenya-gold resize-none"
                  placeholder="Your complete manifesto and vision for the position..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-brand-text mb-3">Key Agenda (Top 5 Points)</label>
                {[0, 1, 2, 3, 4].map((index) => (
                  <input
                    key={index}
                    type="text"
                    value={formData.keyAgenda[index]}
                    onChange={(e) => updateAgenda(index, e.target.value)}
                    className="w-full px-4 py-3 bg-black border border-border rounded-lg text-white focus:outline-none focus:border-kenya-gold mb-2"
                    placeholder={`Agenda point ${index + 1}`}
                  />
                ))}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-brand-text mb-2">Why Are You Running? *</label>
                <textarea
                  required
                  value={formData.whyRunning}
                  onChange={(e) => setFormData({ ...formData, whyRunning: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-black border border-border rounded-lg text-white focus:outline-none focus:border-kenya-gold resize-none"
                  placeholder="Share your motivation and passion for serving..."
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button type="button" onClick={() => setFormStep(2)} variant="secondary" className="flex-1">
                ← Previous
              </Button>
              <Button type="button" onClick={() => setFormStep(4)} variant="primary" className="flex-1">
                Next Step →
              </Button>
            </div>
          </div>
        )}
        
        {formStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-brand-text flex items-center gap-2">
              <Mail className="w-6 h-6 text-kenya-gold" />
              Contact Information
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-brand-text mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-black border border-border rounded-lg text-white focus:outline-none focus:border-kenya-gold"
                    placeholder="+254 xxx xxx xxx"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-brand-text mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-black border border-border rounded-lg text-white focus:outline-none focus:border-kenya-gold"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-brand-text mb-2">Twitter Handle</label>
                <input
                  type="text"
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  className="w-full px-4 py-3 bg-black border border-border rounded-lg text-white focus:outline-none focus:border-kenya-gold"
                  placeholder="@yourusername"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-brand-text mb-2">Facebook</label>
                <input
                  type="text"
                  value={formData.facebook}
                  onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                  className="w-full px-4 py-3 bg-black border border-border rounded-lg text-white focus:outline-none focus:border-kenya-gold"
                  placeholder="facebook.com/yourpage"
                />
              </div>
            </div>
            
            <div className="bg-kenya-gold/10 border border-kenya-gold/30 rounded-lg p-4">
              <p className="text-sm text-brand-text leading-relaxed">
                <strong>Note:</strong> After submission, your profile will be reviewed before going live. You&apos;ll receive an email confirmation once approved.
              </p>
            </div>
            
            <div className="flex gap-4">
              <Button type="button" onClick={() => setFormStep(3)} variant="secondary" className="flex-1">
                ← Previous
              </Button>
              <Button type="submit" variant="primary" className="flex-1">
                Create Campaign Profile ✓
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
