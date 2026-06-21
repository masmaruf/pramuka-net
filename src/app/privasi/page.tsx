import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
};

export default function PrivasiPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold">Kebijakan Privasi</h1>
      <p className="mb-10 text-sm text-muted-foreground">
        Terakhir diperbarui: Juni 2025
      </p>

      <div className="space-y-8 text-muted-foreground">
        <section>
          <h2 className="mb-3 text-xl font-bold text-foreground">
            1. Informasi yang Kami Kumpulkan
          </h2>
          <p className="mb-2">
            Kami mengumpulkan informasi yang Anda berikan secara langsung saat:
          </p>
          <ul className="ml-6 list-disc space-y-2">
            <li>Mendaftar akun (nama, email, username)</li>
            <li>Mengirimkan artikel (konten, kategori, tag)</li>
            <li>Menggunakan fitur platform (like, komentar)</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-foreground">
            2. Penggunaan Informasi
          </h2>
          <p>Informasi yang dikumpulkan digunakan untuk:</p>
          <ul className="ml-6 mt-2 list-disc space-y-2">
            <li>Mengelola akun dan autentikasi pengguna</li>
            <li>Menampilkan profil dan artikel yang diterbitkan</li>
            <li>Mengirim notifikasi terkait status artikel dan badge</li>
            <li>Meningkatkan kualitas layanan platform</li>
            <li>Mencegah penyalahgunaan dan menjaga keamanan</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-foreground">
            3. Penyimpanan Data
          </h2>
          <p>
            Data Anda disimpan pada server yang aman dan dilindungi dengan
            enkripsi. Kami menyimpan data selama akun Anda aktif atau selama
            diperlukan untuk menyediakan layanan. Anda dapat meminta penghapusan
            data kapan saja.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-foreground">
            4. Berbagi Data
          </h2>
          <p>Kami tidak menjual data pribadi Anda. Informasi hanya dibagikan:</p>
          <ul className="ml-6 mt-2 list-disc space-y-2">
            <li>Profil publik (nama, username, avatar) ditampilkan di artikel</li>
            <li>Jika diwajibkan oleh hukum yang berlaku</li>
            <li>Dengan penyedia layanan pihak ketiga yang membantu operasional platform (hosting, email)</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-foreground">
            5. Cookie
          </h2>
          <p>
            Kami menggunakan cookie untuk menjaga sesi login dan meningkatkan
            pengalaman pengguna. Anda dapat mengatur preferensi cookie melalui
            pengaturan browser Anda.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-foreground">
            6. Hak Pengguna
          </h2>
          <p>Anda berhak untuk:</p>
          <ul className="ml-6 mt-2 list-disc space-y-2">
            <li>Mengakses data pribadi yang kami simpan</li>
            <li>Memperbarui atau mengoreksi informasi Anda</li>
            <li>Meminta penghapusan akun dan data Anda</li>
            <li>Menarik persetujuan penggunaan data kapan saja</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-foreground">
            7. Keamanan
          </h2>
          <p>
            Kami menerapkan langkah keamanan teknis dan organisasi untuk
            melindungi data Anda, termasuk enkripsi data, akses terbatas, dan
            monitoring keamanan. Namun, tidak ada sistem yang 100% aman dan kami
            tidak dapat menjamin keamanan absolut.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-foreground">
            8. Kontak
          </h2>
          <p>
            Untuk pertanyaan tentang kebijakan privasi ini, hubungi kami di{" "}
            <a href="/hubungi" className="text-primary hover:underline">
              halaman kontak
            </a>{" "}
            atau email ke redaksi@pramuka.net.
          </p>
        </section>
      </div>
    </div>
  );
}
