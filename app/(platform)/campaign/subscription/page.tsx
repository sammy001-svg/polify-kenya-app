"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { SubscriptionCard } from "@/components/campaign/SubscriptionCard";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PaymentDialog } from "@/components/campaign/PaymentDialog";

export default function SubscriptionPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  // Payment Dialog State
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<{id: string, amount: number} | null>(null);

  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();

  const completeSubscription = async (planId: string) => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Not authenticated");
  
        const subscriptionData = {
          user_id: user.id,
          plan_id: planId,
          status: 'active',
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        };
  
        const { error } = await supabase
          .from('campaign_subscriptions')
          .upsert(subscriptionData, { onConflict: 'user_id' });
  
        if (error) throw error;
  
        if (planId === 'free') {
          setShowSuccessDialog(true);
        } else {
          toast({
            title: "Subscription Successful!",
            description: `You have subscribed to the ${planId} plan.`,
          });
          router.refresh();
          router.push("/campaign");
        }
        
      } catch (error) {
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        toast({
          title: "Subscription Failed",
          description: message,
          variant: "destructive",
        });
      } finally {
        setLoading(null);
      }
  };

  const handleSubscribe = async (planId: string) => {
    setLoading(planId);
    
    if (planId === 'free') {
        // Free plan: Immediate processing
        await completeSubscription('free');
    } else {
        // Paid plans: Open Payment Dialog
        const amount = planId === 'campaigner' ? 5000 : 15000;
        setSelectedPlanForPayment({ id: planId, amount });
        setShowPaymentDialog(true);
        setLoading(null); // Stop loading spinner on button since dialog is open
    }
  };

  const handleCloseDialog = () => {
    setShowSuccessDialog(false);
    router.refresh();
    router.push("/campaign");
  };

  return (
    <div className="container py-10 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-4">Upgrade Your Campaign HQ</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Unlock the full power of data-driven campaigning. Choose the plan that fits your campaign needs.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <SubscriptionCard
          title="Starter"
          price="Free"
          description="Essential tools for local insights."
          features={[
            "Basic Voter Demographics",
            "Public Petition Access",
            "Community Event Listing",
            "Profile Management"
          ]}
          onSubscribe={() => handleSubscribe('free')}
          isLoading={loading === 'free'}
        />

        <SubscriptionCard
          title="Campaigner"
          price="KES 5,000"
          description="Advanced analytics for serious contenders."
          features={[
            "All Starter features",
            "Advanced Sentiment Analysis",
            "Competitor Tracking (up to 3)",
            "Priority Support",
            "Campaign Event Analytics"
          ]}
          isPopular={true}
          buttonText="Upgrade to Campaigner"
          onSubscribe={() => handleSubscribe('campaigner')}
          isLoading={loading === 'campaigner'}
        />

        <SubscriptionCard
          title="National"
          price="KES 15,000"
          description="Full suite for county & national level."
          features={[
            "All Campaigner features",
            "Nationwide Trends",
            "Unlimited Competitor Tracking",
            "AI-Powered Strategy Insights",
            "Dedicated Account Manager",
            "Crisis Management Tools"
          ]}
          buttonText="Go National"
          onSubscribe={() => handleSubscribe('national')}
          isLoading={loading === 'national'}
        />
      </div>

      {/* Free Plan Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Setup Complete</DialogTitle>
            <DialogDescription>
              Congratulations, your free one month trial starts now.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleCloseDialog}>Get Started</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Payment Dialog */}
      {selectedPlanForPayment && (
          <PaymentDialog 
            isOpen={showPaymentDialog}
            onClose={() => setShowPaymentDialog(false)}
            planId={selectedPlanForPayment.id}
            amount={selectedPlanForPayment.amount}
            onSuccess={() => {
                setShowPaymentDialog(false);
                completeSubscription(selectedPlanForPayment.id);
            }}
          />
      )}
    </div>
  );
}
