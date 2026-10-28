# Módulo contact

(cambio 2026-10-27) Módulo nuevo. Sustituye al contacto por WhatsApp (tarea 65) por un formulario de contacto con envío de correo desde servidor. Ficha: `docs/changes/2026-10-27-formulario-contacto.md`. Referencia de maqueta: `brief/structure.md:64` y `:71`; el diseño del formulario y sus estados **aún no existe** (bloqueante externo).

## Decisiones del usuario (2026-10-27)

- Formulario en diálogo (`UiDialog`) para todos los CTA y el botón flotante, más página `/contacto` con el mismo `ContactForm` como respaldo sin JS.
- Envío con Server Action y Resend; la clave solo en servidor. Excepción a "No hay API" aprobada y registrada en `docs/decisions.md`.
- **Versión 2 (2026-10-27, sustituye a la primera elección del usuario):** más sencilla y toda en planes gratuitos (Vercel Hobby, Resend free, Turnstile free).
- Resend **sin dominio propio**: remitente de pruebas de Resend (`onboarding@resend.dev`) y envío al correo de la cuenta de Resend del usuario. **A verificar al crear la cuenta de Resend:** que ese remitente solo pueda enviar a ese correo y cuál es el tope diario del plan gratuito (se recuerda 100 al día, no comprobado). El dominio ya no es requisito ni bloqueante; puede añadirse después cambiando `CONTACT_FROM_EMAIL`.
- Anti-spam: Turnstile verificado en servidor, honeypot, tiempo mínimo, Zod en servidor, longitudes máximas, texto plano y saneado de saltos de línea en cabeceras.
- **Sin Upstash:** no hay límite por IP ni tope diario propio. El tope real es el del plan gratuito de Resend (a verificar), sin costo posible. Si hay abuso, el límite por IP se añade después (ver `docs/decisions.md`).
- Se quita solo el número de WhatsApp; el correo público se mantiene.

## Decisiones del usuario (2026-10-28, tarea 79)

- **El motivo ya no existe.** Todo contacto es general: no hay select ni campo `topic`; quien escribe explica el motivo en el mensaje. `/contacto` no lleva parámetros (`?motivo=` desaparece) y `getContactHref()` devuelve siempre `/contacto`. Se eliminan `content/topics.ts`, las claves `topic`/`topics` del locale y la variante `select` de `UiField` (no tenía otro uso).
- **Endurecimiento de entradas** (ver «Seguridad de entrada»).

## Principio de confidencialidad

Las claves y destinos no se escriben en código, tests, locales ni docs. Todo valor secreto vive en variables de servidor sin `NEXT_PUBLIC_`. `config/.env.example` lleva solo nombres. Los tests usan valores ficticios definidos en el propio test.

## Variables

