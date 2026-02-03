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
import { Loader2 } from "lucide-react";

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
      <DialogContent className="sm:max-w-md bg-black text-white border-white/20">
        <DialogHeader>
          <DialogTitle>Top Up Wallet</DialogTitle>
          <DialogDescription>Add funds via M-Pesa</DialogDescription>
        </DialogHeader>

        {!isWaiting ? (
            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <label className="text-sm font-medium">Amount (KES)</label>
                    <Input type="number" placeholder="e.g. 500" value={amount} onChange={e => setAmount(e.target.value)} disabled={loading} />
                    <div className="flex gap-2">
                        {[100, 500, 1000].map(val => (
                            <Button key={val} variant="outline" size="sm" onClick={() => setAmount(val.toString())} disabled={loading}>
                                {val}
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="grid gap-2">
                    <label className="text-sm font-medium">M-Pesa Number</label>
                    <Input placeholder="07XX..." value={phone} onChange={e => setPhone(e.target.value)} disabled={loading} />
                </div>
            </div>
        ) : (
            <div className="flex flex-col items-center py-8 gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Waiting for payment confirmation...</p>
            </div>
        )}

        <DialogFooter>
            {!isWaiting && (
                <Button onClick={handleDeposit} disabled={loading} className="w-full">
                    {loading ? "Processing..." : "Pay Now"}
                </Button>
            )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
