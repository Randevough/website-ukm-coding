const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const qsa = (sel: string, root?: Element | Document) =>
  Array.prototype.slice.call((root || document).querySelectorAll(sel));

/* ---------------- 1 + 2. Reveal & lineMask ---------------- */
let io: IntersectionObserver | null = null;

export function initReveal(root?: Element | Document) {
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

  if (!io) {
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io!.unobserve(entry.target);
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
  const scope = root || document;
  qsa(".lineMask", scope).forEach((el, i) => {
    if (!(el as HTMLElement).style.getPropertyValue("--reveal-delay")) {
      (el as HTMLElement).style.setProperty(
        "--reveal-delay",
        90 + i * 110 + "ms",
      );
    }
  });
  requestAnimationFrame(() => {
    qsa(
      ".hero .lineMask, .hero [data-reveal], .hero [data-rule]",
      scope,
    ).forEach((el) => el.classList.add("is-in"));
  });
}

/* ---------------- 3. Parallax ---------------- */
let pxItems: { el: HTMLElement; speed: number }[] = [];
let pxTicking = false;

function collectParallax(root?: Element | Document) {
  pxItems = qsa("[data-parallax]", root || document).map((el: any) => ({
    el: el,
    speed: parseFloat(el.getAttribute("data-parallax") || "0.12"),
  }));
  if (pxItems.length) applyParallax();
}

function applyParallax() {
  const vh = window.innerHeight;
  pxItems.forEach((item) => {
    const rect = item.el.getBoundingClientRect();
    if (rect.bottom < -200 || rect.top > vh + 200) return;
    const offset = rect.top + rect.height / 2 - vh / 2;
    const shift = -offset * item.speed;
    item.el.style.transform = "translate3d(0," + shift.toFixed(2) + "px,0)";
  });
}

function onScrollParallax() {
  if (pxTicking) return;
  pxTicking = true;
  requestAnimationFrame(() => {
    applyParallax();
    pxTicking = false;
  });
}

export function initParallax(root?: Element | Document) {
  if (reduce) return;
  collectParallax(root);
  window.removeEventListener("scroll", onScrollParallax);
  window.addEventListener("scroll", onScrollParallax, { passive: true });
  window.addEventListener("resize", onScrollParallax);
}

/* ---------------- 4. Counter ---------------- */
function runCounter(el: HTMLElement) {
  const target = parseFloat(el.getAttribute("data-counter") || "0");
  const suffix = el.getAttribute("data-suffix") || "";
  const dur = 1500;
  const start = performance.now();

  if (reduce) {
    el.innerHTML = target + (suffix ? "<sup>" + suffix + "</sup>" : "");
    return;
  }

  function frame(now: number) {
    const t = Math.min(1, (now - start) / dur);
    const e = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    const val = Math.round(target * e);
    el.innerHTML = val + (suffix ? "<sup>" + suffix + "</sup>" : "");
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

export function initCounters(root?: Element | Document) {
  const scope = root || document;
  const items = qsa("[data-counter]:not(.is-counted)", scope);
  if (!items.length) return;
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-counted");
        runCounter(entry.target as HTMLElement);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.4 },
  );
  items.forEach((el) => obs.observe(el));
}

/* ---------------- 5. Tilt ---------------- */
export function initTilt(root?: Element | Document) {
  if (reduce || window.matchMedia("(hover: none)").matches) return;
  const scope = root || document;
  qsa("[data-tilt]", scope).forEach((card: any) => {
    let raf: number | null = null;
    const move = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.transform =
          "perspective(900px) rotateX(" +
          (-py * 4.2).toFixed(2) +
          "deg) rotateY(" +
          (px * 5.4).toFixed(2) +
          "deg) translateZ(0)";
      });
    };
    const leave = () => {
      if (raf) cancelAnimationFrame(raf);
      card.style.transform = "";
    };
    card.addEventListener("pointermove", move);
    card.addEventListener("pointerleave", leave);
  });
}

/* ---------------- 6. Cursor ---------------- */
let cursorEl: HTMLElement | null = null;

export function initCursor(root?: Element | Document) {
  if (window.matchMedia("(hover: none)").matches) return;
  const scope = root || document;
  const zones = qsa("[data-cursor]", scope);
  if (!zones.length) return;

  if (!cursorEl) {
    cursorEl = document.createElement("div");
    cursorEl.className = "cursor";
    cursorEl.setAttribute("aria-hidden", "true");
    document.body.appendChild(cursorEl);
  }

  let x = 0,
    y = 0,
    cx = 0,
    cy = 0;
  let on = false;
  let raf: number | null = null;

  function loop() {
    cx += (x - cx) * 0.22;
    cy += (y - cy) * 0.22;
    cursorEl!.style.transform =
      "translate3d(" +
      cx.toFixed(1) +
      "px," +
      cy.toFixed(1) +
      "px,0) translate(-50%,-50%)";
    if (on) raf = requestAnimationFrame(loop);
    else raf = null;
  }

  zones.forEach((zone: any) => {
    zone.addEventListener("pointerenter", () => {
      cursorEl!.textContent = zone.getAttribute("data-cursor") || "Lihat";
      cursorEl!.classList.add("is-on");
      on = true;
      if (!raf) raf = requestAnimationFrame(loop);
    });
    zone.addEventListener("pointerleave", () => {
      cursorEl!.classList.remove("is-on");
      on = false;
    });
    zone.addEventListener("pointermove", (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (cx === 0 && cy === 0) {
        cx = x;
        cy = y;
      }
    });
  });
}

/* ---------------- 7. Ticker ---------------- */
export function initTicker(root?: Element | Document) {
  const scope = root || document;
  qsa(".ticker:not(.is-ready)", scope).forEach((ticker: any) => {
    const track = ticker.querySelector(".ticker__track");
    if (!track) return;
    const clone = track.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    ticker.appendChild(clone);
    ticker.classList.add("is-ready");
  });
}

/* ---------------- 8. Hero Wash ---------------- */
export function initHeroWash(root?: Element | Document) {
  const scope = root || document;
  const wash = scope.querySelector(".hero__wash") as HTMLElement;
  if (!wash || reduce) return;
  const hero = wash.closest(".hero") as HTMLElement;
  if (!hero) return;

  let raf: number | null = null;
  hero.addEventListener("pointermove", (e: PointerEvent) => {
    const r = hero.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width) * 100;
    const my = ((e.clientY - r.top) / r.height) * 100;
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      wash.style.setProperty("--mx", mx.toFixed(1) + "%");
      wash.style.setProperty("--my", my.toFixed(1) + "%");
    });
  });
}

/* ---------------- 9. Share Handler ---------------- */
export function initShare(root?: Element | Document) {
  const scope = root || document;
  qsa("[data-share]", scope).forEach((btn: any) => {
    btn.addEventListener("click", async () => {
      const url = window.location.href;
      if (navigator.share) {
        try {
          await navigator.share({ url });
        } catch (err) {
          console.error("Error sharing", err);
        }
      } else {
        try {
          await navigator.clipboard.writeText(url);
          const originalText = btn.textContent;
          btn.textContent = "Disalin!";
          setTimeout(() => {
            btn.textContent = originalText;
          }, 2000);
        } catch (err) {
          console.error("Failed to copy", err);
        }
      }
    });
  });
}

/* ---------------- Boot ---------------- */
export function initMotion() {
  const scope = document;
  initReveal(scope);
  playHero(scope);
  initParallax(scope);
  initCounters(scope);
  initTilt(scope);
  initCursor(scope);
  initTicker(scope);
  initHeroWash(scope);
  initShare(scope);
}

document.addEventListener("astro:page-load", initMotion);
