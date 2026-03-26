"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { 
  Globe,
  ArrowUpRight, 
  Zap, 
  Building2, 
  Maximize2,
  Church,
  GraduationCap,
  ShoppingBag,
  Utensils,
  Wallet,
  Stethoscope,
  Search,
  MapPin,
  Phone,
  Mail,
  Info,
  Calendar,
  Image as ImageIcon,
  CreditCard,
  CheckCircle2,
  ChevronLeft,
  LayoutDashboard,
  Save,
  Trash2,
  ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Loader2 } from "lucide-react";

interface Facility {
  name: string;
  location: string;
  rating: number;
  featured?: boolean;
  coverImage: string;
  contactNumbers: string[];
  email: string;
  services: string[];
  costs: string;
  about: string;
  gallery: string[];
}

interface DirectoryCategory {
  title: string;
  id: string;
  description: string;
  icon: React.ElementType;
  color: string;
  accent: string;
  items: Facility[];
  tags: string[];
}

const directoryCategories: DirectoryCategory[] = [
  {
    title: "Churches",
    id: "churches",
    description: "Connect with worship centers and community spiritual hubs across the nation.",
    icon: Church,
    color: "bg-blue-600",
    accent: "text-blue-500",
    tags: ["Worship", "Community", "Spiritual"],
    items: [
      { 
        name: "Holy Family Basilica", 
        location: "Nairobi CBD", 
        rating: 4.9, 
        featured: true,
        coverImage: "https://images.unsplash.com/photo-1548625361-9252c7104b2b?auto=format&fit=crop&q=80&w=2000",
        contactNumbers: ["+254 20 2223970", "+254 712 345678"],
        email: "info@holyfamilybasilica.org",
        services: ["Daily Mass", "Confessions", "Marriage Counseling", "Community Outreach"],
        costs: "Tithes & Offerings (Voluntary)",
        about: "The Holy Family Basilica is the seat of the Archdiocese of Nairobi. It is a historic architectural marvel in the heart of the city, serving as a beacon of faith for over a century.",
        gallery: [
          "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1515234507641-fc30f5d72049?auto=format&fit=crop&q=80&w=800"
        ]
      },
      { 
        name: "CITAM Karen", 
        location: "Karen, Nairobi", 
        rating: 4.8,
        coverImage: "https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?auto=format&fit=crop&q=80&w=2000",
        contactNumbers: ["+254 709 891000"],
        email: "karen@citam.org",
        services: ["Youth Ministry", "Sunday Service", "Business Networking", "Family Therapy"],
        costs: "Community Focused",
        about: "CITAM Karen is a vibrant, family-oriented church dedicated to building community through spiritual growth and practical ministry for all ages.",
        gallery: [
          "https://images.unsplash.com/photo-1473177104440-3ec4d5775837?auto=format&fit=crop&q=80&w=800"
        ]
      }
    ]
  },
  {
    title: "Schools",
    id: "schools",
    description: "Explore top-tier educational institutions from primary to higher learning.",
    icon: GraduationCap,
    color: "bg-orange-600",
    accent: "text-orange-500",
    tags: ["Education", "Academic", "Future"],
    items: [
      { 
        name: "Alliance High School", 
        location: "Kikuyu", 
        rating: 4.9, 
        featured: true,
        coverImage: "https://images.unsplash.com/photo-152305085306e-827c624564c4?auto=format&fit=crop&q=80&w=2000",
        contactNumbers: ["+254 20 2012534"],
        email: "info@alliancehighschool.ac.ke",
        services: ["Secondary Education", "STEM Labs", "Sports Academy", "Music Conservatory"],
        costs: "Ksh 53,000 - 80,000 / Year",
        about: "Founded in 1926, Alliance High School is a premier national school in Kenya, consistently ranking among the top academic institutions in the region.",
        gallery: [
          "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800"
        ]
      }
    ]
  },
  {
    title: "Shopping Malls",
    id: "malls",
    description: "Premier retail destinations and recreational spaces for the modern Kenyan.",
    icon: ShoppingBag,
    color: "bg-kenya-red",
    accent: "text-red-500",
    tags: ["Retail", "Lifestyle", "Dining"],
    items: [
      { 
        name: "The Hub Karen", 
        location: "Karen", 
        rating: 4.8, 
        featured: true,
        coverImage: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=2000",
        contactNumbers: ["+254 700 000123"],
        email: "info@thehubkaren.com",
        services: ["Shopping", "Cinema", "Food Court", "Kids Play Zone"],
        costs: "Free Entry",
        about: "The Hub Karen is an award-winning mall offering an open-air lifestyle experience, blending retail therapy with entertainment and dining.",
        gallery: [
          "https://images.unsplash.com/photo-1567449303078-57ad995bd17a?auto=format&fit=crop&q=80&w=800"
        ]
      }
    ]
  },
  {
    title: "Restaurants",
    id: "restaurants",
    description: "A curated list of culinary experiences, from local delights to international cuisine.",
    icon: Utensils,
    color: "bg-amber-600",
    accent: "text-amber-500",
    tags: ["Dining", "Culinary", "Local"],
    items: [
      { 
        name: "Carnivore Restaurant", 
        location: "Lang'ata", 
        rating: 4.7, 
        featured: true,
        coverImage: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=2000",
        contactNumbers: ["+254 722 204301"],
        email: "reservations@tamarind.co.ke",
        services: ["Nyama Choma", "Live Music", "Event Hosting", "Bar & Grill"],
        costs: "Ksh 2,500 - 5,000 / Person",
        about: "Famous for its meat-eating experience, Carnivore is a must-visit for tourists and locals alike, offering a unique 'Beast of a Feast' experience.",
        gallery: [
          "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800"
        ]
      }
    ]
  },
  {
    title: "Banks",
    id: "banks",
    description: "Access reliable financial institutions and secure banking services nationwide.",
    icon: Building2,
    color: "bg-indigo-600",
    accent: "text-indigo-500",
    tags: ["Finance", "Savings", "Secure"],
    items: [
      { 
        name: "Equity Bank HQ", 
        location: "Upper Hill", 
        rating: 4.6, 
        featured: true,
        coverImage: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=2000",
        contactNumbers: ["+254 763 000000"],
        email: "info@equitybank.co.ke",
        services: ["Personal Banking", "SME Loans", "Mobile Money Transfer", "Asset Finance"],
        costs: "Varies by Service",
        about: "Equity Bank is a leading financial services group in East Africa, committed to social and economic transformation of marginalized people.",
        gallery: [
          "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800"
        ]
      }
    ]
  },
  {
    title: "Saccos",
    id: "saccos",
    description: "Empowering communities through collective savings and credit cooperatives.",
    icon: Wallet,
    color: "bg-emerald-600",
    accent: "text-emerald-500",
    tags: ["Credit", "Cooperative", "Growth"],
    items: [
      { 
        name: "Stima Sacco", 
        location: "Mushembi Road", 
        rating: 4.8, 
        featured: true,
        coverImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=2000",
        contactNumbers: ["+254 703 024000"],
        email: "info@stimasacco.com",
        services: ["Savings Plans", "Emergency Loans", "Mortgage Products", "Shares Trading"],
        costs: "Membership Monthly Contribution",
        about: "Stima Sacco is a licensed Deposit Taking Sacco that provides competitive financial products and services to its members globally.",
        gallery: [
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
        ]
      }
    ]
  },
  {
    title: "Health Facilities",
    id: "health",
    description: "Your directory for healthcare, from major hospitals to specialized clinics.",
    icon: Stethoscope,
    color: "bg-kenya-green",
    accent: "text-green-500",
    tags: ["Medical", "Wellness", "Emergency"],
    items: [
      { 
        name: "The Nairobi Hospital", 
        location: "Argwings Kodhek Road", 
        rating: 4.8, 
        featured: true,
        coverImage: "https://images.unsplash.com/photo-1586773860418-d3b9a8ec81a2?auto=format&fit=crop&q=80&w=2000",
        contactNumbers: ["+254 703 082000", "+254 730 062000"],
        email: "info@nairobihospital.org",
        services: ["Emergency Care", "Maternity", "Critical Care", "Diagnostic Imaging", "Pharmacy"],
        costs: "Consultation: Ksh 3,000 - 5,000",
        about: "The Nairobi Hospital is a non-profit hospital that provides high-quality healthcare services through excellence in nursing, medicine, and support services.",
        gallery: [
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1538108176634-89956712b74d?auto=format&fit=crop&q=80&w=800"
        ]
      }
    ]
  }
];

