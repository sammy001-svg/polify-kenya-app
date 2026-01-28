'use client';

import { useState } from 'react';
import { MOCK_COMMITMENTS, Commitment, CATEGORIES } from '@/lib/commitments';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Lock, 
  Unlock, 
  Plus, 
  Trash2, 
  Target, 
  Calendar, 
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

export default function CommitmentsPage() {
  const [commitments, setCommitments] = useState<Commitment[]>(MOCK_COMMITMENTS);
  const [isLocked, setIsLocked] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // New Commitment State
  const [newCommitment, setNewCommitment] = useState<Partial<Commitment>>({
      title: '',
      description: '',
      successIndicator: '',
      timeline: '',
      category: 'Infrastructure',
      status: 'Draft'
  });

  const handleAdd = () => {
    if (!newCommitment.title || !newCommitment.successIndicator) return;
    
    const commitment: Commitment = {
        id: Date.now().toString(),
        title: newCommitment.title!,
        description: newCommitment.description || '',
        successIndicator: newCommitment.successIndicator!,
        timeline: newCommitment.timeline || 'End of Term',
        status: 'Draft',
        category: (newCommitment.category as Commitment['category']) || 'Infrastructure',
        progress: 0
    };
    
    setCommitments([...commitments, commitment]);
    setShowAddForm(false);
    setNewCommitment({
        title: '',
        description: '',
        successIndicator: '',
        timeline: '',
        category: 'Infrastructure',
        status: 'Draft'
    });
  };

  const handleDelete = (id: string) => {
      setCommitments(commitments.filter(c => c.id !== id));
  };

  const handleLock = () => {
      // Simulate locking process
      if (confirm('Are you sure? Locking your commitments signals to voters that these are your final promises for the election. This action cannot be undone.')) {
          setIsLocked(true);
          setCommitments(commitments.map(c => ({ ...c, status: 'Locked' })));
      }
  };

  return (
    <div className="container mx-auto max-w-5xl py-8 px-4 space-y-8">
       {/* Header */}
       <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-border pb-6">
             <div className="flex items-center gap-4">
                <Link href="/campaign" className="p-2 hover:bg-brand-surface-secondary rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-brand-text-muted" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Target className="w-8 h-8 text-kenya-red" />
                        {isLocked ? 'Public Accountability Dashboard' : 'Commitment Tracker'}
                    </h1>
                    <p className="text-sm text-brand-text-muted">
                        {isLocked 
                            ? 'These commitments are locked and public. Updates track your progress.' 
                            : 'Define your "Top 10" promises. Be specific and measurable.'}
                    </p>
                </div>
            </div>
            
            {!isLocked && (
                <div className="flex gap-3">
                   <Button variant="outline" className="text-kenya-red hover:bg-kenya-red/10 border-kenya-red/30 gap-2" onClick={handleLock}>
                       <Lock className="w-4 h-4" /> Lock for Election
                   </Button>
                   <Button 
                       className="bg-kenya-green hover:bg-kenya-green/90 text-white gap-2" 
                       onClick={() => setShowAddForm(true)}
                       disabled={commitments.length >= 10}
                    >
                       <Plus className="w-4 h-4" /> Add Commitment ({commitments.length}/10)
                   </Button>
                </div>
            )}
        </div>

        {/* Locked View Warning */}
        {isLocked && (
            <div className="bg-brand-surface border border-kenya-green p-4 rounded-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-kenya-green/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-kenya-green" />
                </div>
                <div>
                    <h3 className="font-bold">Commitments Locked</h3>
                    <p className="text-sm text-brand-text-muted">Your pledges are now part of the permanent public record.</p>
                </div>
            </div>
        )}

        {/* Add Form */}
        {showAddForm && !isLocked && (
            <Card className="border-kenya-green/50 animate-in fade-in slide-in-from-top-4">
                <CardHeader>
                    <CardTitle>New Commitment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Title</label>
                            <Input 
                                placeholder="Commitment Title" 
                                value={newCommitment.title}
                                onChange={(e) => setNewCommitment({...newCommitment, title: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Category</label>
                            <select 
                                className="flex h-10 w-full rounded-md border border-border bg-brand-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                value={newCommitment.category}
                                onChange={(e) => setNewCommitment({...newCommitment, category: e.target.value as Commitment['category']})}
                            >
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-bold">Description</label>
                        <Textarea 
                            placeholder="Briefly describe what you intend to do." 
                            value={newCommitment.description}
                            onChange={(e) => setNewCommitment({...newCommitment, description: e.target.value})}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-kenya-green">Success Indicator (Measurable)</label>
                            <Input 
                                placeholder="e.g., 50km road, 3 health centers..." 
                                className="border-kenya-green/30 focus-visible:ring-kenya-green/30"
                                value={newCommitment.successIndicator}
                                onChange={(e) => setNewCommitment({...newCommitment, successIndicator: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Timeline</label>
                            <Input 
                                placeholder="e.g., First 100 Days, By 2027" 
                                value={newCommitment.timeline}
                                onChange={(e) => setNewCommitment({...newCommitment, timeline: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button variant="ghost" onClick={() => setShowAddForm(false)}>Cancel</Button>
                        <Button className="bg-kenya-green text-white" onClick={handleAdd}>Save Commitment</Button>
                    </div>
                </CardContent>
            </Card>
        )}

        {/* List */}
        <div className="grid grid-cols-1 gap-4">
            {commitments.map((commitment) => (
                <Card key={commitment.id} className={`border-border transition-all ${isLocked ? 'hover:border-kenya-green/50' : 'hover:border-kenya-red/30'}`}>
                    <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-xs uppercase tracking-wider">{commitment.category}</Badge>
                                <span className={`flex items-center gap-1 text-xs font-bold ${isLocked ? 'text-kenya-green' : 'text-brand-text-muted'}`}>
                                    {isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                                    {commitment.status}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold">{commitment.title}</h3>
                            <p className="text-brand-text-muted">{commitment.description}</p>
                            
                            <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-border border-dashed">
                                <div className="flex items-center gap-2 text-sm">
                                    <Target className="w-4 h-4 text-kenya-green" />
                                    <span className="font-bold text-brand-text">Target:</span> {commitment.successIndicator}
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="w-4 h-4 text-kenya-orange" />
                                    <span className="font-bold text-brand-text">By:</span> {commitment.timeline}
                                </div>
                            </div>
                        </div>

                        {!isLocked && (
                            <div>
                                <Button variant="ghost" className="text-kenya-red hover:bg-kenya-red/10 hover:text-kenya-red" onClick={() => handleDelete(commitment.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        )}

                        {isLocked && (
                             <div className="w-full md:w-48">
                                 <div className="flex items-center justify-between text-xs mb-1">
                                     <span className="font-bold">Progress</span>
                                     <span>{commitment.progress}%</span>
                                 </div>
                                 <div className="h-2 w-full bg-brand-surface-secondary rounded-full overflow-hidden">
                                     <div className="h-full bg-kenya-green" style={{ width: `${commitment.progress}%` }} />
                                 </div>
                             </div>
                        )}
                    </CardContent>
                </Card>
            ))}

            {commitments.length === 0 && !showAddForm && (
                <div className="text-center py-12 border-2 border-dashed border-border rounded-xl">
                    <p className="text-brand-text-muted">No commitments yet. Start by defining your promises.</p>
                </div>
            )}
        </div>
    </div>
  );
}
