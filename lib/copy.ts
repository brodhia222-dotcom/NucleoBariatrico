// ============================================================================
// NUCLEO BARIATRICO · Copy
// Modo demo: bodies en lorem para que el cliente apruebe estructura/dirección
// antes de redactar texto definitivo. Los TÍTULOS, eyebrows, CTAs y elementos
// funcionales (IMC, navegación, contacto) sí mantienen copy real.
// ============================================================================

const lorem = {
  short:
    "Lorem ipsum dolor sit amet consectetur. Nullam vitae libero ut elit faucibus consectetur. Sed do eiusmod tempor incididunt.",
  medium:
    "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vestibulum ut libero in lectus laoreet faucibus. Curabitur in lectus nec urna venenatis fermentum non a tortor. Etiam at orci a leo bibendum dapibus.",
  long:
    "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vestibulum ut libero in lectus laoreet faucibus. Curabitur in lectus nec urna venenatis fermentum non a tortor. Etiam at orci a leo bibendum dapibus. Ut imperdiet justo sit amet velit auctor, eu commodo nisl gravida.",
  quote:
    "Lorem ipsum dolor sit amet consectetur. Nullam vitae libero ut elit faucibus consectetur — sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
};

export const brand = {
  name: "Nucleo Bariátrico",
  short: "Nucleo",
  tagline: "Tu salud empieza acá",
  taglineLong: "El origen de una vida plena",
  whatsappNumber: "+5491100000000", // PENDIENTE
  whatsappMessage: "Hola, me gustaría agendar una consulta.",
  email: "contacto@nucleobariatrico.com.ar",
  domain: "nucleobariatrico.com.ar",
};

export const nav = {
  links: [
    { href: "#imc", label: "IMC" },
    { href: "#proceso", label: "Proceso" },
    { href: "#equipo", label: "Equipo" },
    { href: "#testimonios", label: "Testimonios" },
    { href: "#faq", label: "Preguntas" },
  ],
  cta: { href: "#contacto", label: "Pedir turno" },
};

export const hero = {
  eyebrow: "Cirugía bariátrica · Equipo médico",
  headline: ["Tu salud", "empieza", "acá."],
  body: lorem.medium,
  primary: { label: "Calcular mi IMC", href: "#imc" },
  secondary: { label: "Conocer al equipo", href: "#equipo" },
};

export const diferencial = {
  eyebrow: "Qué nos diferencia",
  headline: "Un equipo, un núcleo, un solo recorrido.",
  items: [
    {
      badge: "01 · Equipo",
      title: "Equipo especializado al frente",
      body: lorem.short,
      cta: "Conocer al equipo",
      href: "#equipo",
      foto: "/images/proceso-evaluacion-integral.jpg",
    },
    {
      badge: "02 · Abordaje",
      title: "Mirada integral, no solo quirúrgica",
      body: lorem.short,
      cta: "Ver proceso",
      href: "#proceso",
      foto: "/images/diferencial-mirada.jpg",
    },
    {
      badge: "03 · Cobertura",
      title: "Obras sociales incluidas",
      body: lorem.short,
      cta: "Consultar cobertura",
      href: "#obras-sociales",
      foto: "/images/diferencial-cobertura.jpg",
    },
    {
      badge: "04 · Locaciones",
      title: "Dos puntos de atención",
      body: lorem.short,
      cta: "Ver ubicaciones",
      href: "#ubicaciones",
      foto: null,
    },
  ] as {
    badge: string;
    title: string;
    body: string;
    cta: string;
    href: string;
    foto: string | null;
  }[],
};

export const imcCalc = {
  eyebrow: "Calculadora",
  headline: "Empezá por saber dónde estás parado.",
  body: lorem.medium,
  labels: {
    peso: "Peso (kg)",
    altura: "Altura (cm)",
    calcular: "Calcular IMC",
    resultado: "Tu IMC",
    categoria: "Categoría",
    enviar: "Enviar mi consulta con este dato",
    nota: "El IMC es orientativo. La indicación quirúrgica la define el equipo médico tras una evaluación completa.",
  },
  categories: [
    { range: "< 18.5", label: "Bajo peso", color: "indigo" },
    { range: "18.5 – 24.9", label: "Normal", color: "indigo" },
    { range: "25 – 29.9", label: "Sobrepeso", color: "indigo" },
    { range: "30 – 34.9", label: "Obesidad I", color: "orange" },
    { range: "35 – 39.9", label: "Obesidad II", color: "orange" },
    { range: "≥ 40", label: "Obesidad III", color: "orange" },
  ],
  highIMCMessage: "Tu IMC sugiere que podemos ayudarte. Conversemos.",
  messages: {
    alerta:
      "Tu IMC entra en zona de obesidad. Te recomendamos una consulta médica para evaluación metabólica.",
    critico:
      "Tu IMC es elevado. Conversemos para una evaluación clínica con nuestro equipo.",
  },
  badges: {
    alerta: "Evaluación clínica",
    critico: "Conversemos",
  },
};

