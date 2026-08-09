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
    "Lorem ipsum dolor sit amet consectetur. Nullam vitae libero ut elit faucibus consectetur, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
};

export const brand = {
  name: "Nucleo Bariátrico",
  short: "Nucleo",
  tagline: "Tu salud empieza acá",
  taglineLong: "El origen de una vida plena",
  // Celular AR: se marca como +54 9 11 XXXX-XXXX para wa.me
  whatsappNumber: "+5491156077780",
  whatsappMessage: "Hola, me gustaría agendar una consulta.",
  email: "contacto@nucleobariatrico.com.ar",
  domain: "nucleobariatrico.com.ar",
  instagram: "https://www.instagram.com/nucleobariatrico/",
};

// Ordenado según el orden real de las secciones en el scroll:
// IMC → Diferencial → Equipo → Tratamientos → Proceso → Testimonios → FAQ
export const nav = {
  links: [
    { href: "#imc", label: "IMC" },
    { href: "#equipo", label: "Equipo" },
    { href: "#tratamientos", label: "Tratamientos" },
    { href: "#proceso", label: "Proceso" },
    { href: "#testimonios", label: "Testimonios" },
    { href: "#faq", label: "Preguntas" },
  ],
  cta: { href: "#contacto", label: "Pedir turno" },
};

export const hero = {
  eyebrow: "Cirugía bariátrica · Equipo médico",
  headline: ["Tu salud", "empieza", "acá."],
  // Copy aprobado por Maya Vega (2026-07-03)
  body: "Somos un equipo especializado en cirugía bariátrica y metabólica. Abordamos la obesidad desde una mirada integral, con tratamientos médicos, farmacológicos y quirúrgicos adaptados a cada caso, y un acompañamiento que sostiene cada etapa del proceso, incluido el seguimiento a largo plazo.",
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
      body: "Cirujanos bariátricos con formación específica en obesidad. Conocé a las personas que van a acompañarte durante todo el recorrido.",
      cta: "Conocer al equipo",
      href: "#equipo",
      foto: "/images/diferencial-equipo.jpg",
    },
    {
      badge: "02 · Abordaje",
      title: "Mirada integral, no solo quirúrgica",
      body: "La cirugía es una herramienta, no la meta. Trabajamos nutrición, hábitos y acompañamiento emocional para que el cambio sea sostenible.",
      cta: "Ver proceso",
      href: "#proceso",
      foto: "/images/diferencial-mirada.jpg",
    },
    {
      badge: "03 · Cobertura",
      title: "Obras sociales incluidas",
      body: "Trabajamos con las principales obras sociales y prepagas, y te guiamos paso a paso en la autorización de tu cobertura.",
      cta: "Consultar cobertura",
      href: "#obras-sociales",
      foto: "/images/diferencial-cobertura.jpg",
    },
    {
      badge: "04 · Locaciones",
      title: "Dos puntos de atención",
      body: "Atendemos en Villa del Parque y San Isidro, para que elijas el punto que te quede más cómodo. Mismo equipo, misma atención.",
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
  headline: "Empezá por saber dónde estás.",
  body: "El IMC (Índice de Masa Corporal) relaciona tu peso con tu altura y es el primer indicador que usa el equipo médico para evaluar si la cirugía bariátrica puede ser una opción para vos. Calculalo en segundos: es el punto de partida de cualquier evaluación.",
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
  headline: "3 Profesionales, una sola consulta.",
  body: null as string | null,
  miembros: [
    {
      nombre: "Agustina",
      rol: "Cirujana Bariátrica",
      // Bio pendiente — Agustina la envía en versión corta (reunión 2026-07-06)
      bio: lorem.medium,
      foto: "/images/equipo-agustina.jpg",
    },
    {
      nombre: "Sergio",
      rol: "Cirujano Bariátrico",
      // Bio real enviada por el equipo (reunión 2026-07-06)
      bio: "Médico (Univ. de Mendoza), especialista en Cirugía General y en Cirugía Bariátrica y Metabólica, con experiencia en cirugía laparoscópica avanzada. Miembro de AAC, SACO e IFSO. Su enfoque combina indicación médica responsable, tratamiento integral de la obesidad y acompañamiento a largo plazo.",
      foto: "/images/equipo-sergio.jpg",
    },
    {
      nombre: "Nahuel",
      rol: "Cirujano Bariátrico",
      // Bio real enviada por el equipo (reunión 2026-07-06)
      bio: "Médico egresado de la UBA, especialista en Cirugía General y en Cirugía Bariátrica y Metabólica. Miembro de SACO e IFSO. Propone un abordaje con visión integral de la obesidad, con decisiones médicas personalizadas y un seguimiento constante.",
      foto: "/images/equipo-nahuel.jpg",
    },
  ],
};

