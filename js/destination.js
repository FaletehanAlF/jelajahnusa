// JelajahNusa — js/destination.js
// Logika halaman detail (PRD 15.2, 10.2):
// - toggle menu mobile (duplikasi kecil disengaja, PRD A-07),
// - baca parameter ?id= dari URL (FR-022),
// - render detail, galeri, informasi berkunjung, related (FR-023, FR-025, FR-027, FR-028),
// - perbarui <title> sesuai nama destinasi,
// - tampilkan #not-found dan sembunyikan #destination-detail bila ID tidak valid
//   (FR-024) sehingga tidak ada dua heading utama yang tampil sekaligus.
//
// Data dibaca dari global `destinations` di js/data.js.
// Markup dinamis dibuat dengan createElement/textContent, bukan innerHTML.

(function () {
  "use strict";

  if (typeof destinations === "undefined") {
    console.error("JelajahNusa: data.js belum dimuat atau global destinations tidak ditemukan.");
    return;
  }

  // ---------- Referensi elemen (kontrak ID dari destination.html) ----------
  const menuToggle = document.getElementById("menu-toggle");
  const siteMenu = document.getElementById("site-menu");
  const detailWrapper = document.getElementById("destination-detail");
  const notFoundSection = document.getElementById("not-found");

  const heroImage = document.getElementById("destination-hero-image");
  const nameHeading = document.getElementById("destination-name");
  const locationText = document.getElementById("destination-location");
  const categoryBadge = document.getElementById("destination-category");
  const shortDescription = document.getElementById("destination-short-description");
  const descriptionContainer = document.getElementById("destination-description");
  const highlightsList = document.getElementById("destination-highlights");
  const galleryContainer = document.getElementById("destination-gallery");
  const activitiesList = document.getElementById("destination-activities");
  const visitTipsList = document.getElementById("destination-visit-tips");
  const verifiedNote = document.getElementById("destination-verified-note");
  const relatedSection = document.getElementById("related");
  const relatedGrid = document.getElementById("related-grid");

  if (!detailWrapper || !notFoundSection) {
    console.error("JelajahNusa: elemen state detail tidak ditemukan di destination.html.");
    return;
  }

  // ---------- Util ----------
  function findDestinationById(id) {
    const normalized = String(id).trim().toLowerCase();
    return destinations.find(function (destination) {
      return destination.id === normalized;
    }) || null;
  }

  function getIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    // ID dinormalisasi ke huruf kecil (ERR-03); kosong jika parameter tidak ada.
    return id ? id.trim().toLowerCase() : "";
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

    siteMenu.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setMenuOpen(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
        menuToggle.focus();
      }
    });
  }

  // ---------- Ikon SVG inline (satu sistem, lihat bagian 6 css/style.css) ----------
  // Ikon di sini selalu dekoratif: teks di sebelahnya sudah menjelaskan
  // maksudnya, jadi setiap ikon diberi aria-hidden dan tidak menambah
  // accessible name elemen induknya. Duplikasi kecil dengan js/main.js
  // disengaja (PRD A-07), sama seperti duplikasi lain di halaman ini.
  const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  const ICON_PATHS = {
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

  // ---------- Pembuat kartu destinasi (dipakai untuk related, FR-011, FR-025) ----------
  function buildDestinationCard(destination) {
    const card = document.createElement("article");
    card.className = "destination-card";

    const image = document.createElement("img");
    image.className = "card-image";
    image.src = destination.heroImage.src;
    image.alt = destination.heroImage.alt;
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

  function fillList(listElement, items) {
    listElement.replaceChildren();
    items.forEach(function (text) {
      const item = document.createElement("li");
      item.textContent = text;
      listElement.appendChild(item);
    });
  }

  function fillListItem(id, items) {
    const listElement = document.getElementById(id);
    if (listElement) {
      fillList(listElement, items);
    }
  }

  // ---------- Render bagian detail (FR-023) ----------
  function renderDetail(destination) {
    // Hero: gambar, nama, provinsi, kategori, deskripsi singkat.
    heroImage.src = destination.heroImage.src;
    heroImage.alt = destination.heroImage.alt;
    nameHeading.textContent = destination.name;
    // Ikon penanda lokasi ikut dirender bersama teksnya.
    locationText.textContent = destination.location;
    locationText.prepend(buildIcon("pin"));
    categoryBadge.textContent = destination.category;
    shortDescription.textContent = destination.shortDescription;

    // Overview: deskripsi lengkap (bisa beberapa paragraf).
    descriptionContainer.replaceChildren();
    const paragraphs = Array.isArray(destination.fullDescription)
      ? destination.fullDescription
      : [destination.fullDescription];
    paragraphs.forEach(function (text) {
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      descriptionContainer.appendChild(paragraph);
    });

    fillList(highlightsList, destination.highlights);

    // Galeri statis dengan figure/figcaption (FR-027, tabel 14.1).
    galleryContainer.replaceChildren();
    destination.galleryImages.forEach(function (imageData) {
      const figure = document.createElement("figure");

      const image = document.createElement("img");
      image.src = imageData.src;
      image.alt = imageData.alt;
      image.width = 800;
      image.height = 600;
      image.loading = "lazy";
      figure.appendChild(image);

      if (imageData.caption) {
        const caption = document.createElement("figcaption");
        caption.textContent = imageData.caption;
        figure.appendChild(caption);
      }

      galleryContainer.appendChild(figure);
    });

    // Informasi berkunjung.
    fillListItem("destination-activities", destination.activities);
    fillListItem("destination-visit-tips", destination.visitTips);

    // Catatan "perlu diperiksa ke sumber resmi" (FR-028); sembunyikan bila kosong.
    if (destination.verifiedInfoNote) {
      verifiedNote.textContent = destination.verifiedInfoNote;
      verifiedNote.hidden = false;
    } else {
      verifiedNote.hidden = true;
    }

    // Related destinations: lewati ID yang tidak valid (ERR-08, FR-025).
    relatedGrid.replaceChildren();
    const validRelated = (destination.relatedIds || [])
      .filter(function (id) {
        return id !== destination.id;
      })
      .map(findDestinationById)
      .filter(Boolean);

    validRelated.forEach(function (related) {
      relatedGrid.appendChild(buildDestinationCard(related));
    });
    relatedSection.hidden = validRelated.length === 0;

    // Judul halaman sesuai destinasi (FR-023, A11Y-02).
    document.title = destination.name + " — JelajahNusa";

    // Tampilkan detail, pastikan tidak-found tersembunyi.
    notFoundSection.hidden = true;
    detailWrapper.hidden = false;
  }

  // ---------- State tidak ditemukan (FR-024, ERR-01, ERR-02) ----------
  function showNotFound() {
    detailWrapper.hidden = true;
    notFoundSection.hidden = false;
    document.title = "Destinasi tidak ditemukan — JelajahNusa";
  }

  // ---------- Init ----------
  initMenuToggle();

  const requestedId = getIdFromUrl();
  const destination = requestedId ? findDestinationById(requestedId) : null;

  if (destination) {
    renderDetail(destination);
  } else {
    showNotFound();
  }
})();

// ---------- Animasi masuk viewport (penyempurnaan visual) ----------
// Berjalan setelah detail/state dirender.
// Keamanan (konten tidak boleh tersembunyi permanen):
// 1. Kalau pengguna mengurangi animasi, fungsi berhenti sebelum apa pun
//    disembunyikan.
// 2. Kalau IntersectionObserver tidak ada, fungsi juga berhenti.
// 3. Class "reveal" hanya dipasang setelah semua pemeriksaan lolos, dan
//    dilepas lagi kalau terjadi error.
// 4. Scroll mendadak (lompat anchor, tombol "End", atau posisi scroll yang
//    dipulihkan browser) dapat membuat elemen terlewat tanpa pernah
//    berpotongan dengan viewport. Karena itu ada penyapuan saat event scroll.
// Duplikasi kecil dengan js/main.js disengaja (PRD A-07).
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
    });
  }
}

initRevealOnScroll();
