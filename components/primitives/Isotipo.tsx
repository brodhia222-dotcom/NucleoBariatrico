import { cn } from "@/lib/utils";

// Isotipo Nucleo · N + U entrelazadas como una línea continua.
// Versión SVG 2D del manual oficial (variable de colores permitida).
// Es el fallback estático del componente 3D del hero.

type IsotipoProps = {
  className?: string;
  /** Stroke color. Default: currentColor (inherits from text color). */
  color?: string;
  /** Stroke width as fraction of viewBox (default 0.16). */
  strokeWidth?: number;
  title?: string;
};

export function Isotipo({
  className,
  color = "currentColor",
  strokeWidth = 14,
  title = "Nucleo Bariátrico",
}: IsotipoProps) {
  return (
    <svg
      role="img"
      aria-label={title}
      viewBox="0 0 100 100"
      className={cn("block", className)}
      fill="none"
    >
      <title>{title}</title>
      {/*
        Path inspirado en el isotipo oficial del manual de Nucleo:
        línea única, continua, que dibuja una "N" entrelazada con una "U".
        Reconstruida a partir del PDF de identidad visual.
      */}
      <path
        d="
          M 20 78
          L 20 30
          A 14 14 0 0 1 48 30
          L 48 78
          A 14 14 0 0 0 76 78
          L 76 30
        "
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function IsotipoLockup({
  className,
  color = "currentColor",
  showTagline = false,
}: {
  className?: string;
  color?: string;
  showTagline?: boolean;
}) {
  return (
    <div className={cn("inline-flex flex-col items-center gap-2", className)} aria-label="Nucleo Bariátrico">
      <Isotipo className="h-10 w-10" color={color} strokeWidth={14} />
      <div className="flex flex-col items-center leading-none">
        <span
          className="font-display"
          style={{
            color,
            fontSize: "clamp(20px, 2.4vw, 28px)",
            letterSpacing: "-0.03em",
            fontWeight: 400,
          }}
        >
          nucleo
        </span>
        <span
          className="font-body"
          style={{
            color,
            fontSize: "clamp(10px, 0.9vw, 12px)",
            letterSpacing: "0.32em",
            textTransform: "lowercase",
            marginTop: "0.2em",
            opacity: 0.8,
          }}
        >
          bariátrico
        </span>
        {showTagline && (
          <span
            className="eyebrow mt-3"
            style={{ color, opacity: 0.65 }}
          >
            Tu salud empieza acá
          </span>
        )}
      </div>
    </div>
  );
}
