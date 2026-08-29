<script setup lang="ts">
const props = defineProps<{ classes: ClassSession[] }>();

const subtitle = computed(
  () =>
    `${props.classes.length} ${props.classes.length === 1 ? 'session' : 'sessions'}`
);
</script>

<template>
  <CommonCard
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
              class="text-label tracking-loose text-dimmed border-muted bg-muted border-b px-5 py-2.5 text-left font-mono uppercase"
            >
              Time
            </th>
            <th
              class="text-label tracking-loose text-dimmed border-muted bg-muted border-b px-3 py-2.5 text-left font-mono uppercase"
            >
              Course
            </th>
            <th
              class="text-label tracking-loose text-dimmed border-muted bg-muted border-b px-3 py-2.5 text-left font-mono uppercase"
            >
              Instructor
            </th>
            <th
              class="text-label tracking-loose text-dimmed border-muted bg-muted border-b px-3 py-2.5 text-left font-mono uppercase"
            >
              Room
            </th>
            <th
              class="text-label tracking-loose text-dimmed border-muted bg-muted border-b px-5 py-2.5 text-right font-mono uppercase"
            >
              Attending
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="cls in classes"
            :key="cls.code"
            class="border-muted hover:bg-muted border-b transition-colors last:border-0"
          >
            <td class="text-body-sm text-muted px-5 py-3 whitespace-nowrap">
              {{ cls.timeStart }} →<br />{{ cls.timeEnd }}
            </td>
            <td class="px-3 py-3">
              <div class="flex items-center gap-2">
                <span
                  class="border-default bg-muted text-label text-muted inline-flex items-center rounded border px-1.5 py-0.5 font-mono tracking-wide uppercase"
                >
                  {{ cls.code }}
                </span>
                <span class="text-body-sm text-default font-medium">{{
                  cls.course
                }}</span>
              </div>
            </td>
            <td class="text-body-sm text-muted px-3 py-3">
              {{ cls.instructor }}
            </td>
            <td class="text-body-sm text-muted px-3 py-3">{{ cls.room }}</td>
            <td
              class="text-body-sm text-default px-5 py-3 text-right font-mono"
            >
              {{ cls.attending }}/{{ cls.capacity }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </CommonCard>
</template>
