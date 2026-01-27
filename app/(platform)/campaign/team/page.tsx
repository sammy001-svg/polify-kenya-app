'use client';

import { useState } from 'react';
import { MOCK_TEAM, MOCK_ACTIVITY_LOGS } from '@/lib/campaign-team';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Users, 
  UserPlus, 
  History, 
  Shield, 
  MoreHorizontal, 
  Mail,
  CheckCircle2,
  Clock,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
// Note: Select components replaced with mock data display for simplicity.

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState('roster');
  
  return (
    <div className="container mx-auto max-w-6xl py-8 px-4 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-border pb-6">
        <Link href="/campaign" className="p-2 hover:bg-brand-surface-secondary rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-brand-text-muted" />
        </Link>
        <div>
          <h1 className="text-3xl font-black mb-1 flex items-center gap-3">
             <Users className="w-8 h-8 text-kenya-green" />
             Team Management
          </h1>
          <p className="text-brand-text-muted">
            Manage roles, permissions, and track team accountability.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
            
            <div className="flex items-center justify-between">
                <div className="flex gap-2">
                    <Button 
                        variant={activeTab === 'roster' ? 'primary' : 'outline'} 
                        onClick={() => setActiveTab('roster')}
                        className={activeTab === 'roster' ? 'bg-kenya-green hover:bg-kenya-green/90' : ''}
                    >
                        <Users className="w-4 h-4 mr-2" /> Team Roster
                    </Button>
                    <Button 
                        variant={activeTab === 'logs' ? 'primary' : 'outline'} 
                        onClick={() => setActiveTab('logs')}
                        className={activeTab === 'logs' ? 'bg-kenya-orange hover:bg-kenya-orange/90' : ''}
                    >
                        <History className="w-4 h-4 mr-2" /> Activity Logs
                    </Button>
                </div>
                <Button className="bg-brand-highlight hover:bg-brand-highlight/80 text-white">
                    <UserPlus className="w-4 h-4 mr-2" /> Invite Member
                </Button>
            </div>

            {activeTab === 'roster' && (
                <div className="grid gap-4">
                    {MOCK_TEAM.map((member) => (
                        <Card key={member.id} className="border-border hover:border-brand-text-muted transition-colors">
                            <CardContent className="p-6 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-brand-surface-secondary flex items-center justify-center text-lg font-bold">
                                        {member.name[0]}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{member.name}</h3>
                                        <div className="flex items-center gap-2 text-sm text-brand-text-muted">
                                            <Mail className="w-3 h-3" /> {member.email}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-6">
                                    <div className="hidden md:block text-right">
                                        <div className="text-xs font-bold uppercase text-brand-text-muted mb-1">Role</div>
                                        <Badge variant="outline" className="border-brand-text-muted">
                                            {member.role}
                                        </Badge>
                                    </div>
                                    <div className="hidden md:block text-right">
                                        <div className="text-xs font-bold uppercase text-brand-text-muted mb-1">Status</div>
                                         <span className={`flex items-center gap-1 text-sm font-medium ${
                                             member.status === 'active' ? 'text-kenya-green' : 'text-kenya-orange'
                                         }`}>
                                             {member.status === 'active' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                             {member.status === 'active' ? 'Active' : 'Pending'}
                                         </span>
                                    </div>
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {activeTab === 'logs' && (
                <Card className="border-border">
                    <CardHeader>
                        <CardTitle className="text-lg">Audit Trail</CardTitle>
                        <CardDescription>Track every action taken by your campaign team.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-border">
                            {MOCK_ACTIVITY_LOGS.map((log) => (
                                <div key={log.id} className="p-4 flex items-start gap-4 hover:bg-brand-surface-secondary/30 transition-colors">
                                    <div className="mt-1">
                                        <History className="w-4 h-4 text-brand-text-muted" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <p className="font-medium text-brand-text">
                                                <span className="font-bold">{log.userName}</span> 
                                                <span className="text-brand-text-muted font-normal"> ({log.role}) </span>
                                                <span className="text-kenya-green">{log.action}</span>
                                            </p>
                                            <span className="text-xs text-brand-text-muted">
                                                {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <p className="text-sm text-brand-text-muted">{log.details}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>

        {/* Sidebar Info */}
        <div className="w-full lg:w-80 space-y-6">
            <Card className="border-border bg-brand-surface-highlight">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-kenya-red" /> Role Permissions
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <h4 className="font-bold text-sm">Content Manager</h4>
                        <p className="text-xs text-brand-text-muted">
                            Can create, edit, and schedule social media posts. Cannot delete high-impact content without approval.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-bold text-sm">Policy Advisor</h4>
                        <p className="text-xs text-brand-text-muted">
                            Access to manifesto drafting tools and policy research data. Read-only social media access.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-bold text-sm">Comms Officer</h4>
                        <p className="text-xs text-brand-text-muted">
                            Restricted to engagement analytics and reporting. No posting rights.
                        </p>
                    </div>
                </CardContent>
            </Card>

            <div className="p-4 rounded-xl bg-brand-surface border border-dashed border-border text-center">
                 <p className="text-sm text-brand-text-muted">
                     Need to export logs for IEBC compliance?
                 </p>
                 <Button variant="ghost" className="text-kenya-green hover:bg-transparent hover:underline p-0 h-auto">
                     Download Compliance Report
                 </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
