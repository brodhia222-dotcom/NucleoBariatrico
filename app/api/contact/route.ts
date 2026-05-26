import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { brand } from "@/lib/copy";

// ---------- Rate limit en memoria por IP (igual modocasa) ----------
const ATTEMPTS = new Map<string, { count: number; firstAt: number }>();
const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 4;

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ATTEMPTS.get(ip);
  if (!entry || now - entry.firstAt > WINDOW_MS) {
    ATTEMPTS.set(ip, { count: 1, firstAt: now });
    return true;
  }
  entry.count += 1;
  if (entry.count > MAX_ATTEMPTS) return false;
  return true;
}

// ---------- Schema ----------
const ContactSchema = z.object({
  nombre: z.string().min(2).max(120),
  telefono: z.string().min(6).max(40),
  email: z.email().max(180),
  motivo: z.string().min(2).max(160),
  mensaje: z.string().max(2000).optional().default(""),
  imc: z.number().positive().max(120).optional(),
  imcCategoria: z.string().max(40).optional(),
  peso: z.number().positive().max(400).optional(),
  altura: z.number().positive().max(260).optional(),
});

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderEmail(data: z.infer<typeof ContactSchema>): string {
  const imcBlock =
    data.imc !== undefined
      ? `
      <tr>
        <td style="padding:24px 0;border-top:1px solid #ebe4cb">
          <p style="margin:0 0 8px;font-family:Arial;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#6a608f">IMC calculado en el sitio</p>
          <p style="margin:0;font-family:Georgia,serif;font-size:32px;letter-spacing:-0.02em;color:#3f356e">
            ${data.imc} · <span style="color:#df7e35">${escapeHtml(data.imcCategoria ?? "—")}</span>
          </p>
          ${data.peso && data.altura ? `<p style="margin:8px 0 0;font-family:Arial;font-size:13px;color:#6a608f">Peso ${data.peso} kg · Altura ${data.altura} cm</p>` : ""}
        </td>
      </tr>`
      : "";

  return `<!doctype html><html><body style="margin:0;background:#f5f1e0;font-family:Arial,Helvetica,sans-serif;color:#2a2349">
    <table cellpadding="0" cellspacing="0" width="100%" style="background:#f5f1e0;padding:48px 16px">
      <tr><td align="center">
        <table cellpadding="0" cellspacing="0" width="600" style="background:#faf7eb;border:1px solid rgba(63,53,110,0.14);border-radius:12px;padding:40px">
          <tr><td>
            <p style="margin:0 0 8px;font-family:Arial;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#6a608f">Nueva consulta · Nucleo Bariátrico</p>
            <h1 style="margin:0 0 24px;font-family:Georgia,serif;font-size:32px;font-weight:300;letter-spacing:-0.02em;color:#3f356e">${escapeHtml(data.nombre)}</h1>
          </td></tr>
          <tr><td style="padding-bottom:16px">
            <p style="margin:0 0 4px;font-family:Arial;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#6a608f">Contacto</p>
            <p style="margin:0;font-family:Arial;font-size:15px">
              <a href="mailto:${escapeHtml(data.email)}" style="color:#3f356e">${escapeHtml(data.email)}</a><br>
              <a href="tel:${escapeHtml(data.telefono)}" style="color:#3f356e">${escapeHtml(data.telefono)}</a>
            </p>
          </td></tr>
          <tr><td style="padding-bottom:16px">
            <p style="margin:0 0 4px;font-family:Arial;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#6a608f">Motivo</p>
            <p style="margin:0;font-family:Arial;font-size:15px;color:#3f356e">${escapeHtml(data.motivo)}</p>
          </td></tr>
          ${
            data.mensaje
              ? `<tr><td style="padding-bottom:16px">
                <p style="margin:0 0 4px;font-family:Arial;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#6a608f">Mensaje</p>
                <p style="margin:0;font-family:Arial;font-size:15px;line-height:1.55;color:#3f356e;white-space:pre-line">${escapeHtml(data.mensaje)}</p>
              </td></tr>`
              : ""
          }
          ${imcBlock}
        </table>
        <p style="margin:24px 0 0;font-family:Arial;font-size:11px;color:#6a608f">Enviado desde ${escapeHtml(brand.domain)}</p>
      </td></tr>
    </table>
  </body></html>`;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "anonymous";

  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_input", issues: parsed.error.issues },
      { status: 400 },
    );
  }
  const data = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? brand.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Nucleo <onboarding@resend.dev>";

  if (!apiKey) {
    // Dev mode — keep demo UX intact without secrets configured.
    console.log("[contact:dev] payload", data);
    return NextResponse.json({ ok: true, devMode: true });
  }

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `Consulta · ${data.nombre}${data.imc ? ` · IMC ${data.imc}` : ""}`,
      html: renderEmail(data),
    });
    if (result.error) {
      return NextResponse.json({ error: result.error.message }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "send_failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
