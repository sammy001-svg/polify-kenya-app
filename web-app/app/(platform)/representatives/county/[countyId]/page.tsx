"use client";

import { use } from "react";
import { SAMPLE_POLITICIANS, getCountyById, KENYA_COUNTIES } from "@/lib/representatives";
import { PoliticianCard } from "@/components/representatives/PoliticianCard";
import { notFound } from "next/navigation";
import { MapPin, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CountyRepresentativesPage({ params }: { params: Promise<{ countyId: string }> }) {
  const { countyId } = use(params);
  const county = getCountyById(countyId);
  
  if (!county) {
    notFound();
  }
  
  // Get all representatives for this county
  const countyPoliticians = SAMPLE_POLITICIANS.filter(p => p.county === countyId);
  
  // Group by position
  const governor = countyPoliticians.find(p => p.position === 'Governor');
  const senator = countyPoliticians.find(p => p.position === 'Senator');
  const womanRep = countyPoliticians.find(p => p.position === 'Woman Rep');
  const mps = countyPoliticians.filter(p => p.position === 'MP');
  const mcas = countyPoliticians.filter(p => p.position === 'MCA');
  
  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link href="/representatives" className="inline-flex items-center gap-2 text-brand-text-muted hover:text-kenya-gold transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Counties</span>
      </Link>
      
      {/* Header */}
      <div className="text-center space-y-3 py-6">
        <div className="flex items-center justify-center gap-3">
          <MapPin className="w-10 h-10 text-kenya-gold" />
          <h1 className="text-5xl font-black tracking-tight">{county.name} County</h1>
        </div>
        <p className="text-lg text-brand-text-muted">
          Capital: {county.capital} • County Code: {county.code} • {county.constituencies.length} Constituencies
        </p>
      </div>
      
      {/* Stats Banner */}
      <div className="bg-brand-surface-secondary border border-border rounded-xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-kenya-red">{governor ? 1 : 0}</p>
            <p className="text-sm text-brand-text-muted mt-1">Governor</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-kenya-red">{senator ? 1 : 0}</p>
            <p className="text-sm text-brand-text-muted mt-1">Senator</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-kenya-gold">{womanRep ? 1 : 0}</p>
            <p className="text-sm text-brand-text-muted mt-1">Woman Rep</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-kenya-gold">{mps.length}</p>
            <p className="text-sm text-brand-text-muted mt-1">MPs</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-kenya-green">{mcas.length}</p>
            <p className="text-sm text-brand-text-muted mt-1">MCAs</p>
          </div>
        </div>
      </div>
      
      {/* County Leadership */}
      {(governor || senator || womanRep) && (
        <div>
          <h2 className="text-3xl font-bold text-brand-text mb-6">County Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {governor && <PoliticianCard politician={governor} />}
            {senator && <PoliticianCard politician={senator} />}
            {womanRep && <PoliticianCard politician={womanRep} />}
          </div>
        </div>
      )}
      
      {/* MPs by Constituency */}
      {mps.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold text-brand-text mb-6">
            Members of Parliament ({mps.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mps.map(mp => (
              <PoliticianCard key={mp.id} politician={mp} />
            ))}
          </div>
        </div>
      )}
      
      {/* MCAs */}
      {mcas.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold text-brand-text mb-6">
            Members of County Assembly ({mcas.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mcas.map(mca => (
              <PoliticianCard key={mca.id} politician={mca} />
            ))}
          </div>
        </div>
      )}
      
      {/* Empty State */}
      {countyPoliticians.length === 0 && (
        <div className="text-center py-16">
          <Users className="w-16 h-16 text-brand-text-muted mx-auto mb-4 opacity-50" />
          <p className="text-brand-text-muted mb-2">No representatives found</p>
          <p className="text-sm text-brand-text-muted">
            Representative data for {county.name} County is not yet available.
          </p>
        </div>
      )}
      
      {/* Constituencies List */}
      <div className="bg-brand-surface-secondary border border-border rounded-xl p-6">
        <h2 className="text-2xl font-bold text-brand-text mb-4">
          Constituencies in {county.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {county.constituencies.map((constituency, index) => (
            <div key={constituency.id} className="flex items-center gap-3 p-3 bg-brand-surface-highlight rounded-lg">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-kenya-gold text-black font-bold text-sm">
                {index + 1}
              </span>
              <span className="text-brand-text font-medium">{constituency.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Explore Other Counties */}
      <div className="bg-linear-to-r from-kenya-red/10 to-kenya-gold/10 border border-kenya-gold/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-brand-text mb-4">Explore Other Counties</h3>
        <div className="flex flex-wrap gap-2">
          {KENYA_COUNTIES.filter(c => c.id !== countyId).slice(0, 10).map(c => (
            <Link
              key={c.id}
              href={`/representatives/county/${c.id}`}
              className="px-4 py-2 bg-brand-surface-secondary border border-border rounded-lg text-brand-text hover:border-kenya-gold hover:text-kenya-gold transition-colors"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
