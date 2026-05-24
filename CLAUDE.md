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

**Types**: `shared/types/` defines all API shapes and domain types (one file per domain: `api.ts`, `auth.ts`, `course.ts`, `batch.ts`, `student.ts`, `enrollment.ts`, `schedule.ts`, `event.ts`, `dashboard.ts`). Files in `app/` get these auto-imported globally by Nuxt — no explicit `import type` needed. Files in `shared/` (under `tsconfig.shared.json`) do NOT have Nuxt auto-imports; use `import type { ... } from '#imports'` for cross-file type references inside `shared/`.

**Routing**: File-based. `app/pages/courses/[slug].vue` uses the `useCourse()` composable which does slug lookup against the static `courses` array and throws a 404 via `createError` if not found.

**Contact/social config**: Injected at runtime via `useRuntimeConfig().public`. Env vars required: `CONTACT_PHONE_NUMBER`, `CONTACT_INSTAGRAM_HANDLE`, `CONTACT_TIKTOK_HANDLE`, `EVENT_REGISTRATION_URL`, `SITE_URL`. See `.env.example`. Never call `useRuntimeConfig()` directly in components for contact/social data — use the `useContact()` composable instead.

**Composables**:

- `useGSAP` — wraps GSAP + ScrollTrigger with context management and SSR safety. Use instead of calling GSAP directly.
- `useContact` — returns `{ phoneNumber, instagramHandle, whatsappUrl, instagramUrl, tiktokUrl }` from runtimeConfig. Single source of truth for all contact/social URLs.
- `useCourse` — resolves current route slug to a `Course`, throws fatal 404 if not found.
- `useAuthToken` — read/write/clear ACCESS and REFRESH tokens in localStorage. Single source of truth for token storage; never access localStorage keys directly.
- `useAuth` — global auth state `{ user, isAuthenticated, role }`. Access and refresh tokens stored in localStorage via `useAuthToken`; never in `useState`. Call `can(['admin', 'staff'])` to derive role-gated computed. Exposes `validateSession()` (calls `GET /auth/me` to rehydrate user) and a top-level `refresh()` utility.
- `useApi` — `$fetch` wrapper with Bearer token auto-attach and 401 retry. Returns a typed async function directly: `const api = useApi(); await api<T>('/endpoint', options)`. On 401 calls `refresh()`, then retries the original request once using a `RETRY_SENTINEL` symbol — no shared Promise needed.
- `useIdleSession` — tracks user activity; after 15 min idle the next interaction triggers `validateSession()` and redirects to `/login` if the session has expired. Mounted globally in `dashboard.vue`.
- `useSchedules` — fetches and transforms the weekly timetable grid. Manages week navigation (`prev`, `next`, `today`), active filters, and exposes `rawSessions` (API shape) alongside `visibleSessions` (display shape). Call via `useSchedulesPage` — do not instantiate directly in components.

**Page composable pattern**: Keep page components thin — template + a single composable call. All reactive state, handlers, API calls, and validation logic live in a dedicated page composable named `use[PageName]Page` (e.g., `useLoginPage`). Group related page composables in a nested directory under `app/composables/` and add an `index.ts` barrel that re-exports them all so Nuxt can auto-import from a single entry point.

```
app/composables/
  auth/
    useLoginPage.ts
    useForgotPasswordPage.ts
    useResetPasswordPage.ts
    index.ts              # re-exports all composables in this group
```

`index.ts` barrel pattern:

```ts
export { useLoginPage } from './useLoginPage';
export { useForgotPasswordPage } from './useForgotPasswordPage';
export { useResetPasswordPage } from './useResetPasswordPage';
```

Page component then becomes:

```vue
<script setup lang="ts">
const { state, schema, loading, serverError, onSubmit } = useLoginPage();
</script>
```

**Dashboard composables** live in `app/composables/dashboard/`:

- `useCoursesPage` — courses list with CRUD, archive, status filter
- `useCourseDetailPage` — single course view with stats, edit, archive
- `useBatchesPage` — batches list with CRUD, status/course filter, search
- `useSchedulesPage` — timetable management; owns all modal open state and schedule/override CRUD handlers; delegates data fetching to `useSchedules`

