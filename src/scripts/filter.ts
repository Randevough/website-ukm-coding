// filter.ts

// KEGIATAN PAGE LOGIC
export function initKegiatanFilter() {
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
    const url = new URL(window.location.href);
    currentCategory = url.searchParams.get("kategori") || "Semua";
    currentSearch = url.searchParams.get("q") || "";
    currentPage = parseInt(url.searchParams.get("page") || "1", 10);
  }

  function render() {
    // 1. Filter
    const filtered = allItems.filter((el) => {
      const cat = el.getAttribute("data-kategori") || "";
      const title = el.getAttribute("data-title") || "";

      const matchCat = currentCategory === "Semua" || cat.toLowerCase() === currentCategory.toLowerCase();
      const matchSearch = title.includes(currentSearch.toLowerCase());

      return matchCat && matchSearch;
    });

    // 2. Paginate
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

    // 3. Render Items
    majorContainer!.innerHTML = "";
    minorContainer!.innerHTML = "";

    paginated.forEach((el, index) => {
      const clone = el.cloneNode(true) as HTMLElement;
      if (index < 3) {
        majorContainer!.appendChild(clone);
      } else {
        minorContainer!.appendChild(clone);
      }
    });

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
      window.scrollTo({
        top:
          document.querySelector(".filterbar")!.getBoundingClientRect().top +
          window.scrollY -
          100,
        behavior: "smooth",
      });
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
    const url = new URL(window.location.href);
    currentCategory = url.searchParams.get("kategori") || "Semua";
    currentSort = url.searchParams.get("sort") || "Terbaru";
    currentPage = parseInt(url.searchParams.get("page") || "1", 10);
  }

  function render() {
    // 1. Filter
    const filtered = allItems.filter((el) => {
      const cat = el.getAttribute("data-kategori") || "";
      return currentCategory === "Semua" || cat.toLowerCase() === currentCategory.toLowerCase();
    });

    // 2. Sort
    filtered.sort((a, b) => {
      if (currentSort === "Nama A–Z") {
        return (a.getAttribute("data-title") || "").localeCompare(
          b.getAttribute("data-title") || "",
        );
      } else if (currentSort === "Terlama") {
        return (
          new Date(a.getAttribute("data-date") || 0).getTime() -
          new Date(b.getAttribute("data-date") || 0).getTime()
        );
      } else {
        // Terbaru (Default)
        return (
          new Date(b.getAttribute("data-date") || 0).getTime() -
          new Date(a.getAttribute("data-date") || 0).getTime()
        );
      }
    });

    // 3. Paginate
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

    // 4. Render Items
    gridContainer!.innerHTML = "";
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
      window.scrollTo({
        top:
          document.querySelector(".filterbar")!.getBoundingClientRect().top +
          window.scrollY -
          100,
        behavior: "smooth",
      });
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

function renderPagination(
  container: Element | null,
  current: number,
  total: number,
  onPage: (p: number) => void,
) {
  if (!container) return;
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
document.addEventListener("DOMContentLoaded", () => {
  initKegiatanFilter();
  initProjectsFilter();
});
