"use client";

import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Trash2, CheckCircle, Ban as BanIcon } from "lucide-react";
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
import { updatePetitionStatus, deletePetition } from "@/app/admin/actions";
import { useToast } from "@/components/ui/use-toast";

interface Petition {
  id: string;
  title: string;
  description: string;
  status: string;
  current_signatures: number;
  target_signatures: number;
  created_at: string;
}

export function AdminPetitionsTable({ petitions }: { petitions: Petition[] }) {
  const { toast } = useToast();

  async function handleStatusChange(id: string, status: 'active' | 'closed' | 'victory') {
    const res = await updatePetitionStatus(id, status);
    if (res.error) {
      toast({ title: "Error", description: res.error, variant: "destructive" });
    } else {
      toast({ title: "Success", description: `Petition marked as ${status}.` });
    }
  }

  async function handleDelete(id: string) {
    if(!confirm("Are you sure you want to delete this petition permanently?")) return;
    const res = await deletePetition(id);
    if (res.error) {
      toast({ title: "Error", description: res.error, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Petition deleted." });
    }
  }

  return (
    <div className="bg-brand-surface rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[400px]">Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Signatures</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {petitions?.map((petition) => (
              <TableRow key={petition.id} className="hover:bg-brand-surface-secondary/50">
                <TableCell>
                   <div className="flex flex-col gap-1">
                      <span className="font-medium line-clamp-1">{petition.title}</span>
                      <span className="text-xs text-brand-text-muted line-clamp-1">{petition.description}</span>
                   </div>
                </TableCell>
                <TableCell>
                  <Badge className={`
                    ${petition.status === 'active' ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' : ''}
                    ${petition.status === 'closed' ? 'bg-gray-500/10 text-gray-500' : ''}
                    ${petition.status === 'victory' ? 'bg-yellow-500/10 text-yellow-500' : ''}
                  `}>
                    {petition.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{petition.current_signatures}</span>
                        <span className="text-xs text-brand-text-muted">/ {petition.target_signatures}</span>
                    </div>
                </TableCell>
                <TableCell className="text-sm text-brand-text-muted">
                    {new Date(petition.created_at).toLocaleDateString()}
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
                      <DropdownMenuLabel>Moderation</DropdownMenuLabel>
                      <DropdownMenuItem className="cursor-pointer" onClick={() => handleStatusChange(petition.id, 'victory')}>
                         <CheckCircle className="mr-2 h-4 w-4" /> Mark Victory
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer text-orange-500" onClick={() => handleStatusChange(petition.id, 'closed')}>
                         <BanIcon className="mr-2 h-4 w-4" /> Close Petition
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer text-red-500" onClick={() => handleDelete(petition.id)}>
                         <Trash2 className="mr-2 h-4 w-4" /> Delete Permanently
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
