"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Check, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/hooks/use-cart";

export function CheckoutClient() {
  const { cartItems, mounted } = useCart();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setLoading(false);
    setIsSuccess(true);
    
    // We should ideally clear the cart here using a method from useCart, 
    // but for now we'll just clear storage which useCart listens to.
    localStorage.removeItem("marketplace_cart");
    window.dispatchEvent(new Event("marketplace_cart_updated"));
    
    toast({
      title: "Order Placed Successfully",
      description: "You will receive a confirmation SMS shortly.",
    });
  };

  if (!mounted) return null;

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-6">
        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto animate-bounce">
            <Check className="w-12 h-12 text-kenya-green" />
        </div>
        <h1 className="text-3xl font-bold text-white">Order Confirmed!</h1>
        <p className="text-brand-text-muted">
            Thank you for your purchase. Your order has been placed successfully and the seller has been notified.
        </p>
        <Button asChild className="bg-brand-primary text-black hover:bg-brand-primary/90 font-bold rounded-full px-8">
            <Link href="/marketplace">Return to Marketplace</Link>
        </Button>
      </div>
    );
  }

  if (cartItems.length === 0) {
      return (
        <div className="text-center py-20">
            <h2 className="text-xl font-bold text-white mb-4">Your cart is empty</h2>
             <Button asChild variant="outline" className="border-white/10 text-white hover:bg-white/5">
                <Link href="/marketplace">Go Shopping</Link>
            </Button>
        </div>
      )
  }

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="mb-8 flex items-center gap-4">
        <Button asChild variant="ghost" size="icon" className="text-brand-text-muted hover:text-white">
            <Link href="/marketplace/cart"><ArrowLeft className="w-5 h-5"/></Link>
        </Button>
        <div>
            <h1 className="text-3xl font-bold text-white">Checkout</h1>
            <p className="text-brand-text-muted">Complete your purchase</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
            <Card className="bg-kenya-deep border-kenya-green/20 text-white">
                <CardHeader>
                    <CardTitle>Delivery Information</CardTitle>
                    <CardDescription className="text-brand-text-muted">Enter your details for delivery</CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input id="firstName" required placeholder="John" className="bg-white/5 border-white/10"/>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input id="lastName" required placeholder="Doe" className="bg-white/5 border-white/10"/>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number (M-Pesa)</Label>
                            <Input id="phone" required placeholder="+254 7..." className="bg-white/5 border-white/10"/>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="address">Delivery Address</Label>
                            <Input id="address" required placeholder="Street address, P.O. Box..." className="bg-white/5 border-white/10"/>
                        </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="city">City/Town</Label>
                                <Input id="city" required placeholder="Nairobi" className="bg-white/5 border-white/10"/>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="postalCode">Postal Code</Label>
                                <Input id="postalCode" placeholder="00100" className="bg-white/5 border-white/10"/>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card className="bg-kenya-deep border-kenya-green/20 text-white">
                <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription className="text-brand-text-muted">Secure payment via M-Pesa</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 p-4 border border-kenya-green/50 bg-kenya-green/10 rounded-xl cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                             <span className="font-bold text-kenya-green text-xs">M-PESA</span>
                        </div>
                        <div className="flex-1">
                            <p className="font-bold">M-Pesa Express</p>
                            <p className="text-xs text-brand-text-muted">Pay easily with your phone</p>
                        </div>
                        <div className="w-5 h-5 rounded-full border-2 border-kenya-green flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-kenya-green" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-1">
            <Card className="bg-kenya-deep border-kenya-green/20 text-white sticky top-24">
              <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                    {cartItems.map((item, i) => (
                        <div key={`${item.id}-${i}`} className="flex justify-between items-start text-sm">
                            <span className="text-brand-text-muted flex-1 pr-4 line-clamp-1">{item.title}</span>
                            <span className="font-medium whitespace-nowrap">KES {item.price.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
                 <Separator className="bg-white/10 my-4" />
                  <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-brand-text-muted">
                    <span>Subtotal</span>
                    <span>KES {total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-brand-text-muted">
                    <span>Delivery Fee</span>
                    <span>KES 150</span>
                  </div>
                  <Separator className="bg-white/10" />
                  <div className="flex justify-between font-bold text-lg text-white">
                    <span>Total</span>
                    <span>KES {(total + 150).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                 <Button 
                    type="submit" 
                    form="checkout-form" 
                    disabled={loading}
                    className="w-full bg-kenya-green hover:bg-kenya-deep text-white font-bold h-12 rounded-xl transition-all"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing Payment...
                        </>
                    ) : (
                        `Pay KES ${(total + 150).toLocaleString()}`
                    )}
                </Button>
              </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
