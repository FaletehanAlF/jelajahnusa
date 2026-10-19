// JelajahNusa — js/main.js
// Logika beranda (PRD 15.2):
// - toggle menu mobile dengan aria-expanded (FR-002, FR-003),
// - carousel kartu foto destinasi ke #featured-grid + dialog detail,
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

  // State pencarian dan filter; "Semua" artinya tanpa filter kategori.
  let selectedCategory = "Semua";
  let searchQuery = "";

  // ===== Slot gambar AVIF untuk kartu showcase =====
  // Tambahkan path setelah file tersedia, contoh:
  //   bromo: "assets/images/destinations/bromo.avif",
  // Selama objek ini kosong, kartu memakai placeholder netral dan TIDAK
  // memicu request gambar yang belum ada.
  const SHOWCASE_IMAGES = {
    // bromo: "assets/images/destinations/bromo.avif",
    // "nusa-penida": "assets/images/destinations/nusa-penida.avif",
    // "raja-ampat": "assets/images/destinations/raja-ampat.avif",
    // borobudur: "assets/images/destinations/borobudur.avif",
    // "pulau-padar": "assets/images/destinations/pulau-padar.avif",
    // "kawah-ijen": "assets/images/destinations/kawah-ijen.avif",
  };

  // ---------- Referensi elemen (kontrak ID dari index.html) ----------
  const menuToggle = document.getElementById("menu-toggle");
  const siteMenu = document.getElementById("site-menu");
  const showcaseTrack = document.getElementById("featured-grid");
  const showcaseViewport = document.getElementById("showcase-viewport");
  const showcasePrev = document.getElementById("showcase-prev");
  const showcaseNext = document.getElementById("showcase-next");
  const showcaseStatus = document.getElementById("showcase-status");
  const categoryList = document.getElementById("category-list");
  const filterList = document.getElementById("filter-list");
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const resultCount = document.getElementById("result-count");
  const destinationGrid = document.getElementById("destination-grid");
  const emptyState = document.getElementById("empty-state");
  const resetButton = document.getElementById("reset-filters");
  const destinationsSection = document.getElementById("destinasi");
  const detailDialog = document.getElementById("destination-dialog");

  if (!destinationGrid || !filterList || !showcaseTrack || !categoryList) {
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
    arrowRight: "M5 12h14M12 5l7 7-7 7",
    arrowLeft: "M19 12H5M12 19l-7-7 7-7"
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

  // Ikon penanda slot media (dekoratif, bukan pengganti teks).
  function buildMediaPlaceholder() {
    const placeholder = document.createElement("span");
    placeholder.className = "media-placeholder";
    placeholder.setAttribute("aria-hidden", "true");

    const svg = document.createElementNS(SVG_NAMESPACE, "svg");
    svg.setAttribute("class", "icon media-placeholder__icon");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "26");
    svg.setAttribute("height", "26");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");

    const frame = document.createElementNS(SVG_NAMESPACE, "rect");
    frame.setAttribute("x", "3");
    frame.setAttribute("y", "3");
    frame.setAttribute("width", "18");
    frame.setAttribute("height", "18");
    frame.setAttribute("rx", "2");

    const circle = document.createElementNS(SVG_NAMESPACE, "circle");
    circle.setAttribute("cx", "8.5");
    circle.setAttribute("cy", "8.5");
    circle.setAttribute("r", "1.5");

    const landscape = document.createElementNS(SVG_NAMESPACE, "polyline");
    landscape.setAttribute("points", "21 15 16 10 5 21");

    svg.appendChild(frame);
    svg.appendChild(circle);
    svg.appendChild(landscape);
    placeholder.appendChild(svg);
    return placeholder;
  }

  // Media dipakai oleh kartu dan dialog. Jika path AVIF belum diisi di
  // SHOWCASE_IMAGES, tidak ada <img> sama sekali (tidak ada request 404).
  function buildDestinationMedia(destination, className) {
    const media = document.createElement("span");
    media.className = className;
    media.setAttribute(
      "data-image-slot",
      "assets/images/destinations/" + destination.id + ".avif"
    );

    const imagePath = SHOWCASE_IMAGES[destination.id];
    if (imagePath) {
      const image = document.createElement("img");
      image.className = "destination-media__image";
      image.src = imagePath;
      image.alt = destination.heroImage.alt;
      image.width = 800;
      image.height = 1067;
      image.loading = "lazy";
      image.decoding = "async";
      media.appendChild(image);
    } else {
      media.appendChild(buildMediaPlaceholder());
      media.appendChild(
        document.createComment(
          " Slot gambar AVIF: assets/images/destinations/" + destination.id + ".avif "
        )
      );
    }

    return media;
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

  // ---------- Kartu foto showcase (editorial carousel) ----------
  // Kartu sengaja tanpa teks permanen: foto menjadi fokus utama, informasi
  // destinasi baru muncul saat hover/fokus dan lengkap di dialog detail.
  function buildShowcaseCard(destination) {
    const item = document.createElement("li");
    item.className = "showcase__item";

    const card = document.createElement("article");
    card.className = "photo-card";

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "photo-card__trigger";
    trigger.dataset.destinationId = destination.id;
    trigger.setAttribute("aria-haspopup", "dialog");
    trigger.setAttribute("aria-controls", "destination-dialog");
    trigger.setAttribute(
      "aria-label",
      "Buka detail " + destination.name + ", " + destination.location
    );

    trigger.appendChild(buildDestinationMedia(destination, "photo-card__media"));

    const overlay = document.createElement("span");
    overlay.className = "photo-card__overlay";

    const info = document.createElement("span");
    info.className = "photo-card__info";

    const category = document.createElement("span");
    category.className = "photo-card__category";
    category.textContent = destination.category;

    const title = document.createElement("span");
    title.className = "photo-card__title";
    title.textContent = destination.name;

    const location = document.createElement("span");
    location.className = "photo-card__location";
    location.appendChild(buildIcon("pin"));
    location.appendChild(document.createTextNode(destination.location));

    const description = document.createElement("span");
    description.className = "photo-card__description";
    description.textContent = destination.shortDescription;

    const cta = document.createElement("span");
    cta.className = "photo-card__cta";
    cta.appendChild(document.createTextNode("Lihat detail"));
    cta.appendChild(buildIcon("arrowRight"));

    info.appendChild(category);
    info.appendChild(title);
    info.appendChild(location);
    info.appendChild(description);
    info.appendChild(cta);
    overlay.appendChild(info);
    trigger.appendChild(overlay);
    card.appendChild(trigger);
    item.appendChild(card);
    return item;
  }

  function renderShowcase() {
    if (!showcaseTrack) return;
    showcaseTrack.replaceChildren();
    destinations.forEach(function (destination) {
      showcaseTrack.appendChild(buildShowcaseCard(destination));
    });
  }

  // ---------- Carousel showcase ----------
  let showcaseIndex = 0;
  let showcaseOffset = 0;
  let showcaseVisible = 4;
  let showcaseDrag = null;
  let suppressShowcaseClick = false;

  function getShowcaseVisibleCount() {
    if (!window.matchMedia) return 4;
    if (window.matchMedia("(min-width: 1024px)").matches) return 4;
    if (window.matchMedia("(min-width: 600px)").matches) return 2;
    return 1;
  }

  function getShowcaseMaxOffset() {
    if (!showcaseTrack || !showcaseViewport) return 0;
    return Math.max(0, showcaseTrack.scrollWidth - showcaseViewport.clientWidth);
  }

  function getShowcaseItemOffset(index) {
    const items = showcaseTrack.children;
    if (!items.length) return 0;
    const target = items[Math.min(Math.max(index, 0), items.length - 1)];
    return Math.max(0, target.offsetLeft - items[0].offsetLeft);
  }

  function setShowcaseTransform(offset) {
    showcaseOffset = offset;
    showcaseTrack.style.transform = "translate3d(" + -offset + "px, 0, 0)";
  }

  function updateShowcaseControls() {
    if (!showcasePrev || !showcaseNext) return;
    const maxIndex = Math.max(0, destinations.length - showcaseVisible);
    showcasePrev.disabled = showcaseIndex <= 0;
    showcaseNext.disabled = showcaseIndex >= maxIndex;

    if (showcaseStatus) {
      if (!destinations.length) {
        showcaseStatus.textContent = "";
      } else {
        const first = showcaseIndex + 1;
        const last = Math.min(showcaseIndex + showcaseVisible, destinations.length);
        showcaseStatus.textContent =
          "Menampilkan destinasi " + first + " sampai " + last +
          " dari " + destinations.length + ".";
      }
    }
  }

  // Animasi satu langkah: seluruh track bergerak bersamaan sehingga kartu yang
  // masuk dari kanan (maju) atau kiri (mundur) tidak pernah saling bertabrakan.
  function animateShowcaseTo(index) {
    const maxIndex = Math.max(0, destinations.length - showcaseVisible);
    showcaseIndex = Math.max(0, Math.min(index, maxIndex));
    const offset = Math.min(getShowcaseItemOffset(showcaseIndex), getShowcaseMaxOffset());

    showcaseTrack.classList.remove("is-dragging");
    showcaseTrack.classList.add("is-animating");
    // Paksa style transisi terbaca sebelum nilai transform berubah.
    void showcaseTrack.offsetWidth;
    setShowcaseTransform(offset);
    updateShowcaseControls();
  }

  function moveShowcase(delta) {
    animateShowcaseTo(showcaseIndex + delta);
  }

  function updateShowcaseLayout() {
    showcaseVisible = getShowcaseVisibleCount();
    const maxIndex = Math.max(0, destinations.length - showcaseVisible);
    showcaseIndex = Math.max(0, Math.min(showcaseIndex, maxIndex));

    showcaseTrack.classList.remove("is-animating", "is-dragging");
    setShowcaseTransform(Math.min(getShowcaseItemOffset(showcaseIndex), getShowcaseMaxOffset()));
    updateShowcaseControls();
  }

  function suppressShowcaseClickOnce() {
    suppressShowcaseClick = true;
    window.setTimeout(function () {
      suppressShowcaseClick = false;
    }, 350);
  }

  function endShowcaseDrag(event) {
    if (!showcaseDrag || event.pointerId !== showcaseDrag.pointerId) return;

    const drag = showcaseDrag;
    showcaseDrag = null;
    showcaseTrack.classList.remove("is-dragging");

    if (!drag.active) return; // klik biasa: biarkan membuka dialog

    suppressShowcaseClickOnce();
    const dx = event.clientX - drag.startX;
    const threshold = Math.max(24, Math.min(70, showcaseViewport.clientWidth * 0.08));

    if (dx <= -threshold) {
      moveShowcase(1);
    } else if (dx >= threshold) {
      moveShowcase(-1);
    } else {
      animateShowcaseTo(showcaseIndex);
    }
  }

  function initShowcase() {
    if (!showcaseTrack || !showcaseViewport) return;

    renderShowcase();
    updateShowcaseLayout();

    if (showcasePrev) {
      showcasePrev.addEventListener("click", function () {
        moveShowcase(-1);
      });
    }

    if (showcaseNext) {
      showcaseNext.addEventListener("click", function () {
        moveShowcase(1);
      });
    }

    // Klik kartu membuka dialog; event setelah drag horizontal diabaikan.
    showcaseViewport.addEventListener(
      "click",
      function (event) {
        if (!suppressShowcaseClick) return;
        suppressShowcaseClick = false;
        event.preventDefault();
        event.stopPropagation();
      },
      true
    );

    showcaseTrack.addEventListener("click", function (event) {
      const trigger = event.target.closest(".photo-card__trigger");
      if (!trigger) return;
      const destination = findDestinationById(trigger.dataset.destinationId);
      if (destination) {
        openDestinationDialog(destination, trigger);
      }
    });

    // Kartu yang menerima fokus keyboard otomatis digeser masuk ke viewport.
    showcaseTrack.addEventListener("focusin", function (event) {
      const item = event.target.closest(".showcase__item");
      if (!item) return;
      const items = Array.prototype.slice.call(showcaseTrack.children);
      const itemIndex = items.indexOf(item);
      if (itemIndex === -1) return;

      if (itemIndex < showcaseIndex) {
        animateShowcaseTo(itemIndex);
      } else if (itemIndex > showcaseIndex + showcaseVisible - 1) {
        animateShowcaseTo(itemIndex - showcaseVisible + 1);
      }
    });

    // Geser/horizontal drag (mouse dan sentuh) tanpa mengganggu scroll vertikal.
    showcaseViewport.addEventListener("pointerdown", function (event) {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      if (showcaseDrag) return;
      showcaseDrag = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        startOffset: showcaseOffset,
        active: false
      };
    });

    showcaseViewport.addEventListener("pointermove", function (event) {
      if (!showcaseDrag || event.pointerId !== showcaseDrag.pointerId) return;

      const dx = event.clientX - showcaseDrag.startX;
      const dy = event.clientY - showcaseDrag.startY;

      if (!showcaseDrag.active) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        if (Math.abs(dy) > Math.abs(dx)) {
          showcaseDrag = null; // gestur vertikal: serahkan ke scroll halaman
          return;
        }
        showcaseDrag.active = true;
        showcaseTrack.classList.remove("is-animating");
        showcaseTrack.classList.add("is-dragging");
        if (showcaseViewport.setPointerCapture) {
          showcaseViewport.setPointerCapture(event.pointerId);
        }
      }

      event.preventDefault();
      const offset = Math.max(
        0,
        Math.min(showcaseDrag.startOffset - dx, getShowcaseMaxOffset())
      );
      setShowcaseTransform(offset);
    });

    showcaseViewport.addEventListener("pointerup", endShowcaseDrag);

    showcaseViewport.addEventListener("pointercancel", function (event) {
      if (!showcaseDrag || event.pointerId !== showcaseDrag.pointerId) return;
      const wasActive = showcaseDrag.active;
      showcaseDrag = null;
      showcaseTrack.classList.remove("is-dragging");
      if (wasActive) {
        suppressShowcaseClickOnce();
        animateShowcaseTo(showcaseIndex);
      }
    });

    let resizeFrame = null;
    window.addEventListener("resize", function () {
      if (resizeFrame) return;
      resizeFrame = window.requestAnimationFrame(function () {
        resizeFrame = null;
        updateShowcaseLayout();
      });
    });
  }

  // ---------- Dialog detail destinasi ----------
  let dialogTrigger = null;

  const dialogMedia = document.getElementById("destination-dialog-media");
  const dialogCategory = document.getElementById("destination-dialog-category");
  const dialogTitle = document.getElementById("destination-dialog-title");
  const dialogLocation = document.getElementById("destination-dialog-location");
  const dialogDescription = document.getElementById("destination-dialog-description");
  const dialogHighlights = document.getElementById("destination-dialog-highlights");
  const dialogLink = document.getElementById("destination-dialog-link");
  const dialogClose = document.getElementById("destination-dialog-close");

  function fillDestinationDialog(destination) {
    if (dialogMedia) {
      dialogMedia.replaceChildren();
      dialogMedia.appendChild(buildDestinationMedia(destination, "detail-dialog__media-inner"));
    }
    if (dialogCategory) dialogCategory.textContent = destination.category;
    if (dialogTitle) dialogTitle.textContent = destination.name;
    if (dialogLocation) dialogLocation.textContent = destination.location;
    if (dialogDescription) dialogDescription.textContent = destination.shortDescription;

    if (dialogHighlights) {
      dialogHighlights.replaceChildren();
      destination.highlights.slice(0, 3).forEach(function (highlight) {
        const item = document.createElement("li");
        item.textContent = highlight;
        dialogHighlights.appendChild(item);
      });
    }

    if (dialogLink) {
      dialogLink.href = "destination.html?id=" + encodeURIComponent(destination.id);
    }
  }

  function openDestinationDialog(destination, trigger) {
    // Tanpa dukungan showModal(), langsung buka halaman detail agar data tetap
    // dapat diakses (URL yang sama, perilaku lama tetap terjaga).
    if (!detailDialog || typeof detailDialog.showModal !== "function") {
      window.location.href = "destination.html?id=" + encodeURIComponent(destination.id);
      return;
    }

    dialogTrigger = trigger || null;
    fillDestinationDialog(destination);
    document.documentElement.classList.add("has-dialog");
    detailDialog.showModal();

    if (dialogClose) {
      dialogClose.focus();
    }
  }

  function closeDestinationDialog() {
    if (!detailDialog || !detailDialog.open) return;
    detailDialog.close();
  }

  function initDestinationDialog() {
    if (!detailDialog) return;

    if (dialogClose) {
      dialogClose.addEventListener("click", closeDestinationDialog);
    }

    // Klik pada area backdrop (target tepat di elemen dialog) menutup dialog.
    detailDialog.addEventListener("click", function (event) {
      if (event.target === detailDialog) {
        closeDestinationDialog();
      }
    });

    // Escape ditangani native <dialog>; event close merapikan state dan fokus.
    detailDialog.addEventListener("close", function () {
      document.documentElement.classList.remove("has-dialog");
      if (dialogTrigger && document.contains(dialogTrigger)) {
        dialogTrigger.focus({ preventScroll: true });
      }
      dialogTrigger = null;
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
  initShowcase();
  initDestinationDialog();
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
    [".showcase__header", "left"],
    [".hero__intro > *", "up"],
    [".hero-cards > li", "up"],
    [".showcase__carousel", "up"],
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
