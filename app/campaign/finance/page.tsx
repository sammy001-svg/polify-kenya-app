'use client';

import { useState } from 'react';
import { MOCK_DONATIONS, MOCK_EXPENSES, MOCK_BUDGET, Donation, Expense, SourceType, ExpenseCategory } from '@/lib/finance-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  DollarSign, 
  PieChart, 
  Download
} from 'lucide-react';
import Link from 'next/link';

export default function FinancePage() {
  const [donations, setDonations] = useState<Donation[]>(MOCK_DONATIONS);
  const [expenses, setExpenses] = useState<Expense[]>(MOCK_EXPENSES);
  const [showLogModal, setShowLogModal] = useState<'donation' | 'expense' | null>(null);

  // New Transaction State
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState(''); // Donor Name or Expense Desc
  const [type, setType] = useState<string>(''); // Source or Category

  const totalRaised = donations.reduce((acc, d) => acc + d.amount, 0);
  const totalSpent = expenses.reduce((acc, e) => acc + e.amount, 0);
  const balance = totalRaised - totalSpent;

  const handleLog = () => {
      if (!amount || !description) return;
      const numAmount = parseFloat(amount);

      if (showLogModal === 'donation') {
          const newDonation: Donation = {
              id: Date.now().toString(),
              amount: numAmount,
              donorName: description,
              source: (type as SourceType) || 'M-Pesa',
              date: new Date().toISOString().split('T')[0],
              status: 'Received'
          };
          setDonations([newDonation, ...donations]);
      } else if (showLogModal === 'expense') {
          const newExpense: Expense = {
              id: Date.now().toString(),
              amount: numAmount,
              description: description,
              category: (type as ExpenseCategory) || 'Logistics',
              date: new Date().toISOString().split('T')[0],
              status: 'Paid'
          };
          setExpenses([newExpense, ...expenses]);
      }
      
      setShowLogModal(null);
      setAmount('');
      setDescription('');
      setType('');
  };

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4 space-y-8">
       {/* Header */}
       <div className="flex items-center justify-between border-b border-border pb-6">
             <div className="flex items-center gap-4">
                <Link href="/campaign" className="p-2 hover:bg-brand-surface-secondary rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-brand-text-muted" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Wallet className="w-6 h-6 text-kenya-gold" />
                        finance Manager
                    </h1>
                </div>
            </div>
            <div className="flex gap-3">
                <Button variant="outline" className="gap-2" onClick={() => setShowLogModal('expense')}>
                    <TrendingDown className="w-4 h-4 text-kenya-red" /> Log Expense
                </Button>
                <Button className="bg-kenya-green hover:bg-kenya-green/90 text-white gap-2" onClick={() => setShowLogModal('donation')}>
                    <Plus className="w-4 h-4" /> Log Donation
                </Button>
            </div>
        </div>

        {/* Modal Form */}
        {showLogModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-md animate-in fade-in zoom-in-95">
                    <CardHeader>
                        <CardTitle>{showLogModal === 'donation' ? 'Record Donation' : 'Record Expense'}</CardTitle>
                        <CardDescription>Enter the details below.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold">Amount (KES)</label>
                            <Input 
                                type="number" 
                                placeholder="0.00" 
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold">{showLogModal === 'donation' ? 'Donor Name' : 'Description'}</label>
                            <Input 
                                placeholder={showLogModal === 'donation' ? 'e.g., John Doe' : 'e.g., Facebook Ads'}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold">{showLogModal === 'donation' ? 'Source' : 'Category'}</label>
                            <select 
                                className="flex h-10 w-full rounded-md border border-border bg-brand-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="">Select...</option>
                                {showLogModal === 'donation' ? (
                                    <>
                                        <option value="M-Pesa">M-Pesa</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                        <option value="Cash">Cash</option>
                                    </>
                                ) : (
                                    <>
                                        <option value="Logistics">Logistics</option>
                                        <option value="Media">Media</option>
                                        <option value="Personnel">Personnel</option>
                                        <option value="Materials">Materials</option>
                                        <option value="Events">Events</option>
                                    </>
                                )}
                            </select>
                        </div>
                        <div className="flex justify-end gap-2 pt-4">
                            <Button variant="ghost" onClick={() => setShowLogModal(null)}>Cancel</Button>
                            <Button className="bg-brand-text text-brand-surface" onClick={handleLog}>Save Record</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )}

        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border">
                <CardContent className="p-6 flex flex-col gap-2">
                    <span className="text-sm font-bold text-brand-text-muted uppercase flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-kenya-green" /> Total Raised
                    </span>
                    <span className="text-3xl font-black">KES {totalRaised.toLocaleString()}</span>
                    <div className="w-full h-2 bg-brand-surface-secondary rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-kenya-green" style={{ width: `${Math.min((totalRaised / MOCK_BUDGET.totalTarget) * 100, 100)}%` }} />
                    </div>
                    <span className="text-xs text-brand-text-muted">Target: KES {MOCK_BUDGET.totalTarget.toLocaleString()}</span>
                </CardContent>
            </Card>
            <Card className="border-border">
                <CardContent className="p-6 flex flex-col gap-2">
                    <span className="text-sm font-bold text-brand-text-muted uppercase flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-kenya-red" /> Total Spent
                    </span>
                    <span className="text-3xl font-black">KES {totalSpent.toLocaleString()}</span>
                    <span className="text-xs text-brand-text-muted">{((totalSpent / (totalRaised || 1)) * 100).toFixed(1)}% of raised funds</span>
                </CardContent>
            </Card>
            <Card className="border-border">
                <CardContent className="p-6 flex flex-col gap-2">
                    <span className="text-sm font-bold text-brand-text-muted uppercase flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-brand-text" /> Available Balance
                    </span>
                    <span className={`text-3xl font-black ${balance >= 0 ? 'text-brand-text' : 'text-kenya-red'}`}>
                        KES {balance.toLocaleString()}
                    </span>
                    <span className="text-xs text-brand-text-muted">Net Campaign Funds</span>
                </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Donations */}
            <Card className="border-border h-fit">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Recent Donations</CardTitle>
                    <Button variant="ghost" size="sm" className="gap-1">
                        <Download className="w-3 h-3" /> Export
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {donations.slice(0, 5).map((donation) => (
                            <div key={donation.id} className="flex items-center justify-between p-3 rounded-lg bg-brand-surface-secondary/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-kenya-green/10 flex items-center justify-center font-bold text-kenya-green">
                                        {donation.donorName.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">{donation.donorName}</p>
                                        <p className="text-xs text-brand-text-muted flex items-center gap-1">
                                            {donation.source} • {donation.date}
                                        </p>
                                    </div>
                                </div>
                                <span className="font-bold text-kenya-green">+ {donation.amount.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Expenses List */}
            <Card className="border-border h-fit">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Recent Expenses</CardTitle>
                    <Button variant="ghost" size="sm" className="gap-1">
                        <PieChart className="w-3 h-3" /> Report
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                         {expenses.slice(0, 5).map((expense) => (
                            <div key={expense.id} className="flex items-center justify-between p-3 rounded-lg bg-brand-surface-secondary/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-kenya-red/10 flex items-center justify-center font-bold text-kenya-red">
                                        <DollarSign className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">{expense.description}</p>
                                        <p className="text-xs text-brand-text-muted flex items-center gap-1">
                                            {expense.category} • {expense.date}
                                        </p>
                                    </div>
                                </div>
                                <span className="font-bold text-brand-text">- {expense.amount.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
