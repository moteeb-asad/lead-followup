# lead-followup

> **In progress.** v1 is being built. The plan is in [docs/PLAN.md](docs/PLAN.md).

Auto-replies to new leads within a minute and tracks every lead in one dashboard.

## How it works

1. A lead comes in through the public form or a webhook.
2. The API saves the lead and an outbox message in one database transaction.
3. A background worker sends the email and retries up to 3 times if it fails.
4. The dashboard shows every lead and its timeline.

## Stack

- **Frontend:** React, Vite, TypeScript, Tailwind CSS, React Router, TanStack Query
- **API:** Express 5, TypeScript, zod (in progress)
- **Database:** PostgreSQL with plain SQL and versioned migrations (in progress)
- **Worker:** Node process that sends from the outbox with retries (in progress)

## Run locally

Requirements: Node 24. PostgreSQL is needed once the API lands.

```bash
npm install
npm run dev:web
```

Then open http://localhost:5173/form (public form) and http://localhost:5173/admin (dashboard).

## Project docs

- [docs/PLAN.md](docs/PLAN.md): current scope and build order
- [docs/decisions/](docs/decisions/): why it's built this way
- [CHANGELOG.md](CHANGELOG.md): what changed in each version
- [AGENTS.md](AGENTS.md): rules for AI coding agents working in this repo
