"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

export interface Comment {
  id: string;
  articleSlug: string;
  userId: string;
  userName: string;
  userUsername: string;
  content: string;
  createdAt: string;
}

interface InteractionState {
  likes: Record<string, string[]>;
  bookmarks: Record<string, string[]>;
  comments: Comment[];
}

interface InteractionStoreValue {
  toggleLike: (articleSlug: string, userId: string) => void;
  hasLiked: (articleSlug: string, userId: string) => boolean;
  getLikeCount: (articleSlug: string) => number;
  toggleBookmark: (articleSlug: string, userId: string) => void;
  hasBookmarked: (articleSlug: string, userId: string) => boolean;
  getBookmarks: (userId: string) => string[];
  addComment: (comment: Omit<Comment, "id" | "createdAt">) => void;
  getComments: (articleSlug: string) => Comment[];
}

const STORAGE_KEY = "pramuka_interactions";

const defaultState: InteractionState = { likes: {}, bookmarks: {}, comments: [] };

const InteractionStoreContext = createContext<InteractionStoreValue | null>(null);

export function InteractionStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<InteractionState>(defaultState);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setState(JSON.parse(stored));
    } catch {}
  }, []);

  function persist(next: InteractionState) {
    setState(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  const toggleLike = useCallback(
    (articleSlug: string, userId: string) => {
      const current = state.likes[articleSlug] || [];
      const liked = current.includes(userId);
      const next = liked
        ? current.filter((id) => id !== userId)
        : [...current, userId];
      persist({ ...state, likes: { ...state.likes, [articleSlug]: next } });
    },
    [state]
  );

  const hasLiked = useCallback(
    (articleSlug: string, userId: string) =>
      (state.likes[articleSlug] || []).includes(userId),
    [state.likes]
  );

  const getLikeCount = useCallback(
    (articleSlug: string) => (state.likes[articleSlug] || []).length,
    [state.likes]
  );

  const toggleBookmark = useCallback(
    (articleSlug: string, userId: string) => {
      const current = state.bookmarks[userId] || [];
      const saved = current.includes(articleSlug);
      const next = saved
        ? current.filter((s) => s !== articleSlug)
        : [...current, articleSlug];
      persist({ ...state, bookmarks: { ...state.bookmarks, [userId]: next } });
    },
    [state]
  );

  const hasBookmarked = useCallback(
    (articleSlug: string, userId: string) =>
      (state.bookmarks[userId] || []).includes(articleSlug),
    [state.bookmarks]
  );

  const getBookmarks = useCallback(
    (userId: string) => state.bookmarks[userId] || [],
    [state.bookmarks]
  );

  const addComment = useCallback(
    (data: Omit<Comment, "id" | "createdAt">) => {
      const comment: Comment = {
        ...data,
        id: `cmt-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      persist({ ...state, comments: [comment, ...state.comments] });
    },
    [state]
  );

  const getComments = useCallback(
    (articleSlug: string) =>
      state.comments.filter((c) => c.articleSlug === articleSlug),
    [state.comments]
  );

  return (
    <InteractionStoreContext.Provider
      value={{
        toggleLike, hasLiked, getLikeCount,
        toggleBookmark, hasBookmarked, getBookmarks,
        addComment, getComments,
      }}
    >
      {children}
    </InteractionStoreContext.Provider>
  );
}

export function useInteractionStore() {
  const ctx = useContext(InteractionStoreContext);
  if (!ctx) throw new Error("useInteractionStore must be inside InteractionStoreProvider");
  return ctx;
}
