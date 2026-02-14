"use client";

import { MarketplaceItem } from "@/app/(platform)/marketplace/actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, User, Star, ShoppingCart, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface ProductDetailClientProps {
  item: MarketplaceItem;
}

import { useCart } from "@/hooks/use-cart";

// ... inside component

export function ProductDetailClient({ item }: ProductDetailClientProps) {
  const { toast } = useToast();
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart, cartCount } = useCart();

  const handleAddToCart = () => {
    addToCart(item);
    
    setIsAdded(true);
    toast({
      title: "Added to Cart",
      description: `${item.title} has been added to your cart.`,
    });
    
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-6 flex justify-between items-center">
        <Button variant="ghost" asChild className="text-brand-text-muted hover:text-white pl-0 gap-2">
          <Link href="/marketplace">
            <ArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </Link>
        </Button>
        
        <Button asChild size="sm" className="bg-white/5 text-white hover:bg-white/10 border border-white/10 relative">
            <Link href="/marketplace/cart">
                <ShoppingCart className="w-4 h-4 mr-2" />
                View Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-black shadow-sm">
                    {cartCount}
                  </span>
                )}
            </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-white/10 bg-kenya-deep">
            <Image
              src={item.image_url}
              alt={item.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-brand-primary/90 text-black font-bold text-sm px-3 py-1">
                {item.category}
              </Badge>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
             {/* Placeholder for potential gallery thumbnails */}
             {[...Array(4)].map((_, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-brand-surface/30 opacity-50 hover:opacity-100 cursor-pointer transition-opacity">
                    <Image
                        src={item.image_url}
                        alt={`Thumbnail ${i + 1}`}
                        fill
                        className="object-cover"
                    />
                </div>
             ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{item.title}</h1>
            <div className="flex items-center gap-4 text-brand-text-muted text-sm border-b border-white/10 pb-6">
                <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>{item.location}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/20" />
                <span>{formatDistanceToNow(new Date(item.posted_at), { addSuffix: true })}</span>
            </div>
          </div>

          <div className="space-y-4">
             <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-kenya-green">KES {item.price.toLocaleString()}</span>
             </div>
             <p className="text-brand-text-muted leading-relaxed">
                {item.description}
             </p>
          </div>

          <div className="p-6 rounded-3xl bg-kenya-deep border border-kenya-green/20">
            <h3 className="font-bold text-lg text-white mb-4">Seller Information</h3>
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                        <User className="w-6 h-6 text-brand-primary" />
                    </div>
                    <div>
                        <div className="font-bold text-white">{item.seller_name}</div>
                        <div className="flex items-center gap-1 text-xs text-brand-text-muted">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span>{item.seller_rating} Rating</span>
                        </div>
                    </div>
                </div>
             </div>
          </div>

          <div className="pt-4">
            <Button 
                size="lg" 
                className={`w-full text-lg font-bold h-14 rounded-xl transition-all ${isAdded ? 'bg-green-600 hover:bg-green-700' : 'bg-brand-primary text-black hover:bg-brand-primary/90'}`}
                onClick={handleAddToCart}
                disabled={isAdded}
            >
                {isAdded ? (
                    <>
                        <Check className="w-5 h-5 mr-2" />
                        Added to Cart
                    </>
                ) : (
                    <>
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                    </>
                )}
            </Button>
            <p className="text-xs text-center text-brand-text-muted mt-3">
                Secure transaction protected by M-Kenya Guarantee
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
