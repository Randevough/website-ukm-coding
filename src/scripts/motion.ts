const isBrowser =
  typeof window !== "undefined" && typeof document !== "undefined";

const reduce =
  isBrowser && typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

const qsa = (sel: string, root?: Element | Document): HTMLElement[] => {
  if (!isBrowser && !root) return [];
  const scope = root || (isBrowser ? document : null);
  if (!scope || typeof scope.querySelectorAll !== "function") return [];
  return Array.prototype.slice.call(scope.querySelectorAll(sel));
};

let io: IntersectionObserver | null = null;

export function initReveal(root?: Element | Document) {
  if (!isBrowser && !root) return;
  const scope = root || document;
  const targets = qsa(
    "[data-reveal]:not(.is-in), [data-rule]:not(.is-in), .lineMask:not(.is-in)",
    scope,
  );
  if (!targets.length) return;

  if (reduce) {
    targets.forEach((el) => el.classList.add("is-in"));
    return;
  }

  if (typeof IntersectionObserver === "undefined") return;

  if (!io) {
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io!.unobserve(entry.target);
          setTimeout(() => {
            (entry.target as HTMLElement).style.removeProperty(
              "--reveal-delay",
            );
          }, 2000);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
  }

  qsa("[data-stagger]", scope).forEach((group) => {
    const step = parseInt(group.getAttribute("data-stagger") || "70", 10);
    qsa("[data-reveal], .lineMask", group).forEach((el, i) => {
      if (!(el as HTMLElement).style.getPropertyValue("--reveal-delay")) {
        (el as HTMLElement).style.setProperty(
          "--reveal-delay",
          i * step + "ms",
        );
      }
    });
  });

  targets.forEach((el) => io!.observe(el));
}

export function playHero(root?: Element | Document) {
  if (!isBrowser && !root) return;
  const scope = root || document;
  qsa(".lineMask", scope).forEach((el, i) => {
    if (!(el as HTMLElement).style.getPropertyValue("--reveal-delay")) {
      (el as HTMLElement).style.setProperty(
        "--reveal-delay",
        90 + i * 110 + "ms",
      );
    }
  });

  if (typeof requestAnimationFrame === "function") {
    requestAnimationFrame(() => {
      qsa(
        ".hero .lineMask, .hero [data-reveal], .hero [data-rule]",
        scope,
      ).forEach((el) => {
        el.classList.add("is-in");
        setTimeout(() => {
          (el as HTMLElement).style.removeProperty("--reveal-delay");
        }, 2000);
      });
    });
  }
}

let pxItems: { el: HTMLElement; speed: number }[] = [];
let pxTicking = false;

function collectParallax(root?: Element | Document) {
  if (!isBrowser && !root) return;
  pxItems = qsa("[data-parallax]", root || document).map((el: any) => ({
    el: el,
    speed: parseFloat(el.getAttribute("data-parallax") || "0.12"),
  }));
  if (pxItems.length) applyParallax();
}

function applyParallax() {
  if (!isBrowser) return;
  const vh = window.innerHeight;

  const writes: { el: HTMLElement; shift: number }[] = [];
  for (let i = 0; i < pxItems.length; i += 1) {
    const item = pxItems[i];
    const rect = item.el.getBoundingClientRect();
    if (rect.bottom < -200 || rect.top > vh + 200) continue;
    const offset = rect.top + rect.height / 2 - vh / 2;
    writes.push({ el: item.el, shift: -offset * item.speed });
  }

  for (let i = 0; i < writes.length; i += 1) {
    writes[i].el.style.transform =
      "translate3d(0," + writes[i].shift.toFixed(2) + "px,0)";
  }
}

function onScrollParallax() {
  if (pxTicking) return;
  pxTicking = true;
  if (typeof requestAnimationFrame === "function") {
    requestAnimationFrame(() => {
      applyParallax();
      pxTicking = false;
    });
  }
}

export function initParallax(root?: Element | Document) {
  if (!isBrowser || reduce) return;
  collectParallax(root);
  window.removeEventListener("scroll", onScrollParallax);
  window.removeEventListener("resize", onScrollParallax);
  window.addEventListener("scroll", onScrollParallax, { passive: true });
  window.addEventListener("resize", onScrollParallax, { passive: true });
}

export function initTilt(root?: Element | Document) {
  if (
    !isBrowser ||
    reduce ||
    (typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches)
  ) {
    return;
  }
  const scope = root || document;
  qsa("[data-tilt]", scope).forEach((card: any) => {
    let raf: number | null = null;
    const move = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      if (raf && typeof cancelAnimationFrame === "function") {
        cancelAnimationFrame(raf);
      }
      if (typeof requestAnimationFrame === "function") {
        raf = requestAnimationFrame(() => {
          card.style.transform =
            "perspective(900px) rotateX(" +
            (-py * 4.2).toFixed(2) +
            "deg) rotateY(" +
            (px * 5.4).toFixed(2) +
            "deg) translateZ(0)";
        });
      }
    };
    const leave = () => {
      if (raf && typeof cancelAnimationFrame === "function") {
        cancelAnimationFrame(raf);
      }
      card.style.transform = "";
    };
    card.addEventListener("pointermove", move, { passive: true });
    card.addEventListener("pointerleave", leave);
  });
}

export function initCounters() {}

export function initCursor() {}

export function initTicker() {}

export function initHeroWash() {}

export function initShare(root?: Element | Document) {
  if (!isBrowser && !root) return;
  const scope = root || document;
  qsa("[data-share]", scope).forEach((btn: any) => {
    btn.addEventListener("click", async () => {
      const url = window.location.href;
      const textSpan = btn.querySelector(".btn__text");
      const target = textSpan || btn;
      const originalText = target.textContent;
      const setFeedback = (msg: string) => {
        target.textContent = msg;
        setTimeout(() => {
          target.textContent = originalText;
        }, 2000);
      };

      if (navigator.share) {
        try {
          await navigator.share({ url });
        } catch (err) {
          if ((err as Error).name !== "AbortError") {
            setFeedback("Gagal membagikan");
          }
        }
      } else if (navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(url);
          setFeedback("Disalin!");
        } catch {
          setFeedback("Gagal menyalin");
        }
      }
    });
  });
}

export function initMotion() {
  if (!isBrowser) return;
  const scope = document;
  initReveal(scope);
  playHero(scope);
  initParallax(scope);
  initTilt(scope);
  initShare(scope);
}

if (typeof document !== "undefined") {
  document.addEventListener("astro:page-load", initMotion);
}
