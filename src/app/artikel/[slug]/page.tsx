import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArticleCard } from "@/components/article/article-card";
import { ArticleInteractions } from "@/components/article/article-interactions";
import { ArticleShare } from "@/components/article/article-share";
import { articles, getArticleBySlug } from "@/lib/data";
import { getInitials } from "@/lib/utils";

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Artikel Tidak Ditemukan" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const readTime = estimateReadTime(article.content);
  const related = articles
    .filter(
      (a) => a.id !== article.id && a.category.id === article.category.id
    )
    .slice(0, 3);

  const isHtmlContent = article.content.startsWith("<");
  const paragraphs = isHtmlContent ? [] : article.content.split("\n");

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Back */}
      <Link href="/artikel">
        <Button variant="ghost" size="sm" className="mb-6 gap-1">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Artikel
        </Button>
      </Link>

      {/* Header */}
      <header className="mb-8">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{article.category.name}</Badge>
          {article.isEditorPick && (
            <Badge className="bg-accent text-accent-foreground">
              Editor Pick
            </Badge>
          )}
        </div>

        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
          {article.title}
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">{article.excerpt}</p>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">
                {getInitials(article.author.name)}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium text-foreground">
              {article.author.name}
            </span>
          </div>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(article.createdAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {readTime} menit baca
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {article.views.toLocaleString("id-ID")} views
          </span>
        </div>
      </header>

      <Separator className="mb-8" />

      {/* Content */}
      {isHtmlContent ? (
        <article
          className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      ) : (
        <article className="prose prose-lg max-w-none">
          {paragraphs.map((line, i) => {
            const trimmed = line.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="mt-8 mb-4 text-2xl font-bold text-foreground"
                >
                  {trimmed.slice(3)}
                </h2>
              );
            }

            if (trimmed.startsWith("### ")) {
              return (
                <h3
                  key={i}
                  className="mt-6 mb-3 text-xl font-semibold text-foreground"
                >
                  {trimmed.slice(4)}
                </h3>
              );
            }

            if (trimmed.startsWith("- **")) {
              const match = trimmed.match(/^- \*\*(.+?)\*\*\s*[-–—]?\s*(.*)$/);
              if (match) {
                return (
                  <li key={i} className="ml-6 mb-1 list-disc text-muted-foreground">
                    <strong className="text-foreground">{match[1]}</strong>
                    {match[2] && ` — ${match[2]}`}
                  </li>
                );
              }
            }

            if (trimmed.startsWith("- ")) {
              return (
                <li key={i} className="ml-6 mb-1 list-disc text-muted-foreground">
                  {trimmed.slice(2)}
                </li>
              );
            }

            if (/^\d+\.\s/.test(trimmed)) {
              const text = trimmed.replace(/^\d+\.\s/, "");
              const boldMatch = text.match(/^\*\*(.+?)\*\*\s*[-–—]?\s*(.*)$/);
              if (boldMatch) {
                return (
                  <li
                    key={i}
                    className="ml-6 mb-1 list-decimal text-muted-foreground"
                  >
                    <strong className="text-foreground">{boldMatch[1]}</strong>
                    {boldMatch[2] && ` — ${boldMatch[2]}`}
                  </li>
                );
              }
              return (
                <li
                  key={i}
                  className="ml-6 mb-1 list-decimal text-muted-foreground"
                >
                  {text}
                </li>
              );
            }

            if (trimmed.startsWith("|")) {
              return null;
            }

            return (
              <p key={i} className="mb-4 leading-relaxed text-muted-foreground">
                {trimmed}
              </p>
            );
          })}
        </article>
      )}

      {/* Tags + Share */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag.id} variant="outline">
              #{tag.name}
            </Badge>
          ))}
        </div>
        <ArticleShare slug={article.slug} title={article.title} />
      </div>

      {/* Like, Bookmark, Comments */}
      <ArticleInteractions slug={article.slug} />

      <Separator className="my-10" />

      {/* Related */}
      {related.length > 0 && (
        <section>
          <h2 className="mb-6 text-2xl font-bold">Artikel Terkait</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
