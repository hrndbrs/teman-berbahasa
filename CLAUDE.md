# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # dev server at http://localhost:3000
npm run build      # production build
npm run preview    # preview production build
npx eslint .       # lint
npx eslint . --fix # lint + autofix
```

No test suite configured.

## Architecture

Nuxt 4 app with two surfaces: a **marketing site** (SSR, static data) and an **admin dashboard** (CSR SPA, REST API backend).

**Directory layout** follows Nuxt v4 compat mode (`future.compatibilityVersion: 4`):
- `app/` — all frontend code (pages, components, composables, utils, assets)
- `shared/` — isomorphic code shared between app and server (currently data + types)

**Data layer**: `shared/data/` holds static TypeScript arrays (`courses.ts`, `events.ts`, `faq.ts`). These are auto-imported everywhere via `nuxt.config.ts` `imports.dirs`. Import from `#shared/data/courses` in pages/components. No DB, no API routes.

**Types**: `shared/types/` defines `Course`, `Event`, `CourseSchedule`, etc. Always import types from here rather than redefining inline.

**Routing**: File-based. `app/pages/courses/[slug].vue` uses the `useCourse()` composable which does slug lookup against the static `courses` array and throws a 404 via `createError` if not found.

**Contact/social config**: Injected at runtime via `useRuntimeConfig().public`. Env vars required: `CONTACT_PHONE_NUMBER`, `CONTACT_INSTAGRAM_HANDLE`, `CONTACT_TIKTOK_HANDLE`, `EVENT_REGISTRATION_URL`, `SITE_URL`. See `.env.example`. Never call `useRuntimeConfig()` directly in components for contact/social data — use the `useContact()` composable instead.

**Composables**:
- `useGSAP` — wraps GSAP + ScrollTrigger with context management and SSR safety. Use instead of calling GSAP directly.
- `useContact` — returns `{ phoneNumber, instagramHandle, whatsappUrl, instagramUrl, tiktokUrl }` from runtimeConfig. Single source of truth for all contact/social URLs.
- `useCourse` — resolves current route slug to a `Course`, throws fatal 404 if not found.
- `useAuth` — global auth state `{ user, accessToken, isAuthenticated, role }`. Access token kept in memory (`useState`); never persisted to localStorage. Refresh token delivered via httpOnly cookie. Call `can(['admin', 'staff'])` to derive role-gated computed.
- `useApi` — `$fetch` wrapper with Bearer token auto-attach and token refresh on 401. Uses a module-level shared `Promise` to prevent parallel 401s from each triggering an independent refresh race.

**UI components**: Reka UI for headless primitives (`reka-ui/nuxt`). Tailwind CSS v4 via `@tailwindcss/vite` plugin. Design tokens live in `app/assets/css/tokens/colors.css`.

**Icons**: `@nuxt/icon` in SVG mode. Custom icons placed in `app/assets/icons/` are available with the `svg:` prefix (e.g., `<Icon name="svg:tb" />`). Third-party icon sets (lucide, logos) work with their own prefixes.

**SEO**: `@nuxtjs/seo` handles sitemap, robots.txt, schema.org, and OG images. Site-level config is in `nuxt.config.ts` under `site` and `schemaOrg`. Per-page SEO uses `useSeoMeta()`.

**Admin dashboard** (`/dashboard/**`, `/login`, `/forgot-password`, `/reset-password`):
- CSR-only via `routeRules` (`ssr: false`). No SSR, no SEO, no public data.
- Layout `auth.vue` — centered card for login/reset pages.
- Layout `dashboard.vue` — AppShell with role-aware sidebar (Users nav item hidden for non-admins).
- Auth boot: `app/plugins/auth.client.ts` silently calls `POST /auth/refresh` on every cold load to restore session from httpOnly cookie.
- Route guard: `app/middleware/auth.global.ts` — redirects unauthenticated users to `/login`, redirects authenticated users away from auth pages, blocks `/dashboard/users` for non-admins.
- Role-based UI: **hide** write actions (not disable) for unauthorized roles. Check via `can(['admin'])` computed from `useAuth`.
- API client: always use `useApi().apiFetch` for dashboard API calls — never raw `$fetch` — so token injection and refresh happen automatically.
- Types in `shared/types/auth.ts`: `UserRole`, `User`, `AuthState`, `LoginPayload`, `AuthResponse`.
- `API_BASE_URL` env var (default `http://localhost:8000/api`) controls backend endpoint.
- Dashboard modules use routes `/dashboard/[module]` to avoid collisions with marketing routes `/courses` and `/events`.

**Security**: `nuxt-security` enforces CSP, HSTS, rate limiting, and CORS in `nuxt.config.ts`. Modifying headers there affects all routes. `connect-src` includes `API_BASE_URL` for dashboard API calls.

**Linting**: ESLint 9 flat config (`eslint.config.mjs`) + Prettier. `no-console` is a warning (only `warn`/`error` allowed). `@typescript-eslint/no-explicit-any` is a warning. Unused vars prefixed with `_` are exempt.
