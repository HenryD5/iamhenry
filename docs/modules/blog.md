# Módulo blog

(cambio 2026-10-13) Antes era un módulo reservado sin ruta. Ahora se construye con Sanity (plan gratuito) como fuente editorial. Ficha: `docs/changes/2026-10-13-blog-sanity.md`.

## Principio de confidencialidad (requisito del usuario)

"No debe ver nada público, todo en variables de entorno."

- Ningún valor de Sanity (projectId, dataset, versión de API, hostname del Studio) se escribe en código, ni en la web ni en `studio/`, ni en tests, locales, docs versionados o fixtures. Solo existen en variables de entorno.
- En la web son variables de servidor, SIN `NEXT_PUBLIC_`. Prohibido cualquier `NEXT_PUBLIC_SANITY_*`.
- Los valores no se versionan: `config/.env.example` y `studio/.env.example` llevan solo los nombres (sin valores). Los valores van en `.env.local` (web), `studio/.env` (Studio) y en el panel de Vercel.
- Los tests no usan valores reales: el cliente se simula y la configuración se inyecta con valores ficticios claramente falsos definidos en el propio test (`config/.env.test` solo con marcadores).

## Variables

| Variable | Dónde | Notas |
|---|---|---|
| `SANITY_PROJECT_ID` | Web (servidor) | Validada con Zod |
| `SANITY_DATASET` | Web (servidor) | Validada con Zod |
| `SANITY_API_VERSION` | Web (servidor) | Fecha `YYYY-MM-DD`, validada con Zod |
| `SANITY_STUDIO_PROJECT_ID` | `studio/.env` | |
| `SANITY_STUDIO_DATASET` | `studio/.env` | |
| `SANITY_STUDIO_HOSTNAME` | `studio/.env` | Subdominio de `*.sanity.studio`; lo lee `sanity.cli.ts` |

Sin token en la web (solo se lee contenido publicado). Si algún día hay borradores: token de lectura solo servidor, fuera de este cambio.

Implementación: `src/shared/utils/env-server.ts` (nuevo), con `import "server-only"` y su propio schema Zod; no mezcla ni toca el `env.ts` público. Si falta una variable, el build falla con mensaje claro (sin imprimir valores). `server-only` se añade como dependencia.

## Entidades

`Article` (cambio 2026-10-13): `slug`, `title`, `description`, `publishedAt` (ISO), `updatedAt` (desde `_updatedAt`), `cover?` (`{ assetId, width, height, alt }`; sin URL de Sanity), `body` (Portable Text).

El esquema `article` vive en el repo, en `studio/schemaTypes/article.ts`:

| Campo | Tipo Sanity | Reglas |
|---|---|---|
| `title` | string | requerido |
| `slug` | slug (fuente `title`) | requerido, único |
| `description` | text | requerido, máx. 160 |
| `publishedAt` | datetime | requerido |
| `cover` | image con `hotspot` | `alt` (string) requerido si hay imagen |
| `body` | array Portable Text | bloques normal, h2 a h4, cita, listas, enlaces, código en línea, imagen con `alt` requerido |

Sin autor (siempre Henry) ni taxonomía hasta unos 12 artículos (decisión del usuario).

## API y datos

- Cliente: `next-sanity` (`createClient`) en `src/modules/blog/services/`. Se importa **solo desde Server Components**, rutas y `generateStaticParams`; el módulo del cliente lleva `import "server-only"`. `useCdn: false`.
- Consultas GROQ (nombres de ejemplo, definitivos en la tarea): listado `*[_type=="article" && defined(slug.current)] | order(publishedAt desc)`; detalle por `slug.current == $slug`; lista de slugs para `generateStaticParams`.
- Proyección GROQ con alias (`"slug": slug.current`, `"updatedAt": _updatedAt`) y portada como `asset->{_id, metadata{dimensions}}` más `alt`.
- DTO + adapter: se mantiene un adapter pequeño en `src/modules/blog/adapters/` porque la forma difiere en la portada (de referencia de asset a `assetId`, ancho, alto, alt) y las fechas. Si el DTO resulta idéntico a `Article`, se elimina el adapter (decisión de la tarea, con nota).
- No hay `shared/http-client`, TanStack Query, MSW ni store (decisión del usuario).
- `@sanity/image-url` no se usa: dejaría URLs de `cdn.sanity.io` con projectId en el HTML. Las URLs de imagen se construyen solo dentro del proxy (siguiente sección).

## Imágenes sin exponer el origen (decisión anotada)

Problema: las URLs de `cdn.sanity.io/images/{projectId}/{dataset}/…` contienen projectId y dataset y `next/image` las dejaría en el HTML, además del `remotePatterns`.

