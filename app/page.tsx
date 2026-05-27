import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Manifiesto } from "@/components/sections/Manifiesto";
import { IMCCalculator } from "@/components/sections/IMCCalculator";
import { Diferencial } from "@/components/sections/Diferencial";
import { Equipo } from "@/components/sections/Equipo";
import { Proceso } from "@/components/sections/Proceso";
import { NoEstasSolo } from "@/components/sections/NoEstasSolo";
import { Testimonios } from "@/components/sections/Testimonios";
import { ObrasSociales } from "@/components/sections/ObrasSociales";
import { Ubicaciones } from "@/components/sections/Ubicaciones";
import { FAQ } from "@/components/sections/FAQ";
import { Contacto } from "@/components/sections/Contacto";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Manifiesto />
        <IMCCalculator />
        <Diferencial />
        <Equipo />
        <Proceso />
        <NoEstasSolo />
        <Testimonios />
        <ObrasSociales />
        <Ubicaciones />
        <FAQ />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
