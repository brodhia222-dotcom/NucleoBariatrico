import type { MetadataRoute } from "next";
import { brand } from "@/lib/copy";
import { publicado } from "@/lib/entorno";

// Google solo puede recorrer el sitio publicado con su dominio. Todo lo demás sigue bloqueado.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [publicado ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" }],
    sitemap: `${brand.url}/sitemap.xml`,
  };
}
