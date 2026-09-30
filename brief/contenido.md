# Contenido · Nucleo Bariátrico · Ronda de ajustes 2026-09-24

> **Ronda vigente: v7 (2026-09-30), al final de este archivo.** Pisa lo que abajo se dice sobre sede única (Dónde atendemos, tarjeta 04 de "Qué nos diferencia", SEO, datos para Google y pie).

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

---

# Ronda v7 (2026-09-30) · Sede de Lomas de Zamora y bios de nutrición

**Fuente:** `brief/material/ajustes-2026-09-29.md` (mensajes de Maya Vega y bios textuales), fotos y videos de `Desktop/FotosNucleo/UltimasFotosyVideos` y `brief/fuente-de-verdad.json` (actualizado hoy).
**Alcance:** la página no cambia de orden. Cambian "Dónde atendemos" (2 sedes con pestañas), los textos que daban por hecho una sola sede, el SEO y los datos para Google, y las bios de Solange y Débora. Esta ronda pisa lo que las secciones de arriba dicen sobre "sede única".
**"Texto actual"** es lo que hoy está en la rama `v6-lomas-y-bios`, incluidos los valores provisorios que ya cargó el constructor.

## 1. Dónde atendemos (#ubicaciones)

**Objetivo:** que cada persona encuentre la sede que le queda cerca, reconozca el lugar cuando llega y pida turno en esa sede sin salir de la sección.

**Forma visual:** 2 pestañas con el nombre de la zona. Cada pestaña muestra sus 2 piezas verticales (fotos o video) y su tarjeta: nombre, dirección, lugar si corresponde, mapa y botones. La consulta virtual queda afuera de las pestañas, debajo, porque vale para las 2 (así lo armó el constructor, y está bien). Las 2 pestañas juntas miden unos 300 px y entran en un celular de 360 px; si en algún ancho se parten, achicar el relleno antes que abreviar los nombres.

### Datos de cada sede (`ubicaciones.sedes`)

| Campo | Villa del Parque | Lomas de Zamora |
|---|---|---|
| Pestaña y título de la tarjeta (`nombre`) | Villa del Parque | Lomas de Zamora |
| Línea debajo del título, también en el pie (`lineaDireccion`) | Simbrón 3327, CABA | General Bartolomé Mitre 185 |
| Lugar, debajo de la dirección (`espacio`) | `null` (no se muestra) | Centro Médico Las Lomitas |
| Dirección completa, para el mapa y Google (`direccion`) | Simbrón 3327, Villa del Parque, CABA | General Bartolomé Mitre 185, Lomas de Zamora, Provincia de Buenos Aires |
| `calle` (va en el nombre del mapa) | Simbrón 3327 | General Bartolomé Mitre 185 |
| Horario | No se publica | No se publica |
| Cómo llegar | Solo Google Maps | Solo Google Maps |
| Mensaje de WhatsApp de "Pedir turno" (`turno`) | Hola, quiero pedir un turno en la sede de Villa del Parque. | Hola, quiero pedir un turno en la sede de Lomas de Zamora. |

Nombre de la lista de pestañas para lectores de pantalla (`ubicaciones.pestanas`): **Sedes** (queda igual).

**Por qué "General Bartolomé Mitre 185", sin "Lomas de Zamora" ni "Gral.":** es la regla que ya usa Villa del Parque: el título dice la zona y la línea de abajo, la calle, sin repetir. A Villa del Parque se le suma "CABA" porque es un barrio; Lomas de Zamora ya es la ciudad. Además, "Gral. Bartolomé Mitre 185, Lomas de Zamora" (42 caracteres) no entra en un renglón de la tarjeta ni de la columna del pie y deja "Zamora" colgada; "General Bartolomé Mitre 185" (27) entra. "General" va completo porque así lo escribió el equipo. La provincia sigue en el mapa, en los datos para Google y en la descripción.

**Por qué mostrar "Centro Médico Las Lomitas" (y en Villa del Parque no):** en Villa del Parque no se muestra porque el equipo escribió "Bienetre" y el cartel dice "Bien Être Oasis". En Lomas no hay duda: el nombre se lee igual en el cartel de la fachada, en el de la recepción y en el Instagram del vidrio. Es un centro médico, no de estética, y es lo que la persona busca con la mirada al llegar (por el mismo motivo se dejó el cartel verde en la foto de Villa del Parque). Queda anotado como "visto en las fotos": si el equipo prefiere que no figure, se saca con `espacio: null`.

### URLs de Google Maps de Lomas

