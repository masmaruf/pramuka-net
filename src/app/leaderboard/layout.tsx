import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboard Kontributor",
  description: "Ranking kontributor terbaik Pramuka.net berdasarkan poin dan artikel",
};

export default function LeaderboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
