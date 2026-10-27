# Lead Follow-up: plan

Last updated: 2026-10-27. This is the living scope: edit it when the scope changes. The reasons behind each choice are in [decisions/](decisions/).

## Goal

A small app that replies to new leads automatically and shows each lead's history in one dashboard. It is built in public around an Express API, a PostgreSQL schema and a background worker.

- **Who it is for:** a small service business (plumber, salon, agency) that loses leads by replying late.
- **What v1 must do:** take in a lead, send an auto-reply email within a minute, and show the lead and its timeline.

## How one lead flows

1. A lead arrives from the public form (`/form`) or a webhook from another tool.
2. The API saves the lead, an outbox row in `messages` and an activity row in **one transaction**.
3. Every 5 seconds the worker claims due messages with `FOR UPDATE SKIP LOCKED` and sends them.
4. Sent: status `sent` plus an activity row. Failed: retried after 1 minute, then 5. After the 3rd failure it is marked `failed`.
5. The dashboard reads leads and `activity_log`, so every step shows on the lead's timeline.

## Stack

| Layer    | Choice                                                                |
| -------- | --------------------------------------------------------------------- |
| Frontend | React + Vite + TypeScript, Tailwind CSS, React Router, TanStack Query |
| API      | Express 5 + TypeScript, zod                                           |
| Database | PostgreSQL with `pg`, plain SQL, numbered migrations                  |
| Worker   | `apps/api/src/worker.ts`, same codebase, its own process              |
| Email    | Resend, test mode first                                               |
| Tests    | Vitest + supertest                                                    |
| Repo     | npm workspaces: `apps/web`, `apps/api`                                |

## Database tables (v1)

| Table          | Key columns                                                                                                                                                      | Notes                                                                              |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `users`        | id, email, password_hash, created_at                                                                                                                             | One admin login in v1                                                              |
| `sessions`     | id, user_id, expires_at                                                                                                                                          | The httpOnly cookie holds the session id                                           |
| `leads`        | id, name, email, phone, service, message, source (form, webhook), external_id, status (new, contacted, won, lost), created_at                                    | Unique on (source, external_id), so a retried webhook doesn't create a second lead |
| `templates`    | id, name, subject, body                                                                                                                                          | Body uses `{name}` and `{service}` placeholders                                    |
| `automations`  | id, trigger, delay_days, template_id, active                                                                                                                     | One rule in v1: new lead → send template                                           |
| `messages`     | id, lead_id, template_id, channel, to_address, subject, body, status (queued, sending, sent, failed), attempts, next_attempt_at, last_error, sent_at, created_at | The outbox the worker reads                                                        |
| `activity_log` | id, lead_id, type, details (jsonb), created_at                                                                                                                   | Feeds the lead timeline                                                            |

## API routes (v1)

| Method           | Route                     | What it does                                 | Access                         |
| ---------------- | ------------------------- | -------------------------------------------- | ------------------------------ |
| POST             | `/api/public/leads`       | Lead from the public form                    | Public, rate limited, honeypot |
| POST             | `/api/webhooks/leads`     | Lead from another tool's server              | `X-Webhook-Secret` header      |
| POST             | `/api/auth/login`         | Checks the password, sets the session cookie | Public                         |
| POST             | `/api/auth/logout`        | Ends the session                             | Logged in                      |
| GET              | `/api/me`                 | Current user                                 | Logged in                      |
| GET              | `/api/leads`              | Leads, filtered by status and source, paged  | Logged in                      |
| GET              | `/api/leads/:id`          | One lead with its timeline                   | Logged in                      |
| PATCH            | `/api/leads/:id`          | Changes the status                           | Logged in                      |
| POST             | `/api/leads/:id/messages` | Queues a manual reply                        | Logged in                      |
| GET, POST, PATCH | `/api/templates`          | Templates                                    | Logged in                      |
| GET, PATCH       | `/api/automations`        | The automation rule                          | Logged in                      |
| GET              | `/api/stats`              | Dashboard numbers                            | Logged in                      |
| GET              | `/api/health`             | Uptime check                                 | Public                         |

## Screens

- `/form`: public lead form (name, email, phone, service, message)
- `/admin/login`: admin login
- `/admin`: dashboard with four numbers (new leads today, auto-replies sent, failed, average first reply)
- `/admin/leads`: leads table with status and source filters
- `/admin/leads/:id`: contact details, timeline, status buttons, manual reply
- Templates and settings (webhook secret, the automation rule) come in week 5

## Environments

- **Local:** PostgreSQL installed on Windows. Connection string in `.env` as `DATABASE_URL`; `.env.example` is committed, `.env` never is.
- **Live:** AWS, starting on the Free plan (credits for 6 months). One EC2 server runs the API and the worker with pm2 and serves the built web app through Nginx. RDS PostgreSQL for the database. S3 for backup files. Before the free period ends: upgrade, or move to another host.

## Migrations and backups

- Migrations live in `apps/api/migrations/` as numbered SQL files. `npm run db:migrate` applies them; `npm run db:seed` adds test leads.
- `npm run db:backup` runs `pg_dump` to a timestamped file in `backups/` (git-ignored). `npm run db:restore` runs `pg_restore`.
- Live: RDS automatic backups, plus a daily `pg_dump` to S3 from cron on the EC2 server.
- A restore is tested once on purpose and noted in the README.

## Build order

1. **Week 1, Express basics.** Workspace for `apps/api`, Express 5 + TypeScript, health route, error handler, zod, `pg`, first migration (`leads`), `POST /api/webhooks/leads` and `GET /api/leads`. Done when a lead posted with curl lands in Postgres and comes back from the list route.
2. **Week 2, login and the leads API.** `users`, `sessions`, login and logout, route protection, lead detail, status changes, `activity_log`, first tests. Done when protected routes return 401 without a session and the tests pass.
3. **Week 3, outbox and worker.** `templates`, `automations`, `messages`, the public form route, the worker with retries, Resend in test mode. Done when a new lead gets an email within a minute and a forced failure retries 3 times, then shows as failed.
4. **Week 4, frontend.** Login, leads table, lead detail and timeline, dashboard numbers, the form connected. Done when the whole flow works from the browser.
5. **Week 5, polish and ship.** Template editor, manual reply, settings, CI, backups, README with architecture and decisions, deploy to AWS. Done when the repo is public, CI is green and there is a live demo link.
6. **Week 6, buffer.** Catch up, or CSV import or the nightly export.

## Scope

**In v1:** one admin login, leads from the form and the webhook, email only, one automation rule, the screens above.

**Later:** CSV import with a row-by-row error report, nightly Excel export, a "no reply after 2 days" reminder, SMS and WhatsApp, more users and roles, Docker.

## Open questions

- [ ] Migrations: `node-pg-migrate`, or numbered `.sql` files with a small runner script? (week 1)
- [ ] Sessions: `express-session` with a Postgres store, or my own `sessions` table and middleware? (week 2)
- [ ] Email for testing: Resend test mode, or Mailtrap? (week 3)
