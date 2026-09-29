import { describe, it, expect } from "vitest";
import {
  DEFAULT_GA_MEASUREMENT_ID,
  getGaMeasurementId,
  isAnalyticsEnabled,
} from "../analytics";

describe("Google Analytics Helpers", () => {
  describe("getGaMeasurementId", () => {
    it("should return custom ID when provided", () => {
      expect(getGaMeasurementId("G-CUSTOM12345")).toBe("G-CUSTOM12345");
    });

    it("should fallback to DEFAULT_GA_MEASUREMENT_ID when no custom ID is provided", () => {
      const id = getGaMeasurementId();
      expect(id).toBe(DEFAULT_GA_MEASUREMENT_ID);
      expect(id).toBe("G-FLFLZX2TGF");
    });
  });

  describe("isAnalyticsEnabled", () => {
    it("should be enabled in production", () => {
      expect(isAnalyticsEnabled(true, false)).toBe(true);
    });

    it("should be disabled in development by default", () => {
      expect(isAnalyticsEnabled(false, false)).toBe(false);
    });

    it("should be enabled in development when forceEnable is true", () => {
      expect(isAnalyticsEnabled(false, true)).toBe(true);
    });
  });
});
