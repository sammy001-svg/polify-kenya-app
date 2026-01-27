'use client';

import { useState } from 'react';
import { MOCK_VOTERS } from '@/lib/analytics-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Phone, 
  Mail
} from 'lucide-react';
import Link from 'next/link';

export default function VoterRegistryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter] = useState('All');
  
  const voters = MOCK_VOTERS.filter(v => 
      (filter === 'All' || v.supportStatus === filter || v.ward === filter) &&
      (v.name.toLowerCase().includes(searchTerm.toLowerCase()) || v.ward.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4 space-y-6">
       {/* Header */}
       <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-border pb-6">
             <div className="flex items-center gap-4">
                <Link href="/campaign/analytics" className="p-2 hover:bg-brand-surface-secondary rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-brand-text-muted" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold">Voter Registry</h1>
                    <p className="text-sm text-brand-text-muted">Manage your constituent database.</p>
                </div>
            </div>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted" />
                    <Input 
                        placeholder="Search by name or ward..." 
                        className="pl-9 w-full md:w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button variant="outline" className="gap-2">
                    <Filter className="w-4 h-4" /> Filter
                </Button>
            </div>
        </div>

        <Card className="border-border">
            <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm text-left">
                    <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Name</th>
                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Ward</th>
                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Demographics</th>
                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Last Contact</th>
                            <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                        {voters.map((voter) => (
                            <tr key={voter.id} className="border-b transition-colors hover:bg-brand-surface-secondary/50">
                                <td className="p-4 align-middle font-medium">
                                    <div className="flex flex-col">
                                        <span>{voter.name}</span>
                                        <div className="flex gap-1 mt-1">
                                            {voter.tags.map(tag => (
                                                <Badge key={tag} variant="outline" className="text-[10px] px-1 py-0 h-4 border-brand-text-muted text-brand-text-muted">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 align-middle">{voter.ward}</td>
                                <td className="p-4 align-middle text-brand-text-muted">{voter.age} • {voter.gender}</td>
                                <td className="p-4 align-middle">
                                    <Badge className={`${
                                        voter.supportStatus === 'Strong Supporter' ? 'bg-kenya-green' :
                                        voter.supportStatus === 'Leaning' ? 'bg-kenya-green/70' :
                                        voter.supportStatus === 'Undecided' ? 'bg-kenya-orange' :
                                        'bg-kenya-red'
                                    } text-white hover:bg-opacity-90`}>
                                        {voter.supportStatus}
                                    </Badge>
                                </td>
                                <td className="p-4 align-middle text-right text-brand-text-muted">
                                    {voter.lastContactDate}
                                </td>
                                <td className="p-4 align-middle text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button size="icon" variant="ghost" className="h-8 w-8">
                                            <Phone className="w-4 h-4 text-brand-text-muted" />
                                        </Button>
                                        <Button size="icon" variant="ghost" className="h-8 w-8">
                                            <Mail className="w-4 h-4 text-brand-text-muted" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {voters.length === 0 && (
                     <div className="p-8 text-center text-brand-text-muted">
                         No voters found matching your search.
                     </div>
                )}
            </div>
        </Card>
    </div>
  );
}
