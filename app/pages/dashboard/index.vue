<script setup lang="ts">
definePageMeta({ layout: 'dashboard' });
useSeoMeta({ title: 'Overview — Teman Berbahasa', robots: 'noindex' });

const { userInitials } = useAuth();
const {
  todayLabel,
  stats,
  todaysClasses,
  recentActivity,
  courseLoad,
  upcomingEvents,
} = useDashboard();
</script>

<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardNavbar>
        <template #leading>
          <UDashboardSidebarCollapse />
          <span
            class="ml-2 text-label font-mono tracking-loose uppercase text-dimmed"
          >
            TB / Overview
          </span>
        </template>

        <template #default>
          <UInput
            placeholder="Search students, courses, batches…"
            icon="i-lucide-search"
            size="sm"
            class="w-72"
          >
            <template #trailing>
              <UKbd>⌘K</UKbd>
            </template>
          </UInput>
        </template>

        <template #right>
          <div
            class="flex items-center gap-1 rounded-md border border-default p-0.5"
          >
            <button
              class="rounded px-2.5 py-1 text-label font-mono font-semibold tracking-wide uppercase bg-inverted text-inverted"
            >
              Admin
            </button>
            <button
              class="rounded px-2.5 py-1 text-label font-mono font-medium tracking-wide uppercase text-muted hover:text-default"
            >
              Tutor
            </button>
          </div>
          <UButton
            icon="i-lucide-bell"
            color="neutral"
            variant="ghost"
            size="sm"
          />
          <div
            class="flex size-8 items-center justify-center rounded-full bg-primary-600 text-caption font-bold text-white select-none"
          >
            {{ userInitials }}
          </div>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="p-6 space-y-6">
        <div class="flex items-start justify-between">
          <div>
            <p
              class="text-label font-mono tracking-looser uppercase text-dimmed mb-1"
            >
              Admin Console
            </p>
            <h1 class="text-4xl font-bold text-default leading-tight">
              Today at the
              <em
                :style="{ fontFamily: 'var(--font-display)' }"
                class="not-italic"
                >center.</em
              >
            </h1>
            <p class="mt-1 text-sm text-muted">{{ todayLabel }}</p>
          </div>
          <div class="flex items-center gap-2">
            <UButton
              icon="i-lucide-download"
              label="Export"
              color="neutral"
              variant="outline"
              size="sm"
            />
            <UButton
              icon="i-lucide-plus"
              label="Quick add"
              color="neutral"
              size="sm"
            />
          </div>
        </div>

        <div class="grid grid-cols-4 gap-4">
          <DashboardStatCard
            v-for="stat in stats"
            :key="stat.label"
            :stat
          />
        </div>

        <div class="grid grid-cols-5 gap-4">
          <DashboardClassesTable
            class="col-span-3"
            :classes="todaysClasses"
          />
          <DashboardActivityFeed
            class="col-span-2"
            :items="recentActivity"
          />
        </div>

        <div class="grid grid-cols-5 gap-4">
          <DashboardCourseLoad
            class="col-span-3"
            :courses="courseLoad"
          />
          <DashboardEventsList
            class="col-span-2"
            :events="upcomingEvents"
          />
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
