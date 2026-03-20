"use client";

import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  CheckCircle2, 
  UserPlus, 
  Briefcase, 
  CreditCard, 
  Phone,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { KENYA_LOCATIONS } from '@/lib/location-data';
import type { PoliticalParty } from '@/lib/parties-data';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { initiatePartyMembershipPayment } from '@/actions/party-payment';
import { checkPaymentStatus } from '@/actions/check-payment';

interface JoinPartyDialogProps {
  party: PoliticalParty;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = 'welcome' | 'details' | 'location' | 'payment' | 'success';

export function JoinPartyDialog({ party, open, onOpenChange }: JoinPartyDialogProps) {
  const [step, setStep] = useState<Step>('welcome');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const { toast } = useToast();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    phone: '',
    occupation: '',
    county: '',
    constituency: '',
    ward: '',
    termsAccepted: false
  });

  // Derived Location Data
  const selectedCounty = KENYA_LOCATIONS.find(c => c.name === formData.county);
  const selectedConstituency = selectedCounty?.constituencies.find(c => c.name === formData.constituency);

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.ward || !formData.termsAccepted) return;
    setStep('payment');
  };

  const handlePayment = async () => {
    const feeString = party.constitutionParameters.membershipFee.replace(/[^0-9]/g, '');
    const amount = parseInt(feeString) || 10; // Default to 10 if not found
    
    setIsSubmitting(true);
    try {
        const result = await initiatePartyMembershipPayment(amount, formData.phone, party.id);
        
        if (result.success && 'reference' in result) {
            const txRef = result.reference;
            toast({ title: "Request Sent", description: "Check your phone for M-Pesa PIN prompt." });
            setIsWaiting(true);
            pollStatus(txRef);
        } else {
            toast({ title: "Failed", description: result.message || "Could not initiate payment", variant: "destructive" });
            setIsSubmitting(false);
        }
    } catch {
        toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
        setIsSubmitting(false);
    }
  };

  const pollStatus = (reference: string) => {
    let attempts = 0;
    const interval = setInterval(async () => {
        attempts++;
        const res = await checkPaymentStatus(reference);
        
        if (res.success && res.status === 'completed') {
            clearInterval(interval);
            setIsWaiting(false);
            setIsSubmitting(false);
            setStep('success');
            toast({ title: "Payment Verified", description: `You are now a member of ${party.abbreviation}!` });
        } else if (res.status === 'failed' || attempts > 30) {
            clearInterval(interval);
            setIsWaiting(false);
            setIsSubmitting(false);
            if (attempts > 30) toast({ title: "Timeout", description: "Payment verification timed out. Please check your dashboard.", variant: "destructive" });
            else toast({ title: "Failed", description: "Payment was cancelled or failed.", variant: "destructive" });
        }
    }, 2000);
  };

  const resetDialog = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep('welcome');
      setFormData({
        fullName: '',
        idNumber: '',
        phone: '',
        occupation: '',
        county: '',
        constituency: '',
        ward: '',
        termsAccepted: false
      });
    }, 300);
  };

  const stepVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-brand-surface border-white/10 max-w-md md:max-w-lg p-0 overflow-hidden flex flex-col rounded-3xl shadow-2xl">
        <DialogTitle className="sr-only">Join {party.name}</DialogTitle>
        
        {/* Animated Progress Header */}
        {step !== 'success' && (
            <div className="h-1.5 w-full bg-white/5 relative">
                <motion.div 
                    initial={{ width: '0%' }}
                    animate={{ 
                        width: step === 'welcome' ? '20%' : step === 'details' ? '40%' : step === 'location' ? '60%' : '80%' 
                    }}
                    className={cn("absolute h-full left-0 transition-all duration-500", party.color.replace('bg-', 'bg-opacity-100 bg-'))}
                    style={{ backgroundColor: party.color.includes('#') ? party.color : undefined }}
                />
            </div>
        )}

        <div className="p-8 flex-1 overflow-y-auto no-scrollbar">
          <AnimatePresence mode="wait">
            {step === 'welcome' && (
              <motion.div 
                key="welcome"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <div className="space-y-2">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-black shadow-lg mb-4", party.color)}>
                        {party.abbreviation.charAt(0)}
                    </div>
                    <DialogTitle className="text-2xl font-black tracking-tight uppercase flex items-center gap-2">
                        Join {party.name}
                    </DialogTitle>
                    <DialogDescription className="text-brand-text-muted text-sm leading-relaxed">
                        Become a part of the movement. Your registration helps us build a stronger, more inclusive political future for Kenya.
                    </DialogDescription>
                </div>

                <div className="grid gap-3 pt-2">
                    {[
                        { icon: UserPlus, text: "Official Membership ID card" },
                        { icon: ShieldCheck, text: "Voting rights in party primaries" },
                        { icon: Users, text: "Grassroots branch involvement" }
                    ].map((benefit, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                            <benefit.icon className="w-4 h-4 text-brand-text-muted" />
                            <span className="text-xs font-medium text-white/80">{benefit.text}</span>
                        </div>
                    ))}
                </div>

                <div className="p-4 rounded-2xl bg-brand-surface-secondary border border-white/5 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Membership Fee</p>
                        <p className="text-lg font-black text-white">{party.constitutionParameters.membershipFee}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-brand-text-muted" />
                    </div>
                </div>
              </motion.div>
            )}

            {step === 'details' && (
              <motion.div 
                key="details"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-5"
              >
                <div className="space-y-1">
                    <h3 className="text-xl font-black uppercase tracking-tight">Personal Details</h3>
                    <p className="text-xs text-brand-text-muted">Required for National Registrar verification.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-[10px] font-black uppercase tracking-widest text-white/40">Full Name (As on ID)</Label>
                    <Input 
                        id="fullName" 
                        placeholder="John Doe Manyara" 
                        className="bg-white/5 border-white/10 h-12 rounded-xl focus:border-brand-primary"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="idNumber" className="text-[10px] font-black uppercase tracking-widest text-white/40">ID Number</Label>
                        <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                            <Input 
                                id="idNumber" 
                                placeholder="12345678" 
                                className="bg-white/5 border-white/10 h-12 pl-10 rounded-xl"
                                value={formData.idNumber}
                                onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest text-white/40">Phone</Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                            <Input 
                                id="phone" 
                                placeholder="0712..." 
                                className="bg-white/5 border-white/10 h-12 pl-10 rounded-xl"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            />
                        </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="occupation" className="text-[10px] font-black uppercase tracking-widest text-white/40">Occupation</Label>
                    <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                        <Input 
                            id="occupation" 
                            placeholder="e.g. Business Owner, Student" 
                            className="bg-white/5 border-white/10 h-12 pl-10 rounded-xl"
                            value={formData.occupation}
                            onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                        />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'location' && (
              <motion.div 
                key="location"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-5"
              >
                <div className="space-y-1">
                    <h3 className="text-xl font-black uppercase tracking-tight">Voter Settlement</h3>
                    <p className="text-xs text-brand-text-muted">Select your registered voting station details.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">County</Label>
                    <Select 
                        value={formData.county} 
                        onValueChange={(v) => setFormData({...formData, county: v, constituency: '', ward: ''})}
                    >
                        <SelectTrigger className="bg-white/5 border-white/10 h-12 rounded-xl">
                            <SelectValue placeholder="Select County" />
                        </SelectTrigger>
                        <SelectContent className="bg-brand-surface border-white/10 max-h-[200px]">
                            {KENYA_LOCATIONS.map(c => (
                                <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Constituency</Label>
                        <Select 
                            disabled={!formData.county} 
                            value={formData.constituency} 
                            onValueChange={(v) => setFormData({...formData, constituency: v, ward: ''})}
                        >
                            <SelectTrigger className="bg-white/5 border-white/10 h-12 rounded-xl">
                                <SelectValue placeholder="Constituency" />
                            </SelectTrigger>
                            <SelectContent className="bg-brand-surface border-white/10">
                                {selectedCounty?.constituencies.map(c => (
                                    <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Ward</Label>
                        <Select 
                            disabled={!formData.constituency} 
                            value={formData.ward} 
                            onValueChange={(v) => setFormData({...formData, ward: v})}
                        >
                            <SelectTrigger className="bg-white/5 border-white/10 h-12 rounded-xl">
                                <SelectValue placeholder="Ward" />
                            </SelectTrigger>
                            <SelectContent className="bg-brand-surface border-white/10">
                                {selectedConstituency?.wards.map(w => (
                                    <SelectItem key={w} value={w}>{w}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 pt-4 border-t border-white/5">
                    <Checkbox 
                        id="terms" 
                        checked={formData.termsAccepted}
                        onCheckedChange={(checked) => setFormData({...formData, termsAccepted: checked as boolean})}
                        className="mt-1"
                    />
                    <label
                        htmlFor="terms"
                        className="text-[11px] font-medium leading-relaxed text-brand-text-muted"
                    >
                        I hereby apply for membership to **{party.name}**. I agree to abide by the party constitution and the Republic of Kenya Political Parties Act.
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div 
                key="payment"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                <div className="space-y-1">
                    <h3 className="text-xl font-black uppercase tracking-tight">Registration Fee</h3>
                    <p className="text-xs text-brand-text-muted">Pay your one-time membership fee via M-Pesa STK Push.</p>
                </div>

                {!isWaiting ? (
                    <div className="space-y-6 pt-2">
                        <div className="p-6 rounded-2xl bg-brand-surface-secondary border border-white/5 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-brand-text-muted uppercase tracking-wider font-bold">Party</span>
                                <span className="text-sm font-black text-white">{party.name}</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-y border-white/5">
                                <span className="text-sm text-brand-text-muted uppercase tracking-wider font-bold">Registration Fee</span>
                                <span className="text-xl font-black text-white">{party.constitutionParameters.membershipFee}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-brand-text-muted uppercase tracking-wider font-bold">Payment Method</span>
                                <div className="bg-[#2EB400]/10 px-3 py-1 rounded-full flex items-center gap-2 border border-[#2EB400]/20">
                                    <div className="w-2 h-2 rounded-full bg-[#2EB400] animate-pulse" />
                                    <span className="text-[10px] font-black text-[#2EB400] uppercase tracking-widest">M-Pesa Active</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 px-1">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Confirm M-Pesa Number</Label>
                            <Input 
                                disabled={isSubmitting}
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                className="bg-white/5 border-white/10 h-12 rounded-xl text-lg font-bold tracking-widest"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 space-y-6">
                        <div className="relative">
                            <div className="w-20 h-20 rounded-full border-2 border-white/5 flex items-center justify-center">
                                <Loader2 className="w-10 h-10 text-brand-primary animate-spin" />
                            </div>
                            <motion.div 
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute -top-1 -right-1 w-6 h-6 bg-[#2EB400] rounded-full flex items-center justify-center shadow-lg"
                            >
                                <Phone className="w-3 h-3 text-white" />
                            </motion.div>
                        </div>
                        <div className="text-center space-y-2">
                            <h4 className="text-lg font-black uppercase tracking-tight">Waiting for PIN</h4>
                            <p className="text-xs text-brand-text-muted max-w-[250px] mx-auto leading-relaxed">
                                We&apos;ve sent an M-Pesa STK Push to **{formData.phone}**. Please enter your PIN to complete the registration.
                            </p>
                        </div>
                    </div>
                )}
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 space-y-6"
              >
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <div className="text-center space-y-2">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">Application Sent!</h3>
                    <p className="text-sm text-brand-text-muted max-w-[280px] mx-auto leading-relaxed">
                        Your membership application for **{party.abbreviation}** has been received. You will receive a verification SMS within 24 hours.
                    </p>
                </div>
                <Button className="w-full bg-white/5 hover:bg-white/10 border border-white/10" onClick={resetDialog}>
                    Back to Party Page
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {step !== 'success' && (
            <DialogFooter className="p-8 pt-0 flex gap-3 sm:gap-3">
                {step === 'welcome' && (
                    <Button 
                        className={cn("w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl transition-all", party.color)}
                        onClick={() => setStep('details')}
                    >
                        Proceed to Details <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                )}

                {step === 'details' && (
                    <div className="grid grid-cols-2 gap-3 w-full">
                        <Button 
                            variant="ghost" 
                            className="h-14 rounded-2xl font-black" 
                            onClick={() => setStep('welcome')}
                        >
                            <ChevronLeft className="mr-2 w-4 h-4" /> Back
                        </Button>
                        <Button 
                            className={cn("h-14 rounded-2xl font-black uppercase tracking-widest text-xs", party.color)}
                            onClick={() => setStep('location')}
                            disabled={!formData.fullName || !formData.idNumber || !formData.phone}
                        >
                            Next Step <ChevronRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                )}

                {step === 'location' && (
                    <div className="grid grid-cols-1 w-full">
                        <Button 
                            className={cn("h-14 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl", party.color)}
                            onClick={handleProceedToPayment}
                            disabled={!formData.ward || !formData.termsAccepted}
                        >
                            Proceed to Payment <ChevronRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                )}

                {step === 'payment' && (
                    <div className="grid grid-cols-2 gap-3 w-full">
                        <Button 
                            variant="ghost" 
                            className="h-14 rounded-2xl font-black" 
                            onClick={() => setStep('location')}
                            disabled={isSubmitting || isWaiting}
                        >
                            <ChevronLeft className="mr-2 w-4 h-4" /> Back
                        </Button>
                        <Button 
                            className="h-14 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl bg-[#2EB400] hover:bg-[#2EB400]/90 text-white"
                            onClick={handlePayment}
                            disabled={isSubmitting || isWaiting || !formData.phone}
                        >
                            {isSubmitting || isWaiting ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>Send M-Pesa Push <Phone className="ml-2 w-4 h-4" /></>
                            )}
                        </Button>
                    </div>
                )}
            </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
