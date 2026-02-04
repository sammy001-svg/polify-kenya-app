"use client";

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Users, MapPin, Mail, Phone, CheckCircle2 } from 'lucide-react';
import type { SocietyGroup } from '@/data/societies-data';
import { toast } from '@/components/ui/use-toast';

interface JoinGroupDialogProps {
  group: SocietyGroup;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JoinGroupDialog({ group, open, onOpenChange }: JoinGroupDialogProps) {
  const [step, setStep] = React.useState<'details' | 'form' | 'success'>('details');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Form State
  const [formData, setFormData] = React.useState({
    fullName: '',
    idNumber: '',
    phone: '',
    reason: '',
    termsAccepted: false
  });

  const handleRegister = () => {
    setStep('form');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setStep('success');
    toast({
      title: "Application Submitted",
      description: `Your application to join ${group.name} has been received.`
    });
  };

  const resetDialog = () => {
    onOpenChange(false);
    setTimeout(() => {
        setStep('details');
        setFormData({ fullName: '', idNumber: '', phone: '', reason: '', termsAccepted: false });
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-brand-surface border-white/10 max-w-md md:max-w-xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        
        {step !== 'success' && (
            <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
                Join {group.name}
                <Badge variant="secondary" className="text-xs font-normal border-none bg-white/10 text-brand-text-muted">
                    {group.category}
                </Badge>
            </DialogTitle>
            <DialogDescription>
                {step === 'details' ? 'Review group details before applying.' : 'Complete the registration form.'}
            </DialogDescription>
            </DialogHeader>
        )}

        <div className="flex-1 overflow-y-auto p-6 pt-2">
            
            {step === 'details' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                    <div className="space-y-4 text-sm text-brand-text-muted">
                        <p className="leading-relaxed">{group.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 bg-black/20 p-4 rounded-xl border border-white/5">
                            <div className="flex flex-col gap-1">
                                <span className="text-xs uppercase tracking-wider text-white/50">Level</span>
                                <span className="font-medium text-white flex items-center gap-2">
                                    <MapPin className="w-3 h-3 text-kenya-red" />
                                    {group.level}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs uppercase tracking-wider text-white/50">Membership</span>
                                <span className="font-medium text-white flex items-center gap-2">
                                    <Users className="w-3 h-3 text-kenya-green" />
                                    {group.membersCount.toLocaleString()}
                                </span>
                            </div>
                            {(group.contactEmail || group.contactPhone) && (
                                <div className="col-span-2 pt-2 border-t border-white/5 flex flex-col gap-2">
                                    <span className="text-xs uppercase tracking-wider text-white/50">Contact</span>
                                    <div className="flex flex-col gap-1">
                                        {group.contactEmail && (
                                            <div className="flex items-center gap-2 text-white">
                                                <Mail className="w-3 h-3 text-brand-text-muted" />
                                                {group.contactEmail}
                                            </div>
                                        )}
                                        {group.contactPhone && (
                                            <div className="flex items-center gap-2 text-white">
                                                <Phone className="w-3 h-3 text-brand-text-muted" />
                                                {group.contactPhone}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {step === 'form' && (
                <form id="join-form" onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-right-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input 
                            id="fullName" 
                            placeholder="Enter your full name" 
                            className="bg-black/20 border-white/10"
                            value={formData.fullName}
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="idNumber">ID / Passport No.</Label>
                            <Input 
                                id="idNumber" 
                                placeholder="e.g. 12345678" 
                                className="bg-black/20 border-white/10"
                                value={formData.idNumber}
                                onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input 
                                id="phone" 
                                placeholder="e.g. 0712..." 
                                className="bg-black/20 border-white/10"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="reason">Why do you want to join?</Label>
                        <Textarea 
                            id="reason" 
                            placeholder="Briefly describe your interest..." 
                            className="bg-black/20 border-white/10 min-h-[80px]"
                            value={formData.reason}
                            onChange={(e) => setFormData({...formData, reason: e.target.value})}
                            required
                        />
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                        <Checkbox 
                            id="terms" 
                            checked={formData.termsAccepted}
                            onCheckedChange={(checked) => setFormData({...formData, termsAccepted: checked as boolean})}
                        />
                        <label
                            htmlFor="terms"
                            className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-brand-text-muted"
                        >
                            I verify that the provided information is accurate and I agree to the group&apos;s constitution.
                        </label>
                    </div>
                </form>
            )}

            {step === 'success' && (
                <div className="flex flex-col items-center justify-center py-8 space-y-4 animate-in zoom-in-50 duration-300">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <div className="text-center space-y-2">
                        <h3 className="text-xl font-bold text-white">Application Received!</h3>
                        <p className="text-sm text-brand-text-muted max-w-[250px] mx-auto">
                            Your request to join <strong>{group.name}</strong> has been submitted for review. You will be notified via SMS/Email.
                        </p>
                    </div>
                </div>
            )}

        </div>

        <DialogFooter className="p-6 pt-2 gap-2 sm:gap-0">
            {step === 'details' && (
                <div className="flex w-full gap-2">
                    <Button variant="ghost" className="flex-1" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button className="flex-1 bg-kenya-red hover:bg-kenya-red/90 text-white" onClick={handleRegister}>
                        Register to Join
                    </Button>
                </div>
            )}
            
            {step === 'form' && (
                <div className="flex w-full gap-2">
                     <Button variant="ghost" className="flex-1" onClick={() => setStep('details')} disabled={isSubmitting}>Back</Button>
                     <Button 
                        type="submit" 
                        form="join-form" 
                        className="flex-1 bg-kenya-green hover:bg-kenya-green/90 text-white"
                        disabled={!formData.termsAccepted || isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </Button>
                </div>
            )}

            {step === 'success' && (
                 <Button className="w-full bg-white/10 hover:bg-white/20 text-white" onClick={resetDialog}>
                    Close
                </Button>
            )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
