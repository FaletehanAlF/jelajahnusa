// JelajahNusa — js/main.js
// Logika beranda (PRD 15.2):
// - toggle menu mobile dengan aria-expanded (FR-002, FR-003),
// - render 3 kartu featured ke #featured-grid (FR-006),
// - render tombol kategori ke #category-list (FR-007),
// - render tombol filter + "Semua" ke #filter-list (FR-012–FR-014),
// - pencarian nama/lokasi (FR-016–FR-019),
// - jumlah hasil & empty state (FR-015, FR-020, FR-021).
//
// Data dibaca dari global `destinations` dan `categories` di js/data.js.
// Markup dinamis dibuat dengan createElement/textContent, bukan innerHTML.

(function () {
  "use strict";

  if (typeof destinations === "undefined" || typeof categories === "undefined") {
    console.error("JelajahNusa: data.js belum dimuat atau global datanya tidak ditemukan.");
    return;
  }

  // Destinasi unggulan (PRD A-01: Bromo, Raja Ampat, Borobudur).
  const FEATURED_IDS = ["bromo", "raja-ampat", "borobudur"];

  // State pencarian dan filter; "Semua" artinya tanpa filter kategori.
  let selectedCategory = "Semua";
  let searchQuery = "";

  // ---------- Referensi elemen (kontrak ID dari index.html) ----------
  const menuToggle = document.getElementById("menu-toggle");
  const siteMenu = document.getElementById("site-menu");
  const featuredGrid = document.getElementById("featured-grid");
  const categoryList = document.getElementById("category-list");
  const filterList = document.getElementById("filter-list");
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const resultCount = document.getElementById("result-count");
  const destinationGrid = document.getElementById("destination-grid");
  const emptyState = document.getElementById("empty-state");
  const resetButton = document.getElementById("reset-filters");
  const destinationsSection = document.getElementById("destinasi");

  if (!destinationGrid || !filterList || !featuredGrid || !categoryList) {
    console.error("JelajahNusa: elemen wadah render tidak ditemukan di index.html.");
    return;
  }

  // ---------- Menu mobile (FR-002, FR-003) ----------
  function setMenuOpen(open) {
    if (!menuToggle || !siteMenu) return;
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    siteMenu.classList.toggle("site-menu--open", open);
  }

  function initMenuToggle() {
    if (!menuToggle || !siteMenu) return;

    menuToggle.addEventListener("click", function () {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      setMenuOpen(!isOpen);
    });

    // Tutup menu setelah memilih tautan di dalamnya.
    siteMenu.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setMenuOpen(false);
      }
    });

    // Tutup menu dengan tombol Escape, lalu kembalikan fokus ke tombol menu.
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
        menuToggle.focus();
      }
    });
  }

  // ---------- Pembuat kartu destinasi (FR-009, FR-010) ----------
  function buildDestinationCard(destination) {
    const card = document.createElement("article");
    card.className = "destination-card";

    const image = document.createElement("img");
    image.className = "card-image";
    image.src = destination.heroImage.src;
    image.alt = destination.heroImage.alt;
    // Ukuran placeholder; akan dikalibrasi ulang saat aset gambar final tersedia.
    image.width = 800;
    image.height = 600;
    image.loading = "lazy";

    const badge = document.createElement("p");
    badge.className = "badge";
    badge.textContent = destination.category;

    const name = document.createElement("h3");
    name.textContent = destination.name;

    const location = document.createElement("p");
    location.className = "card-location";
    location.textContent = destination.location;

    const description = document.createElement("p");
    description.className = "card-description";
    description.textContent = destination.shortDescription;

    const link = document.createElement("a");
    link.className = "card-link";
    // Accessible name memuat nama destinasi (FR-010).
    link.textContent = "Lihat detail " + destination.name;
    link.href = "destination.html?id=" + destination.id;

    card.appendChild(image);
    card.appendChild(badge);
    card.appendChild(name);
    card.appendChild(location);
    card.appendChild(description);
    card.appendChild(link);
    return card;
  }

  // ---------- Featured destinations (FR-006) ----------
  function renderFeatured() {
    featuredGrid.replaceChildren();
    FEATURED_IDS.forEach(function (id) {
      const destination = findDestinationById(id);
      if (destination) {
        featuredGrid.appendChild(buildDestinationCard(destination));
      }
    });
  }

  // ---------- Explore by category (FR-007) ----------
  function renderCategoryButtons() {
    categoryList.replaceChildren();
    categories.forEach(function (category) {
      const item = document.createElement("li");

      const button = document.createElement("button");
      button.type = "button";
      button.textContent = category;
      button.dataset.category = category;
      // Kategori aktif ditandai agar wajar bila dipilih dari section ini.
      button.setAttribute("aria-pressed", category === selectedCategory ? "true" : "false");

      button.addEventListener("click", function () {
        selectedCategory = category;
        updateFilterButtons();
        updateCategoryButtons();
        renderDestinationGrid();
        // Pindahkan pengguna ke section daftar destinasi (AC-014).
        if (destinationsSection) {
          destinationsSection.scrollIntoView();
        }
      });

      item.appendChild(button);
      categoryList.appendChild(item);
    });
  }

  function updateCategoryButtons() {
    categoryList.querySelectorAll("button").forEach(function (button) {
      button.setAttribute("aria-pressed", button.dataset.category === selectedCategory ? "true" : "false");
    });
  }

  // ---------- Filter kategori + "Semua" (FR-012, FR-013, FR-014) ----------
  function buildFilterButton(label) {
    const item = document.createElement("li");

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.dataset.category = label;

    button.addEventListener("click", function () {
      selectedCategory = label;
      updateFilterButtons();
      updateCategoryButtons();
      renderDestinationGrid();
    });

    item.appendChild(button);
    return item;
  }

  function renderFilterButtons() {
    filterList.replaceChildren();
    filterList.appendChild(buildFilterButton("Semua"));
    categories.forEach(function (category) {
      filterList.appendChild(buildFilterButton(category));
    });
    updateFilterButtons();
  }

  function updateFilterButtons() {
    filterList.querySelectorAll("button").forEach(function (button) {
      const isActive = button.dataset.category === selectedCategory;
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
      button.classList.toggle("is-active", isActive);
    });
  }

  // ---------- Search (FR-016–FR-018) + grid (FR-015, FR-020, FR-021) ----------
  function findDestinationById(id) {
    const normalized = String(id).trim().toLowerCase();
    return destinations.find(function (destination) {
      return destination.id === normalized;
    }) || null;
  }

  function matchesSearch(destination) {
    // Search kosong atau hanya spasi diperlakukan sebagai tanpa filter (ERR-06).
    if (searchQuery === "") {
      return true;
    }
    return (
      destination.name.toLowerCase().indexOf(searchQuery) !== -1 ||
      destination.location.toLowerCase().indexOf(searchQuery) !== -1
    );
  }

  function renderDestinationGrid() {
    const filtered = destinations.filter(function (destination) {
      const matchCategory =
        selectedCategory === "Semua" || destination.category === selectedCategory;
      return matchCategory && matchesSearch(destination);
    });

    destinationGrid.replaceChildren();
    filtered.forEach(function (destination) {
      destinationGrid.appendChild(buildDestinationCard(destination));
    });

    // Jumlah hasil (FR-020) — region aria-live sudah ada di index.html.
    resultCount.textContent =
      "Menampilkan " + filtered.length + " dari " + destinations.length + " destinasi.";

    // Empty state (FR-015, FR-021): grid divakosongkan, pesan muncul bila kosong.
    emptyState.hidden = filtered.length !== 0;
  }

  function initSearch() {
    searchForm.addEventListener("submit", function (event) {
      // Filter/search diterapkan saat input; submit dicegah (tabel 14.1).
      event.preventDefault();
    });

    searchInput.addEventListener("input", function () {
      // Tidak membedakan huruf besar/kecil dan abaikan spasi pinggir (FR-017).
      searchQuery = searchInput.value.trim().toLowerCase();
      renderDestinationGrid();
    });
  }

  // ---------- Reset (FR-013, FR-015) ----------
  function initReset() {
    resetButton.addEventListener("click", function () {
      selectedCategory = "Semua";
      searchQuery = "";
      searchInput.value = "";
      updateFilterButtons();
      updateCategoryButtons();
      renderDestinationGrid();
    });
  }

  // ---------- Init ----------
  initMenuToggle();
  renderFeatured();
  renderCategoryButtons();
  renderFilterButtons();
  initSearch();
  initReset();
  renderDestinationGrid();
})();

