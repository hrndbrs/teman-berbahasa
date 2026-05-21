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
    class="bg-elevated border border-default rounded-xl p-5 flex flex-col hover:border-accented hover:shadow-sm transition-all"
  >
    <!-- Top row: badges + enrolled count -->
    <div class="flex items-start justify-between mb-3">
      <div class="flex items-center gap-2 flex-wrap">
        <span
          class="px-2 py-0.5 text-label font-mono tracking-wide uppercase rounded border border-default text-muted bg-muted"
        >
          {{ batch.course.course_code }}
        </span>
        <span
          class="px-2 py-0.5 text-label font-mono tracking-wide uppercase rounded border border-default text-muted bg-muted"
        >
          {{ batch.batch_code }}
        </span>
        <span
          class="flex items-center gap-1 px-2 py-0.5 text-label font-mono tracking-wide uppercase rounded"
          :class="STATUS_STYLE[batch.status]"
        >
          <span
            class="size-1.5 rounded-full"
            :class="STATUS_DOT[batch.status]"
          />
          {{ STATUS_LABEL[batch.status] }}
        </span>
      </div>
      <div class="text-right shrink-0 ml-3">
        <span class="text-3xl font-bold text-default leading-none">
          {{ batch.enrolled_count }}
        </span>
        <p class="text-label font-mono tracking-loose uppercase text-dimmed mt-0.5">
          Enrolled
        </p>
      </div>
    </div>

    <!-- Name + course -->
    <h2 class="text-lg font-bold text-default leading-snug mb-0.5">
      {{ batch.batch_name }}
    </h2>
    <p class="text-sm text-muted mb-4">{{ batch.course.course_name }}</p>

    <!-- Instructor + academic year -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <div
          class="size-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0"
        >
          <span class="text-[0.6rem] font-bold text-primary uppercase">
            {{ batch.instructor.first_name[0] }}{{ batch.instructor.last_name[0] }}
          </span>
        </div>
        <div>
          <p class="text-sm font-medium text-default leading-none">
            {{ batch.instructor.first_name }} {{ batch.instructor.last_name }}
          </p>
          <p
            class="text-label font-mono tracking-loose uppercase text-dimmed mt-0.5"
          >
            Instructor
          </p>
        </div>
      </div>
      <div
        v-if="batch.academic_year"
        class="text-right"
      >
        <p class="text-label font-mono tracking-loose uppercase text-dimmed">
          Academic Year
        </p>
        <p class="text-sm font-semibold text-default">
          {{ batch.academic_year }}
        </p>
      </div>
    </div>

    <!-- Progress bar -->
    <div class="mt-auto">
      <div class="h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          class="h-full rounded-full transition-all"
          :class="progressBar"
          :style="{ width: progressPct + '%' }"
        />
      </div>
    </div>
  </div>
</template>
