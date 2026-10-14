# Studio de iamhenry

Sanity Studio independiente (no forma parte del workspace de la web).

## Variables

Copia `.env.example` a `.env` y rellena los valores (no se versionan):

- `SANITY_STUDIO_PROJECT_ID`
- `SANITY_STUDIO_DATASET`
- `SANITY_STUDIO_HOSTNAME` (subdominio de `*.sanity.studio`)

## Uso

Requiere Node 22.12 o superior (Node 20 falla por los `engines` de Sanity). Con nvm: `nvm use 22`.

```bash
nvm use 22
pnpm install --ignore-workspace
pnpm dev   # http://localhost:3333
```

## Publicar (lo haces tú en tu navegador)

```bash
pnpm exec sanity login
pnpm run deploy   # elige el subdominio cuando lo pida
```
