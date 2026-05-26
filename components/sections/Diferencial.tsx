import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { Hairline } from "@/components/primitives/Hairline";
import { diferencial } from "@/lib/copy";

export function Diferencial() {
  return (
    <Section id="diferencial" tone="default">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 mb-16 lg:mb-20">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>{diferencial.eyebrow}</Eyebrow>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={0.05}>
              <h2
                className="display-md"
                style={{
                  fontVariationSettings: '"opsz" 80',
                  textWrap: "balance",
                  maxWidth: "22ch",
                }}
              >
                {diferencial.headline}
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="grid gap-px md:grid-cols-2">
          {diferencial.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="relative border-t border-[color:var(--border)] py-12 lg:py-14">
                <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:gap-10">
                  <span
                    className="font-display text-[color:var(--accent)] tabular-nums"
                    style={{
                      fontSize: "clamp(40px, 4vw, 56px)",
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                      fontWeight: 300,
                      fontVariationSettings: '"opsz" 64',
                    }}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3
                      className="font-display mb-3"
                      style={{
                        fontSize: "clamp(22px, 2.2vw, 28px)",
                        lineHeight: 1.15,
                        letterSpacing: "-0.015em",
                        fontWeight: 400,
                        fontVariationSettings: '"opsz" 40',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p className="body text-[color:var(--ink-soft)] max-w-md">{item.body}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Hairline animated className="mt-px" />
      </Container>
    </Section>
  );
}
