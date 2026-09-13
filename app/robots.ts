import type { MetadataRoute } from "next";
import { brand } from "@/lib/copy";

// noindex hasta que el cliente apruebe el sitio.
// Antes del lanzamiento real, cambiar a { rules: [{ userAgent: "*", allow: "/" }] }.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", disallow: "/" }],
    sitemap: `https://${brand.domain}/sitemap.xml`,
  };
}
