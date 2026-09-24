"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, CheckCircle, PaperPlaneTilt, Trash, X } from "@phosphor-icons/react";
import { testimonios } from "@/lib/copy";
import { track } from "@/lib/analytics";

const f = testimonios.formulario;
type Estado = "idle" | "enviando" | "enviado" | "error";

// Achica la foto en el navegador (máx. 1600 px, JPEG) para que el envío sea liviano.
async function prepararFoto(file: File): Promise<Blob> {
  if (!file.type.startsWith("image/") && !/\.(heic|heif)$/i.test(file.name)) throw new Error("tipo");
  try {
    const bmp = await createImageBitmap(file);
    const escala = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * escala);
    canvas.height = Math.round(bmp.height * escala);
    canvas.getContext("2d")?.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    return await new Promise<Blob>((ok, mal) =>
      canvas.toBlob((b) => (b ? ok(b) : mal(new Error("blob"))), "image/jpeg", 0.85),
    );
  } catch {
    // Formatos que el navegador no puede leer (por ejemplo HEIC en algunas compus): se manda tal cual si es liviana
    if (file.size <= 4 * 1024 * 1024) return file;
    throw new Error("pesada");
  }
}

export function TestimonioForm({ abierto, onCerrar }: { abierto: boolean; onCerrar: () => void }) {
  const [estado, setEstado] = useState<Estado>("idle");
  const [error, setError] = useState<string | null>(null);
  const [foto, setFoto] = useState<{ blob: Blob; url: string } | null>(null);
  const primerCampo = useRef<HTMLInputElement>(null);
  const iniciado = useRef(false);
  const ids = {
    titulo: useId(),
    nombre: useId(),
    tratamiento: useId(),
    proceso: useId(),
    cambio: useId(),
    foto: useId(),
    consentimiento: useId(),
  };

  // Scroll bloqueado, Escape cierra y foco en el primer campo al abrir
  useEffect(() => {
    if (!abierto) return;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => primerCampo.current?.focus(), 250);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCerrar();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [abierto, onCerrar]);

  // Al cerrar después de enviar, el formulario vuelve a quedar listo
  useEffect(() => {
    if (abierto) return;
    const t = setTimeout(() => {
      if (estado === "enviado") setEstado("idle");
      setError(null);
    }, 400);
    return () => clearTimeout(t);
  }, [abierto, estado]);

  useEffect(() => () => {
    if (foto) URL.revokeObjectURL(foto.url);
  }, [foto]);

  async function elegirFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setError(null);
    try {
      const blob = await prepararFoto(file);
      setFoto((prev) => {
        if (prev) URL.revokeObjectURL(prev.url);
        return { blob, url: URL.createObjectURL(blob) };
      });
    } catch {
      setError(f.errorFoto);
    }
  }

  function quitarFoto() {
    setFoto((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return null;
    });
  }

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.delete("foto");
    if (foto) data.append("foto", foto.blob, foto.blob.type === "image/jpeg" ? "foto.jpg" : "foto");
    setEstado("enviando");
    setError(null);
    try {
      const res = await fetch("/api/testimonio", { method: "POST", body: data });
      if (!res.ok) throw new Error(String(res.status));
      setEstado("enviado");
      track("form_submit", { formulario: "testimonio" });
      form.reset();
      quitarFoto();
      iniciado.current = false;
    } catch {
      setEstado("error");
      setError(f.error);
    }
  }

  const campo =
    "w-full rounded-[10px] border border-[color:var(--border-strong)] bg-[color:var(--bg)] px-4 text-[color:var(--ink)] outline-none transition-colors focus:border-[color:var(--ink)]";

  return (
    <AnimatePresence>
      {abierto && (
        <div className="fixed inset-0 z-[900] flex items-end justify-center p-0 sm:items-center sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCerrar}
            aria-hidden
            className="absolute inset-0 bg-[color:var(--bg-inverse)]/55 backdrop-blur-md"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={ids.titulo}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="relative z-10 flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[var(--radius-2xl)] border border-[color:var(--border)] bg-[color:var(--bg-elevated)] shadow-[var(--shadow-lg)] sm:rounded-[var(--radius-2xl)]"
          >
            <button
              type="button"
              onClick={onCerrar}
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-[color:var(--bg)] text-[color:var(--ink)] transition-colors hover:bg-[color:var(--ink)] hover:text-[color:var(--ink-inverse)]"
            >
              <X weight="bold" className="h-4 w-4" />
            </button>

            <div data-lenis-prevent className="overflow-y-auto overscroll-contain p-6 sm:p-10">
              {estado === "enviado" ? (
                <div className="flex flex-col items-center gap-5 py-10 text-center">
                  <CheckCircle weight="fill" className="h-12 w-12 text-[color:var(--accent)]" aria-hidden />
                  <p
                    id={ids.titulo}
                    className="font-display max-w-[30ch]"
                    style={{ fontSize: "clamp(22px, 2.4vw, 28px)", lineHeight: 1.2, fontWeight: 300 }}
                  >
                    {f.gracias}
                  </p>
                  <button type="button" onClick={onCerrar} className="btn btn-ghost">
                    Cerrar
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={enviar}
                  onFocusCapture={() => {
                    if (iniciado.current) return;
                    iniciado.current = true;
                    track("form_start", { formulario: "testimonio" });
                  }}
                  className="grid gap-5"
                >
                  <div className="flex flex-col gap-2 pr-10">
                    <h2
                      id={ids.titulo}
                      className="font-display"
                      style={{ fontSize: "clamp(26px, 2.8vw, 34px)", lineHeight: 1.05, letterSpacing: "-0.02em", fontWeight: 300 }}
                    >
                      {f.titulo}
                    </h2>
                    <p className="body-sm text-[color:var(--ink-soft)]">{f.bajada}</p>
                  </div>

                  <input
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="flex flex-col gap-2" htmlFor={ids.nombre}>
                      <span className="eyebrow">{f.nombre}</span>
                      <input
                        ref={primerCampo}
                        id={ids.nombre}
                        name="nombre"
                        required
                        maxLength={80}
                        autoComplete="name"
                        className={`${campo} h-12`}
                      />
                    </label>
                    <label className="flex flex-col gap-2" htmlFor={ids.tratamiento}>
                      <span className="eyebrow">{f.tratamiento}</span>
                      <select id={ids.tratamiento} name="tratamiento" required defaultValue="" className={`${campo} h-12`}>
                        <option value="" disabled>
                          {f.tratamientoPlaceholder}
                        </option>
                        {f.tratamientos.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label className="flex flex-col gap-2" htmlFor={ids.proceso}>
                    <span className="eyebrow normal-case tracking-normal text-sm font-medium text-[color:var(--ink)]">{f.proceso}</span>
                    <textarea id={ids.proceso} name="proceso" required rows={4} maxLength={3000} className={`${campo} resize-none py-3`} />
                  </label>

                  <label className="flex flex-col gap-2" htmlFor={ids.cambio}>
                    <span className="eyebrow normal-case tracking-normal text-sm font-medium text-[color:var(--ink)]">{f.cambio}</span>
                    <textarea id={ids.cambio} name="cambio" required rows={4} maxLength={3000} className={`${campo} resize-none py-3`} />
                  </label>

                  {/* Foto opcional */}
                  <div className="flex flex-col gap-2">
                    <span className="eyebrow">{f.foto}</span>
                    <div className="flex items-center gap-4 rounded-[12px] border border-dashed border-[color:var(--border-strong)] bg-[color:var(--bg)] p-3">
                      {foto ? (
                        <img src={foto.url} alt="Foto elegida" className="h-16 w-16 shrink-0 rounded-[10px] object-cover" />
                      ) : (
                        <span aria-hidden className="grid h-16 w-16 shrink-0 place-items-center rounded-[10px] bg-[color:var(--bg-subtle)] text-[color:var(--ink-soft)]">
                          <Camera weight="regular" className="h-6 w-6" />
                        </span>
                      )}
                      <div className="flex flex-1 flex-col gap-2">
                        <p className="body-sm text-[color:var(--ink-soft)]">{f.fotoAyuda}</p>
                        <div className="flex flex-wrap gap-2">
                          <label htmlFor={ids.foto} className="btn btn-ghost cursor-pointer !px-4 !py-2 text-sm">
                            {foto ? "Cambiar foto" : f.fotoBoton}
                          </label>
                          {foto && (
                            <button type="button" onClick={quitarFoto} className="btn btn-ghost !px-4 !py-2 text-sm">
                              <Trash weight="regular" className="h-4 w-4" />
                              Quitar
                            </button>
                          )}
                        </div>
                        <input id={ids.foto} name="foto" type="file" accept="image/*" onChange={elegirFoto} className="sr-only" />
                      </div>
                    </div>
                  </div>

                  <label htmlFor={ids.consentimiento} className="flex cursor-pointer items-start gap-3">
                    <input
                      id={ids.consentimiento}
                      name="consentimiento"
                      type="checkbox"
                      value="si"
                      required
                      className="mt-0.5 h-5 w-5 shrink-0 accent-[color:var(--ink)]"
                    />
                    <span className="body-sm text-[color:var(--ink)]">{f.consentimiento}</span>
                  </label>

                  {error && (
                    <p role="alert" className="body-sm text-[color:var(--color-error)]">
                      {error}
                    </p>
                  )}

                  <button type="submit" disabled={estado === "enviando"} className="btn btn-primary w-full justify-center disabled:opacity-60 sm:w-fit">
                    <PaperPlaneTilt weight="fill" className="h-4 w-4" />
                    {estado === "enviando" ? f.enviando : f.enviar}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
