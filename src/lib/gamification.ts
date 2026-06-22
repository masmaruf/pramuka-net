import type { User } from "./types";
import type { Article } from "./types";
import { POINTS_PER_ARTICLE } from "./constants";

interface BadgeRule {
  id: string;
  check: (user: User, acceptedArticles: Article[], acceptedCategories: string[]) => boolean;
}

const badgeRules: BadgeRule[] = [
  {
    id: "b1", // Penulis Perdana — 1 artikel diterbitkan
    check: (_user, articles) => articles.length >= 1,
  },
  {
    id: "b2", // Api Semangat — 3 artikel dalam sebulan
    check: (_user, articles) => {
      const now = new Date();
      const thisMonth = articles.filter((a) => {
        if (!a.publishedAt) return false;
        const d = new Date(a.publishedAt);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      });
      return thisMonth.length >= 3;
    },
  },
  {
    id: "b3", // Tinta Emas — 5 artikel diterbitkan
    check: (_user, articles) => articles.length >= 5,
  },
  {
    id: "b5", // Elang Agung — 3 kategori berbeda
    check: (_user, _articles, categories) => categories.length >= 3,
  },
];

export function calculateNewBadges(
  user: User,
  acceptedArticles: Article[],
  acceptedCategories: string[]
): string[] {
  const newBadges: string[] = [];
  for (const rule of badgeRules) {
    if (!user.badges.includes(rule.id) && rule.check(user, acceptedArticles, acceptedCategories)) {
      newBadges.push(rule.id);
    }
  }
  return newBadges;
}

export function getPointsReward(): number {
  return POINTS_PER_ARTICLE;
}

export function getBadgeProgress(
  badgeId: string,
  acceptedCount: number,
  monthlyCount: number,
  categoryCount: number
): { current: number; total: number } {
  switch (badgeId) {
    case "b1": return { current: Math.min(acceptedCount, 1), total: 1 };
    case "b2": return { current: Math.min(monthlyCount, 3), total: 3 };
    case "b3": return { current: Math.min(acceptedCount, 5), total: 5 };
    case "b4": return { current: 0, total: 100 }; // likes-based, tracked separately
    case "b5": return { current: Math.min(categoryCount, 3), total: 3 };
    case "b6": return { current: 0, total: 6 }; // months active, tracked separately
    default: return { current: 0, total: 1 };
  }
}
