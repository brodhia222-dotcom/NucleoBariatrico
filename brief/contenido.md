# Contenido · Nucleo Bariátrico · Ronda de ajustes 2026-09-24

Fuente: PDF de ajustes del equipo (transcripto en `brief/material/ajustes-2026-09-24.md`) y `brief/fuente-de-verdad.json`.
Alcance: la landing sigue siendo una sola página con el mismo orden de secciones. Acá está solo lo que cambia en esta ronda; lo que no figura queda como está.
Reglas de escritura aplicadas: texto del equipo textual (solo tipeos y puntuación), marca "Nucleo" o "Nucleo Bariátrico" (nunca "NÚCLEO"), "reganancia" sin guion, sin guiones largos, ningún dato nuevo.

## Mapa de la página (qué toca cada sección)

| Orden | Sección (id) | Cambia en esta ronda |
|---|---|---|
| 1 | Hero | Solo foto nueva (Hero.jpeg). Texto igual |
| 2 | Calculadora IMC | Nada |
| 3 | Qué nos diferencia (#diferencial) | Tarjetas 03 y 04 nuevas, 01 recomendada |
| 4 | Equipo (#equipo) | Se suman nutricionistas, retratos nuevos |
| 5 | Tratamientos (#tratamientos) | Título, bajada, 5 textos reales, reganancia |
| 6 | Proceso (#proceso) | Paso 03 pasa a "Preparación" |
| 7 | No estás solo (#no-estas-solo) | Aloja el formulario de testimonios |
| 8 | Testimonios (#testimonios) | Oculta hasta tener testimonios aprobados |
| 9 | Cobertura (#obras-sociales) | Texto nuevo, OSDE + Medifé + Otras, sin PMO ni efector |
| 10 | Dónde atendemos (#ubicaciones) | Una sede con dirección + consulta virtual |
| 11 | Preguntas frecuentes (#faq) | 11 preguntas reales en 3 grupos |
| 12 | Contacto y pie | Detalles (24 horas hábiles, columna de sede) |

---

## 3. Qué nos diferencia (#diferencial)

**Objetivo:** en 4 tarjetas, las razones para confiar, cada una con un atajo a su sección.

### Tarjeta 03 · Cobertura (`diferencial.items[2]`)
El PDF la llama "bloque de la home" y dice que reemplaza "Obras sociales incluidas" (el título que tenía esta tarjeta en la versión que vio el equipo).
- **Badge:** 03 · Cobertura
- **Título:** Obras sociales y prepagas
- **Texto:** Atendemos pacientes con distintas coberturas. Escribinos y revisamos tu caso para confirmarte qué incluye tu plan.
- **Botón:** Consultar cobertura (lleva a #obras-sociales)
- **Forma visual:** la foto de stock actual (una mano firmando) se eligió para "hacemos el trámite de autorización", que ya no se dice. Que el director de arte decida si sigue o si la reemplaza por una foto real de consulta de las nuevas.

### Tarjeta 04 · Atención (`diferencial.items[3]`)
Reemplaza "2 puntos de atención" (San Isidro ya no va). Con una sola sede la tarjeta pierde sentido como "locaciones"; lo que sí suma para quien vive lejos es que la primera consulta puede ser virtual.
- **Badge:** 04 · Atención
- **Título:** Presencial o virtual
- **Texto:** Atendemos en Villa del Parque, y la primera consulta puede ser virtual.
- **Botón:** Ver dónde atendemos (lleva a #ubicaciones)
- **Forma visual:** hoy es placeholder. El equipo mandó fotos "para representar atención virtual": es el lugar natural para una de ellas.

### Tarjeta 01 · Equipo (`diferencial.items[0].body`), recomendado
No contradice nada, pero ya no refleja al equipo completo.
- **Texto:** Cirujanos bariátricos con formación específica en obesidad, junto a nutricionistas y psicóloga. Conocé a las personas que van a acompañarte durante todo el recorrido.

---

## 4. Equipo (#equipo)

**Objetivo:** que se vea que el acompañamiento es de un equipo completo, no solo de los cirujanos.

- **Cirujanos:** textos iguales. Retratos nuevos: Agustina.jpg, Sergio.ARW y Nahuel (2 opciones: Nahuel1.jpg y Nahuel2.jpg, elige Fede).
- **"También te acompañan"** (`equipo.acompanamiento.miembros`): Rocío + las nutricionistas.
  - Por ahora, 2 tarjetas de nutricionista (el PDF habla de "nutricionistas" en plural) con **Nombre** / **Nutricionista** / lorem, sin foto.
  - No asignar fotos de la carpeta Nutricionistas hasta que el equipo diga quién es quién: hay 3 mujeres distintas y una podría ser Rocío (ver dudoso).
  - Cuando lleguen las bios, acortarlas al largo de las demás (unos 300 caracteres).
- **Forma visual:** la carpeta trae grupales de las 3 con un cirujano. Pueden servir para mostrar el equipo junto, recién cuando estén identificadas.

---

## 5. Tratamientos (#tratamientos)

**Objetivo:** que cada persona encuentre su caso en un toque y entienda en qué consiste, sin jerga como única etiqueta.

### Encabezado (`tratamientos.headline` y `tratamientos.body`)
- **Pre-título:** Tratamientos
- **Título:** Un abordaje para cada caso.
- **Bajada:** La obesidad es una enfermedad crónica y no tiene una única respuesta. Evaluamos tu historia, tu salud y tus objetivos para indicarte el tratamiento adecuado, siempre con acompañamiento nutricional y psicológico.

### Orden y navegación
Pedido del equipo: botones directos, de menor a mayor complejidad, y **Reganancia al final como apartado propio** porque "es el diferencial y conviene que se lea separado".
Orden: **Inyectables · Balón gástrico · Manga gástrica · Bypass gástrico · Reganancia de peso**.
Hoy Reganancia es un bloque aparte que no está entre los botones: tiene que sumarse como quinta entrada directa y seguir viéndose separada de las otras 4.

### Textos de cada tratamiento
La categoría corta (Farmacológico, No quirúrgico, Quirúrgico) puede seguir como etiqueta de la tarjeta. El subtítulo del PDF va en el detalle, debajo del nombre. Los `resumen` viejos se reemplazan por estos subtítulos (ver tabla de desactualizados).

**Inyectables** · Tratamiento farmacológico
> Indicamos medicación que actúa sobre el apetito y la saciedad: análogos de GLP-1 y agonistas duales GLP-1/GIP. Es un tratamiento médico con controles periódicos. Ajustamos la dosis según tu evolución y lo sostenemos con el equipo de nutrición y psicología. Puede ser el tratamiento principal o complementar un procedimiento, antes o después.

**Balón gástrico** · Sin cirugía, sin endoscopia, sin anestesia
> Una cápsula que se ingiere en una consulta de unos 15 minutos. En el estómago se convierte en un balón que genera saciedad durante aproximadamente 16 semanas y después se elimina de forma natural.
>
> Forma parte de un programa de seis meses con seguimiento nutricional y psicológico, para que los nuevos hábitos se sostengan cuando el balón ya no está.

**Manga gástrica** · Gastrectomía en manga
> Reducimos el tamaño del estómago por vía laparoscópica. Disminuye la capacidad y también las hormonas que estimulan el apetito. Internación corta y seguimiento a largo plazo con todo el equipo.

**Bypass gástrico** · Bypass en Y de Roux
> Creamos un estómago pequeño conectado directamente al intestino. Actúa sobre la cantidad de alimento y sobre la absorción, con un efecto metabólico marcado en enfermedades asociadas como la diabetes tipo 2. Cirugía laparoscópica, internación corta y controles de por vida.

**Reganancia de peso** · Después de una cirugía bariátrica (`tratamientos.reganancia`)
> Si te operaste y volviste a subir de peso, o te quedaste sin seguimiento, podemos retomar desde donde estás. La reganancia forma parte de la evolución de una enfermedad crónica y tiene tratamiento.
>
> Evaluamos tu cirugía previa, hecha con nosotros o con otro equipo, y definimos el camino: medicación, reorientación nutricional o cirugía de revisión.

- **Título del apartado:** Reganancia de peso (reemplaza "¿Volviste a subir de peso después de la cirugía?", que ahora repetiría la primera frase del texto).
- **Subtítulo:** Después de una cirugía bariátrica
- **Botón:** Consultar mi caso (WhatsApp)

### Botones y mensajes de WhatsApp
- Detalle de cada tratamiento: **Consultar por este tratamiento** (igual que hoy).
- Reganancia, mensaje nuevo: "Hola, me operé y quiero consultar por reganancia de peso o para retomar el seguimiento." (el actual dice "me operé en otro lugar", y el texto nuevo incluye a quienes se operaron con ellos).

### Forma visual
Fotos reales del balón gástrico (IMG_2314 a 2316) para su tarjeta y su detalle. Los otros 4 siguen en placeholder hasta decidir foto.

---

## 6. Proceso (#proceso), paso 03 (`proceso.pasos[2]`)

**Objetivo del paso:** mostrar que antes de operar hay una preparación acompañada.
- **Número:** 03
- **Título:** Preparación
- **Texto:** Con el plan definido, te acompañamos en cada paso previo a la cirugía: orientación nutricional, estudios prequirúrgicos y controles médicos. Llegás al quirófano con todo en orden y sabiendo qué esperar.
- **Forma visual:** la foto actual (`proceso-tramites.jpg`, Agustina en la computadora) se eligió para "trámites". Que el director de arte confirme si acompaña "Preparación" o si va una de las fotos nuevas de consulta.

---

## 7 y 8. No estás solo + Testimonios

**Objetivo:** juntar testimonios reales con autorización, sin mostrar ejemplos falsos mientras no haya.

**Problema actual:** hay dos lugares que piden palabras a los pacientes y ninguno funciona de verdad:
- "No estás solo" tiene un formulario anónimo que no se envía a ningún lado, y "Leer un mensaje" muestra lorem firmado "Una paciente · 6 meses post-cirugía".
- "Testimonios" muestra 4 ejemplos con tiempos inventados ("8 meses después de la cirugía") y 5 estrellas.

**Propuesta (un solo formulario, un solo lugar):**
1. El formulario del PDF reemplaza al anónimo de "No estás solo". El botón "Dejar un mensaje" pasa a **Dejar mi testimonio** y abre ese formulario.
2. "Leer un mensaje" se oculta hasta que haya testimonios aprobados. Después muestra fragmentos de esos testimonios, nunca lorem.
3. La sección Testimonios se oculta, junto con su link en la nav, hasta tener **al menos 3 aprobados** (criterio de la reunión de julio). Cuando vuelva, cada tarjeta muestra nombre o iniciales, tratamiento, texto y foto si la hay. No muestra "tiempo desde la cirugía" porque el formulario no lo pide.

### No estás solo (`noEstasSolo`)
- **Pre-título:** Una nota (igual)
- **Título:** No estás solo/a. (igual)
- **Texto (mientras no haya testimonios):** Detrás de cada tratamiento hay una historia parecida a la tuya. Si ya pasaste por el proceso, dejá unas palabras para quien recién empieza el camino.
- **Texto (cuando haya testimonios):** Detrás de cada tratamiento hay una historia parecida a la tuya. Leé lo que otros pacientes quisieron contarte, o dejá unas palabras para quien recién empieza el camino.
  ("cirugía" pasa a "tratamiento" porque ahora hay inyectables y balón.)

### Formulario de testimonios (textos del PDF)
- **Nombre o iniciales** (obligatorio)
- **Tratamiento** (desplegable): Inyectables · Balón gástrico · Manga gástrica · Bypass gástrico · Reganancia de peso · Prefiero no decirlo
- **¿Cómo fue tu proceso con el equipo?**
- **¿Qué cambió en tu vida desde que empezaste?**
  (obligatoria al menos una de las dos)
- **Foto (opcional):** Podés sumar una foto actual o de tu antes y después.
- **Casilla (obligatoria):** Acepto que mi testimonio y mi foto se publiquen en la web de Nucleo Bariátrico.
- **Botón:** Enviar testimonio
- **Confirmación:** Gracias por compartir tu experiencia. Vamos a revisarla antes de publicarla.
- **Error:** Algo no funcionó. Probá de nuevo o escribinos por WhatsApp.

Pendiente del equipo antes de publicar el formulario: a dónde llegan los testimonios y quién los aprueba, si suman un dato de contacto para verificar, y si aceptan fotos de antes y después (ver faltante).

---

## 9. Cobertura (#obras-sociales)

**Objetivo:** que nadie descarte la consulta por su cobertura, sin prometer lo que depende del plan.

- **Pre-título:** Cobertura
- **Título:** Obras sociales y prepagas.
  (Mismo nombre que la tarjeta 03 que lleva acá: quien toca "Obras sociales y prepagas" llega a "Obras sociales y prepagas".)
- **Texto:** La cobertura varía según tu plan y el tratamiento indicado. Consultanos por WhatsApp y lo revisamos con vos.
- **Destacadas:** OSDE · Medifé · Otras (Medifé reemplaza a Swiss Medical; el logo ya está en `public/images/obras/medife.png`).
- **"Otras":** Otras obras sociales y prepagas
- **Botón único:** Consultar mi cobertura (WhatsApp)
- **Se saca:** el texto del PMO y el recuadro "¿Qué es un efector?" (ver dudoso).
- **No se repite acá** que la medicación no está cubierta: eso vive solo en la pregunta frecuente de Cobertura.

**Forma visual:** OSDE, Medifé y Otras al mismo nivel y los 3 tocables. Un solo botón a WhatsApp en la sección: puede ser la propia tarjeta "Otras" o un botón debajo, pero no los dos.

**Mensajes de WhatsApp** (hoy dicen "cubre la cirugía"; la cobertura ahora depende del tratamiento):
- General y "Otras": "Hola, quiero consultar qué cubre mi obra social o prepaga."
- Por logo: "Hola, tengo OSDE y quiero consultar qué cubre mi plan." / "Hola, tengo Medifé y quiero consultar qué cubre mi plan."

---

## 10. Dónde atendemos (#ubicaciones)

**Objetivo:** que quede claro dónde es la consulta y que, si queda lejos, se puede empezar de forma virtual.

- **Pre-título:** Consultas
- **Título:** Dónde atendemos.

**Tarjeta 1 · Villa del Parque**
- **Dirección:** Simbrón 3327, Villa del Parque, CABA
- **Nombre del espacio:** no se muestra hasta que el equipo confirme si es "Bienetre" o "Bien Être Oasis". Cuando lo confirmen, va como segunda línea de la dirección.
- **Horario:** sigue oculto hasta que lo confirmen.
- **Cómo llegar:** se oculta (hoy es lorem) hasta que el equipo pase los datos.
- **Mapa:** Simbrón 3327, CABA
- **Link:** Pedir turno en Villa del Parque (igual que hoy)

**Tarjeta 2 · Consulta virtual**
- **Título:** Consulta virtual
- **Texto:** Si te queda lejos o preferís empezar desde casa, podés hacer tu primera consulta de forma virtual.
- **Link:** Pedir consulta virtual (WhatsApp: "Hola, quiero pedir una primera consulta virtual.")

**Forma visual:** las 2 tarjetas al mismo nivel y con el mismo tipo de link (ninguna con botón grande). La sede lleva una foto real del lugar; la virtual, una de las fotos de atención virtual que mandó el equipo. Sin fotos de la fachada con el cartel de estética hasta que se decida (ver dudoso).

---

## 11. Preguntas frecuentes (#faq)

**Objetivo:** responder lo que frena la consulta (qué tratamiento, cobertura, distancia, seguimiento) sin que haya que escribir.

- **Pre-título:** Preguntas frecuentes (igual)
- **Título:** Lo que más nos consultan. (igual)
- **Botón:** Hacer una pregunta (WhatsApp, igual)
- **Forma visual:** 3 grupos con su nombre visible, preguntas cerradas por defecto. Las que mencionan el IMC y WhatsApp llevan link a la calculadora y al chat.

### Tratamientos
1. **¿Cómo sé qué tratamiento es para mí?**
   Lo definimos en la consulta. Evaluamos tu historia clínica, tus estudios y tu estado nutricional y emocional, y con esa información te indicamos el abordaje más adecuado para tu caso.
2. **¿En qué consiste el tratamiento con inyectables?**
   Es un tratamiento médico con medicación que actúa sobre el apetito y la saciedad. Incluye controles periódicos para ajustar la dosis y seguimiento con nutrición y psicología, para que el descenso de peso venga acompañado de cambios que se sostengan.
3. **¿En qué consiste el programa de balón gástrico?**
   El balón se coloca tragando una cápsula en una consulta breve, sin cirugía ni anestesia. Permanece unas 16 semanas en el estómago y se elimina de forma natural. El programa dura seis meses e incluye seguimiento nutricional y psicológico.
4. **¿En qué consiste la cirugía bariátrica con Nucleo?**
   Es un proceso completo: primera consulta, evaluación integral, preparación, cirugía y seguimiento. Operamos con técnicas mínimamente invasivas e internación corta, y acompañamos tu evolución con todo el equipo durante el tiempo que tu caso lo requiera.
5. **¿Quién puede hacerse una cirugía bariátrica?**
   La indicación depende de tu IMC, de las enfermedades asociadas y de la evaluación del equipo. Podés calcular tu IMC con la calculadora de esta página como punto de partida, y en la consulta definimos si la cirugía es el camino indicado.
6. **Me operé y volví a subir de peso. ¿Pueden ayudarme?**
   Sí. La reganancia forma parte de la evolución de una enfermedad crónica y tiene tratamiento. Evaluamos tu cirugía previa, aunque la hayas hecho con otro equipo, y definimos cómo seguir.

### Cobertura
7. **¿Mi obra social cubre la medicación para bajar de peso?**
   En general, no. La medicación para el tratamiento de la obesidad no está incluida en el Programa Médico Obligatorio, por lo que la mayoría de las obras sociales y prepagas no la cubren. En la consulta te orientamos sobre las opciones para tu caso.
8. **¿Mi obra social cubre la cirugía?**
   Depende de tu plan y de los requisitos médicos de cada cobertura. Escribinos por WhatsApp y revisamos tu caso.

### Consultas y seguimiento
9. **¿Hacen consultas virtuales?**
   Sí. Podés hacer la primera consulta de forma virtual y continuar el proceso con nosotros.
10. **¿El seguimiento es solo con el cirujano?**
    No. Durante todo el tratamiento te acompaña el equipo completo: cirujanos, nutricionistas y psicóloga.
11. **¿Cuánto tiempo dura el seguimiento?**
    El que tu caso requiera. La obesidad es una enfermedad crónica, y el seguimiento a largo plazo es lo que permite sostener los resultados y cuidar tu salud en el tiempo.

Correcciones hechas: "NÚCLEO" pasa a "Nucleo" (pregunta 4) y "en nuestra web" a "con la calculadora de esta página" (pregunta 5).

**Aviso de repetición (decide Fede):** las preguntas 2, 3 y 6 repiten casi textual los textos de Inyectables, Balón y Reganancia; la 4 resume el Proceso y la 11 repite la última frase del paso 05. Recomiendo cargarlas igual: las escribió el equipo, son las preguntas literales que hace la gente, y en Tratamientos esos textos quedan detrás de un toque.

---

## 12. Contacto y pie

- `contacto.labels.enviado`: "Recibimos tu consulta. Te respondemos en menos de 24 horas hábiles." (hoy dice "24 hs." sin "hábiles", y el dato confirmado es con hábiles).
- Pie, columna "Ubicaciones": pasa a **Dónde atendemos**, con "Villa del Parque" y "Simbrón 3327, CABA". Toma el dato de `ubicaciones.sedes`, así que se corrige solo al sacar San Isidro.
- `footer.legal`: sigue en lorem hasta que el equipo mande el texto legal.

---

## Consulta virtual: dónde aparece (y dónde no)

| Lugar | Qué dice | Por qué |
|---|---|---|
| Qué nos diferencia, tarjeta 04 | "la primera consulta puede ser virtual" (1 línea, lleva a Dónde atendemos) | Es la respuesta rápida para quien ve una sola sede y vive lejos. Sigue el patrón de las otras 3 tarjetas: resumen y atajo |
| Dónde atendemos, tarjeta 2 | Explicación y link para pedirla | Es el lugar donde se busca "¿dónde es?". Usa las fotos de atención virtual del equipo y ocupa el lugar que deja San Isidro |
| Preguntas frecuentes, 9 | Texto del equipo | Es la pregunta literal que hace la gente |

**No va** en Hero, Proceso (paso 01), Contacto ni pie: sería la cuarta repetición.

---

## Textos desactualizados o que contradicen lo nuevo

### En `lib/copy.ts`

| Clave | Texto actual | Problema | Qué va |
|---|---|---|---|
| `diferencial.items[2].title` / `.body` | "Te guiamos con la cobertura" / "Hacemos el trámite de autorización con tu obra social." | El equipo la reemplazó; promete el trámite (dudoso) | Tarjeta 03 de arriba |
| `diferencial.items[3]` (badge, title, body, cta) | "04 · Locaciones" / "2 puntos de atención" / "Atendemos en Villa del Parque y San Isidro..." / "Ver ubicaciones" | San Isidro ya no va | Tarjeta 04 de arriba |
| `diferencial.items[0].body` | "Cirujanos bariátricos con formación específica en obesidad..." | No contradice; deja afuera a nutricionistas y psicóloga | Recomendado, arriba |
| `equipo.acompanamiento.miembros` | Solo Rocío | Faltan las nutricionistas | 2 placeholders "Nombre" / "Nutricionista" |
| `tratamientos.headline` | "Un abordaje distinto para cada caso." | Título nuevo del equipo | "Un abordaje para cada caso." |
| `tratamientos.body` | "No hay un solo camino. Evaluamos tu situación y te proponemos el tratamiento, o la combinación de tratamientos..." | Bajada vieja | Bajada del PDF |
| `tratamientos.categorias[*].opciones[*].body` | lorem | Llegaron los textos | Textos de arriba |
| `tratamientos.categorias[*].opciones[*].resumen` | "Medicación bajo seguimiento médico." / "Dispositivo temporal y reversible." / "La técnica más utilizada." / "Para casos más avanzados." | No salen del material ("la más utilizada" es un superlativo sin confirmar). Hoy no se muestran | Subtítulos del PDF |
| `tratamientos.reganancia.titulo` / `.body` | "¿Volviste a subir de peso después de la cirugía?" / "La re-ganancia de peso puede pasar... Si te operaste en otro lugar..." | Texto viejo; ahora incluye cirugías hechas con ellos | Reganancia de arriba |
| `proceso.pasos[2]` | "Cobertura y trámites" / "Te guiamos con la autorización de tu obra social y todo el papeleo..." | El equipo lo reemplazó; promete el trámite | "Preparación" |
| `testimonios.items` | M., C., L., R., J., A. con "8 meses después de la cirugía", "1 año y 2 meses", 5 estrellas y lorem | Parecen datos reales y no lo son | Ocultar la sección hasta tener 3 aprobados |
| `noEstasSolo.body` | "Detrás de cada cirugía... Leé lo que otros pacientes quisieron contarte..." | Invita a leer mensajes que no existen; "cirugía" deja afuera 2 tratamientos | Texto de arriba |
| `noEstasSolo.mensajesEntrantes` | lorem firmado "Una paciente · 6 meses post-cirugía", etc. | Firmas con forma de dato | Ocultar "Leer un mensaje" hasta tener aprobados |
| `noEstasSolo.formLabels` | Formulario anónimo que no se envía | Se reemplaza por el formulario de testimonios | Formulario de arriba |
| `obrasSociales.headline` | "Tu obra social puede cubrir la cirugía." | Solo habla de cirugía; la cobertura depende del plan y del tratamiento | "Obras sociales y prepagas." |
| `obrasSociales.body` | "La cirugía bariátrica está incluida en el Programa Médico Obligatorio (PMO)... Te la confirmamos por WhatsApp antes de tu primera consulta." | PMO pasa a dudoso; texto reemplazado por el equipo | Texto del PDF |
| `obrasSociales.notaEfector` | "Es el equipo médico habilitado ante tu obra social... gestionamos tu autorización..." | Pasa a dudoso | Se saca junto con su recuadro |
| `obrasSociales.destacadas[1]` | Swiss Medical | Era ejemplo; el equipo eligió Medifé | Medifé |
| `obrasSociales.otras.titulo` / `.body` | "¿Tenés otra obra social o prepaga?" / "Trabajamos con más convenios de los que podemos listar acá... en minutos." | El texto afirma convenios y "en minutos" (no confirmado; hoy no se muestra) | "Otras obras sociales y prepagas"; borrar el texto |
| `ubicaciones.eyebrow` / `.headline` | "Dónde encontrarnos" / "2 puntos de atención." | Queda una sola sede | "Consultas" / "Dónde atendemos." |
| `ubicaciones.sedes` | Villa del Parque con dirección en lorem; San Isidro "Lorem ipsum dolor · Zona Norte" | Llegó la dirección; San Isidro ya no va | Simbrón 3327 + tarjeta de consulta virtual |
| `faq.items` | "Pregunta 1" a "Pregunta 6" con lorem | Llegaron las 11 | 3 grupos de arriba |
| `contacto.labels.enviado` | "Te respondemos en menos de 24 hs." | Le falta "hábiles" | "24 horas hábiles" |
| `contacto.horario` (comentario) | "aparece en Contacto y en las 2 sedes" | Queda una sede | Solo el comentario |
| `footer.sedes` | Hereda Villa del Parque y San Isidro | San Isidro ya no va | Se corrige solo |
| `footer.legal` | lorem | Sigue faltando | Sin cambios hasta que llegue |
| `brand.domain` | "nucleobariatrico.com.ar" | Dominio no elegido; se usa en la URL para compartir y en los datos para Google | Confirmar antes del lanzamiento |

### Fuera de `lib/copy.ts` (texto escrito en el código)

| Archivo | Texto | Qué va |
|---|---|---|
| `app/layout.tsx`, description | "...Villa del Parque y San Isidro." | Ver SEO |
| `app/layout.tsx`, keywords | "San Isidro" | Sacar; ver SEO |
| `app/layout.tsx`, jsonLd.location | Lugar "San Isidro" y Villa del Parque sin calle | Una sola sede con Simbrón 3327 |
| `app/opengraph-image.tsx` | "Villa del Parque · San Isidro" | "Villa del Parque · CABA" |
| `components/sections/Ubicaciones.tsx`, sedeMeta | "Zona Norte" y "Cómo llegar: Lorem ipsum" | Sacar Zona Norte; ocultar "Cómo llegar" |
| `components/sections/ObrasSociales.tsx` | Recuadro "¿Qué es un efector?"; mensajes "...si cubre la cirugía"; cursiva atada a la palabra "cirugía" del título | Sacar recuadro; mensajes nuevos; el título nuevo no tiene "cirugía" |
| `components/sections/Tratamientos.tsx` | Mensaje "me operé en otro lugar y quiero consultar por re-ganancia..."; Reganancia fuera de la fila de botones | Mensaje nuevo; Reganancia como quinta entrada |
| `components/sections/NoEstasSolo.tsx` | "Tu mensaje (anónimo)" y formulario sin envío | Formulario de testimonios |
| `components/sections/Footer.tsx` | Título de columna "Ubicaciones" | "Dónde atendemos" |
| `README.md` | "(Villa del Parque + San Isidro)" | Interno, corregir cuando se toque |

---

## Jerarquía de botones (esta ronda)

- **Principal en todo el sitio: WhatsApp.** Sin cambios en nav ("Pedir turno"), hero, calculadora ni botón flotante.
- Tratamientos: un botón por detalle ("Consultar por este tratamiento") y "Consultar mi caso" en Reganancia. Nada nuevo afuera de los detalles.
- Cobertura: un solo botón ("Consultar mi cobertura"); los logos llevan al mismo chat con el nombre de la obra social.
- Dónde atendemos: 2 links del mismo peso (turno presencial y consulta virtual), sin botón grande.
- Testimonios: "Dejar mi testimonio" es secundario. El formulario arranca cerrado y no compite con WhatsApp.
- Contacto: siguen los accesos de siempre (nav, botón flotante, calculadora y cierre). Esta ronda no suma botones de contacto en otras secciones.

---

## SEO

- **Título:** Nucleo Bariátrico · Cirugía bariátrica en Villa del Parque (58 caracteres)
- **Descripción:** Equipo de cirugía bariátrica en Villa del Parque, CABA: inyectables, balón gástrico, manga, bypass y reganancia de peso. Primera consulta presencial o virtual. (159 caracteres)
- **Descripción para compartir (Open Graph):** Cirugía bariátrica y metabólica con seguimiento de cirujanos, nutricionistas y psicóloga. Villa del Parque, CABA.
- **Pre-título del hero (opcional, suma ubicación sin tocar el título):** Cirugía bariátrica · Villa del Parque, CABA
- **Datos para Google (JSON-LD):** una sola sede, `streetAddress` "Simbrón 3327", barrio Villa del Parque, `addressLocality` "Ciudad Autónoma de Buenos Aires", país AR. Sin San Isidro. El nombre del espacio va recién cuando lo confirmen.
- **Búsquedas reales a las que responde la página:** cirugía bariátrica CABA · cirujano bariátrico Villa del Parque · manga gástrica CABA · bypass gástrico CABA · balón gástrico sin endoscopia · balón gástrico en cápsula · reganancia de peso después de manga gástrica · volví a subir de peso después del bypass · tratamiento con GLP-1 para la obesidad · cirugía bariátrica OSDE · cirugía bariátrica Medicus · consulta bariátrica virtual. Sin marcas comerciales de medicamentos, ni siquiera en las palabras clave (pedido del equipo).
- El sitio sigue en `noindex` hasta el lanzamiento.

---

## Avisos para Fede (decisiones que no tomé)

1. **Nombre del espacio:** si el equipo confirma "Bien Être Oasis", queda publicado al lado de Nucleo un lugar que en el cartel dice "Centro de Estética". Lo pidieron ellos ("así se llama el lugar"), así que solo falta la ortografía. Lo que sí hay que decidir es si ahora se pueden usar las fotos de la fachada.
2. **Testimonios en "No estás solo"** y sección Testimonios oculta hasta tener 3 aprobados: es mi recomendación para no tener dos formularios ni ejemplos falsos. La alternativa es dejar el formulario en Testimonios y sacar el anónimo de "No estás solo".
3. **Repetición entre preguntas frecuentes y Tratamientos:** recomiendo cargarlas igual (ver sección 11).
4. **Fotos de antes y después** en el formulario: el texto del equipo las ofrece; conviene confirmarlo antes de publicar la primera.
