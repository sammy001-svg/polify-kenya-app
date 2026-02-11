import { getBusinessProfile, getBusinessProducts, getBusinessTransactions } from "../business-actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Wallet, TrendingUp } from "lucide-react";
import { ProductActions } from "./products/ProductActions";

export default async function BusinessDashboardPage() {
  const business = await getBusinessProfile();

  if (!business) {
    redirect("/marketplace");
  }

  const products = await getBusinessProducts(business.id);
  const transactions = await getBusinessTransactions(business.id);

  // Calculate total earnings from transactions of type 'sale'
  const totalEarnings = transactions
    .filter(t => t.type === 'sale')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">{business.name}</h1>
          <p className="text-brand-text-muted">{business.location} • {business.contact_phone}</p>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline" className="border-white/10 text-white hover:bg-white/10">
            <Link href="/marketplace/business/products">
              <Package className="w-4 h-4 mr-2" />
              Manage Products
            </Link>
          </Button>
          <Button asChild className="bg-kenya-green hover:bg-kenya-deep text-white">
            <Link href="/marketplace/business/wallet">
              <Wallet className="w-4 h-4 mr-2" />
              Wallet
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-brand-surface border-white/10 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-brand-text-muted">Total Products</CardTitle>
            <Package className="h-4 w-4 text-brand-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-brand-text-muted">+0 items this week</p>
          </CardContent>
        </Card>
        <Card className="bg-brand-surface border-white/10 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-brand-text-muted">Wallet Balance</CardTitle>
            <Wallet className="h-4 w-4 text-kenya-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES {business.wallet_balance.toLocaleString()}</div>
            <p className="text-xs text-brand-text-muted">Available for withdrawal</p>
          </CardContent>
        </Card>
        <Card className="bg-brand-surface border-white/10 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-brand-text-muted">Total Sales</CardTitle>
            <TrendingUp className="h-4 w-4 text-kenya-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES {totalEarnings.toLocaleString()}</div>
            <p className="text-xs text-brand-text-muted">+0 sales this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity / Quick Actions Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-brand-surface border-white/10 text-white">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="w-full">
                <ProductActions businessId={business.id} />
             </div>
              {/* More quick actions can go here */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
