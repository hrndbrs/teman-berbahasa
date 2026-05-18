<script setup lang="ts">
defineProps<{ items: ActivityItem[] }>();

const dotClass: Record<ActivityColor, string> = {
  success: 'bg-success-500',
  info: 'bg-info-500',
  error: 'bg-error-500',
  warning: 'bg-warning-500',
  neutral: 'bg-accented',
};
</script>

<template>
  <DashboardCard
    title="Recent"
    emphasis="activity"
    subtitle="Last 24 hours"
    to="/dashboard"
    link-label="All"
  >
    <ul class="divide-y divide-muted">
      <li
        v-for="item in items"
        :key="item.actor + item.time"
        class="flex items-start gap-3 px-5 py-3"
      >
        <span
          class="mt-1.5 size-2 shrink-0 rounded-full"
          :class="dotClass[item.color]"
        />
        <div class="min-w-0 flex-1">
          <p class="text-body-sm text-default">
            <span class="font-medium">{{ item.actor }}</span>
            {{ ' ' }}{{ item.action }}
          </p>
        </div>
        <span class="shrink-0 text-caption text-dimmed whitespace-nowrap">
          {{ item.time }}
        </span>
      </li>
    </ul>
  </DashboardCard>
</template>
