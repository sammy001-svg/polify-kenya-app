"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { initiateWalletDeposit } from "@/actions/deposit";
import { checkPaymentStatus } from "@/actions/check-payment";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, ArrowRight, CircleDollarSign, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DepositDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function DepositDialog({ isOpen, onClose, onSuccess }: DepositDialogProps) {
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const { toast } = useToast();

  const handleDeposit = async () => {
    const numAmount = parseInt(amount);
    if (!amount || isNaN(numAmount) || numAmount < 10) {
        toast({ title: "Invalid Amount", description: "Minimum deposit is KES 10", variant: "destructive" });
        return;
    }
    if (!phone) {
        toast({ title: "Phone Required", description: "Enter M-Pesa phone number", variant: "destructive" });
        return;
    }

    setLoading(true);
    try {
        const result = await initiateWalletDeposit(numAmount, phone);
        
        // Cast to any to access the 'reference' property which is added by the action
        // but might not be inferred correctly by the strict STKPushResponse type intersection
        const txRef = (result as { reference?: string }).reference;

        if (result.success && txRef) {
            toast({ title: "Request Sent", description: "Check your phone to approve M-Pesa payment." });
            setIsWaiting(true);
            pollStatus(txRef);
        } else {
            toast({ title: "Failed", description: result.message || "Failed", variant: "destructive" });
            setLoading(false);
        }
    } catch {
        toast({ title: "Error", description: "Something went wrong", variant: "destructive" });
        setLoading(false);
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
              setLoading(false);
              onClose();
              onSuccess();
              toast({ title: "Success", description: "Funds added to wallet." });
          } else if (res.status === 'failed' || attempts > 30) {
              clearInterval(interval);
              setIsWaiting(false);
              setLoading(false);
              if (attempts > 30) toast({ title: "Timeout", description: "Refresh if payment was made.", variant: "destructive" });
              else toast({ title: "Failed", description: "Payment failed/cancelled.", variant: "destructive" });
          }
      }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={isWaiting ? undefined : onClose}>
      <DialogContent className="sm:max-w-md bg-brand-bg border-white/10 text-white shadow-2xl backdrop-blur-xl">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center mb-4">
            <CircleDollarSign className="w-6 h-6 text-brand-primary" />
          </div>
          <DialogTitle className="text-center text-2xl font-black italic tracking-tighter">
            Top Up Wallet
          </DialogTitle>
          <DialogDescription className="text-center text-brand-text-muted">
            Add funds instantly via M-Pesa STK Push
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!isWaiting ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid gap-6 py-6"
            >
              <div className="grid gap-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-muted flex items-center gap-2">
                   Amount (KES)
                </label>
                <div className="relative">
                  <Input 
                    type="number" 
                    placeholder="e.g. 500" 
                    value={amount} 
                    onChange={e => setAmount(e.target.value)} 
                    disabled={loading} 
                    className="bg-brand-surface-secondary/50 border-white/10 focus:border-brand-primary/50 h-14 text-xl font-black italic tracking-tighter pl-4"
                  />
                </div>
                <div className="flex gap-2 mt-1">
                  {[100, 500, 1000, 5000].map(val => (
                    <button 
                      key={val} 
                      onClick={() => setAmount(val.toString())} 
                      disabled={loading}
                      className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold hover:bg-brand-primary hover:text-black transition-colors"
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-muted flex items-center gap-2">
                   <Phone className="w-3 h-3" /> M-Pesa Number
                </label>
                <Input 
                  placeholder="07XX XXX XXX" 
                  value={phone} 
                  onChange={e => setPhone(e.target.value)} 
                  disabled={loading} 
                  className="bg-brand-surface-secondary/50 border-white/10 focus:border-brand-primary/50 h-14 font-medium px-4"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="waiting"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-12 gap-6"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-brand-primary/20 animate-ping" />
                <div className="w-16 h-16 rounded-full bg-brand-surface border-2 border-brand-primary/30 flex items-center justify-center relative z-10">
                   <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
                </div>
              </div>
              <div className="space-y-2 text-center">
                <h3 className="text-sm font-black uppercase tracking-widest text-brand-primary animate-pulse">Waiting for PIN...</h3>
                <p className="text-xs text-brand-text-muted max-w-[200px] leading-relaxed">
                  Please check your phone and enter your M-Pesa PIN to complete the deposit.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <DialogFooter className="sm:justify-start">
          {!isWaiting && (
            <Button 
                onClick={handleDeposit} 
                disabled={loading} 
                className="w-full h-14 bg-brand-primary hover:bg-brand-primary/90 text-black font-black uppercase tracking-[0.2em] transition-all active:scale-95 group shadow-xl shadow-brand-primary/10"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <div className="flex items-center gap-2">
                  <span>Confirm Deposit</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