// Sección acordada en la reunión de equipo (2026-07-06): va entre Equipo
// y Proceso. Agustina pidió navegación directa por nombre de tratamiento
// (manga / bypass / balón / inyectables) en vez de solo categorías
// técnicas. Sin marcas comerciales en lo farmacológico.
export const tratamientos = {
  eyebrow: "Tratamientos",
  headline: "Un abordaje distinto para cada caso.",
  body: "No hay un solo camino. Evaluamos tu situación y te proponemos el tratamiento, o la combinación de tratamientos, que mejor se adapte a vos.",
  categorias: [
    {
      categoria: "Farmacológico",
      opciones: [
        {
          id: "inyectables",
          nombre: "Inyectables",
          resumen: "Medicación bajo seguimiento médico.",
          body: "Tratamiento con análogos GLP-1 y otras medicaciones inyectables, indicado según tu perfil metabólico. Puede usarse solo o combinado con otros abordajes, siempre con control médico periódico.",
        },
      ],
    },
    {
      categoria: "No quirúrgico",
      opciones: [
        {
          id: "balon",
          nombre: "Balón gástrico",
          resumen: "Dispositivo temporal y reversible.",
          body: "Un dispositivo que ocupa espacio en el estómago para ayudarte a reducir las porciones. Es temporal, reversible y no requiere cirugía.",
        },
      ],
    },
    {
      categoria: "Quirúrgico",
      opciones: [
        {
          id: "manga",
          nombre: "Manga gástrica",
          resumen: "La técnica más utilizada.",
          body: "Reduce el tamaño del estómago mediante cirugía laparoscópica. Es una de las técnicas más elegidas por sus resultados sostenidos en el tiempo.",
        },
        {
          id: "bypass",
          nombre: "Bypass gástrico",
          resumen: "Para casos más avanzados.",
          body: "Modifica el recorrido del sistema digestivo para reducir la absorción calórica. Se indica en casos de obesidad más avanzada o con comorbilidades asociadas.",
        },
      ],
    },
  ] as {
    categoria: string;
    opciones: { id: string; nombre: string; resumen: string; body: string }[];
  }[],
  reganancia: {
    titulo: "¿Volviste a subir de peso después de la cirugía?",
    body: "La re-ganancia de peso puede pasar, incluso años después de la cirugía. Si te operaste en otro lugar y necesitás retomar el seguimiento, también podemos ayudarte a evaluar tu caso.",
    cta: "Consultar mi caso",
  },
};

