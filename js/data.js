// JelajahNusa — js/data.js
// Satu-satunya sumber data destinasi (PRD bagian 15–16).
// File ini TIDAK memanipulasi DOM.
//
// Sesuai ASUMSI A-06: script biasa (non-module) dengan satu nama global
// (`destinations` dan `categories`) agar halaman bisa dibuka lewat file://.
// Skema data mengikuti PRD bagian 16.1; kategori mengikuti PRD 16.3.
//
// Aturan data (PRD 16.1): TIDAK ada harga tiket, jam operasional, kuota,
// atau aturan kunjungan yang belum terverifikasi. Hal-hal praktis ditangani
// lewat `verifiedInfoNote` yang meminta pengguna memeriksa sumber resmi.

const categories = [
  "Gunung",
  "Pantai & Laut",
  "Budaya & Sejarah",
];

const destinations = [
  {
    id: "bromo",
    name: "Gunung Bromo",
    location: "Jawa Timur",
    category: "Gunung",
    shortDescription:
      "Gunung berapi ikonik Jawa Timur di dalam kaldera Tengger, terkenal dengan kawahnya yang mengepulkan asap dan matahari terbit di atas lautan pasir.",
    fullDescription: [
      "Gunung Bromo adalah gunung berapi yang berada di wilayah Taman Nasional Bromo Tengger Semeru, Jawa Timur. Gunung ini dikelilingi kaldera Tengger yang luas dengan lautan pasir di tengahnya, sehingga pemandangannya berbeda dari gunung berapi lain di Indonesia.",
      "Perjalanan ke Bromo umumnya dimulai pada malam atau dini hari untuk menyambut matahari terbit dari titik pandang di tepi kaldera. Setelah itu, pengunjung melintasi lautan pasir menuju kaki gunung dan menaiki tangga panjang untuk menyaksikan kawah dari bibirnya. Di sekitar kaldera juga tinggal masyarakat suku Tengger yang memelihara tradisi dan budaya setempat.",
    ],
    heroImage: {
      src: "assets/images/bromo-hero.jpg",
      alt: "Kawah Gunung Bromo yang mengepulkan asap di tengah lautan pasir kaldera Tengger",
    },
    galleryImages: [
      {
        src: "assets/images/bromo-galeri-1.jpg",
        alt: "Matahari terbit di atas kaldera Tengger dengan siluet Gunung Bromo",
        caption: "Matahari terbit dilihat dari titik pandang kaldera",
      },
      {
        src: "assets/images/bromo-galeri-2.jpg",
        alt: "Bibir kawah Gunung Bromo dengan asap vulkanik yang naik ke atas",
        caption: "Bibir kawah Bromo",
      },
      {
        src: "assets/images/bromo-galeri-3.jpg",
        alt: "Kendaraan melintasi lautan pasir di kaki Gunung Bromo",
        caption: "Lautan pasir dan kendaraan wisatawan",
      },
    ],
    highlights: [
      "Matahari terbit di atas kaldera Tengger",
      "Lautan pasir yang luas di sekeliling kawah",
      "Kawah aktif yang mengepulkan asap vulkanik",
      "Perbukitan savana di lingkar dalam kaldera",
      "Budaya dan tradisi masyarakat suku Tengger",
    ],
    activities: [
      "Mendaki ringan menuju titik pandang untuk melihat matahari terbit",
      "Melintasi lautan pasir menuju kaki Gunung Bromo",
      "Menaiki tangga menuju bibir kawah untuk melihat kawah secara langsung",
      "Mengunjungi permukiman masyarakat suku Tengger di sekitar kaldera",
    ],
    visitTips: [
      "Bawa jaket berlapis karena suhu pagi hari di sekitar kaldera umumnya sangat dingin.",
      "Gunakan masker atau penutup hidung saat berkabut atau berdebu di area lautan pasir.",
      "Periksa prakiraan cuaca sebelum berangkat karena pemandangan bisa tertutup kabut tebal.",
      "Patuhi jalur dan petunjuk pengelola taman nasional demi keamanan bersama.",
    ],
    relatedIds: ["kawah-ijen", "borobudur"],
    verifiedInfoNote:
      "Harga tiket, jam operasional, dan aturan kunjungan tidak dicantumkan di halaman ini karena dapat berubah. Silakan periksa informasi terkini dari sumber resmi, misalnya pengelola taman nasional atau dinas pariwisata setempat, sebelum berkunjung.",
  },

  {
    id: "nusa-penida",
    name: "Nusa Penida",
    location: "Bali",
    category: "Pantai & Laut",
    shortDescription:
      "Pulau di lepas pantai Bali dengan tebing karang menjulang, teluk berair biru jernih, dan titik selam yang terkenal.",
    fullDescription: [
      "Nusa Penida adalah pulau yang berada di lepas pantai tenggara pulau Bali dan termasuk wilayah Kabupaten Klungkung. Pulau ini populer karena perbukitan karang yang curam menjulang di tepi laut serta teluk-teluk berpasir yang dihamparkan di sekitar sisi tebing.",
      "Perjalanan di Nusa Penida biasanya dilakukan dengan menyewa kendaraan karena jarak antar-tempat cukup jauh dan jalan bervariasi menanjak-menurun. Sebagian titik tepian terkenal dapat dinikmati langsung dari atas, sementara beberapa pantai memerlukan turunan tangga yang cukup panjang. Perairan sekitar pulau juga menjadi salah satu titik penyelaman favorit untuk bertemu ikan pari.",
    ],
    heroImage: {
      src: "assets/images/nusa-penida-hero.jpg",
      alt: "Tebing karang Pantai Kelingking di Nusa Penida yang menjulang di tepi laut biru",
    },
    galleryImages: [
      {
        src: "assets/images/nusa-penida-galeri-1.jpg",
        alt: "Bukit karang Pantai Kelingking dilihat dari titik pandang di atasnya",
        caption: "Panorama Pantai Kelingking",
      },
      {
        src: "assets/images/nusa-penida-galeri-2.jpg",
        alt: "Cekungan laut di Broken Beach yang dikelilingi tebing karang",
        caption: "Broken Beach",
      },
      {
        src: "assets/images/nusa-penida-galeri-3.jpg",
        alt: "Air laut yang jernih di kolam batu natural Angel's Billabong",
        caption: "Angel's Billabong",
      },
    ],
    highlights: [
      "Tebing karang Kelingking dengan panorama lepas laut yang ikonik",
      "Broken Beach, cekungan laut yang dikelilingi tebing karang",
      "Angel's Billabong, kolam batu alami di tepi laut",
      "Perairan yang jernih dan menjadi habitat ikan pari",
      "Pantai-pantai pasir putih di sisi pulau",
    ],
    activities: [
      "Penjelajahan dengan kendaraan sewa ke titik-titik tepian populer",
      "Fotografi lanskap tebing dan laut dari titik pandang",
      "Snorkeling dan menyelam di perairan sekitar pulau",
      "Menuruni tangga ke pantai-pantai di kaki tebing",
    ],
    visitTips: [
      "Sewa kendaraan dengan pengemudi lokal agar perjalanan antar-tempat yang jauh jadi lebih nyaman.",
      "Periksa kondisi laut sebelum berangkat karena perjalanan kapal antar-pulau bisa dipengaruhi gelombang.",
      "Tetap berada di area yang aman saat menikmati pemandangan di tepian tebing.",
      "Ikuti arahan pemandu atau penyelam saat beraktivitas di air.",
    ],
    relatedIds: ["pulau-padar", "raja-ampat"],
    verifiedInfoNote:
      "Harga tiket, jam operasional, dan aturan kunjungan tidak dicantumkan di halaman ini karena dapat berubah. Silakan periksa informasi terkini dari sumber resmi, misalnya pemerintah daerah atau operator wisata setempat, sebelum berkunjung.",
  },

  {
    id: "raja-ampat",
    name: "Raja Ampat",
    location: "Papua Barat Daya",
    category: "Pantai & Laut",
    shortDescription:
      "Kepulauan karst di Papua Barat Daya dengan lanskap gugusan pulau yang ikonik dan laut yang kaya keanekaragaman hayati.",
    fullDescription: [
      "Raja Ampat adalah wilayah kepulauan di provinsi Papua Barat Daya yang terdiri dari banyak pulau karst, pulau kecil, dan laguna. Kepulauan ini dikenal luas sebagai salah satu pusat keanekaragaman hayati laut tropis dunia, sehingga menjadi tujuan populer bagi para penyelam.",
      "Pemandangan khas Raja Ampat adalah gugusan pulau kapur yang menjulang dari laut, yang dapat dilihat antara lain dari titik pandang di Wayag dan Pianemo. Wisata di sini umumnya dilakukan dengan menyewa kapal antar-pulau, dan sejumlah kampung menyediakan penginapan serta layanan wisata yang dikelola bersama masyarakat lokal.",
    ],
    heroImage: {
      src: "assets/images/raja-ampat-hero.jpg",
      alt: "Gugusan pulau karst Raja Ampat yang berdiri di tengah laut biru",
    },
    galleryImages: [
      {
        src: "assets/images/raja-ampat-galeri-1.jpg",
        alt: "Titik pandang gugusan pulau karst Wayag di Raja Ampat",
        caption: "Lanskap Wayag",
      },
      {
        src: "assets/images/raja-ampat-galeri-2.jpg",
        alt: "Titik pandang Pianemo dengan gugusan pulau kapur di tengah laguna",
        caption: "Pianemo",
      },
      {
        src: "assets/images/raja-ampat-galeri-3.jpg",
        alt: "Ikan dan karang di perairan Raja Ampat yang jernih",
        caption: "Kehidupan bawah laut Raja Ampat",
      },
    ],
    highlights: [
      "Panorama gugusan pulau karst dari Wayag dan Pianemo",
      "Perairan jernih dengan keanekaragaman hayati laut yang tinggi",
      "Pantai pasir putih dan laguna yang tenang",
      "Kampung wisata yang dikelola masyarakat lokal",
    ],
    activities: [
      "Menjelajah antar-pulau dengan menyewa kapal",
      "Menyelam di titik-titik selam yang terkenal",
      "Berjalan naik ke titik pandang untuk melihat gugusan pulau karst",
      "Menginap dan berinteraksi di kampung wisata masyarakat lokal",
    ],
    visitTips: [
      "Rencanakan transportasi laut dengan baik karena perjalanan antar-pulau membutuhkan waktu yang cukup lama.",
      "Bawa kebutuhan dasar seperti air minum, camilan, dan obat pribadi karena fasilitas antar-pulau terbatas.",
      "Patuhi aturan konservasi: jangan menyentuh karang dan jangan buang sampah ke laut.",
      "Dukung penginapan dan jasa wisata kelolaan kampung lokal agar manfaatnya kembali kepada masyarakat sekitar.",
    ],
    relatedIds: ["nusa-penida", "pulau-padar"],
    verifiedInfoNote:
      "Harga tiket, jam operasional, dan aturan kunjungan tidak dicantumkan di halaman ini karena dapat berubah. Silakan periksa informasi terkini dari sumber resmi, misalnya pengelola kawasan konservasi atau dinas pariwisata setempat, sebelum berkunjung.",
  },

  {
    id: "borobudur",
    name: "Candi Borobudur",
    location: "Jawa Tengah",
    category: "Budaya & Sejarah",
    shortDescription:
      "Kompleks candi Buddha bertingkat di Jawa Tengah dengan relief dinding yang panjang, stupa di puncaknya, dan berstatus Situs Warisan Dunia UNESCO.",
    fullDescription: [
      "Candi Borobudur adalah kompleks candi Buddha yang berada di Kabupaten Magelang, Jawa Tengah. Candi ini dibangun bertingkat-tingkat mengelilingi bukit, dengan lorong bertingkat yang dipenuhi relief dan stupa di bagian puncaknya, serta berstatus Situs Warisan Dunia UNESCO.",
      "Berjalan menyusuri teras Candi Borobudur memberi pengalaman wisata yang memiliki sisi edukasi: dinding candi dipenuhi relief yang mengisahkan ajaran Buddha, sementara permukaan atas membuka pandangan ke perbukitan pegunungan di sekitarnya. Kawasan sekitarnya juga menyajikan suasana pedesaan dan budaya Jawa yang khas.",
    ],
    heroImage: {
      src: "assets/images/borobudur-hero.jpg",
      alt: "Candi Borobudur bertingkat dengan stupa-stupa dan latar perbukitan",
    },
    galleryImages: [
      {
        src: "assets/images/borobudur-galeri-1.jpg",
        alt: "Stupa bertingkat di bagian atas Candi Borobudur",
        caption: "Stupa di bagian puncak candi",
      },
      {
        src: "assets/images/borobudur-galeri-2.jpg",
        alt: "Relief pada dinding Candi Borobudur yang mengisahkan ajaran Buddha",
        caption: "Relief dinding candi",
      },
      {
        src: "assets/images/borobudur-galeri-3.jpg",
        alt: "Suasana kompleks Candi Borobudur di pagi hari",
        caption: "Kompleks candi di pagi hari",
      },
    ],
    highlights: [
      "Arsitektur bertingkat dengan stupa di bagian puncak",
      "Relief dinding yang mengisahkan ajaran Buddha",
      "Panorama perbukitan dan pegunungan di sekeliling kompleks",
      "Situs bersejarah dengan pengakuan UNESCO",
    ],
    activities: [
      "Menyusuri teras candi secara bertingkat hingga bagian puncak",
      "Mengamati relief dinding yang menggambarkan kisah-kisah Buddha",
      "Fotografi lanskap kompleks candi, terutama pada pagi hari",
      "Mengikuti layanan pemandu untuk memahami makna struktur dan relief",
    ],
    visitTips: [
      "Bawa botol air dan pelindung matahari karena siang hari di daerah ini bisa cukup terik.",
      "Gunakan pakaian yang sopan dan nyaman karena kompleks ini juga merupakan tempat yang dihormati umat beragama.",
      "Datang di pagi hari agar suasana lebih tenang dan udara masih sejuk.",
      "Periksa informasi terbaru dari pengelola resmi sebelum berkunjung.",
    ],
    relatedIds: ["bromo", "kawah-ijen"],
    verifiedInfoNote:
      "Harga tiket, jam operasional, dan aturan kunjungan tidak dicantumkan di halaman ini karena dapat berubah. Silakan periksa informasi terkini dari sumber resmi, misalnya pengelola candi dan kawasan taman wisata, sebelum berkunjung.",
  },

  {
    id: "pulau-padar",
    name: "Pulau Padar",
    location: "Nusa Tenggara Timur",
    category: "Pantai & Laut",
    shortDescription:
      "Pulau berbukit savana di Taman Nasional Komodo, Nusa Tenggara Timur, terkenal dengan panorama teluk dari titik pandang di puncak bukit.",
    fullDescription: [
      "Pulau Padar adalah pulau berbukit savana yang termasuk dalam kawasan Taman Nasional Komodo di Nusa Tenggara Timur. Bentuk pulau yang panjang dan bergelombang membuat teluk-teluk di pesisirnya menghadap ke berbagai arah, sehingga panorama dari ketinggian menjadi favorit bagi para fotografer.",
      "Panorama dari titik pandang di puncak bukit menjadi daya tarik utama pulau ini, yang dicapai lewat tanjakan pendek dengan tangga batu. Di kaki pulau terdapat pantai-pantai berpasir dengan laut yang jernih. Wisata ke Padar umumnya dilewati menyusuri rangkaian wisata laut di kawasan Taman Nasional Komodo.",
    ],
    heroImage: {
      src: "assets/images/pulau-padar-hero.jpg",
      alt: "Panorama teluk-teluk Pulau Padar dilihat dari atas bukit savana",
    },
    galleryImages: [
      {
        src: "assets/images/pulau-padar-galeri-1.jpg",
        alt: "Teluk-teluk biru di sekitar Pulau Padar dilihat dari titik pandang bukit",
        caption: "Panorama dari puncak Pulau Padar",
      },
      {
        src: "assets/images/pulau-padar-galeri-2.jpg",
        alt: "Bukit savana kering yang menjadi lanskap khas Pulau Padar",
        caption: "Bukit savana",
      },
      {
        src: "assets/images/pulau-padar-galeri-3.jpg",
        alt: "Pantai berpasir di kaki Pulau Padar dengan air laut yang jernih",
        caption: "Pantai di kaki pulau",
      },
    ],
    highlights: [
      "Panorama beberapa teluk dari titik pandang di puncak bukit",
      "Lanskap bukit savana khas Nusa Tenggara",
      "Pantai berpasir dengan air laut yang jernih",
      "Pengalaman fotografi saat matahari terbit dan senja di atas bukit",
    ],
    activities: [
      "Trekking pendek menuju titik pandang di puncak bukit",
      "Fotografi lanskap panorama teluk dan savana",
      "Berkeliling di pantai-pantai di kaki pulau",
      "Menyusuri rangkaian wisata Taman Nasional Komodo bersama kapal wisata",
    ],
    visitTips: [
      "Jalan ke titik pandang berupa tanjakan terbuka, jadi bawa air minum dan pelindung matahari.",
      "Waktu pagi biasanya lebih nyaman untuk naik ke titik pandang sebelum udara terlalu panas.",
      "Fasilitas di pulau terbatas, jadi bawa kebutuhan sendiri dan bawa kembali sampah kamu.",
      "Ikuti ketentuan pengelola Taman Nasional Komodo saat berwisata di kawasan ini.",
    ],
    relatedIds: ["nusa-penida", "raja-ampat"],
    verifiedInfoNote:
      "Harga tiket, jam operasional, dan aturan kunjungan tidak dicantumkan di halaman ini karena dapat berubah. Silakan periksa informasi terkini dari sumber resmi, misalnya pengelola Taman Nasional Komodo, sebelum berkunjung.",
  },

  {
    id: "kawah-ijen",
    name: "Kawah Ijen",
    location: "Jawa Timur",
    category: "Gunung",
    shortDescription:
      "Gunung berapi di Jawa Timur dengan danau kawah berwarna turkis dan fenomena api biru yang kadang terlihat saat dini hari.",
    fullDescription: [
      "Kawah Ijen adalah kompleks gunung berapi di Jawa Timur yang memiliki danau kawah berwarna turkis. Danau ini bersifat sangat asam, dan fenomena khas di sini adalah nyala api biru (blue fire) yang terkadang terlihat di dinding kawah saat dini hari.",
      "Perjalanan ke Kawah Ijen umumnya dimulai dini hari: pengunjung menyusuri jalan setapak menuju bibir kawah untuk melihat danau kawah dan berharap sempat menyaksikan nyala api biru. Di sekitar kawah juga dapat ditemui pekerja penambang belerang yang bekerja secara tradisional, sehingga perjalanan ini menawarkan lanskap sekaligus kisah manusia di lingkungan yang keras.",
    ],
    heroImage: {
      src: "assets/images/kawah-ijen-hero.jpg",
      alt: "Pemandangan danau kawah Kawah Ijen yang berwarna turkis",
    },
    galleryImages: [
      {
        src: "assets/images/kawah-ijen-galeri-1.jpg",
        alt: "Danau kawah Kawah Ijen yang berwarna turkis dan berkabut asap",
        caption: "Danau kawah Ijen",
      },
      {
        src: "assets/images/kawah-ijen-galeri-2.jpg",
        alt: "Nyala api biru (blue fire) di dinding kawah Kawah Ijen",
        caption: "Api biru (blue fire)",
      },
      {
        src: "assets/images/kawah-ijen-galeri-3.jpg",
        alt: "Bongkahan belerang kuning hasil penambangan di dekat bibir Kawah Ijen",
        caption: "Belerang hasil penambangan",
      },
    ],
    highlights: [
      "Danau kawah berwarna turkis yang bersifat sangat asam",
      "Nyala api biru (blue fire) yang terlihat di dini hari",
      "Aktivitas penambang belerang yang bekerja secara tradisional",
      "Kaldera yang berkabut dan dingin saat dini pagi",
    ],
    activities: [
      "Pendakian dini hari menuju bibir kawah",
      "Menyaksikan fenomena api biru bersama pemandu dan perlengkapan yang memadai",
      "Melihat pemandangan danau kawah dari titik bibir kawah yang diperkenankan",
      "Fotografi lanskap kaldera",
    ],
    visitTips: [
      "Bawa penutup hidung atau masker karena gas belerang di sekitar kawah dapat mengganggu pernapasan.",
      "Gunakan jaket tebal karena udara dini hari di kawasan kawah sangat dingin.",
      "Periksa aturan pendakian dan jam buka dari sumber resmi karena waktu dan jalur kunjungan dapat dibatasi.",
      "Bagi yang punya riwayat asma atau masalah pernapasan, ada baiknya berhati-hati dan mengikuti anjuran petugas lokal.",
    ],
    relatedIds: ["bromo", "borobudur"],
    verifiedInfoNote:
      "Harga tiket, jam operasional, dan aturan pendakian tidak dicantumkan di halaman ini karena dapat berubah. Silakan periksa informasi terkini dari sumber resmi, misalnya pengelola kawasan atau dinas terkait setempat, sebelum berkunjung.",
  },
];
