// ============================================================================
// NUCLEO BARIATRICO · Copy centralizado
// Todo el texto editable del sitio vive acá. Si el cliente pide cambios de
// texto, solo se toca este archivo.
// Tono: argentino, tutear, claro, sin tecnicismos sin explicar.
// ============================================================================

export const brand = {
  name: "Nucleo Bariátrico",
  short: "Nucleo",
  tagline: "Tu salud empieza acá",
  taglineLong: "El origen de una vida plena",
  whatsappNumber: "+5491100000000", // PENDIENTE: número real del cliente
  whatsappMessage: "Hola, me gustaría agendar una consulta.",
  email: "contacto@nucleobariatrico.com.ar", // PENDIENTE: email real
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
  body:
    "Tratamos la obesidad como lo que es: una condición que vive en el núcleo de tu salud. No trabajamos sobre la superficie. Trabajamos con vos, en lo profundo, durante todo el proceso.",
  primary: { label: "Calcular mi IMC", href: "#imc" },
  secondary: { label: "Conocer al equipo", href: "#equipo" },
};

export const diferencial = {
  eyebrow: "Qué nos diferencia",
  headline: "Un equipo, un núcleo, un solo recorrido.",
  items: [
    {
      title: "Cirujana especializada al frente",
      body:
        "La Dra. Agustina está presente desde la primera consulta hasta el seguimiento postoperatorio. No te derivamos: te acompañamos.",
    },
    {
      title: "Abordaje integral",
      body:
        "Cirugía, nutrición, psicología y seguimiento clínico en un solo equipo coordinado. Sin idas y vueltas entre profesionales que no se conocen.",
    },
    {
      title: "Obras sociales incluidas",
      body:
        "La cirugía bariátrica está cubierta por la mayoría de las obras sociales y prepagas. Te ayudamos a gestionar los pasos para que tu cobertura responda.",
    },
    {
      title: "Dos puntos de atención",
      body:
        "Consultorios en Villa del Parque (CABA) y San Isidro (Zona Norte). Elegís el que te quede más cómodo.",
    },
  ],
};

export const imcCalc = {
  eyebrow: "Calculadora",
  headline: "Empezá por saber dónde estás parado.",
  body:
    "El Índice de Masa Corporal (IMC) es la primera referencia que usa la medicina para evaluar si una cirugía bariátrica es una opción para vos. Calculalo ahora; el resultado se suma automáticamente a tu consulta.",
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
  body:
    "Somos un equipo pequeño y deliberadamente cercano. Vas a conocer a las mismas personas en cada visita.",
  miembros: [
    {
      nombre: "Dra. Agustina",
      rol: "Cirujana bariátrica",
      bio: "Cirujana fundadora del equipo. Acompaña cada caso desde la primera evaluación hasta el seguimiento postoperatorio.", // PENDIENTE: bio real
      foto: null, // PENDIENTE: foto 3:4
    },
    {
      nombre: "Sergio",
      rol: "Equipo médico",
      bio: "Integra el equipo médico de Nucleo. Coordina el seguimiento clínico y el acompañamiento del paciente durante el proceso.", // PENDIENTE: bio real
      foto: null, // PENDIENTE: foto 3:4
    },
  ],
};

export const proceso = {
  eyebrow: "Cómo te acompañamos",
  headline: "Un recorrido continuo, no una operación aislada.",
  body:
    "La cirugía es un capítulo de un proceso más largo. Te acompañamos antes, durante y después.",
  pasos: [
    {
      n: "01",
      titulo: "Primera consulta",
      body:
        "Evaluación inicial sin compromiso. Repasamos tu historia, tu IMC, tus objetivos y respondemos todas las dudas.",
    },
    {
      n: "02",
      titulo: "Evaluación integral",
      body:
        "Estudios prequirúrgicos, evaluación nutricional y psicológica. Definimos juntos si la cirugía es la mejor opción.",
    },
    {
      n: "03",
      titulo: "Cobertura y trámites",
      body:
        "Te guiamos en la gestión con tu obra social o prepaga. Preparamos la documentación y nos comunicamos con el efector cuando es necesario.",
    },
    {
      n: "04",
      titulo: "Cirugía",
      body:
        "Procedimiento en quirófano. Internación breve. Acompañamiento las 24 horas posteriores.",
    },
    {
      n: "05",
      titulo: "Seguimiento",
      body:
        "Controles programados al mes, 3, 6 y 12 meses. Nutrición y psicología disponibles durante todo el primer año.",
    },
  ],
};

export const testimonios = {
  eyebrow: "Testimonios",
  headline: "Cambios reales, no promesas.",
  body:
    "Algunas personas que ya hicieron este recorrido con nosotros.",
  items: [
    // PENDIENTE: testimonios reales con autorización firmada
    {
      nombre: "M.",
      tiempo: "8 meses después de la cirugía",
      quote:
        "Sentí que no era un número. Cada vez que iba a control, Agustina sabía exactamente dónde estaba parada en mi proceso.",
    },
    {
      nombre: "C.",
      tiempo: "1 año y 2 meses",
      quote:
        "Lo más valioso fue la psicóloga del equipo. La cirugía es la parte fácil. Lo que viene después necesita acompañamiento.",
    },
    {
      nombre: "L.",
      tiempo: "6 meses",
      quote:
        "Me ayudaron con todos los trámites de la obra social. Yo no tenía idea por dónde empezar. Fue un alivio.",
    },
  ],
};

