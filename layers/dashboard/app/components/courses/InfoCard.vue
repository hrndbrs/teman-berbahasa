<script setup lang="ts">
defineProps<{
  course: ApiCourseWithStats;
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
</script>

<template>
  <CommonCard title="Course Info">
    <div class="grid grid-cols-2 gap-x-6 gap-y-5 px-5 py-4 md:grid-cols-4">
      <div>
        <dt
          class="text-label tracking-loose text-dimmed mb-1 font-mono uppercase"
        >
          Subject
        </dt>
        <dd class="text-default text-sm font-medium">
          {{ course.subject ?? '—' }}
        </dd>
      </div>
      <div>
        <dt
          class="text-label tracking-loose text-dimmed mb-1 font-mono uppercase"
        >
          Level
        </dt>
        <dd
          class="text-sm font-medium"
          :class="course.level ? LEVEL_COLORS[course.level] : 'text-dimmed'"
        >
          {{ course.level ? LEVEL_LABELS[course.level] : '—' }}
        </dd>
      </div>
      <div>
        <dt
          class="text-label tracking-loose text-dimmed mb-1 font-mono uppercase"
        >
          Price
        </dt>
        <dd class="text-default text-sm font-semibold">
          {{ formatPrice(course.price) }}
        </dd>
      </div>
      <div>
        <dt
          class="text-label tracking-loose text-dimmed mb-1 font-mono uppercase"
        >
          Max Capacity
        </dt>
        <dd class="text-default text-sm font-semibold">
          {{ course.max_capacity ?? '—' }}
        </dd>
      </div>
    </div>
  </CommonCard>
</template>
