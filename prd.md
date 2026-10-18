# PRD JelajahNusa

> **Aturan utama:** Dokumen ini adalah *single source of truth* project JelajahNusa. Setiap AI coding assistant wajib membaca bagian 21 (Scope Boundaries) dan bagian 25 (Reusable AI Coding Instructions) sebelum menulis kode.

---

## 1. Document Overview and Version

| Item | Isi |
|---|---|
| Nama dokumen | Product Requirements Document (PRD) JelajahNusa |
| Versi | 1.0 (Draft untuk persetujuan) |
| Tanggal | 18 Oktober 2026 |
| Pemilik produk | Pemilik project (pelajar Pemrograman Web Dicoding) |
| Status | Menunggu persetujuan sebelum development |
| Jenis project | Website statis, portfolio pribadi |

**Riwayat revisi**

| Versi | Tanggal | Perubahan |
|---|---|---|
| 1.0 | 18 Okt 2026 | Dokumen pertama |

**Konvensi dokumen**
- **WAJIB** = harus ada di versi 1.0.
- **OPSIONAL** = rekomendasi, boleh dikerjakan hanya jika semua yang WAJIB selesai dan tidak memperluas scope.
- **ASUMSI** = keputusan minimal karena detail belum ditentukan (daftar lengkap di bagian 22).
- ID requirement: `FR-xxx` (functional), `NFR-xxx` (non-functional), `AC-xxx` (acceptance criteria).

---

## 2. Product Summary

JelajahNusa adalah website inspirasi wisata Indonesia berbasis HTML5, CSS3, dan Vanilla JavaScript (ES6+) yang berjalan sebagai website statis tanpa backend. Pengguna dapat menjelajahi enam destinasi pilihan, mencari dan memfilter destinasi, lalu membuka halaman detail berisi gambaran umum, galeri foto, informasi berkunjung, dan destinasi terkait.

Project ini punya dua tujuan:
1. **Tujuan produk:** membantu anak muda dan traveler pemula menemukan inspirasi wisata dan informasi dasar sebelum berkunjung.
2. **Tujuan portfolio:** menunjukkan penguasaan Semantic HTML serta kemampuan dasar CSS dan JavaScript.

Website terdiri dari **dua halaman**: `index.html` dan `destination.html`.

---

## 3. Problem Statement

Calon traveler pemula sering kesulitan menemukan inspirasi wisata Indonesia yang tertata rapi. Informasi tersebar di banyak sumber, tampilannya padat, dan tidak selalu mudah dibaca di ponsel. Akibatnya, pengguna sulit membandingkan destinasi dan memutuskan tempat mana yang layak dikunjungi.

Dari sisi pembuat, belum ada karya yang menunjukkan secara nyata kemampuan menyusun struktur HTML semantik, tampilan responsif, dan interaksi JavaScript dasar dalam satu produk yang utuh.

---

## 4. Product Goals

| ID | Tujuan | Cara mengukur |
|---|---|---|
| G-01 | Pengguna dapat menemukan destinasi yang menarik dengan cepat | Pengguna dapat mencari/memfilter dan membuka detail destinasi dalam maksimal 3 interaksi dari beranda (diverifikasi manual, lihat TC di bagian 19) |
| G-02 | Pengguna mendapat informasi dasar dan tips sebelum berkunjung | Setiap halaman detail menampilkan seluruh field wajib pada bagian 16 |
| G-03 | Menunjukkan penguasaan Semantic HTML | Lolos checklist semantik pada bagian 14 dan validasi HTML tanpa error |
| G-04 | Menunjukkan kemampuan CSS responsif | Tampil benar pada 3 lebar layar uji (bagian 19) tanpa horizontal overflow |
| G-05 | Menunjukkan kemampuan JavaScript dasar yang rapi | Search, filter, dan render detail berfungsi tanpa error console; kode terpisah sesuai tanggung jawab file |
| G-06 | Layak dijadikan portfolio | README lengkap, website ter-deploy, tidak ada broken link pada alur utama |

---

## 5. Non-Goals

Hal-hal berikut **bukan** tujuan versi 1.0:
- Menjadi platform pemesanan atau penjualan paket wisata.
- Menyediakan informasi harga tiket, jam operasional, atau aturan kunjungan yang lengkap dan terverifikasi.
- Menjadi direktori seluruh destinasi Indonesia (hanya 6 destinasi).
- Menyimpan data pengguna (akun, favorit, ulasan).
- Menyaingi website travel komersial dari segi fitur.
- Mengoptimalkan SEO tingkat lanjut.

---

## 6. Target Users and User Personas

**Target utama:** mahasiswa dan anak muda usia sekitar 18–30 tahun, traveler pemula, serta pencinta wisata alam, pantai, pegunungan, dan budaya Indonesia.

**Persona 1: Rani, 20 tahun, mahasiswa**
- Kebutuhan: mencari ide liburan hemat saat libur semester, sebagian besar mengakses lewat ponsel.
- Frustrasi: terlalu banyak informasi tidak terstruktur di media sosial.
- Perilaku: menelusuri foto, membaca ringkasan, lalu membuka satu-dua detail.

**Persona 2: Dimas, 25 tahun, pekerja pemula**
- Kebutuhan: membandingkan beberapa destinasi alam sebelum menentukan tujuan akhir pekan panjang.
- Frustrasi: sulit melihat kategori dan lokasi sekilas.
- Perilaku: memakai pencarian dan filter, membuka beberapa destinasi berurutan lewat "destinasi terkait".

**Persona 3: Recruiter / reviewer portfolio (pengguna sekunder)**
- Kebutuhan: menilai kualitas struktur HTML, kerapian CSS/JS, dan kelengkapan dokumentasi.
- Perilaku: membuka website, mencoba fitur utama, lalu memeriksa repository dan README.

---

## 7. User Needs and User Journeys

### 7.1 Kebutuhan pengguna

| ID | Kebutuhan | Dipenuhi oleh |
|---|---|---|
| UN-01 | Saya ingin langsung memahami apa itu JelajahNusa | Hero section (FR-005) |
| UN-02 | Saya ingin melihat destinasi terbaik secara cepat | Featured destinations (FR-006) |
| UN-03 | Saya ingin mempersempit pilihan berdasarkan jenis wisata | Category filter (FR-009–FR-012) |
| UN-04 | Saya ingin mencari destinasi dengan nama atau lokasi | Search (FR-013–FR-016) |
| UN-05 | Saya ingin tahu detail dan tips untuk satu destinasi | Halaman detail (FR-017–FR-024) |
| UN-06 | Saya ingin lanjut menjelajah tanpa kembali berulang-ulang | Related destinations (FR-023) |
| UN-07 | Saya ingin nyaman memakai website di ponsel | Responsive (FR-025, NFR-004) |

### 7.2 User journeys

