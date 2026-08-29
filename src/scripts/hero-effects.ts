/**
 * Hero motion effects (Grid reveal by pointer)
 * Avoids any layout reads inside the animation loop.
 */

const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";

const reduce =
  isBrowser && typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

export function initHeroGrid() {
  if (!isBrowser || reduce) return;

  const hero = document.querySelector(".hero--v2") as HTMLElement;
  const grid = document.querySelector(".hero__grid") as HTMLElement;
  
  if (!hero || !grid) return;

  let raf: number | null = null;
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  let rectX = 0, rectY = 0;
  let isHovering = false;
  let hasMoved = false;

  // We read the layout once per resize to avoid forced synchronous layout in pointermove
  const updateGridRect = () => {
    const r = grid.getBoundingClientRect();
    rectX = r.left;
    rectY = r.top;
  };

  const loop = () => {
    // Settle loop when destination is reached and pointer is outside
    if (!isHovering && Math.abs(targetX - currentX) < 0.5 && Math.abs(targetY - currentY) < 0.5) {
      raf = null;
      return;
    }
    
    // Lerp towards target with a slight drag for physical weight
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    
    grid.style.setProperty("--hero-mx", `${currentX.toFixed(1)}px`);
    grid.style.setProperty("--hero-my", `${currentY.toFixed(1)}px`);
    
    raf = requestAnimationFrame(loop);
  };

  const handlePointerEnter = () => {
    isHovering = true;
    grid.style.opacity = "0.18"; // Fade in using existing transition
  };

  const handlePointerLeave = () => {
    isHovering = false;
    grid.style.opacity = "0"; // Fade out
    if (!raf) {
      raf = requestAnimationFrame(loop);
    }
  };

  const handlePointerMove = (e: PointerEvent) => {
    targetX = e.clientX - rectX;
    targetY = e.clientY - rectY;
    
    if (!hasMoved) {
      // First event: instantly snap to avoid flying from (0,0)
      currentX = targetX;
      currentY = targetY;
      grid.style.setProperty("--hero-mx", `${currentX.toFixed(1)}px`);
      grid.style.setProperty("--hero-my", `${currentY.toFixed(1)}px`);
      hasMoved = true;
    }

    if (!raf) {
      raf = requestAnimationFrame(loop);
    }
  };

  updateGridRect();
  window.addEventListener("resize", updateGridRect, { passive: true });

  hero.addEventListener("pointerenter", handlePointerEnter, { passive: true });
  hero.addEventListener("pointerleave", handlePointerLeave, { passive: true });
  hero.addEventListener("pointermove", handlePointerMove, { passive: true });

  // Astro page swap cleanup to prevent event listener leaks
  const cleanup = () => {
    hero.removeEventListener("pointerenter", handlePointerEnter);
    hero.removeEventListener("pointerleave", handlePointerLeave);
    hero.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("resize", updateGridRect);
    if (raf) cancelAnimationFrame(raf);
    document.removeEventListener("astro:before-swap", cleanup);
  };
  
  document.addEventListener("astro:before-swap", cleanup);
}

if (typeof document !== "undefined") {
  document.addEventListener("astro:page-load", initHeroGrid);
}
