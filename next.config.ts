import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No anunciar con qué está hecho el sitio
  poweredByHeader: false,
  // Protecciones básicas del navegador para todo el sitio: que nadie pueda mostrarlo adentro de otra
  // página (X-Frame-Options), que el navegador no adivine tipos de archivo, que al salir a otro sitio no
  // se pase la dirección completa y que la web no pueda pedir cámara, micrófono ni ubicación.
  // El https obligatorio (HSTS) lo agrega Vercel.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