| Variable                         | Dónde    | Notas                                                                                              |
| -------------------------------- | -------- | -------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`                 | Servidor | Secreta                                                                                            |
| `CONTACT_TO_EMAIL`               | Servidor | Destino; con remitente de pruebas, el correo de la cuenta de Resend (a verificar); Zod `email`     |
| `CONTACT_FROM_EMAIL`             | Servidor | Remitente; por ahora el de pruebas de Resend; luego uno de un dominio verificado, sin tocar código |
| `TURNSTILE_SECRET_KEY`           | Servidor | Secreta                                                                                            |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Pública  | Pública por diseño de Turnstile                                                                    |

Implementación: se amplía `src/shared/utils/env-server.ts` (patrón del blog, `import "server-only"`, schema Zod propio). Las variables del contacto son **opcionales en build** (el build no falla sin ellas); si faltan en ejecución, la acción responde error genérico `unavailable` y no envía. `NEXT_PUBLIC_TURNSTILE_SITE_KEY` se añade al `env.ts` público como opcional; sin ella el formulario muestra el estado `unavailable` y no se pinta el widget.

## Entidades

`ContactMessage` (entrada validada, schema Zod único en `schemas/contact.schema.ts`, usado en cliente como UX y en servidor como autoridad):

| Campo            | Tipo   | Reglas                                                                                                                                                          |
| ---------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`           | string | requerido, limpieza previa, sin saltos de línea, trim, 2 a 80; solo letras y marcas Unicode, espacio, apóstrofo (`'` o `’`), guion y punto, empezando por letra |
| `email`          | string | requerido, limpieza previa, sin saltos de línea, trim, máx. 254, sin espacios, comillas, `` ` ``, `<`, `>`, `;`, `,` ni `\`, y `z.email`                        |
| `message`        | string | requerido, limpieza previa multilínea, trim, 10 a 2000 medidos tras limpiar                                                                                     |
| `website`        | string | honeypot: debe llegar vacío                                                                                                                                     |
| `startedAt`      | number | marca de tiempo del montaje del formulario; el servidor exige al menos 3 s y como máximo 2 h                                                                    |
| `turnstileToken` | string | requerido, limpieza previa, sin saltos de línea, máx. 2048                                                                                                      |

Claves del `FormData` aceptadas (lista cerrada): `name`, `email`, `message`, `website`, `startedAt`, `cf-turnstile-response`, `turnstileToken`. Cualquier otra (incluido un `topic` antiguo y las `$ACTION_*` del framework) se ignora.

`ContactResult` (respuesta de la acción): `{ status: "sent" | "invalid" | "challenge_failed" | "unavailable" }`; `invalid` puede incluir errores por campo con claves de locale. Nunca devuelve texto del proveedor ni detalle interno.

## API y datos

No hay API propia ni endpoints públicos documentados: una Server Action `sendContactMessage(formData)` o `sendContactMessage(state, formData)` con `useActionState`, en `src/modules/contact/actions/send-contact.ts` (`"use server"`).
Flujo en servidor, en este orden y cortando en el primer fallo:

1. Leer IP de `headers()` (`x-forwarded-for`, primer valor) solo para pasarla a Turnstile.
2. Leer el `FormData` con la lista cerrada de claves (`utils/form-data.ts`); un valor no textual (File/Blob) en una clave permitida → `invalid` (con error `invalid` en el campo si es de usuario) sin seguir.
3. Validar con el schema Zod (`safeParse`); si falta `startedAt` (envío sin JavaScript) → `unavailable`; honeypot lleno o tiempo fuera de rango → responder `sent` simulado sin enviar.
4. Verificar Turnstile contra `siteverify` con `TURNSTILE_SECRET_KEY` y la IP; fallo → `challenge_failed`.
5. Enviar con Resend: asunto y cuerpo **solo texto plano** (solo `text`, nunca `html`); cuerpo con etiquetas fijas (`Nombre:`, `Correo:`) y el mensaje limpio; el asunto es una constante fija, sin ningún dato del visitante; `replyTo` = correo limpio solo si vuelve a validar con el schema de correo y no contiene `\r` ni `\n` (si no, se omite).
6. Error del proveedor, incluido el tope gratuito de Resend agotado → `unavailable` (se registra en servidor sin datos personales).
   Servicios en `src/modules/contact/services/` (`resend.service.ts`, `turnstile.service.ts`), todos con `import "server-only"`. No hay DTO/adapter: las respuestas externas se reducen a booleanos o a un `status` propio. El componente no llama servicios; el hook `use-contact-form` invoca la acción.
   Orden previsto del módulo: types → schemas → locales → utils (puras: honeypot, tiempo, saneado) → services → action → hooks → components → view.

## Pantallas (bloqueadas por diseño)

- **Diálogo de contacto** (`ContactDialog`, `UiDialog`): se abre desde `AppHeader`, `AppMobileMenu`, `AppFloatingContact`, `ClosingSection`, `PortfolioAiShowcase`, `PurafruitView`. Contiene `ContactForm`.
- **Página `/contacto`** (`ContactView`): el mismo `ContactForm` en una página; sin JavaScript avisa de que el envío necesita JavaScript por Turnstile.
- **`ContactForm`**: campos nombre, correo y mensaje (sin motivo); widget Turnstile; honeypot oculto con `aria-hidden` y `tabIndex={-1}`; estados `idle`, `sending`, `sent`, `invalid`, `challenge_failed`, `unavailable`.
- **Imágenes de referencia:** ninguna todavía. El agente de diseño debe aportar: formulario en 1440 y 390 px, estados éxito/error/enviando/no disponible, vista de diálogo y vista de página. Hasta entonces las tareas de componentes visuales quedan bloqueadas.

## Inventario de componentes Ark

- Nuevo: `UiDialog` (wrapper de `@ark-ui/react/dialog`, patrón de `UiDrawer`, `data-surface` pasado al portal), `UiField` (campo con etiqueta, ayuda y error, sobre `field` de `ark.css`). Si faltan variantes de error/textarea en `ark.css`, las añade el agente de diseño.
- Reutiliza `siteConfig`, `next-intl`, tokens de `theme.css`.
- Nuevo `AppContactIcon` en `src/shared/components/app/` (sustituye a `AppWhatsAppIcon`, que se elimina).

## Rutas y permisos

- `src/app/(site)/contacto/page.tsx` delgada, pública, estática (la acción es lo dinámico); metadata propia; se añade al sitemap. Constante de ruta en `src/modules/contact/routes.ts`.
- `src/shared/utils/contact.ts`: `getContactHref()` devuelve siempre `/contacto` como enlace de respaldo (sin parámetros); con JS el CTA abre el diálogo (`ContactDialogTrigger`). Se elimina `isExternalContact` y todo `wa.me` y `mailto` con mensaje.
- `siteConfig.person.whatsapp` se elimina; el número no debe aparecer en el bundle ni en el HTML (`rg 51930724632 .next src test` sin resultados al cerrar).

## Seguridad de entrada (tarea 79)

- **SQL:** no hay base de datos ni consultas en este proyecto; la inyección SQL no aplica. Si algún día se guarda el mensaje, se usarán consultas parametrizadas.
- **Tamaño:** `experimental.serverActions.bodySizeLimit = "16kb"` en `next.config.ts` (única Server Action; por defecto 1 MB). Cubre el máximo legítimo (mensaje de 2000 caracteres hasta 4 bytes cada uno, token de 2048, cabeceras multipart).
- **Lista cerrada de claves** del `FormData` y rechazo de valores no textuales (ver «API y datos»).
- **Limpieza previa** (`utils/sanitize-input.ts`, puras, aplicadas por el schema antes de cualquier regla): se quitan controles C0 (U+0000–U+001F), DEL (U+007F) y C1 (U+0080–U+009F), formato bidi y de ancho cero (U+061C, U+200B–U+200F, U+202A–U+202E, U+2060–U+2064, U+2066–U+2069, U+FEFF, U+00AD, U+034F, U+115F, U+1160, U+3164, U+FFA0, U+180E) y separadores U+2028/U+2029; normalización NFC. Campos de una línea: se quitan tabuladores, los espacios Unicode pasan a espacio simple y se conservan `\r`/`\n` para que el schema rechace el valor (no se unen líneas). Mensaje: `\r\n` y `\r` pasan a `\n`, se conservan `\n` y `\t`, y las series de más de 2 saltos seguidos (incluidas líneas en blanco con espacios Unicode, p. ej. NBSP, o tabuladores) se colapsan a 2. Si un campo con contenido queda vacío tras limpiar → `invalid`.
- **Salida:** texto plano, asunto constante, `replyTo` revalidado (ver paso 5).

## Estado de cliente

Solo estado React local en `use-contact-form` (estado del envío, errores por campo, `startedAt`). El apertura del diálogo es estado local del trigger/`UiDialog`. Sin store ni TanStack Query.

## Textos

Solo en `src/modules/contact/locales/es.json`. **Copy definitivo pendiente del usuario**: las claves llevan el marcador `[PENDIENTE: copy del usuario]` seguido de una descripción de uso, sin redacción final. Los tres `contactMessage` actuales (shared, home 243, projects 104) se retiran de sus locales y su texto no se reutiliza hasta que el usuario decida si precarga el campo `message` (pregunta abierta).

## Reglas del proyecto afectadas

- `AGENTS.md`: línea "No hay API…" pasa a "Hay una única Server Action de contacto (Resend, Turnstile); no hay otra API, auth, store, TanStack Query ni MSW"; tabla "Dónde crear" con filas de `src/modules/contact/`; wrappers disponibles añade `UiDialog` y `UiField`.
- `docs/decisions.md`: excepción registrada (hecho en esta spec).
- `docs/modules/home.md:27` y `docs/proposal.md:71,212`: se actualizan en la tarea de limpieza.

## Criterios de aceptación

1. Ningún CTA ni el botón flotante apuntan a `wa.me` ni a `mailto` con mensaje; el número de WhatsApp no aparece en `src`, `test`, `.next` ni en el HTML servido.
2. En 1440 y 390 px, cada CTA abre el diálogo con foco en el primer campo, `Esc` y el botón cerrar lo cierran y el foco vuelve al disparador; el diálogo hereda `data-surface`.
3. Sin JavaScript, el CTA lleva a `/contacto`, que avisa de que el envío necesita JavaScript (Turnstile).
4. Envío válido: estado de éxito; llega un correo de texto plano a `CONTACT_TO_EMAIL` con `replyTo` del visitante.
5. Si Resend rechaza el envío (por ejemplo, tope gratuito agotado): `unavailable`, sin detalle del proveedor.
   5b. **Prueba con envío real (al crear la cuenta de Resend):** con `CONTACT_FROM_EMAIL` de pruebas, un envío al correo de la cuenta de Resend llega; un envío a otro destinatario se rechaza o se confirma que está permitido. El resultado se anota en esta spec y en `docs/decisions.md`; si el supuesto es falso, se ajusta `CONTACT_TO_EMAIL` o se pide el dominio.
6. Honeypot lleno, envío en menos de 3 s, token Turnstile inválido o ausente: no se envía correo (honeypot/tiempo responden éxito simulado; Turnstile responde `challenge_failed`).
7. Nombre o correo con `\r` o `\n`, mensaje de más de 2000 caracteres o campo vacío: `invalid` desde el servidor aunque se salte la validación del cliente.
   7b. Sin motivo: el formulario no tiene select; `/contacto` y todos los enlaces de respaldo no llevan parámetros; un `topic` enviado a mano se ignora.
   7c. Endurecimiento: File/Blob en un campo → `invalid`; claves extra ignoradas; caracteres de control y bidi/ancho cero eliminados antes de validar (campo que queda vacío → `invalid`); nombre con dígitos o símbolos (`<script>`, `{}`, `;`, `` ` ``, `\`) → `invalid`; 20 saltos seguidos llegan como 2; peticiones de más de 16 KB las rechaza el framework.
8. Un mensaje con HTML no se interpreta: llega como texto.
9. `pnpm build` en verde sin las variables del contacto; ninguna clave secreta aparece en `.next/static`.
10. Con movimiento reducido el diálogo no anima de forma obligatoria (sin animación nueva; solo transiciones simples).
11. Los estados éxito/error/enviando/no disponible miden y se ven igual que la maqueta aprobada (cuando exista).
12. `pnpm typecheck`, `pnpm lint`, `pnpm build` y `pnpm test` en verde; rutas existentes siguen estáticas con `cacheComponents`.

## Preguntas abiertas

1. Cuentas de Resend y Turnstile (pendiente del usuario; bloquea las pruebas de envío real, no el código). El dominio ya no es necesario.
2. Diseño del formulario y de sus estados (bloquea componentes visuales).
3. Copy definitivo del formulario (marcadores hasta entonces).
4. ~~El motivo solo preselecciona `topic`~~: sustituida el 2026-10-28; el motivo ya no existe (tarea 79).
5. Aviso corto de privacidad bajo el formulario (texto con marcador, del usuario). Confirmado por el usuario (2026-10-27).
6. A verificar al crear la cuenta de Resend: restricción del remitente de pruebas al correo de la cuenta y tope diario del plan gratuito.
