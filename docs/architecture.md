# Arquitectura — iamhenry

## ADR-001 · Next.js App Router y SSG

Contexto: landing pública con SEO y un blog futuro. Decisión: Next.js 16, App Router, Server Components y prerender estático. Alternativa descartada: SPA, por peor HTML inicial y metadata.

## ADR-002 · Landing modular

Decisión: un módulo `home` por página, no uno por sección; páginas delgadas en `app/(site)` y elementos globales en `shared`. `blog` queda reservado. No hay auth, API, TanStack Query, ky, MSW ni store porque no existe un caso de uso actual.

## ADR-003 · Contenido e i18n

Decisión: locale `es` fijo, sin prefijo, con next-intl. Los textos viven en JSON y la estructura tipada en `content/`. La maqueta manda sobre `contenido.md`. Alternativa descartada: strings en componentes.

## ADR-004 · UI y dependencias

Decisión: módulos consumen `UiTabs`, `UiCarousel` y `UiDrawer`; solo wrappers importan `@ark-ui/react`. `theme.css` es la fuente exclusiva de tokens. En este tema `data-surface="light"` activa la superficie oscura.

## ADR-005 · Animaciones diferidas (sustituido en parte por ADR-008)

Contexto: un agente especializado trabajará después. Decisión: esta base no implementa animaciones ni importa Motion. Todo queda visible en estado final, con solo transiciones de hover/foco; Experiencia cambia sin animación. El marcado estable `data-motion-*` habilita el trabajo posterior. `motion-builder` decidirá HyperFrames o Motion por pieza. La dependencia instalada `motion` se conserva sin uso porque no se autorizó cambiar dependencias.

## ADR-006 · Testing

Decisión: Vitest 5, happy-dom y Testing Library, tests espejo en `test/`. Se prueban contenido, función pura, hook, wrapper y comportamiento visible; no hay MSW.

## ADR-007 · SEO y dominio

Decisión: metadata centralizada, Person JSON-LD, sitemap, robots y Open Graph generado. `NEXT_PUBLIC_SITE_URL=https://iamhenry.example.com` es marcador hasta confirmar dominio. Fuentes con `next/font`.

## ADR-008 · Animación con GSAP, Lenis y Motion

Contexto: el usuario pidió subir el nivel de animación (9 de octubre de 2026). Decisión: se añaden `gsap` (con ScrollTrigger y SplitText), `@gsap/react` y `lenis` a `motion`, ya instalada. CSS para hovers y bucles; Motion para microinteracciones y estado; GSAP para hero, entradas, titulares y scroll; Lenis para el scroll suave. El carácter sigue siendo el de `media.md`: fluido en las órbitas, seco en la interfaz. Se mantiene del ADR-005 que el contenido es visible en el HTML servido y que con movimiento reducido todo queda en estado final. Las piezas HyperFrames las produce el agente `my-motion-frames`. Descartado: Three.js o Spline, porque la profundidad del Hero es CSS 3D.

## Supuestos aplicados

Las preguntas no respondidas usan los defaults de la propuesta: solo preguntas del asistente con respuesta; tecnologías y educación de la maqueta; Escríbeme será `mailto:` cuando se construya; no se inventan pendientes.
