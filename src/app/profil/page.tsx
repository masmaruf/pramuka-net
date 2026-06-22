"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Award,
  Calendar,
  FileText,
  Star,
  Trophy,
  LogOut,
  Bookmark,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";
import { useArticleStore } from "@/lib/article-store";
import { badges as allBadges, articles as seedArticles, getArticleBySlug } from "@/lib/data";
import { getBadgeProgress } from "@/lib/gamification";
import { useInteractionStore } from "@/lib/interaction-store";
import { badgeIconMap } from "@/lib/icon-map";
import { ROLE_LABELS } from "@/lib/constants";
import { getInitials } from "@/lib/utils";

export default function ProfilPage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const { getByAuthor, getAcceptedByAuthor, getAcceptedCategories } = useArticleStore();
  const { getBookmarks } = useInteractionStore();

  useEffect(() => {
    if (!isLoading && !user) router.replace("/login");
  }, [user, isLoading, router]);

  const earnedBadges = allBadges.filter((b) => user?.badges.includes(b.id));
  const lockedBadges = allBadges.filter((b) => !user?.badges.includes(b.id));
  const seedUserArticles = seedArticles.filter(
    (a) => a.author.username === user?.username
  );
  const submittedUserArticles = user ? getByAuthor(user.username) : [];
  const userArticles = [...submittedUserArticles, ...seedUserArticles];

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Memuat...</p>
      </div>
    );
  }

  if (!user) return null;

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <Card className="mb-8">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <Badge variant="secondary">
                  {ROLE_LABELS[user.role] || user.role}
                </Badge>
              </div>
              <p className="text-muted-foreground">@{user.username}</p>
              <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Bergabung{" "}
                  {new Date(user.joinDate).toLocaleDateString("id-ID", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  {user.articleCount} artikel
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  {user.points} poin
                </span>
              </div>
            </div>

            <Button variant="outline" size="sm" className="gap-1" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Keluar
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Statistik */}
        <div className="space-y-6 lg:col-span-1">
          <Card>
            <CardContent className="p-5">
              <h2 className="mb-4 font-semibold">Statistik</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Poin</span>
                  <span className="font-bold text-primary">{user.points}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Artikel Diterbitkan</span>
                  <span className="font-bold">{user.articleCount}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Badge Diraih</span>
                  <span className="font-bold">{earnedBadges.length}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Role</span>
                  <Badge variant="outline">{ROLE_LABELS[user.role]}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Menuju Badge */}
          <Card>
            <CardContent className="p-5">
              <h2 className="mb-4 font-semibold">Progress Menuju Badge</h2>
              <div className="space-y-4">
                {allBadges.slice(0, 4).map((badge) => {
                  const earned = user.badges.includes(badge.id);
                  const accepted = getAcceptedByAuthor(user.username);
                  const cats = getAcceptedCategories(user.username);
                  const totalAccepted = accepted.length + user.articleCount;
                  const now = new Date();
                  const monthly = accepted.filter((a) => {
                    if (!a.publishedAt) return false;
                    const d = new Date(a.publishedAt);
                    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
                  }).length;
                  const bp = getBadgeProgress(badge.id, totalAccepted, monthly, cats.length);
                  const pct = earned ? 100 : bp.total > 0 ? (bp.current / bp.total) * 100 : 0;
                  const Icon = badgeIconMap[badge.icon] || Award;
                  return (
                    <div key={badge.id}>
                      <div className="mb-1 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">{badge.name}</span>
                        </div>
                        {earned ? (
                          <Badge className="bg-primary/10 text-primary text-xs">Diraih</Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">{bp.current}/{bp.total}</span>
                        )}
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Badge Diraih */}
          <Card>
            <CardContent className="p-5">
              <div className="mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">Badge Diraih</h2>
              </div>
              {earnedBadges.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {earnedBadges.map((badge) => {
                    const Icon = badgeIconMap[badge.icon] || Award;
                    return (
                      <div
                        key={badge.id}
                        className="flex items-center gap-3 rounded-lg border p-3"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{badge.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {badge.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Belum ada badge. Mulai kontribusi untuk mendapatkan badge
                  pertamamu!
                </p>
              )}

              {lockedBadges.length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-medium text-muted-foreground">
                    Badge berikutnya
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {lockedBadges.map((badge) => (
                      <Badge key={badge.id} variant="outline" className="opacity-50">
                        {badge.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Artikel Saya */}
          <Card>
            <CardContent className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold">Artikel Saya</h2>
                </div>
                <Link href="/artikel">
                  <Button variant="ghost" size="sm">
                    Lihat Semua
                  </Button>
                </Link>
              </div>
              {userArticles.length > 0 ? (
                <div className="space-y-3">
                  {userArticles.map((article) => (
                    <Link
                      key={article.id}
                      href={`/artikel/${article.slug}`}
                      className="block rounded-lg border p-3 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">{article.title}</h3>
                        <Badge
                          variant={
                            article.status === "diterima"
                              ? "default"
                              : article.status === "menunggu"
                                ? "secondary"
                                : "destructive"
                          }
                          className="text-xs"
                        >
                          {article.status}
                        </Badge>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {article.category.name} ·{" "}
                        {new Date(article.createdAt).toLocaleDateString("id-ID")}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed p-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Belum ada artikel. Mulai menulis artikelmu!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Artikel Disimpan (Bookmark) */}
          <Card>
            <CardContent className="p-5">
              <div className="mb-4 flex items-center gap-2">
                <Bookmark className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">Artikel Disimpan</h2>
              </div>
              {(() => {
                const slugs = getBookmarks(user.id);
                const saved = slugs
                  .map((s) => getArticleBySlug(s))
                  .filter(Boolean) as NonNullable<ReturnType<typeof getArticleBySlug>>[];
                if (saved.length === 0) {
                  return (
                    <div className="rounded-lg border border-dashed p-6 text-center">
                      <p className="text-sm text-muted-foreground">
                        Belum ada artikel yang disimpan. Tekan ikon bookmark di artikel untuk menyimpan.
                      </p>
                    </div>
                  );
                }
                return (
                  <div className="space-y-3">
                    {saved.map((article) => (
                      <Link
                        key={article.id}
                        href={`/artikel/${article.slug}`}
                        className="block rounded-lg border p-3 transition-colors hover:bg-muted/50"
                      >
                        <h3 className="text-sm font-medium">{article.title}</h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {article.category.name} · {article.author.name}
                        </p>
                      </Link>
                    ))}
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
