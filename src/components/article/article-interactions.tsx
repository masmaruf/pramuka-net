"use client";

import { useState } from "react";
import { Heart, Bookmark, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";
import { useInteractionStore } from "@/lib/interaction-store";

function getInitials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "baru saja";
  if (mins < 60) return `${mins} menit lalu`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  return `${days} hari lalu`;
}

export function ArticleInteractions({
  slug,
  baseLikes,
}: {
  slug: string;
  baseLikes: number;
}) {
  const { user } = useAuth();
  const {
    toggleLike, hasLiked, getLikeCount,
    toggleBookmark, hasBookmarked,
    addComment, getComments,
  } = useInteractionStore();

  const [commentText, setCommentText] = useState("");

  const liked = user ? hasLiked(slug, user.id) : false;
  const bookmarked = user ? hasBookmarked(slug, user.id) : false;
  const extraLikes = getLikeCount(slug);
  const totalLikes = baseLikes + extraLikes;
  const comments = getComments(slug);

  function handleLike() {
    if (!user) return;
    toggleLike(slug, user.id);
  }

  function handleBookmark() {
    if (!user) return;
    toggleBookmark(slug, user.id);
  }

  function handleComment(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !commentText.trim()) return;
    addComment({
      articleSlug: slug,
      userId: user.id,
      userName: user.name,
      userUsername: user.username,
      content: commentText.trim(),
    });
    setCommentText("");
  }

  return (
    <>
      {/* Like & Bookmark bar */}
      <div className="flex items-center gap-3 mt-8">
        <Button
          variant={liked ? "default" : "outline"}
          size="sm"
          className="gap-2"
          onClick={handleLike}
          disabled={!user}
        >
          <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
          {totalLikes}
        </Button>
        <Button
          variant={bookmarked ? "default" : "outline"}
          size="sm"
          className="gap-2"
          onClick={handleBookmark}
          disabled={!user}
        >
          <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`} />
          {bookmarked ? "Tersimpan" : "Simpan"}
        </Button>
        <span className="flex items-center gap-1 text-sm text-muted-foreground">
          <MessageCircle className="h-4 w-4" />
          {comments.length} komentar
        </span>
      </div>

      <Separator className="my-8" />

      {/* Comments */}
      <section>
        <h2 className="mb-6 text-xl font-bold">
          Komentar ({comments.length})
        </h2>

        {/* Comment form */}
        {user ? (
          <form onSubmit={handleComment} className="mb-6">
            <div className="flex gap-3">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="text-xs">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <textarea
                  placeholder="Tulis komentar..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={3}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <div className="mt-2 flex justify-end">
                  <Button
                    type="submit"
                    size="sm"
                    className="gap-1"
                    disabled={!commentText.trim()}
                  >
                    <Send className="h-3.5 w-3.5" />
                    Kirim
                  </Button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="mb-6 rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
            Masuk untuk menulis komentar
          </div>
        )}

        {/* Comment list */}
        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c.id} className="flex gap-3">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="text-xs">
                    {getInitials(c.userName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{c.userName}</span>
                    <span className="text-xs text-muted-foreground">
                      {timeAgo(c.createdAt)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap">
                    {c.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Belum ada komentar. Jadilah yang pertama!
          </p>
        )}
      </section>
    </>
  );
}
