import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { brand } from "@/lib/copy";

export const metadata = { title: "Página no encontrada" };

export default function NoEncontrada() {
  return (
    <main className="flex min-h-[80vh] items-center bg-[color:var(--bg)] text-[color:var(--ink)]">
      <Container className="py-24">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <Link href="/" aria-label="Ir al inicio de Nucleo Bariátrico" className="mb-2">
            <img src="/logos/logo-indigo.png" alt="Nucleo Bariátrico" className="h-16 w-auto" />
          </Link>
          <span className="eyebrow">Página no encontrada</span>
          <h1
            className="font-display"
            style={{ fontSize: "clamp(34px, 4.4vw, 56px)", lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 300 }}
          >
            Esta página no existe
          </h1>
          <p className="body-lg max-w-[46ch] text-[color:var(--ink-soft)]">
            Puede que el link esté mal escrito o que la página se haya movido. Desde el inicio encontrás toda la
            información del equipo.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/" className="btn btn-primary">
              Volver al inicio
            </Link>
            <a
              href={`https://wa.me/${brand.whatsappNumber.replace(/[^\d]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </Container>
    </main>
  );
}