- `mapa`: `https://maps.google.com/maps?q=General%20Bartolom%C3%A9%20Mitre%20185%2C%20Lomas%20de%20Zamora%2C%20Provincia%20de%20Buenos%20Aires&t=&z=16&ie=UTF8&iwloc=&output=embed`
- `comoLlegar`: `https://www.google.com/maps/dir/?api=1&destination=General%20Bartolom%C3%A9%20Mitre%20185%2C%20Lomas%20de%20Zamora%2C%20Provincia%20de%20Buenos%20Aires`

Codifican exactamente `direccion`, como las de Villa del Parque. Verificado hoy: Google resuelve la dirección a "Gral. Bartolomé Mitre 185, B1832JDB Lomas de Zamora, Provincia de Buenos Aires" y OpenStreetMap la pone en el mismo punto (barrio Lomitas); no hay otro Mitre 185 en el partido. Las que cargó el constructor (terminan en "Buenos Aires") caen en el mismo punto: el cambio es para que dirección, mapa y botón digan lo mismo.

### Fotos y video de Lomas

| Pieza | Clave | Texto actual | Texto nuevo |
|---|---|---|---|
| Foto de la fachada al atardecer | `sedes[1].media[0].alt` | Fachada del Centro Médico Las Lomitas, en Bartolomé Mitre 185 | Fachada del Centro Médico Las Lomitas al atardecer, con el número 185 sobre la puerta |
| Video corto en loop (el de recepción y sala de espera, 8,5 s) | `sedes[1].media[1].alt` | Recepción y sala de espera de la sede de Lomas de Zamora | Queda igual |
| Botón que abre el recorrido | `sedes[1].recorrido.boton` | Ver recorrido | Queda igual |
| Nombre de la ventana del recorrido | `sedes[1].recorrido.titulo` | Recorrido por la sede de Lomas de Zamora | Queda igual |
| Video del recorrido completo, dentro de la ventana | clave nueva, por ejemplo `sedes[1].recorrido.alt`, como `aria-label` del video | (no tiene) | Recorrido en video por la sede de Lomas de Zamora: la recepción, la sala de espera, el pasillo y un consultorio |

- **Botón "Ver recorrido":** va sobre el video, en una pastilla de un renglón. En celular esa pieza mide unos 160 px de ancho: "Ver el recorrido en video" (25 caracteres) no entra; "Ver recorrido" sí, y el ícono de play ya dice que es un video.
- **Si el recorrido incluye la llegada a la fachada**, el texto del video pasa a "Recorrido en video por la sede de Lomas de Zamora: la llegada, la recepción, la sala de espera, el pasillo y un consultorio". Conviene que arranque en la recepción (ver el punto siguiente).
- **Si el loop usa otro clip:** pasillo (18 s) "Pasillo de la sede de Lomas de Zamora, de la sala de espera al consultorio"; consultorio (16 s) "Consultorio de la sede de Lomas de Zamora". La llegada (4 s) no sirve de loop.

### Antes de publicar: terceros en la fachada (director de arte)

En las 3 fotos de la fachada y en el último segundo del video de llegada se ven cosas que no son de Nucleo:
- el vinilo "Dr. Iván Brener · Médico cirujano plástico" en el vidrio y su cartel redondo en la pared de la derecha;
- una pantalla con la foto, el nombre y los horarios de otras médicas del centro;
- en el vidrio de la puerta, "Turnos y consultas 11 3170-4223" con ícono de WhatsApp, "@cm.laslomitas" y la lista de especialidades del centro.

Retocarlos o recortarlos, con el mismo criterio que el roll-up de estética y la patente en Villa del Parque. El teléfono es lo más importante: si se lee, alguien puede escribirle al centro en vez de al equipo. Y "cirujano plástico" es justo la asociación con estética que el equipo quiso evitar. El cartel "Centro Médico Las Lomitas" y el 185 quedan. El video de llegada no se retoca fácil: que el recorrido arranque en la recepción (la foto ya muestra la entrada) o que corte antes de que se lea el vidrio. Ningún video muestra personas.

### Botones de la tarjeta

- **Pedir turno** abre WhatsApp con el mensaje de la sede (`turno`). Es la acción principal del sitio, así que recomiendo que sea el botón relleno y "Cómo llegar" el secundario (hoy es al revés: "Cómo llegar" relleno y "Pedir turno" con borde). "Cómo llegar" le sirve sobre todo a quien ya tiene turno. Decide Fede.
- **Ver recorrido** es un tercer nivel: pastilla sobre el video, solo en Lomas.
- Nombres para lectores de pantalla (opcional; los botones se llaman igual en las 2 pestañas): "Pedir turno en la sede de Villa del Parque por WhatsApp" / "Pedir turno en la sede de Lomas de Zamora por WhatsApp", y "Cómo llegar a la sede de Villa del Parque (abre Google Maps)" / "Cómo llegar a la sede de Lomas de Zamora (abre Google Maps)".
- Pie: cada sede lleva a "Dónde atendemos", que abre en la pestaña que esté activa (al entrar, Villa del Parque). Si se puede, que cada link abra la pestaña de su sede.