**Marketing composables** live in `app/composables/marketing/`:

- `useHomePage` — landing page
- `useCourseListPage` — course catalog
- `useCoursePage` — course detail (slug lookup)
- `useEventsPage` — upcoming events
- `useLinktreePage` — contact/social link hub

**Zod validation schemas** live in `app/utils/schemas.ts`:

- `loginSchema`, `forgotPasswordSchema`, `resetPasswordSchema` — auth forms
- `courseFormSchema` — create/edit course (description/subject/level/session_count/price/max_capacity are optional)
- `batchFormSchema` — create/edit batch (course_id, instructor_user_id required; academic_year optional)
- `scheduleFormSchema` — create/edit schedule slot (batch_id, day_of_week, start_time, end_time, recurrence, effective_from required; instructor_user_id, room, effective_until optional)
- `overrideFormSchema` — create/edit session override (original_date, override_type required; new_date, new_start_time, new_end_time, new_room, new_instructor_user_id, reason optional)

**PATCH convention**: All `PATCH` requests only send changed fields. For nullable fields, send explicit `null` to clear the value. Implement dirty-tracking by storing an `initial` snapshot when the edit modal opens and comparing current state on submit.

**Modal open state**: Use `defineModel<boolean>('open', { required: true })` in modal components — not a manual `open` prop + `'update:open'` emit pair. Parent binds with `v-model:open`. Cancel buttons set `open.value = false` directly. Internal `UModal` binds `v-model:open="open"`.

**Date inputs**: Use `FormDateInput` (`app/components/form/DateInput.vue`) instead of `UInput type="date"`. It wraps `UInputDate` and bridges `CalendarDate` ↔ ISO date string (`YYYY-MM-DD`) internally — callers bind a plain string via `v-model`. Time fields (`HH:MM:SS`) use `UInput type="time"` directly since they stay as strings throughout.

**UI components**: Reka UI for headless primitives (`reka-ui/nuxt`). Tailwind CSS v4 via `@tailwindcss/vite` plugin. Design tokens live in `app/assets/css/tokens/colors.css`.

**Styling conventions**:

- Use Nuxt UI v4 semantic utility classes — never write raw CSS variable arbitrary values for design tokens.
- Prefer standard Tailwind size/spacing classes over arbitrary values. When no predefined class matches, use `rem` not `px` (e.g. `text-[0.625rem]` not `text-[10px]`). Exception: `em` is appropriate for `tracking-*` and other font-relative values.
- For CSS variable references that have no semantic class, use Tailwind CSS v4 syntax — `shadow-(--shadow-soft)` not `shadow-[var(--shadow-soft)]`.
- For border radius: use standard `rounded-*` classes. `--ui-radius` is `0.5rem` = `rounded-lg`.
- `tracking-[0.1em]` → `tracking-widest` (exact match). No standard class exists for 0.12em / 0.14em — keep those as arbitrary em values.
- Common token → class mappings:

| Avoid                             | Use                      |
| --------------------------------- | ------------------------ |
| `bg-[var(--ui-bg)]`               | `bg-default`             |
| `bg-[var(--ui-bg-muted)]`         | `bg-muted`               |
| `bg-[var(--ui-bg-elevated)]`      | `bg-elevated`            |
| `bg-[var(--ui-bg-accented)]`      | `bg-accented`            |
| `bg-[var(--ui-bg-inverted)]`      | `bg-inverted`            |
| `text-[var(--ui-text)]`           | `text-default`           |
| `text-[var(--ui-text-muted)]`     | `text-muted`             |
| `text-[var(--ui-text-dimmed)]`    | `text-dimmed`            |
| `text-[var(--ui-text-inverted)]`  | `text-inverted`          |
| `border-[var(--ui-border)]`       | `border-default`         |
| `border-[var(--ui-border-muted)]` | `border-muted`           |
| `ring-[var(--ui-border)]`         | `ring-default`           |
| `divide-[var(--ui-border-muted)]` | `divide-muted`           |
| `rounded-[var(--ui-radius)]`      | `rounded-lg`             |
| `shadow-[var(--shadow-soft)]`     | `shadow-(--shadow-soft)` |
| `text-[14px]`                     | `text-sm`                |
| `text-[12px]`                     | `text-xs`                |
| `text-[10px]`                     | `text-label`             |
| `text-[9px]`                      | `text-2xs`               |
| `text-[11px]`                     | `text-caption`           |
| `text-[13px]`                     | `text-body-sm`           |
| `text-[15px]`                     | `text-subhead`           |
| `tracking-[0.12em]`               | `tracking-loose`         |
| `tracking-[0.14em]`               | `tracking-looser`        |

