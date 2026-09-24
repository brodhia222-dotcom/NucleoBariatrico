"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { WhatsappLogo } from "@phosphor-icons/react";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { brand, obrasSociales } from "@/lib/copy";
import { viewportOnce, easeEditorial } from "@/lib/motion";

export function ObrasSociales() {
  const whatsappHref = `https://wa.me/${brand.whatsappNumber.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
    "Hola, quiero consultar qué cubre mi obra social o prepaga.",
  )}`;

  return (
    <Section id="obras-sociales" tone="default" className="relative overflow-hidden">
      <Container>
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-5 mb-12 lg:mb-16">
          <Reveal>
            <Eyebrow>{obrasSociales.eyebrow}</Eyebrow>
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
              {obrasSociales.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="body-lg text-[color:var(--ink-soft)] max-w-prose">{obrasSociales.body}</p>
          </Reveal>
        </div>

        {/* OSDE · Medifé · Otras (PDF de ajustes 2026-09-24): las 3 tarjetas llevan a WhatsApp;
            la de "Otras" cubre a quien tiene otra obra social o prepaga */}
        <ul className="mx-auto grid max-w-3xl grid-cols-3 gap-3 sm:gap-4">
          {obrasSociales.destacadas.map((plan, i) => (
            <motion.li
              key={plan.nombre}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.55, delay: i * 0.05, ease: easeEditorial }}
            >
              <a
                href={`https://wa.me/${brand.whatsappNumber.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
                  `Hola, tengo ${plan.nombre} y quiero consultar qué cubre mi plan.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Consultar por WhatsApp la cobertura de ${plan.nombre}`}
                className="block rounded-[var(--radius-lg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2"
              >
                <LogoCard plan={plan} />
              </a>
            </motion.li>
          ))}

          <motion.li
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.55, delay: obrasSociales.destacadas.length * 0.05, ease: easeEditorial }}
          >
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${obrasSociales.otras.bajada}: ${obrasSociales.otras.cta}`}
              className="group relative flex aspect-square flex-col items-center justify-center gap-1.5 overflow-hidden rounded-[var(--radius-lg)] bg-[color:var(--ink)] p-3 text-center text-[color:var(--ink-inverse)] transition-shadow duration-300 hover:shadow-[var(--shadow-lg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 sm:aspect-[16/9] sm:gap-2"
            >
              <span
                aria-hidden
                className="grid h-8 w-8 place-items-center rounded-full bg-[color:var(--color-whatsapp)] transition-transform duration-300 group-hover:scale-110 sm:h-9 sm:w-9"
              >
                <WhatsappLogo weight="fill" className="h-4 w-4 text-white" />
              </span>
              <span
                className="font-display"
                style={{ fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.05, fontWeight: 400, fontVariationSettings: '"opsz" 36' }}
              >
                {obrasSociales.otras.titulo}
              </span>
              <span className="hidden text-[12px] leading-tight text-[color:var(--ink-inverse)]/75 sm:block">
                {obrasSociales.otras.bajada}
              </span>
            </a>
          </motion.li>
        </ul>

      </Container>
    </Section>
  );
}

function LogoCard({
  plan,
}: {
  plan: { nombre: string; logo: string; fit: "cover" | "contain" };
}) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const x = useSpring(rawX, { stiffness: 220, damping: 24 });
  const y = useSpring(rawY, { stiffness: 220, damping: 24 });

  const rotateX = useTransform(y, [0, 1], [10, -10]);
  const rotateY = useTransform(x, [0, 1], [-12, 12]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width);
    rawY.set((e.clientY - rect.top) / rect.height);
  };

  const onMouseLeave = () => {
    rawX.set(0.5);
    rawY.set(0.5);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="tilt-wrap group"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="tilt-card relative grid aspect-square sm:aspect-[16/9] place-items-center overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-white transition-shadow duration-300 hover:shadow-[var(--shadow-lg)]"
      >
        {plan.fit === "cover" ? (
          // Tile de marca con fondo de color propio → llena la tarjeta
          <img
            src={plan.logo}
            alt={plan.nombre}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        ) : (
          // Logo sobre fondo claro → centrado con aire en tarjeta blanca
          <img
            src={plan.logo}
            alt={plan.nombre}
            loading="lazy"
            className="relative max-h-[55%] max-w-[70%] object-contain transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </motion.div>
    </div>
  );
}
