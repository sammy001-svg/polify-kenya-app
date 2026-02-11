"use server";

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface BusinessProfile {
  id: string;
  name: string;
  description: string | null;
  location: string;
  contact_phone: string;
  contact_email: string | null;
  wallet_balance: number;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string | null;
  category: "Agriculture" | "Handicrafts" | "Services" | "Tech" | "Clothing" | "Other";
  location: string;
  stock_quantity: number;
  is_active: boolean;
}

export interface BusinessTransaction {
  id: string;
  business_id: string;
  amount: number;
  type: 'sale' | 'withdrawal' | 'deposit' | 'fee';
  description: string;
  item_id: string | null;
  created_at: string;
}

export async function registerBusiness(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const name = formData.get("businessName") as string;
  const description = formData.get("description") as string;
  const location = formData.get("location") as string;
  const contact_phone = formData.get("phone") as string;
  const contact_email = formData.get("email") as string;

  const { error } = await supabase.from("businesses").insert({
    owner_id: user.id,
    name,
    description,
    location,
    contact_phone,
    contact_email,
  });

  if (error) {
    console.error("Error registering business:", error);
    throw new Error("Failed to register business");
  }

  revalidatePath("/marketplace");
  redirect("/marketplace/business");
}

export async function getBusinessProfile(): Promise<BusinessProfile | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("owner_id", user.id)
    .single();

  if (error || !data) return null;

  return data;
}

export async function createMarketplaceItem(formData: FormData, businessId: string) {
  const supabase = await createClient();
  
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const category = formData.get("category") as string;
  
  const files = formData.getAll("images") as File[];
  const imageUrls: string[] = [];

  // Upload images to Supabase Storage
  for (const file of files) {
      if (file.size > 0) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${businessId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
              .from('marketplace')
              .upload(fileName, file);

          if (uploadError) {
              console.error("Error uploading image:", uploadError);
              continue; // Skip failed uploads but try others
          }

          const { data: { publicUrl } } = supabase.storage
              .from('marketplace')
              .getPublicUrl(fileName);
          
          imageUrls.push(publicUrl);
      }
  }

  if (imageUrls.length === 0) {
      // Fallback for dev if storage fails or no images provided (though UI checks)
      // throw new Error("At least one image is required"); // Strict mode
      imageUrls.push("https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=2670&auto=format&fit=crop");
  }

  // Fetch business location
  const { data: business } = await supabase
    .from("businesses")
    .select("location")
    .eq("id", businessId)
    .single();

  const productLocation = business?.location || "Kenya"; // Default fallback

  const { error } = await supabase.from("marketplace_items").insert({
    business_id: businessId,
    title,
    description,
    price,
    category,
    location: productLocation,
    image_url: imageUrls[0], // Keep backward compatibility for now
    images: imageUrls,
  });

  if (error) {
    console.error("Error creating item:", error);
    throw new Error(error.message);
  }

  revalidatePath("/marketplace/business/products");
  revalidatePath("/marketplace");
}

export async function getBusinessProducts(businessId: string) {
    const supabase = await createClient();
    const { data } = await supabase
        .from("marketplace_items")
        .select("*")
        .eq("business_id", businessId)
        .order("created_at", { ascending: false });
    
    return data || [];
}

export async function getBusinessTransactions(businessId: string): Promise<BusinessTransaction[]> {
    const supabase = await createClient();
    const { data } = await supabase
        .from("business_transactions")
        .select("*")
        .eq("business_id", businessId)
        .order("created_at", { ascending: false });

    return (data as unknown as BusinessTransaction[]) || [];
}
