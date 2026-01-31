"use client";

import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, CheckCircle2, ShieldCheck, MapPin } from "lucide-react";
import { GamificationService } from "@/lib/gamification-service";

interface ProjectVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  project: {
    id: string;
    title: string;
    location: string;
  };
}

export function ProjectVerificationModal({ isOpen, onClose, userId, project }: ProjectVerificationModalProps) {
  const [step, setStep] = useState(1);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    setIsVerifying(true);
    // Simulate API call/processing
    setTimeout(async () => {
      await GamificationService.verifyProject(userId, project.id);
      setStep(3);
      setIsVerifying(false);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-brand-surface border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-kenya-green" />
            Project Verification
          </DialogTitle>
          <DialogDescription className="text-brand-text-muted">
            {project.title} • {project.location}
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-kenya-red/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-kenya-red" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">In the Neighborhood?</h4>
                    <p className="text-xs text-brand-text-muted leading-relaxed">
                      To earn XP, you must be physically near the project site to confirm progress.
                    </p>
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => setStep(2)} 
                className="w-full bg-kenya-red hover:bg-kenya-red/90"
              >
                I&apos;m on Site
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="aspect-video rounded-xl bg-brand-surface-highlight border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-white/5 transition-colors">
                <Camera className="w-10 h-10 text-brand-text-muted" />
                <span className="text-xs font-bold text-brand-text-muted">Upload Photo (Proof of Progress)</span>
              </div>
              
              <div className="space-y-4">
                <p className="text-xs text-brand-text-muted text-center italic">
                  &quot;Your verification helps ensure transparency in government projects.&quot;
                </p>
                <Button 
                  onClick={handleVerify} 
                  disabled={isVerifying}
                  className="w-full bg-kenya-green hover:bg-kenya-green/90 text-black font-black"
                >
                  {isVerifying ? "Processing..." : "Submit Verification"}
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center justify-center py-8 space-y-4 text-center">
              <div className="w-16 h-16 rounded-full bg-kenya-green/20 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-kenya-green" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">XP Earned!</h3>
                <p className="text-sm text-brand-text-muted">
                  Thank you for being an active citizen. Your report has been submitted for validation.
                </p>
              </div>
              <Button onClick={onClose} variant="secondary" className="px-8">
                Done
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
