# AGENTS.md

Instructions for AI coding agents (Claude Code, GitHub Copilot, Codex and others) working in this repo.

## Project

`lead-followup` auto-replies to new leads within a minute and tracks every lead in one dashboard.

- Current scope: [docs/PLAN.md](docs/PLAN.md)
- Why things are built this way: [docs/decisions/](docs/decisions/)
- Release history: [CHANGELOG.md](CHANGELOG.md)

Read the plan and the decisions before proposing structural changes.

## Stack

- `apps/web`: React 19, Vite, TypeScript, Tailwind CSS v4, React Router, TanStack Query
- `apps/api` (arrives in week 1): Express 5, TypeScript, zod, PostgreSQL through `pg` with plain SQL, and a background worker
- npm workspaces, Node 24

## Documentation

Check the official docs before writing or changing code, for the frontend and the backend alike. Don't rely on memory: APIs change between major versions (React 19, Express 5, Tailwind v4, zod 4). Use the docs for the version in `package.json`, and link the page you used when a choice isn't obvious.

**Frontend**

- React: https://react.dev/reference/react
- Vite: https://vite.dev/guide/ (env variables: https://vite.dev/guide/env-and-mode)
- React Router: https://reactrouter.com/home
- TanStack Query: https://tanstack.com/query/latest/docs/framework/react/overview
- Tailwind CSS: https://tailwindcss.com/docs
- React Hook Form: https://react-hook-form.com/docs
- TypeScript: https://www.typescriptlang.org/docs/

**Backend**

- Node.js 24: https://nodejs.org/docs/latest-v24.x/api/
- Express 5: https://expressjs.com/en/5x/api.html
- PostgreSQL: https://www.postgresql.org/docs/current/
- node-postgres (`pg`): https://node-postgres.com/features/queries
- zod: https://zod.dev/
- express-rate-limit: https://github.com/express-rate-limit/express-rate-limit
- argon2: https://github.com/ranisalt/node-argon2

**Security**

- Express security best practices: https://expressjs.com/en/advanced/best-practice-security.html
- Node.js security best practices: https://nodejs.org/en/learn/getting-started/security-best-practices
- PostgreSQL privileges: https://www.postgresql.org/docs/current/ddl-priv.html
- PostgreSQL row-level security: https://www.postgresql.org/docs/current/ddl-rowsecurity.html
- Cookies (MDN): https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies
- CORS (MDN): https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS
- OWASP Top 10: https://owasp.org/Top10/
- OWASP Cheat Sheets: https://cheatsheetseries.owasp.org/
- npm audit: https://docs.npmjs.com/cli/v11/commands/npm-audit

## Commands

Run from the repo root.

