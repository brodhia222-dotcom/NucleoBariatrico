import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { IMCCalculator } from "@/components/sections/IMCCalculator";
import { Diferencial } from "@/components/sections/Diferencial";
import { Equipo } from "@/components/sections/Equipo";
import { Tratamientos } from "@/components/sections/Tratamientos";
import { Proceso } from "@/components/sections/Proceso";
import { NoEstasSolo } from "@/components/sections/NoEstasSolo";
import { Testimonios } from "@/components/sections/Testimonios";
import { ObrasSociales } from "@/components/sections/ObrasSociales";
import { Ubicaciones } from "@/components/sections/Ubicaciones";
import { FAQ } from "@/components/sections/FAQ";
import { Contacto } from "@/components/sections/Contacto";
import { Footer } from "@/components/sections/Footer";

// Mientras no esté cargada la clave para enviar mails (RESEND_API_KEY), las consultas y los testimonios
// salen por WhatsApp en lugar de por el formulario. Se resuelve al construir el sitio.
const envioPorMail = !!process.env.RESEND_API_KEY;

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <IMCCalculator />
        <Diferencial />
        <Equipo />
        <Tratamientos />
        <Proceso />
        <NoEstasSolo envioPorMail={envioPorMail} />
        <Testimonios envioPorMail={envioPorMail} />
        <ObrasSociales />
        <Ubicaciones />
        <FAQ />
        <Contacto envioPorMail={envioPorMail} />
      </main>
      <Footer />
    </>
  );
}
