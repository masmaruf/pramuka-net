"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArticleCard } from "@/components/article/article-card";
import { articles as seedArticles, categories } from "@/lib/data";
import { useArticleStore } from "@/lib/article-store";

export default function ArtikelPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { submittedArticles } = useArticleStore();

  const allArticles = useMemo(() => {
    const accepted = submittedArticles.filter((a) => a.status === "diterima");
    return [...accepted, ...seedArticles];
  }, [submittedArticles]);

  const filtered = useMemo(() => {
    let result = allArticles;

    if (activeCategory) {
      result = result.filter((a) => a.category.slug === activeCategory);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some((t) => t.name.toLowerCase().includes(q))
      );
    }

    return result;
  }, [query, activeCategory, allArticles]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Artikel Kepanduan</h1>
        <p className="mt-2 text-muted-foreground">
          Kumpulan pengetahuan dari kontributor Pramuka seluruh Indonesia
        </p>
      </div>

      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cari artikel..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <Badge
            variant={activeCategory === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setActiveCategory(null)}
          >
            Semua
          </Badge>
          {categories.map((cat) => (
            <Badge
              key={cat.id}
              variant={activeCategory === cat.slug ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() =>
                setActiveCategory(activeCategory === cat.slug ? null : cat.slug)
              }
            >
              {cat.name}
            </Badge>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-lg font-medium text-muted-foreground">
            Artikel tidak ditemukan
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Coba ubah kata kunci atau filter kategori
          </p>
        </div>
      )}
    </div>
  );
}