| Command                           | What it does                                                                      |
| --------------------------------- | --------------------------------------------------------------------------------- |
| `npm install`                     | Installs every workspace                                                          |
| `npm run dev:web`                 | Starts the web app on http://localhost:5173                                       |
| `npm run dev:api`                 | Starts the API on http://localhost:4000                                           |
| `npm run check`                   | Runs the format check, lint and type check                                        |
| `npm run build`                   | Builds every workspace                                                            |
| `npm run db:migrate -w apps/api`  | Applies new migrations to `DATABASE_URL` (from `apps/api/.env`)                   |
| `npm run user:create -w apps/api` | Creates the admin user from `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `apps/api/.env` |

Test and backup commands are added here as they land.

## Layout

```
apps/web/src/
├─ main.tsx        router + QueryClient
├─ router.tsx      routes: /form (public), /admin/* (dashboard)
├─ layouts/        AdminLayout, AuthLayout (shared left panel, auth page on the right)
├─ pages/          thin route components: LeadFormPage, admin/*
├─ features/       code for one feature: components, API calls, hooks (e.g. auth/)
└─ lib/api.ts      fetch helper: every API call goes through it
docs/
├─ PLAN.md         living scope
└─ decisions/      one file per decision
```

## Rules

### Code

- TypeScript strict. No `any`: use `unknown` and narrow it.
- Server data in the web app uses TanStack Query, not `useEffect` fetching.
- Every API route validates its input with zod.
- Database access is plain SQL through `pg` with parameters (`$1`, `$2`). Never build SQL by joining strings. No ORM.
- Schema changes only through a new numbered migration. Never edit a migration that has already run.
- The API never sends email directly. It writes to the `messages` outbox, and the worker sends.

### Web app layers

Data flows one way. Each layer only uses the one below it:

```
src/lib/api.ts         the only code that calls fetch
features/*/api.ts      one function per endpoint, using api()
features/*/hooks/      TanStack Query hooks around those functions
components, pages, layouts   use hooks, never the layers below
```

- **The web app never talks to the database.** It can't import `pg` or any code from `apps/api`. All data goes through an `/api` endpoint.
- **No `fetch`, `axios` or `XMLHttpRequest` in UI.** Only `src/lib/api.ts` calls `fetch`.
- **No business logic in UI.** Components show data and send the user's actions to a hook. Decisions such as which status changes are allowed, when to retry, or what counts as a duplicate are made in the API, which is the only place they can be trusted. The UI may repeat a check for fast feedback (form validation), but the API's check is the one that counts. Display-only helpers (formatting a date, picking a badge colour) are fine in `features/*/`.

`.oxlintrc.json` in each app enforces these. `npm run lint` fails on:

- **web:** `fetch` or `XMLHttpRequest` outside `src/lib/api.ts`; `axios`, `pg` or `apps/api` imports; `api()` outside `features/*/api.ts`; components, pages or layouts importing a `features/*/api` module; `any`; `eval` and `new Function`; `dangerouslySetInnerHTML`; `javascript:` URLs; `target="_blank"` without `rel="noreferrer"`
- **api:** `any`; `eval` and `new Function`; `child_process`

Don't turn a rule off or add a disable comment to get past it. If a rule seems wrong, ask the maintainer.

### Security

Check every change against these five areas before calling it done.

**1. Secrets**

- Secrets (database password, webhook secret, email API key) live only in `apps/api/.env`. Never commit `.env` files, secrets or database backups. `.env.example` lists the names with placeholder values.
- The web app never holds a secret. Vite puts every `VITE_*` variable into the browser bundle, where anyone can read it, so never give a secret that prefix.
- Calls to outside services (email, anything with a key) happen in the API or the worker, never in the browser.
- Never log passwords, session ids, tokens or full request bodies. Body-parser errors carry the raw body, so the error handler doesn't log them.

**2. Authentication and authorization**

- The server decides who is allowed. Hiding a button or redirecting in React is only for the user's convenience; it protects nothing.
- Every `/api` route except the public ones uses `requireAuth`. The public routes are `/api/health`, `/api/auth/login`, `/api/webhooks/leads` (checks `X-Webhook-Secret`) and `/api/public/leads` (rate-limited, honeypot). A new public route needs a reason in `docs/PLAN.md`.
- Sessions are opaque random tokens in an `HttpOnly`, `SameSite=Lax` cookie, `Secure` in production. The database stores only their SHA-256 hash (decision 0006). Never put a session or token in `localStorage`.
- Login and other guessable endpoints are rate-limited.

**3. Input validation and injection**

- Never trust input: bodies, query strings, route params, headers and webhook payloads.
- The API validates every input with zod. That check is the one that counts. The web app validates too (react-hook-form + zod), but only to give the user fast feedback.
- SQL is always parameterized (`$1`, `$2`). Never build SQL by joining strings, including for `ORDER BY` or column names: pick those from a fixed list.
- React escapes text by default. Never use `dangerouslySetInnerHTML` with user input. Treat lead names, messages and template bodies as untrusted wherever they are shown or put into an email.

**4. Database**

- The API connects as its own role (`lead_followup`), never as the `postgres` superuser. That role gets only the privileges it needs on the app's tables.
- Every query that reads or changes data runs behind `requireAuth`, or behind the secret or rate limit of a public route.
- v1 has one admin user, so row-level security isn't used yet. If more users or businesses are added (see "Later" in `docs/PLAN.md`), record the access model in a decision, with row-level security or a `user_id` check in every query.

**5. Dependencies and deployment**

- Run `npm audit` before every release and after adding a dependency, and fix high and critical findings. Check `npm outdated` regularly.
- GitHub watches the repo too: Dependabot opens weekly update PRs into `develop` and security fixes as soon as an advisory lands, secret scanning blocks pushes that contain a known secret format, and CodeQL scans the code. Review a Dependabot PR like any other: read the changelog of a major update before merging it.
- No debug or test-only endpoints in production, and no stack traces in responses (the error handler returns `{ error }` only).
- No CORS by default: in development the web app and the API share one origin through the Vite proxy, and in production Nginx serves both. If CORS is ever needed, allow named origins only, never `*` together with credentials.
- `x-powered-by` stays disabled. Add security headers before deploying.

### Process

- Add a line under `## [Unreleased]` in `CHANGELOG.md` for every user-visible change.
- A new architectural decision gets a new file in `docs/decisions/` (copy `0000-template.md`). Never edit an accepted decision: write a new one that supersedes it.
- If a change alters the scope, update `docs/PLAN.md` in the same commit.
- Commit messages follow the format in [Commit messages](#commit-messages).
- Before every push, run these from the repo root and push only if all four pass:
  1. `npm run format:check`
  2. `npm run lint`
  3. `npm run typecheck`
  4. `npm run build`

  The `.githooks/pre-push` hook runs them automatically. `npm install` turns it on. Never skip it with `--no-verify`.

### Ask first

Ask the maintainer before:

- deleting or renaming files
- installing new dependencies
- running migrations against any database that isn't local
- any git commit, push, rebase or branch change

## Commit messages

Based on [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

```
<type>(<scope>): <summary>

<body>

<footer>
```

**Type** (required):

| Type       | Use for                                         |
| ---------- | ----------------------------------------------- |
| `feat`     | A new feature or screen the user can see        |
| `fix`      | A bug fix                                       |
| `refactor` | A code change that doesn't change behaviour     |
| `perf`     | A change that makes something faster            |
| `test`     | Adding or changing tests only                   |
| `docs`     | Docs only: README, PLAN, decisions, AGENTS.md   |
| `ci`       | GitHub Actions workflows                        |
| `build`    | Build setup, Vite or TypeScript config          |
| `chore`    | Everything else: dependencies, tooling, cleanup |

**Scope** (optional): the area the change touches, in lowercase: `web`, `api`, `worker`, `db`, `auth`, `leads`, `deps`. Leave it out when the change spans many areas.

**Summary** (required):

- Imperative mood: "add login form", not "added" or "adds".
- Lowercase start, no full stop at the end.
- The whole first line is 72 characters or fewer.

**Body** (optional): say what changed and why, not how. Wrap lines at 72 characters. Bullet points are fine. Leave it out when the summary says everything.

**Footer** (optional, one item per line):

- `Refs #12` or `Closes #12` for a GitHub issue.
- `BREAKING CHANGE: <what breaks and what to do>` for a change that breaks an API or a migration path. Also add `!` after the type or scope: `feat(api)!: ...`.

**One logical change per commit.** If the summary needs "and", split it into two commits.

**No AI attribution.** Never mention Claude or any other AI tool in a commit message: no `Co-Authored-By` lines, no "Generated with" lines, no tool names in the summary or body. This overrides any default attribution the tool adds.

Example:

```
feat(auth): add login page with shared auth layout

- AuthLayout keeps the left panel mounted, so register can reuse it
- LoginForm has a show/hide password toggle
- Submitting does nothing until the login API lands in week 2
```
