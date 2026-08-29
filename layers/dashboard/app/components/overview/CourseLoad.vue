<script setup lang="ts">
defineProps<{ courses: CourseLoadItem[] }>();
</script>

<template>
  <CommonCard
    title="Course"
    emphasis="load"
    subtitle="Capacity utilization across active courses"
    to="/dashboard/courses"
    link-label="Manage"
  >
    <ul class="divide-muted divide-y overflow-x-scroll">
      <li
        v-for="course in courses"
        :key="course.code"
        class="flex items-center gap-4 px-5 py-3"
      >
        <span
          class="text-label text-dimmed w-16 shrink-0 font-mono tracking-wide uppercase"
        >
          {{ course.code }}
        </span>
        <span class="text-body-sm text-default w-52 shrink-0 font-medium">{{
          course.name
        }}</span>
        <div class="min-w-0 flex-1">
          <div class="bg-accented h-1.5 w-full overflow-hidden rounded-full">
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
          class="text-body-sm text-muted w-12 shrink-0 text-right font-mono"
        >
          {{ course.attending }}/{{ course.capacity }}
        </span>
        <span
          class="text-body-sm w-10 shrink-0 text-right font-mono"
          :class="loadPctColor(loadPct(course.attending, course.capacity))"
        >
          {{ loadPct(course.attending, course.capacity) }}%
        </span>
      </li>
    </ul>
  </CommonCard>
</template>
