"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';
import { GroupCard } from './GroupCard';
import { mockSocieties } from '@/data/societies-data';

export function SocietiesList() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = React.useState<string | null>(null);

  const categories = Array.from(new Set(mockSocieties.map(s => s.category)));

  const filteredSocieties = mockSocieties.filter(society => {
    const matchesSearch = society.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? society.category === selectedCategory : true;
    const matchesLevel = selectedLevel ? society.level === selectedLevel : true;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setSelectedLevel(null);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 p-4 rounded-xl bg-brand-surface border border-white/5 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted" />
          <Input 
            placeholder="Search groups by name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-black/20 border-white/10 focus-visible:ring-brand-primary/50"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
           {/* Category Filters */}
           <div className="flex gap-1 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
             {categories.map(cat => (
               <Button
                 key={cat}
                 variant={selectedCategory === cat ? 'secondary' : 'outline'}
                 size="sm"
                 onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                 className={`border-white/10 ${selectedCategory === cat ? 'bg-brand-primary text-white' : 'hover:bg-brand-primary/10 hover:text-brand-primary hover:border-brand-primary/30'}`}
               >
                 {cat}
               </Button>
             ))}
           </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex items-center justify-between text-xs text-brand-text-muted px-1">
        <span>Showing {filteredSocieties.length} result{filteredSocieties.length !== 1 ? 's' : ''}</span>
        {(selectedCategory || selectedLevel || searchTerm) && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-auto p-0 hover:bg-transparent hover:text-white">
                <X className="w-3 h-3 mr-1" />
                Clear Filters
            </Button>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSocieties.map(society => (
          <GroupCard key={society.id} group={society} />
        ))}
      </div>

      {filteredSocieties.length === 0 && (
        <div className="text-center py-20 bg-brand-surface/30 rounded-xl border border-dashed border-white/10">
          <Filter className="w-10 h-10 text-brand-text-muted mx-auto mb-3 opacity-20" />
          <h3 className="text-brand-text font-medium mb-1">No groups found</h3>
          <p className="text-brand-text-muted text-sm">Try adjusting your search or filters</p>
          <Button variant="link" onClick={clearFilters} className="text-brand-primary mt-2">
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
