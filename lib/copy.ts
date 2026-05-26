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
    { href: "#imc", label: "Calculadora IMC" },
    { href: "#proceso", label: "Proceso" },
    { href: "#equipo", label: "Equipo" },
    { href: "#ubicaciones", label: "Ubicaciones" },
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
    { title: "Cirujana especializada al frente", body: lorem.short },
    { title: "Abordaje integral", body: lorem.short },
    { title: "Obras sociales incluidas", body: lorem.short },
    { title: "Dos puntos de atención", body: lorem.short },
  ],
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
};

export const equipo = {
  eyebrow: "El equipo",
  headline: "Dos profesionales, una sola consulta.",
  body: lorem.short,
  miembros: [
    {
      nombre: "Dra. Agustina",
      rol: "Cirujana bariátrica",
      bio: lorem.medium,
      foto: null,
    },
    {
      nombre: "Sergio",
      rol: "Equipo médico",
      bio: lorem.medium,
      foto: null,
    },
  ],
};

export const proceso = {
  eyebrow: "Cómo te acompañamos",
  headline: "Un recorrido continuo, no una operación aislada.",
  body: lorem.short,
  pasos: [
    { n: "01", titulo: "Primera consulta", body: lorem.short },
    { n: "02", titulo: "Evaluación integral", body: lorem.short },
    { n: "03", titulo: "Cobertura y trámites", body: lorem.short },
    { n: "04", titulo: "Cirugía", body: lorem.short },
    { n: "05", titulo: "Seguimiento", body: lorem.short },
  ],
};

export const testimonios = {
  eyebrow: "Testimonios",
  headline: "Cambios reales, no promesas.",
  body: lorem.short,
  items: [
    { nombre: "M.", tiempo: "8 meses después de la cirugía", quote: lorem.quote },
    { nombre: "C.", tiempo: "1 año y 2 meses", quote: lorem.quote },
    { nombre: "L.", tiempo: "6 meses", quote: lorem.quote },
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
      direccion: "Lorem ipsum dolor sit amet · Zona Norte",
      mapa: "https://maps.google.com/maps?q=San%20Isidro%2C%20Buenos%20Aires&t=&z=14&ie=UTF8&iwloc=&output=embed",
    },
  ],
};

export const noEstasSolo = {
  eyebrow: "Una nota",
  headline: "No estás solo.",
  body: lorem.short,
};

export const faq = {
  eyebrow: "Preguntas frecuentes",
  headline: "Lo que más nos consultan.",
  items: [
    { q: "¿La cirugía bariátrica es estética?", a: lorem.medium },
    { q: "¿La obra social cubre la cirugía?", a: lorem.medium },
    { q: "¿Cuánto dura la internación?", a: lorem.medium },
    { q: "¿Hay seguimiento después de la cirugía?", a: lorem.medium },
    { q: "¿En qué se diferencia el bypass de la manga gástrica?", a: lorem.medium },
    { q: "¿Cuándo es recomendable considerar la cirugía?", a: lorem.medium },
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
