// filter.ts
import {
  filterByCategory,
  filterBySearch,
  sortItems,
  paginateItems,
} from "../lib/content/queryEngine";

// KEGIATAN PAGE LOGIC
export function initKegiatanFilter() {
  if (typeof document === "undefined") return;

  const filterChips = document.querySelectorAll("#postChips .chip");
  const searchInput = document.querySelector(".search") as HTMLInputElement;
  const majorContainer = document.getElementById("postMajor");
  const minorContainer = document.getElementById("postMinor");
  const paginationContainer = document.querySelector("[data-pagination]");

  if (!majorContainer || !minorContainer || !filterChips.length) return;

  const ITEMS_PER_PAGE = 7; // 3 major, 4 minor
  let currentPage = 1;
  let currentCategory = "Semua";
  let currentSearch = "";

  // Get all items from template
  const template = document.getElementById(
    "all-posts-template",
  ) as HTMLTemplateElement;
  if (!template) return;

  const allItems = Array.from(template.content.children) as HTMLElement[];

  function updateURL() {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (currentCategory !== "Semua")
      url.searchParams.set("kategori", currentCategory);
    else url.searchParams.delete("kategori");

    if (currentSearch) url.searchParams.set("q", currentSearch);
    else url.searchParams.delete("q");

    if (currentPage > 1) url.searchParams.set("page", currentPage.toString());
    else url.searchParams.delete("page");

    window.history.replaceState({}, "", url);
  }

  function readURL() {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    currentCategory = url.searchParams.get("kategori") || "Semua";
    currentSearch = url.searchParams.get("q") || "";
    currentPage = parseInt(url.searchParams.get("page") || "1", 10);
  }

  function render() {
    // 1. Filter by Category & Search using Pure Engine
    const catFiltered = filterByCategory(
      allItems,
      currentCategory,
      (el) => el.getAttribute("data-kategori") || "",
    );
    const searchFiltered = filterBySearch(
      catFiltered,
      currentSearch,
      (el) => el.getAttribute("data-title") || "",
    );

    // 2. Paginate using Pure Engine
    const {
      paginated,
      totalPages,
      currentPage: clampedPage,
    } = paginateItems(searchFiltered, currentPage, ITEMS_PER_PAGE);
    currentPage = clampedPage;

    // 3. Render Items
    majorContainer!.innerHTML = "";
    minorContainer!.innerHTML = "";

    if (paginated.length === 0) {
      const emptyTemplate = document.getElementById(
        "empty-state-template",
      ) as HTMLTemplateElement;
      if (emptyTemplate) {
        majorContainer!.appendChild(emptyTemplate.content.cloneNode(true));
      }
    } else {
      paginated.forEach((el, index) => {
        const clone = el.cloneNode(true) as HTMLElement;
        if (index < 3) {
          majorContainer!.appendChild(clone);
        } else {
          minorContainer!.appendChild(clone);
        }
      });
    }

    // 4. Update Chips UI
    filterChips.forEach((chip) => {
      chip.classList.toggle("is-active", chip.textContent === currentCategory);
      chip.removeAttribute("disabled");
    });

    // 5. Update Search UI
    if (searchInput) {
      searchInput.value = currentSearch;
      searchInput.removeAttribute("disabled");
    }

    // 6. Update Pagination UI
    renderPagination(paginationContainer, currentPage, totalPages, (page) => {
      currentPage = page;
      updateURL();
      render();
      if (typeof window !== "undefined") {
        const filterbar = document.querySelector(".filterbar");
        if (filterbar) {
          window.scrollTo({
            top: filterbar.getBoundingClientRect().top + window.scrollY - 100,
            behavior: "smooth",
          });
        }
      }
    });
  }

  // Events
  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      currentCategory = chip.textContent || "Semua";
      currentPage = 1;
      updateURL();
      render();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearch = (e.target as HTMLInputElement).value;
      currentPage = 1;
      updateURL();
      render();
    });
  }

  readURL();
  render();
}

