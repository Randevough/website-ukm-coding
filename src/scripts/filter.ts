import {
  filterByCategory,
  filterBySearch,
  sortItems,
  paginateItems,
} from "../lib/content/queryEngine";

function bindCustomSelect(
  selectEl: HTMLElement | null,
  onSelect: (value: string) => void,
) {
  if (!selectEl) return;

  selectEl.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = selectEl.classList.toggle("is-open");
    selectEl.setAttribute("aria-expanded", String(isOpen));
  });

  selectEl.addEventListener("keydown", (e) => {
    if ((e as KeyboardEvent).key === "Escape") {
      selectEl.classList.remove("is-open");
      selectEl.setAttribute("aria-expanded", "false");
    }
  });

  const opts = selectEl.querySelectorAll(".cselect__opt");
  opts.forEach((opt) => {
    opt.addEventListener("click", (e) => {
      e.stopPropagation();
      selectEl.classList.remove("is-open");
      selectEl.setAttribute("aria-expanded", "false");
      onSelect(opt.getAttribute("data-value") || "");
    });
  });

  document.addEventListener("click", (e) => {
    if (!selectEl.contains(e.target as Node)) {
      selectEl.classList.remove("is-open");
      selectEl.setAttribute("aria-expanded", "false");
    }
  });
}

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

  const ITEMS_PER_PAGE = 6;
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
    if (currentCategory !== "Semua") {
      url.searchParams.set("kategori", currentCategory);
    } else {
      url.searchParams.delete("kategori");
    }

    if (currentSearch) {
      url.searchParams.set("q", currentSearch);
    } else {
      url.searchParams.delete("q");
    }

    if (currentYear !== "Semua") {
      url.searchParams.set("tahun", currentYear);
    } else {
      url.searchParams.delete("tahun");
    }

    if (currentPage > 1) {
      url.searchParams.set("page", currentPage.toString());
    } else {
      url.searchParams.delete("page");
    }

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

    const commitDOM = () => {
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
          clone.querySelectorAll("[data-reveal]").forEach((child) => {
            child.classList.add("is-revealed");
            child.removeAttribute("data-reveal");
          });
          gridContainer!.appendChild(clone);
        });
      }
    };

    if (skipSkeleton || !skeletonTemplate) {
      commitDOM();
    } else {
      gridContainer!.innerHTML = "";
      const skeletonCount = Math.min(
        ITEMS_PER_PAGE,
        searchFiltered.length || ITEMS_PER_PAGE,
      );
      for (let i = 0; i < (skeletonCount === 0 ? 3 : skeletonCount); i++) {
        gridContainer!.appendChild(skeletonTemplate.content.cloneNode(true));
      }
      renderTimeout = setTimeout(commitDOM, 100);
    }

    filterChips.forEach((chip) => {
      const cat = chip.getAttribute("data-category");
      chip.classList.toggle("is-active", cat === currentCategory);
      chip.removeAttribute("disabled");
    });

    if (cselectValue) {
      cselectValue.textContent = currentCategory;
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

  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      currentCategory = chip.getAttribute("data-category") || "Semua";
      currentPage = 1;
      updateURL();
      render();
    });
  });

  bindCustomSelect(cselect, (val) => {
    currentCategory = val || "Semua";
    currentPage = 1;
    updateURL();
    render();
  });

  bindCustomSelect(timeframeDropdown, (val) => {
    const rawVal = val || "Semua Waktu";
    currentYear =
      rawVal === "Semua Waktu" ? "Semua" : rawVal.replace("Tahun ", "");
    currentPage = 1;
    updateURL();
    render();
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

  const ITEMS_PER_PAGE = 6;
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
    if (currentCategory !== "Semua") {
      url.searchParams.set("kategori", currentCategory);
    } else {
      url.searchParams.delete("kategori");
    }

    if (currentSort !== "Terbaru") {
      url.searchParams.set("sort", currentSort);
    } else {
      url.searchParams.delete("sort");
    }

    if (currentYear !== "Semua") {
      url.searchParams.set("tahun", currentYear);
    } else {
      url.searchParams.delete("tahun");
    }

    if (currentSearch) {
      url.searchParams.set("q", currentSearch);
    } else {
      url.searchParams.delete("q");
    }

    if (currentPage > 1) {
      url.searchParams.set("page", currentPage.toString());
    } else {
      url.searchParams.delete("page");
    }

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

    const commitDOM = () => {
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
          clone.querySelectorAll("[data-reveal]").forEach((child) => {
            child.classList.add("is-revealed");
            child.removeAttribute("data-reveal");
          });
          gridContainer!.appendChild(clone);
        });
      }
    };

    if (skipSkeleton || !skeletonTemplate) {
      commitDOM();
    } else {
      gridContainer!.innerHTML = "";
      const skeletonCount = Math.min(
        ITEMS_PER_PAGE,
        sorted.length || ITEMS_PER_PAGE,
      );
      for (let i = 0; i < (skeletonCount === 0 ? 3 : skeletonCount); i++) {
        gridContainer!.appendChild(skeletonTemplate.content.cloneNode(true));
      }
      renderTimeout = setTimeout(commitDOM, 100);
    }

    filterChips.forEach((chip) => {
      chip.classList.toggle("is-active", chip.textContent === currentCategory);
      chip.removeAttribute("disabled");
    });

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

  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      currentCategory = chip.textContent || "Semua";
      currentPage = 1;
      updateURL();
      render();
    });
  });

  bindCustomSelect(cselect, (val) => {
    const rawVal = val || "Semua Waktu";
    currentYear =
      rawVal === "Semua Waktu" ? "Semua" : rawVal.replace("Tahun ", "");
    currentPage = 1;
    updateURL();
    render();
  });

  bindCustomSelect(mobileCatSelect, (val) => {
    currentCategory = val || "Semua";
    currentPage = 1;
    updateURL();
    render();
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

  const pad = (n: number) =>
    total < 100 ? String(n).padStart(2, "0") : String(n);

  // Segmented instrument console bar
  const bar = document.createElement("div");
  bar.className = "pagination__bar";
  bar.setAttribute("role", "navigation");
  bar.setAttribute("aria-label", "Navigasi halaman");

  // Prev Button
  const prev = document.createElement("button");
  prev.className = "pagination__btn pagination__btn--prev";
  prev.type = "button";
  prev.setAttribute("aria-label", "Halaman sebelumnya");
  prev.innerHTML =
    '<span class="arrow" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></span>';
  if (current === 1) {
    prev.disabled = true;
  } else {
    prev.addEventListener("click", () => onPage(current - 1));
  }
  bar.appendChild(prev);

  // Page Numbers with smart truncation if total > 7
  const getPageItems = (curr: number, max: number): (number | "...")[] => {
    if (max <= 7) {
      return Array.from({ length: max }, (_, i) => i + 1);
    }
    if (curr <= 4) {
      return [1, 2, 3, 4, 5, "...", max];
    }
    if (curr >= max - 3) {
      return [1, "...", max - 4, max - 3, max - 2, max - 1, max];
    }
    return [1, "...", curr - 1, curr, curr + 1, "...", max];
  };

  const pageItems = getPageItems(current, total);
  for (const item of pageItems) {
    if (item === "...") {
      const ellipsis = document.createElement("span");
      ellipsis.className = "pagination__ellipsis";
      ellipsis.textContent = "…";
      ellipsis.setAttribute("aria-hidden", "true");
      bar.appendChild(ellipsis);
    } else {
      const btn = document.createElement("button");
      const isActive = item === current;
      btn.className = `pagination__btn pagination__btn--num ${isActive ? "is-active" : ""}`;
      btn.type = "button";
      btn.textContent = pad(item);
      btn.setAttribute("aria-label", `Halaman ${item}`);
      if (isActive) {
        btn.setAttribute("aria-current", "page");
        btn.disabled = true;
      } else {
        btn.addEventListener("click", () => onPage(item));
      }
      bar.appendChild(btn);
    }
  }

  // Next Button
  const next = document.createElement("button");
  next.className = "pagination__btn pagination__btn--next";
  next.type = "button";
  next.setAttribute("aria-label", "Halaman selanjutnya");
  next.innerHTML =
    '<span class="arrow" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>';
  if (current === total) {
    next.disabled = true;
  } else {
    next.addEventListener("click", () => onPage(current + 1));
  }
  bar.appendChild(next);

  container.appendChild(bar);
}

function bootFilters() {
  initKegiatanFilter();
  initProjectsFilter();
}

if (typeof document !== "undefined") {
  document.addEventListener("astro:page-load", bootFilters);
}
