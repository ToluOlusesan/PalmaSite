import type { MetadataRoute } from "next";
import { family } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: family.name,
    short_name: family.name,
    description:
      "Two local-first Windows apps: Palma Canvas for references and moodboards, PalmaNote for pages, notes and lists.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
