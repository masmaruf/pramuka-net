import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Hubungi Kami",
};

const contacts = [
  {
    icon: Mail,
    title: "Email",
    desc: "redaksi@pramuka.net",
    sub: "Balasan dalam 1-2 hari kerja",
  },
  {
    icon: MessageCircle,
    title: "Media Sosial",
    desc: "@pramukanet",
    sub: "Instagram, Twitter, Facebook",
  },
  {
    icon: MapPin,
    title: "Alamat",
    desc: "Jakarta, Indonesia",
    sub: "Komunitas online",
  },
];

export default function HubungiPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Hubungi Kami</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Ada pertanyaan atau masukan? Kami senang mendengar darimu
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Contact Info */}
        <div className="space-y-4 lg:col-span-2">
          {contacts.map((c) => (
            <Card key={c.title}>
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <c.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{c.title}</h3>
                  <p className="text-sm">{c.desc}</p>
                  <p className="text-xs text-muted-foreground">{c.sub}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form */}
        <Card className="lg:col-span-3">
          <CardContent className="p-6">
            <h2 className="mb-4 text-xl font-bold">Kirim Pesan</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Nama
                  </label>
                  <Input id="name" placeholder="Nama lengkap" />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="nama@email.com" />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Subjek
                </label>
                <Input id="subject" placeholder="Topik pesan" />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Pesan
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tulis pesanmu di sini..."
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              <Button className="w-full" disabled>
                Kirim Pesan
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
