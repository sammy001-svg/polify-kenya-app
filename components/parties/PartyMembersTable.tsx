"use client";

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Shield, MapPin, Mail, Phone, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Member {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: string;
  county: string;
  is_verified: boolean;
  created_at: string;
  avatar_url?: string;
}

export function PartyMembersTable({ members }: { members: Member[] }) {
  return (
    <div className="rounded-2xl border border-border bg-brand-surface overflow-hidden shadow-xl">
      <Table>
        <TableHeader className="bg-white/5">
          <TableRow className="hover:bg-transparent border-border">
            <TableHead className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted">Member</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted">Contact</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted">Location</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted">Status</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest text-brand-text-muted">Joined</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id} className="border-border hover:bg-white/5 transition-colors group">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-white/10">
                    <AvatarImage src={member.avatar_url} />
                    <AvatarFallback className="bg-brand-primary text-white text-xs font-bold">
                      {member.full_name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold text-white flex items-center gap-1.5">
                      {member.full_name}
                      {member.role === 'party_admin' && (
                         <Shield className="w-3 h-3 text-brand-primary" />
                      )}
                    </div>
                    <div className="text-[10px] text-brand-text-muted uppercase tracking-wider font-mono">
                      {member.id.substring(0, 8)}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                 <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-brand-text-muted">
                       <Mail className="w-3 h-3" /> {member.email}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-brand-text-muted">
                       <Phone className="w-3 h-3" /> {member.phone}
                    </div>
                 </div>
              </TableCell>
              <TableCell>
                 <div className="flex items-center gap-2 text-xs text-white/80">
                    <MapPin className="w-3 h-3 text-brand-text-muted" /> {member.county}
                 </div>
              </TableCell>
              <TableCell>
                <Badge className={cn(
                  "rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-tighter",
                  member.is_verified 
                    ? "bg-green-500/10 text-green-500 border-green-500/20" 
                    : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                )}>
                  {member.is_verified ? "Verified" : "Pending"}
                </Badge>
              </TableCell>
              <TableCell>
                 <div className="flex items-center gap-2 text-xs text-brand-text-muted">
                    <Calendar className="w-3 h-3" />
                    {new Date(member.created_at).toLocaleDateString()}
                 </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 text-brand-text-muted hover:text-white">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-brand-surface border-border text-white">
                    <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">View Profile</DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">Verification SMS</DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-white/10 cursor-pointer text-red-500">Ban Member</DropdownMenuItem>
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
