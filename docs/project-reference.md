# Paperaid — Project Reference

Sep 30, 2026 · @Rachael

## About the project

Paperaid is a web and mobile app that turns German bureaucracy into clear, calm, step-by-step guides for immigrants. It is also my learning project across frontend, mobile, backend, infrastructure and CI/CD, and I may open source it.

**Name:** Paperaid. I will hold off on buying domains or filing a trademark until the idea and the learning project prove themselves. When I do: paperaid.de first, maybe .app, and skip .com for now. Before spending on branding, I will search DPMAregister and TMview in classes 9 and 42.

**Mission:** Make German bureaucracy understandable for immigrants. Take official information that is scattered, dense and often only in German, and turn it into guides that feel calm to use.

**Vision:** A trusted companion for the whole immigrant journey in Germany, from the visa and first Anmeldung, through the Blue Card, to permanent residence and citizenship. It starts with one community (Nigerians moving to Germany) and grows to work for any nationality.

## Milestone 1 scope

Milestone 1 is content-first: a beautiful, easy UI over official information, with no accounts and no server-side user data.

- **Process library.** Guides for Anmeldung, Rundfunkbeitrag, Blue Card, passport renewal at your embassy and permanent residence. Each has steps, required documents, costs, timelines and where to go.
- **"What do I need?" questionnaire.** A few questions, then the processes that apply to you. The questions are defined as data so web and mobile can share them.
- **Interactive checklists.** Progress is saved on the device only.
- **Printable checklist.** Download a PDF of your documents to bring to an appointment.
- **Languages.** English and German from day one, with room for more.
- **Trust signals.** Every guide links to the official source and shows a "last checked" date.

## Guiding principles

- **One city first.** Rules differ between Ausländerbehörden. Start with Berlin, then expand.
- **Content is the product.** The UI is the wrapper. Accurate, well-structured content is what earns trust.
- **Not legal advice.** Say so clearly, and always point to the official source.
- **Respect the source.** Check the reuse terms of the portals I draw from. Write guides in my own words, not copied text.
- **Privacy by default.** Immigration data is sensitive. Store nothing on a server in Milestone 1, and host in the EU when I do.
- **Calm, not overwhelming.** Show one step at a time. Plain language. Accessible for everyone.

## Tech stack

TypeScript everywhere. "Carries over" means I use it today; "Swap" replaces something I use today; "New" is growth.

| Area               | Tool                                                          | Status                    | Why                                                          |
| ------------------ | ------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------ |
| Language           | TypeScript                                                    | Carries over              | One language across web, mobile, API and content             |
| Web framework      | React Router 7, framework mode, on Vite                       | Swap (from SPA mode)      | Prerendered pages for SEO; teaches SSR, loaders, actions     |
| React              | React 19                                                      | Swap (from 18)            | Required by Expo; keep web and mobile aligned                |
| Mobile             | Expo, React Native, Expo Router, EAS                          | New                       | Reuses React skills; one team, two platforms                 |
| Styling            | Tailwind (web), NativeWind (mobile), shared design tokens     | Carries over              | Same styling model on both platforms                         |
| Components         | Radix primitives, shadcn/ui style                             | Swap (from MUI + Emotion) | MUI doesn't run on React Native and looks like an admin tool |
| Icons              | lucide-react, lucide-react-native                             | Carries over              | Matching icons on both platforms                             |
| Motion             | Framer Motion (web), Reanimated (mobile)                      | New                       | Calm, guided transitions                                     |
| Illustrations      | Rive                                                          | New                       | Friendly animated guides                                     |
| Server state       | TanStack Query                                                | Swap (from Redux Toolkit) | Works on both platforms; common in job ads                   |
| Local state        | Zustand, persisted on device                                  | Swap (from Redux Toolkit) | Small and simple for checklist progress                      |
| Validation         | Zod                                                           | Swap (from ajv)           | Content schemas and forms; can output JSON Schema            |
| Content            | MDX/YAML in the repo, parsed with remark/rehype at build time | Carries over              | Guides reviewed like code via pull requests                  |
| i18n               | i18next                                                       | New                       | Works on web and mobile                                      |
| Search             | Orama                                                         | New                       | In-app search with no server                                 |
| Dates              | date-fns                                                      | Carries over              | Deadlines like "register within 14 days"                     |
| PDF                | @react-pdf/renderer (web), expo-print (mobile)                | Carries over              | Printable document checklists                                |
| API mocking        | msw                                                           | Carries over              | Build UI before the API exists                               |
| API (from M2)      | Hono + typed client                                           | New (replaces axios)      | Small API with end-to-end types                              |
| Database (from M2) | PostgreSQL + Drizzle, Neon or Supabase in the EU              | New                       | Learn real SQL; GDPR-friendly hosting                        |
| Auth (from M2)     | Better Auth or Supabase Auth                                  | New                       | Accounts and synced progress                                 |
| Push (from M2)     | Expo Push Notifications                                       | New                       | Reminders, like permit expiry                                |
| Web hosting        | Vercel or Cloudflare Pages                                    | New                       | Preview link on every PR                                     |
| API hosting        | Docker on Hetzner                                             | New                       | Real infra learning; German, cheap                           |
| Monitoring         | Sentry; Plausible or PostHog (EU)                             | New                       | Errors and privacy-friendly analytics                        |
| Design             | Figma                                                         | —                         | Tokens can sync into code                                    |

