"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { categories } from "@/lib/data";
import type { Article } from "@/lib/types";

const COLORS = [
  "hsl(145, 60%, 35%)",
  "hsl(35, 80%, 50%)",
  "hsl(200, 60%, 45%)",
  "hsl(350, 60%, 50%)",
  "hsl(270, 50%, 50%)",
  "hsl(170, 50%, 40%)",
  "hsl(60, 60%, 45%)",
  "hsl(310, 50%, 45%)",
];

interface AnalyticsChartsProps {
  articles: Article[];
}

export function AnalyticsCharts({ articles }: AnalyticsChartsProps) {
  const categoryData = categories
    .map((cat) => ({
      name: cat.name.length > 12 ? cat.name.slice(0, 12) + "…" : cat.name,
      fullName: cat.name,
      count: articles.filter((a) => a.category.id === cat.id).length,
    }))
    .filter((d) => d.count > 0)
    .sort((a, b) => b.count - a.count);

  const statusData = [
    { name: "Diterima", value: articles.filter((a) => a.status === "diterima").length },
    { name: "Menunggu", value: articles.filter((a) => a.status === "menunggu").length },
    { name: "Ditolak", value: articles.filter((a) => a.status === "ditolak").length },
  ].filter((d) => d.value > 0);

  const STATUS_COLORS: Record<string, string> = {
    Diterima: "hsl(145, 60%, 35%)",
    Menunggu: "hsl(45, 80%, 50%)",
    Ditolak: "hsl(0, 65%, 50%)",
  };

  const monthlyData = (() => {
    const months: Record<string, number> = {};
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toLocaleDateString("id-ID", { month: "short", year: "2-digit" });
      months[key] = 0;
    }
    articles.forEach((a) => {
      const d = new Date(a.createdAt);
      const key = d.toLocaleDateString("id-ID", { month: "short", year: "2-digit" });
      if (key in months) months[key]++;
    });
    return Object.entries(months).map(([month, count]) => ({ month, count }));
  })();

  const topAuthors = (() => {
    const authorMap: Record<string, { name: string; count: number }> = {};
    articles
      .filter((a) => a.status === "diterima")
      .forEach((a) => {
        if (!authorMap[a.author.username]) {
          authorMap[a.author.username] = { name: a.author.name, count: 0 };
        }
        authorMap[a.author.username].count++;
      });
    return Object.values(authorMap)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  })();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Artikel per Bulan */}
      <Card>
        <CardContent className="p-5">
          <h3 className="mb-4 font-semibold">Artikel per Bulan</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" fontSize={12} tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <YAxis fontSize={12} tick={{ fill: "hsl(var(--muted-foreground))" }} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="count" name="Artikel" fill="hsl(145, 60%, 35%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Status Artikel */}
      <Card>
        <CardContent className="p-5">
          <h3 className="mb-4 font-semibold">Status Artikel</h3>
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                  fontSize={12}
                >
                  {statusData.map((entry) => (
                    <Cell key={entry.name} fill={STATUS_COLORS[entry.name] || "#888"} />
                  ))}
                </Pie>
                <Legend fontSize={12} />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="py-10 text-center text-sm text-muted-foreground">Belum ada data</p>
          )}
        </CardContent>
      </Card>

      {/* Kategori Populer */}
      <Card>
        <CardContent className="p-5">
          <h3 className="mb-4 font-semibold">Kategori Populer</h3>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" fontSize={12} tick={{ fill: "hsl(var(--muted-foreground))" }} allowDecimals={false} />
                <YAxis type="category" dataKey="name" fontSize={11} width={100} tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any, _name: any, props: any) => [value, props?.payload?.fullName || ""]}
                />
                <Bar dataKey="count" name="Artikel" radius={[0, 4, 4, 0]}>
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="py-10 text-center text-sm text-muted-foreground">Belum ada data</p>
          )}
        </CardContent>
      </Card>

      {/* Top Kontributor */}
      <Card>
        <CardContent className="p-5">
          <h3 className="mb-4 font-semibold">Top 5 Kontributor</h3>
          {topAuthors.length > 0 ? (
            <div className="space-y-3">
              {topAuthors.map((author, i) => (
                <div key={author.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium">{author.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{author.count} artikel</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-10 text-center text-sm text-muted-foreground">Belum ada data</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
