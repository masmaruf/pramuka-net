import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
};

export default function SyaratPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold">Syarat & Ketentuan</h1>
      <p className="mb-10 text-sm text-muted-foreground">
        Terakhir diperbarui: Juni 2025
      </p>

      <div className="space-y-8 text-muted-foreground">
        <section>
          <h2 className="mb-3 text-xl font-bold text-foreground">
            1. Penerimaan Syarat
          </h2>
          <p>
            Dengan mengakses dan menggunakan Pramuka.net, Anda menyetujui untuk
            terikat oleh syarat dan ketentuan ini. Jika Anda tidak setuju dengan
            bagian mana pun dari ketentuan ini, Anda tidak diperkenankan
            menggunakan layanan kami.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-foreground">
            2. Akun Pengguna
          </h2>
          <ul className="ml-6 list-disc space-y-2">
            <li>Anda bertanggung jawab atas keamanan akun Anda</li>
            <li>Informasi yang diberikan saat pendaftaran harus akurat</li>
            <li>Satu orang hanya boleh memiliki satu akun</li>
            <li>Usia minimum untuk mendaftar adalah 10 tahun</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-foreground">
            3. Konten Pengguna
          </h2>
          <ul className="ml-6 list-disc space-y-2">
            <li>Hak cipta artikel tetap milik penulis asli</li>
            <li>
              Dengan mengirimkan artikel, Anda memberikan lisensi kepada
              Pramuka.net untuk menampilkan, mendistribusikan, dan
              mempromosikan konten Anda di platform
            </li>
            <li>Konten harus orisinal dan tidak melanggar hak cipta pihak lain</li>
            <li>Pramuka.net berhak menghapus konten yang melanggar ketentuan</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-foreground">
            4. Perilaku Pengguna
          </h2>
          <p>Pengguna dilarang:</p>
          <ul className="ml-6 mt-2 list-disc space-y-2">
            <li>Menyebarkan informasi palsu atau menyesatkan</li>
            <li>Melakukan spam atau penyalahgunaan platform</li>
            <li>Mengunggah konten yang mengandung SARA, kekerasan, atau pornografi</li>
            <li>Mencoba mengakses akun pengguna lain tanpa izin</li>
            <li>Menggunakan platform untuk tujuan komersial tanpa persetujuan</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-foreground">
            5. Moderasi
          </h2>
          <p>
            Semua artikel melewati proses moderasi sebelum diterbitkan. Tim
            moderator berhak menerima, menolak, atau meminta revisi atas
            artikel yang dikirimkan. Keputusan moderasi bersifat final namun
            kontributor berhak meminta klarifikasi.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-foreground">
            6. Pembatasan Tanggung Jawab
          </h2>
          <p>
            Pramuka.net menyediakan platform &quot;sebagaimana adanya&quot; tanpa
            jaminan apa pun. Kami tidak bertanggung jawab atas kerugian yang
            timbul dari penggunaan informasi yang disajikan di platform ini.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-foreground">
            7. Perubahan Ketentuan
          </h2>
          <p>
            Pramuka.net berhak mengubah syarat dan ketentuan ini sewaktu-waktu.
            Perubahan akan diumumkan melalui platform dan berlaku sejak tanggal
            diterbitkan.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-foreground">
            8. Kontak
          </h2>
          <p>
            Jika ada pertanyaan mengenai syarat dan ketentuan ini, silakan
            hubungi kami melalui halaman{" "}
            <a href="/hubungi" className="text-primary hover:underline">
              Hubungi Kami
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
