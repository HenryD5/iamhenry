# Transversal · Modo noche (cambio 2026-10-14)

Vive en `src/shared/` (no es un módulo de dominio). Ficha: `docs/changes/2026-10-14-modo-noche.md`. Diseño aprobado: https://claude.ai/artifact/E7NmXLe1MXHdUwGGL8U6VU

## Decisiones confirmadas por el usuario

1. Sigue `prefers-color-scheme` hasta que la persona elija; luego manda su elección.
2. `localStorage`, clave `theme`, valores `night` | `day`. Sin clave = sistema.
3. Script inline mínimo en `<head>` de `src/app/layout.tsx` + `suppressHydrationWarning` en `<html>`; sin parpadeo.
4. `role="switch"` + `aria-checked`, etiqueta en `src/shared/locales/es.json`.
5. Sin store ni provider: el atributo de `<html>` es la fuente de verdad; un hook lo lee y lo escribe.
6. `UiSwitch` wrapper de Ark Switch, solo utilidades y tokens (`ark.css` no tiene Switch).
7. Sin JavaScript = día.
8. **Superficies invertidas.** En noche la página pasa a la superficie oscura y todo lo que hoy lleva `data-surface="light"` pasa a la clara. Mismas dos paletas, sin colores nuevos.
9. Vídeos HyperFrames (Hero, Stack): se comprueba en navegador; si su fondo choca en noche, por defecto se muestra la órbita en código y no se producen vídeos nuevos (anotarlo en la tarea).

## Mecanismo

- Atributo `data-theme="night"` en `<html>` (ausente = día). El script inline lo fija antes del primer pintado.
- `src/app/theme.css`, solo tokens (cambio de tokens del design system, aprobado por el usuario; ninguna regla de página):
  - `[data-theme="night"]` recibe los valores de la superficie oscura (los de `[data-surface="light"]` de hoy).
  - `[data-theme="night"] [data-surface="light"]` recibe los de la superficie clara (los de `:root` de hoy), incluidos `--gradient-accent`, `--button-hover-bg/-fg`, `--color-scheme`, `--accent*`, `--focus-ring`, `--serif-accent`, `--heading-accent-color`.
  - Hay que fijar la especificidad para que gane sobre `[data-surface="light"]` simple.
- `color-scheme` sigue a `--color-scheme`; en `<html>` se obtiene por `body, [data-surface]` existente.
- Los portales de Ark cuelgan de `<body>`: heredan `data-theme` de `<html>`; los que reciben `surface="light"` (UiDrawer, UiTooltip, `contentSurface` de UiTabs) se invierten por el segundo selector.
- Transición: `background-color` y `color` ~0.4s con `var(--ease)` (`--duration`) en `body` y `[data-surface]`; con `prefers-reduced-motion: reduce`, ninguna. Sin animaciones nuevas.

## Archivos

- Crea: `src/shared/utils/theme.ts` (clave, valores, `resolveTheme`, cadena del script inline); `src/shared/hooks/use-theme.ts`; `src/shared/components/ui/UiSwitch.tsx`; `src/shared/components/app/AppThemeSwitch.tsx`; clave `theme.*` en `src/shared/locales/es.json`.
- Modifica: `src/app/layout.tsx`, `src/app/theme.css`, `AppHeader.tsx`, `AppMobileMenu.tsx`, y los componentes con colores fijos (lista de la ficha).

## Interruptor (diseño aprobado)

- Píldora con perilla deslizante que muestra el icono activo (sol en día, luna en noche).
- Barra: antes del botón «Construyamos algo juntos». En móvil, el interruptor compacto vive en la barra, inmediatamente a la izquierda del botón del menú, y no dentro del drawer.
- `UiSwitch`: contrato `checked`, `onCheckedChange`, `label` (accesible), `thumbIcon`/iconos como props; foco visible con `--focus-ring`. La perilla se desliza con transición simple (la píldora es parte del diseño aprobado; con movimiento reducido, sin transición).
- Etiqueta (provisional, editable en locales): «Modo noche».

## Migración de colores fijos

Todo `bg-white`, `text-white`, `*-secondary-*`, `*-neutral-*`, `*-primary-*` de la lista de la ficha pasa a token (`bg-surface`, `bg-surface-raised`, `text-fg`, `text-fg-muted`, `border-line`, `text-accent-text`) salvo que sea intencionalmente fijo (p. ej. texto sobre botón primario). Cada excepción se anota en la tarea. `opengraph-image.tsx` no se toca.

## Criterios de aceptación

1. Día (por defecto): la web se ve idéntica a hoy en 1440 y 390 (home, blog listado y artículo, 404).
2. Noche: Hero, Pregunta, Experiencia, Portafolio, Sobre mí y blog en superficie oscura; Stack, pie, tarjetas flotantes del Hero, panel del chat, tarjeta del cargo actual, tarjeta de cierre, `UiDrawer`/`UiTooltip` y 404 completa (barra incluida) en superficie clara.
3. Sin texto ilegible: contraste AA en ambos modos; el botón «Construyamos…» y el logo se invierten con la superficie.
4. Primer pintado sin parpadeo con `reload` en ambos modos; con sistema en oscuro y sin elección, entra en noche; tras elegir, la elección persiste y manda sobre el sistema.
5. Switch: `role="switch"`, `aria-checked` correcto tras hidratar, operable con teclado (Espacio/Enter), etiqueta leída por lector de pantalla, presente en la barra en escritorio y móvil (variante compacta junto al botón del menú), no se repite en el menú móvil.
6. Transición de fondo y texto ~0.4s; ninguna con movimiento reducido.
7. Scrollbars y controles nativos siguen a `color-scheme`.
8. Hero y Stack en noche usan sus vídeos `-noche` (`hero-orbita-noche`, `stack-tres-cuerpos-noche`), sin recuadro desentonando.
9. Sin JavaScript: modo día y la web usable.
10. `pnpm typecheck`, `lint`, `build` y `test` en verde; páginas siguen estáticas.

## Preguntas abiertas

- Resuelto (2026-10-15): el conmutador vive en la barra también en móvil, en variante compacta a la izquierda del botón del menú.
- ¿Gráficos/ilustraciones de `public/images/projects` necesitan variante en noche? Por defecto no; se revisa en la tarea de revisión.
