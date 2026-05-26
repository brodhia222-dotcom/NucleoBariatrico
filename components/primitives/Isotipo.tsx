import { cn } from "@/lib/utils";

// Isotipo Nucleo · N + U entrelazadas como una línea continua.
// Path estructural del manual: vertical izquierda → arco superior (N) →
// vertical media → arco inferior (U) → vertical derecha. Una sola línea
// continua con line-caps y joins redondeados.
//
// El stroke se escala con el viewBox (viewBox 100×100 — stroke 10 = 10% del lado).
// Antes usábamos vectorEffect="non-scaling-stroke" lo que hacía que el stroke
// fuera de 14px literales del DOM, tapando el SVG en tamaños chicos. Eliminado.

type IsotipoProps = {
  className?: string;
  /** Stroke color. Default: currentColor. */
  color?: string;
  /** Stroke width in viewBox units (100×100). Default 10. */
  strokeWidth?: number;
  title?: string;
};

export function Isotipo({
  className,
  color = "currentColor",
  strokeWidth = 10,
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
      <path
        d="
          M 22 80
          L 22 36
          A 14 14 0 0 1 50 36
          L 50 80
          A 14 14 0 0 0 78 80
          L 78 22
        "
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
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
      <Isotipo className="h-10 w-10" color={color} />
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
