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
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 mb-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>{diferencial.eyebrow}</Eyebrow>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.05}>
              <h2
                className="display-md"
                style={{ fontVariationSettings: '"opsz" 72', maxWidth: "14ch" }}
              >
                {diferencial.headline}
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="grid gap-px md:grid-cols-2">
          {diferencial.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} className="relative">
              <div className="relative border-t border-[color:var(--border)] py-10 lg:py-12 pr-6">
                <span
                  className="font-mono text-xs text-[color:var(--ink-muted)] absolute top-10 left-0"
                  aria-hidden
                >
                  0{i + 1}
                </span>
                <div className="pl-12">
                  <h3 className="h3 mb-3" style={{ fontVariationSettings: '"opsz" 40' }}>
                    {item.title}
                  </h3>
                  <p className="body text-[color:var(--ink-soft)] max-w-md">{item.body}</p>
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