**Journey A: Menjelajah dari beranda**
1. Pengguna membuka `index.html` dan melihat hero.
2. Menggulir ke featured destinations, lalu memilih satu kartu.
3. Masuk ke `destination.html?id=...`, membaca overview, galeri, dan informasi berkunjung.
4. Memilih destinasi terkait atau kembali ke daftar destinasi.

**Journey B: Mencari destinasi spesifik**
1. Pengguna menuju section "Explore all destinations".
2. Mengetik kata kunci (misal "bali") dan memilih kategori.
3. Daftar berubah tanpa reload. Jika kosong, muncul empty state dengan cara mereset.
4. Pengguna membuka kartu hasil.

**Journey C: Tautan langsung / ID salah**
1. Pengguna membuka `destination.html?id=xyz` (ID tidak valid) atau tanpa parameter.
2. Muncul pesan "destinasi tidak ditemukan" dengan tautan kembali ke daftar destinasi.

**Journey D: Pengguna mobile**
1. Membuka menu hamburger, memilih tautan, menu tertutup otomatis, halaman menggulir ke section tujuan.

---

## 8. Information Architecture

```
JelajahNusa
├── Home (index.html)
│   ├── Header + Navigation
│   ├── Hero
│   ├── Featured Destinations
│   ├── Explore by Category
│   ├── Explore All Destinations (search + filter + grid)
│   ├── Travel Tips
│   ├── Call-to-Action
│   └── Footer
└── Destination Detail (destination.html?id=<id>)
    ├── Header + Navigation
    ├── Destination Hero
    ├── Destination Overview
    ├── Photo Gallery
    ├── Travel Information
    ├── Related Destinations
    ├── Back-to-destinations navigation
    └── Footer
```

**Pengelompokan konten**
- **Konten statis (di HTML):** hero beranda, travel tips, CTA, footer, teks navigasi.
- **Konten dinamis (dari `data.js`, dirender JS):** kartu featured, kartu daftar destinasi, seluruh isi halaman detail, related destinations.

---

## 9. Sitemap and Navigation Flow

```
index.html ──(klik kartu)──────────────► destination.html?id=<id>
    ▲                                         │
    │◄──(Back to destinations)────────────────┤
    │◄──(logo / menu Beranda)─────────────────┤
    │                                         ▼
    │                         destination.html?id=<related-id>
    │
    └─ anchor internal: #featured, #kategori, #destinasi, #tips
```

**Menu navigasi (ASUMSI, label dapat disesuaikan tanpa mengubah struktur):**

| Label | Tujuan dari `index.html` | Tujuan dari `destination.html` |
|---|---|---|
| Beranda | `index.html` (atau atas halaman) | `index.html` |
| Destinasi | `#destinasi` di `index.html` | `index.html#destinasi` |
| Kategori | `#kategori` di `index.html` | `index.html#kategori` |
| Tips | `#tips` di `index.html` | `index.html#tips` |

**Aturan:** semua tautan navigasi adalah elemen `<a>` dengan `href` valid. Tombol hanya untuk aksi (buka/tutup menu, reset filter).

---

## 10. Detailed Page Specifications

### 10.1 Home Page: `index.html`

| # | Section | Tujuan | Konten | Sumber konten |
|---|---|---|---|---|
| 1 | Header + navigation | Identitas dan navigasi | Logo/nama, menu desktop, tombol menu mobile | Statis |
| 2 | Hero | Memperkenalkan JelajahNusa | Judul (satu `h1`), kalimat pendukung, CTA ke `#destinasi`, gambar hero | Statis |
| 3 | Featured destinations | Menyorot destinasi unggulan | 3 kartu destinasi (ASUMSI: Bromo, Raja Ampat, Borobudur) dengan tautan ke detail | Dinamis dari `data.js` |
| 4 | Explore by category | Pintu masuk ke filter | Daftar kategori (Gunung, Pantai & Laut, Budaya & Sejarah) sebagai kontrol yang menerapkan filter di section 5 | Kategori dari `data.js` |
| 5 | Explore all destinations | Pencarian dan jelajah penuh | Kolom pencarian, kontrol filter kategori, tombol "Semua", grid 6 kartu, teks jumlah hasil, empty state | Dinamis dari `data.js` |
| 6 | Travel tips | Edukasi umum | 4–6 tips umum (misal: cek kondisi cuaca, hormati adat setempat, bawa air minum, jangan buang sampah sembarangan) yang tidak mengandung data spesifik tak terverifikasi | Statis |
| 7 | Call-to-action | Mengajak pengguna menjelajah | Satu judul, satu kalimat, satu tautan ke `#destinasi` | Statis |
| 8 | Footer | Penutup | Nama project, catatan portfolio, kredit gambar, tautan navigasi | Statis |

Catatan: section Featured dan Explore by Category bersifat berbeda fungsi. Featured menampilkan kartu langsung, sedangkan Category mengarahkan ke filter. Tidak boleh menduplikasi dataset.

### 10.2 Destination Detail Page: `destination.html`

| # | Section | Tujuan | Konten |
|---|---|---|---|
| 1 | Header + navigation | Sama dengan beranda (markup konsisten) | Logo, menu |
| 2 | Destination hero | Kesan visual dan identitas | Hero image, nama (`h1`), provinsi, kategori, deskripsi singkat |
| 3 | Destination overview | Gambaran umum | Deskripsi lengkap, daftar daya tarik utama |
| 4 | Photo gallery | Visual tambahan | Kumpulan gambar galeri dengan `figure`/`figcaption` atau alt text yang bermakna |
| 5 | Travel information | Informasi praktis | Rekomendasi aktivitas, tips berkunjung, dan catatan "informasi perlu diperiksa" untuk harga tiket, jam operasional, dan aturan kunjungan |
| 6 | Related destinations | Lanjut menjelajah | 2–3 kartu destinasi terkait dengan tautan ke `destination.html?id=<id>` |
| 7 | Back-to-destinations | Kembali ke daftar | Tautan menuju `index.html#destinasi` |
| 8 | Footer | Sama dengan beranda | |

**Perilaku render:** satu template; `destination.js` membaca parameter `id`, mencari data, lalu mengisi elemen. Judul halaman (`<title>`) diperbarui sesuai nama destinasi.

---

## 11. Functional Requirements

Prioritas: **WAJIB** kecuali ditandai lain.

### 11.1 Navigation

| ID | Requirement | Tujuan |
|---|---|---|
| FR-001 | Header menampilkan nama/logo yang berupa tautan ke `index.html` dan menu navigasi desktop pada lebar layar desktop | Orientasi dan akses cepat |
| FR-002 | Pada layar kecil, menu ditampilkan lewat tombol buka/tutup (`<button>`) yang mengubah visibilitas menu dan memperbarui atribut `aria-expanded` | Navigasi mobile |
| FR-003 | Menu mobile tertutup otomatis setelah pengguna memilih tautan di dalamnya; menu juga dapat ditutup dengan tombol yang sama dan dengan tombol `Escape` | Kenyamanan, keyboard |
| FR-004 | Seluruh menu dapat dioperasikan dengan keyboard (Tab, Shift+Tab, Enter, Escape) dan menampilkan focus state yang terlihat | Aksesibilitas |

