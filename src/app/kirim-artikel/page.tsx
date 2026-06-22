"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  PenLine,
  X,
  CheckCircle,
  Send,
  AlertCircle,
  ImagePlus,
  Trash2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth-context";
import { useArticleStore } from "@/lib/article-store";
import { categories } from "@/lib/data";
import { POINTS_PER_ARTICLE } from "@/lib/constants";
import { RichTextEditor, htmlToPlainText } from "@/components/article/rich-text-editor";

const rules = [
  "Gunakan bahasa Indonesia yang baik dan benar",
  "Pastikan informasi akurat dan bisa diverifikasi",
  "Hindari konten promosi atau iklan",
  "Sertakan sumber jika mengutip data",
  "Satu akun dapat kirim maks. 3 artikel/minggu",
];

export default function KirimArtikelPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[50vh] items-center justify-center"><p className="text-muted-foreground">Memuat...</p></div>}>
      <KirimArtikelContent />
    </Suspense>
  );
}

function KirimArtikelContent() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { submitArticle, editArticle, submittedArticles } = useArticleStore();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const editingArticle = editId ? submittedArticles.find((a) => a.id === editId) : null;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [editLoaded, setEditLoaded] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) router.replace("/login");
  }, [user, isLoading, router]);

  useEffect(() => {
    if (editingArticle && !editLoaded) {
      setTitle(editingArticle.title);
      setCategoryId(editingArticle.category.id);
      setExcerpt(editingArticle.excerpt);
      setContent(editingArticle.content);
      setThumbnailUrl(editingArticle.thumbnailUrl || null);
      setTags(editingArticle.tags.map((t) => t.name));
      setEditLoaded(true);
    }
  }, [editingArticle, editLoaded]);

  if (!user) return null;

  function handleThumbnail(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar (JPG, PNG, WebP)");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Ukuran gambar maksimal 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setThumbnailUrl(reader.result as string);
      setError("");
    };
    reader.readAsDataURL(file);
  }

  function removeThumbnail() {
    setThumbnailUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function addTag(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      const tag = tagInput.trim().toLowerCase();
      if (tag && !tags.includes(tag) && tags.length < 5) {
        setTags([...tags, tag]);
        setTagInput("");
      }
    }
  }

  function removeTag(tag: string) {
    setTags(tags.filter((t) => t !== tag));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!title.trim()) { setError("Judul artikel wajib diisi"); return; }
    if (!categoryId) { setError("Pilih kategori artikel"); return; }
    if (!excerpt.trim()) { setError("Ringkasan wajib diisi"); return; }
    const plainText = htmlToPlainText(content);
    if (!plainText) { setError("Konten artikel wajib diisi"); return; }
    if (plainText.split(/\s+/).length < 50) {
      setError("Artikel minimal 50 kata");
      return;
    }

    if (editId && editingArticle) {
      editArticle(editId, {
        title: title.trim(),
        categoryId,
        excerpt: excerpt.trim(),
        content: content.trim(),
        thumbnailUrl: thumbnailUrl || undefined,
        tags,
      });
    } else {
      submitArticle({
        title: title.trim(),
        categoryId,
        excerpt: excerpt.trim(),
        content: content.trim(),
        thumbnailUrl: thumbnailUrl || undefined,
        tags,
        authorId: user!.id,
        authorName: user!.name,
        authorUsername: user!.username,
      });
    }

    setSubmitted(true);
  }

  function resetForm() {
    setSubmitted(false);
    setTitle("");
    setCategoryId("");
    setExcerpt("");
    setContent("");
    setThumbnailUrl(null);
    setTags([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-primary" />
        <h1 className="text-3xl font-bold">Artikel Terkirim!</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Artikelmu sedang dalam proses moderasi oleh tim admin Pramuka.net.
        </p>
        <p className="mt-2 text-muted-foreground">
          Kamu akan mendapatkan notifikasi setelah artikel diterima atau ada
          masukan dari moderator.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button onClick={resetForm}>Kirim Artikel Lagi</Button>
          <Link href="/profil">
            <Button variant="outline">Lihat Profil</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <PenLine className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{editId ? "Edit Artikel" : "Kirim Artikel"}</h1>
            <p className="text-muted-foreground">
              {editId ? "Perbarui artikelmu lalu kirim ulang untuk moderasi" : "Bagikan pengetahuan kepanduanmu kepada komunitas Pramuka Indonesia"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="mb-1.5 block text-sm font-medium">
                Judul Artikel
              </label>
              <Input
                id="title"
                placeholder="Contoh: Teknik Membuat Simpul Tali yang Benar..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="category" className="mb-1.5 block text-sm font-medium">
                Kategori
              </label>
              <select
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Pilih kategori artikel</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Thumbnail Artikel
              </label>
              {thumbnailUrl ? (
                <div className="relative overflow-hidden rounded-lg border">
                  <Image
                    src={thumbnailUrl}
                    alt="Thumbnail preview"
                    width={800}
                    height={400}
                    className="h-48 w-full object-cover"
                    unoptimized
                  />
                  <button
                    type="button"
                    onClick={removeThumbnail}
                    className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white transition-colors hover:bg-black/80"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed py-10 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <ImagePlus className="h-8 w-8" />
                  <span className="text-sm font-medium">Upload Thumbnail</span>
                  <span className="text-xs">JPG, PNG, WebP · Maks. 2MB</span>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleThumbnail}
                className="hidden"
              />
            </div>

            <div>
              <label htmlFor="excerpt" className="mb-1.5 block text-sm font-medium">
                Ringkasan
              </label>
              <textarea
                id="excerpt"
                rows={2}
                placeholder="Tulis ringkasan singkat artikel (2-3 kalimat)..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Konten Artikel
              </label>
              <RichTextEditor content={content} onChange={setContent} />
              <p className="mt-1 text-xs text-muted-foreground">
                {htmlToPlainText(content).split(/\s+/).filter(Boolean).length} kata
              </p>
            </div>

            <div>
              <label htmlFor="tags" className="mb-1.5 block text-sm font-medium">
                Tags
              </label>
              <div className="flex flex-wrap items-center gap-2 rounded-md border bg-background px-3 py-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {tags.length < 5 && (
                  <input
                    id="tags"
                    placeholder="Tambah tag (Enter)"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={addTag}
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                )}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Maks. 5 tags</p>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <Button type="submit" size="lg" className="w-full gap-2">
              <Send className="h-4 w-4" />
              {editId ? "Simpan & Kirim Ulang" : "Kirim untuk Moderasi"}
            </Button>
          </form>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-5">
              <h3 className="mb-3 font-semibold">Panduan Penulisan</h3>
              <ul className="space-y-2">
                {rules.map((rule) => (
                  <li key={rule} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    {rule}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <h3 className="mb-3 font-semibold">Proses Moderasi</h3>
              <p className="text-sm text-muted-foreground">
                Tim moderator kami akan meninjau artikelmu dalam 1-3 hari kerja.
                Kamu akan mendapat notifikasi hasil moderasi.
              </p>
              <Separator className="my-3" />
              <p className="text-sm text-muted-foreground">
                Setelah diterima, kamu akan mendapat{" "}
                <span className="font-medium text-primary">+{POINTS_PER_ARTICLE} poin</span>{" "}
                menuju badge berikutnya.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
