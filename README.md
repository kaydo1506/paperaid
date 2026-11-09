# Paperaid

Paperaid is a web and mobile app that turns German bureaucracy into clear, step-by-step guides for immigrants, starting with Berlin. It's also a growing full-stack project: frontend, mobile, backend, CI/CD and LLM integration, with a retrieval-augmented generation (RAG) assistant planned on top of the guides. Domain and trademark research are on hold until the idea proves itself; see `docs/project-reference.md`.

## Status

Milestone 1 setup in progress. See `docs/project-reference.md` for full scope, tech stack, roadmap and decision log.

## Monorepo

pnpm workspaces + Turborepo, Node 24 LTS.

```
paperaid/
  apps/
    web/                 React Router 7 web app
    mobile/, api/        added as they're built
  packages/
    app-config/          shared display name, app ID, URL scheme
    content/             guides + Zod schemas
    typescript-config/   shared tsconfig base
    ui-tokens/           theme tokens + logic (seed of future design tokens)
```

## Getting started

```
nvm use
corepack enable
pnpm install
```
