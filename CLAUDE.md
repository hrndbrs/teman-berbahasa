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

Nuxt 4 marketing site for Teman Berbahasa (Japanese language tutoring). No backend — all data is static.

**Directory layout** follows Nuxt v4 compat mode (`future.compatibilityVersion: 4`):
- `app/` — all frontend code (pages, components, composables, utils, assets)
- `shared/` — isomorphic code shared between app and server (currently data + types)

**Data layer**: `shared/data/` holds static TypeScript arrays (`courses.ts`, `events.ts`, `faq.ts`). These are auto-imported everywhere via `nuxt.config.ts` `imports.dirs`. Import from `#shared/data/courses` in pages/components. No DB, no API routes.

**Types**: `shared/types/` defines `Course`, `Event`, `CourseSchedule`, etc. Always import types from here rather than redefining inline.

**Routing**: File-based. `app/pages/courses/[slug].vue` uses the `useCourse()` composable which does slug lookup against the static `courses` array and throws a 404 via `createError` if not found.

**Contact/social config**: Injected at runtime via `useRuntimeConfig().public`. Env vars required: `CONTACT_PHONE_NUMBER`, `CONTACT_INSTAGRAM_HANDLE`, `CONTACT_TIKTOK_HANDLE`, `EVENT_REGISTRATION_URL`, `SITE_URL`. See `.env.example`. Never call `useRuntimeConfig()` directly in components for contact/social data — use the `useContact()` composable instead.

**Composables**:
- `useGSAP` (`app/composables/useGSAP.ts`) — wraps GSAP + ScrollTrigger with context management and SSR safety. Use instead of calling GSAP directly.
- `useContact` (`app/composables/useContact.ts`) — returns `{ phoneNumber, instagramHandle, whatsappUrl, instagramUrl, tiktokUrl }` from runtimeConfig. Single source of truth for all contact/social URLs. Never compute these URLs inline in components.
- `useCourse` (`app/composables/useCourse.ts`) — resolves current route slug to a `Course`, throws fatal 404 if not found.

**UI components**: Reka UI for headless primitives (`reka-ui/nuxt`). Tailwind CSS v4 via `@tailwindcss/vite` plugin. Design tokens live in `app/assets/css/tokens/colors.css`.

**Icons**: `@nuxt/icon` in SVG mode. Custom icons placed in `app/assets/icons/` are available with the `svg:` prefix (e.g., `<Icon name="svg:tb" />`). Third-party icon sets (lucide, logos) work with their own prefixes.

**SEO**: `@nuxtjs/seo` handles sitemap, robots.txt, schema.org, and OG images. Site-level config is in `nuxt.config.ts` under `site` and `schemaOrg`. Per-page SEO uses `useSeoMeta()`.

**Security**: `nuxt-security` enforces CSP, HSTS, rate limiting, and CORS in `nuxt.config.ts`. Modifying headers there affects all routes.

**Linting**: ESLint 9 flat config (`eslint.config.mjs`) + Prettier. `no-console` is a warning (only `warn`/`error` allowed). `@typescript-eslint/no-explicit-any` is a warning. Unused vars prefixed with `_` are exempt.
