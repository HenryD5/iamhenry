# Decisiones de arquitectura

## Excepciones del blog

- **Sin `shared/http-client`:** `next-sanity` es el cliente de acceso a la fuente editorial y evita una abstracción HTTP duplicada.
- **Sin TanStack Query:** todo el blog se resuelve en Server Components durante la generación estática, por lo que no existe estado remoto en el cliente.
- **Sin MSW:** los tests usan fixtures y simulan el cliente de Sanity; no necesitan interceptar peticiones HTTP.
- **Variables solo de servidor:** la web usa `SANITY_PROJECT_ID`, `SANITY_DATASET` y `SANITY_API_VERSION` sin el prefijo `NEXT_PUBLIC_` para que sus valores no se incluyan en el bundle del navegador.
- **Proxy de imágenes en `/blog/media/[assetId]`:** el HTML público referencia una ruta local y no expone el origen de Sanity; el proxy valida el identificador y obtiene la imagen en el servidor.
- **Studio separado en `studio/`:** es un proyecto pnpm independiente, fuera del TypeScript, ESLint, Prettier y tests de la web, porque tiene su propio ciclo de desarrollo y no sigue las convenciones de Ark UI ni Tailwind del sitio.
