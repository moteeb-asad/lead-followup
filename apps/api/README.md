# API

The Express 5 API for lead-followup. It takes in leads, checks who is logged in, and reads and writes the PostgreSQL database with plain SQL. The web app in `apps/web` talks to it only through `/api` (in development, Vite proxies `/api` to this server, so both share one origin).

The reasons behind the main choices are in [docs/decisions/](../../docs/decisions/), and the full list of planned routes is in [docs/PLAN.md](../../docs/PLAN.md).

**Keep this file in step with the code.** When you add, change or remove a route, update the endpoint tables below in the same commit.

## Endpoints

Every route lives under `/api`. A route is either public, or needs a logged-in session (`requireAuth`). Public routes need a reason in `docs/PLAN.md`.

| Method | Route               | Access                                    | What it does                                                      |
| ------ | ------------------- | ----------------------------------------- | ----------------------------------------------------------------- |
| GET    | `/api/health`       | Public, rate limited (60 per minute)      | Uptime check. Also checks the database connection.                |
| POST   | `/api/auth/login`   | Public, rate limited (10 failed per 15 m) | Checks email and password, sets the session cookie.               |
| POST   | `/api/auth/logout`  | Public                                    | Deletes the session row and clears the cookie.                    |
| GET    | `/api/me`           | Logged in                                 | The current user, used by the web app to check the session.       |
| GET    | `/api/leads`        | Logged in                                 | One page of leads for the leads table, filtered and newest first. |
| POST   | `/api/public/leads` | Public, rate limited (5 per minute)       | Saves a lead from the public form on `/form`, with a honeypot.    |

### Request and response details

**`GET /api/health`**

- `200 {"status":"ok","database":"up"}`
- `503 {"status":"error","database":"down"}` when the database can't be reached
- `429` after 60 requests in a minute from one IP

**`POST /api/auth/login`**

- Body: `{ "email": string, "password": string }`. The email is trimmed and lowercased. The password is at most 256 characters.
- `200 {"id","email"}` and a `sid` cookie (`HttpOnly`, `SameSite=Lax`, `Secure` in production, 7 days)
- `400` for a bad body, `401 {"error":"Email or password is wrong"}` for a wrong email or password (the same message for both), `429` after too many failed attempts

**`POST /api/auth/logout`**

- No body. Always `204`, with or without a session.

**`GET /api/me`**

- `200 {"id","email"}`, or `401 {"error":"Not logged in"}`

**`GET /api/leads`**

- Query string, all optional:
  - `status`: `new`, `contacted`, `won` or `lost`
  - `source`: `form` or `webhook`
  - `page`: a whole number, 1 or more. Default 1.
  - `pageSize`: a whole number from 1 to 100. Default 20.
  - Leave a filter out to get every value. A value that isn't listed, or a filter given twice, returns `400`. Nothing from the query string is ever put into SQL as text.
- `200 {"items": [...], "total": number, "page": number, "pageSize": number}`
  - Each item is `{ id, name, email, phone, service, source, status, createdAt }`. `id` is a string. `phone` and `service` can be `null`. The full message isn't included: it belongs to the lead detail page.
  - Newest first. `total` is the number of leads that match the filters, not the size of this page. A page past the end returns no items and the same `total`.
- `401 {"error":"Not logged in"}` without a session. The login check runs before the query is checked, so someone logged out gets `401` for any query.

**`POST /api/public/leads`**

- Body: `{ "submissionId": uuid, "name": string, "email": string, "phone"?: string, "service"?: string, "message"?: string, "company"?: string }`
  - `submissionId` is required. The browser makes one per send and sends the same one again if it retries the same data. It is saved as the lead's `external_id`, and the unique `(source, external_id)` key makes a repeat save nothing. The repeat still gets `201`, so a retry after a timeout is safe.
  - **The same enquiry is saved once.** A lead with the same email (any case), service and message as an existing one is not saved, whatever its name, phone or `submissionId`, and however long ago the first one came in. A missing service or message counts as empty. The sender still gets `201`, so a bot can't tell it was dropped, and a person who sends twice sees the same thank-you. This is the unique index `leads_content_key` (migration `0004`), so two identical requests at the same moment still make one lead.
  - `name` is required, at most 100 characters. `email` must be a valid email, at most 254. `phone` is at most 30, `service` at most 100, `message` at most 5000. Empty optional fields are saved as NULL. Keys that aren't listed are dropped.
  - `company` is the honeypot: a hidden field that people never see. If it has a value, the API answers as if the lead was saved, and saves nothing ([decision 0004](../../docs/decisions/0004-public-form-route.md)).
- `201 {"ok":true}`. The lead's id is never returned.
- `400 {"error": "<first problem>"}` for a bad body, `429` after 5 requests in a minute from one IP. Every request counts, including honeypot hits.

