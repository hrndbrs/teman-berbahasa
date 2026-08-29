<script setup lang="ts">
const props = defineProps<{
  course: ApiCourseWithStats;
  isAdmin: boolean;
}>();

const emit = defineEmits<{
  edit: [];
  archive: [];
}>();

const LEVEL_LABELS: Record<ApiCourseLevel, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

const LEVEL_COLORS: Record<ApiCourseLevel, string> = {
  beginner: 'text-success-600 dark:text-success-400',
  intermediate: 'text-warning-600 dark:text-warning-400',
  advanced: 'text-error-600 dark:text-error-400',
};

const RING_R = 18;
const RING_C = 2 * Math.PI * RING_R;

const ringOffset = computed(() => {
  const { enrolled_count, max_capacity } = props.course;
  if (!max_capacity) return RING_C;
  const progress = Math.min(enrolled_count / max_capacity, 1);
  return RING_C * (1 - progress);
});

function formatPrice(price: string | null): string {
  if (!price) return '—';
  const num = parseFloat(price);
  if (isNaN(num)) return price;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(num);
}

const dropdownItems = computed(() => [
  [{ label: 'Edit', icon: 'i-lucide-pencil', onSelect: () => emit('edit') }],
  [
    {
      label: 'Arsipkan',
      icon: 'i-lucide-archive',
      color: 'warning' as const,
      disabled: props.course.status === 'archived',
      onSelect: () => emit('archive'),
    },
  ],
]);
</script>

<template>
  <div
    class="group bg-elevated border-default hover:border-accented flex flex-col rounded-xl border p-5 transition-all hover:shadow-sm"
  >
    <!-- Top: badges + enrollment ring -->
    <div class="mb-3 flex items-start justify-between">
      <div class="flex flex-wrap items-center gap-2">
        <span
          class="text-label border-default text-muted bg-muted rounded border px-2 py-0.5 font-mono tracking-wide uppercase"
        >
          {{ course.course_code }}
        </span>
        <span
          class="text-label flex items-center gap-1 rounded px-2 py-0.5 font-mono tracking-wide uppercase"
          :class="
            course.status === 'active'
              ? 'bg-success-50 text-success-600 dark:bg-success-950 dark:text-success-400'
              : 'bg-muted text-dimmed'
          "
        >
          <span
            class="size-1.5 rounded-full"
            :class="course.status === 'active' ? 'bg-success-500' : 'bg-dimmed'"
          />
          {{ course.status === 'active' ? 'Active' : 'Archived' }}
        </span>
      </div>

      <div class="relative shrink-0">
        <svg
          :width="RING_R * 2 + 8"
          :height="RING_R * 2 + 8"
          class="-rotate-90"
        >
          <circle
            :cx="RING_R + 4"
            :cy="RING_R + 4"
            :r="RING_R"
            fill="none"
            class="stroke-(--ui-border-muted)"
            stroke-width="3"
          />
          <circle
            v-if="course.max_capacity"
            :cx="RING_R + 4"
            :cy="RING_R + 4"
            :r="RING_R"
            fill="none"
            class="stroke-primary"
            stroke-width="3"
            stroke-linecap="round"
            :stroke-dasharray="RING_C"
            :stroke-dashoffset="ringOffset"
          />
        </svg>
        <div class="absolute inset-0 flex items-center justify-center">
          <span
            class="text-muted text-center font-mono text-[0.5rem] leading-none"
          >
            {{ course.enrolled_count }}<br />
            <span class="text-dimmed">/{{ course.max_capacity ?? '∞' }}</span>
          </span>
        </div>
      </div>
    </div>

    <!-- Title + description -->
    <h2 class="text-default mb-1 text-base leading-snug font-bold">
      {{ course.course_name }}
    </h2>
    <p class="text-muted mb-4 line-clamp-2 flex-1 text-sm">
      {{ course.description ?? '—' }}
    </p>

    <!-- Detail rows -->
    <dl class="border-muted space-y-2 border-t pt-3">
      <div class="flex items-baseline justify-between">
        <dt class="text-label tracking-loose text-dimmed font-mono uppercase">
          Level
        </dt>
        <dd
          class="text-sm font-medium"
          :class="course.level ? LEVEL_COLORS[course.level] : 'text-dimmed'"
        >
          {{ course.level ? LEVEL_LABELS[course.level] : '—' }}
        </dd>
      </div>
      <div class="flex items-baseline justify-between">
        <dt class="text-label tracking-loose text-dimmed font-mono uppercase">
          Sessions
        </dt>
        <dd class="text-default text-sm font-semibold">
          {{ course.session_count ?? '—' }}
        </dd>
      </div>
      <div class="flex items-baseline justify-between">
        <dt class="text-label tracking-loose text-dimmed font-mono uppercase">
          Price
        </dt>
        <dd class="text-default text-sm font-semibold">
          {{ formatPrice(course.price) }}
        </dd>
      </div>
      <div class="flex items-baseline justify-between">
        <dt class="text-label tracking-loose text-dimmed font-mono uppercase">
          Enrolled
        </dt>
        <dd class="text-default text-sm font-semibold">
          {{ course.enrolled_count }} / {{ course.max_capacity ?? '∞' }}
        </dd>
      </div>
    </dl>

    <!-- Footer -->
    <div
      class="border-muted mt-3 flex items-center justify-between border-t pt-3"
    >
      <span class="text-label tracking-loose text-dimmed font-mono uppercase">
        Batches
        <span class="text-default font-semibold">{{ course.batch_count }}</span>
        <span v-if="course.ongoing_batch_count > 0">
          ·
          <span class="text-success-600 dark:text-success-400"
            >{{ course.ongoing_batch_count }} ongoing</span
          >
        </span>
      </span>

      <div class="flex items-center gap-1">
        <UDropdownMenu
          v-if="isAdmin"
          :items="dropdownItems"
        >
          <UButton
            icon="i-lucide-more-horizontal"
            color="neutral"
            variant="ghost"
            size="xs"
          />
        </UDropdownMenu>
        <NuxtLink :to="`/dashboard/courses/${course.id}`">
          <UButton
            icon="i-lucide-arrow-right"
            color="neutral"
            variant="ghost"
            size="xs"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
