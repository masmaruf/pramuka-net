"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Article, ArticleStatus } from "./types";
import { categories } from "./data";
import { STORAGE_KEYS } from "./constants";

interface SubmitArticleData {
  title: string;
  categoryId: string;
  excerpt: string;
  content: string;
  thumbnailUrl?: string;
  tags: string[];
  authorId: string;
  authorName: string;
  authorUsername: string;
}

interface EditArticleData {
  title: string;
  categoryId: string;
  excerpt: string;
  content: string;
  thumbnailUrl?: string;
  tags: string[];
}

interface ArticleStoreValue {
  submittedArticles: Article[];
  submitArticle: (data: SubmitArticleData) => void;
  editArticle: (id: string, data: EditArticleData) => void;
  deleteArticle: (id: string) => void;
  updateStatus: (id: string, status: ArticleStatus, onAccepted?: (article: Article) => void) => void;
  toggleEditorPick: (id: string) => void;
  getByAuthor: (username: string) => Article[];
  getPending: () => Article[];
  getAcceptedByAuthor: (username: string) => Article[];
  getAcceptedCategories: (username: string) => string[];
}



function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

const ArticleStoreContext = createContext<ArticleStoreValue | null>(null);

export function ArticleStoreProvider({ children }: { children: ReactNode }) {
  const [submittedArticles, setSubmittedArticles] = useState<Article[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ARTICLES);
      if (stored) setSubmittedArticles(JSON.parse(stored));
    } catch {}
  }, []);

  function persist(articles: Article[]) {
    setSubmittedArticles(articles);
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
  }

  const submitArticle = useCallback(
    (data: SubmitArticleData) => {
      const category = categories.find((c) => c.id === data.categoryId) || categories[6];
      const newArticle: Article = {
        id: `sub-${Date.now()}`,
        title: data.title,
        slug: slugify(data.title),
        excerpt: data.excerpt,
        content: data.content,
        thumbnailUrl: data.thumbnailUrl,
        category,
        tags: data.tags.map((t, i) => ({ id: `t-${Date.now()}-${i}`, name: t })),
        author: {
          id: data.authorId,
          name: data.authorName,
          username: data.authorUsername,
        },
        status: "menunggu",
        isEditorPick: false,
        views: 0,
        createdAt: new Date().toISOString().slice(0, 10),
      };
      persist([newArticle, ...submittedArticles]);
    },
    [submittedArticles]
  );

  const editArticle = useCallback(
    (id: string, data: EditArticleData) => {
      const category = categories.find((c) => c.id === data.categoryId);
      const updated = submittedArticles.map((a) =>
        a.id === id
          ? {
              ...a,
              title: data.title,
              slug: slugify(data.title),
              excerpt: data.excerpt,
              content: data.content,
              thumbnailUrl: data.thumbnailUrl,
              category: category || a.category,
              tags: data.tags.map((t, i) => ({ id: `t-${Date.now()}-${i}`, name: t })),
              status: "menunggu" as ArticleStatus,
            }
          : a
      );
      persist(updated);
    },
    [submittedArticles]
  );

  const deleteArticle = useCallback(
    (id: string) => {
      persist(submittedArticles.filter((a) => a.id !== id));
    },
    [submittedArticles]
  );

  const updateStatus = useCallback(
    (id: string, status: ArticleStatus, onAccepted?: (article: Article) => void) => {
      const article = submittedArticles.find((a) => a.id === id);
      const updated = submittedArticles.map((a) =>
        a.id === id
          ? {
              ...a,
              status,
              publishedAt: status === "diterima" ? new Date().toISOString().slice(0, 10) : a.publishedAt,
            }
          : a
      );
      persist(updated);
      if (status === "diterima" && article && onAccepted) {
        onAccepted(article);
      }
    },
    [submittedArticles]
  );

  const toggleEditorPick = useCallback(
    (id: string) => {
      const updated = submittedArticles.map((a) =>
        a.id === id ? { ...a, isEditorPick: !a.isEditorPick } : a
      );
      persist(updated);
    },
    [submittedArticles]
  );

  const getByAuthor = useCallback(
    (username: string) => submittedArticles.filter((a) => a.author.username === username),
    [submittedArticles]
  );

  const getPending = useCallback(
    () => submittedArticles.filter((a) => a.status === "menunggu"),
    [submittedArticles]
  );

  const getAcceptedByAuthor = useCallback(
    (username: string) =>
      submittedArticles.filter((a) => a.author.username === username && a.status === "diterima"),
    [submittedArticles]
  );

  const getAcceptedCategories = useCallback(
    (username: string) => {
      const cats = new Set(
        submittedArticles
          .filter((a) => a.author.username === username && a.status === "diterima")
          .map((a) => a.category.id)
      );
      return Array.from(cats);
    },
    [submittedArticles]
  );

  return (
    <ArticleStoreContext.Provider
      value={{ submittedArticles, submitArticle, editArticle, deleteArticle, updateStatus, toggleEditorPick, getByAuthor, getPending, getAcceptedByAuthor, getAcceptedCategories }}
    >
      {children}
    </ArticleStoreContext.Provider>
  );
}

export function useArticleStore() {
  const ctx = useContext(ArticleStoreContext);
  if (!ctx) throw new Error("useArticleStore must be inside ArticleStoreProvider");
  return ctx;
}
