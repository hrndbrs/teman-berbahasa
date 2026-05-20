<script setup lang="ts">
import { ALL_LEVELS, LEVEL_COLORS } from '~/utils/schedule';

definePageMeta({ layout: 'dashboard' });
useSeoMeta({ title: 'Schedule — Teman Berbahasa', robots: 'noindex' });

const {
  visibleSessions,
  weekDays,
  weekLabel,
  totalHours,
  activeFilters,
  toggleFilter,
  prev,
  next,
  today,
  reschedule,
} = useSchedules();

const selectedSession = ref<ScheduleSession | null>(null);
const isModalOpen = ref(false);

function onSelect(session: ScheduleSession) {
  selectedSession.value = session;
  isModalOpen.value = true;
}
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <!-- Page header -->
    <div class="px-6 pt-6 pb-4 border-b border-muted shrink-0">
      <!-- Row 1: title + week nav -->
      <div class="flex items-start justify-between gap-4 mb-4">
        <div>
          <p
            class="text-label font-mono tracking-looser uppercase text-dimmed mb-1"
          >
            This week
          </p>
          <h1 class="text-4xl font-bold text-default leading-tight">
            Weekly <em class="not-italic font-(--font-display)">schedule</em>
          </h1>
          <p class="mt-1 text-sm text-muted">
            Drag any class block to reschedule. Click for details.
          </p>
        </div>
        <div class="flex items-center gap-1.5 shrink-0 mt-1">
          <UButton
            icon="i-lucide-chevron-left"
            color="neutral"
            variant="ghost"
            size="sm"
            @click="prev"
          />
          <UButton
            label="Today"
            color="neutral"
            variant="outline"
            size="sm"
            @click="today"
          />
          <UButton
            icon="i-lucide-chevron-right"
            color="neutral"
            variant="ghost"
            size="sm"
            @click="next"
          />
          <span class="ml-2 text-sm text-muted whitespace-nowrap">{{
            weekLabel
          }}</span>
        </div>
      </div>

      <!-- Row 2: filter badges + stats -->
      <div class="flex items-center justify-between">
        <div class="flex gap-2">
          <button
            v-for="level in ALL_LEVELS"
            :key="level"
            class="px-2.5 py-0.5 rounded text-label font-mono tracking-wide uppercase border transition-opacity"
            :class="[
              LEVEL_COLORS[level],
              activeFilters.has(level) ? 'opacity-100' : 'opacity-35',
            ]"
            @click="toggleFilter(level)"
          >
            {{ level }}
          </button>
        </div>
        <span class="text-sm text-muted">
          {{ visibleSessions.length }} sessions · {{ totalHours }} hours
        </span>
      </div>
    </div>

    <!-- Timetable -->
    <div class="flex-1 overflow-y-auto">
      <ScheduleTimetable
        :sessions="visibleSessions"
        :week-days="weekDays"
        @select="onSelect"
        @reschedule="reschedule"
      />
    </div>

    <!-- Session detail modal -->
    <ScheduleSessionModal
      v-model:open="isModalOpen"
      :session="selectedSession"
    />
  </div>
</template>
