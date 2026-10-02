"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ChatCenteredText, Quotes } from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { brand, testimonios, type Testimonio } from "@/lib/copy";
import { TestimonioForm } from "@/components/ui/TestimonioForm";
import { easeOut, viewportOnce } from "@/lib/motion";

// Testimonios reales y anónimos (encuesta de satisfacción del equipo): 4 tarjetas iguales, 2 por fila
// en compu y tablet. Sin foto, nombre ni firma: de quién son lo dice la aclaración de arriba, y lo que
// se luce es la frase, con la idea central de cada comentario marcada. Las tarjetas claras van sobre el
// fondo más oscuro del sitio para que se despeguen. No se tocan, así que no tienen efecto al pasar
// el cursor.
// envioPorMail: si el sitio puede enviar mails, "Compartir mi experiencia" abre el formulario; si no,
// abre WhatsApp con el mensaje ya empezado.
export function Testimonios({ envioPorMail }: { envioPorMail: boolean }) {
  const [formAbierto, setFormAbierto] = useState(false);
  const v = variantes(!!useReducedMotion());

  return (
    <Section id="testimonios" tone="subtle">
      <Container>
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-8 lg:mb-10">
          {/* Sobre este fondo el gris violáceo de los pre-títulos no llega al contraste mínimo */}
          <Reveal>
            <Eyebrow className="!text-[color:var(--ink)]/80">{testimonios.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(30px, 3.6vw, 46px)",
                lineHeight: 1.04,
                letterSpacing: "-0.025em",
                fontWeight: 300,
                fontVariationSettings: '"opsz" 72',
                textWrap: "balance",
              }}
            >
              {testimonios.headline}
            </h2>
          </Reveal>
          {/* De dónde salen los comentarios y por qué no llevan nombre */}
          <Reveal delay={0.1}>
            <p className="body-lg max-w-[54ch] text-[color:var(--ink)]/80" style={{ textWrap: "balance" }}>
              {testimonios.nota}
            </p>
          </Reveal>
        </div>

        <ul className="grid gap-4 md:grid-cols-2 lg:gap-6">
          {testimonios.items.map((t, i) => (
            <Tarjeta key={t.destacado} t={t} orden={i} v={v} />
          ))}
        </ul>

        {/* Los pacientes pueden dejar su experiencia; el equipo la revisa antes de publicarla */}
        <Reveal delay={0.1}>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 lg:mt-9">
            <p className="body text-[color:var(--ink)]/80">{testimonios.formulario.invitacion}</p>
            {envioPorMail ? (
              <button
                type="button"
                onClick={() => setFormAbierto(true)}
                aria-haspopup="dialog"
                className="btn btn-ghost"
              >
                <ChatCenteredText weight="regular" className="h-4 w-4" />
                {testimonios.formulario.boton}
              </button>
            ) : (
              <a href={enlaceTestimonio} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <ChatCenteredText weight="regular" className="h-4 w-4" />
                {testimonios.formulario.boton}
              </a>
            )}
          </div>
        </Reveal>
      </Container>
      {envioPorMail && <TestimonioForm abierto={formAbierto} onCerrar={() => setFormAbierto(false)} />}
    </Section>
  );
}

// WhatsApp con el mensaje del testimonio ya empezado (ver envioPorMail)
export const enlaceTestimonio = `https://wa.me/${brand.whatsappNumber.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
  testimonios.formulario.whatsapp,
)}`;

// Movimiento: la tarjeta entra subiendo y la cita aparece enseguida. La marca de la frase central es
// el gesto de la sección: se pinta de izquierda a derecha, como con un resaltador, recién cuando esa
// frase está entera a la vista (tiene su propio disparo, no el de la tarjeta) y en orden de lectura
// si entran varias tarjetas juntas. Con movimiento reducido todo está en su lugar final desde el
// principio, con la marca ya pintada, y solo se funde.
function variantes(reducir: boolean) {
  const tarjeta: Variants = {
    oculto: { opacity: 0, y: reducir ? 0 : 28 },
    visible: (demora: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: reducir ? 0.3 : 0.7, ease: easeOut, delay: demora, delayChildren: demora + 0.18 },
    }),
  };
  const cita: Variants = {
    oculto: { opacity: 0, y: reducir ? 0 : 14 },
    visible: { opacity: 1, y: 0, transition: { duration: reducir ? 0.3 : 0.6, ease: easeOut } },
  };
  const marca: Variants = {
    oculto: { backgroundSize: reducir ? "100% 100%" : "0% 100%" },
    visible: (orden: number) => ({
      backgroundSize: "100% 100%",
      transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: 0.5 + orden * 0.15 },
    }),
  };
  return { tarjeta, cita, marca };
}

type Variantes = ReturnType<typeof variantes>;

// La frase tiene que estar entera en pantalla, y no pegada al borde de abajo, para que se pinte
const vistaMarca = { once: true, amount: "all" as const, margin: "0px 0px -12% 0px" };

function Tarjeta({ t, orden, v }: { t: Testimonio; orden: number; v: Variantes }) {
  return (
    <motion.li
      initial="oculto"
      whileInView="visible"
      viewport={viewportOnce}
      variants={v.tarjeta}
      // en compu la tarjeta de la derecha entra un instante después que la de la izquierda
      custom={(orden % 2) * 0.12}
      className="rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-5 sm:p-7 lg:p-8"
    >
      <Quotes weight="fill" aria-hidden className="h-7 w-7 text-[color:var(--accent)] lg:h-8 lg:w-8" />

      <motion.blockquote
        variants={v.cita}
        className="balance-desde-lg mt-3 font-display lg:mt-4"
        style={{
          fontSize: "clamp(17.5px, 1.45vw, 20.5px)",
          lineHeight: 1.42,
          letterSpacing: "-0.01em",
          fontWeight: 300,
          fontVariationSettings: '"opsz" 32',
        }}
      >
        <Cita t={t} orden={orden} v={v} />
      </motion.blockquote>
    </motion.li>
  );
}

const escapar = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// La cita con su frase central marcada. La frase se busca dentro del texto ya ajustado, donde algunos
// espacios son duros (para que no queden palabras sueltas al final de un renglón).
function Cita({ t, orden, v }: { t: Testimonio; orden: number; v: Variantes }) {
  const patron = new RegExp(t.destacado.split(" ").map(escapar).join("[ \\u00A0]"));
  const m = t.quote.match(patron);
  if (!m || m.index === undefined) return <>{t.quote}</>;
  return (
    <>
      {t.quote.slice(0, m.index)}
      <motion.span
        initial="oculto"
        whileInView="visible"
        viewport={vistaMarca}
        variants={v.marca}
        custom={orden}
        className="bg-no-repeat font-medium"
        style={{
          // Resaltador: una franja suave del color de acento que no llega a tapar el renglón entero
          backgroundImage:
            "linear-gradient(to top, color-mix(in srgb, var(--accent) 24%, transparent) 62%, transparent 62%)",
          backgroundPosition: "0 100%",
        }}
      >
        {m[0]}
      </motion.span>
      {t.quote.slice(m.index + m[0].length)}
    </>
  );
}
