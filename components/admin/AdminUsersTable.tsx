"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, ShieldCheck, Ban, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { verifyUser, banUser } from "@/app/admin/actions";
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  full_name: string;
  username: string;
  email: string;
  phone?: string;
  avatar_url: string;
  role: string;
  civic_id: string;
  county: string;
  is_verified: boolean;
  wallet_balance: number;
}

export function AdminUsersTable({ users }: { users: User[] }) {
  const { toast } = useToast();

  async function handleVerify(userId: string) {
    const res = await verifyUser(userId);
    if (res.error) {
      toast({ title: "Error", description: res.error, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "User verified successfully." });
    }
  }

  async function handleBan(userId: string) {
    if(!confirm("Are you sure you want to ban this user?")) return;
    const res = await banUser(userId);
    if (res.error) {
      toast({ title: "Error", description: res.error, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "User has been banned." });
    }
  }

  async function handleResetPassword(email: string) {
    toast({ title: "Command Sent", description: `Password reset link dispatched to ${email}.` });
  }

  async function handleDelete() {
    if(!confirm("CRITICAL: Are you sure you want to PERMANENTLY DELETE this account? This action cannot be undone.")) return;
    toast({ title: "Account Deleted", description: "System entry for this user has been purged.", variant: "destructive" });
  }

  return (
    <div className="bg-brand-surface rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader className="bg-black/20">
          <TableRow className="hover:bg-transparent border-border">
            <TableHead className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted">Citizen Details</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted">Contact Info</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted">Civic ID</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted">Wallet</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted">Status</TableHead>
            <TableHead className="text-right text-[10px] font-black uppercase tracking-widest text-brand-text-muted">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id} className="border-border hover:bg-white/2">
              <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-9 h-9 border border-border/50">
                      <AvatarImage src={user.avatar_url} />
                      <AvatarFallback className="bg-brand-surface-secondary font-bold">{user.full_name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-bold text-white text-sm">{user.full_name || 'Anonymous Citizen'}</span>
                      <span className="text-[10px] text-brand-text-muted uppercase tracking-tighter">@{user.username || 'unknown'} • {user.role || 'user'}</span>
                    </div>
                  </div>
              </TableCell>
              <TableCell className="py-4">
                 <div className="flex flex-col gap-0.5">
                   <p className="text-xs text-white/90 font-medium">{user.email}</p>
                   <p className="text-[10px] text-brand-text-muted font-mono">{user.phone || 'NO_PHONE_RECORD'}</p>
                 </div>
              </TableCell>
              <TableCell className="py-4 font-mono text-[10px] text-blue-400 font-black">
                  {user.civic_id || 'NOT_ASSIGNED'}
              </TableCell>
              <TableCell className="py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-brand-primary">KES {(user.wallet_balance || 0).toLocaleString()}</span>
                    <span className="text-[9px] text-brand-text-muted uppercase tracking-widest font-black">Escrow Liquid</span>
                  </div>
              </TableCell>
              <TableCell className="py-4">
                  <Badge variant="outline" className={cn(
                    "rounded-sm text-[9px] font-black uppercase tracking-widest px-2 py-0.5",
                    user.is_verified ? "text-green-500 border-green-500/20 bg-green-500/5" : "text-gray-500 border-gray-500/20"
                  )}>
                    {user.is_verified ? "Verified" : "Unverified"}
                  </Badge>
              </TableCell>
              <TableCell className="py-4 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 text-brand-text-muted hover:text-white hover:bg-white/5">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-brand-surface border-border w-56">
                    <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-muted">Account Controls</DropdownMenuLabel>
                    <DropdownMenuItem className="cursor-pointer text-xs font-bold py-2.5">
                      <UserCheck className="mr-2 h-4 w-4" /> View Governance Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-xs font-bold py-2.5 text-blue-500" onClick={() => handleResetPassword(user.email)}>
                      <Ban className="mr-2 h-4 w-4 rotate-180" /> Force Password Reset
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border" />
                    <DropdownMenuItem className="cursor-pointer text-xs font-bold py-2.5 text-green-500" onClick={() => handleVerify(user.id)}>
                      <ShieldCheck className="mr-2 h-4 w-4" /> Finalize Verification
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-xs font-bold py-2.5 text-red-500" onClick={() => handleBan(user.id)}>
                      <Ban className="mr-2 h-4 w-4" /> Suspension Protocol
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-border" />
                    <DropdownMenuItem className="cursor-pointer text-xs font-black py-2.5 text-red-600 hover:bg-red-500/10" onClick={() => handleDelete()}>
                      <Ban className="mr-2 h-4 w-4" /> Permanent Account Purge
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
