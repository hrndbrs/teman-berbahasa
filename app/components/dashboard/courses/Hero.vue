<script setup lang="ts">
defineProps<{
  course: ApiCourseWithStats;
  isAdmin: boolean;
}>();

const emit = defineEmits<{
  edit: [];
  archive: [];
}>();

const LEVEL_LABELS: Record<ApiCourseLevel, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

const LEVEL_COLORS: Record<ApiCourseLevel, string> = {
  beginner: 'text-success-300',
  intermediate: 'text-warning-300',
  advanced: 'text-error-300',
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
  <div
    class="rounded-xl bg-linear-to-br from-primary-950 via-primary-900 to-primary-800 dark:from-primary-50 dark:via-primary-100 dark:to-primary-200 p-6 relative overflow-hidden"
  >
    <div
      class="absolute -right-10 -top-10 size-44 rounded-full border border-white/5 pointer-events-none"
    />
    <div
      class="absolute -right-2 -top-2 size-28 rounded-full border border-white/3 pointer-events-none"
    />

    <div
      class="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"
    >
      <!-- Left: badges + title + description -->
      <div class="flex-1 min-w-0">
        <div class="flex flex-wrap gap-2 mb-3">
          <span
            class="px-2 py-0.5 text-label font-mono tracking-wide uppercase rounded bg-white/10 text-primary-200 dark:text-primary-700"
          >
            {{ course.course_code }}
          </span>
          <span
            v-if="course.subject"
            class="px-2 py-0.5 text-label font-mono tracking-wide uppercase rounded bg-white/10 text-primary-200 dark:text-primary-700"
          >
            {{ course.subject }}
          </span>
          <span
            class="flex items-center gap-1 px-2 py-0.5 text-label font-mono tracking-wide uppercase rounded"
            :class="
              course.status === 'active'
                ? 'bg-success-500/20 text-success-300 ring-1 ring-success-500/30'
                : 'bg-white/10 text-primary-300'
            "
          >
            <span
              class="size-1.5 rounded-full"
              :class="
                course.status === 'active' ? 'bg-success-400' : 'bg-primary-400'
              "
            />
            {{ course.status === 'active' ? 'Active' : 'Archived' }}
          </span>
        </div>

        <h1
          class="text-2xl sm:text-3xl font-bold text-white leading-tight mb-2"
        >
          {{ course.course_name }}
        </h1>

        <p
          v-if="course.description"
          class="text-sm text-primary-300 dark:text-primary-600 leading-relaxed"
        >
          {{ course.description }}
        </p>
      </div>

      <!-- Right: meta + actions -->
      <div
        class="flex flex-row items-end justify-between gap-4 sm:flex-col sm:items-end sm:justify-start shrink-0"
      >
        <div class="flex gap-4 sm:flex-col sm:gap-3 sm:text-right">
          <div v-if="course.price">
            <p
              class="text-label font-mono tracking-loose uppercase text-primary-400 dark:text-primary-500 mb-0.5"
            >
              Price
            </p>
            <p class="text-base font-bold text-white">
              {{ formatPrice(course.price) }}
            </p>
          </div>
          <div v-if="course.level">
            <p
              class="text-label font-mono tracking-loose uppercase text-primary-400 dark:text-primary-500 mb-0.5"
            >
              Level
            </p>
            <p
              class="text-sm font-semibold"
              :class="LEVEL_COLORS[course.level]"
            >
              {{ LEVEL_LABELS[course.level] }}
            </p>
          </div>
        </div>

        <div
          v-if="isAdmin"
          class="flex items-center gap-2"
        >
          <button
            class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
            @click="emit('edit')"
          >
            <UIcon
              name="i-lucide-pencil"
              class="size-4"
            />
            Edit
          </button>
          <button
            v-if="course.status === 'active'"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-warning-500/15 hover:bg-warning-500/25 text-warning-300 transition-colors border border-warning-500/30"
            @click="emit('archive')"
          >
            <UIcon
              name="i-lucide-archive"
              class="size-4"
            />
            Arsipkan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