## 2. Tabla de cambios

| Clave de `lib/copy.ts` o archivo | Texto actual | Texto nuevo |
|---|---|---|
| `diferencial.items[3].body` | Te recibimos en Simbrón 3327, Villa del Parque, y la primera consulta también puede ser virtual. | Te recibimos en Villa del Parque y en Lomas de Zamora. La primera consulta también puede ser virtual. |
| `diferencial.items[3]`, comentario | Sede única por ahora (PDF de ajustes 2026-09-24): Simbrón 3327, Villa del Parque. | 2 sedes: Villa del Parque (PDF de ajustes 2026-09-24) y Lomas de Zamora (Maya Vega, 2026-09-29). |
| `equipo.acompanamiento.miembros[1].bio` (Solange) | `lorem.short` | Licenciada en Nutrición, especializada en obesidad y enfermedades cardiometabólicas, cambio de hábitos y abordaje cognitivo-conductual. Experiencia en acompañamiento nutricional para el descenso de peso y en trabajo interdisciplinario. Trabaja con estrategias personalizadas para que los cambios se sostengan. |
| `equipo.acompanamiento.miembros[2].bio` (Débora) | `lorem.short` | Licenciada en Nutrición, egresada de la UBA y diplomada en abordaje integral de la persona con obesidad. Miembro del grupo de estudio de obesidad de la Asociación Argentina de Licenciados en Nutrición. Su práctica combina una atención basada en la evidencia con un enfoque transdisciplinario. |
| Comentario arriba de Solange | Nutricionistas (account manager, 2026-09-28): Lic. Solange Leban y Lic. Débora Salamon. Solo el nombre, como el resto del equipo. Bios todavía pendientes, por eso va lorem. | Nutricionistas: Lic. Solange Leban y Lic. Débora Salamón (con tilde, como en la bio del equipo). Solo el nombre, como el resto del equipo. Bios del equipo (2026-09-29), acortadas al largo de las demás. |
| Comentario arriba de `ubicaciones` | Sede única por ahora (PDF de ajustes 2026-09-24). San Isidro deja de figurar. Cómo llegar: solo el link a Google Maps; no publicar líneas de transporte hasta que el equipo las confirme. | 2 sedes: Villa del Parque (PDF de ajustes 2026-09-24) y Lomas de Zamora (Maya Vega, 2026-09-29). San Isidro no figura. En las 2, sin horario y "Cómo llegar" solo con Google Maps, sin líneas de transporte. |
| `ubicaciones.sedes[1].lineaDireccion` | Gral. Bartolomé Mitre 185, Lomas de Zamora | General Bartolomé Mitre 185 |
| `ubicaciones.sedes[1].mapa` | `...Mitre%20185%2C%20Lomas%20de%20Zamora%2C%20Buenos%20Aires&t=...` | URL de la sección 1 |
| `ubicaciones.sedes[1].comoLlegar` | `...Lomas%20de%20Zamora%2C%20Buenos%20Aires` | URL de la sección 1 |
| `ubicaciones.sedes[1].media[0].alt` | Fachada del Centro Médico Las Lomitas, en Bartolomé Mitre 185 | Fachada del Centro Médico Las Lomitas al atardecer, con el número 185 sobre la puerta |
| `ubicaciones.sedes[1].recorrido.alt` (clave nueva, opcional) | (no tiene) | Recorrido en video por la sede de Lomas de Zamora: la recepción, la sala de espera, el pasillo y un consultorio |
| `ubicaciones.virtual.texto` | Si te queda lejos o preferís empezar desde casa, coordinamos tu primera consulta de forma virtual. | Si ninguna sede te queda cerca o preferís empezar desde casa, coordinamos tu primera consulta de forma virtual. |
| `contacto.horario`, comentario | ...aparece en Contacto y en la sede. | ...aparece en Contacto y en las 2 sedes. |
| `footer.sedes` | Ya toma `lineaDireccion` | Sin cambios: queda "Villa del Parque / Simbrón 3327, CABA" y "Lomas de Zamora / General Bartolomé Mitre 185" |
| `app/layout.tsx`, `title.default` | Cirugía bariátrica en Villa del Parque · ${brand.name} | Cirugía bariátrica en CABA y Lomas · ${brand.name} |
| `app/layout.tsx`, `description` | Equipo de cirugía bariátrica en Villa del Parque, CABA: inyectables, balón gástrico, manga, bypass y reganancia de peso. Primera consulta presencial o virtual. | Cirugía bariátrica en Villa del Parque (CABA) y Lomas de Zamora: inyectables, balón, manga, bypass y reganancia de peso. Primera consulta presencial o virtual. |
| `app/layout.tsx`, `keywords` | cirugía bariátrica, obesidad, Argentina, Villa del Parque, bypass gástrico, manga gástrica, equipo médico bariátrico | cirugía bariátrica, obesidad, Argentina, CABA, Villa del Parque, Lomas de Zamora, zona sur, bypass gástrico, manga gástrica, balón gástrico, reganancia de peso, equipo médico bariátrico |
| `app/layout.tsx`, `jsonLd` | Una sede, con `medicalSpecialty: "Bariatrics"` | Ver sección 4 |
| `app/layout.tsx`, comentario del JSON-LD | Sede única (PDF de ajustes 2026-09-24) | Sede principal en address; las 2 sedes en location |
| `app/opengraph-image.tsx`, línea de abajo | Simbrón 3327 · Villa del Parque | Villa del Parque · Lomas de Zamora |
| `README.md`, línea 3 | (Villa del Parque + San Isidro) | (Villa del Parque + Lomas de Zamora) |