export const equipo = {
  eyebrow: "El equipo",
  headline: "Tres profesionales, una sola consulta.",
  body: lorem.short,
  miembros: [
    {
      nombre: "Agustina",
      rol: "Cirujana Bariátrica",
      bio: lorem.medium,
      foto: "/images/equipo-agustina.jpg",
    },
    {
      nombre: "Sergio",
      rol: "Cirujano Bariátrico",
      bio: lorem.medium,
      foto: "/images/equipo-sergio.jpg",
    },
    {
      nombre: "Nahuel",
      rol: "Cirujano Bariátrico",
      bio: lorem.medium,
      foto: "/images/equipo-nahuel.jpg",
    },
  ],
};

export const proceso = {
  eyebrow: "Cómo te acompañamos",
  headline: "Un recorrido continuo, no una operación aislada.",
  body: lorem.short,
  pasos: [
    { n: "01", titulo: "Primera consulta", body: lorem.short, foto: "/images/proceso-primera-consulta.jpg", fotoPos: "center 58%" },
    { n: "02", titulo: "Evaluación integral", body: lorem.short, foto: "/images/proceso-evaluacion-integral.jpg", fotoPos: "center" },
    { n: "03", titulo: "Cobertura y trámites", body: lorem.short, foto: "/images/proceso-tramites.jpg", fotoPos: "center 40%" },
    { n: "04", titulo: "Cirugía", body: lorem.short, foto: "/images/proceso-cirugia.jpg", fotoPos: "center 55%" },
    { n: "05", titulo: "Seguimiento", body: lorem.short, foto: "/images/proceso-seguimiento.jpg", fotoPos: "center" },
  ] as { n: string; titulo: string; body: string; foto: string | null; fotoPos?: string }[],
};

export const testimonios = {
  eyebrow: "Testimonios",
  headline: "Cambios reales, no promesas.",
  body: lorem.short,
  items: [
    {
      type: "text" as const,
      nombre: "M.",
      tiempo: "8 meses después de la cirugía",
      quote: lorem.quote,
      rating: 5,
      foto: "/images/testimonio-1.jpg",
    },
    {
      type: "image" as const,
      nombre: "C.",
      tiempo: "1 año y 2 meses",
      quote: lorem.quote,
      thumbnail: null,
      foto: "/images/testimonio-2.jpg",
    },
    {
      type: "text" as const,
      nombre: "L.",
      tiempo: "6 meses",
      quote: lorem.quote,
      rating: 5,
      foto: "/images/testimonio-3.jpg",
    },
    {
      type: "video" as const,
      nombre: "R.",
      tiempo: "10 meses",
      quote: lorem.short,
      thumbnail: null,
      mediaUrl: null,
      foto: "/images/testimonio-4.jpg",
    },
    {
      type: "text" as const,
      nombre: "J.",
      tiempo: "4 meses",
      quote: lorem.quote,
      rating: 5,
      foto: null,
    },
    {
      type: "image" as const,
      nombre: "A.",
      tiempo: "1 año",
      quote: lorem.quote,
      thumbnail: null,
      foto: null,
    },
  ],
};

export const obrasSociales = {
  eyebrow: "Cobertura",
  headline: "Tu obra social puede cubrir la cirugía.",
  body: lorem.medium,
  badge: "Consultá tu cobertura",
  cta: { label: "Hablar con el equipo", href: "#contacto" },
  notaEfector: lorem.short,
  logosPendiente: "Lorem ipsum logos pendiente.",
  // fit: "cover" = tile de marca con fondo propio (llena la tarjeta);
  //      "contain" = logo sobre fondo claro (centrado en tarjeta blanca)
  planes: [
    { nombre: "OSDE", logo: "/images/obras/osde.png", fit: "cover" },
    { nombre: "Swiss Medical", logo: "/images/obras/swiss-medical.png", fit: "contain" },
    { nombre: "Galeno", logo: "/images/obras/galeno.png", fit: "cover" },
    { nombre: "Medifé", logo: "/images/obras/medife.png", fit: "cover" },
    { nombre: "Omint", logo: "/images/obras/omint.png", fit: "contain" },
    { nombre: "Hospital Italiano", logo: "/images/obras/hospital-italiano.png", fit: "contain" },
    { nombre: "Avalian", logo: "/images/obras/avalian.png", fit: "contain" },
    { nombre: "Accord Salud", logo: "/images/obras/accord-salud.png", fit: "cover" },
    { nombre: "Sancor Salud", logo: "/images/obras/sancor-salud.png", fit: "cover" },
  ] as { nombre: string; logo: string; fit: "cover" | "contain" }[],
};

