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

function shortDate(iso: string | null): string {
  if (!iso) return '—';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(iso));
}
</script>

<template>
  <div class="bg-elevated border border-default rounded-xl overflow-hidden">
    <div class="px-5 py-4 border-b border-muted">
      <h2 class="text-subhead font-semibold text-default">All batches</h2>
      <p class="text-label font-mono tracking-widest uppercase text-dimmed mt-0.5">
        Compact view · respects current filters
      </p>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-muted">
            <th
              class="text-left px-5 py-2.5 text-label font-mono tracking-loose uppercase text-dimmed font-normal"
            >
              Batch
            </th>
            <th
              class="text-left px-5 py-2.5 text-label font-mono tracking-loose uppercase text-dimmed font-normal"
            >
              Course
            </th>
            <th
              class="text-left px-5 py-2.5 text-label font-mono tracking-loose uppercase text-dimmed font-normal"
            >
              Code
            </th>
            <th
              class="text-left px-5 py-2.5 text-label font-mono tracking-loose uppercase text-dimmed font-normal"
            >
              Instructor
            </th>
            <th
              class="text-left px-5 py-2.5 text-label font-mono tracking-loose uppercase text-dimmed font-normal"
            >
              Start
            </th>
            <th
              class="text-left px-5 py-2.5 text-label font-mono tracking-loose uppercase text-dimmed font-normal"
            >
              End
            </th>
            <th
              class="text-left px-5 py-2.5 text-label font-mono tracking-loose uppercase text-dimmed font-normal"
            >
              Status
            </th>
            <th
              class="text-right px-5 py-2.5 text-label font-mono tracking-loose uppercase text-dimmed font-normal"
            >
              Enrolled
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-muted">
          <tr
            v-for="batch in batches"
            :key="batch.id"
            class="hover:bg-muted/50 transition-colors"
          >
            <td class="px-5 py-3 font-medium text-default">
              {{ batch.batch_name }}
            </td>
            <td class="px-5 py-3 text-muted">{{ batch.course_name }}</td>
            <td class="px-5 py-3 font-mono text-muted">
              {{ batch.batch_code }}
            </td>
            <td class="px-5 py-3 text-muted">
              {{ batch.instructor_name ?? '—' }}
            </td>
            <td class="px-5 py-3 text-muted">
              {{ shortDate(batch.start_date) }}
            </td>
            <td class="px-5 py-3 text-muted">
              {{ shortDate(batch.end_date) }}
            </td>
            <td class="px-5 py-3">
              <span
                class="inline-flex items-center gap-1 px-2 py-0.5 text-label font-mono tracking-wide uppercase rounded"
                :class="STATUS_STYLE[batch.status]"
              >
                <span
                  class="size-1.5 rounded-full"
                  :class="STATUS_DOT[batch.status]"
                />
                {{ batch.status }}
              </span>
            </td>
            <td class="px-5 py-3 text-right font-semibold text-default">
              {{ batch.enrolled_count }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
