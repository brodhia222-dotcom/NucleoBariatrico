import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { brand, testimonios } from "@/lib/copy";

// Testimonios que dejan los pacientes desde la web (PDF de ajustes 2026-09-24).
// No se publican solos: llegan por mail al equipo, que los revisa antes de sumarlos al sitio.

const ATTEMPTS = new Map<string, { count: number; firstAt: number }>();
const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 3;

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ATTEMPTS.get(ip);
  if (!entry || now - entry.firstAt > WINDOW_MS) {
    ATTEMPTS.set(ip, { count: 1, firstAt: now });
    return true;
  }
  entry.count += 1;
  return entry.count <= MAX_ATTEMPTS;
}

const MAX_FOTO = 4 * 1024 * 1024; // la web la achica antes de mandarla (máx. 1600 px)

const TestimonioSchema = z.object({
  nombre: z.string().trim().min(1).max(80),
  tratamiento: z.enum(testimonios.formulario.tratamientos as [string, ...string[]]),
  proceso: z.string().trim().min(3).max(3000),
  cambio: z.string().trim().min(3).max(3000),
  consentimiento: z.literal("si"),
});

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderEmail(data: z.infer<typeof TestimonioSchema>, conFoto: boolean): string {
  const bloque = (titulo: string, texto: string) => `
    <tr><td style="padding-bottom:18px">
      <p style="margin:0 0 4px;font-family:Arial;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#6a608f">${titulo}</p>
      <p style="margin:0;font-family:Arial;font-size:15px;line-height:1.55;color:#3f356e;white-space:pre-line">${escapeHtml(texto)}</p>
    </td></tr>`;
  return `<!doctype html><html><body style="margin:0;background:#f5f1e0;font-family:Arial,Helvetica,sans-serif;color:#2a2349">
    <table cellpadding="0" cellspacing="0" width="100%" style="background:#f5f1e0;padding:48px 16px">
      <tr><td align="center">
        <table cellpadding="0" cellspacing="0" width="600" style="background:#faf7eb;border:1px solid rgba(63,53,110,0.14);border-radius:12px;padding:40px">
          <tr><td>
            <p style="margin:0 0 8px;font-family:Arial;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#6a608f">Nuevo testimonio para revisar · Nucleo Bariátrico</p>
            <h1 style="margin:0 0 24px;font-family:Georgia,serif;font-size:30px;font-weight:300;letter-spacing:-0.02em;color:#3f356e">${escapeHtml(data.nombre)}</h1>
          </td></tr>
          ${bloque("Tratamiento", data.tratamiento)}
          ${bloque(testimonios.formulario.proceso, data.proceso)}
          ${bloque(testimonios.formulario.cambio, data.cambio)}
          ${bloque("Foto", conFoto ? "Adjunta a este mail." : "No envió foto.")}
          ${bloque("Consentimiento", testimonios.formulario.consentimiento + " Sí.")}
        </table>
        <p style="margin:24px 0 0;font-family:Arial;font-size:11px;color:#6a608f">Enviado desde ${escapeHtml(brand.domain)}. No se publica hasta que el equipo lo apruebe.</p>
      </td></tr>
    </table>
  </body></html>`;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? req.headers.get("x-real-ip") ?? "anonymous";
  if (!rateLimit(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "invalid_form" }, { status: 400 });
  }

  // Campo trampa para bots: si viene completo, se descarta sin avisar
  if (String(form.get("website") ?? "").trim()) return NextResponse.json({ ok: true });

  const parsed = TestimonioSchema.safeParse({
    nombre: form.get("nombre"),
    tratamiento: form.get("tratamiento"),
    proceso: form.get("proceso"),
    cambio: form.get("cambio"),
    consentimiento: form.get("consentimiento"),
  });
  if (!parsed.success) {
    // Sin detalle hacia afuera: el listado de campos inválidos le da el mapa a un bot.
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  const foto = form.get("foto");
  let adjunto: { filename: string; content: Buffer } | null = null;
  if (foto instanceof File && foto.size > 0) {
    if (!foto.type.startsWith("image/")) return NextResponse.json({ error: "foto_tipo" }, { status: 400 });
    if (foto.size > MAX_FOTO) return NextResponse.json({ error: "foto_pesada" }, { status: 413 });
    const ext = foto.type === "image/png" ? "png" : foto.type === "image/webp" ? "webp" : "jpg";
    adjunto = { filename: `testimonio-${Date.now()}.${ext}`, content: Buffer.from(await foto.arrayBuffer()) };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? brand.email;
  // Remitente del propio dominio (hay que verificarlo en Resend). Las respuestas no van a esta dirección.
  const from = process.env.CONTACT_FROM_EMAIL ?? `${brand.name} <web@${brand.domain}>`;

  // Sin clave de Resend o sin casilla de destino definida, la demo funciona sin enviar nada.
  if (!apiKey || !to) {
    if (process.env.VERCEL_ENV === "production") {
      console.error(`[testimonio]: falta RESEND_API_KEY o la casilla de destino`);
      return NextResponse.json({ ok: false, error: "No configurado" }, { status: 503 });
    }
    // Nunca se registran los datos de la persona ni su testimonio.
    console.log("[testimonio:dev] testimonio recibido, no se envía: falta la clave o la casilla");
    return NextResponse.json({ ok: true, devMode: true });
  }

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to,
      subject: `Testimonio para revisar · ${parsed.data.nombre} · ${parsed.data.tratamiento}`,
      html: renderEmail(parsed.data, !!adjunto),
      attachments: adjunto ? [adjunto] : undefined,
    });
    if (result.error) {
      console.error("[testimonio] Resend:", result.error.message);
      return NextResponse.json({ error: "No se pudo enviar el testimonio" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[testimonio] error al enviar:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "No se pudo enviar el testimonio" }, { status: 500 });
  }
}
