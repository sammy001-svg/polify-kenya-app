'use client';

import { MOCK_MANIFESTO } from '@/lib/manifesto-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  FileText, 
  AlertTriangle, 
  Clock, 
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function ManifestoDashboard() {
  const manifesto = MOCK_MANIFESTO;

  return (
    <div className="container mx-auto max-w-5xl py-8 px-4 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-border pb-6">
        <div className="flex items-center gap-4">
            <Link href="/campaign" className="p-2 hover:bg-brand-surface-secondary rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5 text-brand-text-muted" />
            </Link>
            <div>
                <h1 className="text-3xl font-black mb-1 flex items-center gap-3">
                    <FileText className="w-8 h-8 text-kenya-green" />
                    Manifesto Builder
                </h1>
                <p className="text-brand-text-muted">
                    Draft a realistic, actionable, and constitutionally aligned manifesto.
                </p>
            </div>
        </div>
        
        <Link href="/campaign/manifesto/builder">
            <Button className="bg-kenya-green hover:bg-kenya-green/90 text-white gap-2">
                <Plus className="w-4 h-4" /> Add Priority Issue
            </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
          {manifesto.map((item) => (
              <Card key={item.id} className="border-border hover:border-kenya-green/50 transition-colors cursor-pointer group">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                       <CardTitle className="text-xl font-bold flex items-center gap-2">
                           {item.issue}
                       </CardTitle>
                       <Badge className={`${
                           item.alignmentScore >= 90 ? 'bg-kenya-green' : 
                           item.alignmentScore >= 70 ? 'bg-kenya-gold' : 'bg-kenya-red'
                       } text-white`}>
                           {item.alignmentScore}% Aligned
                       </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="bg-brand-surface-secondary p-3 rounded-lg">
                               <p className="text-xs font-bold uppercase text-brand-text-muted mb-1">Proposed Solution</p>
                               <p className="text-sm font-medium">{item.solution}</p>
                           </div>
                           <div className="bg-brand-surface-secondary p-3 rounded-lg">
                               <p className="text-xs font-bold uppercase text-brand-text-muted mb-1">Expected Outcome</p>
                               <p className="text-sm font-medium">{item.outcome}</p>
                           </div>
                       </div>
                       
                       <div className="flex items-center gap-4 text-xs font-medium text-brand-text-muted">
                            <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-kenya-orange" />
                                {item.timeline}
                            </span>
                            {item.flags.length > 0 && (
                                <span className="flex items-center gap-1 text-kenya-red">
                                    <AlertTriangle className="w-3 h-3" />
                                    {item.flags.length} Flag(s)
                                </span>
                            )}
                            <span className="ml-auto group-hover:translate-x-1 transition-transform flex items-center text-kenya-green">
                                Edit Details <ChevronRight className="w-4 h-4" />
                            </span>
                       </div>
                  </CardContent>
              </Card>
          ))}

          {manifesto.length === 0 && (
              <div className="text-center py-16 border-2 border-dashed border-border rounded-xl">
                  <FileText className="w-12 h-12 text-brand-text-muted mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-bold mb-2">No Priorities Added Yet</h3>
                  <p className="text-brand-text-muted mb-6">Start building your manifesto by adding your first key issue.</p>
                  <Link href="/campaign/manifesto/builder">
                        <Button variant="outline">Create First Draft</Button>
                  </Link>
              </div>
          )}
      </div>
    </div>
  );
}
