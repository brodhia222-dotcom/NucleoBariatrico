import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Nucleo Bariátrico · Tu salud empieza acá";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="48" height="48" viewBox="0 0 100 100" fill="none">
            <path
              d="M 20 78 L 20 30 A 14 14 0 0 1 48 30 L 48 78 A 14 14 0 0 0 76 78 L 76 30"
              stroke="#f5f1e0"
              strokeWidth={14}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{ fontSize: 36, letterSpacing: "-0.03em", fontWeight: 400 }}>nucleo</span>
            <span style={{ fontSize: 14, letterSpacing: "0.32em", marginTop: 4, opacity: 0.8 }}>
              bariátrico
            </span>
          </span>
        </div>

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
          <span
            style={{
              fontSize: 110,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              fontWeight: 400,
            }}
          >
            Tu salud
            <br />
            empieza{" "}
            <span style={{ color: "#df7e35", fontStyle: "italic" }}>acá.</span>
          </span>
          <span
            style={{
              fontSize: 22,
              color: "rgba(245,241,224,0.7)",
              letterSpacing: "0.04em",
            }}
          >
            Villa del Parque · San Isidro
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
