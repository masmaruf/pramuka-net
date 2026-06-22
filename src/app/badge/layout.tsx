import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Badge & Tantangan",
  description: "Raih emblem digital eksklusif sebagai bukti kontribusimu di Pramuka.net",
};

export default function BadgeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
