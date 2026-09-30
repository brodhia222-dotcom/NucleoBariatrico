import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Nucleo Bariátrico · Tu salud empieza acá";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Las mismas tipografías de la web (Fraunces Light en tamaño grande y Manrope)
  const [fraunces, frauncesItalic, manrope, logo] = await Promise.all([
    readFile(join(process.cwd(), "assets/og/Fraunces-Light.ttf")),
    readFile(join(process.cwd(), "assets/og/Fraunces-LightItalic.ttf")),
    readFile(join(process.cwd(), "assets/og/Manrope-Medium.ttf")),
    readFile(join(process.cwd(), "public/logos/logo-blanco-trimmed.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#3f356e",
          padding: "72px 88px",
          color: "#f5f1e0",
          fontFamily: "Manrope",
        }}
      >
        {/* 701x202 */}
        <img src={logoSrc} alt="" width={194} height={56} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            gap: 28,
          }}
        >
          <span
            style={{
              fontSize: 18,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(245,241,224,0.7)",
            }}
          >
            Cirugía bariátrica · Equipo médico
          </span>
          {/* Un renglón por bloque: el generador no respeta los saltos de línea dentro de un texto */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Fraunces",
              fontSize: 116,
              lineHeight: 1,
              letterSpacing: "-0.035em",
            }}
          >
            <span>Tu salud</span>
            <span style={{ display: "flex" }}>
              empieza&nbsp;
              <span style={{ color: "#df7e35", fontStyle: "italic" }}>acá.</span>
            </span>
          </div>
          <span
            style={{
              fontSize: 22,
              color: "rgba(245,241,224,0.7)",
              letterSpacing: "0.04em",
            }}
          >
            Villa del Parque · Lomas de Zamora
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, style: "normal", weight: 300 },
        { name: "Fraunces", data: frauncesItalic, style: "italic", weight: 300 },
        { name: "Manrope", data: manrope, style: "normal", weight: 500 },
      ],
    },
  );
}
