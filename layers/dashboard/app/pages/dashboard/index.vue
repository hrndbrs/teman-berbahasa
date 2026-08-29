<script setup lang="ts">
definePageMeta({ layout: 'dashboard' });
useSeoMeta({ title: 'Overview — Teman Berbahasa', robots: 'noindex' });

const {
  loading,
  error,
  todayLabel,
  stats,
  todaysClasses,
  recentActivity,
  courseLoad,
  upcomingEvents,
} = useDashboard();
</script>

<template>
  <div class="space-y-6 p-4 sm:p-6">
    <!-- Loading skeleton -->
    <template v-if="loading">
      <div class="space-y-2">
        <USkeleton class="h-3 w-24 rounded" />
        <USkeleton class="h-10 w-96 rounded-lg" />
        <USkeleton class="h-4 w-48 rounded" />
      </div>

      <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <USkeleton
          v-for="i in 4"
          :key="i"
          class="h-28 rounded-xl"
        />
      </div>

      <div class="grid gap-4 lg:grid-cols-5">
        <USkeleton class="h-64 rounded-xl lg:col-span-3" />
        <USkeleton class="h-64 rounded-xl lg:col-span-2" />
      </div>

      <div class="grid gap-4 lg:grid-cols-5">
        <USkeleton class="h-64 rounded-xl lg:col-span-3" />
        <USkeleton class="h-64 rounded-xl lg:col-span-2" />
      </div>
    </template>

    <!-- Error state -->
    <UAlert
      v-else-if="error"
      color="error"
      variant="subtle"
      :description="error"
    />

    <!-- Content -->
    <template v-else>
      <div
        class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
      >
        <div>
          <p
            class="text-label tracking-looser text-dimmed mb-1 font-mono uppercase"
          >
            Admin Console
          </p>
          <h1 class="text-default text-2xl leading-tight font-bold sm:text-4xl">
            What's new on
            <em
              :style="{ fontFamily: 'var(--font-display)' }"
              class="not-italic"
            >
              Teman Berbahasa?
            </em>
          </h1>
          <p class="text-muted mt-1 text-sm">{{ todayLabel }}</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <OverviewStatCard
          v-for="stat in stats"
          :key="stat.label"
          :stat
        />
      </div>

      <div class="grid gap-4 lg:grid-cols-5">
        <OverviewClassesTable
          class="lg:col-span-3"
          :classes="todaysClasses"
        />
        <OverviewActivityFeed
          class="lg:col-span-2"
          :items="recentActivity"
        />
      </div>

      <div class="grid gap-4 lg:grid-cols-5">
        <OverviewCourseLoad
          class="lg:col-span-3"
          :courses="courseLoad"
        />
        <OverviewEventsList
          class="lg:col-span-2"
          :events="upcomingEvents"
        />
      </div>
    </template>
  </div>
</template>