### 11.2 Home page content

| ID | Requirement | Tujuan |
|---|---|---|
| FR-005 | Hero menampilkan satu `h1`, kalimat pengantar, gambar destinasi, dan tautan CTA ke `#destinasi` | Memperkenalkan produk |
| FR-006 | Featured destinations menampilkan 3 kartu yang dirender dari `data.js` | Menyorot destinasi |
| FR-007 | Explore by category menampilkan kategori yang tersedia dan, saat dipilih, menerapkan filter ke daftar di section "Explore all destinations" serta memindahkan pengguna ke section tersebut | Jalur cepat ke filter |
| FR-008 | Travel tips, CTA, dan footer tampil sebagai konten statis sesuai bagian 10.1 | Melengkapi halaman |

### 11.3 Destination cards

| ID | Requirement | Tujuan |
|---|---|---|
| FR-009 | Setiap kartu menampilkan gambar (dengan alt), nama, lokasi, kategori, dan deskripsi singkat | Informasi sekilas |
| FR-010 | Setiap kartu memiliki tautan ke `destination.html?id=<id>`; tautan memiliki accessible name yang jelas (misal memuat nama destinasi) | Navigasi ke detail |
| FR-011 | Data kartu di beranda dan di halaman detail (related destinations) berasal dari dataset yang sama di `data.js` | Konsistensi, tanpa duplikasi |

### 11.4 Category filter

| ID | Requirement | Tujuan |
|---|---|---|
| FR-012 | Pengguna dapat memfilter kartu pada "Explore all destinations" berdasarkan satu kategori; hasil berubah tanpa reload | Mempersempit pilihan |
| FR-013 | Tersedia kontrol "Semua" untuk menampilkan kembali seluruh destinasi | Reset filter |
| FR-014 | Kontrol filter berupa `<button>` yang menandai status aktif (`aria-pressed` atau setara) dan tampilan aktif yang jelas | Umpan balik state |
| FR-015 | Jika tidak ada hasil, tampil empty state berisi pesan jelas dan tombol untuk mengatur ulang pencarian/filter | Menangani hasil kosong |

### 11.5 Search

| ID | Requirement | Tujuan |
|---|---|---|
| FR-016 | Pencarian mencocokkan teks dengan nama destinasi dan lokasi (provinsi) | Menemukan destinasi |
| FR-017 | Pencarian tidak membedakan huruf besar/kecil dan mengabaikan spasi di awal/akhir kata kunci | Kemudahan |
| FR-018 | Search dan category filter bekerja bersamaan (hasil = memenuhi keduanya) | Kombinasi |
| FR-019 | Kolom pencarian memiliki `<label>` terkait; hasil diperbarui saat pengguna mengetik tanpa reload | Aksesibilitas, responsif |
| FR-020 | Jumlah hasil ditampilkan sebagai teks dan diumumkan lewat region `aria-live` yang sopan (polite) | Umpan balik |
| FR-021 | Empty state sama dengan FR-015 | Konsistensi |

### 11.6 Destination detail

| ID | Requirement | Tujuan |
|---|---|---|
| FR-022 | `destination.js` membaca parameter `id` dari URL dan mencari destinasi di dataset | Render dinamis |
| FR-023 | Jika ID valid, halaman merender seluruh section pada bagian 10.2 dari data destinasi, serta memperbarui `<title>` halaman | Detail lengkap |
| FR-024 | Jika ID tidak ada atau tidak valid, halaman menampilkan pesan "Destinasi tidak ditemukan" dengan tautan ke `index.html#destinasi`; section detail tidak ditampilkan | Fallback |
| FR-025 | Related destinations merender 2–3 kartu berdasarkan `relatedIds`; setiap tautan mengarah ke ID yang benar; ID related yang tidak valid dilewati tanpa error | Lanjut menjelajah |
| FR-026 | Tautan "Kembali ke destinasi" mengarah ke `index.html#destinasi` | Navigasi balik |
| FR-027 | Galeri menampilkan seluruh gambar galeri destinasi dalam grid statis (tanpa carousel autoplay) | Visual |
| FR-028 | Informasi yang belum terverifikasi (harga tiket, jam operasional, aturan kunjungan) ditampilkan sebagai catatan umum "perlu diperiksa ke sumber resmi", bukan angka atau aturan spesifik | Menghindari data karangan |

### 11.7 Responsive design

| ID | Requirement | Tujuan |
|---|---|---|
| FR-029 | Layout menyesuaikan tiga rentang: mobile (≤ 599px), tablet (600–1023px), desktop (≥ 1024px) | Responsif |
| FR-030 | Grid kartu: 1 kolom (mobile), 2 kolom (tablet), 3 kolom (desktop) | Konsistensi |
| FR-031 | Tidak ada horizontal scroll yang tidak disengaja pada lebar 320px sampai 1440px | Kenyamanan |

---

## 12. Non-Functional Requirements

| ID | Kategori | Requirement | Cara verifikasi |
|---|---|---|---|
| NFR-001 | Semantic HTML | Struktur dokumen memakai `header`, `nav`, `main`, `section`, `article`, `footer` sesuai fungsi; hanya satu `main` per halaman | Inspeksi manual + validator HTML |
| NFR-002 | Heading | Satu `h1` per halaman, hierarki heading berurutan tanpa lompatan level | Inspeksi manual / outline heading |
| NFR-003 | Link vs button | Navigasi memakai `<a>`, aksi memakai `<button>` | Inspeksi manual |
| NFR-004 | Responsif | Memenuhi FR-029 sampai FR-031 | Uji lebar 360, 768, 1280px |
| NFR-005 | Alt text | Setiap gambar bermakna memiliki alt deskriptif; gambar dekoratif memakai `alt=""` | Inspeksi manual |
| NFR-006 | Keyboard | Semua kontrol interaktif dapat dijangkau dan dioperasikan dengan keyboard dalam urutan logis | Uji keyboard manual |
| NFR-007 | Focus | Focus state terlihat jelas pada semua elemen interaktif; tidak menghapus outline tanpa pengganti | Uji manual |
| NFR-008 | Accessible name | Setiap kontrol interaktif memiliki label atau accessible name | Inspeksi manual |
| NFR-009 | Kontras | Rasio kontras teks minimal 4.5:1 (teks normal) dan 3:1 (teks besar), diperiksa dengan alat kontras | Pengecekan dengan alat kontras |
| NFR-010 | Gambar | Ukuran gambar dioptimalkan (target ASUMSI: tiap gambar ≤ 300 KB untuk galeri, ≤ 500 KB untuk hero), memakai `loading="lazy"` untuk gambar di bawah fold, dan memiliki atribut `width`/`height` untuk mengurangi layout shift; sumber dan lisensi tercatat | Cek ukuran file + tabel kredit di README |
| NFR-011 | Error bebas | Tidak ada broken link dan tidak ada error di console pada alur utama (bagian 19) | Uji manual |
| NFR-012 | Kode pemula | Kode memakai nama jelas, komentar singkat seperlunya, fungsi kecil, tanpa abstraksi berlebih | Code review |
| NFR-013 | Dependency | Tidak ada dependency eksternal selain font yang ditetapkan (lihat A-05) | Inspeksi `<head>` dan file |
| NFR-014 | Statis | Berjalan hanya dengan membuka file / server statis, tanpa build step | Uji lokal + deploy |
| NFR-015 | Gerak | Animasi dibatasi pada transisi sederhana (hover/focus, buka-tutup menu) dan menghormati `prefers-reduced-motion` | Inspeksi CSS |
| NFR-016 | Kompatibilitas | Berfungsi di versi terbaru Chrome, Firefox, dan Safari/Edge (ASUMSI: minimal Chrome, Firefox, Edge) | Uji manual |

