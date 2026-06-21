import type { Metadata } from "next";
import { Users, BookOpen, UserCheck, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { siteStats } from "@/lib/data";

export const metadata: Metadata = {
  title: "Tentang Kami",
};

const values = [
  {
    icon: BookOpen,
    title: "Berbagi Pengetahuan",
    desc: "Memfasilitasi kontribusi artikel kepanduan berkualitas dari seluruh Indonesia",
  },
  {
    icon: Users,
    title: "Membangun Komunitas",
    desc: "Menghubungkan anggota Pramuka dari berbagai daerah dalam satu platform",
  },
  {
    icon: Award,
    title: "Mengapresiasi Kontribusi",
    desc: "Memberikan pengakuan melalui badge dan emblem digital bagi kontributor aktif",
  },
];

export default function TentangPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Tentang Pramuka.net</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Platform komunitas kepanduan Indonesia
        </p>
      </div>

      <div className="space-y-8 text-muted-foreground">
        <section>
          <h2 className="mb-3 text-xl font-bold text-foreground">
            Apa Itu Pramuka.net?
          </h2>
          <p>
            Pramuka.net adalah platform digital yang didedikasikan untuk
            komunitas kepanduan Indonesia. Kami menyediakan ruang bagi anggota
            Pramuka — dari Siaga hingga Pandega, pembina, dan pecinta
            kepanduan — untuk berbagi ilmu, pengalaman, dan semangat Pramuka
            melalui artikel berkualitas.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-foreground">Misi Kami</h2>
          <p className="mb-6">
            Menjadi platform utama yang menginspirasi, mengedukasi, dan
            menghubungkan generasi muda Indonesia melalui nilai-nilai
            kepanduan. Kami percaya bahwa pengetahuan kepanduan harus mudah
            diakses oleh siapa saja, kapan saja.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {values.map((v) => (
              <Card key={v.title}>
                <CardContent className="p-5 text-center">
                  <v.icon className="mx-auto mb-3 h-8 w-8 text-primary" />
                  <h3 className="font-semibold text-foreground">{v.title}</h3>
                  <p className="mt-1 text-sm">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-foreground">
            Pramuka.net dalam Angka
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-5 text-center">
                <p className="text-3xl font-bold text-primary">
                  {siteStats.totalMembers.toLocaleString("id-ID")}
                </p>
                <p className="mt-1 text-sm">Anggota Terdaftar</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5 text-center">
                <p className="text-3xl font-bold text-primary">
                  {siteStats.totalArticles}
                </p>
                <p className="mt-1 text-sm">Artikel Tayang</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5 text-center">
                <p className="text-3xl font-bold text-primary">
                  {siteStats.totalContributors}
                </p>
                <p className="mt-1 text-sm">Kontributor Aktif</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-foreground">
            Satya Darma Pramuka
          </h2>
          <p>
            Kami menjalankan platform ini dengan berpegang pada Tri Satya dan
            Dasa Darma Pramuka. Setiap konten yang terbit telah melalui proses
            moderasi untuk memastikan kesesuaian dengan nilai-nilai luhur
            kepanduan Indonesia.
          </p>
        </section>
      </div>
    </div>
  );
}
