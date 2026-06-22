"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { User } from "./types";

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

interface RegisterData {
  name: string;
  email: string;
  username: string;
  password: string;
}

const STORAGE_KEY = "pramuka_auth";

const demoUsers: (User & { password: string })[] = [
  {
    id: "u1",
    name: "Raka Nugraha",
    email: "raka@pramuka.net",
    username: "raka_pramuka",
    role: "contributor",
    points: 420,
    articleCount: 7,
    badges: ["b1", "b2"],
    joinDate: "2024-01-15",
    password: "password123",
  },
  {
    id: "u-admin",
    name: "Admin Pramuka",
    email: "admin@pramuka.net",
    username: "admin",
    role: "admin",
    points: 0,
    articleCount: 0,
    badges: [],
    joinDate: "2024-01-01",
    password: "admin123",
  },
];

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, isLoading: true });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setState({ user: JSON.parse(stored), isLoading: false });
      } else {
        setState({ user: null, isLoading: false });
      }
    } catch {
      setState({ user: null, isLoading: false });
    }
  }, []);

  const persist = useCallback((user: User | null) => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    setState({ user, isLoading: false });
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const found = demoUsers.find(
        (u) => u.email === email && u.password === password
      );
      if (found) {
        const { password: _, ...user } = found;
        persist(user);
        return { ok: true };
      }

      const stored = localStorage.getItem("pramuka_users");
      if (stored) {
        const users: (User & { password: string })[] = JSON.parse(stored);
        const match = users.find(
          (u) => u.email === email && u.password === password
        );
        if (match) {
          const { password: _, ...user } = match;
          persist(user);
          return { ok: true };
        }
      }

      return { ok: false, error: "Email atau kata sandi salah" };
    },
    [persist]
  );

  const register = useCallback(
    async (data: RegisterData) => {
      const allDemo = demoUsers.map((u) => u.email);
      const stored = localStorage.getItem("pramuka_users");
      const existing: (User & { password: string })[] = stored
        ? JSON.parse(stored)
        : [];

      if (
        allDemo.includes(data.email) ||
        existing.some((u) => u.email === data.email)
      ) {
        return { ok: false, error: "Email sudah terdaftar" };
      }
      if (existing.some((u) => u.username === data.username)) {
        return { ok: false, error: "Username sudah digunakan" };
      }

      const newUser: User & { password: string } = {
        id: `u-${Date.now()}`,
        name: data.name,
        email: data.email,
        username: data.username,
        role: "member",
        points: 0,
        articleCount: 0,
        badges: [],
        joinDate: new Date().toISOString().slice(0, 10),
        password: data.password,
      };

      existing.push(newUser);
      localStorage.setItem("pramuka_users", JSON.stringify(existing));

      const { password: _, ...user } = newUser;
      persist(user);
      return { ok: true };
    },
    [persist]
  );

  const updateUser = useCallback(
    (updates: Partial<User>) => {
      if (!state.user) return;
      const updated = { ...state.user, ...updates };
      persist(updated);
    },
    [state.user, persist]
  );

  const logout = useCallback(() => {
    persist(null);
  }, [persist]);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
