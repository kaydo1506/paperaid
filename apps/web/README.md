# @paperaid/web

The Paperaid web app: React Router 7 in framework mode, part of the [Paperaid](../../README.md) monorepo.

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

Run these from the repo root (this is a pnpm workspace):

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm --filter @paperaid/web dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

```bash
pnpm --filter @paperaid/web build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `pnpm --filter @paperaid/web build`

```
├── package.json
├── pnpm-lock.yaml
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

[Tailwind CSS](https://tailwindcss.com/) is configured, with the dark/light theme variant driven by `@paperaid/ui-tokens` (see `app/theme/`).
