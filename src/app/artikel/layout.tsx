import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artikel Kepanduan",
  description: "Kumpulan artikel pengetahuan kepanduan dari kontributor Pramuka seluruh Indonesia",
};

export default function ArtikelLayout({ children }: { children: React.ReactNode }) {
  return children;
}
