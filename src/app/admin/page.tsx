"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  FileText,
  Users,
  BarChart3,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";
import { useArticleStore } from "@/lib/article-store";
import { siteStats } from "@/lib/data";

export default function AdminPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { submittedArticles, updateStatus, toggleEditorPick } = useArticleStore();

  useEffect(() => {
    if (!isLoading && (!user || (user.role !== "admin" && user.role !== "moderator"))) {
      router.replace("/");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || (user.role !== "admin" && user.role !== "moderator")) {
    return null;
  }

  const pending = submittedArticles.filter((a) => a.status === "menunggu");
  const accepted = submittedArticles.filter((a) => a.status === "diterima");
  const rejected = submittedArticles.filter((a) => a.status === "ditolak");

  const stats = [
    { label: "Menunggu Review", value: pending.length, icon: Clock, color: "text-yellow-600" },
    { label: "Diterima", value: accepted.length, icon: CheckCircle, color: "text-green-600" },
    { label: "Ditolak", value: rejected.length, icon: XCircle, color: "text-red-500" },
    { label: "Total Anggota", value: siteStats.totalMembers.toLocaleString("id-ID"), icon: Users, color: "text-primary" },
  ];

  function getInitials(name: string) {
    return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-3">
        <Shield className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Panel Admin</h1>
          <p className="text-muted-foreground">Dashboard Moderasi Artikel</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-3 p-4">
              <s.icon className={`h-8 w-8 ${s.color}`} />
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pending Articles */}
      <section className="mb-10">
        <div className="mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-yellow-600" />
          <h2 className="text-xl font-bold">Menunggu Review ({pending.length})</h2>
        </div>

        {pending.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
              <p className="text-muted-foreground">
                Semua artikel sudah dimoderasi
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Tidak ada artikel yang menunggu review
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {pending.map((article) => (
              <Card key={article.id}>
                <CardContent className="p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <Badge variant="secondary">{article.category.name}</Badge>
                        <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                          Menunggu
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold">{article.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="text-[8px]">
                              {getInitials(article.author.name)}
                            </AvatarFallback>
                          </Avatar>
                          {article.author.name}
                        </div>
                        <span>{article.createdAt}</span>
                        <span>{article.content.split(/\s+/).length} kata</span>
                      </div>
                    </div>
                    <div className="flex gap-2 sm:flex-col">
                      <Button
                        size="sm"
                        className="gap-1"
                        onClick={() => updateStatus(article.id, "diterima")}
                      >
                        <CheckCircle className="h-4 w-4" />
                        Terima
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="gap-1"
                        onClick={() => updateStatus(article.id, "ditolak")}
                      >
                        <XCircle className="h-4 w-4" />
                        Tolak
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Accepted Articles */}
      {accepted.length > 0 && (
        <section className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h2 className="text-xl font-bold">Diterima ({accepted.length})</h2>
          </div>
          <div className="space-y-3">
            {accepted.map((article) => (
              <Card key={article.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-medium">{article.title}</h3>
                      <Badge variant="secondary" className="text-xs">{article.category.name}</Badge>
                      {article.isEditorPick && (
                        <Badge className="gap-1 bg-accent text-accent-foreground text-xs">
                          <Star className="h-3 w-3" />
                          Editor Pick
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {article.author.name} · {article.createdAt}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant={article.isEditorPick ? "default" : "outline"}
                    className="gap-1"
                    onClick={() => toggleEditorPick(article.id)}
                  >
                    <Star className="h-4 w-4" />
                    {article.isEditorPick ? "Editor Pick" : "Jadikan Pick"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Rejected Articles */}
      {rejected.length > 0 && (
        <section>
          <div className="mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-500" />
            <h2 className="text-xl font-bold">Ditolak ({rejected.length})</h2>
          </div>
          <div className="space-y-3">
            {rejected.map((article) => (
              <Card key={article.id} className="opacity-60">
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="font-medium">{article.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {article.author.name} · {article.createdAt}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1"
                    onClick={() => updateStatus(article.id, "diterima")}
                  >
                    <CheckCircle className="h-4 w-4" />
                    Terima Ulang
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
