"use client";

import { useState } from "react";
import { Bell, CheckCheck, Trash2, Award, FileText, Star, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotificationStore, type NotificationType } from "@/lib/notification-store";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "baru saja";
  if (mins < 60) return `${mins}m lalu`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}j lalu`;
  const days = Math.floor(hours / 24);
  return `${days}h lalu`;
}

const typeIcons: Record<NotificationType, typeof FileText> = {
  article_accepted: FileText,
  article_rejected: XCircle,
  badge_earned: Award,
  points_earned: Star,
};

const typeColors: Record<NotificationType, string> = {
  article_accepted: "text-green-600",
  article_rejected: "text-red-500",
  badge_earned: "text-yellow-500",
  points_earned: "text-primary",
};

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } =
    useNotificationStore();

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(!open)}
        className="relative"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </Button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-2 w-80 rounded-lg border bg-card shadow-lg">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h3 className="text-sm font-semibold">Notifikasi</h3>
              <div className="flex gap-1">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => markAllAsRead()}
                    title="Tandai semua dibaca"
                  >
                    <CheckCheck className="h-3.5 w-3.5" />
                  </Button>
                )}
                {notifications.length > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => { clearAll(); setOpen(false); }}
                    title="Hapus semua"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <Bell className="mx-auto mb-2 h-8 w-8 text-muted-foreground/40" />
                  <p className="text-sm text-muted-foreground">
                    Belum ada notifikasi
                  </p>
                </div>
              ) : (
                notifications.slice(0, 20).map((notif) => {
                  const Icon = typeIcons[notif.type];
                  const color = typeColors[notif.type];
                  return (
                    <button
                      key={notif.id}
                      className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50 ${
                        !notif.read ? "bg-primary/5" : ""
                      }`}
                      onClick={() => markAsRead(notif.id)}
                    >
                      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${color}`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${!notif.read ? "font-medium" : ""}`}>
                          {notif.title}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {notif.message}
                        </p>
                        <p className="mt-1 text-[10px] text-muted-foreground">
                          {timeAgo(notif.createdAt)}
                        </p>
                      </div>
                      {!notif.read && (
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
