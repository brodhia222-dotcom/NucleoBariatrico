import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { testimonios } from "@/lib/copy";

export function Testimonios() {
  return (
    <Section id="testimonios" tone="elevated">
      <Container>
        <div className="mb-16 grid gap-8 lg:grid-cols-12 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{testimonios.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="display-md mt-4"
                style={{ fontVariationSettings: '"opsz" 72', maxWidth: "16ch" }}
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

        <div className="grid gap-6 md:grid-cols-3">
          {testimonios.items.map((t, i) => (
            <Reveal key={t.nombre + i} delay={i * 0.1}>
              <figure className="flex h-full flex-col gap-6 rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-[color:var(--bg)] p-8 shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]">
                <span aria-hidden className="font-display text-5xl text-[color:var(--accent)] leading-none">“</span>
                <blockquote
                  className="font-display text-[color:var(--ink)] flex-1"
                  style={{ fontSize: "21px", lineHeight: 1.4, fontVariationSettings: '"opsz" 36', fontWeight: 400 }}
                >
                  {t.quote}
                </blockquote>
                <figcaption className="flex flex-col gap-1 border-t border-[color:var(--border)] pt-4">
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