export const proceso = {
  eyebrow: "Cómo te acompañamos",
  headline: "Un recorrido continuo, no una operación aislada.",
  body: null as string | null,
  pasos: [
    // La foto 01 es vertical (cara arriba, notebook abajo): necesita
    // contenedor cuadrado para que entren ambas en el encuadre.
    // Copy de pasos 01/02/04/05 aprobado por Maya Vega (2026-07-03); el 03 se mantiene
    {
      n: "01",
      titulo: "Primera consulta",
      body: "Nos conocemos, escuchamos tu historia y respondemos todas tus dudas. Salís de la consulta sabiendo cuál es el abordaje más adecuado para vos y cuáles son los próximos pasos.",
      foto: "/images/proceso-primera-consulta.jpg",
      fotoPos: "center 48%",
      fotoAspect: "aspect-square",
    },
    {
      n: "02",
      titulo: "Evaluación integral",
      body: "Analizamos tu estado de salud en profundidad: historia clínica, estudios y factores metabólicos, junto a la evaluación nutricional y el acompañamiento psicológico. Toda esa información nos permite trazar un plan a tu medida, para que llegues al tratamiento indicado en las mejores condiciones.",
      foto: "/images/proceso-evaluacion-integral.jpg",
      fotoPos: "center",
    },
    {
      n: "03",
      titulo: "Cobertura y trámites",
      body: "Te guiamos con la autorización de tu obra social y todo el papeleo. Nos encargamos de que los trámites no sean un obstáculo en tu recorrido.",
      foto: "/images/proceso-tramites.jpg",
      fotoPos: "center 40%",
    },
    {
      n: "04",
      titulo: "Cirugía",
      body: "Cuando la cirugía es el camino indicado, la realizamos con técnicas mínimamente invasivas e internación corta, para que vuelvas a tu casa lo antes posible. Un momento planificado y acompañado, con protocolos de seguridad en cada instancia.",
      foto: "/images/proceso-cirugia.jpg",
      fotoPos: "center 55%",
    },
    {
      n: "05",
      titulo: "Seguimiento",
      body: "El proceso no termina en el quirófano. Hacemos controles periódicos con todo el equipo durante el tiempo que tu caso lo requiera, porque el seguimiento a largo plazo es lo que permite sostener los resultados y cuidar tu salud en el tiempo.",
      foto: "/images/proceso-seguimiento.jpg",
      fotoPos: "center",
    },
  ] as { n: string; titulo: string; body: string; foto: string | null; fotoPos?: string; fotoAspect?: string }[],
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
      foto: null,
    },
    {
      type: "image" as const,
      nombre: "C.",
      tiempo: "1 año y 2 meses",
      quote: lorem.quote,
      thumbnail: null,
      foto: null,
    },
    {
      type: "text" as const,
      nombre: "L.",
      tiempo: "6 meses",
      quote: lorem.quote,
      rating: 5,
      foto: null,
    },
    {
      type: "video" as const,
      nombre: "R.",
      tiempo: "10 meses",
      quote: lorem.short,
      thumbnail: null,
      mediaUrl: null,
      foto: null,
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
  body: "La cirugía bariátrica está incluida en el Programa Médico Obligatorio (PMO). La cobertura exacta depende de tu obra social o prepaga y del plan que tengas. Te la confirmamos por WhatsApp antes de tu primera consulta.",
  badge: "Consultá tu cobertura",
  cta: { label: "Hablar con el equipo", href: "#contacto" },
  notaEfector:
    "Es el equipo médico habilitado ante tu obra social para realizar una práctica cubierta. Como efectores de cirugía bariátrica, gestionamos tu autorización y te acompañamos con la cobertura de tu plan durante todo el proceso.",
  // Reunión 2026-07-06: mostrar solo 2 destacadas + "otras" (no afirmar
  // coberturas específicas hasta confirmar convenios). OSDE confirmada en
  // la charla; la segunda (Swiss Medical) es ejemplo hasta que el equipo
  // clínico defina cuál destacar — cambiar acá cuando lo confirmen.
  // fit: "cover" = tile de marca con fondo propio (llena la tarjeta);
  //      "contain" = logo sobre fondo claro (centrado en tarjeta blanca)
  destacadas: [
    { nombre: "OSDE", logo: "/images/obras/osde.png", fit: "cover" },
    { nombre: "Swiss Medical", logo: "/images/obras/swiss-medical.png", fit: "contain" },
  ] as { nombre: string; logo: string; fit: "cover" | "contain" }[],
  otras: {
    titulo: "¿Tenés otra obra social o prepaga?",
    body: "Trabajamos con más convenios de los que podemos listar acá. Escribinos y te confirmamos tu cobertura en minutos.",
    cta: "Consultar por WhatsApp",
  },
};

export const ubicaciones = {
  eyebrow: "Dónde encontrarnos",
  headline: "2 puntos de atención.",
  body: null as string | null,
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
  headline: "No estás solo/a.",
  body: "Detrás de cada cirugía hay una historia parecida a la tuya. Leé lo que otros pacientes quisieron contarte, o dejá unas palabras para quien recién empieza el camino.",
  cta: {
    leer: "Leer un mensaje",
    dejar: "Dejar un mensaje",
  },
  mensajesEntrantes: [
    {
      texto:
        "Lorem ipsum dolor sit amet consectetur. Nullam vitae libero ut elit faucibus consectetur, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      autor: "Una paciente · 6 meses post-cirugía",
    },
    {
      texto:
        "Curabitur in lectus nec urna venenatis fermentum non a tortor. Etiam at orci a leo bibendum dapibus, ut imperdiet justo sit amet velit auctor.",
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
  body: "Contanos tu situación en el formulario y un profesional del equipo te responde en menos de 24 horas hábiles. Sin compromiso y con total confidencialidad.",
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
