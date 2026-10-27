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

## Commands

Run from the repo root.

| Command           | What it does                                |
| ----------------- | ------------------------------------------- |
| `npm install`     | Installs every workspace                    |
| `npm run dev:web` | Starts the web app on http://localhost:5173 |
| `npm run check`   | Runs the format check, lint and type check  |
| `npm run build`   | Builds every workspace                      |

API, migration, test and backup commands are added here as they land.

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
- Every API call from the web app goes through `src/lib/api.ts`.
- Server data in the web app uses TanStack Query, not `useEffect` fetching.
- Every API route validates its input with zod.
- Database access is plain SQL through `pg` with parameters (`$1`, `$2`). Never build SQL by joining strings. No ORM.
- Schema changes only through a new numbered migration. Never edit a migration that has already run.
- The API never sends email directly. It writes to the `messages` outbox, and the worker sends.

### Safety

- Never commit `.env` files, secrets or database backups.
- Never log passwords, session ids or full request bodies.

### Process

- Add a line under `## [Unreleased]` in `CHANGELOG.md` for every user-visible change.
- A new architectural decision gets a new file in `docs/decisions/` (copy `0000-template.md`). Never edit an accepted decision: write a new one that supersedes it.
- If a change alters the scope, update `docs/PLAN.md` in the same commit.
- Commit messages follow Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `test:`, `refactor:`.

### Ask first

Ask the maintainer before:

- deleting or renaming files
- installing new dependencies
- running migrations against any database that isn't local
- any git commit, push, rebase or branch change
