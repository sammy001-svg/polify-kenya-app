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
import { requestWithdrawal } from "@/actions/withdraw";
import { useToast } from "@/components/ui/use-toast";

interface WithdrawalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  currentBalance: number;
}

export function WithdrawalDialog({ isOpen, onClose, onSuccess, currentBalance }: WithdrawalDialogProps) {
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleWithdraw = async () => {
    const numAmount = parseInt(amount);
    if (!amount || isNaN(numAmount) || numAmount < 50) {
        toast({ title: "Invalid Amount", description: "Minimum withdrawal is KES 50", variant: "destructive" });
        return;
    }
    if (numAmount > currentBalance) {
        toast({ title: "Insufficient Funds", description: "You cannot withdraw more than your balance.", variant: "destructive" });
        return;
    }
    if (!phone) {
        toast({ title: "Phone Required", description: "Enter M-Pesa phone number for receiving funds.", variant: "destructive" });
        return;
    }

    setLoading(true);
    try {
        const result = await requestWithdrawal(numAmount, phone);
        
        if (result.success) {
            toast({ title: "Request Submitted", description: "Your withdrawal is being processed." });
            onClose();
            onSuccess();
        } else {
            toast({ title: "Failed", description: result.message, variant: "destructive" });
        }
    } catch {
        toast({ title: "Error", description: "Something went wrong", variant: "destructive" });
    } finally {
        setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-black text-white border-white/20">
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
          <DialogDescription>Request a payout to your M-Pesa number.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
            <div className="grid gap-2">
                <label className="text-sm font-medium">Amount (KES)</label>
                <Input type="number" placeholder="Min 50" value={amount} onChange={e => setAmount(e.target.value)} disabled={loading} />
                <p className="text-xs text-muted-foreground">Available: KES {currentBalance.toLocaleString()}</p>
            </div>
            <div className="grid gap-2">
                <label className="text-sm font-medium">M-Pesa Number</label>
                <Input placeholder="07XX..." value={phone} onChange={e => setPhone(e.target.value)} disabled={loading} />
            </div>
        </div>

        <DialogFooter>
            <Button onClick={handleWithdraw} disabled={loading} className="w-full">
                {loading ? "Processing..." : "Request Withdrawal"}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
