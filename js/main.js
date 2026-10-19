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
  let menuCloseTimer = null;

  function setMenuOpen(open, immediateClose) {
    if (!menuToggle || !siteMenu) return;

    const wasOpen = siteMenu.classList.contains("site-menu--open");
    window.clearTimeout(menuCloseTimer);
    menuToggle.setAttribute("aria-expanded", open ? "true" : "false");

    if (open) {
      siteMenu.classList.remove("site-menu--closing");
      siteMenu.classList.add("site-menu--open");
      return;
    }

    siteMenu.classList.remove("site-menu--open");

    // Tutup dengan animasi singkat, kecuali saat pengguna memilih tautan
    // (langsung tutup agar fokus tidak tertinggal di panel yang memudar).
    if (wasOpen && !immediateClose) {
      siteMenu.classList.add("site-menu--closing");
      menuCloseTimer = window.setTimeout(function () {
        siteMenu.classList.remove("site-menu--closing");
      }, 180);
    } else {
      siteMenu.classList.remove("site-menu--closing");
    }
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
        setMenuOpen(false, true);
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

  // Saat layar melebar ke desktop, bersihkan state menu mobile (ERR-12).
  function initMenuViewportReset() {
    if (!menuToggle || !siteMenu || !window.matchMedia) return;

    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    function resetMenuOnDesktop(event) {
      if (!event.matches) return;
      window.clearTimeout(menuCloseTimer);
      menuToggle.setAttribute("aria-expanded", "false");
      siteMenu.classList.remove("site-menu--open", "site-menu--closing");
    }

    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener("change", resetMenuOnDesktop);
    } else if (desktopQuery.addListener) {
      desktopQuery.addListener(resetMenuOnDesktop);
    }
  }

  // ---------- Ikon SVG inline (satu sistem, lihat bagian 6 css/style.css) ----------
  // Ikon di sini selalu dekoratif: teks di sebelahnya sudah menjelaskan
  // maksudnya, jadi setiap ikon diberi aria-hidden dan tidak menambah
  // accessible name elemen induknya.
  const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  const ICON_PATHS = {
    // Penanda lokasi (gaya outline, viewBox 24x24).
    pin: "M20 10.5c0 5.6-6.1 10.6-8 12.1-1.9-1.5-8-6.5-8-12.1a8 8 0 0 1 16 0Zm-8 2.75a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Z",
    arrowRight: "M5 12h14M12 5l7 7-7 7"
  };

  function buildIcon(name) {
    const svg = document.createElementNS(SVG_NAMESPACE, "svg");
    svg.setAttribute("class", "icon");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "18");
    svg.setAttribute("height", "18");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");

    const path = document.createElementNS(SVG_NAMESPACE, "path");
    path.setAttribute("d", ICON_PATHS[name]);
    svg.appendChild(path);
    return svg;
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
    location.appendChild(buildIcon("pin"));
    location.appendChild(document.createTextNode(destination.location));

    const description = document.createElement("p");
    description.className = "card-description";
    description.textContent = destination.shortDescription;

    const link = document.createElement("a");
    link.className = "card-link";
    // Accessible name memuat nama destinasi (FR-010).
    link.textContent = "Lihat detail " + destination.name;
    link.href = "destination.html?id=" + destination.id;
    link.appendChild(buildIcon("arrowRight"));

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
      button.appendChild(buildIcon("arrowRight"));
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
  initMenuViewportReset();
  renderFeatured();
  renderCategoryButtons();
  renderFilterButtons();
  initSearch();
  initReset();
  renderDestinationGrid();
})();

// ---------- Animasi masuk viewport (penyempurnaan visual) ----------
// Berjalan setelah semua kartu dirender.
// Keamanan (konten tidak boleh tersembunyi permanen):
// 1. Kalau pengguna mengurangi animasi, fungsi berhenti sebelum apa pun
//    disembunyikan.
// 2. Kalau IntersectionObserver tidak ada, fungsi juga berhenti.
// 3. Class "reveal" hanya dipasang setelah semua pemeriksaan lolos, dan
//    dilepas lagi kalau terjadi error.
// 4. Scroll mendadak (lompat anchor, tombol "End", atau posisi scroll yang
//    dipulihkan browser) dapat membuat elemen terlewat tanpa pernah
//    berpotongan dengan viewport. Karena itu ada penyapuan saat event scroll.
function initRevealOnScroll() {
  var reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) return;

  // Aturan arah masuk: [selektor, arah]. "left"/"right" dipakai untuk konten
  // yang memang berada di sisi kiri/kanan; "up" adalah fade-up halus.
  var revealRules = [
    [".hero__intro > *", "up"],
    [".hero-cards > li", "up"],
    [".cta > *", "up"],
    ["main section > h2", "left"],
    [".card-grid > *", "up"],
    [".category-list > *", "up"],
    [".tips-list > li", "up"],
    [".not-found > *", "up"]
  ];

  var targets = [];
  revealRules.forEach(function (rule) {
    document.querySelectorAll(rule[0]).forEach(function (element) {
      if (targets.indexOf(element) !== -1) return; // aturan pertama menang
      if (rule[1] !== "up") {
        element.setAttribute("data-reveal", rule[1]);
      }
      targets.push(element);
    });
  });
  if (targets.length === 0) return;

  var pending = [];
  var observer = null;

  // Munculkan elemen yang sudah berada di dalam atau di atas viewport.
  function sweep() {
    var viewBottom = window.innerHeight;
    var stillHidden = [];
    for (var i = 0; i < pending.length; i++) {
      if (pending[i].getBoundingClientRect().top < viewBottom) {
        pending[i].classList.add("is-visible");
        if (observer) observer.unobserve(pending[i]);
      } else {
        stillHidden.push(pending[i]);
      }
    }
    pending = stillHidden;
    if (pending.length === 0) {
      window.removeEventListener("scroll", sweep);
      window.removeEventListener("pageshow", sweep);
    }
  }

  try {
    document.documentElement.classList.add("has-js-reveal");
    targets.forEach(function (element) {
      element.classList.add("reveal");
    });
    pending = targets.slice();

    observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // hanya sekali per elemen
          pending = pending.filter(function (element) {
            return element !== entry.target;
          });
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
    );

    pending.forEach(function (element) {
      observer.observe(element);
    });

    window.addEventListener("scroll", sweep, { passive: true });
    window.addEventListener("pageshow", sweep);
    sweep(); // posisi awal dan posisi scroll yang dipulihkan browser
  } catch (error) {
    document.documentElement.classList.remove("has-js-reveal");
    targets.forEach(function (element) {
      element.classList.remove("reveal");
      element.removeAttribute("data-reveal");
    });
  }
}

initRevealOnScroll();
