"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type NavStyleKey = "adaptive" | "contrast" | "black" | "white";

export type NavStyleOption = {
  key: NavStyleKey;
  name: string;
  description: string;
};

export const navStyleOptions: NavStyleOption[] = [
  {
    key: "adaptive",
    name: "Adaptativo (actual)",
    description: "Transparente arriba, se tiñe suave al hacer scroll",
  },
  {
    key: "contrast",
    name: "Contraste inverso",
    description: "Barra sólida: violeta sobre fondos claros, clara sobre fondos oscuros",
  },
  {
    key: "black",
    name: "Negro sólido",
    description: "Barra oscura fija en toda la página",
  },
  {
    key: "white",
    name: "Blanco sólido",
    description: "Barra clara fija en toda la página",
  },
];

const STORAGE_KEY = "nucleo-nav-style";
const DEFAULT_STYLE: NavStyleKey = "adaptive";

function readStored(): NavStyleKey {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as NavStyleKey | null;
    if (stored && navStyleOptions.some((o) => o.key === stored)) return stored;
  } catch {}
  return DEFAULT_STYLE;
}

type NavStyleContextValue = {
  navStyle: NavStyleKey;
  setNavStyle: (key: NavStyleKey) => void;
};

const NavStyleContext = createContext<NavStyleContextValue | null>(null);

export function NavStyleProvider({ children }: { children: ReactNode }) {
  const [navStyle, setNavStyleState] = useState<NavStyleKey>(DEFAULT_STYLE);

  // Se lee de localStorage recién en el cliente para no romper SSR/hidratación.
  useEffect(() => {
    setNavStyleState(readStored());
  }, []);

  const setNavStyle = useCallback((key: NavStyleKey) => {
    setNavStyleState(key);
    try {
      localStorage.setItem(STORAGE_KEY, key);
    } catch {}
  }, []);

  const value = useMemo(() => ({ navStyle, setNavStyle }), [navStyle, setNavStyle]);

  return <NavStyleContext.Provider value={value}>{children}</NavStyleContext.Provider>;
}

export function useNavStyle() {
  const ctx = useContext(NavStyleContext);
  if (!ctx) throw new Error("useNavStyle must be used inside <NavStyleProvider>");
  return ctx;
}
