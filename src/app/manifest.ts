import type { MetadataRoute } from "next";
import { family } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: family.name,
    short_name: family.name,
    description:
      "Free local-first tools for designers: Palma Canvas for visual references, moodboards and storyboards, and PalmaNote for notes, plans and drafts.",
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