// ---------- Animasi masuk viewport (penyempurnaan visual) ----------
// Berjalan setelah semua kartu dirender. Keamanan:
// 1. Kalau pengguna mengurangi animasi, fungsi langsung berhenti.
// 2. Kalau IntersectionObserver tidak ada, fungsi berhenti SEBELUM class
//    "reveal" dipasang, jadi isi halaman tidak pernah disembunyikan.
// 3. Kalau ada error, semua class dibersihkan kembali sehingga konten tampil.
function initRevealOnScroll() {
  var reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) return;

  var targets = Array.prototype.slice.call(
    document.querySelectorAll(
      ".hero > *, main section > h2, .card-grid > *, .category-list > *, " +
      ".gallery figure, .tips-list > li, .cta > *, .overview > h3, " +
      ".overview > div, .overview > ul, .travel-info > h3, .travel-info > ul, " +
      ".info-note, .back-link, .not-found > *"
    )
  );
  if (targets.length === 0) return;

  try {
    document.documentElement.classList.add("has-js-reveal");
    targets.forEach(function (element) {
      element.classList.add("reveal");
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // hanya sekali per elemen
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
    );

    targets.forEach(function (element) {
      observer.observe(element);
    });
  } catch (error) {
    document.documentElement.classList.remove("has-js-reveal");
    targets.forEach(function (element) {
      element.classList.remove("reveal");
    });
  }
}

initRevealOnScroll();
