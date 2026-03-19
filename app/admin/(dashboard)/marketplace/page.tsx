"use client";

import { useState } from "react";
import { 
  Store, 
  Search, 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  CheckCircle2, 
  Clock, 
  XCircle,
  MoreVertical,
  Download
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const MOCK_SELLERS = [
  {
    id: "S001",
    name: "Kamau's Crafts",
    email: "kamau@marketplace.ke",
    earnings: 85400,
    withdrawn: 42000,
    pending: 12500,
    status: "Active",
    joinDate: "2024-01-15"
  },
  {
    id: "S002",
    name: "Maasai Beadwork Collective",
    email: "beads@maasai.co.ke",
    earnings: 120600,
    withdrawn: 95000,
    pending: 5000,
    status: "Active",
    joinDate: "2024-02-02"
  },
  {
    id: "S003",
    name: "Nairobi Tech Hub Store",
    email: "sales@techhub.ke",
    earnings: 250000,
    withdrawn: 180000,
    pending: 45000,
    status: "Active",
    joinDate: "2023-12-10"
  },
  {
    id: "S004",
    name: "Mkenya Organic Farm",
    email: "organic@kenya.com",
    earnings: 34200,
    withdrawn: 20000,
    pending: 8200,
    status: "Warning",
    joinDate: "2024-03-01"
  }
];

const MOCK_WITHDRAWALS = [
  { id: "W001", seller: "Nairobi Tech Hub Store", amount: 45000, date: "2024-03-19", status: "Pending", method: "MPESA" },
  { id: "W002", seller: "Kamau's Crafts", amount: 12500, date: "2024-03-18", status: "Processing", method: "Bank Transfer" },
  { id: "W003", seller: "Mkenya Organic Farm", amount: 8200, date: "2024-03-17", status: "Completed", method: "MPESA" },
];

export default function AdminMarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tighter">Mkenya Marketplace</h1>
            <p className="text-brand-text-muted text-sm">Oversee vendor registrations, auditing earnings, and processing payouts.</p>
         </div>
         <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="bg-brand-surface border-border text-xs font-bold uppercase tracking-widest">
               <Download className="w-3 h-3 mr-2" />
               Report
            </Button>
         </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
         <Card className="bg-brand-surface border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
               <CardTitle className="text-[10px] font-bold text-brand-text-muted uppercase tracking-widest">Aggregate Sales</CardTitle>
               <Store className="w-4 h-4 text-brand-primary" />
            </CardHeader>
            <CardContent>
               <div className="text-3xl font-black text-white">KES 490,200</div>
               <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-green-500">
                  <ArrowUpRight className="w-3 h-3" />
                  +18.4% from last month
               </div>
            </CardContent>
         </Card>

         <Card className="bg-brand-surface border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
               <CardTitle className="text-[10px] font-bold text-brand-text-muted uppercase tracking-widest">Pending Payouts</CardTitle>
               <Wallet className="w-4 h-4 text-kenya-red" />
            </CardHeader>
            <CardContent>
               <div className="text-3xl font-black text-white">KES 70,700</div>
               <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-brand-text-muted">
                  14 Requests Outstanding
               </div>
            </CardContent>
         </Card>

         <Card className="bg-brand-surface border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
               <CardTitle className="text-[10px] font-bold text-brand-text-muted uppercase tracking-widest">Active Vendors</CardTitle>
               <CheckCircle2 className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
               <div className="text-3xl font-black text-white">248</div>
               <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-green-500">
                  +12 New this week
               </div>
            </CardContent>
         </Card>
      </div>

      <Tabs defaultValue="sellers" className="w-full">
        <TabsList className="bg-brand-surface border border-border p-1 gap-1">
          <TabsTrigger value="sellers" className="data-[state=active]:bg-brand-primary data-[state=active]:text-black text-xs font-bold uppercase tracking-widest px-6 py-2">
            Sellers Overview
          </TabsTrigger>
          <TabsTrigger value="withdrawals" className="data-[state=active]:bg-brand-primary data-[state=active]:text-black text-xs font-bold uppercase tracking-widest px-6 py-2">
            Withdrawal Requests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sellers" className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="relative w-80">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-brand-text-muted" />
              <Input 
                placeholder="Search sellers by name or ID..." 
                className="pl-10 bg-brand-surface border-border"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="text-xs font-bold uppercase tracking-widest border-border">
                Filter Status
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-brand-surface overflow-hidden">
            <Table>
              <TableHeader className="bg-black/40">
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-[10px] font-black uppercase text-brand-text-muted p-4">Vendor Details</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-brand-text-muted p-4">Total Earnings</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-brand-text-muted p-4">Withdrawn</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-brand-text-muted p-4">Current Balance</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-brand-text-muted p-4">Status</TableHead>
                  <TableHead className="text-right p-4"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_SELLERS.map((seller) => (
                  <TableRow key={seller.id} className="border-border hover:bg-white/2">
                    <TableCell className="p-4">
                      <div>
                        <p className="text-sm font-bold text-white">{seller.name}</p>
                        <p className="text-[10px] text-brand-text-muted font-mono">{seller.email} • ID: {seller.id}</p>
                      </div>
                    </TableCell>
                    <TableCell className="p-4 text-sm font-mono text-white">KES {seller.earnings.toLocaleString()}</TableCell>
                    <TableCell className="p-4 text-sm font-mono text-brand-text-muted">KES {seller.withdrawn.toLocaleString()}</TableCell>
                    <TableCell className="p-4">
                       <span className={`text-sm font-black ${seller.pending > 10000 ? 'text-kenya-red' : 'text-green-500'}`}>
                         KES {seller.pending.toLocaleString()}
                       </span>
                    </TableCell>
                    <TableCell className="p-4">
                      <Badge className={cn(
                        "rounded-sm text-[9px] font-black uppercase tracking-widest",
                        seller.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                      )}>
                        {seller.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="p-4 text-right">
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4 text-brand-text-muted" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="withdrawals" className="mt-6">
          <div className="rounded-xl border border-border bg-brand-surface overflow-hidden">
            <Table>
              <TableHeader className="bg-black/40">
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-[10px] font-black uppercase text-brand-text-muted p-4">Reference</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-brand-text-muted p-4">Seller</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-brand-text-muted p-4">Amount</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-brand-text-muted p-4">Method</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-brand-text-muted p-4">Date</TableHead>
                  <TableHead className="text-[10px] font-black uppercase text-brand-text-muted p-4 text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_WITHDRAWALS.map((w) => (
                  <TableRow key={w.id} className="border-border hover:bg-white/2">
                    <TableCell className="p-4 text-[10px] font-mono whitespace-nowrap">{w.id}</TableCell>
                    <TableCell className="p-4 font-bold text-white text-sm">{w.seller}</TableCell>
                    <TableCell className="p-4 font-black text-brand-primary text-sm">KES {w.amount.toLocaleString()}</TableCell>
                    <TableCell className="p-4 text-xs text-brand-text-muted">{w.method}</TableCell>
                    <TableCell className="p-4 text-xs text-brand-text-muted">{w.date}</TableCell>
                    <TableCell className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                         {w.status === 'Pending' && (
                           <>
                             <Button size="sm" variant="outline" className="h-7 text-[9px] font-black uppercase text-green-500 border-green-500/20 hover:bg-green-500/10">Approve</Button>
                             <Button size="sm" variant="outline" className="h-7 text-[9px] font-black uppercase text-red-500 border-red-500/20 hover:bg-red-500/10">Deny</Button>
                           </>
                         )}
                         {w.status !== 'Pending' && (
                           <Badge className="bg-brand-surface-secondary text-[9px] font-black uppercase">{w.status}</Badge>
                         )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
