import { CartClient } from "@/components/marketplace/CartClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review your items",
};

export default function CartPage() {
  return <CartClient />;
}
