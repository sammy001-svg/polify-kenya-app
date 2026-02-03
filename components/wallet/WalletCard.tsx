"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, ArrowUpRight, ArrowDownLeft, RefreshCcw } from "lucide-react";
import { getWallet, WalletData } from "@/actions/wallet";
import { DepositDialog } from "./DepositDialog";
import { WithdrawalDialog } from "./WithdrawalDialog";

export function WalletCard() {
  const [data, setData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        const result = await getWallet();
        if (result.success && result.data) {
            setData(result.data);
        }
        setLoading(false);
    };
    fetchData();
  }, []);

  // Wrapper for manual refresh
  const refreshWallet = async () => {
    // Silent refresh mostly
    const result = await getWallet();
    if (result.success && result.data) {
        setData(result.data);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">My Wallet</CardTitle>
        <Wallet className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
           {loading ? "..." : `KES ${data?.balance?.toLocaleString() ?? "0.00"}`}
        </div>
        <p className="text-xs text-muted-foreground mb-4">
           Available Balance
        </p>
        
        <div className="flex gap-2 mb-6">
            <Button size="sm" className="w-full gap-2" onClick={() => setShowDeposit(true)}>
                <ArrowDownLeft className="h-4 w-4" /> Deposit
            </Button>
            <Button size="sm" variant="outline" className="w-full gap-2" onClick={() => setShowWithdraw(true)}>
                <ArrowUpRight className="h-4 w-4" /> Withdraw
            </Button>
        </div>

        <div>
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">Recent Transactions</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={refreshWallet}>
                    <RefreshCcw className="h-3 w-3" />
                </Button>
            </div>
            <div className="space-y-2">
                {data?.history?.length === 0 && <p className="text-xs text-muted-foreground">No transactions yet.</p>}
                {data?.history?.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between text-sm border-b pb-2 last:border-0 last:pb-0">
                        <div>
                            <p className="font-medium capitalize">{tx.type} <span className="text-xs text-muted-foreground lowercase">({tx.status})</span></p>
                            <p className="text-xs text-muted-foreground">{new Date(tx.created_at).toLocaleDateString()}</p>
                        </div>
                        <span className={tx.type === 'deposit' ? 'text-green-600' : 'text-red-600'}>
                            {tx.type === 'deposit' ? '+' : '-'} {tx.amount.toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
      </CardContent>

      <DepositDialog 
        isOpen={showDeposit} 
        onClose={() => setShowDeposit(false)} 
        onSuccess={() => { refreshWallet(); }} 
      />
      
      <WithdrawalDialog
        isOpen={showWithdraw}
        onClose={() => setShowWithdraw(false)}
        onSuccess={() => { refreshWallet(); }}
        currentBalance={data?.balance || 0}
      />
    </Card>
  );
}
