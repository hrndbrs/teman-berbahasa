<script setup lang="ts">
const props = defineProps<{ batch: ApiBatch }>();

const STATUS_LABEL: Record<ApiBatchStatus, string> = {
  ongoing: 'Ongoing',
  upcoming: 'Upcoming',
  completed: 'Completed',
};

const STATUS_STYLE: Record<ApiBatchStatus, string> = {
  ongoing:
    'bg-success-50 text-success-700 dark:bg-success-950 dark:text-success-400',
  upcoming:
    'bg-warning-50 text-warning-700 dark:bg-warning-950 dark:text-warning-400',
  completed: 'bg-muted text-dimmed',
};

const STATUS_DOT: Record<ApiBatchStatus, string> = {
  ongoing: 'bg-success-500',
  upcoming: 'bg-warning-500',
  completed: 'bg-dimmed',
};

const PROGRESS_PCT: Record<ApiBatchStatus, number> = {
  upcoming: 0,
  ongoing: 50,
  completed: 100,
};

const PROGRESS_BAR: Record<ApiBatchStatus, string> = {
  upcoming: 'bg-warning-400',
  ongoing: 'bg-primary',
  completed: 'bg-success-500',
};

const progressPct = computed(() => PROGRESS_PCT[props.batch.status]);
const progressBar = computed(() => PROGRESS_BAR[props.batch.status]);
</script>

<template>
  <div
    class="bg-elevated border-default hover:border-accented flex flex-col rounded-xl border p-5 transition-all hover:shadow-sm"
  >
    <!-- Top row: badges + enrolled count -->
    <div class="mb-3 flex items-start justify-between">
      <div class="flex flex-wrap items-center gap-2">
        <span
          class="text-label border-default text-muted bg-muted rounded border px-2 py-0.5 font-mono tracking-wide uppercase"
        >
          {{ batch.course.course_code }}
        </span>
        <span
          class="text-label border-default text-muted bg-muted rounded border px-2 py-0.5 font-mono tracking-wide uppercase"
        >
          {{ batch.batch_code }}
        </span>
        <span
          class="text-label flex items-center gap-1 rounded px-2 py-0.5 font-mono tracking-wide uppercase"
          :class="STATUS_STYLE[batch.status]"
        >
          <span
            class="size-1.5 rounded-full"
            :class="STATUS_DOT[batch.status]"
          />
          {{ STATUS_LABEL[batch.status] }}
        </span>
      </div>
      <div class="ml-3 shrink-0 text-right">
        <span class="text-default text-3xl leading-none font-bold">
          {{ batch.enrolled_count }}
        </span>
        <p
          class="text-label tracking-loose text-dimmed mt-0.5 font-mono uppercase"
        >
          Enrolled
        </p>
      </div>
    </div>

    <!-- Name + course -->
    <h2 class="text-default mb-0.5 text-lg leading-snug font-bold">
      {{ batch.batch_name }}
    </h2>
    <p class="text-muted mb-4 text-sm">{{ batch.course.course_name }}</p>

    <!-- Instructor + academic year -->
    <div class="mb-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div
          class="bg-primary/10 flex size-7 shrink-0 items-center justify-center rounded-full"
        >
          <span class="text-primary text-[0.6rem] font-bold uppercase">
            {{ batch.instructor.first_name[0]
            }}{{ batch.instructor.last_name[0] }}
          </span>
        </div>
        <div>
          <p class="text-default text-sm leading-none font-medium">
            {{ batch.instructor.first_name }} {{ batch.instructor.last_name }}
          </p>
          <p
            class="text-label tracking-loose text-dimmed mt-0.5 font-mono uppercase"
          >
            Instructor
          </p>
        </div>
      </div>
      <div
        v-if="batch.academic_year"
        class="text-right"
      >
        <p class="text-label tracking-loose text-dimmed font-mono uppercase">
          Academic Year
        </p>
        <p class="text-default text-sm font-semibold">
          {{ batch.academic_year }}
        </p>
      </div>
    </div>

    <!-- Progress bar -->
    <div class="mt-auto">
      <div class="bg-muted h-1.5 overflow-hidden rounded-full">
        <div
          class="h-full rounded-full transition-all"
          :class="progressBar"
          :style="{ width: progressPct + '%' }"
        />
      </div>
    </div>
  </div>
</template>