**Catatan klaim:** tidak boleh mengklaim website "accessible" atau "cepat" sebelum pengujian dilakukan dan hasilnya dicatat.

---

## 13. Design System and Visual Guidelines

**Arah desain:** Modern Editorial Travel. Premium, bersih, modern, natural, terinspirasi majalah perjalanan. Foto destinasi adalah elemen visual utama.

### 13.1 Warna

| Token (nama saran) | Hex | Penggunaan |
|---|---|---|
| `--color-bg` | `#F6F4EE` | Latar utama |
| `--color-primary` | `#173D35` | Teks heading, tombol utama, footer |
| `--color-secondary` | `#C7D7C1` | Latar section sekunder, badge, kartu ringan |
| `--color-accent` | `#D6A66B` | Aksen kecil (garis, badge, hover); **bukan** warna teks di atas latar terang |

Ketentuan kontras (ASUMSI, wajib diverifikasi saat implementasi):
- Teks utama: `#173D35` di atas `#F6F4EE`.
- Teks di atas `#173D35`: gunakan `#F6F4EE`.
- Warna accent `#D6A66B` tidak dipakai sebagai warna teks kecil di latar terang karena berisiko kontras rendah.
- Warna teks body tambahan (abu gelap/hijau gelap) boleh ditambahkan selama masih satu keluarga palet dan lolos NFR-009.

### 13.2 Typography

| Peran | Font | Fallback |
|---|---|---|
| Heading | Plus Jakarta Sans | system-ui, sans-serif |
| Body | Inter | system-ui, sans-serif |

Skala ukuran (ASUMSI): body 16px–18px, line-height 1.5–1.7, `h1` ±2.25–3.5rem (responsif), `h2` ±1.75–2.25rem, `h3` ±1.25rem. Panjang baris teks sekitar 60–75 karakter.

### 13.3 Layout dan spacing

- Container dengan lebar maksimum (ASUMSI 1200px), padding horizontal konsisten.
- Sistem grid konsisten: 1/2/3 kolom sesuai FR-030.
- Skala spacing berbasis kelipatan 4/8px.
- Jarak antar section lega (whitespace cukup), tidak padat.

### 13.4 Komponen

| Komponen | Spesifikasi |
|---|---|
| Tombol | Dua varian: primary (hijau tua) dan secondary (outline). Ukuran target sentuh minimal 44x44px. Focus terlihat |
| Kartu destinasi | Gambar rasio konsisten, kategori sebagai badge, nama (`h3`), lokasi, deskripsi singkat, tautan |
| Badge kategori | Latar sage, teks hijau tua |
| Input pencarian | Label terlihat atau visually-hidden yang benar, border jelas, focus state |
| Filter | Kelompok tombol; state aktif berbeda jelas (bukan hanya warna) |
| Empty state | Pesan singkat + tombol reset |
| Galeri | Grid statis dengan gambar ber-alt |

### 13.5 Ikon

Gunakan solusi sederhana: SVG inline atau file SVG di `assets/icons/` untuk kebutuhan minim (ikon menu, tutup, panah). Tidak memakai library ikon atau emoji sebagai ikon antarmuka.

### 13.6 Hal yang dihindari

Gradient dominan, warna neon, glow berlebihan, glassmorphism berlebihan, animasi tanpa tujuan, carousel autoplay, tilt dan parallax, counter statistik dekoratif, layout padat, emoji sebagai ikon UI, serta elemen dekoratif tanpa fungsi.

### 13.7 Gambar

- Semua gambar harus memiliki **sumber dan lisensi yang jelas** (misalnya foto milik sendiri, atau sumber berlisensi bebas yang mengizinkan penggunaan portfolio). Setiap gambar dicatat di README: sumber, pembuat, lisensi, dan URL.
- Format disarankan WebP atau JPEG yang telah dikompresi (ASUMSI).
- Penamaan file: huruf kecil, tanda hubung, mis. `bromo-hero.jpg`.

---

## 14. Semantic HTML and Accessibility Requirements

### 14.1 Pemetaan elemen semantik

| Elemen | Penggunaan |
|---|---|
| `<header>` | Header situs (logo + nav). Hero destinasi boleh memakai `<header>` di dalam `<section>` hanya jika sesuai fungsi |
| `<nav>` | Navigasi utama; diberi `aria-label` (mis. "Navigasi utama") |
| `<main>` | Konten utama, satu per halaman, dengan `id` untuk skip link |
| `<section>` | Bagian tematik yang memiliki heading |
| `<article>` | Kartu destinasi (konten mandiri) |
| `<figure>` + `<figcaption>` | Gambar galeri/hero yang punya keterangan |
| `<ul>/<ol>/<li>` | Daftar tips, aktivitas, daya tarik, kategori |
| `<footer>` | Footer situs |
| `<address>` | Hanya jika ada informasi kontak; jangan dipakai untuk lokasi destinasi |
| `<button>` | Aksi: buka/tutup menu, filter, reset |
| `<a>` | Navigasi antar halaman/section |
| `<form>`/`<label>`/`<input type="search">` | Pencarian (tanpa submit ke server; submit default dicegah) |

### 14.2 Persyaratan aksesibilitas

| ID | Requirement |
|---|---|
| A11Y-01 | Atribut `lang="id"` pada `<html>` |
| A11Y-02 | `<title>` dan meta description unik per halaman; halaman detail memperbarui judul sesuai destinasi |
| A11Y-03 | Skip link "Lewati ke konten utama" di awal halaman (OPSIONAL tetapi direkomendasikan) |
| A11Y-04 | Urutan heading logis (lihat NFR-002) |
| A11Y-05 | Teks tautan bermakna; hindari "klik di sini" |
| A11Y-06 | Tombol menu memakai `aria-expanded` dan `aria-controls` |
| A11Y-07 | Pembaruan hasil pencarian diumumkan melalui region `aria-live="polite"` |
| A11Y-08 | Alt text deskriptif, ringkas, dan tidak mengulang teks sekitarnya secara berlebihan |
| A11Y-09 | Tidak mengandalkan warna saja untuk menyampaikan status |
| A11Y-10 | Mendukung `prefers-reduced-motion` |
| A11Y-11 | Meta viewport benar dan zoom tidak dinonaktifkan |

