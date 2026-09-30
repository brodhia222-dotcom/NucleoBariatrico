# Ronda v7 (para el cliente, "v6"): sede de Lomas de Zamora y bios · EN CURSO

Rama: `v6-lomas-y-bios` (sale de `v5-correcciones-qa`). Guardada en un commit local el 2026-09-30 porque Fede tuvo que apagar la compu. **Todavía no se subió a GitHub** (no hay link de Vercel de esta rama).

Pedido completo: `brief/material/ajustes-2026-09-29.md`. Textos del agente de contenido: sección "Ronda v7" al final de `brief/contenido.md`.

## Hecho
- Bios de Solange y Débora cargadas (acortadas al largo de las demás; el apellido de Débora es "Salamón").
- "Dónde atendemos" con 2 pestañas (Villa del Parque y Lomas de Zamora): componente nuevo en `components/sections/Ubicaciones.tsx`, datos en `ubicaciones.sedes` de `lib/copy.ts` (tipos `Sede` y `MediaSede`).
  - Lomas: fachada (foto) + video corto en loop, mudo, con botón de pausa; póster fijo con movimiento reducido. Botón "Ver recorrido" abre el recorrido completo en una ventana con controles.
  - "Pedir turno" de cada sede abre WhatsApp con la sede en el mensaje y ahora es el botón principal (relleno); "Cómo llegar" pasó a secundario.
  - La consulta virtual queda fija debajo, para las 2 sedes.
  - Los links de sedes del pie abren la pestaña de su sede (`data-sede`).
- Textos por 2 sedes: tarjeta 04 de "Qué nos diferencia", consulta virtual, SEO (título "Cirugía bariátrica en CABA y Lomas · Nucleo Bariátrico", descripción, palabras clave), JSON-LD (address + location con las 2 sedes; se sacó `medicalSpecialty`, que no es válido en MedicalBusiness), imagen para compartir ("Villa del Parque · Lomas de Zamora"), README.
- Compila (`npm run build` sin errores).

## Archivos del agente de fotos (generados, SIN REVISAR; se lo frenó antes de terminar)
- `public/images/sede-lomas-fachada.jpg`, `sede-lomas-interior.jpg`, `sede-lomas-loop.jpg` (póster), `sede-lomas-recorrido.jpg` (póster)
- `public/videos/sede-lomas-loop.mp4` (613 KB) y `public/videos/sede-lomas-recorrido.mp4` (3 MB)
- `brief/fotos/v7/` (hoja de contactos, recortes, alternativa de interior)
- Le faltó escribir la sección "Ronda v7 · Lomas de Zamora" en `brief/fotos.md` y pasar los object-position recomendados (estaba midiendo dónde caen los carteles de la fachada).

## Para retomar (en orden)
1. Revisar a ojo cada archivo del agente. Lo que NO puede quedar legible (lo marcó el agente de contenido):
   - en la fachada y en el video de llegada: el teléfono de turnos del centro ("Turnos y consultas 11 3170-4223", con ícono de WhatsApp), "@cm.laslomitas" y la lista de especialidades del vidrio; el vinilo "Dr. Iván Brener · Médico cirujano plástico" y su cartel redondo; la pantalla con otras médicas y sus horarios;
   - el recorrido tiene que arrancar en la recepción o cortar antes de que se lea el vidrio.
   Si algo falla, relanzar el agente `web-fotos` con esos puntos (ffmpeg: ver abajo).
2. Ajustar `pos` (object-position) de la fachada y del video de Lomas en `lib/copy.ts` según lo que se vea en compu (columna más angosta que 9:16).
3. `npm run build` + `npm run start -- -p 3006` y revisar en 360, 390, 768, 1024, 1440 y 1900: pestañas, cambio de sede, video (arranca solo al verse, se pausa, con movimiento reducido queda quieto), ventana del recorrido (Escape, fondo, botón cerrar, vuelve el foco), links del pie, mapas de las 2 sedes.
4. QA completo, `web-critico` (máximo 3 vueltas), fase "entrega", commit y `git push -u origin v6-lomas-y-bios`.
5. Mensaje a Fede (checkpoint 2) con: link de la rama en Vercel, qué cambió y lo que queda a decidir.

## A decidir por Fede / el equipo
- Mostrar el nombre "Centro Médico Las Lomitas" en la tarjeta de Lomas (hoy se muestra; se saca con `espacio: null`).
- El formulario de contacto no pregunta la sede (el agente de contenido no lo recomienda: el botón de cada sede ya manda la sede escrita).

## Herramientas
- ffmpeg no está en el PATH: se instaló `imageio-ffmpeg` con pip (usuario). Ruta: `C:\Users\feded\AppData\Roaming\Python\Python313\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v7.1.exe`.
- Material original: `C:\Users\feded\Desktop\FotosNucleo\UltimasFotosyVideos`.
