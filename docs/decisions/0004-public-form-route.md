# 0004. A separate public route for the lead form

- **Status:** Accepted
- **Date:** 2026-10-27

## Context

Leads arrive two ways: from the public form on `/form`, and from other tools' servers through a webhook. The webhook is protected by a shared secret in the `X-Webhook-Secret` header. A browser form can't use that secret, because anyone can read the code a browser runs.

## Decision

The form posts to its own route, `POST /api/public/leads`, protected by zod validation, a rate limit per IP (`express-rate-limit`, starting at 5 a minute) and a hidden honeypot field that bots fill in and people don't. `POST /api/webhooks/leads` keeps the secret and is only for server-to-server use. Both routes create leads through the same code.

## Consequences

- The webhook secret never reaches the browser.
- The public route can't fully stop a determined spammer. If spam gets through, a captcha is the next step.
- Two entry points to test, but one shared function behind them.
