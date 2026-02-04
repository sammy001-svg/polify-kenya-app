import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, MapPin, ChevronRight } from 'lucide-react';
import type { SocietyGroup } from '@/data/societies-data';

import { JoinGroupDialog } from './JoinGroupDialog';

interface GroupCardProps {
  group: SocietyGroup;
}

export function GroupCard({ group }: GroupCardProps) {
  const [showJoinDialog, setShowJoinDialog] = React.useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Youth': return 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20';
      case 'Women': return 'bg-pink-500/10 text-pink-500 hover:bg-pink-500/20';
      case 'Disability': return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
      case 'Business': return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
      case 'Environmental': return 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20';
      default: return 'bg-brand-primary/10 text-brand-text-muted';
    }
  };

  return (
    <>
      <Card 
        className="bg-brand-surface border-white/5 hover:border-white/10 transition-all duration-300 group cursor-pointer overflow-hidden relative"
        onClick={() => setShowJoinDialog(true)}
      >
        <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight className="w-5 h-5 text-brand-text-muted" />
        </div>
        
        <CardContent className="p-5 space-y-4">
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <Badge variant="secondary" className={`border-none ${getCategoryColor(group.category)}`}>
                {group.category}
              </Badge>
              <span className="text-xs text-brand-text-muted font-medium uppercase tracking-wider">
                {group.level}
              </span>
            </div>
            <h3 className="font-bold text-lg text-brand-text group-hover:text-kenya-red transition-colors line-clamp-1">
              {group.name}
            </h3>
          </div>

          <p className="text-sm text-brand-text-muted line-clamp-2 min-h-[40px]">
            {group.description}
          </p>

          <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-2 text-xs text-brand-text-muted">
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5" />
              <span>{group.membersCount.toLocaleString()} Members</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              <span className="truncate">
                {group.level === 'National' 
                  ? 'Kenya wide' 
                  : `${group.county || ''} ${group.constituency ? '• ' + group.constituency : ''}`}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <JoinGroupDialog 
        group={group} 
        open={showJoinDialog} 
        onOpenChange={setShowJoinDialog} 
      />
    </>
  );
}
