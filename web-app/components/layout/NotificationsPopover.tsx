"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Bell, Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/components/ui/button"; // Reusing cn utility
import Link from "next/link";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  link?: string;
  is_read: boolean;
  created_at: string;
}

export function NotificationsPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10);

        if (data) {
          setNotifications(data);
          setUnreadCount(data.filter(n => !n.is_read).length);
        }
      } catch (err) {
        console.error("Error fetching notifications", err);
      }
    }

    async function subscribeToNotifications() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const channel = supabase
        .channel('realtime-notifications')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            const newNotification = payload.new as Notification;
            setNotifications(prev => [newNotification, ...prev]);
            setUnreadCount(prev => prev + 1);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      }
    }

    fetchNotifications();
    const unsubscribePromise = subscribeToNotifications();

    // Close on click outside
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      unsubscribePromise.then(unsub => unsub && unsub());
    };
  }, [supabase]);

  async function markAsRead(id: string) {
    // Optimistic update
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));

    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id);
  }

  async function markAllRead() {
    const unreadIds = notifications.filter(n => !n.is_read).map(n => n.id);
    if (unreadIds.length === 0) return;

    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    setUnreadCount(0);

    await supabase
      .from('notifications')
      .update({ is_read: true })
      .in('id', unreadIds);
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
           <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-brand-bg animate-pulse" />
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-black text-white border border-white/20 rounded-lg shadow-xl z-50 animate-in fade-in zoom-in-95 duration-100 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/20 bg-white/5">
            <h3 className="font-semibold text-sm">Notifications</h3>
            {unreadCount > 0 && (
                <button onClick={markAllRead} className="text-xs text-white/70 hover:text-white hover:underline">
                    Mark all read
                </button>
            )}
          </div>
          
          <div className="max-h-[300px] overflow-y-auto">
            {notifications.length === 0 ? (
                <div className="p-8 text-center text-white/50 text-sm">
                    No notifications yet.
                </div>
            ) : (
                <div className="divide-y divide-white/10">
                    {notifications.map(notification => (
                        <div 
                            key={notification.id} 
                            className={cn(
                                "flex gap-3 p-4 transition-colors hover:bg-white/10 cursor-pointer",
                                !notification.is_read && "bg-white/5"
                            )}
                            onClick={() => markAsRead(notification.id)}
                        >
                            <div className="mt-0.5 shrink-0">
                                {getIcon(notification.type)}
                            </div>
                            <div className="flex-1 space-y-1">
                                <p className={cn("text-sm", !notification.is_read ? "font-semibold text-white" : "text-white/70")}>
                                    {notification.title}
                                </p>
                                <p className="text-xs text-white/60 line-clamp-2">
                                    {notification.message}
                                </p>
                                {notification.link && (
                                    <Link href={notification.link} className="text-xs text-blue-400 hover:underline block mt-1">
                                        View details →
                                    </Link>
                                )}
                                <p className="text-[10px] text-white/40 pt-1">
                                    {new Date(notification.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                            {!notification.is_read && (
                                <div className="mt-1.5 w-2 h-2 rounded-full bg-kenya-red shrink-0" />
                            )}
                        </div>
                    ))}
                </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
