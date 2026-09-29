// ============================================================================
// NUCLEO BARIATRICO · Copy
// Modo demo: bodies en lorem para que el cliente apruebe estructura/dirección
// antes de redactar texto definitivo. Los TÍTULOS, eyebrows, CTAs y elementos
// funcionales (IMC, navegación, contacto) sí mantienen copy real.
// ============================================================================

import { noOrphans } from "./text";

const lorem = {
  short: noOrphans(
    "Lorem ipsum dolor sit amet consectetur. Nullam vitae libero ut elit faucibus consectetur. Sed do eiusmod tempor incididunt."
  ),
  medium: noOrphans(
    "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vestibulum ut libero in lectus laoreet faucibus. Curabitur in lectus nec urna venenatis fermentum non a tortor. Etiam at orci a leo bibendum dapibus."
  ),
  long: noOrphans(
    "Lorem ipsum dolor sit amet consectetur adipiscing elit. Vestibulum ut libero in lectus laoreet faucibus. Curabitur in lectus nec urna venenatis fermentum non a tortor. Etiam at orci a leo bibendum dapibus. Ut imperdiet justo sit amet velit auctor, eu commodo nisl gravida."
  ),
  quote: noOrphans(
    "Lorem ipsum dolor sit amet consectetur. Nullam vitae libero ut elit faucibus consectetur, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  ),
};

export const brand = {
  name: "Nucleo Bariátrico",
  short: "Nucleo",
  tagline: "Tu salud empieza acá",
  taglineLong: "El origen de una vida plena",
  // Celular AR: se marca como +54 9 11 XXXX-XXXX para wa.me
  whatsappNumber: "+5491156077780",
  whatsappMessage: "Hola, me gustaría agendar una consulta.",
  // Mail y dominio todavía sin definir (el equipo prefería algo como info@...).
  // Mientras sea null no se muestra en el sitio: cargarlo acá cuando exista la casilla.
  email: null as string | null,
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
  body: noOrphans(
    "Somos un equipo especializado en cirugía bariátrica y metabólica. Abordamos la obesidad desde una mirada integral, con tratamientos médicos, farmacológicos y quirúrgicos adaptados a cada caso, y un acompañamiento que sostiene cada etapa del proceso, incluido el seguimiento a largo plazo."
  ),
  primary: { label: "Calcular mi IMC", href: "#imc" },
  secondary: { label: "Conocer al equipo", href: "#equipo" },
};

export const diferencial = {
  eyebrow: "Qué nos diferencia",
  headline: "Un equipo, un núcleo, un solo recorrido.",
  items: [
    {
      badge: "01 · Equipo",
      title: noOrphans("Equipo especializado al frente"),
      body: noOrphans(
        "Cirujanos bariátricos con formación específica en obesidad, junto a nutricionistas y psicóloga. Conocé a las personas que van a acompañarte durante todo el recorrido."
      ),
      cta: "Conocer al equipo",
      href: "#equipo",
      foto: "/images/diferencial-equipo.jpg",
    },
    {
      badge: "02 · Abordaje",
      title: noOrphans("Mirada integral, no solo quirúrgica"),
      body: noOrphans(
        "La cirugía es una herramienta, no la meta. Trabajamos nutrición, hábitos y acompañamiento emocional para que el cambio sea sostenible."
      ),
      cta: "Ver proceso",
      href: "#proceso",
      foto: "/images/diferencial-mirada.jpg",
    },
    {
      badge: "03 · Cobertura",
      // Texto del equipo (PDF de ajustes 2026-09-24)
      title: noOrphans("Obras sociales y prepagas"),
      body: noOrphans(
        "Atendemos pacientes con distintas coberturas. Escribinos y revisamos tu caso para confirmarte qué incluye tu plan."
      ),
      cta: "Consultar cobertura",
      href: "#obras-sociales",
      foto: "/images/diferencial-cobertura.jpg",
    },
    {
      badge: "04 · Atención",
      // Sede única por ahora (PDF de ajustes 2026-09-24): Simbrón 3327, Villa del Parque.
      // La consulta virtual está confirmada en las preguntas frecuentes del mismo PDF.
      // La foto no repite ninguna de la sección "Dónde atendemos".
      title: noOrphans("Presencial o virtual"),
      body: noOrphans(
        "Te recibimos en Simbrón 3327, Villa del Parque, y la primera consulta también puede ser virtual."
      ),
      cta: "Ver dónde atendemos",
      href: "#ubicaciones",
      foto: "/images/diferencial-virtual.jpg",
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
  body: noOrphans(
    "El IMC (Índice de Masa Corporal) relaciona tu peso con tu altura y es el primer indicador que usa el equipo médico para evaluar si la cirugía bariátrica puede ser una opción para vos. Calculalo en segundos: es el punto de partida de cualquier evaluación."
  ),
  labels: {
    peso: "Peso (kg)",
    altura: "Altura (cm)",
    calcular: "Calcular IMC",
    resultado: "Tu IMC",
    categoria: "Categoría",
    enviar: "Enviar mi consulta con este dato",
    nota: noOrphans(
      "El IMC es orientativo. La indicación quirúrgica la define el equipo médico tras una evaluación completa."
    ),
  },
  categories: [
    { range: "< 18.5", label: "Bajo peso", color: "indigo" },
    { range: "18.5 a 24.9", label: "Normal", color: "indigo" },
    { range: "25 a 29.9", label: "Sobrepeso", color: "indigo" },
    { range: "30 a 34.9", label: "Obesidad I", color: "orange" },
    { range: "35 a 39.9", label: "Obesidad II", color: "orange" },
    { range: "≥ 40", label: "Obesidad III", color: "orange" },
  ],
  highIMCMessage: "Tu IMC sugiere que podemos ayudarte. Conversemos.",
  messages: {
    alerta: noOrphans(
      "Tu IMC entra en zona de obesidad. Te recomendamos una consulta médica para evaluación metabólica."
    ),
    critico: noOrphans(
      "Tu IMC es elevado. Conversemos para una evaluación clínica con nuestro equipo."
    ),
  },
  badges: {
    alerta: "Evaluación clínica",
    critico: "Conversemos",
  },
};

export const equipo = {
  eyebrow: "El equipo",
  headline: "Un equipo que te acompaña en cada etapa.",
  body: null as string | null,
  miembros: [
    {
      nombre: "Agustina",
      rol: "Cirujana Bariátrica",
      // Bio real enviada por el equipo (2026-09), acortada al largo de las otras dos
      bio: noOrphans(
        "Médica egresada de la UNR, especialista en Cirugía General, con Fellowship en Cirugía Bariátrica y Metabólica (UBA). Experiencia en manga gástrica, bypass y cirugía de revisión. Miembro de SACO e IFSO. Su práctica combina una atención cercana, basada en la evidencia, con un seguimiento a largo plazo."
      ),
      foto: "/images/equipo-agustina.jpg",
    },
    {
      nombre: "Sergio",
      rol: "Cirujano Bariátrico",
      // Bio real enviada por el equipo (reunión 2026-07-06)
      bio: noOrphans(
        "Médico (Univ. de Mendoza), especialista en Cirugía General y en Cirugía Bariátrica y Metabólica, con experiencia en cirugía laparoscópica avanzada. Miembro de AAC, SACO e IFSO. Su enfoque combina indicación médica responsable, tratamiento integral de la obesidad y acompañamiento a largo plazo."
      ),
      foto: "/images/equipo-sergio.jpg",
    },
    {
      nombre: "Nahuel",
      rol: "Cirujano Bariátrico",
      // Bio real enviada por el equipo (reunión 2026-07-06)
      bio: noOrphans(
        "Médico egresado de la UBA, especialista en Cirugía General y en Cirugía Bariátrica y Metabólica. Miembro de SACO e IFSO. Propone un abordaje con visión integral de la obesidad, con decisiones médicas personalizadas y un seguimiento constante."
      ),
      foto: "/images/equipo-nahuel.jpg",
    },
  ],
  // Psicóloga y nutricionistas: misma tarjeta y mismo tamaño que los cirujanos, en una
  // segunda fila separada por una línea fina, sin rótulo (pedido de Fede, 2026-09-28).
  // Sin retrato (foto: null) se ve la inicial del nombre.
  acompanamiento: {
    miembros: [
      {
        nombre: "Rocío",
        rol: "Psicóloga",
        // Bio enviada en PDF (2026-09), acortada al largo de las de los cirujanos
        bio: noOrphans(
          "Licenciada en Psicología (USAL) y psicoanalista, con práctica clínica desde 2008. Miembro de la Escuela Freudiana de Buenos Aires. En el equipo realiza las evaluaciones psicológicas prequirúrgicas: un espacio de escucha para preparar a cada paciente y acompañar los cambios que implica el tratamiento."
        ),
        // La del pañuelo de la carpeta Nutricionistas es Rocío (account manager, 2026-09-28)
        foto: "/images/equipo-rocio.jpg",
      },
      // Nutricionistas (account manager, 2026-09-28): Lic. Solange Leban y Lic. Débora Salamon.
      // Solo el nombre, como el resto del equipo. Bios todavía pendientes, por eso va lorem.
      {
        nombre: "Solange",
        rol: "Nutricionista",
        bio: lorem.short,
        foto: "/images/equipo-solange.jpg",
      },
      {
        nombre: "Débora",
        rol: "Nutricionista",
        bio: lorem.short,
        foto: "/images/equipo-debora.jpg",
      },
    ] as { nombre: string; rol: string; bio: string; foto: string | null }[],
  },
};

// Textos del equipo (PDF de ajustes 2026-09-24). Orden de menor a mayor
// complejidad; la reganancia va aparte, al final, porque es el diferencial y
// conviene que se lea separada. Cada tarjeta es un botón directo al detalle.
// Sin marcas comerciales en lo farmacológico.
export type Tratamiento = {
  id: string;
  nombre: string;
  // Etiqueta corta de la tarjeta; el subtítulo completo va en el detalle
  categoria: string;
  subtitulo: string;
  parrafos: string[];
  foto: string | null;
  fotoPos?: string;
  // Versión apaisada para la banda de foto de la ventana en celular (si no, se usa la foto)
  fotoHorizontal?: string;
};

export const tratamientos = {
  eyebrow: "Tratamientos",
  headline: "Un abordaje para cada caso.",
  body: noOrphans(
    "La obesidad es una enfermedad crónica y no tiene una única respuesta. Evaluamos tu historia, tu salud y tus objetivos para indicarte el tratamiento adecuado, siempre con acompañamiento nutricional y psicológico."
  ),
  opciones: [
    {
      id: "inyectables",
      nombre: "Inyectables",
      categoria: "Farmacológico",
      subtitulo: "Tratamiento farmacológico",
      parrafos: [
        noOrphans(
          "Indicamos medicación que actúa sobre el apetito y la saciedad: análogos de GLP-1 y agonistas duales GLP-1/GIP. Es un tratamiento médico con controles periódicos. Ajustamos la dosis según tu evolución y lo sostenemos con el equipo de nutrición y psicología."
        ),
        noOrphans("Puede ser el tratamiento principal o complementar un procedimiento, antes o después."),
      ],
      foto: "/images/tratamiento-inyectables.jpg",
    },
    {
      id: "balon",
      nombre: "Balón gástrico",
      categoria: "Sin cirugía",
      subtitulo: "Sin cirugía, sin\u00A0endoscopia, sin\u00A0anestesia",
      parrafos: [
        noOrphans(
          "Una cápsula que se ingiere en una consulta de unos 15 minutos. En el estómago se convierte en un balón que genera saciedad durante aproximadamente 16 semanas y después se elimina de forma natural."
        ),
        noOrphans(
          "Forma parte de un programa de seis meses con seguimiento nutricional y psicológico, para que los nuevos hábitos se sostengan cuando el balón ya no está."
        ),
      ],
      foto: "/images/tratamiento-balon.jpg",
      fotoHorizontal: "/images/tratamiento-balon-horizontal.jpg",
    },
    {
      id: "manga",
      nombre: "Manga gástrica",
      categoria: "Quirúrgico",
      subtitulo: "Gastrectomía en manga",
      parrafos: [
        noOrphans(
          "Reducimos el tamaño del estómago por vía laparoscópica. Disminuye la capacidad y también las hormonas que estimulan el apetito. Internación corta y seguimiento a largo plazo con todo el equipo."
        ),
      ],
      foto: "/images/tratamiento-manga.jpg",
    },
    {
      id: "bypass",
      nombre: "Bypass gástrico",
      categoria: "Quirúrgico",
      subtitulo: "Bypass en Y de Roux",
      parrafos: [
        noOrphans(
          "Creamos un estómago pequeño conectado directamente al intestino. Actúa sobre la cantidad de alimento y sobre la absorción, con un efecto metabólico marcado en enfermedades asociadas como la diabetes tipo 2. Cirugía laparoscópica, internación corta y controles de por vida."
        ),
      ],
      foto: "/images/tratamiento-bypass.jpg",
    },
  ] as Tratamiento[],
  reganancia: {
    id: "reganancia",
    nombre: "Reganancia de peso",
    subtitulo: "Después de una cirugía bariátrica",
    parrafos: [
      noOrphans(
        "Si te operaste y volviste a subir de peso, o te quedaste sin seguimiento, podemos retomar desde donde estás. La reganancia forma parte de la evolución de una enfermedad crónica y tiene tratamiento."
      ),
      noOrphans(
        "Evaluamos tu cirugía previa, hecha con nosotros o con otro equipo, y definimos el camino: medicación, reorientación nutricional o cirugía de revisión."
      ),
    ],
    foto: "/images/tratamiento-reganancia.jpg",
    cta: "Consultar mi caso",
  },
};

export const proceso = {
  eyebrow: "Cómo te acompañamos",
  headline: "Un recorrido continuo, no una operación aislada.",
  body: null as string | null,
  pasos: [
    // Fotos reales del equipo (sesiones 2026-09), recortadas a 3:2 como el resto de los pasos.
    // Copy de pasos 01/02/04/05 aprobado por Maya Vega (2026-07-03); el 03 es del PDF de ajustes 2026-09-24
    {
      n: "01",
      titulo: "Primera consulta",
      body: noOrphans(
        "Nos conocemos, escuchamos tu historia y respondemos todas tus dudas. Salís de la consulta sabiendo cuál es el abordaje más adecuado para vos y cuáles son los próximos pasos."
      ),
      foto: "/images/proceso-primera-consulta.jpg",    },
    {
      n: "02",
      titulo: "Evaluación integral",
      body: noOrphans(
        "Analizamos tu estado de salud en profundidad: historia clínica, estudios y factores metabólicos, junto a la evaluación nutricional y el acompañamiento psicológico. Toda esa información nos permite trazar un plan a tu medida, para que llegues al tratamiento indicado en las mejores condiciones."
      ),
      foto: "/images/proceso-evaluacion-integral.jpg",
      fotoPos: "center",
    },
    {
      n: "03",
      titulo: "Preparación",
      body: noOrphans(
        "Con el plan definido, te acompañamos en cada paso previo a la cirugía: orientación nutricional, estudios prequirúrgicos y controles médicos. Llegás al quirófano con todo en orden y sabiendo qué esperar."
      ),
      foto: "/images/proceso-preparacion.jpg",    },
    {
      n: "04",
      titulo: "Cirugía",
      body: noOrphans(
        "Cuando la cirugía es el camino indicado, la realizamos con técnicas mínimamente invasivas e internación corta, para que vuelvas a tu casa lo antes posible. Un momento planificado y acompañado, con protocolos de seguridad en cada instancia."
      ),
      foto: "/images/proceso-cirugia.jpg",
      fotoPos: "center 55%",
    },
    {
      n: "05",
      titulo: "Seguimiento",
      body: noOrphans(
        "El proceso no termina en el quirófano. Hacemos controles periódicos con todo el equipo durante el tiempo que tu caso lo requiera, porque el seguimiento a largo plazo es lo que permite sostener los resultados y cuidar tu salud en el tiempo."
      ),
      foto: "/images/proceso-seguimiento.jpg",    },
  ] as { n: string; titulo: string; body: string; foto: string | null; fotoPos?: string; fotoAspect?: string }[],
};

export const testimonios = {
  eyebrow: "Testimonios",
  headline: "Cambios reales, no promesas.",
  body: lorem.short,
  // Formulario para que los pacientes dejen su experiencia (PDF de ajustes 2026-09-24).
  // Todo lo que llega se revisa antes de publicarse.
  formulario: {
    invitacion: "¿Te atendiste con nosotros?",
    boton: "Compartir mi experiencia",
    titulo: "Contanos tu experiencia",
    bajada: noOrphans("Tu testimonio puede ayudar a alguien que recién empieza. Lo revisamos antes de publicarlo."),
    nombre: "Nombre o iniciales",
    tratamiento: "Tratamiento",
    tratamientoPlaceholder: "Elegí una opción",
    tratamientos: ["Inyectables", "Balón gástrico", "Manga gástrica", "Bypass gástrico", "Reganancia de peso", "Prefiero no decirlo"],
    proceso: "¿Cómo fue tu proceso con el equipo?",
    cambio: "¿Qué cambió en tu vida desde que empezaste?",
    foto: "Foto (opcional)",
    fotoAyuda: "Podés sumar una foto actual o de tu antes y después.",
    fotoBoton: "Elegir foto",
    consentimiento: "Acepto que mi testimonio y mi foto se publiquen en la web de Nucleo Bariátrico.",
    enviar: "Enviar testimonio",
    enviando: "Enviando…",
    // El texto del equipo, en 2 renglones (una oración cada uno)
    gracias: "Gracias por compartir tu experiencia.",
    graciasDetalle: "Vamos a revisarla antes de publicarla.",
    error: "Algo no funcionó. Probá de nuevo o escribinos por WhatsApp.",
    errorFoto: "No pudimos procesar esa foto. Probá con otra en JPG o PNG.",
  },
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
  // Mismo nombre que la tarjeta 03 de "Qué nos diferencia", que trae hasta acá
  headline: "Obras sociales y prepagas.",
  // Texto del equipo para la sección con logos (PDF de ajustes 2026-09-24)
  body: noOrphans(
    "La cobertura varía según tu plan y el tratamiento indicado. Consultanos por WhatsApp y lo revisamos con vos."
  ),
  badge: "Consultá tu cobertura",
  cta: { label: "Consultar mi cobertura" },
  // Destacadas confirmadas por el equipo: OSDE · Medicus · Otras. Medicus reemplaza a Medifé
  // (aviso del equipo vía Fede, 2026-09-29); su logo es el oficial de medicus.com.ar, en blanco
  // sobre el azul de la marca (#002564), igual que la tarjeta de OSDE.
  // fit: "cover" = tile de marca con fondo propio (llena la tarjeta);
  //      "contain" = logo sobre fondo claro (centrado en tarjeta blanca)
  destacadas: [
    { nombre: "OSDE", logo: "/images/obras/osde.png", fit: "cover" },
    { nombre: "Medicus", logo: "/images/obras/medicus.svg", fit: "cover" },
  ] as { nombre: string; logo: string; fit: "cover" | "contain" }[],
  otras: {
    titulo: "Otras",
    bajada: "Otras obras sociales y prepagas",
    cta: "Consultar por WhatsApp",
  },
};

// Sede única por ahora (PDF de ajustes 2026-09-24). San Isidro deja de figurar.
// Cómo llegar: solo el link a Google Maps; no publicar líneas de transporte
// hasta que el equipo las confirme.
export const ubicaciones = {
  eyebrow: "Dónde encontrarnos",
  headline: "Dónde atendemos.",
  body: null as string | null,
  sedes: [
    {
      nombre: "Villa del Parque",
      direccion: "Simbrón 3327, Villa del Parque, CABA",
      calle: "Simbrón 3327",
      // Así lo escribió el equipo; el cartel del lugar dice "Bien Être". Confirmar cómo mostrarlo.
      espacio: "Bienetre",
      mapa: "https://maps.google.com/maps?q=Simbr%C3%B3n%203327%2C%20Villa%20del%20Parque%2C%20CABA&t=&z=16&ie=UTF8&iwloc=&output=embed",
      comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Simbr%C3%B3n%203327%2C%20Villa%20del%20Parque%2C%20CABA",
      // Las fotos del lugar son verticales (así se sacaron): la fachada entera de frente (DSC01141,
      // sin el roll-up de estética y con la patente difuminada) y el número de la entrada (DSC01144).
      // pos: qué parte queda a la vista cuando la columna es más angosta que la foto.
      fotos: [
        { src: "/images/sede-fachada.jpg", alt: "Fachada de Simbrón 3327, con el arco de entrada", pos: "82% 50%" },
        { src: "/images/sede-numero.jpg", alt: "Número 3327 y cartel en la entrada", pos: "70% 50%" },
      ],
    },
  ],
  virtual: {
    titulo: "Consulta virtual",
    // Distinto de la pregunta frecuente (que ya dice que se puede) y sin foto: la escena está en la tarjeta 4
    texto: noOrphans("Si te queda lejos o preferís empezar desde casa, coordinamos tu primera consulta de forma virtual."),
  },
};

export const noEstasSolo = {
  eyebrow: "Una nota",
  headline: "No estás solo/a.",
  body: noOrphans(
    "Detrás de cada cirugía hay una historia parecida a la tuya. Leé lo que otros pacientes quisieron contarte, o dejá unas palabras para quien recién empieza el camino."
  ),
  cta: {
    leer: "Leer un mensaje",
    dejar: "Dejar un mensaje",
  },
  mensajesEntrantes: [
    {
      texto: noOrphans(
        "Lorem ipsum dolor sit amet consectetur. Nullam vitae libero ut elit faucibus consectetur, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      ),
      autor: "Una paciente · 6 meses post-cirugía",
    },
    {
      texto: noOrphans(
        "Curabitur in lectus nec urna venenatis fermentum non a tortor. Etiam at orci a leo bibendum dapibus, ut imperdiet justo sit amet velit auctor."
      ),
      autor: "Un paciente · 1 año post-cirugía",
    },
    {
      texto: noOrphans(
        "Vestibulum ut libero in lectus laoreet faucibus. Curabitur in lectus nec urna venenatis fermentum non a tortor."
      ),
      autor: "Una paciente · 8 meses post-cirugía",
    },
  ],
  formLabels: {
    placeholder: "Dejá unas palabras que quieras que otra persona lea cuando llegue acá…",
    submit: "Compartir mensaje",
    thanks: noOrphans(
      "Gracias por dejar un mensaje. Cuando alguien más llegue hasta acá, tu mensaje lo va a estar esperando."
    ),
  },
};

// Preguntas y respuestas del equipo (PDF de ajustes 2026-09-24), en 3 grupos.
export type PreguntaFrecuente = { q: string; a: string; link?: { href: string; label: string } };

export const faq = {
  eyebrow: "Preguntas frecuentes",
  headline: "Lo que más nos consultan.",
  grupos: [
    {
      titulo: "Tratamientos",
      items: [
        {
          q: "¿Cómo sé qué tratamiento es para mí?",
          a: noOrphans(
            "Lo definimos en la consulta. Evaluamos tu historia clínica, tus estudios y tu estado nutricional y emocional, y con esa información te indicamos el abordaje más adecuado para tu caso."
          ),
        },
        {
          q: "¿En qué consiste el tratamiento con inyectables?",
          a: noOrphans(
            "Es un tratamiento médico con medicación que actúa sobre el apetito y la saciedad. Incluye controles periódicos para ajustar la dosis y seguimiento con nutrición y psicología, para que el descenso de peso venga acompañado de cambios que se sostengan."
          ),
        },
        {
          q: "¿En qué consiste el programa de balón gástrico?",
          a: noOrphans(
            "El balón se coloca tragando una cápsula en una consulta breve, sin cirugía ni anestesia. Permanece unas 16 semanas en el estómago y se elimina de forma natural. El programa dura seis meses e incluye seguimiento nutricional y psicológico."
          ),
        },
        {
          q: "¿En qué consiste la cirugía bariátrica con Nucleo?",
          a: noOrphans(
            "Es un proceso completo: primera consulta, evaluación integral, preparación, cirugía y seguimiento. Operamos con técnicas mínimamente invasivas e internación corta, y acompañamos tu evolución con todo el equipo durante el tiempo que tu caso lo requiera."
          ),
        },
        {
          q: "¿Quién puede hacerse una cirugía bariátrica?",
          a: noOrphans(
            "La indicación depende de tu IMC, de las enfermedades asociadas y de la evaluación del equipo. Podés calcular tu IMC con la calculadora de esta página como punto de partida, y en la consulta definimos si la cirugía es el camino indicado."
          ),
          link: { href: "#imc", label: "Calcular mi IMC" },
        },
        {
          q: "Me operé y volví a subir de peso. ¿Pueden ayudarme?",
          a: noOrphans(
            "Sí. La reganancia forma parte de la evolución de una enfermedad crónica y tiene tratamiento. Evaluamos tu cirugía previa, aunque la hayas hecho con otro equipo, y definimos cómo seguir."
          ),
        },
      ],
    },
    {
      titulo: "Cobertura",
      items: [
        {
          q: "¿Mi obra social cubre la medicación para bajar de peso?",
          a: noOrphans(
            "En general, no. La medicación para el tratamiento de la obesidad no está incluida en el Programa Médico Obligatorio, por lo que la mayoría de las obras sociales y prepagas no la cubren. En la consulta te orientamos sobre las opciones para tu caso."
          ),
        },
        {
          q: "¿Mi obra social cubre la cirugía?",
          a: noOrphans(
            "Depende de tu plan y de los requisitos médicos de cada cobertura. Escribinos por WhatsApp y revisamos tu caso."
          ),
        },
      ],
    },
    {
      titulo: "Consultas y seguimiento",
      items: [
        {
          q: "¿Hacen consultas virtuales?",
          a: noOrphans("Sí. Podés hacer la primera consulta de forma virtual y continuar el proceso con nosotros."),
        },
        {
          q: "¿El seguimiento es solo con el cirujano?",
          a: noOrphans(
            "No. Durante todo el tratamiento te acompaña el equipo completo: cirujanos, nutricionistas y psicóloga."
          ),
        },
        {
          q: "¿Cuánto tiempo dura el seguimiento?",
          a: noOrphans(
            "El que tu caso requiera. La obesidad es una enfermedad crónica, y el seguimiento a largo plazo es lo que permite sostener los resultados y cuidar tu salud en el tiempo."
          ),
        },
      ],
    },
  ] as { titulo: string; items: PreguntaFrecuente[] }[],
};

export const contacto = {
  eyebrow: "Contacto",
  // Sin horario a propósito (account manager, 2026-09-26): no atienden fijo en la sede, se organizan
  // según las consultas. Si algún día lo publican, cargarlo acá y aparece en Contacto y en la sede.
  horario: null as string | null,
  headline: "Conversemos.",
  body: noOrphans(
    "Contanos tu situación en el formulario y un profesional del equipo te responde en menos de 24 horas hábiles. Sin compromiso y con total confidencialidad."
  ),
  labels: {
    nombre: "Nombre completo",
    telefono: "Teléfono",
    email: "Email",
    motivo: "Motivo de la consulta",
    mensaje: "Mensaje",
    enviar: "Enviar consulta",
    enviando: "Enviando…",
    enviado: "Recibimos tu consulta. Te respondemos en menos de 24 horas hábiles.",
    error: "Algo no funcionó. Probá de nuevo o escribinos por WhatsApp.",
    imcAuto: "Tu IMC calculado",
  },
  // Cubren los tratamientos sin cirugía, la reganancia y la consulta virtual (v6)
  motivos: [
    "Quiero saber qué tratamiento es para mí",
    "Quiero agendar una primera consulta",
    "Prefiero una consulta virtual",
    "Ya me operé (reganancia o seguimiento)",
    "Tengo dudas sobre la cobertura",
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
  // Sin repetir el barrio: "Villa del Parque" arriba y "Simbrón 3327, CABA" abajo
  sedes: ubicaciones.sedes.map((s) => ({ nombre: s.nombre, direccion: `${s.calle}, CABA` })),
  legal: lorem.long,
  copyright: `© ${new Date().getFullYear()} Nucleo Bariátrico. Todos los derechos reservados.`,
};
