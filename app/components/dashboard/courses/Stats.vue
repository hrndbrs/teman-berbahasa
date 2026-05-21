<script setup lang="ts">
defineProps<{
  course: ApiCourseWithStats;
  enrollmentPct: number | null;
}>();
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <!-- Enrollment -->
    <div class="col-span-2 md:col-span-1 bg-elevated border border-default rounded-xl p-5">
      <div class="flex items-center gap-2 mb-3">
        <UIcon
          name="i-lucide-users"
          class="size-4 text-muted"
        />
        <p class="text-label font-mono tracking-loose uppercase text-dimmed">
          Enrolled
        </p>
      </div>
      <div class="flex items-baseline gap-1.5 mb-2">
        <span class="text-3xl font-bold text-default leading-none">
          {{ course.enrolled_count }}
        </span>
        <span
          v-if="course.max_capacity"
          class="text-sm text-muted"
        >
          / {{ course.max_capacity }}
        </span>
      </div>
      <template v-if="enrollmentPct !== null">
        <div class="h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            class="h-full rounded-full bg-primary transition-all"
            :style="{ width: enrollmentPct + '%' }"
          />
        </div>
        <p class="text-xs text-dimmed mt-1">{{ enrollmentPct }}% capacity</p>
      </template>
    </div>

    <!-- Batches -->
    <div class="bg-elevated border border-default rounded-xl p-5">
      <div class="flex items-center gap-2 mb-3">
        <UIcon
          name="i-lucide-layers"
          class="size-4 text-muted"
        />
        <p class="text-label font-mono tracking-loose uppercase text-dimmed">
          Batches
        </p>
      </div>
      <span class="text-3xl font-bold text-default leading-none">
        {{ course.batch_count }}
      </span>
    </div>

    <!-- Ongoing -->
    <div
      class="bg-success-50 dark:bg-success-950/50 border border-success-200 dark:border-success-900 rounded-xl p-5"
    >
      <div class="flex items-center gap-2 mb-3">
        <UIcon
          name="i-lucide-play-circle"
          class="size-4 text-success-600 dark:text-success-400"
        />
        <p
          class="text-label font-mono tracking-loose uppercase text-success-700 dark:text-success-500"
        >
          Ongoing
        </p>
      </div>
      <span
        class="text-3xl font-bold leading-none text-success-700 dark:text-success-400"
      >
        {{ course.ongoing_batch_count }}
      </span>
    </div>

    <!-- Sessions -->
    <div class="bg-elevated border border-default rounded-xl p-5">
      <div class="flex items-center gap-2 mb-3">
        <UIcon
          name="i-lucide-calendar"
          class="size-4 text-muted"
        />
        <p class="text-label font-mono tracking-loose uppercase text-dimmed">
          Sessions
        </p>
      </div>
      <span class="text-3xl font-bold text-default leading-none">
        {{ course.session_count ?? '—' }}
      </span>
    </div>
  </div>
</template>
