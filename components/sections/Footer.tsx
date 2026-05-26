import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Isotipo } from "@/components/primitives/Isotipo";
import { brand, footer, nav } from "@/lib/copy";

export function Footer() {
  return (
    <Section tone="dark" tight>
      <Container as="footer">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Isotipo className="h-10 w-10 text-[color:var(--ink-inverse)]" strokeWidth={12} />
            <div>
              <p className="font-display text-2xl text-[color:var(--ink-inverse)] tracking-tight" style={{ fontWeight: 400 }}>
                nucleo <span className="opacity-60 text-base align-baseline ml-1">bariátrico</span>
              </p>
              <p
                className="font-display italic mt-2 text-[color:var(--ink-inverse)]/80"
                style={{ fontSize: "20px", lineHeight: 1.3 }}
              >
                {footer.tagline}
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-3">
            <p className="eyebrow text-[color:var(--ink-inverse)]/70">Sitio</p>
            <ul className="flex flex-col gap-2">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="body-sm text-[color:var(--ink-inverse)]/85 hover:text-[color:var(--ink-inverse)] transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-3">
            <p className="eyebrow text-[color:var(--ink-inverse)]/70">Contacto</p>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href={`https://wa.me/${brand.whatsappNumber.replace(/[^\d]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="body-sm text-[color:var(--ink-inverse)]/85 hover:text-[color:var(--ink-inverse)] transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${footer.contacto.email}`}
                  className="body-sm text-[color:var(--ink-inverse)]/85 hover:text-[color:var(--ink-inverse)] transition-colors"
                >
                  {footer.contacto.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-3">
            <p className="eyebrow text-[color:var(--ink-inverse)]/70">Ubicaciones</p>
            <ul className="flex flex-col gap-3">
              {footer.sedes.map((s) => (
                <li key={s.nombre} className="text-[color:var(--ink-inverse)]/85">
                  <p className="body-sm font-medium">{s.nombre}</p>
                  <p className="caption opacity-80">{s.direccion}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-[color:var(--ink-inverse)]/15 pt-8 grid gap-6 md:grid-cols-2 items-start">
          <p className="caption text-[color:var(--ink-inverse)]/70 max-w-prose">{footer.legal}</p>
          <p className="caption text-[color:var(--ink-inverse)]/60 md:text-right">{footer.copyright}</p>
        </div>
      </Container>
    </Section>
  );
}
