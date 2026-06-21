import type { Metadata } from "next";
import { BookOpen, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Panduan Kontribusi",
};

const guidelines = [
  {
    title: "Topik yang Diterima",
    items: [
      "Keterampilan kepanduan (sandi, tali-temali, navigasi, P3K)",
      "Pengalaman kegiatan (jambore, kemah, bakti sosial)",
      "Sejarah dan budaya Pramuka Indonesia maupun internasional",
      "Tips dan trik kegiatan di alam terbuka",
      "Teknologi yang relevan dengan kepanduan modern",
      "Lingkungan hidup dan konservasi alam",
    ],
  },
  {
    title: "Format Penulisan",
    items: [
      "Judul yang jelas dan deskriptif",
      "Ringkasan singkat (2-3 kalimat) di awal artikel",
      "Konten minimal 200 kata",
      "Gunakan paragraf, subjudul, dan list untuk keterbacaan",
      "Sertakan sumber jika mengutip data atau fakta",
    ],
  },
  {
    title: "Aturan Konten",
    items: [
      "Gunakan bahasa Indonesia yang baik dan benar",
      "Pastikan informasi akurat dan bisa diverifikasi",
      "Hindari konten promosi, iklan, atau afiliasi",
      "Tidak mengandung SARA, kekerasan, atau konten dewasa",
      "Konten harus orisinal, bukan hasil plagiarisme",
      "Satu akun dapat mengirim maksimal 3 artikel per minggu",
    ],
  },
];

const steps = [
  {
    step: "1",
    title: "Tulis Artikel",
    desc: "Buat artikel dengan topik kepanduan yang kamu kuasai. Pastikan informasi akurat dan bermanfaat.",
  },
  {
    step: "2",
    title: "Kirim untuk Moderasi",
    desc: "Setelah selesai, kirim artikelmu. Tim moderator akan meninjau dalam 1-3 hari kerja.",
  },
  {
    step: "3",
    title: "Review & Feedback",
    desc: "Kamu akan mendapat notifikasi apakah artikel diterima atau ada masukan untuk perbaikan.",
  },
  {
    step: "4",
    title: "Terbit & Raih Poin",
    desc: "Artikel yang diterima akan diterbitkan dan kamu mendapat +50 poin menuju badge berikutnya.",
  },
];

export default function PanduanPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10">
        <BookOpen className="mb-4 h-10 w-10 text-primary" />
        <h1 className="text-3xl font-bold">Panduan Kontribusi</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Bagikan pengetahuan kepanduanmu kepada komunitas Pramuka Indonesia
        </p>
      </div>

      {/* Steps */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Alur Kontribusi</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {steps.map((s) => (
            <Card key={s.step}>
              <CardContent className="flex gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Guidelines */}
      {guidelines.map((section) => (
        <section key={section.title} className="mb-10">
          <h2 className="mb-4 text-xl font-bold">{section.title}</h2>
          <ul className="space-y-2">
            {section.items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-muted-foreground">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
