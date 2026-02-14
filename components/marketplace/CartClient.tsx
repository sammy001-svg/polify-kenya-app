"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, ArrowRight, ShoppingBag, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function CartClient() {
  const { cartItems, removeFromCart, mounted } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  if (!mounted) return null;

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Shopping Cart</h1>
        <p className="text-brand-text-muted">Review your items before checkout</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-brand-surface/30 rounded-3xl border border-dashed border-white/10">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-8 h-8 text-brand-text-muted opacity-50" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Your cart is empty</h2>
          <p className="text-brand-text-muted mb-8">Looks like you haven&apos;t added anything yet.</p>
          <Button asChild className="bg-brand-primary text-black hover:bg-brand-primary/90 font-bold rounded-full">
            <Link href="/marketplace">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <Card key={`${item.id}-${index}`} className="bg-kenya-deep border-kenya-green/20 text-white overflow-hidden">
                <CardContent className="p-4 flex gap-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-white/5 shrink-0">
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg line-clamp-1">{item.title}</h3>
                        <p className="text-sm text-brand-text-muted">{item.category}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-400 hover:text-red-300 hover:bg-red-400/10 h-8 w-8"
                        onClick={() => removeFromCart(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between items-end">
                      <p className="text-xs text-brand-text-muted">Sold by {item.seller_name}</p>
                      <p className="font-bold text-kenya-green">KES {item.price.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-kenya-deep border-kenya-green/20 text-white sticky top-24">
              <CardContent className="p-6 space-y-6">
                <h3 className="font-bold text-lg">Order Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-brand-text-muted">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>KES {total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-brand-text-muted">
                    <span>Processing Fee</span>
                    <span>KES 0</span>
                  </div>
                  <Separator className="bg-white/10" />
                  <div className="flex justify-between font-bold text-lg text-white">
                    <span>Total</span>
                    <span>KES {total.toLocaleString()}</span>
                  </div>
                </div>
                
                <Button asChild className="w-full bg-kenya-green hover:bg-kenya-deep text-white font-bold h-12 rounded-xl">
                    <Link href="/marketplace/checkout">
                        Proceed to Checkout
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                </Button>
                
                 <Button asChild variant="ghost" className="w-full text-brand-text-muted hover:text-white">
                    <Link href="/marketplace">
                         <ArrowLeft className="w-4 h-4 mr-2" />
                        Continue Shopping
                    </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
