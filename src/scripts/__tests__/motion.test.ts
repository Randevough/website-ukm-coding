import { describe, it, expect } from "vitest";
import * as motion from "../motion";

describe("Motion and Interaction Utilities", () => {
  it("should export all required motion and interactive handlers", () => {
    expect(typeof motion.initReveal).toBe("function");
    expect(typeof motion.playHero).toBe("function");
    expect(typeof motion.initParallax).toBe("function");
    expect(typeof motion.initCounters).toBe("function");
    expect(typeof motion.initTilt).toBe("function");
    expect(typeof motion.initCursor).toBe("function");
    expect(typeof motion.initTicker).toBe("function");
    expect(typeof motion.initHeroWash).toBe("function");
    expect(typeof motion.initShare).toBe("function");
    expect(typeof motion.initMotion).toBe("function");
  });

  it("should execute safely without errors when invoked with null or empty scope in Node/SSR", () => {
    expect(() => motion.initReveal()).not.toThrow();
    expect(() => motion.playHero()).not.toThrow();
    expect(() => motion.initParallax()).not.toThrow();
    expect(() => motion.initCounters()).not.toThrow();
    expect(() => motion.initTilt()).not.toThrow();
    expect(() => motion.initCursor()).not.toThrow();
    expect(() => motion.initTicker()).not.toThrow();
    expect(() => motion.initHeroWash()).not.toThrow();
    expect(() => motion.initShare()).not.toThrow();
  });
});