const CategoryCard = ({ category, index, onOpen }: { category: DirectoryCategory, index: number, onOpen: (cat: DirectoryCategory) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
    className="h-full"
  >
    <Card 
      onClick={() => onOpen(category)}
      className="group relative overflow-hidden bg-white/5 border-white/10 hover:border-white/20 transition-all duration-500 rounded-4xl p-6 h-full flex flex-col cursor-pointer hover:bg-white/8 shadow-2xl"
    >
      {/* Dynamic Glow */}
      <div className={`absolute -top-12 -right-12 w-32 h-32 ${category.color} opacity-0 blur-[60px] group-hover:opacity-[0.1] transition-opacity duration-700`} />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-8">
          <div className={`p-4 rounded-2xl ${category.color} text-white shadow-[0_0_20px_rgba(0,0,0,0.3)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
            <category.icon className="w-8 h-8" />
          </div>
          <div className="flex gap-2">
            <div className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white/40 group-hover:text-white group-hover:bg-brand-primary transition-all">
              <Maximize2 className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic group-hover:text-brand-primary transition-colors">
            {category.title}
          </h3>
          <p className="text-sm text-white/50 leading-relaxed font-medium">
            {category.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {category.tags.map(tag => (
            <span 
              key={tag}
              className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black text-white/40 uppercase tracking-widest group-hover:text-white group-hover:border-white/10 transition-all"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto">
          <Button 
             variant="outline"
             className="w-full h-14 rounded-2xl border-white/5 bg-white/5 hover:bg-brand-primary hover:border-brand-primary text-white font-black uppercase tracking-widest text-[11px] group/btn shadow-lg"
          >
            Explore Directory <ArrowUpRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-all" />
          </Button>
        </div>
      </div>
    </Card>
  </motion.div>
);

const FacilityDashboard = ({ 
  facility, 
  onUpdate, 
  onClose,
  isSubmitting
}: { 
  facility: Facility, 
  onUpdate: (u: Partial<Facility>) => void,
  onClose: () => void,
  isSubmitting: boolean
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'contacts' | 'services' | 'gallery'>('info');

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-zinc-950 border-white/10 p-0 overflow-hidden rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.8)]">
        <div className="flex flex-col h-[80vh]">
          {/* Dashboard Header */}
          <div className="p-10 border-b border-white/5 bg-linear-to-br from-white/5 to-transparent relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10">
               <LayoutDashboard size={100} />
            </div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[9px] font-black uppercase tracking-widest border border-brand-primary/20">
                   <ShieldCheck className="w-3 h-3" /> Facility Management Hub
                </div>
                <DialogTitle className="text-4xl font-black text-white italic uppercase tracking-tighter">{facility.name}</DialogTitle>
                <p className="text-white/40 text-sm font-medium">Configure your digital twin and manage citizen engagements.</p>
              </div>
              <div className="flex gap-4">
                 <Button onClick={onClose} variant="outline" className="rounded-2xl border-white/10 text-white font-black uppercase tracking-widest text-[10px]">Close Hub</Button>
              </div>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar Tabs */}
            <div className="w-64 border-r border-white/5 p-6 space-y-2 bg-black/20">
              {[
                { id: 'info', label: 'Basic Info', icon: Info },
                { id: 'contacts', label: 'Contacts', icon: Phone },
                { id: 'services', label: 'Services & Pricing', icon: Zap },
                { id: 'gallery', label: 'Gallery & Media', icon: ImageIcon },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'info' | 'contacts' | 'services' | 'gallery')}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest",
                    activeTab === tab.id ? "bg-brand-primary text-black" : "text-white/40 hover:text-white hover:bg-white/5"
                  )}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-black/40">
              {activeTab === 'info' && (
                <div className="space-y-8 max-w-xl">
                  <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Facility Name</Label>
                    <Input 
                      defaultValue={facility.name} 
                      onBlur={(e) => onUpdate({ name: e.target.value })}
                      className="h-14 bg-white/5 border-white/10 rounded-2xl text-white font-bold" 
                    />
                  </div>
                  <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Location / Address</Label>
                    <Input 
                      defaultValue={facility.location}
                      onBlur={(e) => onUpdate({ location: e.target.value })}
                      className="h-14 bg-white/5 border-white/10 rounded-2xl text-white font-bold" 
                    />
                  </div>
                  <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">About Facility</Label>
                    <textarea 
                      defaultValue={facility.about}
                      onBlur={(e) => onUpdate({ about: e.target.value })}
                      className="w-full h-32 bg-white/5 border-white/10 rounded-2xl p-4 text-white font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'contacts' && (
                <div className="space-y-8 max-w-xl">
                  <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Official Email</Label>
                    <Input 
                      defaultValue={facility.email} 
                      onBlur={(e) => onUpdate({ email: e.target.value })}
                      className="h-14 bg-white/5 border-white/10 rounded-2xl text-white font-bold" 
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Contact Numbers</Label>
                      <Button variant="ghost" className="text-brand-primary text-[10px] font-black uppercase tracking-widest hover:bg-brand-primary/10">Add Phone</Button>
                    </div>
                    <div className="space-y-3">
                      {facility.contactNumbers.map((n, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl group">
                          <span className="text-sm font-bold text-white">{n}</span>
                          <button className="opacity-0 group-hover:opacity-100 text-red-500 transition-all">
                             <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'services' && (
                <div className="space-y-8 max-w-xl">
                  <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Base Pricing Info</Label>
                    <Input 
                      defaultValue={facility.costs}
                      onBlur={(e) => onUpdate({ costs: e.target.value })}
                      className="h-14 bg-white/5 border-white/10 rounded-2xl text-white font-bold" 
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Services Provided</Label>
                      <Button variant="ghost" className="text-brand-primary text-[10px] font-black uppercase tracking-widest hover:bg-brand-primary/10">Add Service</Button>
                    </div>
                    <div className="space-y-3">
                      {facility.services.map((s, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl group">
                          <span className="text-sm font-bold text-white">{s}</span>
                          <button className="opacity-0 group-hover:opacity-100 text-red-500 transition-all">
                             <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {facility.gallery.map((img, i) => (
                      <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-white/5 relative group">
                        <Image 
                          src={img} 
                          alt={`Gallery image ${i + 1}`} 
                          fill 
                          className="object-cover" 
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-4">
                           <button className="p-3 rounded-full bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                             <Trash2 size={20} />
                           </button>
                        </div>
                      </div>
                    ))}
                    <button className="aspect-square rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-white/20 hover:text-brand-primary hover:border-brand-primary hover:bg-brand-primary/5 transition-all gap-3">
                       <Plus size={32} />
                       <span className="text-[10px] font-black uppercase tracking-widest">Upload Media</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-8 border-t border-white/5 bg-zinc-950/80 flex items-center justify-between">
             <div className="flex items-center gap-3 text-[10px] font-black text-white/40 uppercase tracking-widest">
                <CheckCircle2 size={16} className="text-brand-primary" /> Changes autosave as draft
             </div>
             <Button 
                disabled={isSubmitting}
                className="h-14 px-10 rounded-2xl bg-brand-primary text-black font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl shadow-brand-primary/20 flex items-center gap-3"
             >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={18} />}
                Publish Updates
             </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const FacilityProfileView = ({ 
  facility, 
  color, 
  onBack, 
  onBook 
}: { 
  facility: Facility, 
  color: string, 
  onBack: () => void, 
  onBook: () => void 
}) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex flex-col h-full bg-linear-to-b from-zinc-950 to-black"
  >
    {/* Hero Section with Cover Image */}
    <div className="relative h-64 md:h-80 overflow-hidden">
      <Image 
        src={facility.coverImage} 
        alt={facility.name} 
        fill
        priority
        className="object-cover brightness-50"
      />
      <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
      
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="absolute top-6 left-6 rounded-2xl bg-black/40 backdrop-blur-md text-white hover:bg-brand-primary hover:text-black transition-all gap-2 px-4 h-12 border border-white/10"
      >
        <ChevronLeft size={18} />
        <span className="text-[10px] font-black uppercase tracking-widest">Back to List</span>
      </Button>

      <div className="absolute bottom-6 left-8 right-8 space-y-3">
        <div className="flex items-center gap-3">
          <span className={cn("px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white", color)}>
            Verified Hub
          </span>
          <div className="flex items-center gap-1 text-[10px] text-brand-primary font-black uppercase tracking-widest">
            {facility.rating} ★ Rating
          </div>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic drop-shadow-2xl">
          {facility.name}
        </h2>
        <div className="flex items-center gap-2 text-white/60 font-medium">
          <MapPin size={16} className="text-brand-primary" />
          <span className="text-sm">{facility.location}</span>
        </div>
      </div>
    </div>

    <div className="p-8 space-y-10 custom-scrollbar overflow-y-auto max-h-[60vh]">
      {/* Contact & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-white/5 border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-all">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
            <Phone size={12} className="text-brand-primary" /> Contact Details
          </h4>
          <div className="space-y-3 pt-2">
            {facility.contactNumbers.map(num => (
              <a key={num} href={`tel:${num}`} className="flex items-center gap-3 text-white hover:text-brand-primary transition-colors">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                   <Phone size={14} />
                </div>
                <span className="text-sm font-bold tracking-tight">{num}</span>
              </a>
            ))}
            <a href={`mailto:${facility.email}`} className="flex items-center gap-3 text-white hover:text-brand-primary transition-colors">
               <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <Mail size={14} />
               </div>
               <span className="text-sm font-bold tracking-tight">{facility.email}</span>
            </a>
          </div>
        </div>

        <div className="space-y-4 bg-white/5 border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-all">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
             <CreditCard size={12} className="text-brand-primary" /> Service Fees
          </h4>
          <div className="flex items-center gap-4 pt-2">
             <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <Wallet size={24} />
             </div>
             <div>
                <p className="text-xl font-black text-white">{facility.costs}</p>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Base Rate Estimated</p>
             </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
          <Info size={12} className="text-brand-primary" /> About the Facility
        </h4>
        <p className="text-white/70 text-base font-medium leading-relaxed italic border-l-2 border-brand-primary pl-6 py-2">
          &quot;{facility.about}&quot;
        </p>
      </div>

      {/* Services Grid */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
          <Zap size={12} className="text-brand-primary" /> Services Offered
        </h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {facility.services.map(service => (
            <div key={service} className="p-3 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black text-white uppercase tracking-widest text-center hover:bg-white/10 transition-all">
              {service}
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Section */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
          <ImageIcon size={12} className="text-brand-primary" /> Facility Gallery
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {facility.gallery.map((img, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.05 }}
              className="aspect-square rounded-2xl overflow-hidden border border-white/5 cursor-pointer relative group"
            >
              <Image 
                src={img} 
                alt={`${facility.name} Gallery ${i + 1}`} 
                fill
                className="object-cover group-hover:brightness-75 transition-all" 
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <Maximize2 size={20} className="text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* Primary CTA */}
    <div className="mt-auto p-8 border-t border-white/5 bg-zinc-950/80 backdrop-blur-xl">
       <Button 
          onClick={onBook}
          className="w-full h-16 rounded-3xl bg-brand-primary text-black font-black uppercase tracking-widest text-sm hover:bg-white transition-all shadow-[0_0_40px_rgba(1,96,90,0.3)] flex items-center justify-center gap-3"
       >
          <Calendar size={20} />
          Make an Appointment / Booking
       </Button>
    </div>
  </motion.div>
);

const BookingDialog = ({ 
  isOpen, 
  onClose, 
  facility, 
  date, 
  setDate, 
  onSubmit, 
  isSubmitting 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  facility: Facility | null, 
  date: string, 
  setDate: (v: string) => void, 
  onSubmit: (e: React.FormEvent) => void, 
  isSubmitting: boolean 
}) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-md bg-zinc-950 border-white/10 p-0 overflow-hidden rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.8)]">
      <div className="p-8 space-y-6">
        <DialogHeader className="space-y-3 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary mb-2">
             <Calendar size={32} />
          </div>
          <DialogTitle className="text-3xl font-black text-white italic uppercase tracking-tighter">Secure Your Spot</DialogTitle>
          <DialogDescription className="text-white/50 text-sm font-medium">
            Booking at <span className="text-brand-primary font-black">{facility?.name}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Select Appointment Date</Label>
            <Input 
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-brand-primary focus:border-brand-primary text-white font-bold"
              required
            />
          </div>

          <div className="bg-white/5 rounded-2xl p-4 border border-white/5 space-y-3">
             <div className="flex items-center gap-2 text-[9px] font-black text-white/40 uppercase tracking-widest">
                <CheckCircle2 size={10} className="text-brand-primary" /> Community Verified
             </div>
             <p className="text-[10px] text-white/50 leading-relaxed italic">
               &quot;Instant confirmation is subject to the facility&apos;s real-time availability. You will receive an SMS alert.&quot;
             </p>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full h-16 rounded-2xl bg-brand-primary text-black font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl shadow-brand-primary/10"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Official Booking"}
          </Button>
        </form>
      </div>
    </DialogContent>
  </Dialog>
);

export default function DigitalPage() {
  const [selectedCategory, setSelectedCategory] = useState<DirectoryCategory | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [userFacility, setUserFacility] = useState<Facility | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<DirectoryCategory[]>([]);
  const { toast } = useToast();
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      // 1. Fetch User Facility
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: facilityData, error: facilityError } = await supabase
          .from('facilities')
          .select('*')
          .eq('owner_id', user.id)
          .maybeSingle();

        if (facilityData && !facilityError) {
          const mappedFacility: Facility = {
            name: facilityData.name,
            location: facilityData.location,
            rating: Number(facilityData.rating),
            featured: facilityData.featured,
            coverImage: facilityData.cover_image,
            contactNumbers: facilityData.contact_numbers || [],
            email: facilityData.email,
            services: facilityData.services || [],
            costs: facilityData.costs,
            about: facilityData.about,
            gallery: facilityData.gallery || []
          };
          setIsRegistered(true);
          setUserFacility(mappedFacility);
        }
      }

      // 2. Fetch Categories
      const { data: catData, error: catError } = await supabase
        .from('facility_categories')
        .select('*');

      if (catData && !catError) {
        const iconMap: Record<string, React.ElementType> = {
          'Stethoscope': Stethoscope,
          'ShieldCheck': ShieldCheck,
          'GraduationCap': GraduationCap,
          'ShoppingBag': ShoppingBag,
          'Utensils': Utensils,
          'Church': Church,
          'Building2': Building2,
          'Wallet': Wallet
        };

        const mappedCats: DirectoryCategory[] = catData.map(c => ({
          id: c.id,
          title: c.title,
          description: c.description,
          icon: iconMap[c.icon] || MapPin,
          color: c.color || 'bg-zinc-800',
          accent: 'text-brand-primary',
          tags: c.tags || [],
          items: [] // In a real app, we might fetch these too
        }));
        setCategories(mappedCats);
      } else {
        // Fallback to static data if fetch fails
        setCategories(directoryCategories);
      }
    };

    fetchData();
  }, [supabase]);

  const activeCategories = categories.length > 0 ? categories : directoryCategories;

  const filteredCategories = activeCategories.filter(cat => 
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true);
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to register a facility.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const location = formData.get("location") as string;
    const categoryId = formData.get("category") as string;
    
    const dbPayload = {
      owner_id: user.id,
      category_id: categoryId,
      name,
      location,
      rating: 5.0,
      featured: true,
      cover_image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000",
      contact_numbers: ["+254 700 000000"],
      email: "admin@facility.com",
      services: ["General Assistance", "Consultation"],
      costs: "Free for verified citizens",
      about: "Your newly registered facility dedicated to citizen empowerment and community development.",
      gallery: ["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"],
      is_verified: true // Auto-verify for demo
    };

    const { error } = await supabase
      .from('facilities')
      .insert(dbPayload);

    setIsSubmitting(false);
    
    if (error) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    setIsRegisterOpen(false);
    setIsRegistered(true);
    setUserFacility({
      name: dbPayload.name,
      location: dbPayload.location,
      rating: dbPayload.rating,
      featured: dbPayload.featured,
      coverImage: dbPayload.cover_image,
      contactNumbers: dbPayload.contact_numbers,
      email: dbPayload.email,
      services: dbPayload.services,
      costs: dbPayload.costs,
      about: dbPayload.about,
      gallery: dbPayload.gallery
    });
    
    toast({
      title: "Facility Registered Successfully",
      description: "Data has been persisted to the database. You can now manage your hub.",
    });
  };

  const handleUpdateFacility = async (updated: Partial<Facility>) => {
    if (!userFacility) return;
    setIsSubmitting(true);
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Map camelCase to snake_case
    const dbUpdate: Record<string, unknown> = {};
    if (updated.name) dbUpdate['name'] = updated.name;
    if (updated.location) dbUpdate['location'] = updated.location;
    if (updated.coverImage) dbUpdate['cover_image'] = updated.coverImage;
    if (updated.contactNumbers) dbUpdate['contact_numbers'] = updated.contactNumbers;
    if (updated.email) dbUpdate['email'] = updated.email;
    if (updated.services) dbUpdate['services'] = updated.services;
    if (updated.costs) dbUpdate['costs'] = updated.costs;
    if (updated.about) dbUpdate['about'] = updated.about;
    if (updated.gallery) dbUpdate['gallery'] = updated.gallery;

    const { error } = await supabase
      .from('facilities')
      .update(dbUpdate)
      .eq('owner_id', user.id);

    setIsSubmitting(false);

    if (error) {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    setUserFacility({ ...userFacility, ...updated });
    toast({
      title: "Settings Saved",
      description: "Your facility details have been updated and persisted successfully.",
    });
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsBookingOpen(false);
    toast({
      title: "Booking Confirmed",
      description: `Your appointment at ${selectedFacility?.name} for ${bookingDate} has been scheduled.`,
    });
  };

  return (
    <div className="flex flex-col gap-12 p-6 md:p-10 page-transition pb-24 min-h-screen bg-brand-bg relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-kenya-red/5 blur-[150px] -z-10" />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/5">
        <div className="flex flex-col gap-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-widest border border-brand-primary/20"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            KE Digital Local Directory
          </motion.div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase">
              KE <span className="text-brand-primary">DIGITAL</span>
            </h1>
            <p className="text-xl text-white/50 font-medium leading-relaxed max-w-xl">
              The ultimate connected directory of Kenya. Find, navigate, and connect with 
              essential facilities and local hubs across all 47 counties.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-hover:text-brand-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-6 rounded-2xl bg-white/5 border border-white/10 text-white font-bold placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition-all"
            />
          </div>
          <Button 
            onClick={() => isRegistered ? setIsDashboardOpen(true) : setIsRegisterOpen(true)}
            className={cn(
              "h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl whitespace-nowrap",
              isRegistered 
                ? "bg-white text-black hover:bg-brand-primary hover:text-white shadow-white/5" 
                : "bg-brand-primary text-black hover:bg-white shadow-brand-primary/10"
            )}
          >
            {isRegistered ? (
              <><LayoutDashboard className="w-4 h-4 mr-2" /> Login to facility</>
            ) : (
              <><Plus className="w-4 h-4 mr-2" /> Register a Facility</>
            )}
          </Button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {filteredCategories.map((category, index) => (
          <CategoryCard 
            key={category.id} 
            category={category} 
            index={index} 
            onOpen={setSelectedCategory}
          />
        ))}
      </div>

      {/* Quick Access Policy Card (Refined) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mt-12 relative overflow-hidden p-1 bg-linear-to-br from-brand-primary/20 via-transparent to-transparent rounded-[3rem] group"
      >
        <div className="relative z-10 p-12 rounded-[2.9rem] bg-black/40 backdrop-blur-3xl border border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-4 text-center md:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 text-brand-primary text-xs font-black uppercase tracking-widest">
                <Globe className="w-5 h-5" /> Local Intelligence
              </div>
              <h3 className="text-4xl font-black text-white tracking-tighter uppercase italic">Stay Connected Locally</h3>
              <p className="text-white/50 text-lg font-medium leading-relaxed">
                Unlock exclusive real-time data on traffic, public utilities, and community 
                broadcasts for your specific ward. Polify connects the digital to the physical.
              </p>
            </div>
            <Button className="rounded-2xl h-16 px-12 font-black uppercase tracking-widest text-sm bg-brand-primary hover:bg-white hover:text-black transition-all shadow-2xl">
              Enable Proximity Services
            </Button>
          </div>
        </div>
        <div className={`absolute top-0 right-0 w-80 h-80 bg-brand-primary/10 blur-[100px] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
      </motion.div>

      {/* Directory Detail Dialog */}
      <Dialog 
        open={!!selectedCategory} 
        onOpenChange={(open) => {
          if (!open) {
            setSelectedCategory(null);
            setSelectedFacility(null);
          }
        }}
      >
        <DialogContent className="max-w-4xl bg-zinc-950 border-white/10 p-0 overflow-hidden rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] min-h-[60vh]">
          <DialogTitle className="sr-only">
            {selectedFacility ? selectedFacility.name : selectedCategory?.title || "Directory Details"}
          </DialogTitle>
          
          {selectedCategory && (
            <div className="flex flex-col h-full">
              {selectedFacility ? (
                <FacilityProfileView 
                  facility={selectedFacility}
                  color={selectedCategory.color}
                  onBack={() => setSelectedFacility(null)}
                  onBook={() => setIsBookingOpen(true)}
                />
              ) : (
                <div className="flex flex-col">
                  <div className={cn("p-10 text-white relative overflow-hidden", selectedCategory.color)}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-black/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                    
                    <div className="relative z-10 space-y-6">
                      <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-xl">
                        <selectedCategory.icon size={32} />
                      </div>
                      <div>
                        <DialogTitle className="text-4xl font-black tracking-tighter uppercase italic">{selectedCategory.title}</DialogTitle>
                        <p className="text-white/80 font-medium mt-2">{selectedCategory.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Suggested Hubs</h4>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 rounded-lg bg-white/5 text-[9px] font-black text-brand-primary uppercase tracking-widest">Top Rated</span>
                      </div>
                    </div>

                    <div className="space-y-4 max-h-[40vh] overflow-y-auto custom-scrollbar pr-2">
                      {selectedCategory.items.map((item, idx) => (
                        <motion.div 
                          key={item.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          onClick={() => setSelectedFacility(item)}
                          className="group/item flex items-center justify-between p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-5">
                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white/40 group-hover/item:text-white transition-colors", selectedCategory.color, "bg-opacity-20")}>
                              <MapPin size={24} />
                            </div>
                            <div>
                              <h5 className="font-black text-white text-lg tracking-tight flex items-center gap-2">
                                {item.name}
                                {item.featured && <Zap className="w-4 h-4 text-brand-primary fill-current" />}
                              </h5>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs text-white/40 font-bold">{item.location}</span>
                                <span className="w-1 h-1 rounded-full bg-white/10" />
                                <span className="text-[10px] text-brand-primary font-black uppercase tracking-widest">{item.rating} ★ Rating</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" className="rounded-xl w-12 h-12 p-0 text-brand-primary hover:text-white hover:bg-brand-primary transition-all">
                            <ArrowUpRight size={20} />
                          </Button>
                        </motion.div>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-white/5 flex gap-4">
                      <Button className="flex-1 h-14 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-brand-primary hover:text-white transition-all">
                        View Interactive Map
                      </Button>
                      <Button variant="outline" className="h-14 px-8 rounded-2xl border-white/10 text-white/40 font-black uppercase tracking-widest text-xs hover:text-white hover:bg-white/5">
                        Sync to GPS
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Booking Dialog */}
      <BookingDialog 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        facility={selectedFacility}
        date={bookingDate}
        setDate={setBookingDate}
        onSubmit={handleBooking}
        isSubmitting={isSubmitting}
      />
      {/* Facility Registration Modal */}
      <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
        <DialogContent className="max-w-md bg-zinc-950 border-white/10 p-0 overflow-hidden rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.8)]">
          <div className="p-8 space-y-6">
            <DialogHeader className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[9px] font-black uppercase tracking-widest border border-brand-primary/20 w-fit">
                 <Building2 className="w-3 h-3" /> Facility Registration
              </div>
              <DialogTitle className="text-3xl font-black text-white italic uppercase tracking-tighter">Register New Hub</DialogTitle>
              <DialogDescription className="text-white/50 text-sm font-medium">
                Contribute to the KE Digital directory by adding missing facilities in your neighborhood.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-white/40">Facility Name</Label>
                <Input 
                  id="name" 
                  name="name"
                  placeholder="e.g. St. Peters Community Center" 
                  className="h-12 bg-white/5 border-white/10 rounded-xl focus:ring-brand-primary focus:border-brand-primary text-white" 
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-[10px] font-black uppercase tracking-widest text-white/40">Category</Label>
                <Select name="category" required>
                  <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-white">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-white/10 text-white">
                    {activeCategories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id} className="focus:bg-brand-primary focus:text-black">
                        {cat.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-[10px] font-black uppercase tracking-widest text-white/40">Location / Ward</Label>
                <Input 
                  id="location" 
                  name="location"
                  placeholder="e.g. Ruiru, Kiambu" 
                  className="h-12 bg-white/5 border-white/10 rounded-xl focus:ring-brand-primary focus:border-brand-primary text-white" 
                  required
                />
              </div>

              <DialogFooter className="pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-14 rounded-2xl bg-brand-primary text-black font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl shadow-brand-primary/10"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Complete Registration"}
                </Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      {/* Facility Dashboard Modal */}
      {isDashboardOpen && userFacility && (
        <FacilityDashboard 
          facility={userFacility}
          onUpdate={handleUpdateFacility}
          onClose={() => setIsDashboardOpen(false)}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