**Not needed for Milestone 1:** ECharts, Tiptap, TanStack Table, dnd-kit, tus-js-client, react-joyride. On mobile, simple onboarding screens replace a product tour.

**Watch:** check which Tailwind version NativeWind supports before upgrading from v3. Next.js is a fair alternative to React Router if job-market signal matters more.

## Repo structure

One monorepo using Turborepo and pnpm workspaces, on Node 24 LTS. Package scope is `@paperaid/*`.

```
paperaid/
  apps/
    web/                 React Router 7 (framework mode)
    mobile/              Expo (later)
    api/                 Hono (Milestone 2)
  packages/
    typescript-config/   shared tsconfig (base.json)
    content/             guides + Zod schemas
    ui-tokens/           shared design tokens (later)
    eslint-config/       shared lint rules (later)
  .github/workflows/     CI
  .husky/                git hooks
  package.json
  pnpm-workspace.yaml
  turbo.json
```

**Renaming later:** keep the display name, app ID and URL scheme in one shared config file. The Expo bundle ID (for example `com.yourname.paperaid`) cannot change after the first store release, so settle it before then.

**Mobile note:** React Native in a pnpm monorepo may need `node-linker=hoisted` in `.npmrc`. Check the current Expo monorepo docs when adding `apps/mobile`.

## Git workflow

Every change goes through a short-lived branch and a pull request, even when working alone.

