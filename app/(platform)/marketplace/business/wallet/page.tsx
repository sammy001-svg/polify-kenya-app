import { getBusinessProfile, getBusinessTransactions, BusinessTransaction } from "../../business-actions";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Wallet, ArrowUpRight, ArrowDownLeft } from "lucide-react";

export default async function BusinessWalletPage() {
  const business = await getBusinessProfile();

  if (!business) {
    redirect("/marketplace");
  }

  const transactions = await getBusinessTransactions(business.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Wallet</h1>
        <p className="text-brand-text-muted">Track your earnings and payouts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-brand-surface border-white/10 text-white md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-brand-text-muted">Available Balance</CardTitle>
            <Wallet className="h-4 w-4 text-kenya-green" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">KES {business.wallet_balance.toLocaleString()}</div>
            <div className="mt-4 flex gap-2">
                 <button className="flex-1 bg-kenya-green hover:bg-kenya-deep text-white text-xs font-bold py-2 px-4 rounded-full transition-colors">
                    Withdraw
                 </button>
                 <button className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-bold py-2 px-4 rounded-full transition-colors">
                    Add Funds
                 </button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-brand-surface border-white/10 text-white">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow className="border-white/10 hover:bg-white/5">
                        <TableHead className="text-brand-text-muted">Type</TableHead>
                        <TableHead className="text-brand-text-muted">Description</TableHead>
                        <TableHead className="text-brand-text-muted">Date</TableHead>
                        <TableHead className="text-brand-text-muted text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.length === 0 ? (
                        <TableRow className="border-white/10 hover:bg-transparent">
                            <TableCell colSpan={4} className="text-center py-8 text-brand-text-muted">
                                No transactions yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        transactions.map((t: BusinessTransaction) => (
                            <TableRow key={t.id} className="border-white/10 hover:bg-white/5">
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {t.type === 'sale' && <ArrowDownLeft className="w-4 h-4 text-kenya-green" />}
                                        {t.type === 'withdrawal' && <ArrowUpRight className="w-4 h-4 text-red-400" />}
                                        {t.type === 'deposit' && <ArrowDownLeft className="w-4 h-4 text-blue-400" />}
                                        {t.type === 'fee' && <ArrowUpRight className="w-4 h-4 text-orange-400" />}
                                        <span className="capitalize">{t.type}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{t.description}</TableCell>
                                <TableCell className="text-brand-text-muted">
                                    {new Date(t.created_at).toLocaleDateString()}
                                </TableCell>
                                <TableCell className={`text-right font-medium ${
                                    t.type === 'sale' || t.type === 'deposit' ? 'text-kenya-green' : 'text-white'
                                }`}>
                                    {t.type === 'sale' || t.type === 'deposit' ? '+' : '-'} 
                                    KES {Number(t.amount).toLocaleString()}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
