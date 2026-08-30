import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/canvas", "/note"];

  return routes.map((route) => ({
    url: `https://palmaboard.com${route}`,
    lastModified: new Date(),
    changeFrequency: route ? "monthly" : "weekly",
    priority: route ? 0.9 : 1,
  }));
}
