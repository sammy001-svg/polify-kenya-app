"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Search, FileDigit, ShieldCheck, Zap, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface RequestScanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RequestScanModal({ isOpen, onClose }: RequestScanModalProps) {
  const [step, setStep] = useState(1);
  const [entity, setEntity] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [citizenCount] = useState(() => Math.floor(Math.random() * 50) + 10);

  const handleSubmit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setStep(3);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-xl bg-brand-bg border border-white/10 rounded-[40px] shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden"
          >
            {/* Header HUD */}
            <div className="p-8 border-b border-white/5 bg-white/2 flex justify-between items-center">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-primary/20 rounded-xl">
                     <FileDigit className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                     <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">Initiate Forensic Scan</h3>
                     <p className="text-[10px] text-brand-text-muted font-black uppercase tracking-widest">OAG Document Digitization Queue</p>
                  </div>
               </div>
               <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white">
                  <X className="w-6 h-6" />
               </button>
            </div>

            <div className="p-10">
               {step === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                     <div className="space-y-4">
                        <label className="text-xs font-black text-white uppercase tracking-widest pl-1">Target Entity Name</label>
                        <div className="relative group">
                           <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 h-5 w-5 group-focus-within:text-brand-primary transition-colors" />
                           <input 
                              type="text" 
                              value={entity}
                              onChange={(e) => setEntity(e.target.value)}
                              placeholder="e.g. Ministry of Health, Kericho County..." 
                              className="w-full bg-white/3 border border-white/5 rounded-3xl py-6 pl-16 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 transition-all text-xl font-black italic tracking-tighter"
                           />
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/2 border border-white/5 rounded-2xl flex items-start gap-3">
                           <ShieldCheck className="w-5 h-5 text-kenya-green shrink-0 mt-0.5" />
                           <p className="text-[10px] text-white/40 leading-relaxed font-bold">Priority given to entities with high public finance allocations.</p>
                        </div>
                        <div className="p-4 bg-white/2 border border-white/5 rounded-2xl flex items-start gap-3">
                           <Zap className="w-5 h-5 text-kenya-gold shrink-0 mt-0.5" />
                           <p className="text-[10px] text-white/40 leading-relaxed font-bold">Scans are verified against official OAG hardcopy signatures.</p>
                        </div>
                     </div>

                     <Button 
                        disabled={!entity}
                        onClick={() => setStep(2)}
                        className="w-full h-16 rounded-3xl bg-brand-primary text-black font-black uppercase tracking-[0.2em] text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-brand-primary/20"
                     >
                        Confirm Target
                     </Button>
                  </motion.div>
               )}

               {step === 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 text-center py-6">
                     <div className="relative w-24 h-24 mx-auto mb-8">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 border-4 border-brand-primary border-dashed rounded-full" 
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                           <FileDigit className="w-10 h-10 text-brand-primary" />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <h4 className="text-2xl font-black text-white italic tracking-tighter uppercase">Verification Required</h4>
                        <p className="text-sm text-brand-text-muted">You are requesting a deep-scan of <span className="text-white font-bold">{entity}</span>. Proceeding will utilize 1 investigation credit.</p>
                     </div>

                     <div className="flex gap-4">
                        <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-14 rounded-2xl border-white/10 font-black uppercase text-[10px]">Cancel</Button>
                        <Button 
                          onClick={handleSubmit} 
                          disabled={isProcessing}
                          className="flex-1 h-14 rounded-2xl bg-brand-primary text-black font-black uppercase text-[10px]"
                        >
                           {isProcessing ? "Processing..." : "Initiate Reconstruction"}
                        </Button>
                     </div>
                  </motion.div>
               )}

               {step === 3 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 text-center py-6">
                     <div className="w-24 h-24 bg-kenya-green/20 rounded-full flex items-center justify-center mx-auto border border-kenya-green/40 shadow-[0_0_40px_rgba(0,255,128,0.2)]">
                        <ShieldCheck className="w-12 h-12 text-kenya-green" />
                     </div>
                     <div className="space-y-2">
                        <h4 className="text-2xl font-black text-white italic tracking-tighter uppercase">Request Logged</h4>
                        <p className="text-sm text-brand-text-muted">Target reconstructed successfully. Digitization estimated at 48 hours for full forensic query mapping.</p>
                     </div>
                     <Button onClick={onClose} className="w-full h-14 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 font-black uppercase text-[10px]">Return to Vault</Button>
                  </motion.div>
               )}
            </div>

            {/* Support Terminal */}
            <div className="p-6 bg-black/40 border-t border-white/5 flex items-center gap-4">
               <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                  <AlertCircle className="w-4 h-4 text-white/20" />
               </div>
               <p className="text-[9px] text-white/30 uppercase font-mono leading-relaxed">
                  [ TERMINAL_NOTICE ]: Requests are pooled and prioritized by community consensus. {citizenCount} citizens are currently watching this entity.
               </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
