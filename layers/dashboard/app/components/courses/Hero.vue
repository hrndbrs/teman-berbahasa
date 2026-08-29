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
    class="from-primary-950 via-primary-900 to-primary-800 dark:from-primary-50 dark:via-primary-100 dark:to-primary-200 relative overflow-hidden rounded-xl bg-linear-to-br p-6"
  >
    <div
      class="pointer-events-none absolute -top-10 -right-10 size-44 rounded-full border border-white/5"
    />
    <div
      class="pointer-events-none absolute -top-2 -right-2 size-28 rounded-full border border-white/3"
    />

    <div
      class="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"
    >
      <!-- Left: badges + title + description -->
      <div class="min-w-0 flex-1">
        <div class="mb-3 flex flex-wrap gap-2">
          <span
            class="text-label text-primary-200 dark:text-primary-700 rounded bg-white/10 px-2 py-0.5 font-mono tracking-wide uppercase"
          >
            {{ course.course_code }}
          </span>
          <span
            v-if="course.subject"
            class="text-label text-primary-200 dark:text-primary-700 rounded bg-white/10 px-2 py-0.5 font-mono tracking-wide uppercase"
          >
            {{ course.subject }}
          </span>
          <span
            class="text-label flex items-center gap-1 rounded px-2 py-0.5 font-mono tracking-wide uppercase"
            :class="
              course.status === 'active'
                ? 'bg-success-500/20 text-success-300 ring-success-500/30 ring-1'
                : 'text-primary-300 bg-white/10'
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
          class="mb-2 text-2xl leading-tight font-bold text-white sm:text-3xl"
        >
          {{ course.course_name }}
        </h1>

        <p
          v-if="course.description"
          class="text-primary-300 dark:text-primary-600 text-sm leading-relaxed"
        >
          {{ course.description }}
        </p>
      </div>

      <!-- Right: meta + actions -->
      <div
        class="flex shrink-0 flex-row items-end justify-between gap-4 sm:flex-col sm:items-end sm:justify-start"
      >
        <div class="flex gap-4 sm:flex-col sm:gap-3 sm:text-right">
          <div v-if="course.price">
            <p
              class="text-label tracking-loose text-primary-400 dark:text-primary-500 mb-0.5 font-mono uppercase"
            >
              Price
            </p>
            <p class="text-base font-bold text-white">
              {{ formatPrice(course.price) }}
            </p>
          </div>
          <div v-if="course.level">
            <p
              class="text-label tracking-loose text-primary-400 dark:text-primary-500 mb-0.5 font-mono uppercase"
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
            class="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white transition-colors hover:bg-white/20"
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
            class="bg-warning-500/15 hover:bg-warning-500/25 text-warning-300 border-warning-500/30 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition-colors"
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
