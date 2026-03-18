"use client";

import React, { useState } from "react";
import { 
  Globe,
  ReceiptText, 
  ArrowUpRight, 
  ExternalLink, 
  Zap, 
  Car, 
  Plane, 
  Building2, 
  Fingerprint, 
  Scale, 
  Coins, 
  CheckCircle2,
  Maximize2
} from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const kraServices = [
  {
    title: "iTax Portal",
    id: "itax",
    description: "Personal and business tax returns, PIN registration, and TCC applications.",
    icon: ReceiptText,
    color: "bg-kenya-red",
    href: "https://itax.kra.go.ke/",
    tags: ["Returns", "PIN", "TCC"],
    restricted: true
  },
  {
    title: "Customs (iCMS)",
    id: "icms",
    description: "Manage import/export declarations, cargo tracking, and customs clearing.",
    icon: Coins,
    color: "bg-amber-600",
    href: "https://icmscas.kra.go.ke/cas/login?service=https%3A%2F%2Ficms.kra.go.ke%3A36081%2Fwelcome.jsp",
    tags: ["Imports", "Exports", "Cargo"],
    restricted: true
  },
  {
    title: "M-Service",
    id: "m-service",
    description: "Access KRA services on the go via mobile app or USSD *572#.",
    icon: Zap,
    color: "bg-slate-700",
    href: "https://www.kra.go.ke/en/helping-tax-payers/m-service",
    tags: ["Mobile", "USSD", "App"]
  },
  {
    title: "PIN Checker",
    id: "pin-checker",
    description: "Verify the validity of a PIN and the taxpayer's compliance status.",
    icon: CheckCircle2,
    color: "bg-kenya-red",
    href: "https://itax.kra.go.ke/KRA-Portal/pinChecker.htm",
    tags: ["Verify", "Compliance"]
  }
];

const ecitizenServices = [
  {
    title: "NTSA (TIMS/v2)",
    id: "ntsa",
    description: "Driving licenses, vehicle registration, and logbook applications.",
    icon: Car,
    color: "bg-kenya-green",
    href: "https://serviceportal.ntsa.go.ke/",
    tags: ["DL", "Logbooks", "Vehicle"],
    restricted: true
  },
  {
    title: "Immigration",
    id: "passport",
    description: "Apply for passports, visas, and track immigration status.",
    icon: Plane,
    color: "bg-blue-600",
    href: "https://immigration.ecitizen.go.ke/",
    tags: ["Passport", "Visa", "E-Visa"]
  },
  {
    title: "Business (BRS)",
    id: "brs",
    description: "Register businesses, companies, and manage annual returns.",
    icon: Building2,
    color: "bg-emerald-600",
    href: "https://brs.ecitizen.go.ke/",
    tags: ["Companies", "Partnerships"]
  },
  {
    title: "Civil Registration",
    id: "civil",
    description: "Birth/death certificates and marriage licenses registration.",
    icon: Fingerprint,
    color: "bg-kenya-green",
    href: "https://crs.ecitizen.go.ke/",
    tags: ["Birth Cert", "Marriage"]
  }
];

interface Service {
  title: string;
  id: string;
  description: string;
  icon: React.ElementType;
  color: string;
  href: string;
  tags: string[];
  restricted?: boolean;
}

interface ServiceCardProps {
  service: Service;
  index: number;
  onOpen: (service: Service) => void;
}

