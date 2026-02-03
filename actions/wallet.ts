"use server";

import { createClient } from "@/lib/supabase-server";

export interface WalletData {
  balance: number;
  currency: string;
  history: {
    id: string;
    type: 'deposit' | 'withdrawal';
    amount: number;
    status: string;
    description: string;
    created_at: string;
  }[];
}

export async function getWallet(): Promise<{ success: boolean; data?: WalletData }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false };

  // Get Wallet (or create if missing)
  // We use a safe read first, if distinct insert needed we handle it, 
  // but for fetching we just want left join logic or simple query.
  
  let { data: wallet } = await supabase
    .from('wallets')
    .select('id, balance, currency')
    .eq('user_id', user.id)
    .single();

  if (!wallet) {
    // Attempt to create empty wallet
    const { data: newWallet, error } = await supabase
        .from('wallets')
        .insert({ user_id: user.id })
        .select()
        .single();
    
    if (error || !newWallet) return { success: false };
    wallet = newWallet;
  }
  
  if (!wallet) return { success: false };

  // Get History
  const { data: transactions } = await supabase
    .from('wallet_transactions')
    .select('*')
    .eq('wallet_id', wallet.id)
    .order('created_at', { ascending: false })
    .limit(10);

  return {
    success: true,
    data: {
      balance: wallet.balance,
      currency: wallet.currency,
      history: transactions || []
    }
  };
}