**Quedan como están (ya correctos en la rama):** `ubicaciones.eyebrow` y `headline`, `ubicaciones.pestanas`, toda la sede de Villa del Parque (con `espacio: null`), y de Lomas `nombre`, `direccion`, `calle`, `espacio`, `turno`, `media[1].alt`, `recorrido.boton` y `recorrido.titulo`. En la tarjeta 04 quedan el título "Presencial o virtual", el botón y la foto.

## 3. Bios de las nutricionistas

Mismo formato que las de los cirujanos y Rocío: tercera persona, sin el nombre (ya está arriba), empezando por el título. Las del sitio miden entre 242 y 301 caracteres.

**Solange** (309 caracteres)
> Licenciada en Nutrición, especializada en obesidad y enfermedades cardiometabólicas, cambio de hábitos y abordaje cognitivo-conductual. Experiencia en acompañamiento nutricional para el descenso de peso y en trabajo interdisciplinario. Trabaja con estrategias personalizadas para que los cambios se sostengan.

Queda todo lo duro: título, las 4 especialidades y la experiencia en descenso de peso y en trabajo interdisciplinario. Sale "amplia" (la única valoración de la bio) y la frase general del final ("acompañar a cada paciente en las distintas etapas de su proceso"). El cierre no usa "combina" porque ya está en las bios de Agustina, Sergio y Débora.

**Débora** (292 caracteres)
> Licenciada en Nutrición, egresada de la UBA y diplomada en abordaje integral de la persona con obesidad. Miembro del grupo de estudio de obesidad de la Asociación Argentina de Licenciados en Nutrición. Su práctica combina una atención basada en la evidencia con un enfoque transdisciplinario.

Quedan UBA, la diplomatura y el grupo de estudio de la AALN, con el nombre completo de la asociación como lo escribió el equipo. La membresía va antes del enfoque, como en las demás bios. Sale "acompañando a cada persona en el logro de sus objetivos de salud". "Universidad de Buenos Aires" pasa a "UBA", como en las bios de Nahuel y Agustina.

Apellido: el equipo escribe **Salamón**, con tilde; la account manager lo había pasado sin tilde. En la fuente de verdad queda Salamón. El sitio solo muestra "Débora".

## 4. SEO y datos para Google

- **Título (54 caracteres, contando " · Nucleo Bariátrico"):** Cirugía bariátrica en CABA y Lomas · Nucleo Bariátrico
  Arranca por lo que se busca. "Lomas de Zamora" completo no entra (61). "Lomas" es como se la nombra, y la descripción trae el nombre completo: una búsqueda con "Lomas de Zamora" encuentra las 2 cosas.
- **Descripción (159 caracteres):** Cirugía bariátrica en Villa del Parque (CABA) y Lomas de Zamora: inyectables, balón, manga, bypass y reganancia de peso. Primera consulta presencial o virtual.
- **Palabras clave:** cirugía bariátrica, obesidad, Argentina, CABA, Villa del Parque, Lomas de Zamora, zona sur, bypass gástrico, manga gástrica, balón gástrico, reganancia de peso, equipo médico bariátrico. Sin marcas de medicamentos.
- **Imagen para compartir, línea de abajo:** Villa del Parque · Lomas de Zamora. El título y la descripción para compartir (Open Graph) no nombran sede: quedan igual.
- **Búsquedas reales a las que responde:** cirugía bariátrica Lomas de Zamora · cirujano bariátrico zona sur · manga gástrica Lomas de Zamora · balón gástrico zona sur · nutricionista obesidad Lomas de Zamora · cirugía bariátrica CABA · cirujano bariátrico Villa del Parque · consulta bariátrica virtual.
- El sitio sigue en `noindex` hasta el lanzamiento.