// PROJECT PAGE LOGIC
export function initProjectsFilter() {
  if (typeof document === "undefined") return;

  const filterChips = document.querySelectorAll("#projectChips .chip");
  const sortSelect = document.querySelector(".select") as HTMLSelectElement;
  const gridContainer = document.getElementById("projectGrid");
  const paginationContainer = document.querySelector("[data-pagination]");

  if (!gridContainer || !filterChips.length) return;

  const ITEMS_PER_PAGE = 10;
  let currentPage = 1;
  let currentCategory = "Semua";
  let currentSort = "Terbaru";

  const template = document.getElementById(
    "all-projects-template",
  ) as HTMLTemplateElement;
  if (!template) return;

  const allItems = Array.from(template.content.children) as HTMLElement[];

  function updateURL() {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (currentCategory !== "Semua")
      url.searchParams.set("kategori", currentCategory);
    else url.searchParams.delete("kategori");

    if (currentSort !== "Terbaru") url.searchParams.set("sort", currentSort);
    else url.searchParams.delete("sort");

    if (currentPage > 1) url.searchParams.set("page", currentPage.toString());
    else url.searchParams.delete("page");

    window.history.replaceState({}, "", url);
  }

  function readURL() {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    currentCategory = url.searchParams.get("kategori") || "Semua";
    currentSort = url.searchParams.get("sort") || "Terbaru";
    currentPage = parseInt(url.searchParams.get("page") || "1", 10);
  }

  function render() {
    // 1. Filter using Pure Engine
    const filtered = filterByCategory(
      allItems,
      currentCategory,
      (el) => el.getAttribute("data-kategori") || "",
    );

    // 2. Sort using Pure Engine
    const sorted = sortItems(filtered, currentSort, (el) => ({
      title: el.getAttribute("data-title") || "",
      date: el.getAttribute("data-date") || 0,
    }));

    // 3. Paginate using Pure Engine
    const {
      paginated,
      totalPages,
      currentPage: clampedPage,
    } = paginateItems(sorted, currentPage, ITEMS_PER_PAGE);
    currentPage = clampedPage;

    // 4. Render Items
    gridContainer!.innerHTML = "";
    if (paginated.length === 0) {
      const emptyTemplate = document.getElementById(
        "empty-state-template",
      ) as HTMLTemplateElement;
      if (emptyTemplate) {
        gridContainer!.appendChild(emptyTemplate.content.cloneNode(true));
      }
    } else {
      paginated.forEach((el, i) => {
        const clone = el.cloneNode(true) as HTMLElement;
        // Strip old size classes
        const card = clone.querySelector(".pcard");
        if (card) {
          card.classList.remove("pcard--tall", "pcard--wide");
          const size = i % 5 === 0 ? "tall" : i % 5 === 4 ? "wide" : "normal";
          if (size === "tall") card.classList.add("pcard--tall");
          if (size === "wide") card.classList.add("pcard--wide");
        }
        gridContainer!.appendChild(clone);
      });
    }

    // 5. Update UI
    filterChips.forEach((chip) => {
      chip.classList.toggle("is-active", chip.textContent === currentCategory);
      chip.removeAttribute("disabled");
    });
    if (sortSelect) {
      sortSelect.value = currentSort;
      sortSelect.removeAttribute("disabled");
    }

    renderPagination(paginationContainer, currentPage, totalPages, (page) => {
      currentPage = page;
      updateURL();
      render();
      if (typeof window !== "undefined") {
        const filterbar = document.querySelector(".filterbar");
        if (filterbar) {
          window.scrollTo({
            top: filterbar.getBoundingClientRect().top + window.scrollY - 100,
            behavior: "smooth",
          });
        }
      }
    });
  }

  // Events
  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      currentCategory = chip.textContent || "Semua";
      currentPage = 1;
      updateURL();
      render();
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = (e.target as HTMLSelectElement).value;
      currentPage = 1;
      updateURL();
      render();
    });
  }

  readURL();
  render();
}

export function renderPagination(
  container: Element | null,
  current: number,
  total: number,
  onPage: (p: number) => void,
) {
  if (!container || typeof document === "undefined") return;
  container.innerHTML = "";

  if (total <= 1) return;

  const prev = document.createElement("button");
  prev.className = "pagination__btn";
  prev.type = "button";
  prev.textContent = "←";
  if (current === 1) prev.disabled = true;
  else prev.addEventListener("click", () => onPage(current - 1));
  container.appendChild(prev);

  for (let i = 1; i <= total; i++) {
    const btn = document.createElement("button");
    btn.className = `pagination__btn ${i === current ? "is-active" : ""}`;
    btn.type = "button";
    btn.textContent = i.toString();
    if (i === current) btn.disabled = true;
    else btn.addEventListener("click", () => onPage(i));
    container.appendChild(btn);
  }

  const next = document.createElement("button");
  next.className = "pagination__btn";
  next.type = "button";
  next.textContent = "→";
  if (current === total) next.disabled = true;
  else next.addEventListener("click", () => onPage(current + 1));
  container.appendChild(next);
}

// Auto-init
function bootFilters() {
  initKegiatanFilter();
  initProjectsFilter();
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootFilters);
  } else {
    bootFilters();
  }
  document.addEventListener("astro:page-load", bootFilters);
}
