"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsappLogo } from "@phosphor-icons/react";
import { brand } from "@/lib/copy";
import { useIMC } from "@/lib/imc-context";

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const { resultado } = useIMC();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      setVisible(true);
      return;
    }
    const onScroll = () => setVisible(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const baseMessage = brand.whatsappMessage;
  const message = resultado
    ? `${baseMessage} Mi IMC es ${resultado.imc} (${resultado.categoria}).`
    : baseMessage;
  const href = `https://wa.me/${brand.whatsappNumber.replace(/[^\d]/g, "")}?text=${encodeURIComponent(message)}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribir por WhatsApp"
          className="fixed bottom-6 right-6 z-[600] grid h-14 w-14 place-items-center rounded-full text-white shadow-[0_12px_32px_rgba(37,211,102,0.45)]"
          style={{ background: "var(--color-whatsapp)" }}
          initial={{ opacity: 0, scale: 0.85, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 12 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
        >
          <WhatsappLogo weight="fill" className="h-7 w-7" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
