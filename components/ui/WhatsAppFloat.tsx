"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
          className="fixed bottom-6 right-6 z-[600] grid h-14 w-14 place-items-center rounded-full text-white shadow-lg"
          style={{ background: "var(--color-whatsapp)" }}
          initial={{ opacity: 0, scale: 0.85, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 12 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
        >
          <svg
            viewBox="0 0 32 32"
            fill="currentColor"
            className="h-7 w-7"
            aria-hidden="true"
          >
            <path d="M16.005 3C8.82 3 3 8.815 3 15.99c0 2.823.9 5.435 2.427 7.563L4 29l5.65-1.39A12.9 12.9 0 0 0 16 28.98c7.182 0 13-5.815 13-12.99C29 8.815 23.187 3 16.005 3Zm0 23.793a10.8 10.8 0 0 1-5.5-1.504l-.395-.235-3.357.826.83-3.273-.257-.42a10.8 10.8 0 0 1-1.617-5.697c0-5.978 4.85-10.823 10.83-10.823 5.98 0 10.83 4.845 10.83 10.823 0 5.977-4.85 10.823-10.83 10.823Zm5.93-8.105c-.323-.162-1.918-.946-2.215-1.054-.297-.108-.513-.162-.728.162-.216.324-.836 1.054-1.026 1.27-.19.216-.378.243-.7.081-.323-.162-1.366-.503-2.602-1.604-.962-.857-1.612-1.917-1.802-2.241-.19-.324-.02-.5.142-.66.146-.146.323-.378.485-.568.162-.19.216-.324.324-.54.108-.216.054-.405-.027-.567-.081-.162-.728-1.755-.998-2.404-.262-.628-.528-.543-.728-.553l-.62-.011a1.19 1.19 0 0 0-.864.405c-.297.324-1.134 1.108-1.134 2.7 0 1.594 1.16 3.135 1.322 3.351.162.216 2.286 3.493 5.542 4.897.775.334 1.38.533 1.851.681.778.247 1.485.213 2.044.13.624-.093 1.918-.783 2.19-1.539.27-.756.27-1.404.19-1.539-.081-.135-.297-.216-.62-.378Z" />
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
