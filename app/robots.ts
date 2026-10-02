import type { MetadataRoute } from "next";
import { brand } from "@/lib/copy";

// Google solo puede recorrer el sitio publicado. Los links de prueba siguen bloqueados.
const enProduccion = process.env.VERCEL_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [enProduccion ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" }],
    sitemap: `https://${brand.domain}/sitemap.xml`,
  };
}
