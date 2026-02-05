'use client';

import { useState } from 'react';
import { MOCK_DONATIONS, MOCK_EXPENSES, MOCK_BUDGET, Donation, Expense, SourceType, ExpenseCategory } from '@/lib/finance-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  PieChart, 
  Download,
  ShieldAlert,
  Lock,
  UserCog,
  BookOpen,
  FileText,
  Scale,
  Settings,
  Archive
} from 'lucide-react';
import Link from 'next/link';

type UserRole = 'politician' | 'accountant';

type FinanceItem = {
    id: string;
    amount: number;
    date: string;
    status: string;
    type: 'CR' | 'DR';
    category?: string;
    donorName?: string;
    source?: string;
    description?: string;
};

type JournalLine = {
    accountId: string;
    type: 'DR' | 'CR';
    amount: number;
};

type JournalEntry = {
    id: string;
    date: string;
    description: string;
    lines: JournalLine[];
};

export default function FinancePage() {
  const [userRole, setUserRole] = useState<UserRole>('politician');
  const [donations, setDonations] = useState<Donation[]>(MOCK_DONATIONS);
  const [expenses, setExpenses] = useState<Expense[]>(MOCK_EXPENSES);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [showLogModal, setShowLogModal] = useState<'donation' | 'expense' | null>(null);
  const [showJournalModal, setShowJournalModal] = useState(false);

  // Journal Entry State
  const [journalDate, setJournalDate] = useState(new Date().toISOString().split('T')[0]);
  const [journalDesc, setJournalDesc] = useState('');
  const [journalLines, setJournalLines] = useState<JournalLine[]>([
      { accountId: '', type: 'DR', amount: 0 },
      { accountId: '', type: 'CR', amount: 0 }
  ]);

  // New Transaction State
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState(''); // Donor Name or Expense Desc
  const [type, setType] = useState<string>(''); // Source or Category

  const totalRaised = donations.reduce((acc, d) => acc + d.amount, 0);
  const totalSpent = expenses.reduce((acc, e) => acc + e.amount, 0);
  const balance = totalRaised - totalSpent;

  // Calculate Balances including Journal Entries
  const getAccountBalance = (code: string, baseBalance: number) => {
      let balance = baseBalance;
      journalEntries.forEach(entry => {
          entry.lines.forEach(line => {
              if (line.accountId === code) {
                  // For simplicity: Assets/Expenses increase with DR. Liabilities/Equity/Revenue increase with CR.
                  // This matches the visual indicator logic in the journal list mapping
                  const isDebitNature = ['1', '5'].includes(code.charAt(0)); 
                  if (isDebitNature) {
                       balance += line.type === 'DR' ? line.amount : -line.amount;
                  } else {
                       balance += line.type === 'CR' ? line.amount : -line.amount;
                  }
              }
          });
      });
      return balance;
  };

  // Mock COA Data
  const chartOfAccounts = [
      { code: '1000', name: 'Cash on Hand', type: 'Asset', balance: getAccountBalance('1000', balance * 0.1) },
      { code: '1010', name: 'M-Pesa Account', type: 'Asset', balance: getAccountBalance('1010', balance * 0.9) },
      { code: '2000', name: 'Accounts Payable', type: 'Liability', balance: getAccountBalance('2000', 50000) },
      { code: '3000', name: 'Campaign Equity', type: 'Equity', balance: getAccountBalance('3000', totalRaised - 50000) },
      { code: '4000', name: 'Donation Income', type: 'Revenue', balance: getAccountBalance('4000', totalRaised) },
      { code: '5000', name: 'Logistics Expense', type: 'Expense', balance: getAccountBalance('5000', expenses.filter(e => e.category === 'Logistics').reduce((a,b)=>a+b.amount,0)) },
      { code: '5010', name: 'Media Expense', type: 'Expense', balance: getAccountBalance('5010', expenses.filter(e => e.category === 'Media').reduce((a,b)=>a+b.amount,0)) },
  ];

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

  const handleSaveJournal = () => {
      const totalDr = journalLines.reduce((sum, line) => line.type === 'DR' ? sum + line.amount : sum, 0);
      const totalCr = journalLines.reduce((sum, line) => line.type === 'CR' ? sum + line.amount : sum, 0);

      if (Math.abs(totalDr - totalCr) > 0.01) {
          alert(`Entry is not balanced! Difference: ${Math.abs(totalDr - totalCr)}`);
          return;
      }
      if (!journalDesc) {
          alert("Please enter a description.");
          return;
      }

      const newEntry: JournalEntry = {
          id: Date.now().toString(),
          date: journalDate,
          description: journalDesc,
          lines: journalLines.filter(l => l.accountId && l.amount > 0)
      };

      setJournalEntries([newEntry, ...journalEntries]);
      setShowJournalModal(false);
      setJournalDesc('');
      setJournalLines([
        { accountId: '', type: 'DR', amount: 0 },
        { accountId: '', type: 'CR', amount: 0 }
      ]);
  };

  const updateJournalLine = (index: number, field: keyof JournalLine, value: string) => {
      const newLines = [...journalLines];
      newLines[index] = { ...newLines[index], [field]: field === 'amount' ? parseFloat(value) || 0 : value } as JournalLine;
      setJournalLines(newLines);
  };

  const addJournalLine = () => {
      setJournalLines([...journalLines, { accountId: '', type: 'DR', amount: 0 }]);
  };

  const handleWithdraw = () => {
      alert("Withdrawal initiated. Funds will be transferred to the linked bank account.");
  };

  return (
    <div className="container mx-auto max-w-7xl py-8 px-4 space-y-8">
       {/* Header & Role Switcher */}
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
             <div className="flex items-center gap-4">
                <Link href="/campaign" className="p-2 hover:bg-brand-surface-secondary rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-brand-text-muted" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Wallet className="w-6 h-6 text-kenya-gold" />
                        Finance Manager
                    </h1>
                    <p className="text-sm text-brand-text-muted">Comprehensive Accounting Suite</p>
                </div>
            </div>
            
            <div className="flex items-center gap-2 bg-brand-surface-secondary p-1 rounded-lg">
                <button 
                    onClick={() => setUserRole('politician')}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${userRole === 'politician' ? 'bg-brand-surface shadow-xs text-brand-text' : 'text-brand-text-muted hover:text-brand-text'}`}
                >
                    Politician View
                </button>
                <button 
                    onClick={() => setUserRole('accountant')}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${userRole === 'accountant' ? 'bg-brand-surface shadow-xs text-brand-text' : 'text-brand-text-muted hover:text-brand-text'}`}
                >
                    Accountant View
                </button>
            </div>
        </div>
        
        {/* Accountant Notice */}
        {userRole === 'accountant' && (
            <div className="bg-blue-900/20 border border-blue-500/50 p-4 rounded-xl flex items-start gap-3">
                <UserCog className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                    <h3 className="font-bold text-blue-100">Accountant Workspace</h3>
                    <p className="text-sm text-blue-200/80">Full access to Journals, Ledgers, Reports, and Controls. Withdrawal limited.</p>
                </div>
            </div>
        )}

        <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="bg-brand-surface-secondary p-1 h-auto flex-wrap">
                <TabsTrigger value="dashboard" className="gap-2"><PieChart className="w-4 h-4"/> Dashboard</TabsTrigger>
                <TabsTrigger value="journals" className="gap-2"><BookOpen className="w-4 h-4"/> Journals</TabsTrigger>
                <TabsTrigger value="ledgers" className="gap-2"><Archive className="w-4 h-4"/> Ledgers & COA</TabsTrigger>
                <TabsTrigger value="documents" className="gap-2"><FileText className="w-4 h-4"/> Source Docs</TabsTrigger>
                <TabsTrigger value="reports" className="gap-2"><Scale className="w-4 h-4"/> Reports</TabsTrigger>
                <TabsTrigger value="controls" className="gap-2"><Settings className="w-4 h-4"/> Controls</TabsTrigger>
            </TabsList>

            {/* DASHBOARD TAB */}
            <TabsContent value="dashboard" className="space-y-6">
                 {/* Financial Overview Cards */}
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
                    <Card className="border-border bg-brand-surface-highlight/5">
                        <CardContent className="p-6 flex flex-col gap-4">
                            <div>
                                <span className="text-sm font-bold text-brand-text-muted uppercase flex items-center gap-2">
                                    <Wallet className="w-4 h-4 text-brand-text" /> Available Balance
                                </span>
                                <span className={`text-4xl font-black ${balance >= 0 ? 'text-brand-text' : 'text-kenya-red'}`}>
                                    KES {balance.toLocaleString()}
                                </span>
                            </div>
                            
                            {userRole === 'politician' ? (
                                <Button onClick={handleWithdraw} className="w-full bg-brand-text text-brand-surface hover:bg-brand-text/90">
                                    Withdraw Funds
                                </Button>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <Button disabled className="w-full opacity-50 cursor-not-allowed">
                                        <Lock className="w-4 h-4 mr-2" /> Withdraw Funds
                                    </Button>
                                    <p className="text-[10px] text-center text-kenya-red flex items-center justify-center gap-1">
                                        <ShieldAlert className="w-3 h-3" /> Withdrawal requires candidate authorization
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
                 {/* Quick Actions */}
                 <div className="flex justify-end gap-3">
                    <Button variant="outline" className="gap-2" onClick={() => setShowLogModal('expense')}>
                        <TrendingDown className="w-4 h-4 text-kenya-red" /> Log Expense
                    </Button>
                    <Button className="bg-kenya-green hover:bg-kenya-green/90 text-white gap-2" onClick={() => setShowLogModal('donation')}>
                        <Plus className="w-4 h-4" /> Log Donation
                    </Button>
                </div>
            </TabsContent>

            {/* JOURNALS TAB (Original Books of Entry) */}
            <TabsContent value="journals">
                 <Card className="border-border">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>General Journal</CardTitle>
                            <CardDescription>Chronological record of all confirmed transactions.</CardDescription>
                        </div>
                        {userRole === 'accountant' && (
                            <Button onClick={() => setShowJournalModal(true)} className="gap-2">
                                <Plus className="w-4 h-4" /> New Journal Entry
                            </Button>
                        )}
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-0 divide-y divide-border">
                            {([
                                ...donations.map(d => ({...d, type: 'CR' as const, category: 'Income'})), 
                                ...expenses.map(e => ({...e, type: 'DR' as const, donorName: e.description})),
                                ...journalEntries.flatMap(entry => entry.lines.map(line => ({
                                    id: entry.id + line.accountId,
                                    date: entry.date,
                                    description: entry.description,
                                    amount: line.amount,
                                    type: line.type,
                                    category: chartOfAccounts.find(c => c.code === line.accountId)?.name || 'Unknown Account'
                                })))
                            ] as FinanceItem[])
                            .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                            .map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 hover:bg-brand-surface-secondary/30 transition-colors">
                                    <div className="flex gap-4 items-center">
                                         <div className="font-mono text-xs text-brand-text-muted bg-brand-surface-secondary px-2 py-1 rounded">
                                            {item.date}
                                         </div>
                                         <div>
                                            <p className="font-bold text-sm">{item.donorName || item.description}</p>
                                            <p className="text-xs text-brand-text-muted">{item.category || item.source}</p>
                                         </div>
                                    </div>
                                    <div className={`font-mono font-bold ${item.type === 'CR' ? 'text-kenya-green' : 'text-brand-text'}`}>
                                        {item.type === 'CR' ? 'Credit' : 'Debit'}
                                        <span className="block text-right text-lg">KES {item.amount.toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                 </Card>
            </TabsContent>

            {/* LEDGERS & COA TAB */}
            <TabsContent value="ledgers">
                <Card className="border-border">
                    <CardHeader>
                        <CardTitle>Chart of Accounts</CardTitle>
                        <CardDescription>Classification of all assets, liabilities, equity, income, and expenses.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border border-border overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-brand-surface-secondary text-brand-text-muted font-bold uppercase text-xs">
                                    <tr>
                                        <th className="p-4">Code</th>
                                        <th className="p-4">Account Name</th>
                                        <th className="p-4">Type</th>
                                        <th className="p-4 text-right">Balance (KES)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {chartOfAccounts.map((acc) => (
                                        <tr key={acc.code} className="hover:bg-brand-surface-secondary/20">
                                            <td className="p-4 font-mono text-brand-text-muted">{acc.code}</td>
                                            <td className="p-4 font-bold">{acc.name}</td>
                                            <td className="p-4"><Badge variant="outline">{acc.type}</Badge></td>
                                            <td className="p-4 text-right font-mono font-bold">{acc.balance.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* DOCUMENTS TAB */}
            <TabsContent value="documents">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <Card className="border-border border-dashed bg-brand-surface-secondary/10">
                         <CardContent className="flex flex-col items-center justify-center h-64 gap-4">
                             <div className="w-16 h-16 rounded-full bg-brand-surface-secondary flex items-center justify-center">
                                 <Plus className="w-6 h-6 text-brand-text-muted" />
                             </div>
                             <div className="text-center">
                                 <p className="font-bold">Upload Source Document</p>
                                 <p className="text-sm text-brand-text-muted">Drag & drop receipts, invoices, or bank statements.</p>
                             </div>
                             <Button variant="outline">Browse Files</Button>
                         </CardContent>
                     </Card>
                     <Card className="border-border">
                         <CardHeader>
                             <CardTitle>Recent Uploads</CardTitle>
                         </CardHeader>
                         <CardContent className="space-y-4">
                             {[
                                 { name: "INV-2024-001.pdf", type: "Invoice", date: "Today", size: "2.4 MB" },
                                 { name: "Receipt-Fuel-Shell.jpg", type: "Receipt", date: "Yesterday", size: "1.1 MB" },
                                 { name: "Bank-Stmt-July.pdf", type: "Statement", date: "Jul 31", size: "4.5 MB" },
                             ].map((file, i) => (
                                 <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
                                     <div className="flex items-center gap-3">
                                         <FileText className="w-8 h-8 text-blue-500" />
                                         <div>
                                             <p className="font-bold text-sm">{file.name}</p>
                                             <p className="text-xs text-brand-text-muted">{file.type} • {file.date}</p>
                                         </div>
                                     </div>
                                     <span className="text-xs font-mono text-brand-text-muted">{file.size}</span>
                                 </div>
                             ))}
                         </CardContent>
                     </Card>
                </div>
            </TabsContent>

            {/* REPORTS TAB */}
            <TabsContent value="reports">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="border-border">
                        <CardHeader>
                            <CardTitle>Income Statement</CardTitle>
                            <CardDescription>Profit & Loss (P&L) Summary</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                             <div>
                                 <h4 className="text-sm font-bold text-brand-text-muted uppercase mb-2">Revenue</h4>
                                 <div className="flex justify-between p-2 bg-green-500/10 rounded">
                                     <span>Donations</span>
                                     <span className="font-bold">{totalRaised.toLocaleString()}</span>
                                 </div>
                             </div>
                             <div>
                                 <h4 className="text-sm font-bold text-brand-text-muted uppercase mb-2">Expenses</h4>
                                 <div className="space-y-1">
                                    {['Logistics', 'Media', 'Events', 'Personnel'].map(cat => {
                                        const amt = expenses.filter(e => e.category === cat).reduce((a,b)=>a+b.amount,0);
                                        if (amt === 0) return null;
                                        return (
                                            <div key={cat} className="flex justify-between p-2 hover:bg-brand-surface-secondary rounded">
                                                <span>{cat}</span>
                                                <span>{amt.toLocaleString()}</span>
                                            </div>
                                        )
                                    })}
                                 </div>
                             </div>
                             <div className="border-t border-border pt-4 flex justify-between items-center">
                                 <span className="font-bold text-lg">Net Surplus</span>
                                 <span className={`font-black text-xl ${balance >= 0 ? 'text-kenya-green' : 'text-kenya-red'}`}>
                                     KES {balance.toLocaleString()}
                                 </span>
                             </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border">
                         <CardHeader>
                            <CardTitle>Balance Sheet</CardTitle>
                            <CardDescription>Statement of Financial Position</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                             <div className="flex justify-between items-center p-3 border-b border-border">
                                 <div>
                                     <p className="text-sm text-brand-text-muted">Total Assets</p>
                                     <p className="font-bold text-lg">KES {balance.toLocaleString()}</p>
                                 </div>
                                 <div className="text-right">
                                     <p className="text-sm text-brand-text-muted">Total Liabilities</p>
                                     <p className="font-bold text-lg">KES 0.00</p>
                                 </div>
                             </div>
                             <div className="bg-brand-surface-secondary p-4 rounded-lg text-center">
                                 <p className="text-sm text-brand-text-muted mb-1">Equity</p>
                                 <p className="text-2xl font-black text-brand-text">KES {balance.toLocaleString()}</p>
                             </div>
                             <Button className="w-full" variant="outline"><Download className="w-4 h-4 mr-2"/> Download Financial Packet</Button>
                        </CardContent>
                    </Card>
                 </div>
            </TabsContent>

             {/* CONTROLS TAB */}
            <TabsContent value="controls">
                <Card className="border-border">
                    <CardHeader>
                        <CardTitle>Accounting Procedures & Controls</CardTitle>
                        <CardDescription>Internal compliance and fraud prevention protocols.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {[
                             { title: "Segregation of Duties", desc: "No single individual has control over the entire accounting cycle (e.g., Receiving cash vs Recording)." },
                             { title: "Authorization Limits", desc: "Expenses over KES 50,000 require Candidate and Treasurer sign-off." },
                             { title: "Bank Reconciliation", desc: "Monthly reconciliation of bank statements with the General Ledger is mandatory." },
                             { title: "Petty Cash Controls", desc: "Imprest system used. Vouchers required for all cash payouts." },
                         ].map((control, i) => (
                             <div key={i} className="flex gap-4 p-4 border border-border rounded-lg bg-brand-surface-secondary/20">
                                 <ShieldAlert className="w-6 h-6 text-kenya-gold shrink-0" />
                                 <div>
                                     <h4 className="font-bold mb-1">{control.title}</h4>
                                     <p className="text-sm text-brand-text-muted">{control.desc}</p>
                                 </div>
                             </div>
                         ))}
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>

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

        {/* Journal Entry Modal */}
        {showJournalModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-2xl animate-in fade-in zoom-in-95">
                    <CardHeader>
                        <CardTitle>New Journal Entry</CardTitle>
                        <CardDescription>Record a double-entry transaction.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold">Date</label>
                                <Input 
                                    type="date"
                                    value={journalDate} 
                                    onChange={(e) => setJournalDate(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold">Description</label>
                                <Input 
                                    placeholder="e.g., Adjustment for depreciation"
                                    value={journalDesc}
                                    onChange={(e) => setJournalDesc(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="border border-border rounded-lg overflow-hidden">
                             <table className="w-full text-sm">
                                 <thead className="bg-brand-surface-secondary text-brand-text-muted text-xs uppercase font-bold">
                                     <tr>
                                         <th className="p-3 text-left">Account</th>
                                         <th className="p-3 text-left w-24">Type</th>
                                         <th className="p-3 text-right w-32">Amount</th>
                                     </tr>
                                 </thead>
                                 <tbody className="divide-y divide-border">
                                     {journalLines.map((line, idx) => (
                                         <tr key={idx}>
                                             <td className="p-2">
                                                 <select 
                                                    className="w-full bg-transparent border-none focus:ring-0"
                                                    value={line.accountId}
                                                    onChange={(e) => updateJournalLine(idx, 'accountId', e.target.value)}
                                                >
                                                     <option value="">Select Account...</option>
                                                     {chartOfAccounts.map(acc => (
                                                         <option key={acc.code} value={acc.code}>{acc.code} - {acc.name}</option>
                                                     ))}
                                                 </select>
                                             </td>
                                             <td className="p-2">
                                                 <select 
                                                    className="w-full bg-transparent border-none focus:ring-0"
                                                    value={line.type}
                                                    onChange={(e) => updateJournalLine(idx, 'type', e.target.value)}
                                                 >
                                                     <option value="DR">Debit</option>
                                                     <option value="CR">Credit</option>
                                                 </select>
                                             </td>
                                             <td className="p-2">
                                                 <Input 
                                                    type="number"
                                                    className="text-right h-8"
                                                    value={line.amount}
                                                    onChange={(e) => updateJournalLine(idx, 'amount', e.target.value)}
                                                 />
                                             </td>
                                         </tr>
                                     ))}
                                 </tbody>
                                 <tfoot>
                                     <tr>
                                         <td colSpan={3} className="p-2 text-center">
                                             <Button variant="ghost" size="sm" onClick={addJournalLine}>+ Add Line</Button>
                                         </td>
                                     </tr>
                                 </tfoot>
                             </table>
                        </div>
                        
                        <div className="flex justify-between items-center text-sm font-bold px-2">
                            <span>Total</span>
                            <div className="flex gap-4">
                                <span className="text-brand-text-muted">DR: {journalLines.reduce((s, l) => l.type === 'DR' ? s + l.amount : s, 0).toFixed(2)}</span>
                                <span className="text-brand-text-muted">CR: {journalLines.reduce((s, l) => l.type === 'CR' ? s + l.amount : s, 0).toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-4 border-t border-border">
                            <Button variant="ghost" onClick={() => setShowJournalModal(false)}>Cancel</Button>
                            <Button className="bg-brand-text text-brand-surface" onClick={handleSaveJournal}>Post Entry</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )}
    </div>
  );
}
