<script setup lang="ts">
defineProps<{ batches: ApiBatch[] }>();

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
</script>

<template>
  <div class="bg-elevated border-default overflow-hidden rounded-xl border">
    <div class="border-muted border-b px-5 py-4">
      <h2 class="text-subhead text-default font-semibold">All batches</h2>
      <p
        class="text-label text-dimmed mt-0.5 font-mono tracking-widest uppercase"
      >
        Compact view · respects current filters
      </p>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-muted border-b">
            <th
              class="text-label tracking-loose text-dimmed px-5 py-2.5 text-left font-mono font-normal uppercase"
            >
              Batch
            </th>
            <th
              class="text-label tracking-loose text-dimmed px-5 py-2.5 text-left font-mono font-normal uppercase"
            >
              Course
            </th>
            <th
              class="text-label tracking-loose text-dimmed px-5 py-2.5 text-left font-mono font-normal uppercase"
            >
              Code
            </th>
            <th
              class="text-label tracking-loose text-dimmed px-5 py-2.5 text-left font-mono font-normal uppercase"
            >
              Instructor
            </th>
            <th
              class="text-label tracking-loose text-dimmed px-5 py-2.5 text-left font-mono font-normal uppercase"
            >
              Year
            </th>
            <th
              class="text-label tracking-loose text-dimmed px-5 py-2.5 text-left font-mono font-normal uppercase"
            >
              Status
            </th>
            <th
              class="text-label tracking-loose text-dimmed px-5 py-2.5 text-right font-mono font-normal uppercase"
            >
              Enrolled
            </th>
          </tr>
        </thead>
        <tbody class="divide-muted divide-y">
          <tr
            v-for="batch in batches"
            :key="batch.id"
            class="hover:bg-muted/50 transition-colors"
          >
            <td class="text-default px-5 py-3 font-medium">
              {{ batch.batch_name }}
            </td>
            <td class="text-muted px-5 py-3">{{ batch.course.course_name }}</td>
            <td class="text-muted px-5 py-3 font-mono">
              {{ batch.batch_code }}
            </td>
            <td class="text-muted px-5 py-3">
              {{ batch.instructor.first_name }} {{ batch.instructor.last_name }}
            </td>
            <td class="text-muted px-5 py-3">
              {{ batch.academic_year ?? '—' }}
            </td>
            <td class="px-5 py-3">
              <span
                class="text-label inline-flex items-center gap-1 rounded px-2 py-0.5 font-mono tracking-wide uppercase"
                :class="STATUS_STYLE[batch.status]"
              >
                <span
                  class="size-1.5 rounded-full"
                  :class="STATUS_DOT[batch.status]"
                />
                {{ batch.status }}
              </span>
            </td>
            <td class="text-default px-5 py-3 text-right font-semibold">
              {{ batch.enrolled_count }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
