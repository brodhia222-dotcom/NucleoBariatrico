"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, X, Check } from "@phosphor-icons/react";
import { applyTheme, getStoredTheme, themes, type ThemeKey } from "@/lib/themes";

export function ThemePicker() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<ThemeKey>("manual");

  useEffect(() => {
    const initial = getStoredTheme();
    setActive(initial);
    applyTheme(initial);
  }, []);

  const choose = (key: ThemeKey) => {
    setActive(key);
    applyTheme(key);
  };

  return (
    <>
      {/* Floating trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Probar paletas de color"
        className="fixed bottom-6 left-6 z-[600] flex items-center gap-2 rounded-full bg-[color:var(--ink)] text-[color:var(--ink-inverse)] px-4 py-3 shadow-[var(--shadow-lg)] hover:scale-105 active:scale-95 transition-transform"
      >
        <Palette weight="regular" className="h-4 w-4" />
        <span className="text-xs font-medium tracking-wide hidden sm:inline">Paleta</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-[598] bg-black/20 backdrop-blur-[2px]"
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.aside
              initial={{ opacity: 0, x: -16, y: 8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: -16, y: 8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-24 left-6 z-[599] w-[320px] max-w-[calc(100vw-3rem)] rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-[color:var(--bg-elevated)] shadow-[var(--shadow-xl)]"
              role="dialog"
              aria-label="Selector de paleta"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 p-5 border-b border-[color:var(--border)]">
                <div>
                  <p className="eyebrow mb-1">Modo demo</p>
                  <h3 className="h4 text-[color:var(--ink)]">Probá paletas</h3>
                  <p className="caption mt-1 leading-snug">
                    Elegí la combinación que mejor cuente la marca.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[color:var(--ink-soft)] hover:bg-[color:var(--bg-subtle)] hover:text-[color:var(--ink)] transition-colors"
                >
                  <X weight="regular" className="h-4 w-4" />
                </button>
              </div>

              {/* Options */}
              <ul className="p-2.5 max-h-[60vh] overflow-y-auto">
                {themes.map((t) => {
                  const isActive = t.key === active;
                  return (
                    <li key={t.key}>
                      <button
                        type="button"
                        onClick={() => choose(t.key)}
                        className={`flex w-full items-center gap-4 rounded-[var(--radius-md)] p-3 text-left transition-colors ${
                          isActive
                            ? "bg-[color:var(--bg-subtle)]"
                            : "hover:bg-[color:var(--bg-subtle)]/55"
                        }`}
                        aria-pressed={isActive}
                      >
                        {/* Swatches */}
                        <span className="flex shrink-0 -space-x-1.5" aria-hidden>
                          {t.swatches.map((c, i) => (
                            <span
                              key={i}
                              className="block h-8 w-8 rounded-full border border-[color:var(--border)]"
                              style={{ background: c }}
                            />
                          ))}
                        </span>
                        {/* Label */}
                        <span className="flex flex-1 flex-col">
                          <span className="text-sm font-medium text-[color:var(--ink)]">
                            {t.name}
                          </span>
                          <span className="caption leading-tight">{t.description}</span>
                        </span>
                        {/* Active mark */}
                        {isActive && (
                          <span
                            aria-hidden
                            className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[color:var(--accent)] text-white"
                          >
                            <Check weight="bold" className="h-3 w-3" />
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="p-4 border-t border-[color:var(--border)]">
                <p className="caption leading-snug">
                  Tu elección se guarda en este dispositivo. El sitio definitivo va a ir con la paleta que aprueben Agustina y el equipo.
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
