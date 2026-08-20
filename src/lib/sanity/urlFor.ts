import { sanityClient } from "sanity:client";
import imageUrlBuilder from "@sanity/image-url";

const useFixture =
  import.meta.env.PUBLIC_SANITY_PROJECT_ID === undefined ||
  import.meta.env.PUBLIC_SANITY_PROJECT_ID === "demo" ||
  import.meta.env.PUBLIC_SANITY_PROJECT_ID === "";

let builder: any;
if (!useFixture) {
  builder = imageUrlBuilder(sanityClient);
}

export function urlFor(source: any) {
  if (useFixture) return null;
  return builder.image(source);
}
