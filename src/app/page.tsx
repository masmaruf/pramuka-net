import Link from "next/link";
import {
  Users,
  BookOpen,
  UserCheck,
  ArrowRight,
  PenLine,
  Shield,
  Award,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArticleCard } from "@/components/article/article-card";
import { articles, siteStats, badges, getEditorPicks } from "@/lib/data";

const stats = [
  {
    label: "Total Anggota",
    value: siteStats.totalMembers.toLocaleString("id-ID"),
    icon: Users,
  },
  {
    label: "Artikel Diterbitkan",
    value: siteStats.totalArticles.toLocaleString("id-ID"),
    icon: BookOpen,
  },
  {
    label: "Kontributor Aktif",
    value: siteStats.totalContributors.toLocaleString("id-ID"),
    icon: UserCheck,
  },
];

const steps = [
  {
    icon: UserCheck,
    title: "Buat Akun",
    desc: "Buat akun gratis dan lengkapi profil Pramuka-mu",
  },
  {
    icon: PenLine,
    title: "Tulis Artikel",
    desc: "Tulis dan kirim artikel pengetahuan kepanduan",
  },
  {
    icon: Shield,
    title: "Moderasi",
    desc: "Tim kami akan meninjau dan menerbitkan artikelmu",
  },
  {
    icon: Award,
    title: "Raih Badge",
    desc: "Kumpulkan poin dan dapatkan emblem digital eksklusif",
  },
];

export default function HomePage() {
  const editorPicks = getEditorPicks();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4 text-sm">
              🇮🇩 Platform Kepanduan Indonesia
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Berbagi Pengetahuan,
              <br />
              <span className="text-primary">Semangat Kepanduan</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Tulis artikel, raih badge, dan bangun komunitas bersama. Platform
              untuk berbagi pengalaman dan semangat kepanduan Indonesia.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/artikel">
                <Button size="lg" className="gap-2">
                  Jelajahi Artikel
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline">
                  Daftar Sekarang
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 -mt-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Editor Picks */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Artikel Pilihan</h2>
              <p className="mt-1 text-muted-foreground">
                Konten terbaik dari kontributor kami
              </p>
            </div>
            <Link href="/artikel">
              <Button variant="ghost" className="gap-1">
                Lihat Semua
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {editorPicks.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Artikel Terbaru</h2>
              <p className="mt-1 text-muted-foreground">
                Kumpulan pengetahuan dari kontributor Pramuka seluruh Indonesia
              </p>
            </div>
            <Link href="/artikel">
              <Button variant="ghost" className="gap-1">
                Lihat Semua
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 6).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Badge Highlights */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold">Raih Badge Eksklusif</h2>
            <p className="mt-1 text-muted-foreground">
              Raih emblem digital sebagai bukti kontribusimu di Pramuka.net
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {badges.map((badge) => (
              <Card key={badge.id} className="text-center">
                <CardContent className="p-4">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <Award className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold">{badge.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {badge.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-primary/5 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold">Cara Berkontribusi</h2>
            <p className="mt-1 text-muted-foreground">
              Setiap artikel yang kamu kirim akan dimoderasi oleh tim admin kami.
              Kontributor terbaik mendapatkan badge eksklusif!
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step.title} className="relative text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <step.icon className="h-7 w-7" />
                </div>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground">
                  {i + 1}
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <CheckCircle className="mx-auto mb-4 h-12 w-12 text-primary" />
          <h2 className="text-3xl font-bold">
            Siap Berbagi Pengetahuan Kepanduan?
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Bergabunglah dengan ribuan kontributor Pramuka dan bagikan
            pengalamanmu kepada komunitas.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/register">
              <Button size="lg" className="gap-2">
                Daftar Sekarang
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
