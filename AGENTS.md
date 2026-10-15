# AGENTS.md — iamhenry

## Proyecto y stack

Web SSG con Next.js 16.4 App Router, React 19.3, TypeScript 6 estricto, Tailwind CSS 4, Ark UI React 5.39, next-intl 4, Zod 4, Vitest 5 y Testing Library. `@next/third-parties` se usa solo para GTM en el layout raíz. El blog usa Sanity como fuente remota exclusivamente desde el servidor. pnpm 9 y Node 22. No hay API, auth, store, TanStack Query ni MSW.

## Arquitectura

- `src/app/`: rutas delgadas; solo importan vistas.
- `src/modules/home/`: types → content → locales → utils → hooks → components → views.
- `src/shared/components/ui/`: únicos archivos que importan `@ark-ui/react`.
- `src/shared/components/app/`: piezas visuales reutilizables `App*`.
- `test/`: espejo de `src/`. Sin barrels; exports nombrados; funciones, no clases.
- Un módulo puede importar `shared`; nunca otro módulo. `shared` nunca importa módulos.
- Componentes no llaman servicios. Si llega una API: service HTTP puro; DTO + adapter solo si la forma difiere; hook orquesta; datos del servidor en TanStack Query y estado UI real en store.

## Convenciones

Archivos `.ts` y carpetas en kebab-case; componentes/vistas `.tsx` en PascalCase; framework conserva `page.tsx`/`layout.tsx`. Componentes multi-palabra; secciones `{Nombre}Section`; wrappers `Ui*`; compartidos `App*`. Variables/props lowerCamelCase, tipos PascalCase, constantes globales CONSTANT_CASE, booleanos con `is/has/can/should`, handlers `handle*`. Props se destructuran en la firma. No `enum`, no parámetros `_`, no default exports anónimos en configuración y `<Link>` para rutas internas.

## Contenido, estilos e i18n

Textos redactados solo en locales JSON; `content/` guarda estructura, nombres propios, enlaces, imágenes y geometría tipados. La maqueta manda. No inventar pendientes. Los estilos de página se escriben con utilidades Tailwind en JSX y tokens de `src/app/theme.css`; no crear CSS propio ni añadir reglas de página a `theme.css` o `ark.css`. Los patrones interactivos de Ark pasan por wrappers `Ui*` y conservan el aspecto de `ark.css`; las utilidades solo ajustan layout o variantes de maqueta. `data-surface="light"` activa la superficie oscura y también se pasa a los portales. Valores arbitrarios solo cuando no exista token o utilidad equivalente.

## Animaciones

La órbita del Hero, sus tarjetas flotantes y el pulso de disponibilidad ya usan Motion en islas acotadas, con estado estático para móvil, JavaScript ausente y `prefers-reduced-motion`. No añadir otras animaciones, providers ni hooks fuera de tareas de `motion-builder`, ni crear animaciones CSS. Hasta que esas tareas se hagan, el resto del contenido permanece visible en estado final y solo admite transiciones simples de hover/foco. Los `data-motion-section` y `data-motion-item` de `docs/modules/home.md` son contrato estable.

La órbita de la 404 (`src/modules/not-found/`) usa Motion en una isla acotada, con estado estático sin JavaScript y con `prefers-reduced-motion`; `data-motion-section="not-found"` y los valores `not-found-orbit`, `not-found-planet`, `not-found-satellite` y `not-found-lost` de `data-motion-item` son contrato estable.

Instalados para animación: `motion` 14, `gsap` 3.15.0 (con ScrollTrigger y SplitText), `@gsap/react` 2.1.2 y `lenis` 1.3.26. Capas: CSS para hovers, foco y bucles simples; `motion` para microinteracciones y estado de componentes; GSAP para la secuencia del hero, las entradas de sección, el revelado de titulares y el scroll; Lenis para el scroll suave. GSAP se registra una vez en `src/shared/lib/gsap.ts` y solo se importa desde ahí; todo va dentro de `gsap.matchMedia()` con `(prefers-reduced-motion: no-preference)` y se limpia con `useGSAP`. Los estados iniciales los pone GSAP, nunca el CSS. Los videos de HyperFrames los produce el agente `my-motion-frames` en `public/media/`; `motion-builder` solo los integra.

## Dónde crear cada cosa

| Necesitas                       | Ubicación                                         |
| ------------------------------- | ------------------------------------------------- |
| Tipo o schema de home           | `src/modules/home/types/`                         |
| Estructura estática de sección  | `src/modules/home/content/`                       |
| Texto español de home           | `src/modules/home/locales/es.json`                |
| Lógica pura                     | `src/modules/home/utils/`                         |
| Estado React local reutilizable | `src/modules/home/hooks/`                         |
| Sección                         | `src/modules/home/components/{Nombre}Section.tsx` |
| Primitiva Ark                   | `src/shared/components/ui/Ui*.tsx`                |
| Componente global/reutilizable  | `src/shared/components/app/App*.tsx`              |
| Metadata/JSON-LD                | `src/shared/seo/`                                 |
| Tipo o schema de blog           | `src/modules/blog/types/`                         |
| Estructura estática de blog     | `src/modules/blog/content/`                       |
| Video animado de artículo       | catálogo `src/modules/blog/content/motion-videos.ts` y `ArticleBodyVideo`; archivos en `public/media/` |
| Acceso a Sanity                 | `src/modules/blog/services/`                      |
| Adaptador de datos de blog      | `src/modules/blog/adapters/`                      |
| Lógica pura de blog             | `src/modules/blog/utils/`                         |
| Texto español de blog           | `src/modules/blog/locales/es.json`                |
| Componente de blog              | `src/modules/blog/components/`                    |
| Vista de blog                   | `src/modules/blog/views/`                         |
| Rutas internas de blog          | `src/modules/blog/routes.ts`                      |
| Ruta pública de blog            | `src/app/(site)/blog/`                            |
| Estructura y geometría de la 404 | `src/modules/not-found/content/`                 |
| Texto español de la 404         | `src/modules/not-found/locales/es.json`           |
| Componente o vista de la 404    | `src/modules/not-found/components/` y `views/`    |
| Ruta de la 404                  | `src/app/not-found.tsx` (delgada, con `SiteLayout`) |

Wrappers disponibles: `UiTabs`, `UiCarousel`, `UiDrawer`. El módulo patrón es `src/modules/home/`, especialmente la cadena de Experiencia: types → content → utils → components. Orden para nuevos módulos: types → content → service/DTO/adapter si aplica → keys → hooks → store si aplica → components → view → ruta delgada.

## Calidad y flujo

Comandos: `pnpm typecheck`, `pnpm lint`, `pnpm build`, `pnpm test`, `pnpm verify`. Tests solo cuando se piden, al cerrar verificación o al modificar código probado; nunca en pre-commit. El hook ejecuta únicamente ESLint fix y Prettier.

Lee `docs/backlog.md` y la spec del módulo. Implementador marca `en revisión`; `reviewer` aprueba y cierra u observa. Con dos observaciones seguidas se consulta al usuario. Checklist landing: SSG/SEO, accesibilidad, HTML semántico, imágenes, bundle, responsive 1440/390, contenido fuera de componentes y fidelidad visual. Si aparece un área privada, actualiza el tipo sin mover módulos existentes.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