**Token files** — add new design tokens to the appropriate scoped file in `app/assets/css/tokens/`:

- `colors.css` — surface aliases (`--ui-*`), palettes, shadows
- `typographies.css` — custom font sizes (`--text-*`) and tracking (`--tracking-*`) not in Tailwind's built-in scale
- Create additional token files (e.g. `borders.css`, `motion.css`) as needed and import them in `main.css`

**Icons**: `@nuxt/icon` in SVG mode. Custom icons placed in `app/assets/icons/` are available with the `svg:` prefix (e.g., `<Icon name="svg:tb" />`). Third-party icon sets (lucide, logos) work with their own prefixes.

**SEO**: `@nuxtjs/seo` handles sitemap, robots.txt, schema.org, and OG images. Site-level config is in `nuxt.config.ts` under `site` and `schemaOrg`. Per-page SEO uses `useSeoMeta()`.

**Admin dashboard** (`/dashboard/**`, `/login`, `/forgot-password`, `/reset-password`):

- CSR-only via `routeRules` (`ssr: false`). No SSR, no SEO, no public data.
- Layout `auth.vue` — centered card for login/reset pages.
- Layout `dashboard.vue` — AppShell with role-aware sidebar (Users nav item hidden for non-admins).
- Auth boot: `app/plugins/auth.client.ts` silently calls `POST /auth/refresh` on every cold load to restore session from httpOnly cookie.
- Route guard: `app/middleware/auth.global.ts` — redirects unauthenticated users to `/login`, redirects authenticated users away from auth pages, blocks `/dashboard/users` for non-admins.
- Role-based UI: **hide** write actions (not disable) for unauthorized roles. Check via `can(['admin'])` computed from `useAuth`.
- API client: always use `const api = useApi()` and call `api('/endpoint', options)` for dashboard API calls — never raw `$fetch` — so token injection and refresh happen automatically.
- Types live in `shared/types/` (one file per domain: `auth`, `api`, `course`, `batch`, `student`, `enrollment`, `schedule`, `event`, `dashboard`). Nuxt auto-imports all types from `shared/types/` globally — no `import type` statement needed. Never add explicit type imports from `#shared/types` or sub-paths.
- `API_BASE_URL` env var (default `http://localhost:8000/api`) controls backend endpoint.
- Dashboard modules use routes `/dashboard/[module]` to avoid collisions with marketing routes `/courses` and `/events`.

**Security**: `nuxt-security` enforces CSP, HSTS, rate limiting, and CORS in `nuxt.config.ts`. Modifying headers there affects all routes. `connect-src` includes `API_BASE_URL` for dashboard API calls.

**Linting**: ESLint 9 flat config (`eslint.config.mjs`) + Prettier. `no-console` is a warning (only `warn`/`error` allowed). `@typescript-eslint/no-explicit-any` is a warning. Unused vars prefixed with `_` are exempt.

**TypeScript conventions**:

- Never use `any`. Use `unknown` in catch blocks. `usePublicApi` normalizes all API errors to `ApiError` (auto-imported from `app/utils/fetchError.ts`) in its `onResponseError` hook — catch blocks just do `err instanceof ApiError` and read `err.status`, `err.code`, `err.fields`. Error codes live on `ApiError.Code` (e.g. `ApiError.Code.ACCOUNT_LOCKED`) — no separate import needed.
- When a value is an enum (a fixed set of string constants), define it as a `const` object with `as const` and export a companion type — not a bare union of string literals and not a TypeScript `enum`. Example from `shared/types/api.ts`: `ApiErrorCode`. Compare against enum members (`ApiErrorCode.ACCOUNT_LOCKED`), never bare strings (`'ACCOUNT_LOCKED'`).