---

## 15. Technical Architecture and File Responsibilities

### 15.1 Struktur folder

```
jelajahnusa/
├── index.html
├── destination.html
├── css/
│   └── style.css
├── js/
│   ├── data.js
│   ├── main.js
│   └── destination.js
├── assets/
│   ├── images/
│   └── icons/
└── README.md
```

### 15.2 Tanggung jawab file

| File | Tanggung jawab | Tidak boleh berisi |
|---|---|---|
| `index.html` | Struktur semantik beranda, kerangka section, wadah (container) untuk konten dinamis, pemanggilan CSS/JS | Data destinasi, inline event handler |
| `destination.html` | Satu template detail, wadah untuk konten dinamis, wadah state "tidak ditemukan" | Data destinasi, konten destinasi yang di-hardcode |
| `css/style.css` | Semua gaya: token warna/font, layout, komponen, responsif, focus state, reduced-motion | Logika bisnis |
| `js/data.js` | Satu-satunya sumber data destinasi dan daftar kategori | Manipulasi DOM |
| `js/main.js` | Logika beranda: toggle menu, render featured & daftar, kategori, search, filter, empty state | Logika halaman detail |
| `js/destination.js` | Logika halaman detail: baca `id`, render detail/galeri/related, fallback, toggle menu halaman detail | Logika filter/search |
| `assets/images/` | Gambar hero, kartu, galeri | |
| `assets/icons/` | Ikon SVG minimal | |
| `README.md` | Deskripsi, cara menjalankan, struktur, kredit gambar, hasil pengujian, tautan deploy | |

### 15.3 Dependency antar-file

```
index.html        → css/style.css, js/data.js, js/main.js        (urutan: data.js sebelum main.js)
destination.html  → css/style.css, js/data.js, js/destination.js (urutan: data.js sebelum destination.js)
main.js, destination.js → membaca data dari data.js
```

**Catatan penting:** toggle menu dipakai di dua halaman. Agar tidak menambah file baru, logika toggle menu ditulis sederhana di masing-masing file JS yang relevan, **atau** (jika dianggap duplikasi berlebihan) diajukan sebagai perubahan struktur untuk persetujuan. Keputusan default: duplikasi kecil diterima demi menjaga struktur file tetap sederhana (ASUMSI A-07).

### 15.4 Kontrak antar-file (harus dipertahankan)

| Kontrak | Aturan |
|---|---|
| Data | `data.js` mengekspos satu koleksi destinasi dan satu daftar kategori yang diakses `main.js` dan `destination.js` lewat satu nama global (dipilih saat implementasi, mis. `destinations`) atau lewat ES module; keputusan dicatat di README |
| URL detail | Format tetap `destination.html?id=<id>` |
| ID elemen/class | Nama ID/class yang dipakai JS didokumentasikan di README agar tidak berubah tanpa persetujuan |
| Skema data | Mengikuti bagian 16 |

**Catatan teknis:** jika memakai ES modules (`type="module"`), halaman tidak dapat dibuka lewat `file://` di sebagian browser karena pembatasan CORS. Maka diputuskan default (ASUMSI A-06): **memakai script biasa (non-module) dengan satu global yang terdefinisi di `data.js`**, dan dokumentasikan alasannya. Ini adalah pengecualian yang disengaja terhadap aturan "hindari global" karena hanya satu nama global dipakai.

### 15.5 Pembagian tanggung jawab kode (prinsip)

- Pisahkan: **data** (`data.js`), **render** (fungsi pembuat markup), **state/logika** (filter/search), **event** (listener).
- Event listener dipasang dengan `addEventListener`, bukan atribut inline.
- Pembuatan markup dinamis mengutamakan `createElement`/`textContent` atau template string yang aman; data bersumber dari file lokal sehingga risiko XSS rendah, tetapi tetap hindari `innerHTML` untuk teks yang bukan dari dataset.
- Satu fungsi satu tujuan; tidak ada utilitas atau abstraksi tanpa kebutuhan nyata.

---

## 16. Data Model and Destination Schema

### 16.1 Skema destinasi

| Field | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `id` | string | Ya | Unik, huruf kecil, tanda hubung. Dipakai di URL |
| `name` | string | Ya | Nama destinasi |
| `location` | string | Ya | Provinsi/lokasi |
| `category` | string | Ya | Salah satu dari daftar kategori (bagian 16.3) |
| `shortDescription` | string | Ya | 1–2 kalimat, untuk kartu dan hero |
| `fullDescription` | string / array string | Ya | Deskripsi lengkap, boleh beberapa paragraf |
| `heroImage` | objek `{src, alt}` | Ya | Gambar hero |
| `galleryImages` | array objek `{src, alt, caption?}` | Ya | Minimal 3 gambar per destinasi (ASUMSI) |
| `highlights` | array string | Ya | Daya tarik utama (3–5 butir) |
| `activities` | array string | Ya | Rekomendasi aktivitas (3–5 butir) |
| `visitTips` | array string | Ya | Tips berkunjung bersifat umum dan aman |
| `relatedIds` | array string | Ya | 2–3 ID destinasi lain yang valid |
| `verifiedInfoNote` | string | Opsional | Catatan standar bahwa harga tiket/jam buka/aturan perlu diperiksa ke sumber resmi |

**Aturan data:**
- Tidak boleh mencantumkan harga tiket, jam operasional, aturan kunjungan, kuota, atau angka spesifik lain yang belum diverifikasi dari sumber resmi. Jika ingin dimasukkan, wajib dicatat sumber dan tanggal verifikasi, dan memerlukan persetujuan.
- Fakta yang dimasukkan (misal ketinggian, sejarah) hanya boleh yang dapat diverifikasi; jika ragu, gunakan deskripsi umum.
- Tidak ada destinasi ketujuh.

### 16.2 Enam destinasi versi 1.0

| ID | Nama | Lokasi | Kategori (ASUMSI) | `relatedIds` (ASUMSI) |
|---|---|---|---|---|
| `bromo` | Gunung Bromo | Jawa Timur | Gunung | `kawah-ijen`, `borobudur` |
| `nusa-penida` | Nusa Penida | Bali | Pantai & Laut | `pulau-padar`, `raja-ampat` |
| `raja-ampat` | Raja Ampat | Papua Barat Daya | Pantai & Laut | `nusa-penida`, `pulau-padar` |
| `borobudur` | Candi Borobudur | Jawa Tengah | Budaya & Sejarah | `bromo`, `kawah-ijen` |
| `pulau-padar` | Pulau Padar | Nusa Tenggara Timur | Pantai & Laut | `nusa-penida`, `raja-ampat` |
| `kawah-ijen` | Kawah Ijen | Jawa Timur | Gunung | `bromo`, `borobudur` |

### 16.3 Kategori

