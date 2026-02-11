"use server";

export interface MarketplaceItem {
  id: string;
  title: string;
  price: number;
  description: string;
  image_url: string;
  category: "Agriculture" | "Handicrafts" | "Services" | "Tech" | "Clothing" | "Other";
  location: string;
  seller_name: string;
  seller_rating: number;
  posted_at: string;
  contact_phone: string;
}



import { createClient } from "@/lib/supabase-server";

export async function getMarketplaceItems(): Promise<MarketplaceItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("marketplace_items")
    .select(`
      id,
      title,
      description,
      price,
      image_url,
      category,
      location,
      created_at,
      stock_quantity,
      businesses (
        name,
        contact_phone
      )
    `)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching marketplace items:", error);
    return [];
  }

  return data.map((item) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    description: item.description,
    image_url: item.image_url || "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=2670&auto=format&fit=crop",
    category: item.category,
    location: item.location,
    seller_name: item.businesses[0]?.name || "Unknown Seller",
    seller_rating: 5.0, // Default rating for now
    posted_at: item.created_at,
    contact_phone: item.businesses[0]?.contact_phone || "",
  }));
}
