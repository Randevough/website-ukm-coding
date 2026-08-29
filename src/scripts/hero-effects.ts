/**
 * Grid FX controller.
 *
 * Tugasnya cuma satu: mem-pause animasi yang tidak sedang dilihat.
 * Tidak ada perhitungan per frame di sini, tidak ada requestAnimationFrame,
 * dan tidak ada listener pointer. Seluruh gerakan dikerjakan oleh compositor
 * lewat CSS di styles/components/hero-effects.css.
 *
 * Yang di-pause:
 * - .grid-fx dan .ticker yang keluar viewport (IntersectionObserver)
 * - seluruh halaman saat tab tidak aktif (visibilitychange)
 * - seluruh halaman selama ViewTransition (astro:before-swap)
 *
 * Script ini aman terhadap Astro ViewTransitions. Bundled script hanya
 * dieksekusi SEKALI per sesi, jadi state-nya disimpan di window.__gridReveal
 * dan DOM di-scan ulang setiap kali ditukar.
 */

const PAUSE_CLASS = "is-anim-paused";
const SWAPPED_CLASS = "is-swapped";
const TARGET_SELECTOR = ".grid-fx, .ticker, [data-anim-pause]";
const OBSERVED_ATTR = "data-anim-observed";

export type GridFxApi = {
  /** Scan ulang DOM dan sinkronkan status pause. */
  reinstall: () => void;
  /** Lepas semua observer dan listener. */
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

  /**
   * Daftarkan elemen animasi yang belum terdaftar. Elemen baru dimulai dalam
   * kondisi paused, lalu IntersectionObserver yang membukanya. Jadi tidak ada
   * satu frame pun yang teranimasi di luar layar.
   */
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

  /**
   * Sebelum DOM ditukar: pause semuanya supaya browser tidak perlu
   * meng-composite layer yang sedang bergerak saat mengambil snapshot view
   * transition, dan lepas observer supaya elemen lama tidak ditahan di memori.
   */
  function onBeforeSwap(): void {
    root.classList.add(PAUSE_CLASS);
    /* Setelah navigasi pertama, ViewTransitions yang memegang animasi halaman,
       jadi animasi #page milik situs dimatikan agar tidak dobel. */
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

  /* Jaring pengaman: kalau event Astro tidak sampai karena alasan apa pun,
     pergantian <body> tetap terdeteksi. documentElement tidak pernah diganti,
     dan childList tanpa subtree biayanya nyaris nol. */
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