### JSON-LD propuesto (completo)

El de hoy tiene un error: `medicalSpecialty` no es una propiedad de `MedicalBusiness` (schema.org la define para Hospital, MedicalClinic, MedicalOrganization y Physician) y "Bariatrics" no es uno de los valores permitidos. Se saca, y la especialidad queda dicha en `description`. `MedicalBusiness` sigue siendo el tipo que mejor describe a un equipo que atiende en espacios de terceros. `address` lleva la sede principal (Villa del Parque) y `location`, las 2 sedes. `sameAs` suma el Instagram (confirmado). Sin código postal ni coordenadas: no los dio el equipo.

Así se ve ya armado. `name`, `url`, `telephone` y `sameAs` salen de `brand` (no escribirlos a mano); la URL depende de `brand.domain`, que sigue sin confirmar.

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Nucleo Bariátrico",
  "description": "Equipo médico especializado en cirugía bariátrica y metabólica",
  "url": "https://nucleobariatrico.com.ar",
  "telephone": "+5491156077780",
  "areaServed": { "@type": "Country", "name": "Argentina" },
  "sameAs": ["https://www.instagram.com/nucleobariatrico/"],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Simbrón 3327",
    "addressLocality": "Villa del Parque, Ciudad Autónoma de Buenos Aires",
    "addressRegion": "CABA",
    "addressCountry": "AR"
  },
  "location": [
    {
      "@type": "Place",
      "name": "Nucleo Bariátrico · Villa del Parque",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Simbrón 3327",
        "addressLocality": "Villa del Parque, Ciudad Autónoma de Buenos Aires",
        "addressRegion": "CABA",
        "addressCountry": "AR"
      }
    },
    {
      "@type": "Place",
      "name": "Nucleo Bariátrico · Lomas de Zamora",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "General Bartolomé Mitre 185",
        "addressLocality": "Lomas de Zamora",
        "addressRegion": "Provincia de Buenos Aires",
        "addressCountry": "AR"
      }
    }
  ]
}
```

Si Fede prefiere conservar una especialidad, el tipo tiene que pasar a `MedicalClinic` con `"medicalSpecialty": "https://schema.org/Surgical"`. No lo recomiendo: "clínica" describe un establecimiento propio, y no cambia cómo se ve el resultado en Google.

## 5. Revisado y sin cambios

- **Preguntas frecuentes:** ninguna asume una sola sede; "¿Hacen consultas virtuales?" sigue bien. No sumo una pregunta sobre sedes: ya están en "Dónde atendemos" y cada contenido vive en un solo lugar.
- **Hero, calculadora, equipo, tratamientos, proceso, cobertura, contacto, "No estás solo", botón flotante y página 404:** no nombran sede.
- **Pie:** la columna "Dónde atendemos" ya lista las 2 sedes desde `ubicaciones.sedes`.

## 6. Jerarquía de botones (esta ronda)

- Principal en todo el sitio: WhatsApp. Sin cambios en nav, hero, calculadora ni botón flotante.
- Dónde atendemos: "Pedir turno" de cada sede como botón principal (recomendado), "Cómo llegar" secundario y "Ver recorrido" como pastilla sobre el video. La consulta virtual sigue como tarjeta con link.
- No se suman botones de contacto en otras secciones.

## 7. Avisos para Fede

1. **Fachada de Lomas con datos de terceros** (teléfono de turnos del centro, un cirujano plástico, horarios de otras médicas): retocar antes de publicar. Es lo único que frena la foto.
2. **Nombre del centro visible:** decidí mostrar "Centro Médico Las Lomitas" en la tarjeta. Lo vimos en las fotos; el equipo no lo escribió. Se saca con una línea si prefieren que no figure.
3. **Botones de la sede:** recomiendo invertirlos para que "Pedir turno" sea el relleno.
4. **Formulario de contacto:** no pregunta la sede. Si al equipo le sirve saberlo de entrada, se puede sumar un campo opcional ("¿Dónde preferís atenderte?": Villa del Parque · Lomas de Zamora · Virtual). No lo agrego: el botón de cada sede ya manda la sede escrita, y cada campo de más alarga el formulario.
