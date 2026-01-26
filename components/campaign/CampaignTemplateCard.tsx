'use client';

import { CampaignTemplate } from '@/lib/campaign-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Target } from 'lucide-react';

interface CampaignTemplateCardProps {
  template: CampaignTemplate;
  onSelect: () => void;
  isSelected?: boolean;
}

export function CampaignTemplateCard({ template, onSelect, isSelected }: CampaignTemplateCardProps) {
  const Icon = template.icon;

  return (
    <Card 
      className={`relative cursor-pointer transition-all hover:scale-[1.02] ${
        isSelected ? 'border-kenya-green ring-2 ring-kenya-green/20' : 'border-border hover:border-kenya-green/50'
      }`}
      onClick={onSelect}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Icon className="w-5 h-5 text-kenya-red" />
              {template.title}
            </CardTitle>
            <CardDescription>{template.description}</CardDescription>
          </div>
          {isSelected && <Badge className="bg-kenya-green text-white">Selected</Badge>}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mandate Preview - Show first 2 */}
        <div>
            <h4 className="text-xs font-bold uppercase text-brand-text-muted mb-2 flex items-center gap-1">
                <BookOpen className="w-3 h-3" /> Constitutional Mandate
            </h4>
            <ul className="space-y-1 text-sm">
                {template.mandate.slice(0, 2).map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                        <span className="text-kenya-green">•</span>
                        {item}
                    </li>
                ))}
            </ul>
        </div>

        {/* Focus Areas Preview */}
        <div>
            <h4 className="text-xs font-bold uppercase text-brand-text-muted mb-2 flex items-center gap-1">
                <Target className="w-3 h-3" /> Key Focus
            </h4>
             <div className="flex flex-wrap gap-2">
                {template.keyFocusAreas.slice(0, 3).map((area, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded bg-brand-surface-secondary border border-border">
                        {area}
                    </span>
                ))}
             </div>
        </div>
      </CardContent>
    </Card>
  );
}
