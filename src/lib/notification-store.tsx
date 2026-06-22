"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { STORAGE_KEYS } from "./constants";

export type NotificationType = "article_accepted" | "article_rejected" | "badge_earned" | "points_earned";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface NotificationStoreValue {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (data: Omit<Notification, "id" | "read" | "createdAt">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

const NotificationStoreContext = createContext<NotificationStoreValue | null>(null);

export function NotificationStoreProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      if (stored) setNotifications(JSON.parse(stored));
    } catch {}
  }, []);

  function persist(next: Notification[]) {
    setNotifications(next);
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(next));
  }

  const addNotification = useCallback(
    (data: Omit<Notification, "id" | "read" | "createdAt">) => {
      const notif: Notification = {
        ...data,
        id: `notif-${Date.now()}`,
        read: false,
        createdAt: new Date().toISOString(),
      };
      persist([notif, ...notifications]);
    },
    [notifications]
  );

  const markAsRead = useCallback(
    (id: string) => {
      persist(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
    },
    [notifications]
  );

  const markAllAsRead = useCallback(() => {
    persist(notifications.map((n) => ({ ...n, read: true })));
  }, [notifications]);

  const clearAll = useCallback(() => {
    persist([]);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationStoreContext.Provider
      value={{ notifications, unreadCount, addNotification, markAsRead, markAllAsRead, clearAll }}
    >
      {children}
    </NotificationStoreContext.Provider>
  );
}

export function useNotificationStore() {
  const ctx = useContext(NotificationStoreContext);
  if (!ctx) throw new Error("useNotificationStore must be inside NotificationStoreProvider");
  return ctx;
}
