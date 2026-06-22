"use client";

import {
  Award,
  Trophy,
  Target,
  CheckCircle,
  Lock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { badges } from "@/lib/data";
import { useAuth } from "@/lib/auth-context";
import { useArticleStore } from "@/lib/article-store";
import { getBadgeProgress } from "@/lib/gamification";
import { badgeIconMap } from "@/lib/icon-map";
import { POINTS_PER_ARTICLE } from "@/lib/constants";

export default function BadgePage() {
  const { user } = useAuth();
  const { getAcceptedByAuthor, getAcceptedCategories } = useArticleStore();

  const acceptedArticles = user ? getAcceptedByAuthor(user.username) : [];
  const acceptedCategories = user ? getAcceptedCategories(user.username) : [];
  const totalAccepted = acceptedArticles.length + (user?.articleCount || 0);

  const now = new Date();
  const monthlyCount = acceptedArticles.filter((a) => {
    if (!a.publishedAt) return false;
    const d = new Date(a.publishedAt);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const challenges = [
    {
      id: "ch1",
      title: "Penulis Minggu Ini",
      description: "Tulis dan kirimkan 1 artikel minggu ini",
      reward: `+${POINTS_PER_ARTICLE} poin`,
      deadline: "Berakhir Minggu",
      progress: Math.min(monthlyCount, 1),
      total: 1,
    },
    {
      id: "ch2",
      title: "Penjelajah Kategori",
      description: "Tulis artikel di 2 kategori berbeda bulan ini",
      reward: `+${POINTS_PER_ARTICLE * 2} poin`,
      deadline: "Berakhir akhir bulan",
      progress: Math.min(acceptedCategories.length, 2),
      total: 2,
    },
    {
      id: "ch3",
      title: "Kontributor Andalan",
      description: "Terbitkan 3 artikel bulan ini",
      reward: `+${POINTS_PER_ARTICLE * 3} poin`,
      deadline: "Berakhir akhir bulan",
      progress: Math.min(monthlyCount, 3),
      total: 3,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <Trophy className="mx-auto mb-4 h-12 w-12 text-primary" />
        <h1 className="text-3xl font-bold">Badge & Tantangan</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Raih emblem digital eksklusif sebagai bukti kontribusimu di Pramuka.net
        </p>
        {user && (
          <p className="mt-2 text-sm text-primary font-medium">
            {user.points} poin · {user.badges.length} badge diraih
          </p>
        )}
      </div>

      {/* Badge Gallery */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Galeri Badge</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((badge) => {
            const Icon = badgeIconMap[badge.icon] || Award;
            const earned = user?.badges.includes(badge.id);
            const progress = getBadgeProgress(
              badge.id,
              totalAccepted,
              monthlyCount,
              acceptedCategories.length
            );
            const pct = progress.total > 0 ? (progress.current / progress.total) * 100 : 0;

            return (
              <Card
                key={badge.id}
                className={`relative overflow-hidden ${earned ? "ring-2 ring-primary" : ""}`}
              >
                {earned && (
                  <div className="absolute right-3 top-3">
                    <Badge className="gap-1 bg-primary text-primary-foreground text-xs">
                      <CheckCircle className="h-3 w-3" />
                      Diraih
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${
                        earned ? "bg-primary/20" : "bg-primary/10"
                      }`}
                    >
                      <Icon className={`h-8 w-8 ${earned ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{badge.name}</h3>
                        {!earned && <Lock className="h-4 w-4 text-muted-foreground" />}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {badge.description}
                      </p>

                      {/* Progress bar */}
                      {user && !earned && progress.total > 0 && (
                        <div className="mt-3">
                          <div className="mb-1 h-2 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-primary transition-all"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {progress.current}/{progress.total}
                          </p>
                        </div>
                      )}

                      <p className="mt-2 text-xs text-muted-foreground">
                        {badge.requirement}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Active Challenges */}
      <section>
        <div className="mb-6 flex items-center gap-3">
          <Target className="h-6 w-6 text-accent" />
          <h2 className="text-2xl font-bold">Tantangan Aktif</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {challenges.map((ch) => {
            const pct = ch.total > 0 ? (ch.progress / ch.total) * 100 : 0;
            const done = ch.progress >= ch.total;
            return (
              <Card key={ch.id}>
                <CardContent className="p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-semibold">{ch.title}</h3>
                    <Badge variant={done ? "default" : "secondary"} className="text-xs">
                      {done ? "Selesai!" : ch.reward}
                    </Badge>
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {ch.description}
                  </p>

                  <div className="mb-2 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {ch.progress}/{ch.total}
                      {done && <CheckCircle className="ml-1 inline h-3 w-3 text-primary" />}
                    </span>
                    <span>{ch.deadline}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {!user && (
          <div className="mt-8 rounded-lg border border-dashed p-8 text-center">
            <p className="text-muted-foreground">
              Masuk ke akunmu untuk melacak progress dan mendapatkan badge
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
