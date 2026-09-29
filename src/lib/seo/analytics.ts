/**
 * Google Analytics Helper & Configuration
 */

export const DEFAULT_GA_MEASUREMENT_ID = "G-FLFLZX2TGF";

export function getGaMeasurementId(customId?: string): string | undefined {
  return (
    customId ||
    import.meta.env.PUBLIC_GA_MEASUREMENT_ID ||
    DEFAULT_GA_MEASUREMENT_ID
  );
}

export function isAnalyticsEnabled(
  isProd: boolean = import.meta.env.PROD,
  forceEnable: boolean = import.meta.env.PUBLIC_GA_ENABLE_DEV === "true",
): boolean {
  return Boolean(isProd || forceEnable);
}
