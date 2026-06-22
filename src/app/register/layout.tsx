import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar Akun",
  description: "Bergabung dengan komunitas Pramuka.net — daftar gratis",
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
