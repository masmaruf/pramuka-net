import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil",
  description: "Profil dan statistik kontribusimu di Pramuka.net",
};

export default function ProfilLayout({ children }: { children: React.ReactNode }) {
  return children;
}
