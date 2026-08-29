<script setup lang="ts">
defineProps<{
  course: ApiCourseWithStats;
  enrollmentPct: number | null;
}>();
</script>

<template>
  <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
    <!-- Enrollment -->
    <div
      class="bg-elevated border-default col-span-2 rounded-xl border p-5 md:col-span-1"
    >
      <div class="mb-3 flex items-center gap-2">
        <UIcon
          name="i-lucide-users"
          class="text-muted size-4"
        />
        <p class="text-label tracking-loose text-dimmed font-mono uppercase">
          Enrolled
        </p>
      </div>
      <div class="mb-2 flex items-baseline gap-1.5">
        <span class="text-default text-3xl leading-none font-bold">
          {{ course.enrolled_count }}
        </span>
        <span
          v-if="course.max_capacity"
          class="text-muted text-sm"
        >
          / {{ course.max_capacity }}
        </span>
      </div>
      <template v-if="enrollmentPct !== null">
        <div class="bg-muted h-1.5 overflow-hidden rounded-full">
          <div
            class="bg-primary h-full rounded-full transition-all"
            :style="{ width: enrollmentPct + '%' }"
          />
        </div>
        <p class="text-dimmed mt-1 text-xs">{{ enrollmentPct }}% capacity</p>
      </template>
    </div>

    <!-- Batches -->
    <div class="bg-elevated border-default rounded-xl border p-5">
      <div class="mb-3 flex items-center gap-2">
        <UIcon
          name="i-lucide-layers"
          class="text-muted size-4"
        />
        <p class="text-label tracking-loose text-dimmed font-mono uppercase">
          Batches
        </p>
      </div>
      <span class="text-default text-3xl leading-none font-bold">
        {{ course.batch_count }}
      </span>
    </div>

    <!-- Ongoing -->
    <div
      class="bg-success-50 dark:bg-success-950/50 border-success-200 dark:border-success-900 rounded-xl border p-5"
    >
      <div class="mb-3 flex items-center gap-2">
        <UIcon
          name="i-lucide-play-circle"
          class="text-success-600 dark:text-success-400 size-4"
        />
        <p
          class="text-label tracking-loose text-success-700 dark:text-success-500 font-mono uppercase"
        >
          Ongoing
        </p>
      </div>
      <span
        class="text-success-700 dark:text-success-400 text-3xl leading-none font-bold"
      >
        {{ course.ongoing_batch_count }}
      </span>
    </div>

    <!-- Sessions -->
    <div class="bg-elevated border-default rounded-xl border p-5">
      <div class="mb-3 flex items-center gap-2">
        <UIcon
          name="i-lucide-calendar"
          class="text-muted size-4"
        />
        <p class="text-label tracking-loose text-dimmed font-mono uppercase">
          Sessions
        </p>
      </div>
      <span class="text-default text-3xl leading-none font-bold">
        {{ course.session_count ?? '—' }}
      </span>
    </div>
  </div>
</template>
