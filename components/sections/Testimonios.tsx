import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { testimonios } from "@/lib/copy";

export function Testimonios() {
  return (
    <Section id="testimonios" tone="elevated">
      <Container>
        <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{testimonios.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="display-md mt-4"
                style={{ fontVariationSettings: '"opsz" 72', textWrap: "balance", maxWidth: "18ch" }}
              >
                {testimonios.headline}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="body-lg text-[color:var(--ink-soft)]">{testimonios.body}</p>
            </Reveal>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonios.items.map((t, i) => (
            <Reveal key={t.nombre + i} delay={i * 0.08}>
              <figure className="flex h-full flex-col justify-between gap-8 rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-[color:var(--bg)] p-8 transition-shadow hover:shadow-[var(--shadow-md)]">
                <blockquote
                  className="font-display text-[color:var(--ink)]"
                  style={{
                    fontSize: "clamp(20px, 1.6vw, 22px)",
                    lineHeight: 1.4,
                    fontVariationSettings: '"opsz" 36',
                    fontWeight: 400,
                  }}
                >
                  <span aria-hidden className="text-[color:var(--accent)] mr-1">“</span>
                  {t.quote}
                </blockquote>
                <figcaption className="flex items-baseline justify-between gap-4 border-t border-[color:var(--border)] pt-4">
                  <span className="font-medium text-[color:var(--ink)]">{t.nombre}</span>
                  <span className="caption">{t.tiempo}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
