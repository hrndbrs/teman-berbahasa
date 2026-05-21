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

const progressPct = computed(() => {
  const { status, start_date, end_date } = props.batch;
  if (status === 'completed') return 100;
  if (status === 'upcoming' || !start_date || !end_date) return 0;
  const start = new Date(start_date).getTime();
  const end = new Date(end_date).getTime();
  const now = Date.now();
  if (now >= end) return 100;
  if (now <= start) return 0;
  return Math.round(((now - start) / (end - start)) * 100);
});

const progressLabel = computed(() => {
  const { status } = props.batch;
  if (status === 'upcoming') return 'starts soon';
  if (status === 'completed') return 'complete';
  return `${progressPct.value}% complete`;
});

function shortDate(iso: string | null): string {
  if (!iso) return '—';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(iso));
}
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
          {{ batch.course_code }}
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
    <p class="text-sm text-muted mb-4">{{ batch.course_name }}</p>

    <!-- Instructor + academic year -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <div
          class="size-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0"
        >
          <span class="text-[0.6rem] font-bold text-primary uppercase">
            {{ batch.instructor_initials ?? '?' }}
          </span>
        </div>
        <div>
          <p class="text-sm font-medium text-default leading-none">
            {{ batch.instructor_name ?? '—' }}
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
      <div class="flex items-center justify-between text-xs text-dimmed mb-1.5">
        <span>{{ shortDate(batch.start_date) }}</span>
        <span class="text-muted font-medium">{{ progressLabel }}</span>
        <span>{{ shortDate(batch.end_date) }}</span>
      </div>
      <div class="h-1 rounded-full bg-muted overflow-hidden">
        <div
          class="h-full rounded-full bg-primary transition-all"
          :style="{ width: progressPct + '%' }"
        />
      </div>
    </div>
  </div>
</template>
