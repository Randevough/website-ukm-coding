// Grid effects and off-screen animation pause controller

const PAUSE_CLASS = "is-anim-paused";
const SWAPPED_CLASS = "is-swapped";
const TARGET_SELECTOR = ".grid-fx, .ticker, [data-anim-pause]";
const OBSERVED_ATTR = "data-anim-observed";

export type GridFxApi = {
  /** Rescan DOM and synchronize pause status. */
  reinstall: () => void;
  /** Disconnect all observers and listeners. */
  destroy: () => void;
};

type Teardown = () => void;

function install(): GridFxApi {
  const doc = document;
  const root = doc.documentElement;
  const teardowns: Teardown[] = [];

  let io: IntersectionObserver | null = null;

  function listen(
    target: Document | Window,
    type: string,
    handler: EventListener,
  ): void {
    target.addEventListener(type, handler);
    teardowns.push(() => target.removeEventListener(type, handler));
  }

  function onIntersect(entries: IntersectionObserverEntry[]): void {
    for (let i = 0; i < entries.length; i += 1) {
      const entry = entries[i];
      const el = entry.target as HTMLElement;
      if (entry.isIntersecting) {
        el.classList.remove(PAUSE_CLASS);
      } else {
        el.classList.add(PAUSE_CLASS);
      }
    }
  }

  // Register unobserved animation elements and pause off-screen nodes
  function scan(): void {
    if (typeof IntersectionObserver !== "function") return;

    if (!io) {
      io = new IntersectionObserver(onIntersect, { rootMargin: "120px" });
    }

    const nodes = doc.querySelectorAll(TARGET_SELECTOR);
    for (let i = 0; i < nodes.length; i += 1) {
      const el = nodes[i] as HTMLElement;
      if (el.getAttribute(OBSERVED_ATTR) === "1") continue;
      el.setAttribute(OBSERVED_ATTR, "1");
      el.classList.add(PAUSE_CLASS);
      io.observe(el);
    }
  }

  function syncDocumentState(): void {
    if (doc.hidden) {
      root.classList.add(PAUSE_CLASS);
    } else {
      root.classList.remove(PAUSE_CLASS);
    }
  }

  function refresh(): void {
    scan();
    syncDocumentState();
  }

  // Pause animations and disconnect observer before DOM swap
  function onBeforeSwap(): void {
    root.classList.add(PAUSE_CLASS);
    // Disable initial entry animation after navigation
    root.classList.add(SWAPPED_CLASS);
    if (io) {
      io.disconnect();
      io = null;
    }
  }

  listen(doc, "visibilitychange", syncDocumentState as EventListener);
  listen(doc, "astro:before-swap", onBeforeSwap as EventListener);
  listen(doc, "astro:after-swap", refresh as EventListener);
  listen(doc, "astro:page-load", refresh as EventListener);
  listen(window, "pageshow", refresh as EventListener);

  // Fallback observer for DOM changes during client-side navigation
  if (typeof MutationObserver === "function") {
    const mo = new MutationObserver(() => {
      refresh();
    });
    mo.observe(root, { childList: true });
    teardowns.push(() => mo.disconnect());
  }

  refresh();

  function destroy(): void {
    for (let i = 0; i < teardowns.length; i += 1) teardowns[i]();
    teardowns.length = 0;
    if (io) {
      io.disconnect();
      io = null;
    }
  }

  return { reinstall: refresh, destroy: destroy };
}

declare global {
  interface Window {
    __gridReveal?: GridFxApi;
  }
}

if (typeof window !== "undefined" && typeof document !== "undefined") {
  const existing = window.__gridReveal;
  if (existing) {
    existing.reinstall();
  } else {
    window.__gridReveal = install();
  }
}
