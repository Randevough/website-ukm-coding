/**
 * Cursor-aligned grid reveal.
 *
 * A single delegated controller is intentionally used instead of per-page or
 * per-element listeners. It survives Astro ClientRouter DOM swaps and always
 * measures the grid that is currently in the live document.
 */

const SECTION_SELECTOR = ".hero--v2, .pagehead";
const GRID_SELECTOR = "grid-reveal.hero__grid, grid-reveal.pagehead__grid";
const CONTROLLER_KEY = Symbol.for("ukm-coding.grid-reveal-controller");

type GridRevealController = { destroy: () => void };
type WindowWithGridController = Window & {
  [CONTROLLER_KEY]?: GridRevealController;
};

function installGridReveal(): GridRevealController {
  const abortController = new AbortController();
  const { signal } = abortController;

  let pointerX = 0;
  let pointerY = 0;
  let hasPointer = false;
  let activeGrid: HTMLElement | null = null;
  let frameId = 0;
  let pageLoadFrame1 = 0;
  let pageLoadFrame2 = 0;

  const hideActiveGrid = () => {
    activeGrid?.removeAttribute("data-grid-active");
    activeGrid = null;
  };

  const sectionAtPointer = (): HTMLElement | null => {
    if (!hasPointer) return null;

    const hit = document.elementFromPoint(pointerX, pointerY);
    return hit?.closest<HTMLElement>(SECTION_SELECTOR) ?? null;
  };

  const render = () => {
    frameId = 0;

    const section = sectionAtPointer();
    const grid = section?.querySelector<HTMLElement>(GRID_SELECTOR) ?? null;

    if (!grid || !grid.isConnected) {
      hideActiveGrid();
      return;
    }

    /*
     * The radial-gradient coordinates belong to the grid's own border box,
     * not to the section. Measuring the grid therefore includes inset: -15%
     * automatically. The scale correction also keeps coordinates accurate if
     * an ancestor is temporarily transformed/scaled.
     */
    const rect = grid.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) {
      hideActiveGrid();
      return;
    }

    const scaleX = grid.offsetWidth > 0 ? rect.width / grid.offsetWidth : 1;
    const scaleY = grid.offsetHeight > 0 ? rect.height / grid.offsetHeight : 1;
    const localX = (pointerX - rect.left) / scaleX;
    const localY = (pointerY - rect.top) / scaleY;

    grid.style.setProperty("--hero-mx", `${localX.toFixed(2)}px`);
    grid.style.setProperty("--hero-my", `${localY.toFixed(2)}px`);

    if (activeGrid !== grid) {
      hideActiveGrid();
      activeGrid = grid;
    }

    // Set coordinates before revealing to prevent a one-frame flash.
    grid.setAttribute("data-grid-active", "");
  };

  const scheduleRender = () => {
    if (frameId === 0) frameId = requestAnimationFrame(render);
  };

  const onPointerMove = (event: PointerEvent) => {
    // The effect is mouse/trackpad-only; ignore touch and pen input.
    if (event.pointerType && event.pointerType !== "mouse") return;

    pointerX = event.clientX;
    pointerY = event.clientY;
    hasPointer = true;
    scheduleRender();
  };

  const onPointerLeavesDocument = (event: MouseEvent) => {
    if (event.relatedTarget !== null) return;
    hasPointer = false;
    hideActiveGrid();
  };

  const onGeometryChange = () => {
    // Re-measure after scrolling/resizing even when the pointer is stationary.
    scheduleRender();
  };

  const onBeforeSwap = () => {
    hideActiveGrid();
    if (frameId !== 0) cancelAnimationFrame(frameId);
    frameId = 0;
  };

  const onPageLoad = () => {
    /*
     * Astro has inserted the new DOM at this point. Two frames let layout and
     * transition styles settle, then the last known viewport pointer position
     * is resolved against the new page—even if the mouse did not move.
     */
    cancelAnimationFrame(pageLoadFrame1);
    cancelAnimationFrame(pageLoadFrame2);
    pageLoadFrame1 = requestAnimationFrame(() => {
      pageLoadFrame2 = requestAnimationFrame(scheduleRender);
    });
  };

  document.addEventListener("pointermove", onPointerMove, {
    passive: true,
    capture: true,
    signal,
  });
  document.addEventListener("mouseout", onPointerLeavesDocument, { signal });
  document.addEventListener("scroll", onGeometryChange, {
    passive: true,
    capture: true,
    signal,
  });
  window.addEventListener("resize", onGeometryChange, {
    passive: true,
    signal,
  });
  window.addEventListener("blur", hideActiveGrid, { signal });
  document.addEventListener("astro:before-swap", onBeforeSwap, { signal });
  document.addEventListener("astro:page-load", onPageLoad, { signal });

  // Handles the initial non-SPA page load.
  onPageLoad();

  return {
    destroy() {
      abortController.abort();
      cancelAnimationFrame(frameId);
      cancelAnimationFrame(pageLoadFrame1);
      cancelAnimationFrame(pageLoadFrame2);
      hideActiveGrid();
    },
  };
}

if (typeof window !== "undefined" && typeof document !== "undefined") {
  const runtimeWindow = window as WindowWithGridController;

  // Astro may execute this module again after a routed navigation. Replacing
  // the old controller makes initialization idempotent and prevents duplicates.
  runtimeWindow[CONTROLLER_KEY]?.destroy();
  runtimeWindow[CONTROLLER_KEY] = installGridReveal();
}
