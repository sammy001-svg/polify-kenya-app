"use client";

import { useState } from "react";
import { MarketplaceItem } from "./actions";
import { MarketplaceCard } from "@/components/marketplace/MarketplaceCard";
import { Search, Filter, ShoppingBag, MapPin, Store, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerBusiness, BusinessProfile } from "./business-actions";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";

interface MarketplaceClientProps {
  initialItems: MarketplaceItem[];
  businessProfile: BusinessProfile | null;
}

export function MarketplaceClient({ initialItems, businessProfile }: MarketplaceClientProps) {
  const [items] = useState<MarketplaceItem[]>(initialItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isRegistering, setIsRegistering] = useState(false);
  const { cartCount } = useCart();

  const categories = ["All", "Agriculture", "Handicrafts", "Services", "Clothing", "Tech", "Other"];

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  async function onRegister(formData: FormData) {
      setIsRegistering(true);
      try {
          await registerBusiness(formData);
      } catch (error) {
          console.error(error);
      } finally {
          setIsRegistering(false);
      }
  }

  return (
    <div className="space-y-10 pb-20">
      {/* Hero Section */}
      <section className="relative h-[250px] md:h-[300px] rounded-3xl overflow-hidden mb-8 group">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0 bg-linear-to-r from-kenya-black via-kenya-black/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555529733-0e670560f7e1?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700" />
        
        <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-12 max-w-2xl space-y-4">
          <div className="flex items-center gap-2 text-brand-primary uppercase tracking-widest text-xs font-black">
             <ShoppingBag className="w-4 h-4" />
             <span>Buy & Sell Local</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold italic tracking-tighter text-white leading-none">
            MKENYA <span className="title-green">MARKETPLACE</span>
          </h1>
          <p className="text-lg text-white/70 font-medium leading-relaxed max-w-lg">
            Support local businesses, discover unique handicrafts, and trade within your community.
          </p>
          
          <div className="pt-4">
            {businessProfile ? (
              <Button asChild className="bg-kenya-green hover:bg-kenya-deep text-white rounded-full font-bold">
                <Link href="/marketplace/business">
                  <Store className="w-4 h-4 mr-2" />
                  Login to Business Profile
                </Link>
              </Button>
            ) : (
                <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-white text-black hover:bg-white/90 rounded-full font-bold">
                    <Plus className="w-4 h-4 mr-2" />
                    Register Your Business
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-brand-surface border-white/10 text-white">
                  <DialogHeader>
                    <DialogTitle>Register Business Profile</DialogTitle>
                    <DialogDescription className="text-white/60">
                      Create your business profile to start selling products and services.
                    </DialogDescription>
                  </DialogHeader>
                  <form action={onRegister} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="businessName" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="businessName"
                        name="businessName"
                        placeholder="Mama Mboga Organics"
                        className="col-span-3 bg-white/5 border-white/10"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="location" className="text-right">
                        Location
                      </Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="Nairobi, Westlands"
                        className="col-span-3 bg-white/5 border-white/10"
                        required
                      />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="phone" className="text-right">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="+254..."
                         className="col-span-3 bg-white/5 border-white/10"
                        required
                      />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="contact@business.com"
                         className="col-span-3 bg-white/5 border-white/10"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        About
                      </Label>
                      {/* Using simple textarea for now as Textarea component might strictly need ref forwarding if not checking */}
                      <textarea
                        id="description"
                        name="description"
                        placeholder="Tell us about your business..."
                        className="col-span-3 flex min-h-[80px] w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={isRegistering} className="bg-kenya-green text-white">
                        {isRegistering ? "Registering..." : "Create Profile"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </section>

      {/* Control Bar */}
      <div className="sticky top-20 z-40 flex flex-col md:flex-row gap-4 justify-between items-center bg-black/80 p-4 rounded-2xl border border-white/10 backdrop-blur-2xl transition-all duration-300 shadow-xl">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted" />
            <input
              type="text"
              placeholder="Search items, sellers, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-surface border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-primary transition-colors placeholder:text-white/20"
            />
          </div>
          <div className="h-8 w-px bg-white/10 hidden md:block" />
          <Filter className="w-4 h-4 text-brand-text-muted cursor-pointer hover:text-brand-primary transition-colors hidden md:block" />
          <Button asChild size="sm" className="bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-black font-bold ml-2 relative">
            <Link href="/marketplace/cart">
              <ShoppingBag className="w-4 h-4 mr-2" />
              View Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-black shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar items-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all border",
                activeCategory === cat
                  ? "bg-kenya-green text-white border-kenya-green shadow-[0_0_10px_rgba(0,140,81,0.3)]"
                  : "bg-white/5 text-green-400 border-white/10 hover:border-green-400/50 hover:bg-white/10",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Item List */}
      <div className="space-y-4">
          <div className="flex items-center justify-between text-brand-text-muted text-xs uppercase tracking-widest font-bold px-1"> 
             <span>{filteredItems.length} {filteredItems.length === 1 ? 'Item' : 'Items'} Found</span>
             <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> All Locations</span>
          </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-24 bg-brand-surface/20 rounded-3xl border border-dashed border-white/10 flex flex-col items-center space-y-6">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center animate-pulse">
              <Search className="w-8 h-8 text-brand-text-muted opacity-30" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black italic tracking-tighter text-white">
                No Items Found
              </h3>
              <p className="text-brand-text-muted max-w-xs mx-auto text-sm font-medium">
                Try adjusting your search terms or filters to find what you&apos;re looking for.
              </p>
            </div>
            <Button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              variant="outline"
              className="rounded-full border-white/20 text-xs font-black uppercase tracking-widest px-8 hover:bg-white/10 hover:text-white"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <MarketplaceCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
