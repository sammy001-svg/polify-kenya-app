"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getEventReservations } from "@/app/(platform)/campaign/events/actions";
import { Loader2, Users, Phone, Calendar } from "lucide-react";
import { format } from "date-fns";

interface Reservation {
  id: string;
  full_name: string;
  phone_number: string;
  created_at: string;
}

interface AttendeeListDialogProps {
  eventId: string;
  eventTitle: string;
  trigger: React.ReactNode;
}

export function AttendeeListDialog({ eventId, eventTitle, trigger }: AttendeeListDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadReservations = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await getEventReservations(eventId);
    if (result.error) {
      setError(result.error);
    } else if (result.data) {
      setReservations(result.data);
    }
    setLoading(false);
  }, [eventId]);

  useEffect(() => {
    if (open) {
      loadReservations();
    }
  }, [open, loadReservations]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-hidden flex flex-col bg-brand-surface border-border">
        <DialogHeader>
          <div className="flex items-center gap-2 text-kenya-red mb-1">
            <Users className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-widest">Attendee Roster</span>
          </div>
          <DialogTitle className="text-2xl font-bold truncate">
            {eventTitle}
          </DialogTitle>
          <DialogDescription>
            List of people who have reserved for this event.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
              <p className="text-xs font-black uppercase tracking-widest text-brand-text-muted">Fetching Attendee List...</p>
            </div>
          ) : error ? (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium">
              {error}
            </div>
          ) : reservations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-2 opacity-50">
              <Users className="w-12 h-12 text-brand-text-muted" />
              <p className="font-bold">No reservations found yet.</p>
              <p className="text-xs">Once users join from the MASHINANI page, they will appear here.</p>
            </div>
          ) : (
            <div className="border border-border rounded-xl overflow-hidden">
              <Table>
                <TableHeader className="bg-brand-surface-secondary">
                  <TableRow>
                    <TableHead className="font-bold text-[10px] uppercase tracking-wider">Name</TableHead>
                    <TableHead className="font-bold text-[10px] uppercase tracking-wider text-right">Phone</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.map((res) => (
                    <TableRow key={res.id} className="hover:bg-brand-surface-secondary transition-colors group">
                      <TableCell className="py-3">
                        <div className="font-bold text-sm text-brand-text group-hover:text-brand-primary transition-colors">
                          {res.full_name}
                        </div>
                        <div className="text-[9px] text-brand-text-muted flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3" />
                          Joined {format(new Date(res.created_at), "MMM d, h:mm a")}
                        </div>
                      </TableCell>
                      <TableCell className="text-right py-3">
                        <a 
                          href={`tel:${res.phone_number}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-kenya-green/10 text-kenya-green hover:bg-kenya-green hover:text-white transition-all text-xs font-bold font-mono"
                        >
                          <Phone className="w-3 h-3" />
                          {res.phone_number}
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-border flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-brand-text-muted">
          <span>Total Attendees: {reservations.length}</span>
          <Button variant="ghost" size="sm" onClick={() => loadReservations()} className="h-8 text-[10px] font-black">
            Refresh
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
