import {
  filterByCategory,
  filterBySearch,
  sortItems,
  paginateItems,
} from "../lib/content/queryEngine";

export function initKegiatanFilter() {
  if (typeof document === "undefined") return;

  const filterChips = document.querySelectorAll("#postChips .chip");
  const cselect = document.getElementById("mobilePostDropdown");
  const cselectValue = document.getElementById("mobilePostDropdownValue");
  const cselectOpts = cselect?.querySelectorAll(".cselect__opt") as
    NodeListOf<HTMLElement> | undefined;
  const searchInput = document.querySelector(".search") as HTMLInputElement;
  const gridContainer = document.getElementById("postGrid");
  const paginationContainer = document.querySelector("[data-pagination]");

  if (!gridContainer || !filterChips.length) return;

  const ITEMS_PER_PAGE = 7; // 3 major, 4 minor
  let currentPage = 1;
  let currentCategory = "Semua";
  let currentSearch = "";
  let currentYear = "Semua";

  const timeframeDropdown = document.getElementById("timeframeDropdown");
  const timeframeValue = document.getElementById("timeframeValue");
  const timeframeOpts = timeframeDropdown?.querySelectorAll(".cselect__opt") as
    NodeListOf<HTMLElement> | undefined;

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

    if (currentYear !== "Semua") url.searchParams.set("tahun", currentYear);
    else url.searchParams.delete("tahun");

    if (currentPage > 1) url.searchParams.set("page", currentPage.toString());
    else url.searchParams.delete("page");

    window.history.replaceState({}, "", url);
  }

  function readURL() {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    currentCategory = url.searchParams.get("kategori") || "Semua";
    currentSearch = url.searchParams.get("q") || "";
    currentYear = url.searchParams.get("tahun") || "Semua";
    currentPage = parseInt(url.searchParams.get("page") || "1", 10);
  }

  let renderTimeout: ReturnType<typeof setTimeout> | null = null;

  function render(skipSkeleton = false) {
    const catFiltered = filterByCategory(
      allItems,
      currentCategory,
      (el) => el.getAttribute("data-kategori") || "",
    );
    const yearFiltered =
      currentYear === "Semua"
        ? catFiltered
        : catFiltered.filter((el) => {
            const yr = el.getAttribute("data-date") || "";
            return yr === currentYear || yr === `Tahun ${currentYear}`;
          });
    const searchFiltered = filterBySearch(
      yearFiltered,
      currentSearch,
      (el) => el.getAttribute("data-title") || "",
    );

    const {
      paginated,
      totalPages,
      currentPage: clampedPage,
    } = paginateItems(searchFiltered, currentPage, ITEMS_PER_PAGE);
    currentPage = clampedPage;

    if (renderTimeout) clearTimeout(renderTimeout);

    const skeletonTemplate = document.getElementById(
      "skeleton-posts-template",
    ) as HTMLTemplateElement;

    if (!skipSkeleton && skeletonTemplate) {
      gridContainer!.innerHTML = "";
      const skeletonCount = Math.min(
        ITEMS_PER_PAGE,
        searchFiltered.length || ITEMS_PER_PAGE,
      );
      for (let i = 0; i < (skeletonCount === 0 ? 3 : skeletonCount); i++) {
        gridContainer!.appendChild(skeletonTemplate.content.cloneNode(true));
      }
    }

    const delay = skipSkeleton ? 0 : 2500;

    renderTimeout = setTimeout(() => {
      gridContainer!.innerHTML = "";

      if (paginated.length === 0) {
        const emptyTemplate = document.getElementById(
          "empty-state-template",
        ) as HTMLTemplateElement;
        if (emptyTemplate) {
          gridContainer!.appendChild(emptyTemplate.content.cloneNode(true));
        }
      } else {
        paginated.forEach((el) => {
          const clone = el.cloneNode(true) as HTMLElement;
          clone.classList.add("is-revealed");
          clone.removeAttribute("data-reveal");
          clone.querySelectorAll("[data-reveal]").forEach((el) => {
            el.classList.add("is-revealed");
            el.removeAttribute("data-reveal");
          });
          gridContainer!.appendChild(clone);
        });
      }
    }, delay);

    filterChips.forEach((chip) => {
      const cat = chip.getAttribute("data-category");
      chip.classList.toggle("is-active", cat === currentCategory);
      chip.removeAttribute("disabled");
    });

    if (cselectValue) {
      cselectValue.textContent = `Kategori: ${currentCategory}`;
    }
    if (cselectOpts) {
      cselectOpts.forEach((opt) => {
        const val = opt.getAttribute("data-value") || "";
        const matches = val === currentCategory;
        opt.classList.toggle("is-selected", matches);
        opt.setAttribute("aria-selected", String(matches));
      });
    }

    if (timeframeValue) {
      timeframeValue.textContent =
        currentYear === "Semua" ? "Semua Waktu" : `Tahun ${currentYear}`;
    }
    if (timeframeOpts) {
      timeframeOpts.forEach((opt) => {
        const val = opt.getAttribute("data-value") || "";
        const matches =
          val === "Semua Waktu"
            ? currentYear === "Semua"
            : val === `Tahun ${currentYear}`;
        opt.classList.toggle("is-selected", matches);
        opt.setAttribute("aria-selected", String(matches));
      });
    }

    if (searchInput) {
      searchInput.value = currentSearch;
      searchInput.removeAttribute("disabled");
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
      currentCategory = chip.getAttribute("data-category") || "Semua";
      currentPage = 1;
      updateURL();
      render();
    });
  });

  if (cselect) {
    cselect.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = cselect.classList.toggle("is-open");
      cselect.setAttribute("aria-expanded", String(isOpen));
    });

    cselect.addEventListener("keydown", (e) => {
      if ((e as KeyboardEvent).key === "Escape") {
        cselect.classList.remove("is-open");
        cselect.setAttribute("aria-expanded", "false");
      }
    });

    cselectOpts?.forEach((opt) => {
      opt.addEventListener("click", (e) => {
        e.stopPropagation();
        currentCategory = opt.getAttribute("data-value") || "Semua";
        cselect.classList.remove("is-open");
        cselect.setAttribute("aria-expanded", "false");
        currentPage = 1;
        updateURL();
        render();
      });
    });

    document.addEventListener("click", (e) => {
      if (!cselect.contains(e.target as Node)) {
        cselect.classList.remove("is-open");
        cselect.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (timeframeDropdown) {
    timeframeDropdown.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = timeframeDropdown.classList.toggle("is-open");
      timeframeDropdown.setAttribute("aria-expanded", String(isOpen));
    });

    timeframeDropdown.addEventListener("keydown", (e) => {
      if ((e as KeyboardEvent).key === "Escape") {
        timeframeDropdown.classList.remove("is-open");
        timeframeDropdown.setAttribute("aria-expanded", "false");
      }
    });

    timeframeOpts?.forEach((opt) => {
      opt.addEventListener("click", (e) => {
        e.stopPropagation();
        const val = opt.getAttribute("data-value") || "Semua Waktu";
        currentYear =
          val === "Semua Waktu" ? "Semua" : val.replace("Tahun ", "");
        timeframeDropdown.classList.remove("is-open");
        timeframeDropdown.setAttribute("aria-expanded", "false");
        currentPage = 1;
        updateURL();
        render();
      });
    });

    document.addEventListener("click", (e) => {
      if (!timeframeDropdown.contains(e.target as Node)) {
        timeframeDropdown.classList.remove("is-open");
        timeframeDropdown.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearch = (e.target as HTMLInputElement).value;
      currentPage = 1;
      updateURL();
      render();
    });
  }

  readURL();
  render(true);
}

export function initProjectsFilter() {
  if (typeof document === "undefined") return;

  const filterChips = document.querySelectorAll("#projectChips .chip");
  const cselect = document.getElementById("timeframeDropdown");
  const cselectValue = document.getElementById("timeframeValue");
  const cselectOpts = cselect?.querySelectorAll(".cselect__opt") as
    NodeListOf<HTMLElement> | undefined;
  const mobileCatSelect = document.getElementById("mobileCatDropdown");
  const mobileCatValue = document.getElementById("mobileCatDropdownValue");
  const mobileCatOpts = mobileCatSelect?.querySelectorAll(".cselect__opt") as
    NodeListOf<HTMLElement> | undefined;
  const searchInput = document.querySelector(".search") as HTMLInputElement;
  const gridContainer = document.getElementById("projectGrid");
  const paginationContainer = document.querySelector("[data-pagination]");

  if (!gridContainer || !filterChips.length) return;

  const ITEMS_PER_PAGE = 10;
  let currentPage = 1;
  let currentCategory = "Semua";
  let currentSort = "Terbaru";
  let currentYear = "Semua";
  let currentSearch = "";

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

    if (currentYear !== "Semua") url.searchParams.set("tahun", currentYear);
    else url.searchParams.delete("tahun");

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
    currentSort = url.searchParams.get("sort") || "Terbaru";
    currentYear = url.searchParams.get("tahun") || "Semua";
    currentSearch = url.searchParams.get("q") || "";
    currentPage = parseInt(url.searchParams.get("page") || "1", 10);
  }

  let renderTimeout: ReturnType<typeof setTimeout> | null = null;

  function render(skipSkeleton = false) {
    const filtered = filterByCategory(
      allItems,
      currentCategory,
      (el) => el.getAttribute("data-kategori") || "",
    );

    const yearFiltered =
      currentYear === "Semua"
        ? filtered
        : filtered.filter((el) => {
            const yr = el.getAttribute("data-date") || "";
            return yr === currentYear || yr === `Tahun ${currentYear}`;
          });

    const searchFiltered = filterBySearch(
      yearFiltered,
      currentSearch,
      (el) => el.getAttribute("data-title") || "",
    );

    const sorted = sortItems(searchFiltered, currentSort, (el) => ({
      title: el.getAttribute("data-title") || "",
      date: el.getAttribute("data-date") || 0,
    }));

    const {
      paginated,
      totalPages,
      currentPage: clampedPage,
    } = paginateItems(sorted, currentPage, ITEMS_PER_PAGE);
    currentPage = clampedPage;

    if (renderTimeout) clearTimeout(renderTimeout);

    const skeletonTemplate = document.getElementById(
      "skeleton-projects-template",
    ) as HTMLTemplateElement;

    if (!skipSkeleton && skeletonTemplate) {
      gridContainer!.innerHTML = "";
      const skeletonCount = Math.min(
        ITEMS_PER_PAGE,
        sorted.length || ITEMS_PER_PAGE,
      );
      for (let i = 0; i < (skeletonCount === 0 ? 3 : skeletonCount); i++) {
        gridContainer!.appendChild(skeletonTemplate.content.cloneNode(true));
      }
    }

    const delay = skipSkeleton ? 0 : 2500;

    renderTimeout = setTimeout(() => {
      gridContainer!.innerHTML = "";
      if (paginated.length === 0) {
        const emptyTemplate = document.getElementById(
          "empty-state-template",
        ) as HTMLTemplateElement;
        if (emptyTemplate) {
          gridContainer!.appendChild(emptyTemplate.content.cloneNode(true));
        }
      } else {
        paginated.forEach((el) => {
          const clone = el.cloneNode(true) as HTMLElement;
          clone.classList.add("is-revealed");
          clone.removeAttribute("data-reveal");
          clone.querySelectorAll("[data-reveal]").forEach((el) => {
            el.classList.add("is-revealed");
            el.removeAttribute("data-reveal");
          });
          gridContainer!.appendChild(clone);
        });
      }
    }, delay);

    filterChips.forEach((chip) => {
      chip.classList.toggle("is-active", chip.textContent === currentCategory);
      chip.removeAttribute("disabled");
    });
    // Sync mobile category dropdown label
    if (mobileCatValue) {
      mobileCatValue.textContent = currentCategory;
    }
    if (mobileCatOpts) {
      mobileCatOpts.forEach((opt) => {
        const val = opt.getAttribute("data-value") || "";
        const matches = val === currentCategory;
        opt.classList.toggle("is-selected", matches);
        opt.setAttribute("aria-selected", String(matches));
      });
    }

    if (cselectValue) {
      cselectValue.textContent =
        currentYear === "Semua" ? "Semua Waktu" : `Tahun ${currentYear}`;
    }
    if (cselectOpts) {
      cselectOpts.forEach((opt) => {
        const val = opt.getAttribute("data-value") || "";
        const matches =
          val === "Semua Waktu"
            ? currentYear === "Semua"
            : val === `Tahun ${currentYear}`;
        opt.classList.toggle("is-selected", matches);
        opt.setAttribute("aria-selected", String(matches));
      });
    }

    if (searchInput) {
      searchInput.value = currentSearch;
      searchInput.removeAttribute("disabled");
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

  // Custom dropdown interactions
  if (cselect) {
    // Toggle open
    cselect.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = cselect.classList.toggle("is-open");
      cselect.setAttribute("aria-expanded", String(isOpen));
    });

    // Keyboard: Escape closes
    cselect.addEventListener("keydown", (e) => {
      if ((e as KeyboardEvent).key === "Escape") {
        cselect.classList.remove("is-open");
        cselect.setAttribute("aria-expanded", "false");
      }
    });

    // Option selection
    cselectOpts?.forEach((opt) => {
      opt.addEventListener("click", (e) => {
        e.stopPropagation();
        const val = opt.getAttribute("data-value") || "Semua Waktu";
        currentYear =
          val === "Semua Waktu" ? "Semua" : val.replace("Tahun ", "");
        cselect.classList.remove("is-open");
        cselect.setAttribute("aria-expanded", "false");
        currentPage = 1;
        updateURL();
        render();
      });
    });

    // Click outside to close
    document.addEventListener("click", (e) => {
      if (!cselect.contains(e.target as Node)) {
        cselect.classList.remove("is-open");
        cselect.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Mobile category dropdown
  if (mobileCatSelect) {
    mobileCatSelect.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = mobileCatSelect.classList.toggle("is-open");
      mobileCatSelect.setAttribute("aria-expanded", String(isOpen));
    });

    mobileCatSelect.addEventListener("keydown", (e) => {
      if ((e as KeyboardEvent).key === "Escape") {
        mobileCatSelect.classList.remove("is-open");
        mobileCatSelect.setAttribute("aria-expanded", "false");
      }
    });

    mobileCatOpts?.forEach((opt) => {
      opt.addEventListener("click", (e) => {
        e.stopPropagation();
        currentCategory = opt.getAttribute("data-value") || "Semua";
        mobileCatSelect.classList.remove("is-open");
        mobileCatSelect.setAttribute("aria-expanded", "false");
        currentPage = 1;
        updateURL();
        render();
      });
    });

    document.addEventListener("click", (e) => {
      if (!mobileCatSelect.contains(e.target as Node)) {
        mobileCatSelect.classList.remove("is-open");
        mobileCatSelect.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearch = (e.target as HTMLInputElement).value;
      currentPage = 1;
      updateURL();
      render();
    });
  }

  readURL();
  render(true);
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
  prev.setAttribute("aria-label", "Halaman sebelumnya");
  prev.innerHTML = '<span class="arrow" aria-hidden="true">←</span>';
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
  next.setAttribute("aria-label", "Halaman selanjutnya");
  next.innerHTML = '<span class="arrow" aria-hidden="true">→</span>';
  if (current === total) next.disabled = true;
  else next.addEventListener("click", () => onPage(current + 1));
  container.appendChild(next);
}

function bootFilters() {
  initKegiatanFilter();
  initProjectsFilter();
}

if (typeof document !== "undefined") {
  document.addEventListener("astro:page-load", bootFilters);
}