const ServiceCard = ({ service, index, onOpen }: ServiceCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
  >
    <Card 
      onClick={() => onOpen(service)}
      className="group relative overflow-hidden bg-white/5 border-white/10 hover:border-white/20 transition-all duration-500 rounded-4xl p-6 h-full flex flex-col cursor-pointer hover:bg-white/8"
    >
      {/* Decorative Background Glow */}
      <div className={`absolute -top-12 -right-12 w-24 h-24 ${service.color} opacity-[0.03] blur-[60px] group-hover:opacity-[0.1] transition-opacity duration-700`} />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-6">
          <div className={`p-3 rounded-xl ${service.color}/20 text-white shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
            <service.icon className="w-6 h-6" />
          </div>
          <div className="p-2 rounded-full bg-white/5 border border-white/10 text-white/40 group-hover:text-white group-hover:bg-white/10 transition-all">
            <Maximize2 className="w-4 h-4" />
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <h3 className="text-xl font-black text-white tracking-tight">
            {service.title}
          </h3>
          <p className="text-sm text-white/50 leading-relaxed font-medium">
            {service.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-8">
          {service.tags.map(tag => (
            <span 
              key={tag}
              className="px-2 py-1 rounded-lg bg-white/5 border border-white/5 text-[9px] font-bold text-white/60 uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto">
          <Button 
             variant="ghost"
             className="w-full h-12 rounded-xl border border-white/5 hover:bg-white/5 text-white/70 hover:text-white group/btn"
             onClick={(e) => {
               e.stopPropagation();
               onOpen(service);
             }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest">
              Launch Portal <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </span>
          </Button>
        </div>
      </div>
    </Card>
  </motion.div>
);

export default function DigitalPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isLaunched, setIsLaunched] = useState(false);

  return (
    <div className="flex flex-col gap-12 p-6 md:p-10 page-transition pb-24">
      {/* Header Section */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-kenya-green/10 text-kenya-green text-xs font-black uppercase tracking-widest border border-kenya-green/20"
        >
          <Zap className="w-3 h-3 fill-current" />
          Digital Transformation
        </motion.div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white font-dancing">
          KE <span className="text-kenya-green">DIGITAL</span>
        </h1>
        
        <p className="text-lg text-white/60 font-medium leading-relaxed">
          The unified directory for Kenya&apos;s digital government services. Access tax portals, citizen registration, 
          and track regulatory policies in one place.
        </p>
      </div>

      {/* KRA Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-1 bg-kenya-red rounded-full" />
          <h2 className="text-2xl font-black text-white tracking-tight uppercase">Revenue & Tax (KRA)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {kraServices.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index} 
              onOpen={setSelectedService} 
            />
          ))}
        </div>
      </section>

      {/* eCitizen Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-1 bg-kenya-green rounded-full" />
          <h2 className="text-2xl font-black text-white tracking-tight uppercase">Citizen Services (eCitizen)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {ecitizenServices.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index} 
              onOpen={setSelectedService} 
            />
          ))}
        </div>
      </section>

      {/* Tech Policy Tracker (Re-styled) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden p-1 bg-linear-to-br from-kenya-green/20 via-transparent to-transparent rounded-[3rem]"
      >
        <div className="relative z-10 p-10 rounded-[2.9rem] bg-black/40 backdrop-blur-xl border border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left max-w-xl">
              <div className="inline-flex items-center gap-2 text-kenya-green text-xs font-black uppercase tracking-widest mb-1">
                <Scale className="w-4 h-4" /> Regulatory Watch
              </div>
              <h3 className="text-3xl font-black text-white tracking-tight">Digital Policy Tracker</h3>
              <p className="text-white/50 font-medium leading-relaxed">
                Stay updated on digital ID rollout, AI ethical guidelines, and data protection 
                laws currently being debated in Parliament.
              </p>
            </div>
            <Button variant="outline" className="rounded-2xl h-14 px-10 font-black uppercase tracking-widest text-[11px] border-white/10 hover:bg-white/5">
              Explore Policy Map
            </Button>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-kenya-green/5 blur-[100px] z-0" />
      </motion.div>

      {/* Service Popup Dialog */}
      <Dialog 
        open={!!selectedService} 
        onOpenChange={(open) => {
          if (!open) {
            setSelectedService(null);
            setIsLaunched(false);
          }
        }}
      >
        <DialogContent className="max-w-[95vw] w-[1400px] h-[90vh] p-0 bg-black/90 backdrop-blur-3xl border-white/10 overflow-hidden flex flex-col gap-0 rounded-4xl sm:rounded-4xl">
          <DialogHeader className="p-4 md:p-6 border-b border-white/5 flex flex-row items-center justify-between shrink-0 space-y-0">
            <div className="flex items-center gap-4">
              {selectedService && (
                <div className={`p-2 rounded-lg ${selectedService.color}/20 text-white`}>
                  <selectedService.icon className="w-5 h-5" />
                </div>
              )}
              <div className="space-y-0.5">
                <DialogTitle className="text-xl font-black text-white tracking-tight">
                  {selectedService?.title}
                </DialogTitle>
                <div className="flex items-center gap-2 text-[10px] text-white/40 font-bold uppercase tracking-widest">
                  <Globe className="w-3 h-3" /> System Secure Access
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 pr-8">
              <Button 
                variant="outline" 
                size="sm"
                className="h-9 rounded-xl border-white/10 hover:bg-white/10 text-white/60 hover:text-white hidden md:flex"
                asChild
              >
                <a href={selectedService?.href} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" /> Open in New Tab
                </a>
              </Button>
            </div>
          </DialogHeader>

          <div className="flex-1 w-full bg-slate-900 relative">
            {selectedService && (
              <>
                {selectedService.restricted && !isLaunched ? (
                   /* Secure Gateway UI (Shown before user launches) */
                   <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-8 bg-black/60 backdrop-blur-md z-30">
                     <motion.div 
                       initial={{ scale: 0.9, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       className={`p-8 rounded-[3rem] ${selectedService.color}/10 border border-white/5 shadow-2xl relative overflow-hidden group`}
                     >
                       <div className={`absolute inset-0 ${selectedService.color} opacity-[0.05] blur-3xl group-hover:opacity-[0.1] transition-opacity`} />
                       <selectedService.icon className="w-20 h-20 text-white relative z-10" />
                     </motion.div>

                     <div className="space-y-3 max-w-md">
                       <h4 className="text-3xl font-black text-white tracking-tight uppercase italic">
                         Secure <span className="text-kenya-green not-italic">Gateway</span>
                       </h4>
                       <p className="text-white/50 font-medium leading-relaxed">
                         This government portal requires a high-security connection. 
                         Click below to attempt loading the portal within this screen.
                       </p>
                     </div>

                     <Button 
                       size="lg"
                       onClick={() => setIsLaunched(true)}
                       className="rounded-2xl h-16 px-12 font-black uppercase tracking-widest text-sm bg-white text-black hover:bg-white/90 shadow-[0_0_50px_rgba(255,255,255,0.1)] group"
                     >
                       Launch Portal <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                     </Button>
                   </div>
                ) : (
                  <>
                    {/* Background Fallback (visible if iframe is blocked or transparent) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-6">
                      <div className={`p-6 rounded-3xl ${selectedService.color}/10 border border-${selectedService.color}/20 animate-pulse`}>
                        <selectedService.icon className="w-12 h-12 text-white/20" />
                      </div>
                      <div className="space-y-2 max-w-sm">
                        <h4 className="text-xl font-bold text-white">Opening Secure Portal</h4>
                        <p className="text-sm text-white/40 leading-relaxed">
                          If the portal does not load within a few seconds, it may be restricted for security reasons.
                        </p>
                      </div>
                      <Button 
                        className="rounded-2xl h-14 px-10 font-black uppercase tracking-widest text-xs bg-white text-black hover:bg-white/90"
                        asChild
                      >
                        <a href={selectedService.href} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" /> Open Portal Manually
                        </a>
                      </Button>
                    </div>

                    <iframe 
                      src={selectedService.href}
                      className="w-full h-full border-none relative z-10 bg-white"
                      title={selectedService.title}
                      loading="lazy"
                    />
                  </>
                )}
              </>
            )}
            
            {/* Bottom Info Bar */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-black to-transparent z-20 pointer-events-none">
              <p className="text-[10px] text-white/40 font-medium text-center italic">
                Secure Tunnel via KE DIGITAL • External government infrastructure applied
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
