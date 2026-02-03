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
import { processSubscriptionPayment } from "@/actions/payment";
import { checkPaymentStatus } from "@/actions/check-payment";
import { useToast } from "@/components/ui/use-toast";

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  planId: string;
  amount: number;
  onSuccess: () => void;
}

export function PaymentDialog({
  isOpen,
  onClose,
  planId,
  amount,
  onSuccess,
}: PaymentDialogProps) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
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

    setLoading(true);
    try {
      const result = await processSubscriptionPayment(amount, phone, planId);

      // Cast to any to access reference which may be missing from strict type definition
      const txRef = (result as { success: boolean, reference?: string }).reference;

      if (result.success && txRef) {
        toast({
          title: "Payment Request Sent",
          description: "Please check your phone and enter your M-Pesa PIN.",
        });
        
        // Start Polling
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
      const maxAttempts = 30; // 60 seconds (2s interval)
      
      const interval = setInterval(async () => {
          attempts++;
          
          try {
              const statusResult = await checkPaymentStatus(reference);
              
              if (statusResult.success && statusResult.status === 'completed') {
                  clearInterval(interval);
                  setIsWaiting(false);
                  setLoading(false);
                  onClose();
                  onSuccess(); // Grant access
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
                      description: "Payment verification timed out. If you paid, please refresh.",
                      variant: "destructive"
                  });
              }
              
          } catch {
              // Ignore polling errors
          }
          
      }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={isWaiting ? undefined : onClose}>
      <DialogContent className="sm:max-w-md bg-black text-white border-white/20">
        <DialogHeader>
          <DialogTitle>Pay with M-Pesa</DialogTitle>
          <DialogDescription>
            {isWaiting 
                ? "Waiting for you to enter PIN on your phone..." 
                : <>Enter your M-Pesa phone number to pay <b>KES {amount.toLocaleString()}</b> for the {planId} plan.</>
            }
          </DialogDescription>
        </DialogHeader>
        {!isWaiting && (
        <div className="flex items-center space-x-2 py-4">
          <div className="grid flex-1 gap-2">
            <Input
              id="phone"
              placeholder="07XX XXX XXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>
        )}
        
        {isWaiting && (
            <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )}

        <DialogFooter className="sm:justify-start">
          {!isWaiting && (
          <Button type="button" onClick={handlePay} disabled={loading} className="w-full">
            {loading ? "Processing..." : "Pay Now"}
          </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