`Gunung`, `Pantai & Laut`, `Budaya & Sejarah`. Setiap destinasi memiliki tepat satu kategori (ASUMSI A-03). Kategori disimpan sebagai daftar tunggal di `data.js`.

### 16.4 Aturan integritas data

- ID unik dan stabil (tidak berubah setelah dipakai).
- Semua `relatedIds` merujuk ke ID yang ada dan bukan ID destinasi itu sendiri.
- Semua path gambar valid dan semua gambar punya alt text.
- Ejaan nama, lokasi, dan kategori konsisten karena dipakai untuk filter dan pencarian.

---

## 17. Error States and Edge Cases

| ID | Kondisi | Perilaku yang diharapkan |
|---|---|---|
| ERR-01 | `destination.html` tanpa parameter `id` | Tampil pesan "Destinasi tidak ditemukan" + tautan ke `index.html#destinasi` |
| ERR-02 | `id` tidak ada di dataset | Sama seperti ERR-01 |
| ERR-03 | `id` dengan huruf besar/kecil berbeda (mis. `BROMO`) | ASUMSI: dinormalisasi ke huruf kecil lalu dicocokkan; jika tidak cocok, ERR-02 |
| ERR-04 | Search tanpa hasil | Empty state + tombol reset |
| ERR-05 | Filter kategori + search tanpa hasil | Empty state yang sama |
| ERR-06 | Kolom search hanya berisi spasi | Diperlakukan sebagai kosong (menampilkan semua sesuai filter) |
| ERR-07 | Karakter khusus pada search | Dicocokkan sebagai teks biasa; tidak menimbulkan error |
| ERR-08 | `relatedIds` berisi ID tidak valid | ID dilewati; section related tetap tampil jika masih ada minimal satu valid, jika tidak ada maka section disembunyikan |
| ERR-09 | Gambar gagal dimuat | Alt text tetap terlihat; layout tidak rusak (ukuran container tetap) |
| ERR-10 | JavaScript dinonaktifkan | Konten statis (hero, tips, CTA, footer) tetap tampil; area dinamis menampilkan pesan `<noscript>` singkat bahwa JavaScript dibutuhkan |
| ERR-11 | Layar 320px | Tidak ada overflow horizontal, teks tetap terbaca |
| ERR-12 | Menu mobile terbuka lalu layar diperbesar ke desktop | Tampilan desktop normal; tidak ada state menu yang tertinggal |
| ERR-13 | Kembali dengan tombol back browser | Halaman beranda tetap berfungsi tanpa error |
| ERR-14 | Judul/nama panjang | Teks membungkus tanpa merusak layout |

---

## 18. Acceptance Criteria

Format: Given/When/Then atau checklist yang dapat diverifikasi.

**Navigation**
- **AC-001** (FR-002, FR-003): *Given* layar lebar 375px, *when* pengguna menekan tombol menu, *then* menu tampil dan `aria-expanded="true"`; *when* menekan tautan di menu atau tombol Escape, *then* menu tertutup dan `aria-expanded="false"`.
- **AC-002** (FR-004): *Given* keyboard saja, *when* pengguna menekan Tab, *then* fokus bergerak berurutan melalui logo, menu, dan kontrol lain dengan indikator fokus terlihat.
- **AC-003** (FR-001): *Given* layar ≥1024px, *when* halaman dimuat, *then* menu desktop tampil dan tombol menu mobile tidak tampil.

**Home & cards**
- **AC-004** (FR-005): Hero berisi tepat satu `h1`, satu CTA yang menuju `#destinasi`.
- **AC-005** (FR-006): Featured menampilkan 3 kartu yang namanya sesuai dataset.
- **AC-006** (FR-009, FR-010): Setiap kartu memiliki gambar ber-alt, nama, lokasi, kategori, deskripsi singkat, dan tautan valid ke `destination.html?id=<id>`.
- **AC-007** (FR-011): Mengubah teks nama destinasi di `data.js` tercermin pada kartu beranda dan related destinations tanpa mengubah HTML.

**Filter & search**
- **AC-008** (FR-012): *Given* 6 destinasi tampil, *when* pengguna memilih "Gunung", *then* hanya Bromo dan Kawah Ijen tampil tanpa reload.
- **AC-009** (FR-013): *When* pengguna memilih "Semua", *then* keenam destinasi tampil.
- **AC-010** (FR-016, FR-017): *When* pengguna mengetik "BALI" atau "bali", *then* hasil sama dan menampilkan Nusa Penida.
- **AC-011** (FR-018): *Given* filter "Pantai & Laut", *when* pengguna mengetik "bali", *then* hanya Nusa Penida tampil.
- **AC-012** (FR-015, FR-021): *When* pengguna mengetik kata yang tidak cocok, *then* empty state tampil dan tombol reset mengembalikan semua destinasi serta mengosongkan input.
- **AC-013** (FR-019, FR-020): Input pencarian memiliki label; jumlah hasil diperbarui dan berada di region `aria-live`.
- **AC-014** (FR-007): *When* pengguna memilih kategori di section "Explore by category", *then* filter diterapkan pada daftar dan pengguna berpindah ke section daftar.

**Detail**
- **AC-015** (FR-022, FR-023): *When* membuka `destination.html?id=bromo`, *then* nama, lokasi, kategori, overview, galeri, informasi berkunjung, dan related tampil sesuai data Bromo, dan `<title>` memuat nama Bromo.
- **AC-016** (FR-024): *When* membuka `destination.html?id=xyz` atau tanpa `id`, *then* pesan tidak ditemukan tampil dengan tautan kembali, dan tidak ada error di console.
- **AC-017** (FR-025): Tiap kartu related menuju `destination.html?id=<id>` yang valid, dan tidak berisi destinasi itu sendiri.
- **AC-018** (FR-026): Tautan kembali menuju `index.html#destinasi`.
- **AC-019** (FR-028): Halaman detail tidak menampilkan angka harga tiket atau jam operasional; hanya catatan "perlu diperiksa ke sumber resmi".
- **AC-020** (FR-027): Galeri menampilkan semua gambar tanpa autoplay.

**Responsive**
- **AC-021** (FR-029–FR-031): Pada lebar 360px, 768px, dan 1280px grid masing-masing 1, 2, dan 3 kolom; `document.documentElement.scrollWidth` tidak melebihi lebar viewport.

**Semantik & aksesibilitas**
- **AC-022** (NFR-001, NFR-002): Validator HTML tidak melaporkan error; outline heading berurutan dengan satu `h1`.
- **AC-023** (NFR-005): Seluruh `<img>` memiliki atribut `alt`.
- **AC-024** (NFR-009): Pasangan warna teks/latar utama diperiksa dengan alat kontras dan memenuhi ambang pada NFR-009 (hasil dicatat).
- **AC-025** (NFR-011, NFR-014): Semua alur utama berjalan tanpa error console; website berjalan sebagai file statis.
- **AC-026** (NFR-013): Tidak ada `<script>` atau `<link>` eksternal kecuali font yang ditetapkan.

