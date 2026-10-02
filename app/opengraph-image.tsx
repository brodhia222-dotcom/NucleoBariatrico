import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Nucleo Bariátrico · Tu salud empieza acá";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // La misma tipografía de los títulos de la web (Fraunces Light) y el logo vertical, que es el que
  // entra en un cuadrado
  const [fraunces, frauncesItalic, logo] = await Promise.all([
    readFile(join(process.cwd(), "assets/og/Fraunces-Light.ttf")),
    readFile(join(process.cwd(), "assets/og/Fraunces-LightItalic.ttf")),
    readFile(join(process.cwd(), "public/logos/logo-vertical-beige-trimmed.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      // Todo centrado y adentro del cuadrado del medio (630 x 630). WhatsApp en la compu, y varias apps
      // en su vista chica, muestran solo ese cuadrado: con el texto contra la izquierda quedaban
      // pedazos de letras. Nada importante puede ir en las franjas de los costados.
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#3f356e",
          color: "#f5f1e0",
          fontFamily: "Fraunces",
        }}
      >
        {/* 474x330 */}
        <img src={logoSrc} alt="" width={340} height={237} />
        {/* Un renglón por bloque: el generador no respeta los saltos de línea dentro de un texto */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 60,
            fontSize: 84,
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
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, style: "normal", weight: 300 },
        { name: "Fraunces", data: frauncesItalic, style: "italic", weight: 300 },
      ],
    },
  );
}
