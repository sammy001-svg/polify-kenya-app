"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, ShieldCheck, Ban, UserCheck } from "lucide-react";
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
  avatar_url: string;
  role: string;
  civic_id: string;
  county: string;
  is_verified: boolean;
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

  return (
    <div className="bg-brand-surface rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Civic ID</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id} className="hover:bg-brand-surface-secondary/50">
              <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar_url} />
                      <AvatarFallback>{user.full_name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span>{user.full_name}</span>
                      <span className="text-xs text-brand-text-muted">@{user.username}</span>
                    </div>
                  </div>
              </TableCell>
              <TableCell>
                <Badge variant={user.role === 'admin' ? 'destructive' : 'secondary'} className="capitalize">
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell className="font-mono text-xs text-brand-text-muted">
                  {user.civic_id || '-'}
              </TableCell>
              <TableCell className="text-sm">
                  {user.county || 'N/A'}
              </TableCell>
              <TableCell>
                  <Badge variant="outline" className={user.is_verified ? "text-green-500 border-green-500/50" : "text-gray-500"}>
                    {user.is_verified ? "Verified" : "Unverified"}
                  </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem className="cursor-pointer">
                      <UserCheck className="mr-2 h-4 w-4" /> View Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-blue-500" onClick={() => handleVerify(user.id)}>
                      <ShieldCheck className="mr-2 h-4 w-4" /> Verify User
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-red-500" onClick={() => handleBan(user.id)}>
                      <Ban className="mr-2 h-4 w-4" /> Ban User
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
