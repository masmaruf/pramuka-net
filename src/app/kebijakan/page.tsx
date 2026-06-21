import type { Metadata } from "next";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Kebijakan Moderasi",
};

export default function KebijakanPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10">
        <Shield className="mb-4 h-10 w-10 text-primary" />
        <h1 className="text-3xl font-bold">Kebijakan Moderasi</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Bagaimana kami menjaga kualitas konten di Pramuka.net
        </p>
      </div>

      <div className="space-y-8 text-muted-foreground">
        <section>
          <h2 className="mb-3 text-xl font-bold text-foreground">
            Tujuan Moderasi
          </h2>
          <p>
            Moderasi dilakukan untuk memastikan setiap artikel yang terbit di
            Pramuka.net berkualitas tinggi, akurat, dan bermanfaat bagi
            komunitas kepanduan Indonesia. Tim moderator kami terdiri dari
            anggota Pramuka berpengalaman yang memahami nilai-nilai kepanduan.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-foreground">
            Proses Review
          </h2>
          <ul className="ml-6 list-disc space-y-2">
            <li>Setiap artikel yang dikirim akan masuk antrian moderasi</li>
            <li>Tim moderator akan meninjau dalam 1-3 hari kerja</li>
            <li>
              Artikel dievaluasi berdasarkan akurasi, kualitas penulisan,
              relevansi, dan kesesuaian dengan nilai-nilai Pramuka
            </li>
            <li>
              Kontributor akan mendapat notifikasi hasil moderasi beserta
              feedback jika diperlukan
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-foreground">
            Kriteria Penerimaan
          </h2>
          <ul className="ml-6 list-disc space-y-2">
            <li>Konten orisinal dan bukan plagiarisme</li>
            <li>Informasi akurat dan dapat diverifikasi</li>
            <li>Bahasa Indonesia yang baik dan mudah dipahami</li>
            <li>Relevan dengan dunia kepanduan</li>
            <li>Tidak mengandung unsur SARA, kekerasan, atau konten dewasa</li>
            <li>Tidak bersifat promosi atau iklan komersial</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-foreground">
            Alasan Penolakan
          </h2>
          <ul className="ml-6 list-disc space-y-2">
            <li>Artikel terlalu pendek (kurang dari 200 kata)</li>
            <li>Informasi tidak akurat atau menyesatkan</li>
            <li>Duplikasi konten yang sudah ada di platform</li>
            <li>Tidak relevan dengan kepanduan</li>
            <li>Melanggar pedoman penulisan</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-foreground">
            Hak Kontributor
          </h2>
          <ul className="ml-6 list-disc space-y-2">
            <li>Mendapat feedback konstruktif atas setiap artikel yang ditolak</li>
            <li>Mengajukan revisi dan mengirim ulang artikel</li>
            <li>Menghubungi tim moderasi untuk klarifikasi keputusan</li>
            <li>Hak cipta konten tetap milik penulis</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-foreground">
            Editor Pick
          </h2>
          <p>
            Artikel dengan kualitas terbaik akan mendapat label &quot;Editor Pick&quot;
            yang ditampilkan di halaman utama. Kriteria pemilihan meliputi
            kedalaman pembahasan, kualitas penulisan, dan manfaat bagi pembaca.
          </p>
        </section>
      </div>
    </div>
  );
}
