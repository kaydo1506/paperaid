# Paperaid

Paperaid turns German bureaucracy into clear, calm, step-by-step guides for immigrants. Domain and trademark research are on hold until the idea proves itself — see `docs/project-reference.md`.

## Status

Milestone 1 setup in progress. See `docs/project-reference.md` for full scope, tech stack, roadmap and decision log.

## Monorepo

pnpm workspaces + Turborepo, Node 24 LTS.

```
paperaid/
  apps/                 web, mobile, api (added as they're built)
  packages/
    app-config/         shared display name, app ID, URL scheme
    typescript-config/  shared tsconfig base
```

## Getting started

```
nvm use
corepack enable
pnpm install
```
