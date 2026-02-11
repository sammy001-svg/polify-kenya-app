"use client";

import { MarketplaceItem } from "@/app/(platform)/marketplace/actions";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, User, Star } from "lucide-react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface MarketplaceCardProps {
  item: MarketplaceItem;
}

export function MarketplaceCard({ item }: MarketplaceCardProps) {
  const { toast } = useToast();
  const [showPhone, setShowPhone] = useState(false);

  const handleContact = () => {
    setShowPhone(!showPhone);
    if (!showPhone) {
      toast({
        title: "Seller Contact Revealed",
        description: `You can now contact ${item.seller_name}.`,
      });
    }
  };

  return (
    <Card className="group overflow-hidden bg-brand-surface/40 backdrop-blur-md border-white/10 hover:border-brand-primary/30 transition-all duration-300 flex flex-col h-full hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
      <div className="relative h-48 w-full bg-brand-bg/50 overflow-hidden">
        <Image
          src={item.image_url}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        <Badge className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white border-white/10">
          KES {item.price.toLocaleString()}
        </Badge>
        <Badge variant="secondary" className="absolute top-3 left-3 bg-brand-primary/90 text-black font-bold">
           {item.category}
        </Badge>
      </div>

      <CardHeader className="pb-2 pt-4">
        <div className="flex justify-between items-start gap-2">
           <CardTitle className="text-lg font-bold text-white group-hover:text-brand-primary transition-colors line-clamp-1">
            {item.title}
          </CardTitle>
        </div>
        <div className="flex items-center gap-2 text-xs text-brand-text-muted">
           <MapPin className="w-3 h-3" />
           <span>{item.location}</span>
           <span className="mx-1">•</span>
           <span>{formatDistanceToNow(new Date(item.posted_at), { addSuffix: true })}</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 grow">
        <CardDescription className="line-clamp-2 text-sm leading-relaxed text-white/70">
          {item.description}
        </CardDescription>

        <div className="flex items-center justify-between pt-2 border-t border-white/5">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
               <User className="w-4 h-4 text-white" />
             </div>
             <div className="flex flex-col">
               <span className="text-xs font-bold text-white">{item.seller_name}</span>
               <div className="flex items-center gap-1">
                 <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                 <span className="text-[10px] text-brand-text-muted">{item.seller_rating}</span>
               </div>
             </div>
           </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <Button 
          onClick={handleContact}
          className="w-full bg-white/5 hover:bg-brand-primary hover:text-black text-white border border-white/10 transition-all font-bold group-hover:border-brand-primary/50"
        >
            {showPhone ? (
               <a href={`tel:${item.contact_phone}`} className="flex items-center gap-2">
                 <Phone className="w-4 h-4" />
                 {item.contact_phone}
               </a>
            ) : (
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Contact Seller
              </span>
            )}
        </Button>
      </CardFooter>
    </Card>
  );
}
