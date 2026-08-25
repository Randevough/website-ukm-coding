import { sanityClient } from "sanity:client";
import { createImageUrlBuilder } from "@sanity/image-url";

const useFixture =
  import.meta.env.PUBLIC_SANITY_PROJECT_ID === undefined ||
  import.meta.env.PUBLIC_SANITY_PROJECT_ID === "demo" ||
  import.meta.env.PUBLIC_SANITY_PROJECT_ID === "";

let builder: any;
if (!useFixture) {
  builder = createImageUrlBuilder(sanityClient);
}

export function urlFor(source: any) {
  if (!source || useFixture || !builder) return null;
  try {
    return builder.image(source);
  } catch {
    return null;
  }
}
