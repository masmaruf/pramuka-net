"use client";

import { Trophy, Medal, Award, Star, FileText, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth-context";
import { badges as allBadges } from "@/lib/data";

const leaderboardData = [
  {
    rank: 1,
    name: "Siti Rahayu",
    username: "siti_pandu",
    points: 580,
    articles: 12,
    badges: ["b1", "b2", "b3"],
  },
  {
    rank: 2,
    name: "Raka Nugraha",
    username: "raka_pramuka",
    points: 420,
    articles: 7,
    badges: ["b1", "b2"],
  },
  {
    rank: 3,
    name: "Dimas Pratama",
    username: "dimas_scout",
    points: 310,
    articles: 5,
    badges: ["b1", "b3"],
  },
  {
    rank: 4,
    name: "Putri Andini",
    username: "putri_pramuka",
    points: 250,
    articles: 4,
    badges: ["b1"],
  },
  {
    rank: 5,
    name: "Ahmad Fajar",
    username: "fajar_pramuka",
    points: 200,
    articles: 3,
    badges: ["b1"],
  },
  {
    rank: 6,
    name: "Dewi Lestari",
    username: "dewi_pandu",
    points: 150,
    articles: 2,
    badges: ["b1"],
  },
  {
    rank: 7,
    name: "Budi Santoso",
    username: "budi_scout",
    points: 100,
    articles: 2,
    badges: [],
  },
  {
    rank: 8,
    name: "Rina Wati",
    username: "rina_pramuka",
    points: 50,
    articles: 1,
    badges: [],
  },
];

function getInitials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

function getRankIcon(rank: number) {
  if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />;
  if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
  if (rank === 3) return <Medal className="h-6 w-6 text-amber-600" />;
  return <span className="flex h-6 w-6 items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</span>;
}

export default function LeaderboardPage() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <TrendingUp className="mx-auto mb-4 h-12 w-12 text-primary" />
        <h1 className="text-3xl font-bold">Leaderboard Kontributor</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Kontributor terbaik Pramuka.net berdasarkan poin dan aktivitas
        </p>
      </div>

      {/* Top 3 Podium */}
      <div className="mb-10 grid grid-cols-3 gap-4">
        {leaderboardData.slice(0, 3).map((entry) => {
          const isMe = user?.username === entry.username;
          return (
            <Card key={entry.rank} className={`text-center ${entry.rank === 1 ? "ring-2 ring-yellow-400" : ""} ${isMe ? "bg-primary/5" : ""}`}>
              <CardContent className="p-5">
                <div className="mb-3 flex justify-center">
                  {getRankIcon(entry.rank)}
                </div>
                <Avatar className="mx-auto mb-2 h-14 w-14">
                  <AvatarFallback className="text-lg">
                    {getInitials(entry.name)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">{entry.name}</h3>
                <p className="text-xs text-muted-foreground">@{entry.username}</p>
                <p className="mt-2 text-2xl font-bold text-primary">{entry.points}</p>
                <p className="text-xs text-muted-foreground">poin</p>
                <div className="mt-2 flex justify-center gap-1">
                  {entry.badges.map((bId) => {
                    const badge = allBadges.find((b) => b.id === bId);
                    return badge ? (
                      <Badge key={bId} variant="secondary" className="text-[10px] px-1.5">
                        {badge.name}
                      </Badge>
                    ) : null;
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Full Ranking */}
      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {leaderboardData.map((entry) => {
              const isMe = user?.username === entry.username;
              return (
                <div
                  key={entry.rank}
                  className={`flex items-center gap-4 px-5 py-4 ${isMe ? "bg-primary/5" : ""}`}
                >
                  <div className="w-8 shrink-0 text-center">
                    {getRankIcon(entry.rank)}
                  </div>
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarFallback className="text-sm">
                      {getInitials(entry.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium truncate">{entry.name}</h3>
                      {isMe && (
                        <Badge variant="outline" className="text-xs shrink-0">Kamu</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">@{entry.username}</p>
                  </div>
                  <div className="flex items-center gap-6 text-sm shrink-0">
                    <div className="text-center">
                      <p className="font-bold text-primary">{entry.points}</p>
                      <p className="text-[10px] text-muted-foreground">poin</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold">{entry.articles}</p>
                      <p className="text-[10px] text-muted-foreground">artikel</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold">{entry.badges.length}</p>
                      <p className="text-[10px] text-muted-foreground">badge</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