- **Branches.** Branch off `main`, keep branches small, squash-merge back.
- **Commit messages.** Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`. Example: `feat: add guide schema`. Enforced by commitlint.
- **Pre-commit hook.** Husky runs lint-staged, which formats changed files with Prettier.
- **Versioning.** Changesets for versions and changelogs.
- **Branch protection.** `main` requires a pull request and a passing `check` job.
- **Dependencies.** Renovate opens update PRs automatically.
- **Lockfile.** Always commit `pnpm-lock.yaml`. CI installs with `--frozen-lockfile`.

## CI/CD

GitHub Actions runs checks on every pull request and push to `main`. Turborepo caches results so unchanged packages are skipped.

| When                             | What runs                                                           |
| -------------------------------- | ------------------------------------------------------------------- |
| Every PR and push to `main`      | Install (frozen lockfile), then lint, typecheck, test, build        |
| Every PR                         | Content check: every guide validated against its Zod schema         |
| Every PR                         | Web preview deploy (Vercel or Cloudflare Pages)                     |
| Every PR, once mobile exists     | EAS preview build                                                   |
| Merge to `main`                  | Web goes live                                                       |
| Version tag                      | Mobile store release via EAS Submit; quick fixes via EAS Update     |
| Merge to `main`, once API exists | Build Docker image, deploy API to Hetzner                           |
| Weekly schedule                  | Link checker on every official source URL, to catch outdated guides |

The current workflow lives in `.github/workflows/ci.yml` and uses `actions/checkout`, `pnpm/action-setup` (reads the pnpm version from `packageManager`) and `actions/setup-node` (reads `.nvmrc`).

## Testing and quality

| Layer                   | Web and shared packages  | Mobile                                          |
| ----------------------- | ------------------------ | ----------------------------------------------- |
| Unit and component      | Vitest + Testing Library | Jest (jest-expo) + React Native Testing Library |
| End-to-end              | Playwright               | Maestro                                         |
| Components in isolation | Storybook                | Storybook for React Native (optional)           |
| Accessibility           | axe                      | Manual checks with VoiceOver and TalkBack       |
| API mocking             | msw                      | msw                                             |
| Errors in production    | Sentry                   | Sentry                                          |

Accessibility matters a lot for this audience: many users read in a second language, some on older phones.

## Open source readiness

- [ ] Choose a license: MIT (simple, permissive) or AGPL (stops closed hosted copies)
- [ ] README: what it is, screenshots, how to run it
- [ ] CONTRIBUTING: setup, commit style, how to fix a guide
- [ ] Code of conduct
- [ ] Issue and PR templates, including an "outdated information" issue type
- [ ] SECURITY.md: how to report a vulnerability
- [ ] Not-legal-advice disclaimer in the README and in the app
- [ ] CODEOWNERS for content, so guide changes get reviewed

## Roadmap and next steps

New tools come in one at a time: web first on familiar ground, then mobile, then the backend.

**Milestone 1 setup**

- [x] Monorepo: pnpm workspaces, Turborepo, shared TypeScript config
- [x] Web app: React Router 7 in `apps/web`
- [x] Content package with the first guide schema
- [x] Git hooks: Husky, lint-staged, commitlint
- [x] First CI run on `main` ([CI workflow](../.github/workflows/ci.yml): install, lint, typecheck, test, build)
- [ ] Branch protection on `main` — blocked: GitHub only allows this on private repos with a paid plan; revisit after upgrading or open-sourcing
- [ ] Shared ESLint config package
- [ ] Design tokens package
- [ ] Mobile app: Expo in `apps/mobile`
- [ ] Write the first Berlin guides
- [ ] i18n (English, German) and search
- [ ] API skeleton in `apps/api`, near the end of Milestone 1

**Milestone 2 ideas**

- Accounts and synced progress
- Reminders, like residence permit expiry
- More cities and more languages

## Decision log

Add a row whenever I make a choice I might question later. Newest first.

| Date       | Decision                              | Why                                                                                                                            |
| ---------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| 2026-10-02 | Name the app "Paperaid"               | Clear, says what it does, and works for everyone, not just immigrants. Domains and trademark wait until the idea proves itself |
| 2026-09-30 | Monorepo with Turborepo + pnpm        | Share types, content and tokens across web, mobile and API                                                                     |
| 2026-09-30 | React Router 7 framework mode for web | Builds on what I know; adds SSR and prerendering for SEO                                                                       |
| 2026-09-30 | Expo for mobile                       | Reuses React skills; strong tooling for builds and updates                                                                     |
| 2026-09-30 | Drop MUI for Radix + Tailwind         | MUI doesn't run on React Native; want a calmer, custom look                                                                    |
| 2026-09-30 | Content in the repo, not a CMS        | Open-source friendly; guides reviewed like code                                                                                |
| 2026-09-30 | No backend in Milestone 1             | Not needed yet; keeps launch simple and private                                                                                |
| 2026-09-30 | Start with Berlin and Nigerian users  | Rules vary by city; build for a community I know first                                                                         |
