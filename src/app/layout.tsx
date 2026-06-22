import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { AuthProvider } from "@/lib/auth-context";
import { ArticleStoreProvider } from "@/lib/article-store";
import { InteractionStoreProvider } from "@/lib/interaction-store";
import { NotificationStoreProvider } from "@/lib/notification-store";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/layout/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://pramuka.net";

export const metadata: Metadata = {
  title: {
    default: "Pramuka.net — Platform Kepanduan Indonesia",
    template: "%s | Pramuka.net",
  },
  description:
    "Platform komunitas kepanduan Indonesia untuk berbagi ilmu, pengalaman, dan semangat Pramuka. Tulis artikel, raih badge, dan bangun komunitas bersama.",
  metadataBase: new URL(siteUrl),
  keywords: [
    "pramuka",
    "kepanduan",
    "pramuka indonesia",
    "artikel pramuka",
    "gerakan pramuka",
    "badge pramuka",
    "komunitas pramuka",
  ],
  authors: [{ name: "Pramuka.net" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "Pramuka.net",
    title: "Pramuka.net — Platform Kepanduan Indonesia",
    description:
      "Berbagi pengetahuan, pengalaman, dan semangat kepanduan. Tulis artikel, raih badge, dan bangun komunitas bersama.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pramuka.net — Platform Kepanduan Indonesia",
    description:
      "Platform komunitas kepanduan Indonesia untuk berbagi ilmu dan semangat Pramuka.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${jakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider>
          <AuthProvider>
            <ArticleStoreProvider>
              <InteractionStoreProvider>
                <NotificationStoreProvider>
                  <Navbar />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </NotificationStoreProvider>
              </InteractionStoreProvider>
            </ArticleStoreProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
