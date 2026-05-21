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
  <DashboardCard title="Course Info">
    <div class="px-5 py-4 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5">
      <div>
        <dt class="text-label font-mono tracking-loose uppercase text-dimmed mb-1">
          Subject
        </dt>
        <dd class="text-sm font-medium text-default">
          {{ course.subject ?? '—' }}
        </dd>
      </div>
      <div>
        <dt class="text-label font-mono tracking-loose uppercase text-dimmed mb-1">
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
        <dt class="text-label font-mono tracking-loose uppercase text-dimmed mb-1">
          Price
        </dt>
        <dd class="text-sm font-semibold text-default">
          {{ formatPrice(course.price) }}
        </dd>
      </div>
      <div>
        <dt class="text-label font-mono tracking-loose uppercase text-dimmed mb-1">
          Max Capacity
        </dt>
        <dd class="text-sm font-semibold text-default">
          {{ course.max_capacity ?? '—' }}
        </dd>
      </div>
    </div>
  </DashboardCard>
</template>
