# Changelog

All notable changes to this project are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- npm workspaces setup with `apps/web`: React, Vite, TypeScript, Tailwind CSS, React Router and TanStack Query.
- Routes: the public lead form at `/form`, and the admin area at `/admin` with dashboard, leads and lead detail pages (placeholders until the API exists).
- `src/lib/api.ts`, a fetch helper that sends the session cookie.
- Project docs: `AGENTS.md`, `docs/PLAN.md` and decision records 0001 to 0004.
- Login page design: a split screen with the product panel on the left and the login form on the right, with a show/hide password toggle.
