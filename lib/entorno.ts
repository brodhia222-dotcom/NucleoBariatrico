import { brand } from "@/lib/copy";

// El sitio cuenta como publicado cuando corre en la producción de Vercel y ya tiene conectado su
// dominio. Los links de prueba, la compu local y la producción todavía sin dominio no se indexan en
// Google. Se resuelve al construir el sitio: después de conectar el dominio hay que volver a publicar.
export const publicado =
  process.env.VERCEL_ENV === "production" &&
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "").endsWith(brand.domain);