Opciones evaluadas:
1. Aceptarlo. Simple; contradice el requisito del usuario.
2. Loader de `next/image` que solo oculte parámetros: no sirve, la URL de origen sigue saliendo.
3. **Proxy propio (recomendada):** Route Handler `src/app/(site)/blog/media/[assetId]/route.ts` (GET). El HTML solo lleva `/blog/media/<assetId>` y `next/image` lo optimiza como imagen local (`/_next/image?url=%2Fblog%2Fmedia%2F…`), por lo que no se necesita `remotePatterns` ni mencionar `cdn.sanity.io` en la configuración. El handler valida `assetId` con regex estricta (`^image-[a-f0-9]+-\d+x\d+-[a-z]+$`) para no ser proxy abierto, construye la URL de origen en el servidor con `SANITY_PROJECT_ID`/`SANITY_DATASET`, la pide y responde con el tipo de contenido y `Cache-Control: public, max-age=31536000, immutable` (el id del asset es direccionable por contenido). Coste: una función en Vercel que se invoca una vez por imagen y variante, luego CDN. Residual aceptado: el assetId (hash) es visible; no revela projectId ni dataset.

Se adopta la opción 3. Aplica también a imágenes dentro del cuerpo (Portable Text) y a la imagen Open Graph del artículo (usa `/blog/media/…`, absoluta con `siteConfig.url`).

Residuales que no se pueden eliminar y se documentan como riesgo:
- El Studio alojado en `sanity.studio` es JS público (detrás de login): su bundle contiene projectId y dataset, y su hostname es público. Es inevitable con esa opción.
- Dataset público (plan gratis): cualquiera que conozca projectId y dataset puede consultar lo publicado. Mitigación: no se publica nada sensible, no hay token en la web, y la web no revela esos valores. Limitación aceptada, sin cambiar de plan.

## Studio (cambio 2026-10-13)

- `studio/` en la raíz, proyecto pnpm independiente (su propio `package.json`), desplegado en sanity.studio con `sanity deploy`. Excluido de `tsconfig.json`, ESLint, Prettier y de los tests de la web.
- `sanity.config.ts` y `sanity.cli.ts` leen `process.env.SANITY_STUDIO_*`; ningún literal. `studio/.env` sin versionar; `studio/.env.example` solo con nombres. `.gitignore` ya cubre `.env`, `.env.*` (con excepción de `.env.example`); añadir `studio/node_modules`, `studio/dist` y `studio/.sanity`.
- El Studio no sigue las convenciones de Ark/Tailwind: es una excepción documentada en `AGENTS.md`.
- Inicio de sesión: **lo hace el usuario con `sanity login` en su navegador** (Claude no inicia sesión), igual que `sanity deploy`. **Los artículos de prueba los carga el usuario** en el Studio.

## Pantallas

Sin maqueta. Decisión del usuario: derivarlas del sistema actual (tokens, tipografía, componentes de home) con un **boceto que el usuario aprueba antes de construir**. Hasta esa aprobación, las vistas y rutas quedan bloqueadas.

- Listado público `/blog`: artículos por fecha descendente, sin paginación ni filtros. Estado vacío definido en el boceto.
- Detalle público `/blog/[slug]`: único `h1` (título), fecha, portada, cuerpo.
- Textos de interfaz: en `src/modules/blog/locales/es.json`, redactados con el boceto aprobado (no se inventan aquí).
- Primitivas Ark: ninguna prevista; si el boceto necesita alguna, pasa por wrapper `Ui*`.

### Boceto aprobado (2026-10-14)

Aprobado por el usuario: `docs/boceto/blog.html`, con capturas en `docs/boceto/blog-escritorio.png` y `blog-movil.png`. El boceto manda en las tareas 30 y 31, igual que la maqueta en home. Las clases CSS del boceto son solo referencia: se construye con utilidades Tailwind y tokens de `theme.css`, sin CSS propio.

- Listado: encabezado con el patrón de `AppSectionHeading`. El artículo más reciente va destacado (portada a la izquierda y texto a la derecha; apilado en móvil). Debajo, una cuadrícula de 3, 2 o 1 columnas con tarjetas del estilo Portafolio: portada 16:9, fecha en mono, título y descripción recortada a 2 líneas. Sin portada se usa el degradado de marca. Estado vacío con orbe, título, texto y botón al portafolio (`/#portafolio`).
- Detalle: enlace para volver, antetítulo "Blog", `h1`, entradilla (la descripción) y una línea con autor, fecha y "Actualizado el…" (solo si `updatedAt` es posterior a `publishedAt`). Debajo, la portada 2:1 (16:10 en móvil). Cuerpo de unos 42rem, con citas con filete del degradado e imágenes más anchas que el texto en escritorio. Al final, "Sigue leyendo" con hasta 3 artículos recientes, sin contar el actual. Barra y pie de la home, y `<main id="main-content">`.
- Textos aprobados (van a `src/modules/blog/locales/es.json`):
  - Antetítulo: "Blog".
  - Título del listado: "Notas sobre producto, código" con el acento "e IA.".
  - Descripción del listado: "Lo que aprendo construyendo productos digitales y agentes de IA, contado sin rodeos."
  - Enlaces: "Leer artículo →" en el destacado y "Leer →" en las tarjetas.
  - Estado vacío: "Pronto habrá artículos aquí" / "Estoy escribiendo los primeros. Mientras tanto, mira lo que he construido." / "Ver portafolio".
  - Detalle: "← Todos los artículos", "Actualizado el {fecha}" y "Sigue leyendo".
  - Fechas con formato español: "12 oct 2026" en las tarjetas y "12 de octubre de 2026" en el detalle.

