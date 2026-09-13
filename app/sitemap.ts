import type { MetadataRoute } from "next";
import { brand } from "@/lib/copy";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `https://${brand.domain}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