export const ubicaciones = {
  eyebrow: "Dónde encontrarnos",
  headline: "Dos puntos de atención.",
  body: lorem.short,
  sedes: [
    {
      nombre: "Villa del Parque",
      direccion: "Lorem ipsum dolor sit amet · CABA",
      mapa: "https://maps.google.com/maps?q=Villa%20del%20Parque%2C%20CABA&t=&z=14&ie=UTF8&iwloc=&output=embed",
    },
    {
      nombre: "San Isidro",
      direccion: "Lorem ipsum dolor · Zona Norte",
      mapa: "https://maps.google.com/maps?q=San%20Isidro%2C%20Buenos%20Aires&t=&z=14&ie=UTF8&iwloc=&output=embed",
    },
  ],
};

export const noEstasSolo = {
  eyebrow: "Una nota",
  headline: "No estás solo.",
  body: lorem.short,
  cta: {
    leer: "Leer un mensaje",
    dejar: "Dejar un mensaje",
  },
  mensajesEntrantes: [
    {
      texto:
        "Lorem ipsum dolor sit amet consectetur. Nullam vitae libero ut elit faucibus consectetur — sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      autor: "Una paciente · 6 meses post-cirugía",
    },
    {
      texto:
        "Curabitur in lectus nec urna venenatis fermentum non a tortor. Etiam at orci a leo bibendum dapibus — ut imperdiet justo sit amet velit auctor.",
      autor: "Un paciente · 1 año post-cirugía",
    },
    {
      texto:
        "Vestibulum ut libero in lectus laoreet faucibus. Curabitur in lectus nec urna venenatis fermentum non a tortor.",
      autor: "Una paciente · 8 meses post-cirugía",
    },
  ],
  formLabels: {
    placeholder: "Dejá unas palabras que quieras que otra persona lea cuando llegue acá…",
    submit: "Compartir mensaje",
    thanks: "Gracias por dejar un mensaje. Cuando alguien más llegue hasta acá, tu mensaje lo va a estar esperando.",
  },
};

export const faq = {
  eyebrow: "Preguntas frecuentes",
  headline: "Lo que más nos consultan.",
  items: [
    { q: "Pregunta 1", a: lorem.medium },
    { q: "Pregunta 2", a: lorem.medium },
    { q: "Pregunta 3", a: lorem.medium },
    { q: "Pregunta 4", a: lorem.medium },
    { q: "Pregunta 5", a: lorem.medium },
    { q: "Pregunta 6", a: lorem.medium },
  ],
};

export const contacto = {
  eyebrow: "Contacto",
  headline: "Conversemos.",
  body: lorem.short,
  labels: {
    nombre: "Nombre completo",
    telefono: "Teléfono",
    email: "Email",
    motivo: "Motivo de la consulta",
    mensaje: "Mensaje",
    enviar: "Enviar consulta",
    enviando: "Enviando…",
    enviado: "Recibimos tu consulta. Te respondemos en menos de 24 hs.",
    error: "Algo no funcionó. Probá de nuevo o escribinos por WhatsApp.",
    imcAuto: "Tu IMC calculado",
  },
  motivos: [
    "Quiero saber si soy candidato",
    "Tengo dudas sobre la cobertura",
    "Quiero agendar primera consulta",
    "Otra consulta",
  ],
  whatsapp: { label: "Escribir por WhatsApp", href: "" },
};

export const footer = {
  tagline: brand.taglineLong,
  contacto: {
    whatsapp: brand.whatsappNumber,
    email: brand.email,
  },
  sedes: ubicaciones.sedes.map((s) => ({ nombre: s.nombre, direccion: s.direccion })),
  legal: lorem.long,
  copyright: `© ${new Date().getFullYear()} Nucleo Bariátrico. Todos los derechos reservados.`,
};
