import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel Admin",
  description: "Dashboard moderasi artikel Pramuka.net",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
