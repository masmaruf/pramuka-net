"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X, Search, User, LogOut, Shield, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/artikel", label: "Artikel" },
  { href: "/badge", label: "Badge & Tantangan" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    setDropdownOpen(false);
    setMobileOpen(false);
    router.push("/");
  }

  const initials = user
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "";

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-primary">
            ⚜️ Pramuka.net
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/artikel">
            <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </Link>

          {user ? (
            <>
            <Link href="/kirim-artikel">
              <Button size="sm" variant="outline" className="gap-1">
                <PenLine className="h-4 w-4" />
                Kirim Artikel
              </Button>
            </Link>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-full p-1 transition-colors hover:bg-muted"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                </Avatar>
              </button>

              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 z-50 mt-2 w-56 rounded-lg border bg-card p-1 shadow-lg">
                    <div className="border-b px-3 py-2">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        @{user.username}
                      </p>
                    </div>
                    <Link
                      href="/profil"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted"
                    >
                      <User className="h-4 w-4" />
                      Profil Saya
                    </Link>
                    {(user.role === "admin" || user.role === "moderator") && (
                      <Link
                        href="/admin"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted"
                      >
                        <Shield className="h-4 w-4" />
                        Panel Admin
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-muted"
                    >
                      <LogOut className="h-4 w-4" />
                      Keluar
                    </button>
                  </div>
                </>
              )}
            </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Masuk
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Daftar</Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t md:hidden">
          <nav className="flex flex-col gap-1 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <>
                <div className="my-2 border-t" />
                <div className="flex items-center gap-3 px-3 py-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">@{user.username}</p>
                  </div>
                </div>
                <Link
                  href="/kirim-artikel"
                  className="rounded-md px-3 py-2 text-sm font-medium text-primary hover:bg-accent"
                  onClick={() => setMobileOpen(false)}
                >
                  + Kirim Artikel
                </Link>
                <Link
                  href="/profil"
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent"
                  onClick={() => setMobileOpen(false)}
                >
                  Profil Saya
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-md px-3 py-2 text-left text-sm font-medium text-destructive hover:bg-accent"
                >
                  Keluar
                </button>
              </>
            ) : (
              <div className="mt-3 flex gap-2 border-t pt-3">
                <Link href="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full" size="sm">
                    Masuk
                  </Button>
                </Link>
                <Link href="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full" size="sm">
                    Daftar
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
