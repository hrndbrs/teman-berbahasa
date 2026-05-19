<script setup lang="ts">
defineProps<{ courses: CourseLoadItem[] }>();
</script>

<template>
  <DashboardCard
    title="Course"
    emphasis="load"
    subtitle="Capacity utilization across active courses"
    to="/dashboard/courses"
    link-label="Manage"
  >
    <ul class="divide-y divide-muted overflow-x-scroll">
      <li
        v-for="course in courses"
        :key="course.code"
        class="flex items-center gap-4 px-5 py-3"
      >
        <span
          class="w-16 shrink-0 font-mono text-label tracking-wide uppercase text-dimmed"
        >
          {{ course.code }}
        </span>
        <span class="w-52 shrink-0 text-body-sm font-medium text-default">{{
          course.name
        }}</span>
        <div class="flex-1 min-w-0">
          <div class="h-1.5 w-full overflow-hidden rounded-full bg-accented">
            <div
              class="h-full rounded-full transition-all"
              :class="loadBarColor(loadPct(course.attending, course.capacity))"
              :style="{
                width: `${loadPct(course.attending, course.capacity)}%`,
              }"
            />
          </div>
        </div>
        <span
          class="w-12 shrink-0 text-right font-mono text-body-sm text-muted"
        >
          {{ course.attending }}/{{ course.capacity }}
        </span>
        <span
          class="w-10 shrink-0 text-right font-mono text-body-sm"
          :class="loadPctColor(loadPct(course.attending, course.capacity))"
        >
          {{ loadPct(course.attending, course.capacity) }}%
        </span>
      </li>
    </ul>
  </DashboardCard>
</template>
