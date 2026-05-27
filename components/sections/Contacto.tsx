"use client";

import { useState, useEffect, useId } from "react";
import { motion } from "framer-motion";
import { ArrowRight, WhatsappLogo, EnvelopeSimple, Clock } from "@phosphor-icons/react";
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
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* LEFT — visual + contact options */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <Reveal>
              <Eyebrow>{contacto.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(40px, 5vw, 72px)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.035em",
                  fontWeight: 300,
                  fontVariationSettings: '"opsz" 96',
                  textWrap: "balance",
                  maxWidth: "8ch",
                }}
              >
                {contacto.headline.replace(".", "")}
                <span className="italic-serif text-[color:var(--accent)]">.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="body-lg text-[color:var(--ink-soft)] max-w-prose">{contacto.body}</p>
            </Reveal>

            {/* Direct contact list */}
            <Reveal delay={0.15}>
              <ul className="flex flex-col divide-y divide-[color:var(--border)] border-y border-[color:var(--border)] mt-2">
                <li>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-5 hover:px-2 transition-all"
                  >
                    <span className="flex items-center gap-4">
                      <span
                        aria-hidden
                        className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--color-whatsapp)]/15 text-[color:var(--color-whatsapp)]"
                      >
                        <WhatsappLogo weight="fill" className="h-5 w-5" />
                      </span>
                      <span className="flex flex-col">
                        <span className="font-medium text-[color:var(--ink)]">WhatsApp</span>
                        <span className="caption">Respuesta rápida</span>
                      </span>
                    </span>
                    <ArrowRight weight="bold" className="h-4 w-4 text-[color:var(--ink)] opacity-50 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${brand.email}`}
                    className="group flex items-center justify-between gap-4 py-5 hover:px-2 transition-all"
                  >
                    <span className="flex items-center gap-4">
                      <span
                        aria-hidden
                        className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--accent-soft)] text-[color:var(--accent)]"
                      >
                        <EnvelopeSimple weight="regular" className="h-5 w-5" />
                      </span>
                      <span className="flex flex-col">
                        <span className="font-medium text-[color:var(--ink)]">Email</span>
                        <span className="caption">{brand.email}</span>
                      </span>
                    </span>
                    <ArrowRight weight="bold" className="h-4 w-4 text-[color:var(--ink)] opacity-50 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <div className="flex items-center gap-4 py-5">
                    <span
                      aria-hidden
                      className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--bg-subtle)] text-[color:var(--ink)]"
                    >
                      <Clock weight="regular" className="h-5 w-5" />
                    </span>
                    <span className="flex flex-col">
                      <span className="font-medium text-[color:var(--ink)]">Lun a Vie · 09 – 19hs</span>
                      <span className="caption">Respuesta &lt; 24 hs hábiles</span>
                    </span>
                  </div>
                </li>
              </ul>
            </Reveal>

            {resultado && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[var(--radius-md)] border border-[color:var(--accent-soft)] bg-[color:var(--accent-soft)]/60 p-5"
              >
                <p className="caption uppercase tracking-[0.16em] text-[color:var(--accent)] mb-1 font-medium">
                  {contacto.labels.imcAuto}
                </p>
                <p className="text-lg font-medium text-[color:var(--ink)]">
                  IMC {resultado.imc} · {resultado.categoria}
                </p>
                <p className="caption mt-1">Lo sumamos a tu consulta automáticamente.</p>
              </motion.div>
            )}
          </div>

          {/* RIGHT — form */}
          <div className="lg:col-span-7">
            <Reveal>
              <form
                onSubmit={onSubmit}
                className="grid gap-5 rounded-[var(--radius-2xl)] border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-8 lg:p-10 shadow-[var(--shadow-md)]"
              >
                <span className="eyebrow mb-2">Formulario de consulta</span>

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
                  <FormField id={idNombre} name="nombre" label={contacto.labels.nombre} required />
                  <FormField id={idTelefono} name="telefono" label={contacto.labels.telefono} type="tel" required />
                </div>
                <FormField id={idEmail} name="email" label={contacto.labels.email} type="email" required />

                <label className="flex flex-col gap-2">
                  <span className="eyebrow">{contacto.labels.motivo}</span>
                  <select
                    id={idMotivo}
                    name="motivo"
                    required
                    defaultValue=""
                    className="h-12 rounded-[10px] border border-[color:var(--border-strong)] bg-[color:var(--bg)] px-4 text-[color:var(--ink)] outline-none focus:border-[color:var(--ink)]"
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
                    className="rounded-[10px] border border-[color:var(--border-strong)] bg-[color:var(--bg)] px-4 py-3 text-[color:var(--ink)] outline-none focus:border-[color:var(--ink)] resize-none"
                    placeholder="Contanos brevemente tu situación..."
                  />
                </label>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn btn-primary mt-2 group disabled:opacity-60"
                >
                  {status === "sending" ? contacto.labels.enviando : contacto.labels.enviar}
                  <ArrowRight weight="bold" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>

                {status === "sent" && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-[color:var(--color-success)] flex items-center gap-2"
                  >
                    <span className="h-2 w-2 rounded-full bg-[color:var(--color-success)]" />
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
        className="h-12 rounded-[10px] border border-[color:var(--border-strong)] bg-[color:var(--bg)] px-4 text-[color:var(--ink)] outline-none focus:border-[color:var(--ink)] transition-colors"
      />
    </label>
  );
}
