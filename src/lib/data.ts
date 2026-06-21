import type { Article, Badge, Category, SiteStats } from "./types";

export const categories: Category[] = [
  { id: "c1", name: "Sejarah & Budaya", slug: "sejarah-budaya" },
  { id: "c2", name: "Pengetahuan Dasar", slug: "pengetahuan-dasar" },
  { id: "c3", name: "Kemping & Petualangan", slug: "kemping-petualangan" },
  { id: "c4", name: "Lingkungan Hidup", slug: "lingkungan-hidup" },
  { id: "c5", name: "Teknologi Pramuka", slug: "teknologi-pramuka" },
  { id: "c6", name: "Pertolongan Pertama", slug: "pertolongan-pertama" },
  { id: "c7", name: "Umum", slug: "umum" },
  { id: "c8", name: "Internasional", slug: "internasional" },
];

export const badges: Badge[] = [
  {
    id: "b1",
    name: "Penulis Perdana",
    description: "Artikel pertama berhasil diterbitkan",
    icon: "pencil",
    requirement: "Terbitkan artikel pertamamu dan raih emblem penghargaan",
  },
  {
    id: "b2",
    name: "Api Semangat",
    description: "Menulis 3 artikel dalam sebulan",
    icon: "flame",
    requirement:
      "Tulis 3 artikel dalam satu bulan untuk membuktikan semangat kontribusimu",
  },
  {
    id: "b3",
    name: "Tinta Emas",
    description: "Menerbitkan 5 artikel berkualitas",
    icon: "award",
    requirement:
      "Capai 5 artikel diterbitkan dan jadilah kontributor andalan",
  },
  {
    id: "b4",
    name: "Raih Badge",
    description: "Artikel mendapatkan 100 likes",
    icon: "heart",
    requirement: "Dapatkan 100 likes pada satu artikel terbaikmu",
  },
  {
    id: "b5",
    name: "Elang Agung",
    description: "Kontributor aktif di 3 kategori berbeda",
    icon: "eagle",
    requirement:
      "Tulis artikel di 3 kategori berbeda untuk memperluas wawasan",
  },
  {
    id: "b6",
    name: "Serigala Penjelajah",
    description: "Anggota aktif selama 6 bulan",
    icon: "compass",
    requirement: "Pencapaian tertinggi kontributor",
  },
];

