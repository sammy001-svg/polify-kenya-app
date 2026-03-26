"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { joinEvent } from "@/app/(platform)/campaign/events/actions";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, UserPlus } from "lucide-react";

interface JoinEventDialogProps {
  eventId: string;
  eventTitle: string;
  children: React.ReactNode;
}

export function JoinEventDialog({ eventId, eventTitle, children }: JoinEventDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phoneNumber) {
      toast({
        title: "Missing Fields",
        description: "Please enter your name and phone number.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const result = await joinEvent(eventId, formData.fullName, formData.phoneNumber);
    setLoading(false);

    if (result.error) {
      toast({
        title: "Registration Failed",
        description: result.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Spot Reserved!",
        description: `You've successfully joined ${eventTitle}. See you there!`,
      });
      setOpen(false);
      setFormData({ fullName: "", phoneNumber: "" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-kenya-deep border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black italic tracking-tighter text-brand-primary">
            RESERVE YOUR SPOT
          </DialogTitle>
          <DialogDescription className="text-brand-text-muted">
            Join the movement. Enter your details to attend &quot;{eventTitle}&quot;.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-brand-primary">
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="e.g. John Doe"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="bg-black/50 border-white/10 text-white placeholder:text-white/20 focus:border-brand-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-xs font-black uppercase tracking-widest text-brand-primary">
              Phone Number
            </Label>
            <Input
              id="phone"
              placeholder="e.g. 0712345678"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              className="bg-black/50 border-white/10 text-white placeholder:text-white/20 focus:border-brand-primary"
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-primary text-black font-black uppercase tracking-widest hover:bg-brand-primary/90 transition-all py-6 rounded-xl"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  RESERVING...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  CONFIRM RESERVATION
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
