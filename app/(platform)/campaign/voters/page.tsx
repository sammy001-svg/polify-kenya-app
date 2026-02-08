'use client';

import { useState } from 'react';
import { MOCK_VOTERS } from '@/lib/analytics-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Search, 
  Phone, 
  Mail,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { sendSmsBroadcast } from '@/actions/campaign/send-sms';

export default function VoterRegistryPage() {
  const [view, setView] = useState<'list' | 'map'>('list');
  const [showBroadcast, setShowBroadcast] = useState(false);
  const [broadcastMsg, setBroadcastMsg] = useState('My fellow citizens, please attend our rally this Saturday at Market Grounds.');
  const [isSending, setIsSending] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filter] = useState('All'); // Kept simple for now, can expand later

  const voters = MOCK_VOTERS.filter(v => 
      (filter === 'All' || v.supportStatus === filter || v.ward === filter) &&
      (v.name.toLowerCase().includes(searchTerm.toLowerCase()) || v.ward.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleBroadcast = async () => {
    if (!broadcastMsg.trim()) {
        alert("Please enter a message.");
        return;
    }

    setIsSending(true);
    
    try {
        // Use actual phone numbers from the filtered voters list
        const recipients = voters.map(v => v.phone);
        
        console.log("Sending broadcast to", recipients.length, "recipients:", recipients.join(','));

        const result = await sendSmsBroadcast({
            message: broadcastMsg,
            recipients: recipients
        });

        if (result.success) {
             const cost = voters.length * 1.5; // Est cost
             alert(`📢 BROADCAST SENT SUCCESSFULLY!\n\nTarget: ${voters.length} Residents\nEst. Cost: KES ${cost.toLocaleString()}\nMessage: "${broadcastMsg}"`);
             setShowBroadcast(false);
        } else {
             alert(`❌ Failed to send broadcast: ${result.error}`);
        }

    } catch (error) {
        console.error("Broadcast failed", error);
        alert("An unexpected error occurred while sending the broadcast.");
    } finally {
        setIsSending(false);
    }
  };

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
                <Button 
                    variant={view === 'list' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setView('list')}
                >
                    List
                </Button>
                <Button 
                    variant={view === 'map' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setView('map')}
                >
                    Map View
                </Button>
                
                <div className="w-px h-6 bg-border mx-2" />

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted" />
                    <Input 
                        placeholder="Search by name or ward..." 
                        className="pl-9 w-full md:w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button 
                    className="gap-2 bg-kenya-green hover:bg-kenya-green/90 text-white"
                    onClick={() => setShowBroadcast(true)}
                >
                    <Mail className="w-4 h-4" /> SMS Broadcast
                </Button>
            </div>
        </div>

        {/* Broadcast Modal */}
        {showBroadcast && (
            <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <Card className="w-full max-w-lg bg-brand-surface border-border">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                             <Phone className="w-5 h-5 text-kenya-green" /> New Voice/SMS Broadcast
                        </CardTitle>
                        <CardDescription>Send an instant message to your voter list.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-3 bg-brand-surface-secondary rounded-lg text-sm border border-border">
                             <div className="flex justify-between mb-1">
                                 <span className="text-brand-text-muted">Target Audience:</span>
                                 <span className="font-bold text-white">{voters.length} Voters</span>
                             </div>
                             <div className="flex justify-between">
                                 <span className="text-brand-text-muted">Estimated Cost:</span>
                                 <span className="font-bold text-kenya-red">KES {(voters.length * 1.5).toLocaleString()}</span>
                             </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-brand-text-muted">Message</label>
                            <textarea
                                className="w-full h-32 bg-black/20 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-brand-primary"
                                value={broadcastMsg}
                                onChange={(e) => setBroadcastMsg(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <Button variant="ghost" onClick={() => setShowBroadcast(false)} disabled={isSending}>Cancel</Button>
                            <Button onClick={handleBroadcast} className="bg-kenya-green text-white" disabled={isSending}>
                                {isSending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...
                                    </>
                                ) : (
                                    "Send Broadcast"
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )}

        {view === 'list' ? (
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
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
                {/* Visual Map Simulator */}
                <Card className="border-border bg-brand-surface-secondary/20 h-full p-4 flex flex-col items-center justify-center relative overflow-hidden group">
                     {/* Decorative Background Map Grid */}
                     <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-20">
                         {Array.from({ length: 36 }).map((_, i) => (
                             <div key={i} className={`border border-white/5 ${i % 3 === 0 ? 'bg-green-500/10' : i % 5 === 0 ? 'bg-red-500/10' : ''}`} />
                         ))}
                     </div>
                     
                     <div className="relative z-10 grid grid-cols-2 gap-4 w-full max-w-lg">
                        {['Central Ward', 'Westlands', 'Market District', 'Industrial Area'].map((ward) => {
                            const wardVoters = voters.filter(v => v.ward === ward);
                            const percentSupport = (wardVoters.filter(v => v.supportStatus.includes('Supporter')).length / (wardVoters.length || 1)) * 100;
                            
                            return (
                                <div key={ward} className="bg-brand-surface border border-border p-4 rounded-xl hover:border-brand-primary transition-colors cursor-pointer group/ward">
                                    <h3 className="font-bold text-sm mb-2">{ward}</h3>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex-1 h-2 bg-brand-surface-secondary rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full ${percentSupport > 50 ? 'bg-kenya-green' : 'bg-kenya-red'}`} 
                                                style={{ width: `${percentSupport}%` }} 
                                            />
                                        </div>
                                        <span className="text-xs font-bold">{percentSupport.toFixed(0)}%</span>
                                    </div>
                                    <p className="text-xs text-brand-text-muted">{wardVoters.length} Registered Voters</p>
                                    
                                    {/* Heatmap Dots Simulator */}
                                    <div className="mt-3 flex flex-wrap gap-1 opacity-50">
                                        {wardVoters.slice(0, 15).map(v => (
                                            <div 
                                                key={v.id} 
                                                className={`w-1.5 h-1.5 rounded-full ${v.supportStatus.includes('Supporter') ? 'bg-kenya-green' : 'bg-kenya-red'}`}
                                            />
                                        ))}
                                        {wardVoters.length > 15 && <span className="text-[9px] text-brand-text-muted">+</span>}
                                    </div>
                                </div>
                            );
                        })}
                     </div>
                     
                     <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md px-3 py-2 rounded-lg text-xs border border-white/10">
                         <div className="flex items-center gap-2 mb-1">
                             <span className="w-2 h-2 rounded-full bg-kenya-green" /> Stronghold ({'>'}50%)
                         </div>
                         <div className="flex items-center gap-2">
                             <span className="w-2 h-2 rounded-full bg-kenya-red" /> Battleground ({'<'}50%)
                         </div>
                     </div>
                </Card>

                {/* Ward Analytics Details */}
                <Card className="border-border p-4 h-full overflow-auto">
                    <CardHeader>
                        <CardTitle className="text-sm uppercase tracking-wider text-brand-text-muted">Territory Intelligence</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="p-4 rounded-xl bg-brand-surface-secondary border border-border">
                             <h4 className="font-bold text-lg mb-1">Westlands Battleground</h4>
                             <p className="text-sm text-brand-text-muted mb-3">
                                 Opposition is investing heavily here. Key issue is **Water Shortage**.
                             </p>
                             <Button size="sm" className="w-full bg-kenya-red text-white">View Strategy Guide</Button>
                        </div>
                        
                        <div className="space-y-4">
                            <h4 className="font-bold text-sm">Recommended Actions</h4>
                             {['Schedule Town Hall in Westlands', 'Deploy Door-to-Door Team in Industrial Area', 'Send SMS Blast to Undecided Voters'].map((action, i) => (
                                 <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                                     <div className="w-6 h-6 rounded-full border border-dashed border-brand-text-muted flex items-center justify-center text-xs">
                                         {i + 1}
                                     </div>
                                     <span className="text-sm">{action}</span>
                                 </div>
                             ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        )}
    </div>
  );
}
