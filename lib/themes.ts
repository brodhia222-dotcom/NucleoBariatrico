// Paletas curadas para el theme picker.
// Todas usan los mismos slots semánticos (--bg, --ink, --accent, etc.).
// El picker solo cambia esas variables runtime; el resto del CSS sigue igual.

export type ThemeKey =
  | "manual"
  | "inverse"
  | "warmer"
  | "mono"
  | "clinical"
  | "midnight";

export type Theme = {
  key: ThemeKey;
  name: string;
  description: string;
  swatches: [string, string, string]; // [bg, ink, accent] — preview en el picker
  vars: Record<string, string>;
};

export const themes: Theme[] = [
  {
    key: "manual",
    name: "Original",
    description: "Manual oficial: índigo · beige · naranja",
    swatches: ["#f5f1e0", "#3f356e", "#df7e35"],
    vars: {
      "--bg": "#f5f1e0",
      "--bg-elevated": "#fbf8ef",
      "--bg-subtle": "#ebe4cb",
      "--bg-deep": "#d8cdab",
      "--bg-inverse": "#3f356e",
      "--ink": "#3f356e",
      "--ink-soft": "#6a608f",
      "--ink-muted": "#a8a1c4",
      "--ink-inverse": "#f5f1e0",
      "--accent": "#df7e35",
      "--accent-hover": "#b86223",
      "--accent-soft": "#fce8d4",
      "--border": "rgba(63, 53, 110, 0.12)",
      "--border-strong": "rgba(63, 53, 110, 0.24)",
      "--focus-ring": "rgba(223, 126, 53, 0.45)",
    },
  },
  {
    key: "inverse",
    name: "Inverso",
    description: "Índigo de fondo, beige protagonista",
    swatches: ["#2a2349", "#f5f1e0", "#df7e35"],
    vars: {
      "--bg": "#2a2349",
      "--bg-elevated": "#34294f",
      "--bg-subtle": "#1d1739",
      "--bg-deep": "#181232",
      "--bg-inverse": "#f5f1e0",
      "--ink": "#f5f1e0",
      "--ink-soft": "rgba(245, 241, 224, 0.72)",
      "--ink-muted": "rgba(245, 241, 224, 0.45)",
      "--ink-inverse": "#2a2349",
      "--accent": "#df7e35",
      "--accent-hover": "#f0b683",
      "--accent-soft": "rgba(223, 126, 53, 0.18)",
      "--border": "rgba(245, 241, 224, 0.12)",
      "--border-strong": "rgba(245, 241, 224, 0.24)",
      "--focus-ring": "rgba(240, 182, 131, 0.55)",
    },
  },
  {
    key: "warmer",
    name: "Cálido",
    description: "Naranja al frente, todo más warm",
    swatches: ["#fef4e7", "#7a3a1a", "#df7e35"],
    vars: {
      "--bg": "#fef4e7",
      "--bg-elevated": "#fffaf0",
      "--bg-subtle": "#fce8d4",
      "--bg-deep": "#f0b683",
      "--bg-inverse": "#7a3a1a",
      "--ink": "#5a2a10",
      "--ink-soft": "#8a4c2a",
      "--ink-muted": "#bf8d6b",
      "--ink-inverse": "#fef4e7",
      "--accent": "#3f356e",
      "--accent-hover": "#2a2349",
      "--accent-soft": "rgba(63, 53, 110, 0.12)",
      "--border": "rgba(122, 58, 26, 0.14)",
      "--border-strong": "rgba(122, 58, 26, 0.28)",
      "--focus-ring": "rgba(63, 53, 110, 0.45)",
    },
  },
  {
    key: "mono",
    name: "Monocromo",
    description: "Solo índigo y crema, sin acento de color",
    swatches: ["#f5f1e0", "#3f356e", "#6a608f"],
    vars: {
      "--bg": "#f5f1e0",
      "--bg-elevated": "#fbf8ef",
      "--bg-subtle": "#ebe4cb",
      "--bg-deep": "#d8cdab",
      "--bg-inverse": "#3f356e",
      "--ink": "#3f356e",
      "--ink-soft": "#6a608f",
      "--ink-muted": "#a8a1c4",
      "--ink-inverse": "#f5f1e0",
      "--accent": "#3f356e",
      "--accent-hover": "#2a2349",
      "--accent-soft": "rgba(63, 53, 110, 0.10)",
      "--border": "rgba(63, 53, 110, 0.14)",
      "--border-strong": "rgba(63, 53, 110, 0.28)",
      "--focus-ring": "rgba(63, 53, 110, 0.45)",
    },
  },
  {
    key: "clinical",
    name: "Clínico",
    description: "Verde médico sobre crema",
    swatches: ["#f5f1e0", "#2c4a3a", "#4d7c5f"],
    vars: {
      "--bg": "#f5f1e0",
      "--bg-elevated": "#fbf8ef",
      "--bg-subtle": "#ebe4cb",
      "--bg-deep": "#d8cdab",
      "--bg-inverse": "#2c4a3a",
      "--ink": "#2c4a3a",
      "--ink-soft": "#557060",
      "--ink-muted": "#a3b8a8",
      "--ink-inverse": "#f5f1e0",
      "--accent": "#4d7c5f",
      "--accent-hover": "#365842",
      "--accent-soft": "rgba(77, 124, 95, 0.14)",
      "--border": "rgba(44, 74, 58, 0.14)",
      "--border-strong": "rgba(44, 74, 58, 0.28)",
      "--focus-ring": "rgba(77, 124, 95, 0.45)",
    },
  },
  {
    key: "midnight",
    name: "Medianoche",
    description: "Tinta profunda, crema y un coral cálido",
    swatches: ["#1a1b2e", "#f0e9d6", "#e07856"],
    vars: {
      "--bg": "#1a1b2e",
      "--bg-elevated": "#22243c",
      "--bg-subtle": "#10101e",
      "--bg-deep": "#0a0a14",
      "--bg-inverse": "#f0e9d6",
      "--ink": "#f0e9d6",
      "--ink-soft": "rgba(240, 233, 214, 0.72)",
      "--ink-muted": "rgba(240, 233, 214, 0.42)",
      "--ink-inverse": "#1a1b2e",
      "--accent": "#e07856",
      "--accent-hover": "#f29c80",
      "--accent-soft": "rgba(224, 120, 86, 0.18)",
      "--border": "rgba(240, 233, 214, 0.12)",
      "--border-strong": "rgba(240, 233, 214, 0.24)",
      "--focus-ring": "rgba(224, 120, 86, 0.55)",
    },
  },
];

export const defaultTheme: ThemeKey = "manual";

export function applyTheme(key: ThemeKey) {
  const theme = themes.find((t) => t.key === key) ?? themes[0];
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  root.setAttribute("data-theme", key);
  try {
    localStorage.setItem("nucleo-theme", key);
  } catch {}
}

export function getStoredTheme(): ThemeKey {
  try {
    const stored = localStorage.getItem("nucleo-theme") as ThemeKey | null;
    if (stored && themes.some((t) => t.key === stored)) return stored;
  } catch {}
  return defaultTheme;
}