export const obrasSociales = {
  eyebrow: "Cobertura",
  headline: "Tu obra social puede cubrir la cirugía.",
  body:
    "La cirugía bariátrica está incluida en el Programa Médico Obligatorio (PMO) cuando se cumplen ciertos criterios clínicos. La mayoría de las obras sociales y prepagas cubren el procedimiento, aunque suele tramitarse a través de un efector autorizado.",
  badge: "Consultá tu cobertura",
  cta: { label: "Hablar con el equipo", href: "#contacto" },
  notaEfector:
    "En muchos casos la cirugía se realiza con un efector designado por tu obra social. Te explicamos cómo funciona en tu caso particular durante la primera consulta.",
  logosPendiente:
    "Lista de obras sociales pendiente de confirmar con el cliente.",
};

export const ubicaciones = {
  eyebrow: "Dónde encontrarnos",
  headline: "Dos puntos de atención.",
  body: "Elegí el que te quede más cómodo. La primera consulta es presencial.",
  sedes: [
    {
      nombre: "Villa del Parque",
      direccion: "CABA · dirección exacta a confirmar", // PENDIENTE
      mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.5!2d-58.49!3d-34.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1",
    },
    {
      nombre: "San Isidro",
      direccion: "Zona Norte · dirección exacta a confirmar", // PENDIENTE
      mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.5!2d-58.51!3d-34.47!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1",
    },
  ],
};

export const noEstasSolo = {
  eyebrow: "Una nota",
  headline: "No estás solo.",
  body:
    "Llegar hasta acá ya es una decisión. El resto lo recorremos juntos.",
};

export const faq = {
  eyebrow: "Preguntas frecuentes",
  headline: "Lo que más nos consultan.",
  items: [
    {
      q: "¿La cirugía bariátrica es estética?",
      a: "No. La cirugía bariátrica es un procedimiento médico indicado para personas cuya obesidad afecta su calidad de vida y su salud. No se realiza con fines estéticos. La evaluación quirúrgica considera criterios clínicos como el IMC y la presencia de comorbilidades.",
    },
    {
      q: "¿La obra social cubre la cirugía?",
      a: "En la mayoría de los casos sí. La cirugía bariátrica está incluida en el Programa Médico Obligatorio cuando se cumplen los criterios clínicos. Generalmente se tramita a través de un efector designado por tu obra social. Te ayudamos con toda la gestión.",
    },
    {
      q: "¿Cuánto dura la internación?",
      a: "La internación habitual es de 24 a 48 horas según el procedimiento y la evolución de cada paciente. El alta se otorga cuando estás clínicamente estable y podés alimentarte con la dieta indicada.",
    },
    {
      q: "¿Hay seguimiento después de la cirugía?",
      a: "Sí. El seguimiento es parte central del tratamiento. Tenés controles programados al mes, a los 3, 6 y 12 meses, con disponibilidad de nutrición y psicología durante el primer año completo.",
    },
    {
      q: "¿En qué se diferencia el bypass de la manga gástrica?",
      a: "Ambas son cirugías bariátricas. La manga gástrica reduce el tamaño del estómago. El bypass también modifica el tránsito intestinal. La indicación de una u otra depende de tu caso clínico, antecedentes y objetivos. Se define en la evaluación integral.",
    },
    {
      q: "¿Cuándo es recomendable considerar la cirugía?",
      a: "La indicación quirúrgica habitual incluye IMC mayor a 40, o IMC mayor a 35 con comorbilidades asociadas (diabetes, hipertensión, apnea del sueño, entre otras). Pero la indicación final siempre la define el equipo médico tras una evaluación completa.",
    },
  ],
};

export const contacto = {
  eyebrow: "Contacto",
  headline: "Conversemos.",
  body:
    "Completá el formulario y te respondemos en menos de 24 horas hábiles. Si preferís hablar por WhatsApp, escribinos directamente.",
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
  whatsapp: { label: "Escribir por WhatsApp", href: "" }, // se arma con brand.whatsappNumber
};

export const footer = {
  tagline: brand.taglineLong,
  contacto: {
    whatsapp: brand.whatsappNumber,
    email: brand.email,
  },
  sedes: ubicaciones.sedes.map((s) => ({ nombre: s.nombre, direccion: s.direccion })),
  legal:
    "La cirugía bariátrica es una práctica médica que requiere evaluación individual. La información de este sitio no reemplaza una consulta profesional. Director médico responsable: pendiente de confirmación.",
  copyright: `© ${new Date().getFullYear()} Nucleo Bariátrico. Todos los derechos reservados.`,
};
