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
import { processDonationPayment } from "@/actions/donation";
import { checkPaymentStatus } from "@/actions/check-payment";
import { useToast } from "@/components/ui/use-toast";
import { Heart, Loader2, Phone, Coins } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DonationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  campaignId: string;
  campaignTitle: string;
}

export function DonationDialog({
  isOpen,
  onClose,
  campaignId,
  campaignTitle,
}: DonationDialogProps) {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("1000");
  const [loading, setLoading] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const { toast } = useToast();

  const handlePay = async () => {
    if (!phone) {
      toast({
        title: "Phone Required",
        description: "Please enter your M-Pesa phone number.",
        variant: "destructive",
      });
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await processDonationPayment(numAmount, phone, campaignId);
      const txRef = (result as { success: boolean, reference?: string }).reference;

      if (result.success && txRef) {
        toast({
          title: "Payment Request Sent",
          description: "Please check your phone and enter your M-Pesa PIN.",
        });
        
        setIsWaiting(true);
        pollPaymentStatus(txRef);
      } else {
        toast({
          title: "Payment Failed",
          description: result.message || "Failed to initiate payment.",
          variant: "destructive",
        });
        setLoading(false);
      }
    } catch {
       toast({
          title: "Error",
          description: "An unexpected error occurred.",
          variant: "destructive",
      });
      setLoading(false);
    }
  };

  const pollPaymentStatus = async (reference: string) => {
      let attempts = 0;
      const maxAttempts = 30; // 60 seconds
      
      const interval = setInterval(async () => {
          attempts++;
          
          try {
              const statusResult = await checkPaymentStatus(reference);
              
              if (statusResult.success && statusResult.status === 'completed') {
                  clearInterval(interval);
                  
                  setShowSparkles(true);
                  setTimeout(() => setShowSparkles(false), 5000);
                  
                  setIsWaiting(false);
                  setLoading(false);
                  onClose();
                  toast({
                    title: "Donation Successful!",
                    description: `Thank you for supporting ${campaignTitle}!`,
                  });
              } else if (statusResult.status === 'failed') {
                  clearInterval(interval);
                  setIsWaiting(false);
                  setLoading(false);
                  toast({
                      title: "Payment Failed",
                      description: "The transaction was cancelled or failed.",
                      variant: "destructive"
                  });
              }
              
              if (attempts >= maxAttempts) {
                  clearInterval(interval);
                  setIsWaiting(false);
                  setLoading(false);
                  toast({
                      title: "Timeout",
                      description: "Verification timed out. If you paid, it will reflect shortly.",
                      variant: "destructive"
                  });
              }
          } catch {
              // Ignore polling errors
          }
      }, 2000);
  };

  return (
    <>
      <AnimatePresence>
        {showSparkles && <Confetti />}
      </AnimatePresence>
      <Dialog open={isOpen} onOpenChange={isWaiting ? undefined : onClose}>
      <DialogContent className="sm:max-w-md bg-brand-surface border-white/10 text-white shadow-2xl backdrop-blur-xl">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center mb-4">
            <Heart className="w-6 h-6 text-brand-primary fill-brand-primary" />
          </div>
          <DialogTitle className="text-center text-xl font-bold italic tracking-tighter">
            Support {campaignTitle}
          </DialogTitle>
          <DialogDescription className="text-center text-brand-text-muted">
            {isWaiting 
                ? "Waiting for you to enter PIN on your phone..." 
                : "Your contribution makes a direct impact. Fast, secure M-Pesa payment."
            }
          </DialogDescription>
        </DialogHeader>

        {!isWaiting && (
          <div className="grid gap-6 py-6 transition-all duration-300">
            <div className="grid gap-2">
              <label htmlFor="amount" className="text-xs font-black uppercase tracking-widest text-brand-text-muted flex items-center gap-2">
                 <Coins className="w-3 h-3 text-kenya-gold" /> Amount (KES)
              </label>
              <Input
                id="amount"
                type="number"
                placeholder="1000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={loading}
                className="bg-brand-surface-secondary/50 border-white/10 focus:border-brand-primary/50 h-12 text-lg font-black italic tracking-tighter"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="phone" className="text-xs font-black uppercase tracking-widest text-brand-text-muted flex items-center gap-2">
                 <Phone className="w-3 h-3 text-brand-primary" /> M-Pesa Number
              </label>
              <Input
                id="phone"
                placeholder="07XX XXX XXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={loading}
                className="bg-brand-surface-secondary/50 border-white/10 focus:border-brand-primary/50 h-12 font-medium"
              />
            </div>
          </div>
        )}
        
        {isWaiting && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-brand-primary/20 animate-ping" />
                    <Loader2 className="w-10 h-10 text-brand-primary animate-spin relative z-10" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary animate-pulse">Processing STK Push...</p>
            </div>
        )}

        <DialogFooter>
          {!isWaiting && (
            <Button 
                type="button" 
                onClick={handlePay} 
                disabled={loading} 
                className="w-full bg-brand-primary hover:bg-brand-primary/90 text-black font-black uppercase tracking-widest h-12 rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-brand-primary/20"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Initiate Support"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
}

const Confetti = () => {
  const [particles] = useState(() => {
    const colors = ["bg-kenya-gold", "bg-kenya-red", "bg-kenya-green", "bg-brand-primary", "bg-blue-400"];
    return [...Array(60)].map((_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 0.8,
      rotate: Math.random() * 720 - 360,
    }));
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-1000 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ 
            top: -20, 
            left: p.left,
            scale: 0,
            rotate: 0,
            opacity: 1
          }}
          animate={{ 
            top: "110%",
            scale: [0, 1, 1, 0.5],
            rotate: p.rotate,
            opacity: [1, 1, 0.8, 0]
          }}
          transition={{ 
            duration: p.duration,
            ease: [0.23, 1, 0.32, 1],
            delay: p.delay
          }}
          style={{ width: p.size, height: p.size }}
          className={cn("absolute rounded-sm", p.color)}
        />
      ))}
    </div>
  );
};
