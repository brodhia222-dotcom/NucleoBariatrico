"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function LenisProvider() {
  // Si la página se abre con un ancla (/#contacto), el navegador salta antes de que la página termine
  // de armarse y cae en otro lado: se vuelve a ubicar cuando ya está todo en su lugar, salvo que la
  // persona ya haya empezado a moverse.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash === "#") return;
    let destino: Element | null = null;
    try {
      destino = document.querySelector(decodeURIComponent(hash));
    } catch {
      return;
    }
    if (!destino) return;
    const el = destino;
    const esperas: number[] = [];
    const ubicar = () => {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: Math.max(0, y), behavior: "instant" });
    };
    const cancelar = () => esperas.forEach((t) => window.clearTimeout(t));
    for (const ms of [120, 500, 1100]) esperas.push(window.setTimeout(ubicar, ms));
    const eventos = ["wheel", "touchstart", "keydown", "mousedown"] as const;
    eventos.forEach((ev) => window.addEventListener(ev, cancelar, { once: true, passive: true }));
    return () => {
      cancelar();
      eventos.forEach((ev) => window.removeEventListener(ev, cancelar));
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Anchor link interception with navbar offset.
    const onAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80 });
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
