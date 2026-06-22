import Link from "next/link";

const footerLinks = {
  platform: [
    { href: "/artikel", label: "Artikel Kepanduan" },
    { href: "/badge", label: "Badge & Tantangan" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/panduan", label: "Panduan Kontribusi" },
  ],
  info: [
    { href: "/tentang", label: "Tentang Kami" },
    { href: "/kebijakan", label: "Kebijakan Moderasi" },
    { href: "/hubungi", label: "Hubungi Kami" },
  ],
  legal: [
    { href: "/syarat", label: "Syarat & Ketentuan" },
    { href: "/privasi", label: "Kebijakan Privasi" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold text-primary">⚜️ Pramuka.net</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Platform komunitas kepanduan Indonesia untuk berbagi ilmu,
              pengalaman, dan semangat Pramuka.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Platform</h4>
            <ul className="mt-3 space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Informasi</h4>
            <ul className="mt-3 space-y-2">
              {footerLinks.info.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="mt-3 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Pramuka.net · Satya Darma Pramuka
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Dibuat dengan ❤️ untuk Gerakan Pramuka Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
