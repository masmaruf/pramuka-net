export const STORAGE_KEYS = {
  AUTH: "pramuka_auth",
  USERS: "pramuka_users",
  ARTICLES: "pramuka_articles",
  INTERACTIONS: "pramuka_interactions",
} as const;

export const POINTS_PER_ARTICLE = 50;

export const ROLE_LABELS: Record<string, string> = {
  member: "Anggota",
  contributor: "Kontributor",
  moderator: "Moderator",
  admin: "Admin",
};
