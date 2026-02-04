"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Search } from 'lucide-react';
import { mockRegistrationCentres } from '@/data/iebc-data';
import { Input } from '@/components/ui/input';

export function RegistrationCentres() {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredCentres = mockRegistrationCentres.filter(centre => 
    centre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    centre.constituency.toLowerCase().includes(searchTerm.toLowerCase()) ||
    centre.county.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="bg-brand-surface border-white/5 h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Voter Registration Centres</CardTitle>
                <CardDescription>Find a centre near you to register or verify details.</CardDescription>
            </div>
            <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Search by name, constituency..." 
                    className="pl-8 bg-black/20 border-white/10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredCentres.map((centre) => (
            <div key={centre.id} className="flex items-start justify-between p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-kenya-red/10 p-2 rounded-full">
                    <MapPin className="h-4 w-4 text-kenya-red" />
                </div>
                <div>
                  <h4 className="font-semibold text-brand-text">{centre.name}</h4>
                  <div className="text-xs text-brand-text-muted flex items-center gap-2 mt-1">
                    <span>{centre.county} County</span>
                    <span>•</span>
                    <span>{centre.constituency}</span>
                    <span>•</span>
                    <span>{centre.ward}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                 <Badge variant={centre.status === 'Open' ? 'default' : 'secondary'} className={centre.status === 'Open' ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' : ''}>
                    {centre.status}
                 </Badge>
                 <span className="text-[10px] text-brand-text-muted">{centre.openingHours}</span>
              </div>
            </div>
          ))}
          {filteredCentres.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                  No centres found matching your search.
              </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
