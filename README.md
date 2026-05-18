# Teman Berbahasa

Web platform for **Teman Berbahasa**, a Japanese language tutoring center founded in October 2025 by PT Nadiartha Jaya Abadi. The platform has two surfaces: a public marketing site and an internal operations dashboard for staff.

## What Teman Berbahasa Does

Teman Berbahasa offers structured Japanese classes based on JLPT curriculum (N5–N2) and standalone mini-courses / webinars. Its core differentiator is the **Discussion Partner** system — students are matched with Indonesian students or professionals currently living in Japan for real conversational practice beyond the classroom.

## App Surfaces

### Marketing Site

Public, SSR, SEO-optimised. No auth required.

| Route             | Content                                          |
| ----------------- | ------------------------------------------------ |
| `/`               | Landing page                                     |
| `/courses`        | Course catalog (JLPT levels, schedules, pricing) |
| `/courses/[slug]` | Course detail                                    |
| `/events`         | Upcoming events and webinars                     |
| `/linktree`       | Social/contact link hub                          |

Data is static TypeScript arrays in `shared/data/` — no DB, no API routes.

### Admin Dashboard

Internal SPA for staff (`admin`, `teacher`, `staff` roles). CSR-only, fully auth-gated, communicates with a REST API backend.

| Module                            | Access                        |
| --------------------------------- | ----------------------------- |
| Users                             | Admin only                    |
| Students                          | All roles                     |
| Courses                           | All roles (write: admin only) |
| Batches                           | All roles                     |
| Enrollments                       | All roles                     |
| Schedules + Overrides             | All roles                     |
| Events                            | All roles                     |
| Form Builder + Responses          | All roles                     |
| Public Form Submission (`/f/:id`) | Unauthenticated               |

Auth flow: `/login` → `/forgot-password` → `/reset-password`. Session restored on cold load via silent `POST /auth/refresh` (httpOnly cookie). Token stored in memory only — never localStorage.

## Tech Stack

| Layer         | Library                                               |
| ------------- | ----------------------------------------------------- |
| Framework     | Nuxt 4 (`compatibilityVersion: 4`)                    |
| Styling       | Tailwind CSS v4 (`@tailwindcss/vite`)                 |
| UI Components | Nuxt UI v4, Reka UI (headless)                        |
| Animations    | GSAP + ScrollTrigger                                  |
| Icons         | `@nuxt/icon` (SVG mode)                               |
| SEO           | `@nuxtjs/seo` (sitemap, robots, schema.org, OG image) |
| Security      | `nuxt-security` (CSP, HSTS, rate limiting, CORS)      |
| Utils         | VueUse                                                |

## Directory Layout

```
app/
  assets/         # CSS design tokens, custom SVG icons, images
  components/     # Vue components
  composables/    # useAuth, useApi, useContact, useCourse, useGSAP, useTheme
  layouts/        # default (marketing), auth (login/reset), dashboard (app shell)
  middleware/     # auth.global.ts — route guard + role gating
  pages/          # file-based routing
  plugins/        # auth.client.ts — session restore on cold load
shared/
  data/           # courses.ts, events.ts, faq.ts (auto-imported everywhere)
  types/          # Course, Event, User, AuthState, UserRole, etc.
```

## Key Composables

- `useAuth` — global auth state (`user`, `accessToken`, `isAuthenticated`, `role`). Access token in memory; refresh token via httpOnly cookie. Use `can(['admin'])` for role-gated computed.
- `useApi` — `$fetch` wrapper with Bearer token injection and silent 401 refresh. Single shared promise prevents parallel refresh races.
- `useContact` — single source of truth for all contact/social URLs. Never call `useRuntimeConfig()` directly in components.
- `useCourse` — resolves route slug to a `Course`, throws fatal 404 if not found.
- `useGSAP` — SSR-safe GSAP wrapper with ScrollTrigger context management.

## Environment Variables

Copy `.env.example` → `.env`:

```bash
# Marketing site
SITE_URL=https://temanberbahasa.com
CONTACT_PHONE_NUMBER=6281234567890
CONTACT_INSTAGRAM_HANDLE=teman.berbahasa
CONTACT_TIKTOK_HANDLE=temanberbahasa
EVENT_REGISTRATION_URL=https://...
```

## Setup & Commands

```bash
npm install

npm run dev        # dev server → http://localhost:3000
npm run build      # production build
npm run preview    # preview production build
npx eslint .       # lint
npx eslint . --fix # lint + autofix
```

## Docs

- [`docs/company-profile.md`](docs/company-profile.md) — business context, programs, Discussion Partner system
- [`docs/admin-dashboard-frd.md`](docs/admin-dashboard-frd.md) — frontend functional requirements for the dashboard (modules, flows, API contracts, UX rules)
