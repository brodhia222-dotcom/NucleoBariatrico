"use client";

import { useState, useEffect, useId } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { contacto, brand } from "@/lib/copy";
import { useIMC } from "@/lib/imc-context";

type Status = "idle" | "sending" | "sent" | "error";

export function Contacto() {
  const { resultado } = useIMC();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const idNombre = useId();
  const idTelefono = useId();
  const idEmail = useId();
  const idMotivo = useId();
  const idMensaje = useId();
  const idHoneypot = useId();

  // Make sure focus rings and aria work when reduced motion.
  useEffect(() => {
    if (status === "sent") {
      const t = setTimeout(() => setStatus("idle"), 8000);
      return () => clearTimeout(t);
    }
  }, [status]);

  const whatsappHref = `https://wa.me/${brand.whatsappNumber.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
    resultado
      ? `${brand.whatsappMessage} Mi IMC es ${resultado.imc} (${resultado.categoria}).`
      : brand.whatsappMessage,
  )}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — silent discard if bot fills it.
    if ((data.get("website") as string)?.trim()) return;

    const payload = {
      nombre: (data.get("nombre") as string) ?? "",
      telefono: (data.get("telefono") as string) ?? "",
      email: (data.get("email") as string) ?? "",
      motivo: (data.get("motivo") as string) ?? "",
      mensaje: (data.get("mensaje") as string) ?? "",
      imc: resultado?.imc,
      imcCategoria: resultado?.categoria,
      peso: resultado?.peso,
      altura: resultado?.alturaCm,
    };

    setStatus("sending");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? "Falló el envío");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Error desconocido");
    }
  }

  return (
    <Section id="contacto" tone="default">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Reveal>
              <Eyebrow>{contacto.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display-md" style={{ fontVariationSettings: '"opsz" 80', maxWidth: "12ch" }}>
                {contacto.headline}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="body-lg text-[color:var(--ink-soft)]">{contacto.body}</p>
            </Reveal>

            <Reveal delay={0.18} className="mt-4">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-3 rounded-[12px] border border-[color:var(--ink)] bg-transparent px-6 text-sm font-medium text-[color:var(--ink)] hover:bg-[color:var(--ink)] hover:text-white transition-colors"
              >
                <svg viewBox="0 0 32 32" fill="currentColor" className="h-5 w-5" aria-hidden>
                  <path d="M16.005 3C8.82 3 3 8.815 3 15.99c0 2.823.9 5.435 2.427 7.563L4 29l5.65-1.39A12.9 12.9 0 0 0 16 28.98c7.182 0 13-5.815 13-12.99C29 8.815 23.187 3 16.005 3Zm0 23.793a10.8 10.8 0 0 1-5.5-1.504l-.395-.235-3.357.826.83-3.273-.257-.42a10.8 10.8 0 0 1-1.617-5.697c0-5.978 4.85-10.823 10.83-10.823 5.98 0 10.83 4.845 10.83 10.823 0 5.977-4.85 10.823-10.83 10.823Z" />
                </svg>
                {contacto.labels.enviar !== "" && "Escribir por WhatsApp"}
              </a>
            </Reveal>

            {resultado && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-[var(--radius-md)] border border-[color:var(--accent-soft)] bg-[color:var(--accent-soft)]/60 p-5"
              >
                <p className="caption uppercase tracking-[0.16em] text-[color:var(--accent)] mb-1 font-medium">
                  {contacto.labels.imcAuto}
                </p>
                <p className="text-lg font-medium text-[color:var(--ink)]">
                  IMC {resultado.imc} · {resultado.categoria}
                </p>
              </motion.div>
            )}
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <form
                onSubmit={onSubmit}
                className="grid gap-5 rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-8 lg:p-10 shadow-[var(--shadow-md)]"
              >
                {/* Honeypot */}
                <input
                  id={idHoneypot}
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute h-0 w-0 -left-[9999px] opacity-0"
                  aria-hidden
                />

                <div className="grid gap-5 md:grid-cols-2">
                  <FormField
                    id={idNombre}
                    name="nombre"
                    label={contacto.labels.nombre}
                    required
                  />
                  <FormField
                    id={idTelefono}
                    name="telefono"
                    label={contacto.labels.telefono}
                    type="tel"
                    required
                  />
                </div>
                <FormField
                  id={idEmail}
                  name="email"
                  label={contacto.labels.email}
                  type="email"
                  required
                />

                <label className="flex flex-col gap-2">
                  <span className="eyebrow" id={`${idMotivo}-label`}>
                    {contacto.labels.motivo}
                  </span>
                  <select
                    id={idMotivo}
                    name="motivo"
                    required
                    defaultValue=""
                    className="h-12 rounded-[12px] border border-[color:var(--border-strong)] bg-[color:var(--bg)] px-4 text-[color:var(--ink)] outline-none focus:border-[color:var(--accent)]"
                  >
                    <option value="" disabled>
                      Elegí un motivo
                    </option>
                    {contacto.motivos.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="eyebrow">{contacto.labels.mensaje}</span>
                  <textarea
                    id={idMensaje}
                    name="mensaje"
                    rows={4}
                    className="rounded-[12px] border border-[color:var(--border-strong)] bg-[color:var(--bg)] px-4 py-3 text-[color:var(--ink)] outline-none focus:border-[color:var(--accent)]"
                    placeholder="Contanos tu situación..."
                  />
                </label>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-[12px] bg-[color:var(--accent)] px-6 text-sm font-medium text-white shadow-[var(--shadow-sm)] hover:bg-[color:var(--accent-hover)] transition-colors disabled:opacity-60"
                >
                  {status === "sending" ? contacto.labels.enviando : contacto.labels.enviar}
                </button>

                {status === "sent" && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-[color:var(--color-success)]"
                  >
                    {contacto.labels.enviado}
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-[color:var(--color-error)]"
                  >
                    {errorMsg ?? contacto.labels.error}
                  </motion.p>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function FormField({
  id,
  name,
  label,
  type = "text",
  required = false,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2" htmlFor={id}>
      <span className="eyebrow">{label}</span>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="h-12 rounded-[12px] border border-[color:var(--border-strong)] bg-[color:var(--bg)] px-4 text-[color:var(--ink)] outline-none focus:border-[color:var(--accent)]"
      />
    </label>
  );
}
