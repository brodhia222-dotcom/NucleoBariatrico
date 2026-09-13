// Eventos de conversión estándar de las webs de Fede.
// Siempre se envían a window.dataLayer: si el sitio tiene Google Tag Manager los toma,
// y si todavía no lo tiene quedan preparados. Los nombres son fijos: los usan el QA y los tags de GTM.

export type EventoConversion = "whatsapp_click" | "phone_click" | "email_click" | "form_start" | "form_submit";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(evento: EventoConversion, datos: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: evento, ...datos });
}

// Escucha global de clics: registra WhatsApp, teléfono y mail sin tener que tocar cada botón.
// Para saber desde dónde se hizo clic, poné data-seccion="hero" (u otro nombre) en la sección.
export function escucharContactos() {
  const alHacerClic = (e: MouseEvent) => {
    const link = (e.target as Element | null)?.closest?.("a[href]");
    if (!link) return;
    const href = link.getAttribute("href") || "";
    const ubicacion = link.closest("[data-seccion]")?.getAttribute("data-seccion") ?? undefined;
    if (/wa\.me|api\.whatsapp\.com|^whatsapp:/i.test(href)) track("whatsapp_click", { ubicacion });
    else if (href.startsWith("tel:")) track("phone_click", { ubicacion });
    else if (href.startsWith("mailto:")) track("email_click", { ubicacion });
  };
  document.addEventListener("click", alHacerClic, { capture: true });
  return () => document.removeEventListener("click", alHacerClic, { capture: true });
}
