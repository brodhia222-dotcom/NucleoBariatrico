import type Lenis from "lenis";

// El scroll suave del sitio lo maneja Lenis (components/LenisProvider.tsx). Los componentes que
// necesitan mover la página por código usan esto, así no pelean con él.
let lenis: Lenis | null = null;

export function registrarLenis(instancia: Lenis | null) {
  lenis = instancia;
}

/** Lleva la página a una posición: con Lenis si está activo; si no (movimiento reducido), de una. */
export function scrollA(y: number) {
  const destino = Math.max(0, Math.round(y));
  if (lenis) lenis.scrollTo(destino, { duration: 0.8 });
  else window.scrollTo({ top: destino, behavior: "instant" });
}
