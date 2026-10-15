---
format: 1080x1920
duration: 35s
message: "Tus tests pueden pasar y tu web estar rota; así creas un agente de QA en Chrome que lo detecta"
arc: Hook → Qué necesitas → Cómo trabaja → El truco → Llévatelo
audience: Comunidad de desarrollo web y público curioso por la IA, sin dar por sabido MCP
structure: how-to (enseñar, no vender)
mode: autonomous
music: calm minimal tech underscore, low and warm, no drums in the intro
---

## Video direction

- **palette system:** fondo `bg` #F6F5FB en las escenas 1–4 y tinta `text` #0E1022 en el cierre; `primary` #1F4BFF es el único acento (núcleo IA, números, checks del agente); `positive` #7FB800 solo para ✅ y `negative` #E5484D solo para ❌ y el "500". Títulos en Manrope (display), textos en Inter, código en JetBrains Mono, todo desde `frame.md`.
- **motion grammar:** curvas largas `power3`, suaves antes que rebotes; cada pieza entra cuando la voz la nombra (nunca todo al inicio); en la espera, quietud o un temblor mínimo. Entradas por subida corta + fundido, revelado palabra a palabra en titulares.
- **rhythm:** la escena 1 golpea (corte verde→rojo); 2 y 3 enumeran a ritmo de voz; la escena 4 es el giro (comparación) y respira al final; la 5 es la pausa cálida y quieta.
- **negative list:** nada de degradados morados "IA", bokeh, cursores reales ni capturas de interfaz real; nada de "slideshow" (todo de golpe y congelado) ni de "salvapantallas" (todo flotando a la vez); nada importante en y > 1480 (subtítulos) ni bajo y 1800 (botones de la app).

## Frame 1 — Todo verde, portada caída

- scene: Una columna de checks verdes ("tests ✓") cae en su sitio; de golpe la ventana del navegador se pone roja con un "500" enorme
- voiceover: "Mis tests pasaban… y mi portada daba error 500. Así creé un agente de QA que lo detecta."
- duration: 7.21s
- poster: 3.2s
- transition_in: cut
- status: animated
- src: compositions/frames/01-hook.html
- type: hook
- persuasion: Pattern interrupt (contraste verde → rojo)
- beat: sorpresa — "eso me puede pasar a mí"
- blueprint: kinetic-type-beats

- blueprint: kinetic-type-beats (Adapt)
- focal: la ventana "Portada" que pasa de blanca a roja con el "500"
- roles: columna de checks = supporting · ventana Portada = foreground subject · cuadrícula tenue del fondo = background
- sfx: tick, impact-soft

Adapt: se mantiene el golpe de una línea que cambia en sitio; aquí el cambio es el color y el número de la ventana.
Scene 1 (0.0–1.9s): con "Mis tests pasaban" caen uno a uno cuatro checks verdes (tests unitarios, tipos, build, lint) en una columna; titular "Todo en verde…" por palabras. Vertical, bloque centrado en y≈0.42.
Scene 2 (1.9–4.3s): con "mi portada" aparece la ventana "Portada" blanca; en "error 500" corte seco a rojo y el "500" entra enorme con un empujón breve; el titular completa "…y la web caída".
Scene 3 (4.3–7.2s): con "Así creé un agente de QA" un pequeño núcleo IA azul aparece junto a la ventana y la rodea con un anillo; se sostiene quieto.

narrativeRole: Abre con una experiencia real y reconocible: la falsa seguridad de los tests en verde.
keyMessage: Que los tests pasen no garantiza que la web funcione.

## Frame 2 — Tres piezas

- scene: Tres tarjetas se apilan en vertical, una por cue: Claude Code · Chrome de pruebas · Chrome DevTools MCP (este con la etiqueta "el enchufe entre la IA y Chrome")
- voiceover: "Necesitas tres cosas: Claude Code, un Chrome de pruebas y Chrome DevTools MCP."
- duration: 7.158s
- poster: 4s
- transition_in: push-slide UP
- status: animated
- src: compositions/frames/02-ingredients.html
- type: product_intro
- persuasion: Chunking (tres piezas, ni una más)
- beat: alivio — "es menos de lo que pensaba"
- blueprint: grid-card-assemble

- blueprint: grid-card-assemble (Adapt)
- focal: la pila de tres tarjetas
- roles: tarjetas = foreground subject · número de cada tarjeta = supporting · cuadrícula tenue = background
- sfx: pop-soft

Adapt: lista vertical que se acumula; cada tarjeta entra en su palabra.
Scene 1 (0.0–1.9s): con "Necesitas tres cosas" entra el titular "Necesitas 3 cosas" por palabras; el "3" en azul.
Scene 2 (1.9–3.0s): en "Claude Code" sube la tarjeta 1.
Scene 3 (3.0–4.9s): en "Chrome de pruebas" sube la tarjeta 2.
Scene 4 (4.9–7.16s): en "Chrome DevTools MCP" sube la tarjeta 3 y, un instante después, su etiqueta "el enchufe entre la IA y Chrome"; se sostiene.

narrativeRole: Nombra lo necesario y explica MCP en cuatro palabras para quien no lo conoce.
keyMessage: Con tres piezas ya tienes un agente que usa Chrome.

## Frame 3 — Cuatro pasos del agente

