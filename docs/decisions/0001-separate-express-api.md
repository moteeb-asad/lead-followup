# 0001. Separate React app and Express API instead of Next.js

- **Status:** Accepted
- **Date:** 2026-10-27

## Context

My other main project already uses Next.js, where backend code lives in server actions and route handlers. The goal here is to show backend work clearly: API design, sessions, and a worker running as its own process. The dashboard sits behind a login, so server rendering and SEO don't matter.

## Decision

Build a React + Vite single-page app (`apps/web`) and a separate Express 5 API (`apps/api`) in one npm workspaces repo. In development, Vite proxies `/api` to the API, so the browser stays on one origin.

## Consequences

- The backend is visible on its own: routes, middleware, validation and the worker.
- I handle what Next.js would hide: sessions and cookies, request validation, serving the built frontend.
- Two things to deploy instead of one.
- No server rendering, which is fine for a dashboard behind a login.
