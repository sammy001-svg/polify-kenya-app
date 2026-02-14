"use client";

import { useState, useEffect } from "react";
import { MarketplaceItem } from "@/app/(platform)/marketplace/actions";

export const CART_UPDATED_EVENT = "marketplace_cart_updated";

export function useCart() {
  const [cartItems, setCartItems] = useState<MarketplaceItem[]>([]);
  const [mounted, setMounted] = useState(false);

  const updateCart = () => {
    const savedCart = localStorage.getItem("marketplace_cart");
    if (savedCart) {
      try {
        const cart: MarketplaceItem[] = JSON.parse(savedCart);
        setCartItems(cart);
      } catch (e) {
        console.error("Failed to parse cart", e);
        setCartItems([]);
      }
    } else {
      setCartItems([]);
    }
  };

  useEffect(() => {
    // We delay the initial check to avoid synchronous setState warning and potential hydration issues
    const timer = setTimeout(() => {
      updateCart();
      setMounted(true);
    }, 0);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "marketplace_cart") {
        updateCart();
      }
    };

    const handleCustomEvent = () => {
      updateCart();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener(CART_UPDATED_EVENT, handleCustomEvent);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(CART_UPDATED_EVENT, handleCustomEvent);
      clearTimeout(timer);
    };
  }, []);

  const addToCart = (item: MarketplaceItem) => {
    const savedCart = localStorage.getItem("marketplace_cart");
    const cart: MarketplaceItem[] = savedCart ? JSON.parse(savedCart) : [];
    cart.push(item);
    localStorage.setItem("marketplace_cart", JSON.stringify(cart));
    
    // Update local state immediately for the component that called this
    setCartItems(cart);

    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new Event(CART_UPDATED_EVENT));
  };

  const removeFromCart = (indexToRemove: number) => {
    const savedCart = localStorage.getItem("marketplace_cart");
    if (savedCart) {
      const cart: MarketplaceItem[] = JSON.parse(savedCart);
      const newCart = cart.filter((_, index) => index !== indexToRemove);
      localStorage.setItem("marketplace_cart", JSON.stringify(newCart));
      
      // Update local state immediately
      setCartItems(newCart);
      
      // Dispatch custom event
      window.dispatchEvent(new Event(CART_UPDATED_EVENT));
    }
  };

  return { cartCount: cartItems.length, cartItems, addToCart, removeFromCart, mounted };
}
