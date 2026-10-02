// ============================================================================
// NUCLEO BARIATRICO · Copy
// Todos los textos del sitio. Los datos del equipo (direcciones, matrículas,
// contacto) salen solo de lo confirmado en brief/fuente-de-verdad.json.
// ============================================================================

import { noOrphans } from "./text";

export const brand = {
  name: "Nucleo Bariátrico",
  short: "Nucleo",
  tagline: "Tu salud empieza acá",
  taglineLong: "El origen de una vida plena",
  // Celular AR: se marca como +54 9 11 XXXX-XXXX para wa.me
  whatsappNumber: "+5491156077780",
  whatsappMessage: "Hola, me gustaría agendar una consulta.",
  // Mail de consultas confirmado por el equipo (vía Fede, 2026-10-02). Se muestra en Contacto y en el
  // pie, y es adonde llegan los formularios. Con null deja de mostrarse en todos lados.
  email: "info@nucleobariatrico.com.ar" as string | null,
  // Dominio confirmado y registrado a nombre de Sergio el 2026-10-02. La dirección principal va sin www.
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
      // 2 sedes: Villa del Parque (PDF de ajustes 2026-09-24) y Lomas de Zamora (Maya Vega, 2026-09-29).
      // La consulta virtual está confirmada en las preguntas frecuentes del mismo PDF.
      // La foto no repite ninguna de la sección "Dónde atendemos".
      title: noOrphans("Presencial o virtual"),
      body: noOrphans(
        "Te recibimos en Villa del Parque y en Lomas de Zamora. La primera consulta también puede ser virtual."
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

// foco: ajuste fino del encuadre del retrato cuando la cara no cae donde las demás (x: punto de zoom
// en celular; xMd e yMd: punto de zoom y altura desde tablet). Sin foco, el encuadre común.
export type Persona = {
  nombre: string;
  rol: string;
  bio: string;
  foto: string | null;
  foco?: { x?: string; xMd?: string; yMd?: string };
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
      // Tenía los ojos un poco más abajo que el resto en el recorte apaisado
      foco: { yMd: "7%" },
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
      // Nutricionistas: Lic. Solange Leban y Lic. Débora Salamón (con tilde, como en la bio del equipo).
      // Solo el nombre, como el resto del equipo. Bios del equipo (2026-09-29), acortadas al largo de las demás.
      {
        nombre: "Solange",
        rol: "Nutricionista",
        bio: noOrphans(
          "Licenciada en Nutrición, especializada en obesidad y enfermedades cardiometabólicas, cambio de hábitos y abordaje cognitivo\u2011conductual. Experiencia en acompañamiento nutricional para el descenso de peso y en trabajo interdisciplinario. Trabaja con estrategias personalizadas para que los cambios se sostengan."
        ),
        foto: "/images/equipo-solange.jpg",
      },
      {
        nombre: "Débora",
        rol: "Nutricionista",
        bio: noOrphans(
          "Licenciada en Nutrición, egresada de la UBA y diplomada en abordaje integral de la persona con obesidad. Miembro del grupo de estudio de obesidad de la Asociación Argentina de Licenciados en Nutrición. Su práctica combina una atención basada en la evidencia con un enfoque transdisciplinario."
        ),
        foto: "/images/equipo-debora.jpg",
        // Su cara quedaba corrida a la izquierda respecto de las demás
        foco: { x: "35.6%", xMd: "21%" },
      },
    ] as Persona[],
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
        "Con el plan definido, te acompañamos en cada paso previo a la cirugía: orientación nutricional, estudios prequirúrgicos y controles médicos. Llegás al quirófano con todo en orden y sabiendo\u00A0qué esperar."
      ),
      foto: "/images/proceso-preparacion.jpg",
      fotoPos: "center top",
    },
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
      foto: "/images/proceso-seguimiento.jpg",
      fotoPos: "20% 50%",
    },
  ] as { n: string; titulo: string; body: string; foto: string | null; fotoPos?: string; fotoAspect?: string }[],
};

// Un testimonio: el comentario del paciente y la frase de ese mismo comentario que va resaltada
// ("destacado" tiene que figurar tal cual dentro de "quote").
export type Testimonio = { quote: string; destacado: string };