- scene: El núcleo azul "IA" (el agente) baja por una línea vertical y enciende cuatro pasos según la voz los nombra: Mira qué cambiaste → Decide qué probar → Prueba en Chrome (ordenador y móvil) → Te da un informe (✅ ✅ ❌)
- voiceover: "El agente hace cuatro cosas: mira qué cambiaste, decide qué probar, lo prueba en Chrome y te da un informe."
- duration: 7.576s
- poster: 8s
- transition_in: push-slide UP
- status: animated
- src: compositions/frames/03-agent-steps.html
- type: feature_showcase
- persuasion: Progressive disclosure (un paso por cue)
- beat: comprensión — "ah, así funciona"
- blueprint: agent-progress-theater

- blueprint: agent-progress-theater (Adapt)
- focal: el núcleo IA recorriendo la línea de cuatro pasos
- roles: núcleo IA = foreground subject · pasos = supporting · mini informe = foreground en el cierre · línea vertical = background
- sfx: tick

Adapt: se conserva la firma (el agente trabajando y la lista que se marca); el resultado se despliega dentro del paso 4.
Scene 1 (0.0–2.3s): titular "Tu agente de QA, en 4 pasos"; el núcleo IA aparece arriba y la línea vertical se dibuja hacia abajo.
Scene 2 (2.3–3.7s): en "mira qué cambiaste" se enciende el paso 1 y se marca.
Scene 3 (3.7–5.1s): en "decide qué probar" el núcleo baja al paso 2 y se marca.
Scene 4 (5.1–6.3s): en "lo prueba en Chrome" baja al paso 3 (ordenador y móvil) y se marca.
Scene 5 (6.3–7.58s): en "te da un informe" llega al paso 4 y se despliega la mini lista ✅ Enlaces · ✅ Móvil · ❌ Portada: error 500; se sostiene.

narrativeRole: El corazón didáctico: el flujo del agente, visible paso a paso.
keyMessage: Alcance → plan → prueba en Chrome → informe.

## Frame 4 — El truco que ahorra

- scene: A la izquierda, un bloque enorme de texto gris (la página entera) con la etiqueta "leer toda la página"; a la derecha, un script `page-checks.js` que devuelve una lista corta con un solo ❌. El bloque grande se desvanece y queda la lista
- voiceover: "Un truco: pon las comprobaciones en un script. Gastas menos y solo ves lo que falla."
- duration: 6.348s
- poster: 5s
- transition_in: crossfade
- status: animated
- src: compositions/frames/04-script-trick.html
- type: benefit_highlight
- persuasion: Contrast (antes / después)
- beat: insight — "eso lo aplico mañana"
- blueprint: comparison-split

- blueprint: comparison-split (Adapt)
- focal: la lista corta con un solo ❌ que devuelve el script
- roles: bloque gris "leer toda la página" = supporting (se apaga) · bloque de código `page-checks.js` = foreground subject · cuadrícula tenue = background
- sfx: whoosh-soft

Adapt: la comparación va apilada en vertical (arriba antes, abajo después) en lugar de lado a lado.
Scene 1 (0.0–1.1s): titular "El truco: un script".
Scene 2 (1.1–3.6s): con "pon las comprobaciones" aparece arriba el bloque gris grande "Leer toda la página"; en "script" aparece debajo el bloque de código oscuro `page-checks.js`.
Scene 3 (3.6–5.0s): en "Gastas menos" el bloque gris se tacha y se apaga hasta un 30 %.
Scene 4 (5.0–6.35s): en "solo ves lo que falla" el código devuelve la línea ❌ "Portada: error 500" con un leve resaltado; se sostiene.

narrativeRole: Da un consejo concreto y aplicable aunque nadie entre al blog.
keyMessage: Un script devuelve solo lo que falla; la IA no lee la página entera.

## Frame 5 — Llévatelo

- scene: Título "Tu propio agente de QA en Chrome con IA", debajo "Archivos completos en el blog · gratis" y un icono de guardar; cierra con el logotipo de Henry
- voiceover: "Los archivos completos están en mi blog, gratis. Guárdalo para tu próximo proyecto."
- duration: 6.74s
- poster: 4.2s
- transition_in: crossfade
- status: animated
- src: compositions/frames/05-takeaway.html
- type: cta
- persuasion: Reciprocity (comparte gratis)
- beat: gratitud — "lo guardo"
- blueprint: titlecard-reveal
- asset_candidates: public/logo-on-dark.svg — logotipo de Henry para fondo oscuro, cierra el video

- blueprint: titlecard-reveal (Adapt)
- focal: el título del artículo
- roles: título = foreground subject · icono de guardar + botón = supporting · logo = supporting · anillos tenues = background
- sfx: none

Adapt: cierre cálido sobre tinta; título, línea de valor, guardar y logo, en ese orden.
Scene 1 (0.0–2.2s): con "Los archivos completos" entra el título "Tu propio agente de QA en Chrome con IA" por palabras.
Scene 2 (2.2–4.3s): en "en mi blog, gratis" aparece "Archivos completos en el blog · gratis".
Scene 3 (4.3–6.74s): en "Guárdalo" el icono de guardar hace un pequeño pop y aparece el botón "Guárdalo para tu próximo proyecto"; después entra el logo; todo se sostiene quieto hasta el final.

narrativeRole: Cierra ofreciendo el material y pidiendo guardar, no comprar.
keyMessage: Los archivos son gratis; guárdalo para usarlo.
