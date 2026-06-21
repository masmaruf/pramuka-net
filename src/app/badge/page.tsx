import type { Metadata } from "next";
import {
  Award,
  Pencil,
  Flame,
  Heart,
  Bird,
  Compass,
  Trophy,
  Target,
  CheckCircle,
  Lock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { badges } from "@/lib/data";

export const metadata: Metadata = {
  title: "Badge & Tantangan",
  description:
    "Raih emblem digital eksklusif sebagai bukti kontribusimu di Pramuka.net",
};

const iconMap: Record<string, React.ElementType> = {
  pencil: Pencil,
  flame: Flame,
  award: Award,
  heart: Heart,
  eagle: Bird,
  compass: Compass,
};

const challenges = [
  {
    id: "ch1",
    title: "Penulis Minggu Ini",
    description: "Tulis dan kirimkan 1 artikel minggu ini",
    reward: "+50 poin",
    deadline: "Berakhir Minggu",
    progress: 0,
    total: 1,
  },
  {
    id: "ch2",
    title: "Penjelajah Kategori",
    description: "Tulis artikel di 2 kategori berbeda bulan ini",
    reward: "+100 poin",
    deadline: "Berakhir akhir bulan",
    progress: 0,
    total: 2,
  },
  {
    id: "ch3",
    title: "Pembaca Setia",
    description: "Baca 10 artikel berbeda minggu ini",
    reward: "+30 poin",
    deadline: "Berakhir Minggu",
    progress: 3,
    total: 10,
  },
];

export default function BadgePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <Trophy className="mx-auto mb-4 h-12 w-12 text-primary" />
        <h1 className="text-3xl font-bold">Badge & Tantangan</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Raih emblem digital eksklusif sebagai bukti kontribusimu di
          Pramuka.net
        </p>
      </div>

      {/* Badge Gallery */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Galeri Badge</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((badge) => {
            const Icon = iconMap[badge.icon] || Award;
            return (
              <Card key={badge.id} className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{badge.name}</h3>
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {badge.description}
                      </p>
                      <p className="mt-3 text-xs text-muted-foreground">
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
          {challenges.map((ch) => (
            <Card key={ch.id}>
              <CardContent className="p-6">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold">{ch.title}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {ch.reward}
                  </Badge>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">
                  {ch.description}
                </p>

                {/* Progress bar */}
                <div className="mb-2 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{
                      width: `${(ch.progress / ch.total) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {ch.progress}/{ch.total}{" "}
                    {ch.progress === ch.total ? (
                      <CheckCircle className="ml-1 inline h-3 w-3 text-primary" />
                    ) : null}
                  </span>
                  <span>{ch.deadline}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground">
            Masuk ke akunmu untuk melacak progress dan mendapatkan badge
          </p>
        </div>
      </section>
    </div>
  );
}
