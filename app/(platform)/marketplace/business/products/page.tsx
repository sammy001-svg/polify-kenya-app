import { getBusinessProfile, getBusinessProducts, MarketplaceItem } from "../../business-actions";
import { redirect } from "next/navigation";
import { ProductActions } from "./ProductActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default async function BusinessProductsPage() {
  const business = await getBusinessProfile();

  if (!business) {
    redirect("/marketplace");
  }

  const products = await getBusinessProducts(business.id);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Products</h1>
          <p className="text-brand-text-muted">Manage your inventory and services</p>
        </div>
        <ProductActions businessId={business.id} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white/5 rounded-xl border border-dashed border-white/10 text-brand-text-muted">
            No products found. Add your first item to start selling.
          </div>
        ) : (
          products.map((product: MarketplaceItem) => (
            <Card key={product.id} className="bg-brand-surface border-white/10 text-white overflow-hidden">
                <div className="h-48 w-full bg-black/20 relative">
                    {product.image_url && (
                      <Image 
                        src={product.image_url} 
                        alt={product.title} 
                        fill
                        className="object-cover"
                      />
                    )}
                     <Badge className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white border-0">
                        {product.category}
                     </Badge>
                </div>
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                    <span className="truncate">{product.title}</span>
                    <span className="text-kenya-green text-lg">KES {product.price.toLocaleString()}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-brand-text-muted line-clamp-2">{product.description}</p>
                 <div className="mt-4 flex gap-2">
                    <Badge variant="outline" className="border-white/10 text-brand-text-muted">
                        Stock: {product.stock_quantity}
                    </Badge>
                     <Badge variant="outline" className={`border-white/10 ${product.is_active ? 'text-green-400' : 'text-red-400'}`}>
                        {product.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                 </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
