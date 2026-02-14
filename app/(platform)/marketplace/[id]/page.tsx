import { getMarketplaceItem } from "../actions";
import { ProductDetailClient } from "@/components/marketplace/ProductDetailClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const item = await getMarketplaceItem(id);

  if (!item) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: item.title,
    description: item.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const item = await getMarketplaceItem(id);

  if (!item) {
    notFound();
  }

  return <ProductDetailClient item={item} />;
}