### Errors

Every error is JSON in the shape `{ "error": string }`, so the web app's `src/lib/api.ts` can show it. There are no stack traces in responses.

| Status | When                                                                     |
| ------ | ------------------------------------------------------------------------ |
| 400    | The body failed validation, or isn't valid JSON (`Invalid request body`) |
| 401    | No valid session on a route that needs one                               |
| 403    | A browser request that changes data came from another site (CSRF check)  |
| 404    | A `/api` route that doesn't exist (`Not found`)                          |
| 429    | A rate limit was hit                                                     |
| 500    | Something broke on the server (`Something went wrong`)                   |

## Folder layout

```
apps/api/
├─ src/
│  ├─ index.ts          starts the server, closes it and the database pool on SIGINT/SIGTERM
│  ├─ app.ts            builds the Express app: middleware, routers, 404 and error handlers
│  ├─ db.ts             the one pg Pool, built from DATABASE_URL
│  ├─ features/         one folder per feature
│  │  ├─ auth/          login, logout, /api/me: routes, queries, zod schemas
│  │  ├─ health/        GET /api/health
│  │  └─ leads/         leads list and public lead form routes, queries, zod schemas
│  ├─ middleware/
│  │  ├─ require-auth.ts  lets a request through only with a valid session cookie
│  │  ├─ csrf.ts          blocks cross-site browser requests that change data
│  │  ├─ validate.ts      checks req.body (or req.query) against a zod schema, returns 400 if it fails
│  │  └─ rate-limit.ts    the login and public-lead limiters
│  └─ lib/
│     └─ session-cookie.ts  session token, its SHA-256 hash, and the cookie options
├─ migrations/          numbered SQL files, applied in order (never edited after they run)
└─ scripts/
   ├─ migrate.ts        npm run db:migrate
   └─ create-user.ts    npm run user:create
```

Each feature folder follows one pattern: `*.routes.ts` handles the request, `*.queries.ts` holds the SQL, `*.schemas.ts` holds the zod schemas. Routes never build SQL, and queries never touch `req` or `res`.

## Database

PostgreSQL through `pg`, with parameterized SQL (`$1`, `$2`) and no ORM ([decision 0002](../../docs/decisions/0002-plain-sql-no-orm.md)).

| Table               | Migration                                                | Holds                                                                                                |
| ------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `users`             | `0001_create_users.sql`                                  | The admin login. Passwords are stored as argon2id hashes.                                            |
| `sessions`          | `0002_create_sessions.sql`                               | Only the SHA-256 hash of each session token, with an expiry                                          |
| `leads`             | `0003_create_leads.sql`, `0004_leads_unique_content.sql` | Leads from the form (and later the webhook). The same email, service and message is saved only once. |
| `schema_migrations` | created by the runner                                    | Which migration files have already run                                                               |

Schema changes go in a new numbered file in `migrations/` ([decision 0005](../../docs/decisions/0005-numbered-sql-migrations.md)). The setup steps for a new machine are in the [root README](../../README.md#run-locally).

## Commands

Run from the repo root.

| Command                           | What it does                                                   |
| --------------------------------- | -------------------------------------------------------------- |
| `npm run dev:api`                 | Starts the API on http://localhost:4000, with `--watch`        |
| `npm run db:migrate -w apps/api`  | Applies new migrations                                         |
| `npm run user:create -w apps/api` | Creates the admin user from `ADMIN_EMAIL` and `ADMIN_PASSWORD` |
| `npm run typecheck -w apps/api`   | Type check                                                     |
| `npm run lint -w apps/api`        | Lint with oxlint                                               |

There is no build step: Node 24 runs the TypeScript files directly.

## Environment

Set these in `apps/api/.env`, which is never committed. `.env.example` lists the names.

| Variable         | Needed by           | Notes                                                                |
| ---------------- | ------------------- | -------------------------------------------------------------------- |
| `DATABASE_URL`   | The API and scripts | Required. The API throws on start without it.                        |
| `ADMIN_EMAIL`    | `user:create` only  | The dashboard login                                                  |
| `ADMIN_PASSWORD` | `user:create` only  | At least 12 characters. Remove it from `.env` after the user exists. |
| `PORT`           | The API             | Optional. Defaults to 4000.                                          |
| `NODE_ENV`       | The API             | `production` makes the session cookie `Secure`.                      |

## Rules for this folder

The full list is in [AGENTS.md](../../AGENTS.md), including the backend security checklist. The short version:

- Every route validates its input with zod, and routes that aren't public use `requireAuth`.
- SQL is always parameterized, and there is no ORM.
- The API never sends email directly. It writes to the `messages` outbox, and the worker sends.
- Responses carry `{ error }` only. Never log passwords, tokens, cookies or request bodies.
