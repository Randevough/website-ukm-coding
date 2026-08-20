import { sanityClient } from "sanity:client";

const useFixture =
  import.meta.env.PUBLIC_SANITY_PROJECT_ID === undefined ||
  import.meta.env.PUBLIC_SANITY_PROJECT_ID === "demo" ||
  import.meta.env.PUBLIC_SANITY_PROJECT_ID === "";

/**
 * Executes a Sanity GROQ query.
 * If PUBLIC_SANITY_PROJECT_ID is missing or 'demo', it returns null
 * and relies on the frontend components to fallback to `UKM_FIXTURE`.
 */
export async function fetchSanity<T>(
  query: string,
  params: Record<string, any> = {},
): Promise<T | null> {
  if (useFixture) {
    console.warn(
      "⚠️ Sanity is not configured or in demo mode. Falling back to fixture data.",
    );
    return null;
  }

  try {
    return await sanityClient.fetch<T>(query, params);
  } catch (err) {
    console.error("❌ Sanity Fetch Error:", err);
    return null;
  }
}