## Rutas y permisos

| Ruta | Render | Acceso |
|---|---|---|
| `/blog` | SSG | Pública |
| `/blog/[slug]` | SSG con `generateStaticParams`; slug inexistente = 404 | Pública |
| `/blog/media/[assetId]` | Route Handler GET, caché inmutable | Pública |

Capas: `src/app/(site)/blog/**` delgado, importa solo vistas; `src/modules/blog/`: types → content → services → adapters → utils → locales → components → views → `routes.ts`. Sin hooks, keys ni store.

## Estado de cliente

Ninguno. Todo se resuelve en servidor durante el build.

## Publicación

Webhook de Sanity (filtro `_type == "article"`, crear, actualizar y borrar) que llama al deploy hook de Vercel, que reconstruye el sitio. La URL del hook vive en Sanity y en Vercel, no en el repo. Lo configura el usuario.

## SEO

- Metadata por artículo con `createPageMetadata` ampliado a `type: "article"` (título, descripción, canónica `/blog/<slug>`, `publishedTime`, `modifiedTime`, imagen).
- JSON-LD `BlogPosting` en `src/shared/seo/` (headline, description, datePublished, dateModified, image, author = persona del sitio, mainEntityOfPage).
- `src/app/sitemap.ts`: `/blog` y cada artículo con `lastModified` = `updatedAt`.
- Enlace "Blog" en barra y pie. Los `href` de ancla actuales (`#stack`…) pasan a `/#ancla` para que funcionen desde `/blog/*` (hallazgo del cambio).

## Reglas del proyecto afectadas

- `AGENTS.md`: pasa de landing a web con fuente remota (Sanity); sin `shared/http-client` ni TanStack Query en el blog (excepción anotada); el cliente de Sanity solo en servidor; Studio fuera de las convenciones de Ark/Tailwind.
- Esta excepción se registra también en `docs/decisions.md` (se crea en la tarea de infraestructura, porque aún no existe).

## Criterios de aceptación

- `/blog` y `/blog/[slug]` se generan estáticos en `pnpm build` con los artículos del dataset; un slug inexistente devuelve 404.
- Escritorio (1440) y 390 px: sin desbordes, coincide con el boceto aprobado; un solo `h1` por página; jerarquía de encabezados correcta en el cuerpo.
- Imágenes con `alt`, ancho y alto (sin CLS), carga diferida salvo la portada del detalle.
- Navegación: desde `/blog` y `/blog/<slug>`, cada enlace de barra y pie lleva a la sección de home o a `/blog`.
- Cuerpo: renderizan párrafos, h2 a h4, listas, cita, enlaces, código en línea e imagen; un bloque desconocido no rompe la página.
- Confidencialidad: tras `pnpm build`, la búsqueda de `cdn.sanity.io` y del projectId real en `src/`, `studio/` (salvo `studio/.env`) y `.next/static` y en el HTML generado no devuelve nada; no existe ninguna variable `NEXT_PUBLIC_SANITY_*`; `git status` no muestra archivos `.env` con valores.
- Metadata, canónica y JSON-LD válidos por artículo; sitemap con las entradas del blog.
- Movimiento reducido: sin animación nueva.
- `pnpm verify` en verde con `studio/` fuera del alcance de tsc, ESLint y tests de la web.
- Checklist del `reviewer` para este módulo (añadido): buscar `cdn.sanity.io` y el projectId en `src/`, `studio/` (salvo `.env`) y `.next/static` tras el build; que ninguna variable `NEXT_PUBLIC_SANITY_*` exista; que el cliente de Sanity solo se importe desde Server Components, y que `server-only` esté presente.

## Preguntas abiertas

- Boceto de listado y detalle (lo produce el agente de diseño o el builder según decida el usuario; aprobación del usuario) y los textos de interfaz que de él salgan.
- Nombre del subdominio de sanity.studio (`SANITY_STUDIO_HOSTNAME`), elegido por el usuario al desplegar.
- Imagen Open Graph por artículo: por defecto la portada vía proxy, y `/opengraph-image` general si no hay portada.
- Paginación y taxonomía: se retoman al pasar de unos 12 artículos.