---

## 19. Testing Checklist

Semua pengujian bersifat **manual** kecuali disebutkan. Hasil dicatat di README (tanggal, browser, hasil). Fitur tidak boleh ditandai selesai sebelum diuji.

**Navigasi & keyboard**
- [ ] TC-01 Menu desktop: semua tautan menuju tujuan benar.
- [ ] TC-02 Menu mobile: buka, tutup, tutup setelah pilih tautan, Escape.
- [ ] TC-03 Tab melalui seluruh halaman: urutan logis, fokus terlihat.
- [ ] TC-04 Enter/Space mengaktifkan tombol filter dan tombol menu.

**Beranda**
- [ ] TC-05 Urutan section sesuai bagian 10.1.
- [ ] TC-06 Featured menampilkan 3 kartu; klik membuka detail benar.
- [ ] TC-07 Filter setiap kategori + "Semua".
- [ ] TC-08 Search: huruf besar/kecil, spasi, nama, lokasi.
- [ ] TC-09 Search + filter bersamaan.
- [ ] TC-10 Empty state dan tombol reset.

**Detail**
- [ ] TC-11 Buka detail ke-6 destinasi lewat URL langsung: semua field tampil.
- [ ] TC-12 ID tidak valid dan tanpa ID.
- [ ] TC-13 Related destinations: setiap tautan valid.
- [ ] TC-14 Tautan kembali ke daftar destinasi.
- [ ] TC-15 Galeri: semua gambar tampil, alt ada.

**Responsif**
- [ ] TC-16 Lebar 320, 360, 768, 1024, 1280, 1440px: tidak ada overflow, teks terbaca.
- [ ] TC-17 Orientasi landscape ponsel.
- [ ] TC-18 Zoom browser 200%: konten tetap dapat digunakan.

**Kualitas**
- [ ] TC-19 Validator HTML (W3C) untuk kedua halaman.
- [ ] TC-20 Cek kontras warna dengan alat kontras.
- [ ] TC-21 Cek console: tidak ada error pada semua alur.
- [ ] TC-22 Cek broken link dan path gambar.
- [ ] TC-23 Cek ukuran gambar sesuai NFR-010.
- [ ] TC-24 Uji di Chrome, Firefox, dan Edge/Safari.
- [ ] TC-25 (OPSIONAL) Jalankan Lighthouse; catat skor apa adanya, tanpa klaim sebelum hasil ada.
- [ ] TC-26 Uji dengan JavaScript dinonaktifkan (ERR-10).
- [ ] TC-27 Uji deploy: URL publik berfungsi, tautan antar-halaman dan path asset benar (huruf besar/kecil nama file).

---

## 20. Deployment Requirements

| ID | Requirement |
|---|---|
| DEP-01 | Website di-deploy sebagai situs statis (GitHub Pages, Netlify, atau Vercel static; ASUMSI: GitHub Pages) |
| DEP-02 | Tidak memerlukan build command; folder root berisi `index.html` |
| DEP-03 | Semua path memakai path relatif agar bekerja di subpath (mis. `username.github.io/jelajahnusa/`) |
| DEP-04 | Nama file dan folder huruf kecil, konsisten dengan path di kode (server Linux membedakan huruf besar/kecil) |
| DEP-05 | Repository berisi `README.md` dengan: deskripsi, screenshot, fitur, tech stack, cara menjalankan lokal, struktur folder, kredit gambar dan lisensi, ringkasan hasil pengujian, hal yang dipelajari, tautan demo |
| DEP-06 | Setelah deploy, jalankan ulang TC-27 pada URL publik |

---

## 21. Scope Boundaries and Change Control

### 21.1 IN SCOPE
- Dua halaman HTML: `index.html` dan `destination.html`.
- Enam destinasi yang ditentukan.
- Data JavaScript statis (`data.js`).
- Search dan category filtering.
- Dynamic destination detail dan related destinations.
- Responsive navigation dan responsive styling.
- Semantic HTML dan accessibility dasar.
- Dokumentasi (README) dan deployment website statis.

### 21.2 OUT OF SCOPE
Login dan register; user accounts; backend API; database; CMS/admin dashboard; booking/reservation; payment gateway; shopping cart; Google Maps API atau peta interaktif; AI chatbot; AI itinerary generator; weather API; external travel API; ulasan pengguna yang tersimpan; favorit yang tersimpan; authentication; React, Next.js, Vue, atau framework lain; Tailwind atau CSS framework lain; TypeScript; build system dan dependency tambahan; halaman tambahan di luar dua halaman; fitur lain yang tidak tercantum eksplisit di PRD.

### 21.3 Change control

Perubahan yang memerlukan **persetujuan eksplisit pemilik produk** sebelum dikerjakan:
1. Menambah/mengurangi halaman, section, atau urutan section.
2. Menambah destinasi atau memperluas dataset.
3. Menambah fitur di luar bagian 11.
4. Menambah dependency, library, ikon, animasi, atau font alternatif.
5. Mengubah struktur folder/file atau kontrak antar-file.
6. Mengubah palet warna, tipografi, atau arah visual.
7. Menambahkan data faktual spesifik (harga, jam, aturan).

**Alur permintaan perubahan:** (1) jelaskan kebutuhan dan alasan, (2) jelaskan dampak (file, scope, risiko), (3) usulkan alternatif minimal, (4) tunggu persetujuan, (5) catat di riwayat revisi PRD.

---

## 22. Risks and Assumptions

### 22.1 Asumsi

| ID | Asumsi |
|---|---|
| A-01 | Tiga destinasi featured di beranda: Bromo, Raja Ampat, Borobudur |
| A-02 | Menu: Beranda, Destinasi, Kategori, Tips |
| A-03 | Tiga kategori dengan satu kategori per destinasi (bagian 16.3) |
| A-04 | Galeri minimal 3 gambar per destinasi; ukuran gambar sesuai NFR-010 |
| A-05 | Font Plus Jakarta Sans dan Inter dimuat lewat tautan Google Fonts dengan fallback `system-ui`; jika ingin self-host, perlu folder font baru dan persetujuan |
| A-06 | `data.js` memakai script biasa dengan satu global agar dapat dibuka lewat `file://` |
| A-07 | Logika toggle menu boleh ditulis di dua file JS untuk menghindari file tambahan |
| A-08 | Nilai breakpoint: 600px dan 1024px |
| A-09 | Browser target: versi terbaru Chrome, Firefox, Edge/Safari |
| A-10 | Konten teks (deskripsi, tips) ditulis sendiri oleh pemilik/AI dengan informasi umum yang dapat diverifikasi |
| A-11 | Nilai kontras diverifikasi saat implementasi; pasangan warna di bagian 13.1 belum diklaim lolos |

### 22.2 Risiko

