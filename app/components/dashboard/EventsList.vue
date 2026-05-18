<script setup lang="ts">
defineProps<{ events: UpcomingEvent[] }>();

const badgeClass: Record<EventType, string> = {
  MEETING: 'bg-accented text-muted',
  WORKSHOP: 'bg-success-100 text-success-700',
  HOLIDAY: 'bg-warning-100 text-warning-700',
};
</script>

<template>
  <DashboardCard
    title="Upcoming"
    emphasis="events"
    :subtitle="`${events.length} in the next two weeks`"
    to="/dashboard/events"
    link-label="Calendar"
  >
    <ul class="divide-y divide-muted">
      <li
        v-for="event in events"
        :key="event.day + event.title"
        class="flex items-start gap-4 px-5 py-3.5"
      >
        <div class="flex w-10 shrink-0 flex-col items-center text-center">
          <span class="text-xl font-bold leading-none text-default">{{
            event.day
          }}</span>
          <span
            class="text-2xs font-mono tracking-widest uppercase text-dimmed"
            >{{ event.month }}</span
          >
        </div>
        <div class="min-w-0 flex-1">
          <span
            class="mb-1 inline-flex items-center rounded px-1.5 py-0.5 text-2xs font-mono font-semibold tracking-loose uppercase"
            :class="badgeClass[event.type]"
          >
            {{ event.type }}
          </span>
          <p class="text-body-sm font-medium text-default">{{ event.title }}</p>
          <p class="text-caption text-dimmed">
            {{ event.time }} · {{ event.location }}
          </p>
        </div>
      </li>
    </ul>
  </DashboardCard>
</template>