export const testimonios = {
  eyebrow: "Testimonios",
  headline: "Cambios reales, no promesas.",
  // De dónde salen: la encuesta de satisfacción que el equipo les manda a sus pacientes (respuestas de
  // agosto de 2026; Sergio vía Maya Vega, 2026-10-02). Van solo los comentarios que autorizaron a
  // compartirse y siempre sin nombre: la autorización es "de forma anónima".
  nota: noOrphans(
    "Son comentarios de nuestra encuesta de satisfacción. Los compartimos sin nombre y con la autorización de cada paciente."
  ),
  // Las tarjetas no llevan firma: ninguna puede tener nombre ni iniciales, y "paciente" repetido en
  // las 4 no sumaba nada a lo que ya dice esta aclaración.
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
  // Texto original de cada comentario y qué se corrigió (solo ortografía y puntuación):
  // brief/material/testimonios-encuesta-2026-08.md. Orden: en compu van 2 por fila, así que se
  // emparejan por largo (los 2 más cortos arriba) para que el hueco al pie de la tarjeta más corta
  // sea el menor posible.
  items: [
    {
      quote: noOrphans(
        "Me cambiaron la vida y siempre estuvieron atentos a mis problemas y dudas. Me sentí siempre acompañada. Gracias."
      ),
      destacado: "Me cambiaron la vida",
    },
    {
      quote: noOrphans(
        "Mi experiencia fue grandiosa. Incluso la recomendé a una amiga y ella también se trató con ustedes. Me operé en el 2023 y estoy sumamente conforme con el resultado."
      ),
      destacado: "sumamente conforme con el resultado",
    },
    {
      // A confirmar con el equipo: nombra el apoyo con la autorización de la prepaga. Si no lo
      // quieren, la cita se corta en "postoperatorio." sin cambiar ninguna palabra.
      quote: noOrphans(
        "Excelente atención del equipo de cirujanos. Mucha comprensión, empatía y apoyo, desde el momento\u00A00 hasta el postoperatorio y durante la tramitación de autorizaciones en la prepaga."
      ),
      destacado: "Mucha comprensión, empatía y apoyo",
    },
    {
      // "El Dr. Sitta" es Sergio. Se deja porque lo escribió la paciente; si el equipo prefiere que no
      // se nombre a un médico en particular, se saca el paréntesis.
      quote: noOrphans(
        "Fui tratada con profesionales (entre ellos el Dr.\u00A0Sitta) que no solo mostraron experiencia en lo suyo, sino una calidad humana para hacerte sentir que realmente podías estar mucho mejor. ¡Y aquí estoy, feliz con mi nueva\u00A0vida! ¡Solo puedo dar gracias, gracias, gracias!"
      ),
      destacado: "una calidad humana",
    },
  ] as Testimonio[],
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

// 2 sedes: Villa del Parque (PDF de ajustes 2026-09-24) y Lomas de Zamora (Maya Vega, 2026-09-29).
// San Isidro no figura. En las 2, sin horario y "Cómo llegar" solo con Google Maps, sin líneas de transporte.
export type Sede = {
  id: string;
  nombre: string;
  // Dirección completa (mapa, datos para Google) y la línea corta que se ve debajo del nombre
  direccion: string;
  lineaDireccion: string;
  calle: string;
  // Renglón gris debajo de la dirección, en las 2 sedes para que queden parejas: la ciudad o el
  // nombre del centro donde atienden (solo si está confirmado cómo se escribe)
  detalle: string;
  mapa: string;
  comoLlegar: string;
  // Mensaje de WhatsApp del botón "Pedir turno" de la sede
  turno: string;
  // Fachada vertical (así se sacaron las fotos del lugar). pos: object-position si se recorta;
  // completa: la versión entera, para el visor. etiqueta: lo que dice el visor al mostrarla.
  foto: { src: string; alt: string; etiqueta: string; pos?: string; completa?: string };
  // Más fotos del lugar, todas verticales (así las mandó el equipo). Se ven en el visor junto con la
  // fachada y el video. Las que tienen "mini" (3:2) además van como foto chica debajo de la sede: 2 por
  // sede, para que queden parejas. pos: qué parte de la miniatura queda a la vista cuando se muestra
  // más apaisada, para no cortar caras ni logos.
  galeria: { src: string; mini?: string; alt: string; etiqueta: string; pos?: string }[];
  // Recorrido completo en video: es lo primero que muestra el visor de la sede
  recorrido?: { src: string; poster: string; boton: string; titulo: string; alt: string; etiqueta: string };
};

export const ubicaciones = {
  eyebrow: "Dónde encontrarnos",
  headline: "Dónde atendemos.",
  body: null as string | null,
  // Botón sobre la fachada de las sedes sin video (las que tienen recorrido dicen "Ver recorrido")
  verFotos: "Ver fotos",
  sedes: [
    {
      id: "villa-del-parque",
      nombre: "Villa del Parque",
      direccion: "Simbrón 3327, Villa del Parque, CABA",
      lineaDireccion: "Simbrón 3327",
      calle: "Simbrón 3327",
      // El nombre del espacio no se muestra: el equipo escribió "Bienetre" y el cartel dice "Bien Être"
      detalle: "CABA",
      mapa: "https://maps.google.com/maps?q=Simbr%C3%B3n%203327%2C%20Villa%20del%20Parque%2C%20CABA&t=&z=16&ie=UTF8&iwloc=&output=embed",
      comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Simbr%C3%B3n%203327%2C%20Villa%20del%20Parque%2C%20CABA",
      turno: "Hola, quiero pedir un turno en la sede de Villa del Parque.",
      // Fachada entera de frente (DSC01141, sin el roll-up de estética y con la patente difuminada)
      foto: {
        src: "/images/sede-fachada.jpg",
        alt: "Fachada de Simbrón 3327, con el arco de entrada y el número",
        etiqueta: "Fachada",
        pos: "50% 50%",
      },
      // De esta sede no hay video ni fotos del interior sin gente: va lo que hay de la sesión de fotos
      // (DSC01144, DSC01129 sin el banner de estética y DSC01030 sin el logo de la laptop ni el bordado).
      galeria: [
        {
          src: "/images/sede-numero.jpg",
          mini: "/images/sede-numero-mini.jpg",
          alt: "Número 3327 y cartel verde en el arco de entrada",
          etiqueta: "Número y cartel de la entrada",
        },
        {
          // Solo en el visor, entera: recortada como miniatura era "una puerta suelta"
          src: "/images/sede-entrada.jpg",
          alt: "Puerta de la casa, pasando la reja",
          etiqueta: "Puerta de la casa",
        },
        {
          src: "/images/sede-consultorio.jpg",
          mini: "/images/sede-consultorio-mini.jpg",
          alt: "Agustina en su escritorio, en el consultorio de Villa del Parque",
          etiqueta: "Consultorio",
          pos: "50% 30%",
        },
      ],
    },
    {
      // Sede nueva (Maya Vega, 2026-09-29). Fotos y videos del equipo: fachada, recepción,
      // sala de espera, pasillo y consultorio.
      id: "lomas-de-zamora",
      nombre: "Lomas de Zamora",
      direccion: "General Bartolomé Mitre 185, Lomas de Zamora, Provincia de Buenos Aires",
      // La zona ya está en el título: la línea de abajo lleva solo la calle (como Villa del Parque)
      lineaDireccion: "General Bartolomé Mitre 185",
      calle: "General Bartolomé Mitre 185",
      // Confirmado por Maya Vega (2026-10-02): es el nombre del centro y está bien que aparezca
      detalle: "Centro Médico Las Lomitas",
      mapa: "https://maps.google.com/maps?q=General%20Bartolom%C3%A9%20Mitre%20185%2C%20Lomas%20de%20Zamora%2C%20Provincia%20de%20Buenos%20Aires&t=&z=16&ie=UTF8&iwloc=&output=embed",
      comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=General%20Bartolom%C3%A9%20Mitre%20185%2C%20Lomas%20de%20Zamora%2C%20Provincia%20de%20Buenos%20Aires",
      turno: "Hola, quiero pedir un turno en la sede de Lomas de Zamora.",
      // Fachada retocada (sin el cartel del cirujano plástico, la pantalla con otra médica ni la lista de
      // especialidades del centro) y recortada sin el 185, que en compu quedaba cortado ("85").
      // En el visor va la fachada entera (ahí el 185 sí se lee completo).
      foto: {
        src: "/images/sede-lomas-fachada.jpg",
        completa: "/images/sede-lomas-fachada-completa.jpg",
        alt: "Fachada del Centro Médico Las Lomitas al atardecer, con el cartel encendido",
        etiqueta: "Fachada",
        pos: "50% 0%",
      },
      // Fotos del interior que mandó el equipo (2026-09-29), sin gente
      // Las fotos chicas van recortadas hacia abajo (pedido de Fede, 2026-10-01): el mostrador y los bancos
      // en la recepción, el escritorio y las sillas en el consultorio; con el recorte de arriba eran techo y pared.
      galeria: [
        {
          src: "/images/sede-lomas-recepcion.jpg",
          mini: "/images/sede-lomas-recepcion-mini.jpg",
          alt: "Recepción del Centro Médico Las Lomitas",
          etiqueta: "Recepción",
          // La miniatura arranca justo arriba del logo de la pared: se muestra desde arriba para no cortarlo
          pos: "50% 0%",
        },
        {
          // Solo en el visor, para que las 2 sedes tengan la misma cantidad de fotos chicas
          src: "/images/sede-lomas-pasillo.jpg",
          alt: "Sala de espera y pasillo hacia los consultorios",
          etiqueta: "Sala de espera y pasillo",
        },
        {
          src: "/images/sede-lomas-consultorio.jpg",
          mini: "/images/sede-lomas-consultorio-mini.jpg",
          alt: "Consultorio de la sede de Lomas de Zamora",
          etiqueta: "Consultorio",
        },
      ],
      recorrido: {
        src: "/videos/sede-lomas-recorrido.mp4",
        poster: "/images/sede-lomas-recorrido.jpg",
        boton: "Ver recorrido",
        titulo: "Recorrido por la sede de Lomas de Zamora",
        alt: "Recorrido en video por la sede de Lomas de Zamora: la llegada, la recepción, la sala de espera, el pasillo y un consultorio",
        etiqueta: "Recorrido en video",
      },
    },
  ] as Sede[],
  virtual: {
    titulo: "Consulta virtual",
    // Distinto de la pregunta frecuente (que ya dice que se puede) y sin foto: la escena está en la tarjeta 4
    texto: noOrphans("Si ninguna sede te queda cerca o preferís empezar desde casa, coordinamos tu primera consulta de forma virtual."),
  },
};

export const noEstasSolo = {
  eyebrow: "Una nota",
  headline: "No estás solo/a.",
  // Texto para cuando no hay mensajes para leer (brief/contenido.md, 7 y 8). Con mensajes cargados:
  // "...Leé lo que otros pacientes quisieron contarte, o dejá unas palabras para quien recién empieza el camino."
  body: noOrphans(
    "Detrás de cada tratamiento hay una historia parecida a la tuya. Si ya pasaste por el proceso, dejá unas palabras para quien recién empieza el camino."
  ),
  // "dejar" abre el formulario de testimonios (el mismo de la sección Testimonios)
  cta: {
    leer: "Leer un mensaje",
    dejar: "Dejar un mensaje",
  },
  // Mensajes de pacientes para "Leer un mensaje". Hoy no hay ninguno y el botón no se muestra: los de
  // ejemplo (en latín, con firma) se sacaron cuando llegaron los comentarios reales, que van en la
  // sección de abajo (Testimonios). Solo se cargan mensajes reales y con autorización.
  mensajesEntrantes: [] as { texto: string; autor: string }[],
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
  // según las consultas. Si algún día lo publican, cargarlo acá y aparece en Contacto y en las 2 sedes.
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
  sedes: ubicaciones.sedes.map((s) => ({ nombre: s.nombre, direccion: s.lineaDireccion })),
  // Texto legal. Director médico y matrículas: Sergio, vía Maya Vega (2026-10-02). El párrafo es la
  // propuesta que se le envió al equipo el 2026-10-01; el uso de los datos se limita a las consultas
  // porque los testimonios se publican con su propio consentimiento.
  legal: {
    director: "Director médico: Dr.\u00A0Sergio\u00A0Sitta",
    matriculas: "M.N.\u00A0156.136 · M.P.\u00A0338.584",
    texto: noOrphans(
      "La información de este sitio es orientativa y no reemplaza la consulta médica. Cada tratamiento se indica después de una evaluación personalizada y los resultados varían según cada paciente. Los datos que nos envíes al hacer una consulta se usan solo para responderte y no se comparten con terceros."
    ),
  },
  copyright: `© ${new Date().getFullYear()} Nucleo Bariátrico. Todos los derechos reservados.`,
};
