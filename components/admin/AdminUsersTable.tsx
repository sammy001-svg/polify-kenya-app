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
import { verifyUser, banUser, adminResetPassword, adminDeleteUser } from "@/app/admin/actions";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, Phone, MapPin, Calendar, Wallet, BadgeCheck } from "lucide-react";

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
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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
    const res = await adminResetPassword(email);
    if (res.error) {
      toast({ title: "Error", description: res.error, variant: "destructive" });
    } else {
      toast({ title: "Command Sent", description: `Password reset link dispatched to ${email}.` });
    }
  }

  async function handleDelete(userId: string) {
    if(!confirm("CRITICAL: Are you sure you want to PERMANENTLY DELETE this account? This action cannot be undone.")) return;
    const res = await adminDeleteUser(userId);
    if (res.error) {
      toast({ title: "Error", description: res.error, variant: "destructive" });
    } else {
      toast({ title: "Account Deleted", description: "System entry for this user has been purged.", variant: "destructive" });
    }
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
                    <DropdownMenuItem 
                      className="cursor-pointer text-xs font-bold py-2.5"
                      onClick={() => setSelectedUser(user)}
                    >
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
                    <DropdownMenuItem className="cursor-pointer text-xs font-black py-2.5 text-red-600 hover:bg-red-500/10" onClick={() => handleDelete(user.id)}>
                      <Ban className="mr-2 h-4 w-4" /> Permanent Account Purge
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="bg-brand-surface border-border text-white max-w-2xl overflow-hidden">
          <DialogHeader className="border-b border-border/50 pb-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-2 border-brand-primary">
                <AvatarImage src={selectedUser?.avatar_url} />
                <AvatarFallback className="text-xl font-black bg-brand-surface-secondary">
                  {selectedUser?.full_name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-2xl font-black tracking-tight flex items-center gap-2">
                  {selectedUser?.full_name}
                  {selectedUser?.is_verified && <BadgeCheck className="h-6 w-6 text-brand-primary" />}
                </DialogTitle>
                <p className="text-brand-text-muted font-mono uppercase text-xs tracking-widest">
                  @{selectedUser?.username} • {selectedUser?.role}
                </p>
              </div>
            </div>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-6 py-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/5 rounded-lg">
                  <Mail className="h-4 w-4 text-brand-text-muted" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-brand-text-muted font-black">Email Address</p>
                  <p className="text-sm font-bold text-white/90">{selectedUser?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/5 rounded-lg">
                  <Phone className="h-4 w-4 text-brand-text-muted" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-brand-text-muted font-black">Phone Number</p>
                  <p className="text-sm font-bold text-white/90 font-mono">{selectedUser?.phone || 'Not Recorded'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/5 rounded-lg">
                  <MapPin className="h-4 w-4 text-brand-text-muted" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-brand-text-muted font-black">County</p>
                  <p className="text-sm font-bold text-white/90">{selectedUser?.county || 'Not Set'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/5 rounded-lg">
                  <ShieldCheck className="h-4 w-4 text-brand-text-muted" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-brand-text-muted font-black">Civic ID</p>
                  <p className="text-sm font-black text-blue-400 font-mono">{selectedUser?.civic_id || 'NOT_ASSIGNED'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/5 rounded-lg">
                  <Wallet className="h-4 w-4 text-brand-text-muted" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-brand-text-muted font-black">Wallet Balance</p>
                  <p className="text-sm font-black text-brand-primary">KES {selectedUser?.wallet_balance.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/5 rounded-lg">
                  <Calendar className="h-4 w-4 text-brand-text-muted" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-brand-text-muted font-black">Status</p>
                  <Badge variant="outline" className={cn(
                    "mt-0.5 rounded-sm text-[10px] font-black uppercase tracking-widest px-2 py-0.5",
                    selectedUser?.is_verified ? "text-green-500 border-green-500/20 bg-green-500/5" : "text-gray-500 border-gray-500/20"
                  )}>
                    {selectedUser?.is_verified ? "Verified Citizen" : "Verification Pending"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/20 -mx-6 -mb-6 p-6 flex justify-end gap-3">
            <Button 
               variant="outline" 
               className="border-border hover:bg-white/5 h-9 text-xs font-black uppercase tracking-widest"
               onClick={() => setSelectedUser(null)}
            >
              Close Record
            </Button>
            {!selectedUser?.is_verified && (
              <Button 
                className="bg-brand-primary hover:bg-brand-primary/90 text-black h-9 text-xs font-black uppercase tracking-widest"
                onClick={() => {
                  handleVerify(selectedUser!.id);
                  setSelectedUser(null);
                }}
              >
                Verify Citizen
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
