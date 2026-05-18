<script setup lang="ts">
const props = defineProps<{ classes: ClassSession[] }>();

const subtitle = computed(
  () =>
    `${props.classes.length} ${props.classes.length === 1 ? 'session' : 'sessions'}`
);
</script>

<template>
  <DashboardCard
    title="Today's"
    emphasis="classes"
    :subtitle
    to="/dashboard/schedules"
    link-label="Full schedule"
  >
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr>
            <th
              class="text-left px-5 py-2.5 text-label font-mono tracking-loose uppercase text-dimmed border-b border-muted bg-muted"
            >
              Time
            </th>
            <th
              class="text-left px-3 py-2.5 text-label font-mono tracking-loose uppercase text-dimmed border-b border-muted bg-muted"
            >
              Course
            </th>
            <th
              class="text-left px-3 py-2.5 text-label font-mono tracking-loose uppercase text-dimmed border-b border-muted bg-muted"
            >
              Instructor
            </th>
            <th
              class="text-left px-3 py-2.5 text-label font-mono tracking-loose uppercase text-dimmed border-b border-muted bg-muted"
            >
              Room
            </th>
            <th
              class="text-right px-5 py-2.5 text-label font-mono tracking-loose uppercase text-dimmed border-b border-muted bg-muted"
            >
              Attending
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="cls in classes"
            :key="cls.code"
            class="border-b border-muted last:border-0 hover:bg-muted transition-colors"
          >
            <td class="px-5 py-3 text-body-sm text-muted whitespace-nowrap">
              {{ cls.timeStart }} →<br />{{ cls.timeEnd }}
            </td>
            <td class="px-3 py-3">
              <div class="flex items-center gap-2">
                <span
                  class="inline-flex items-center rounded border border-default bg-muted px-1.5 py-0.5 font-mono text-label tracking-wide uppercase text-muted"
                >
                  {{ cls.code }}
                </span>
                <span class="text-body-sm font-medium text-default">{{
                  cls.course
                }}</span>
              </div>
            </td>
            <td class="px-3 py-3 text-body-sm text-muted">
              {{ cls.instructor }}
            </td>
            <td class="px-3 py-3 text-body-sm text-muted">{{ cls.room }}</td>
            <td
              class="px-5 py-3 text-right font-mono text-body-sm text-default"
            >
              {{ cls.attending }}/{{ cls.capacity }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </DashboardCard>
</template>
