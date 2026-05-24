<script setup lang="ts">
definePageMeta({ layout: 'dashboard' });
useSeoMeta({ title: 'Schedule — Teman Berbahasa', robots: 'noindex' });

const {
  ALL_LEVELS,
  LEVEL_COLORS,
  loading,
  error,
  visibleSessions,
  weekDays,
  weekLabel,
  totalHours,
  activeFilters,
  toggleFilter,
  prev,
  next,
  today,
  selectedSession,
  selectedRawSession,
  isDetailModalOpen,
  isCreateModalOpen,
  editingScheduleId,
  createBatchId,
  isOverrideModalOpen,
  overrideScheduleId,
  overrideDate,
  overrideId,
  isAdmin,
  onSelect,
  openCreate,
  openEdit,
  onSaved,
  onDelete,
  openAddOverride,
  openEditOverride,
  onSavedOverride,
  onDeleteOverride,
} = useSchedulesPage();
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <!-- Loading skeleton -->
    <template v-if="loading">
      <div class="px-6 pt-6 pb-4 border-b border-muted shrink-0 space-y-4">
        <div class="flex items-start justify-between">
          <div class="space-y-2">
            <USkeleton class="h-3 w-20 rounded" />
            <USkeleton class="h-10 w-64 rounded-lg" />
            <USkeleton class="h-4 w-72 rounded" />
          </div>
          <div class="flex gap-1.5">
            <USkeleton
              v-for="i in 3"
              :key="i"
              class="size-8 rounded-lg"
            />
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex gap-2">
            <USkeleton
              v-for="i in 5"
              :key="i"
              class="h-5 w-16 rounded"
            />
          </div>
          <USkeleton class="h-4 w-32 rounded" />
        </div>
      </div>
      <div class="flex-1 p-6">
        <USkeleton class="h-full w-full rounded-xl" />
      </div>
    </template>

    <!-- Error state -->
    <template v-else-if="error">
      <div class="p-6">
        <UAlert
          color="error"
          variant="subtle"
          :description="error"
        />
      </div>
    </template>

    <!-- Content -->
    <template v-else>
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
              Click a class block for details.
            </p>
          </div>
          <div class="flex items-center gap-2 shrink-0 mt-1">
            <UButton
              v-if="isAdmin"
              label="Tambah Jadwal"
              icon="i-lucide-plus"
              size="sm"
              @click="openCreate()"
            />
            <div class="flex items-center gap-1.5">
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
        />
      </div>

      <!-- Session detail modal -->
      <ScheduleSessionModal
        v-model:open="isDetailModalOpen"
        :session="selectedSession"
        :raw-session="selectedRawSession"
        @edit="openEdit"
        @delete="onDelete"
        @add-override="
          ({ scheduleId, originalDate }) =>
            openAddOverride(scheduleId, originalDate)
        "
        @edit-override="
          ({ overrideId: oid, scheduleId, originalDate }) =>
            openEditOverride(oid, scheduleId, originalDate)
        "
        @delete-override="onDeleteOverride"
      />

      <!-- Schedule create/edit modal -->
      <ScheduleFormModal
        key="create"
        v-model:open="isCreateModalOpen"
        :schedule-id="editingScheduleId"
        :batch-id="createBatchId"
        @saved="onSaved"
      />

      <!-- Override create/edit modal -->
      <ScheduleOverrideFormModal
        key="override"
        v-model:open="isOverrideModalOpen"
        :schedule-id="overrideScheduleId"
        :original-date="overrideDate"
        :override-id="overrideId"
        @saved="onSavedOverride"
      />
    </template>
  </div>
</template>
