"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export function ContactSupportModal({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulation of sending an email to info@shanfixtechnology.com
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log("Support Request Sent to info@shanfixtechnology.com:", formData);
      setSubmitted(true);
      setFormData({ fullName: "", phoneNumber: "", email: "", message: "" });
    } catch (err) {
      console.error("Support form error:", err);
      toast.error("Failed to send support request. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      // Delay reset slightly to avoid flickering during close animation
      setTimeout(() => setSubmitted(false), 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-brand-bg border-brand-accent/20 backdrop-blur-xl text-white">
        {submitted ? (
          <div className="flex flex-col items-center justify-center space-y-6 py-10 text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="rounded-full bg-green-500/20 p-4">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white uppercase tracking-wider">Message Received</h3>
              <p className="text-brand-muted max-w-[280px] mx-auto text-sm leading-relaxed">
                Thanks for contacting support, we will get back to you shortly
              </p>
            </div>
            
            <div className="pt-8 flex flex-col items-center gap-4 w-full">
              <div className="relative h-12 w-48 opacity-50 contrast-125 grayscale hover:grayscale-0 transition-all duration-500">
                <Image
                  src="/images/polify-logo-v3.png"
                  alt="PoliFy Kenya"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <Button 
                variant="ghost" 
                className="text-brand-muted hover:text-white hover:bg-white/5 text-xs font-bold uppercase tracking-widest mt-4"
                onClick={() => setOpen(false)}
              >
                Close Window
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-brand-primary">Contact Support</DialogTitle>
              <DialogDescription className="text-brand-muted">
                Fill out the form below and our team will get back to you as soon as possible.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="support-name">Full Name</Label>
                <Input
                  id="support-name"
                  placeholder="Enter your full name"
                  className="bg-brand-surface border-brand-border"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="support-phone">Phone Number</Label>
                <Input
                  id="support-phone"
                  type="tel"
                  placeholder="+254..."
                  className="bg-brand-surface border-brand-border"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="support-email">Email Address</Label>
                <Input
                  id="support-email"
                  type="email"
                  placeholder="name@example.com"
                  className="bg-brand-surface border-brand-border"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="support-message">How can we help?</Label>
                <Textarea
                  id="support-message"
                  placeholder="Describe your issue or question..."
                  className="bg-brand-surface border-brand-border min-h-[100px]"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <DialogFooter className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white gap-2 font-bold uppercase tracking-wider h-11"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Request
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