export const articles: Article[] = [
  {
    id: "a1",
    title: "Teknik Membuat Api Unggun yang Aman di Alam Bebas",
    slug: "teknik-membuat-api-unggun",
    excerpt:
      "Panduan lengkap menyalakan dan menjaga api unggun dengan teknik yang benar agar tetap aman selama berkemah.",
    content: `
## Pendahuluan

Api unggun merupakan salah satu keterampilan dasar yang wajib dikuasai oleh setiap anggota Pramuka. Selain untuk memasak dan menghangatkan badan, api unggun juga menjadi simbol kebersamaan dan semangat kepanduan.

## Persiapan

Sebelum menyalakan api unggun, pastikan kamu telah mempersiapkan:

1. **Lokasi yang aman** - Pilih area terbuka yang jauh dari pohon dan semak kering
2. **Bahan bakar** - Kumpulkan ranting kering, daun kering, dan kayu dalam tiga ukuran
3. **Alat penyala** - Korek api tahan air atau firesteel
4. **Air/pasir** - Untuk memadamkan api saat selesai

## Teknik Menyalakan

### Metode Teepee (Tenda Indian)

Metode ini adalah yang paling populer dan mudah dipelajari:

1. Buat gundukan kecil dari rumput kering atau serutan kayu sebagai tinder
2. Susun ranting-ranting kecil membentuk kerucut di sekitar tinder
3. Nyalakan tinder dari sisi yang terlindung angin
4. Tambahkan ranting yang lebih besar secara bertahap

### Metode Log Cabin

Metode ini menghasilkan api yang lebih stabil dan tahan lama:

1. Letakkan dua batang kayu besar secara paralel
2. Susun dua batang lagi secara tegak lurus di atasnya
3. Ulangi hingga membentuk struktur seperti cabin
4. Isi bagian tengah dengan tinder dan ranting kecil

## Keamanan

- Jangan pernah tinggalkan api tanpa pengawasan
- Padamkan api sepenuhnya sebelum meninggalkan lokasi
- Siram dengan air dan aduk abu hingga benar-benar dingin
- Patuhi peraturan kawasan tentang penggunaan api terbuka

## Kesimpulan

Menguasai teknik membuat api unggun bukan hanya tentang keterampilan survival, tetapi juga tentang tanggung jawab terhadap alam. Seorang Pramuka sejati selalu menjaga kelestarian lingkungan di manapun berada.
    `.trim(),
    category: categories[2],
    tags: [
      { id: "t1", name: "api unggun" },
      { id: "t2", name: "kemah" },
      { id: "t3", name: "survival" },
      { id: "t4", name: "keamanan" },
    ],
    author: {
      id: "u1",
      name: "Raka Nugraha",
      username: "raka_pramuka",
      avatarUrl: undefined,
    },
    status: "diterima",
    isEditorPick: true,
    views: 1240,
    likes: 89,
    createdAt: "2024-12-10",
    publishedAt: "2024-12-12",
  },
  {
    id: "a2",
    title: "Sejarah Gerakan Pramuka Indonesia: Dari Masa ke Masa",
    slug: "sejarah-gerakan-pramuka-indonesia",
    excerpt:
      "Telusuri perjalanan panjang Gerakan Pramuka Indonesia sejak pendiriannya hingga menjadi organisasi kepanduan terbesar di Asia.",
    content: `
## Awal Mula Kepanduan di Indonesia

Gerakan kepanduan di Indonesia tidak bisa dilepaskan dari sejarah perjuangan kemerdekaan bangsa. Semangat kepanduan yang dibawa oleh Baden-Powell dari Inggris, diadaptasi oleh para pemuda Indonesia sebagai wadah pembentukan karakter dan semangat nasionalisme.

## Masa Pra-Kemerdekaan

Pada tahun 1912, organisasi kepanduan pertama di Indonesia bernama **Nederlandsche Padvinders Organisatie (NPO)** didirikan oleh pemerintah Hindia Belanda. Namun, para pemuda pribumi kemudian mendirikan organisasi kepanduan sendiri:

- **Jong Java Padvinderij** (1916)
- **Hizbul Wathan** (1918) - oleh Muhammadiyah
- **Scouting Islam Indonesia** (1920)
- **Kepanduan Bangsa Indonesia** (1931)

## Lahirnya Gerakan Pramuka

Pada tanggal **14 Agustus 1961**, Presiden Soekarno mengeluarkan Keputusan Presiden No. 238 Tahun 1961 yang menetapkan Gerakan Pramuka sebagai satu-satunya organisasi kepanduan di Indonesia. Tanggal ini kemudian diperingati sebagai **Hari Pramuka**.

## Perkembangan Modern

Saat ini, Gerakan Pramuka Indonesia memiliki lebih dari 21 juta anggota, menjadikannya organisasi kepanduan terbesar di Asia dan salah satu yang terbesar di dunia. Struktur keanggotaan terdiri dari:

1. **Siaga** (7-10 tahun)
2. **Penggalang** (11-15 tahun)
3. **Penegak** (16-20 tahun)
4. **Pandega** (21-25 tahun)

## Dasa Darma Pramuka

Setiap anggota Pramuka berpegang pada Dasa Darma:

1. Takwa kepada Tuhan Yang Maha Esa
2. Cinta alam dan kasih sayang sesama manusia
3. Patriot yang sopan dan kesatria
4. Patuh dan suka bermusyawarah
5. Rela menolong dan tabah
6. Rajin, terampil, dan gembira
7. Hemat, cermat, dan bersahaja
8. Disiplin, berani, dan setia
9. Bertanggung jawab dan dapat dipercaya
10. Suci dalam pikiran, perkataan, dan perbuatan

## Kesimpulan

Gerakan Pramuka telah menjadi bagian integral dari pembentukan karakter generasi muda Indonesia selama lebih dari enam dekade. Semangat Satya dan Darma Pramuka terus relevan dalam membentuk pemuda yang berkarakter, bertanggung jawab, dan cinta tanah air.
    `.trim(),
    category: categories[0],
    tags: [
      { id: "t5", name: "sejarah" },
      { id: "t6", name: "pramuka" },
      { id: "t7", name: "indonesia" },
      { id: "t8", name: "kepanduan" },
    ],
    author: {
      id: "u2",
      name: "Siti Rahayu",
      username: "siti_pandu",
      avatarUrl: undefined,
    },
    status: "diterima",
    isEditorPick: true,
    views: 2150,
    likes: 156,
    createdAt: "2024-12-05",
    publishedAt: "2024-12-08",
  },
  {
    id: "a3",
    title: "Morse Code untuk Pramuka Pemula: Belajar Sandi dengan Mudah",
    slug: "morse-code-pramuka-pemula",
    excerpt:
      "Belajar sandi Morse dari dasar dengan metode yang menyenangkan dan mudah diingat, cocok untuk Penggalang.",
    content: `
## Apa Itu Sandi Morse?

Sandi Morse adalah sistem komunikasi yang menggunakan kombinasi titik (.) dan garis (-) untuk merepresentasikan huruf dan angka. Dikembangkan oleh Samuel Morse pada tahun 1830-an, sandi ini masih menjadi keterampilan penting dalam kepanduan.

## Huruf Dasar

| Huruf | Morse | Huruf | Morse |
|-------|-------|-------|-------|
| A | .- | N | -. |
| B | -... | O | --- |
| C | -.-. | P | .--. |
| D | -.. | Q | --.- |
| E | . | R | .-. |
| F | ..-. | S | ... |
| G | --. | T | - |
| H | .... | U | ..- |
| I | .. | V | ...- |
| J | .--- | W | .-- |
| K | -.- | X | -..- |
| L | .-.. | Y | -.-- |
| M | -- | Z | --.. |

## Tips Menghafal

### Metode Kata Kunci
Gunakan kata-kata yang membantu mengingat pola:

- **A (.-)** = "a-LONG" (pendek-panjang)
- **B (-...)** = "BOOT-le-leg-ged" (panjang-pendek-pendek-pendek)
- **S (...)** = "si-si-si" (tiga pendek)
- **O (---)** = "OOO-OOO-OOO" (tiga panjang)
- **SOS (...---...)** = sinyal darurat universal

## Praktek di Lapangan

Sandi Morse dapat dipraktekkan menggunakan berbagai media:
- **Senter** - nyala pendek untuk titik, nyala panjang untuk garis
- **Peluit** - tiup pendek untuk titik, tiup panjang untuk garis
- **Bendera semaphore** - kombinasikan dengan sandi bendera

## Kesimpulan

Menguasai sandi Morse bukan hanya keterampilan kepanduan, tetapi juga melatih konsentrasi dan ketajaman pikiran. Latihan rutin akan membuat kamu semakin mahir!
    `.trim(),
    category: categories[1],
    tags: [
      { id: "t9", name: "morse" },
      { id: "t10", name: "sandi" },
      { id: "t11", name: "komunikasi" },
      { id: "t12", name: "penggalang" },
    ],
    author: {
      id: "u3",
      name: "Dimas Pratama",
      username: "dimas_scout",
      avatarUrl: undefined,
    },
    status: "diterima",
    isEditorPick: false,
    views: 890,
    likes: 67,
    createdAt: "2024-12-01",
    publishedAt: "2024-12-03",
  },
  {
    id: "a4",
    title: "WOSM dan Peran Pramuka di Kancah Internasional",
    slug: "wosm-peran-pramuka-internasional",
    excerpt:
      "Mengenal lebih dalam tentang World Organization of the Scout Movement dan kontribusi Pramuka Indonesia di tingkat global.",
    content: `
## Apa Itu WOSM?

**World Organization of the Scout Movement (WOSM)** adalah organisasi kepanduan dunia yang menaungi lebih dari 170 organisasi kepanduan nasional dengan total lebih dari 57 juta anggota. Didirikan pada tahun 1920, WOSM bertujuan untuk mempromosikan persatuan dan pemahaman antar bangsa melalui gerakan kepanduan.

## Indonesia dalam WOSM

Gerakan Pramuka Indonesia resmi menjadi anggota WOSM sejak tahun 1953. Sebagai salah satu organisasi kepanduan terbesar di dunia, Indonesia memiliki peran signifikan dalam:

- **World Scout Jamboree** - Indonesia rutin mengirimkan kontingen
- **Asia-Pacific Regional Scout Conference** - Berpartisipasi aktif dalam pengambilan keputusan regional
- **Rover Moot** - Ajang pertemuan Pandega tingkat dunia

## Kegiatan Internasional

### World Scout Jamboree
Jambore Dunia diadakan setiap 4 tahun sekali. Indonesia pernah mengirimkan ribuan kontingen dan bahkan pernah menjadi tuan rumah kegiatan kepanduan regional.

### Messengers of Peace
Program global WOSM yang mengajak Pramuka di seluruh dunia untuk berkontribusi dalam perdamaian dan pembangunan berkelanjutan melalui proyek komunitas.

## Kesimpulan

Keterlibatan Pramuka Indonesia di kancah internasional menunjukkan bahwa semangat kepanduan melampaui batas negara. Melalui WOSM, Pramuka Indonesia terus berkontribusi dalam membangun generasi muda yang berwawasan global.
    `.trim(),
    category: categories[7],
    tags: [
      { id: "t13", name: "WOSM" },
      { id: "t14", name: "internasional" },
      { id: "t15", name: "global" },
      { id: "t16", name: "kepanduan" },
    ],
    author: {
      id: "u4",
      name: "Putri Andini",
      username: "putri_pramuka",
      avatarUrl: undefined,
    },
    status: "diterima",
    isEditorPick: false,
    views: 650,
    likes: 45,
    createdAt: "2024-11-28",
    publishedAt: "2024-12-01",
  },
  {
    id: "a5",
    title: "Pertolongan Pertama: Skill Wajib Setiap Pramuka",
    slug: "pertolongan-pertama-skill-pramuka",
    excerpt:
      "Menguasai PPGD (Pertolongan Pertama Gawat Darurat) adalah bekal penting yang harus dimiliki setiap anggota Pramuka.",
    content: `
## Pentingnya Pertolongan Pertama

Setiap anggota Pramuka diharapkan mampu memberikan pertolongan pertama pada kecelakaan (P3K). Keterampilan ini bukan hanya berguna saat kegiatan di alam bebas, tetapi juga dalam kehidupan sehari-hari.

## Prinsip Dasar PPGD

### DRABCD
1. **D**anger - Pastikan area aman
2. **R**esponse - Cek respon korban
3. **A**irway - Buka jalan napas
4. **B**reathing - Periksa pernapasan
5. **C**PR - Lakukan resusitasi jika perlu
6. **D**efibrillation - Gunakan AED jika tersedia

## Penanganan Luka Umum

### Luka Sayat
1. Cuci tangan sebelum menangani luka
2. Bersihkan luka dengan air mengalir
3. Tekan luka dengan kain bersih untuk menghentikan pendarahan
4. Tutup dengan perban steril

### Luka Bakar
1. Alirkan air dingin selama 10-20 menit
2. Jangan pecahkan gelembung
3. Tutup dengan perban longgar
4. Segera bawa ke fasilitas kesehatan jika parah

### Keseleo
Gunakan metode **RICE**:
- **R**est - Istirahatkan bagian yang cedera
- **I**ce - Kompres es selama 15-20 menit
- **C**ompression - Balut dengan elastic bandage
- **E**levation - Tinggikan bagian yang cedera

## Kotak P3K Standar Pramuka

Setiap regu wajib membawa kotak P3K berisi:
- Perban gulung dan plester
- Kasa steril
- Antiseptik (betadine/alkohol)
- Gunting dan pinset
- Obat pribadi
- Sarung tangan lateks

## Kesimpulan

Keterampilan pertolongan pertama bisa menyelamatkan nyawa. Berlatihlah secara rutin dan pastikan selalu membawa kotak P3K saat kegiatan kepanduan.
    `.trim(),
    category: categories[1],
    tags: [
      { id: "t17", name: "PPGD" },
      { id: "t18", name: "pertolongan pertama" },
      { id: "t19", name: "medis" },
      { id: "t20", name: "survival" },
    ],
    author: {
      id: "u2",
      name: "Siti Rahayu",
      username: "siti_pandu",
      avatarUrl: undefined,
    },
    status: "diterima",
    isEditorPick: true,
    views: 1780,
    likes: 134,
    createdAt: "2024-12-08",
    publishedAt: "2024-12-10",
  },
  {
    id: "a6",
    title: "Mendirikan Tenda Dome dalam 10 Menit: Tips & Trik",
    slug: "mendirikan-tenda-dome-10-menit",
    excerpt:
      "Teknik efisien mendirikan tenda dome sendirian dengan langkah-langkah yang sudah teruji di lapangan.",
    content: `
## Persiapan

Sebelum mendirikan tenda, pastikan:
- Area datar dan bersih dari batu tajam
- Arah pintu tenda tidak menghadap angin
- Tanah tidak berada di cekungan (menghindari genangan air hujan)

## Langkah-langkah

### 1. Bentangkan Tenda (1 menit)
Keluarkan tenda dari tas dan bentangkan di atas tanah. Pastikan bagian bawah (flysheet) menghadap ke bawah.

### 2. Pasang Tiang (3 menit)
- Rangkai tiang-tiang fiber hingga terbentuk lengkungan
- Silangkan dua tiang utama membentuk huruf X
- Masukkan tiang ke dalam sleeve atau kaitkan ke klip

### 3. Dirikan Tenda (2 menit)
- Angkat tiang secara bersamaan hingga tenda berdiri
- Kaitkan ujung tiang ke grommet di setiap sudut
- Pastikan tenda terbentang dengan baik

### 4. Pasang Rainfly (2 menit)
- Lemparkan rainfly di atas tenda
- Kaitkan ke setiap sudut dan kencangkan tali
- Pastikan ventilasi tetap terbuka

### 5. Pasang Pasak (2 menit)
- Tancapkan pasak di setiap sudut dengan sudut 45 derajat
- Kencangkan guy rope untuk stabilitas ekstra
- Pastikan tenda tidak mudah terbang tertiup angin

## Tips Pro

- **Latihan di rumah** sebelum ke lapangan
- **Beri nomor** pada tiang untuk memudahkan perakitan
- **Gunakan footprint** untuk melindungi alas tenda
- **Simpan dengan rapi** agar tidak ada bagian yang tertinggal

## Kesimpulan

Dengan latihan rutin, mendirikan tenda dome bisa dilakukan dalam waktu kurang dari 10 menit, bahkan sendirian. Kuncinya adalah persiapan dan mengenal setiap komponen tenda.
    `.trim(),
    category: categories[2],
    tags: [
      { id: "t21", name: "tenda" },
      { id: "t22", name: "kemping" },
      { id: "t23", name: "peralatan" },
      { id: "t24", name: "tips" },
    ],
    author: {
      id: "u1",
      name: "Raka Nugraha",
      username: "raka_pramuka",
      avatarUrl: undefined,
    },
    status: "diterima",
    isEditorPick: false,
    views: 920,
    likes: 72,
    createdAt: "2024-12-12",
    publishedAt: "2024-12-14",
  },
];

export const siteStats: SiteStats = {
  totalMembers: 2847,
  totalArticles: 156,
  totalContributors: 43,
};

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return articles.filter((a) => a.category.slug === categorySlug);
}

export function getEditorPicks(): Article[] {
  return articles.filter((a) => a.isEditorPick);
}

export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase();
  return articles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some((t) => t.name.toLowerCase().includes(q))
  );
}
