"use client";

import React, { useState } from "react";
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
  Navigation
} from "lucide-react";
import { motion } from "framer-motion";
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
import { useToast } from "@/components/ui/use-toast";
import { Plus, Loader2 } from "lucide-react";

interface Facility {
  name: string;
  location: string;
  rating: number;
  featured?: boolean;
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
      { name: "Holy Family Basilica", location: "Nairobi CBD", rating: 4.9, featured: true },
      { name: "CITAM Karen", location: "Karen, Nairobi", rating: 4.8 },
      { name: "ACK Garden Estate", location: "Garden Estate, Nairobi", rating: 4.7 }
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
      { name: "Alliance High School", location: "Kikuyu", rating: 4.9, featured: true },
      { name: "The Kenya High School", location: "Kileleshwa", rating: 4.9 },
      { name: "Strathmore School", location: "Lavington", rating: 4.8 }
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
      { name: "The Hub Karen", location: "Karen", rating: 4.8, featured: true },
      { name: "Two Rivers Mall", location: "Limuru Road", rating: 4.8 },
      { name: "Village Market", location: "Gigiri", rating: 4.7 }
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
      { name: "Carnivore Restaurant", location: "Lang'ata", rating: 4.7, featured: true },
      { name: "CJ's Coffee House", location: "Multiple Locations", rating: 4.8 },
      { name: "Fogo Gaucho", location: "Westlands", rating: 4.8 }
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
      { name: "Equity Bank HQ", location: "Upper Hill", rating: 4.6, featured: true },
      { name: "KCB Bank", location: "Kencom House", rating: 4.5 },
      { name: "NCBA Bank", location: "Westlands", rating: 4.7 }
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
      { name: "Stima Sacco", location: "Mushembi Road", rating: 4.8, featured: true },
      { name: "Harambee Sacco", location: "CBD", rating: 4.7 },
      { name: "Mwalimu National Sacco", location: "Upper Hill", rating: 4.7 }
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
      { name: "The Nairobi Hospital", location: "Argwings Kodhek Road", rating: 4.8, featured: true },
      { name: "Aga Khan University Hospital", location: "Parklands", rating: 4.7 },
      { name: "MP Shah Hospital", location: "Parklands", rating: 4.6 }
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

export default function DigitalPage() {
  const [selectedCategory, setSelectedCategory] = useState<DirectoryCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const filteredCategories = directoryCategories.filter(cat => 
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsRegisterOpen(false);
    toast({
      title: "Facility Submitted",
      description: "Our community guardians will verify and add it shortly.",
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
            onClick={() => setIsRegisterOpen(true)}
            className="h-14 px-8 rounded-2xl bg-brand-primary text-black font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl shadow-brand-primary/10 whitespace-nowrap"
          >
            <Plus className="w-4 h-4 mr-2" /> Register a Facility
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
        onOpenChange={(open) => !open && setSelectedCategory(null)}
      >
        <DialogContent className="max-w-2xl bg-zinc-950 border-white/10 p-0 overflow-hidden rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.8)]">
          <DialogTitle className="sr-only">
            {selectedCategory?.title || "Directory Category Details"}
          </DialogTitle>
          {selectedCategory && (
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

                <div className="space-y-4">
                  {selectedCategory.items.map((item, idx) => (
                    <motion.div 
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
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
                      <Button variant="ghost" className="rounded-xl w-12 h-12 p-0 text-white/20 hover:text-white hover:bg-brand-primary transition-all">
                        <Navigation size={20} />
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
        </DialogContent>
      </Dialog>
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
                  placeholder="e.g. St. Peters Community Center" 
                  className="h-12 bg-white/5 border-white/10 rounded-xl focus:ring-brand-primary focus:border-brand-primary text-white" 
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-[10px] font-black uppercase tracking-widest text-white/40">Category</Label>
                <Select required>
                  <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-xl text-white">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-white/10 text-white">
                    {directoryCategories.map(cat => (
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
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit for Verification"}
                </Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
