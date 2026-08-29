import { sanityClient } from "sanity:client";

const useFixture =
  import.meta.env.PUBLIC_SANITY_PROJECT_ID === undefined ||
  import.meta.env.PUBLIC_SANITY_PROJECT_ID === "demo" ||
  import.meta.env.PUBLIC_SANITY_PROJECT_ID === "";

// In-memory query cache and in-flight request map
const CACHE_TTL_MS = 60 * 1000; // 60 seconds
const cache = new Map<string, { data: any; expiresAt: number }>();
const inFlightRequests = new Map<string, Promise<any>>();

function getCacheKey(query: string, params: Record<string, any>): string {
  return `${query.trim()}::${JSON.stringify(params)}`;
}

/**
 * Executes a Sanity GROQ query with in-memory caching and request deduplication.
 * If PUBLIC_SANITY_PROJECT_ID is missing or 'demo', it returns null
 * and relies on the frontend components to fallback to `UKM_FIXTURE`.
 */
export async function fetchSanity<T>(
  query: string,
  params: Record<string, any> = {},
): Promise<T | null> {
  if (useFixture) {
    if (import.meta.env.PROD) {
      throw new Error(
        "Sanity is not configured in PROD. Failing build to prevent fixture leakage.",
      );
    }
    console.warn(
      "⚠️ Sanity is not configured or in demo mode. Falling back to fixture data.",
    );
    return null;
  }

  const key = getCacheKey(query, params);
  const now = Date.now();

  // Check valid cache entry
  const cached = cache.get(key);
  if (cached && cached.expiresAt > now) {
    return cached.data as T;
  }

  // Deduplicate in-flight requests
  if (inFlightRequests.has(key)) {
    return inFlightRequests.get(key) as Promise<T | null>;
  }

  const fetchPromise = (async () => {
    try {
      const data = await sanityClient.fetch<T>(query, params);
      if (data !== null && data !== undefined) {
        cache.set(key, { data, expiresAt: Date.now() + CACHE_TTL_MS });
      }
      return data;
    } catch (err) {
      console.error("❌ Sanity Fetch Error:", err);
      if (import.meta.env.PROD) {
        throw new Error(
          "Sanity fetch failed in PROD. Failing build to prevent stale/fixture leakage.",
        );
      }
      return null;
    } finally {
      inFlightRequests.delete(key);
    }
  })();

  inFlightRequests.set(key, fetchPromise);
  return fetchPromise;
}
