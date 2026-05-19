<script setup lang="ts">
definePageMeta({ layout: 'dashboard' });
useSeoMeta({ title: 'Overview — Teman Berbahasa', robots: 'noindex' });

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
  <div class="p-4 sm:p-6 space-y-6">
    <div
      class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
    >
      <div>
        <p
          class="text-label font-mono tracking-looser uppercase text-dimmed mb-1"
        >
          Admin Console
        </p>
        <h1 class="text-2xl sm:text-4xl font-bold text-default leading-tight">
          What's new on
          <em
            :style="{ fontFamily: 'var(--font-display)' }"
            class="not-italic"
          >
            Teman Berbahasa?
          </em>
        </h1>
        <p class="mt-1 text-sm text-muted">{{ todayLabel }}</p>
      </div>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <DashboardStatCard
        v-for="stat in stats"
        :key="stat.label"
        :stat
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
      <DashboardClassesTable
        class="lg:col-span-3"
        :classes="todaysClasses"
      />
      <DashboardActivityFeed
        class="lg:col-span-2"
        :items="recentActivity"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
      <DashboardCourseLoad
        class="lg:col-span-3"
        :courses="courseLoad"
      />
      <DashboardEventsList
        class="lg:col-span-2"
        :events="upcomingEvents"
      />
    </div>
  </div>
</template>