| ID | Risiko | Dampak | Mitigasi |
|---|---|---|---|
| R-01 | Lisensi gambar tidak jelas | Pelanggaran hak cipta pada portfolio | Pakai foto sendiri atau sumber berlisensi bebas; catat sumber di README |
| R-02 | Informasi destinasi keliru | Pengguna dirugikan, portfolio kurang kredibel | Hanya data umum yang dapat diverifikasi; catatan "periksa sumber resmi" |
| R-03 | Kontras warna accent rendah | Teks sulit dibaca | Accent tidak dipakai sebagai teks kecil; uji dengan alat kontras |
| R-04 | AI coding assistant memperluas scope | Proyek melenceng, kode rumit | Bagian 21 dan 25 wajib dibaca; laporan per task |
| R-05 | Gambar terlalu besar | Halaman lambat | NFR-010, kompresi, lazy loading |
| R-06 | Path asset salah saat deploy di subpath | Gambar/CSS rusak | DEP-03, DEP-04, TC-27 |
| R-07 | Duplikasi markup kartu antar-halaman | Sulit dirawat | Satu fungsi render kartu dengan penggunaan konsisten per file |
| R-08 | Font eksternal gagal dimuat | Tampilan berubah | Fallback `system-ui` dan layout tahan terhadap perbedaan font |
| R-09 | Menu mobile bermasalah pada keyboard | Aksesibilitas buruk | TC-02, TC-03 |

---

## 23. Future Enhancements (OUT OF SCOPE)

> **Semua butir di bawah ini TIDAK boleh diimplementasikan pada versi 1.0.** Hanya dicatat sebagai ide.

- Tambahan destinasi dan kategori baru.
- Halaman daftar destinasi terpisah dan halaman tentang.
- Favorit destinasi tersimpan (localStorage).
- Mode gelap.
- Dukungan multi-bahasa (ID/EN).
- Peta lokasi interaktif.
- Lightbox galeri.
- Informasi harga tiket dan jam operasional yang terverifikasi dengan sumber dan tanggal.
- Pengurutan (sort) dan pagination daftar.
- Penyimpanan hasil filter di URL.
- Pengujian otomatis dan CI.
- Optimasi SEO lanjutan (Open Graph, sitemap).
- Self-host font.

---

## 24. Definition of Done

Versi 1.0 dinyatakan selesai jika **seluruh** butir berikut terpenuhi:

- [ ] Dua halaman ada dan urutan section sesuai bagian 10.
- [ ] Enam destinasi ada di `data.js` dengan semua field wajib dan tanpa data karangan.
- [ ] Semua FR-001 sampai FR-031 diimplementasikan dan acceptance criteria AC-001 sampai AC-026 lolos.
- [ ] Semua NFR terpenuhi atau pengecualian dicatat dan disetujui.
- [ ] Testing checklist (bagian 19) dijalankan dan hasilnya tercatat di README.
- [ ] Validasi HTML tanpa error.
- [ ] Tidak ada error console dan tidak ada broken link pada alur utama.
- [ ] Tidak ada fitur, file, atau dependency di luar scope.
- [ ] Semua gambar memiliki alt, sumber, dan lisensi tercatat.
- [ ] README lengkap (DEP-05).
- [ ] Website ter-deploy dan TC-27 lolos pada URL publik.
- [ ] Laporan akhir development menyatakan secara jujur apa yang sudah dan belum diuji.

---

## 25. Reusable AI Coding Instructions

> Salin blok ini ke awal setiap sesi dengan AI coding assistant.

**Konteks:** Kamu mengerjakan JelajahNusa, website inspirasi wisata Indonesia dengan HTML5, CSS3, dan Vanilla JavaScript ES6+ (tanpa framework, tanpa backend). `PRD.md` adalah sumber kebenaran utama. Baca bagian yang relevan sebelum bekerja.

**Aturan wajib:**
1. PRD adalah sumber kebenaran utama project.
2. Jangan menambah fitur, halaman, dependency, atau teknologi di luar scope.
3. Jangan mengubah tujuan produk, target pengguna, struktur halaman, atau arah visual tanpa persetujuan.
4. Jangan menulis ulang seluruh file jika perubahan lokal sudah cukup.
5. Jangan menghapus fitur yang sudah berfungsi untuk menyederhanakan implementasi.
6. Jangan mengubah file yang tidak berkaitan dengan task.
7. Pertahankan nama file, ID elemen, class, data structure, dan kontrak antar-file kecuali perubahan memang diperlukan dan disetujui.
8. Jangan menambahkan data atau informasi destinasi yang tidak memiliki dasar yang jelas.
9. Jangan mengklaim fitur selesai sebelum implementasi dan pengujiannya dilakukan.
10. Jika requirement ambigu, jelaskan ambiguitas dan ajukan pertanyaan sebelum membuat asumsi yang memengaruhi arsitektur atau scope.
11. Jika menemukan kebutuhan di luar scope, jelaskan alasan, dampak, dan alternatif minimal; jangan langsung mengimplementasikannya.
12. Gunakan solusi paling sederhana yang memenuhi acceptance criteria.
13. Jangan melakukan refactor besar untuk task kecil.
14. Jangan mengubah desain yang sudah disetujui tanpa alasan yang jelas.
15. Setelah setiap task coding, laporkan:
    - File yang dibuat.
    - File yang diubah.
    - Perubahan pada setiap file.
    - Fitur yang selesai.
    - Pengujian yang dilakukan beserta hasilnya.
    - Hal yang belum selesai.
    - Risiko atau masalah yang ditemukan.
    - Konfirmasi apakah ada perubahan di luar scope.

**Aturan teknis tambahan:**
- Tanpa inline event handler; pakai `addEventListener`.
- Tanpa duplikasi dataset; semua data destinasi hanya di `data.js`.
- Tanpa satu file JavaScript besar; patuhi pembagian `data.js`, `main.js`, `destination.js`.
- Navigasi memakai `<a>`, aksi memakai `<button>`.
- Jangan mengarang harga tiket, jam operasional, atau aturan kunjungan.
- Jangan mengklaim aksesibilitas atau performa sebelum diuji.
- Hindari elemen dekoratif yang tidak berfungsi (lihat bagian 13.6).

**Template prompt per task (contoh):**

```
Baca PRD.md bagian [nomor bagian relevan].
Task: [deskripsi singkat satu fitur]
Requirement terkait: [FR-xxx, AC-xxx]
File yang boleh diubah: [daftar]
Jangan ubah: file lain, struktur data, ID/class yang ada.
Setelah selesai, laporkan sesuai aturan nomor 15.
```

**Urutan pengerjaan yang disarankan (rekomendasi, bukan tambahan scope):**
1. `data.js` (6 destinasi, tanpa data karangan) dan siapkan gambar bersumber jelas.
2. Kerangka HTML semantik `index.html` dan `destination.html`.
3. `style.css`: token, layout, komponen, responsif.
4. `main.js`: menu, render kartu, filter, search.
5. `destination.js`: render detail, fallback, related.
6. Pengujian (bagian 19), perbaikan, README, deploy.

— *Akhir dokumen* —