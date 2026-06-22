import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kirim Artikel",
  description: "Tulis dan kirim artikel pengetahuan kepanduan untuk komunitas Pramuka Indonesia",
};

export default function KirimArtikelLayout({ children }: { children: React.ReactNode }) {
  return children;
}
