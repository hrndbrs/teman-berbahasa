<script setup lang="ts">
const props = defineProps<{
  search: string;
  statusFilter: ApiBatchStatus | 'all';
  courseFilter: string;
  statusCounts: { all: number; ongoing: number; upcoming: number; completed: number };
  courseTabs: { code: string; count: number }[];
  shownCount: number;
  isAdmin: boolean;
}>();

const emit = defineEmits<{
  'update:search': [value: string];
  'update:statusFilter': [value: ApiBatchStatus | 'all'];
  'update:courseFilter': [value: string];
  create: [];
}>();

const STATUS_TABS = [
  { label: 'All', value: 'all' as const },
  { label: 'ongoing', value: 'ongoing' as const },
  { label: 'upcoming', value: 'upcoming' as const },
  { label: 'completed', value: 'completed' as const },
] as const;

function statusCount(v: ApiBatchStatus | 'all') {
  return props.statusCounts[v];
}
</script>

<template>
  <div class="px-6 pt-6 pb-4 border-b border-muted shrink-0 space-y-4">
    <!-- Title row -->
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-label font-mono tracking-looser uppercase text-dimmed mb-1">
          Cohorts
        </p>
        <h1 class="text-4xl font-bold text-default leading-tight">
          <em class="not-italic font-(--font-display)">Batches</em>
        </h1>
        <p class="mt-1 text-sm text-muted">
          Every cohort, scoped to its course. Each batch has one default
          instructor.
        </p>
      </div>
      <div class="flex items-center gap-2 shrink-0 mt-1">
        <UButton
          label="Export"
          icon="i-lucide-download"
          color="neutral"
          variant="outline"
          size="sm"
        />
        <UButton
          v-if="isAdmin"
          label="New batch"
          icon="i-lucide-plus"
          size="sm"
          @click="emit('create')"
        />
      </div>
    </div>

    <!-- Search + status tabs + count -->
    <div class="flex items-center gap-3 flex-wrap">
      <div class="relative">
        <UIcon
          name="i-lucide-search"
          class="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-dimmed pointer-events-none"
        />
        <input
          :value="search"
          type="text"
          placeholder="Search batch, code, instructor..."
          class="pl-8 pr-3 py-1.5 text-sm bg-muted border border-default rounded-lg text-default placeholder:text-dimmed focus:outline-none focus:ring-2 focus:ring-primary/30 w-60"
          @input="emit('update:search', ($event.target as HTMLInputElement).value)"
        />
      </div>

      <div class="flex items-center gap-2">
        <span
          class="text-label font-mono tracking-loose uppercase text-dimmed"
        >
          Status
        </span>
        <div class="flex items-center gap-0.5 bg-muted rounded-lg p-0.5">
          <button
            v-for="tab in STATUS_TABS"
            :key="tab.value"
            class="px-2.5 py-1 text-sm rounded-md transition-all"
            :class="
              statusFilter === tab.value
                ? 'bg-elevated text-default font-medium shadow-xs'
                : 'text-muted hover:text-default'
            "
            @click="emit('update:statusFilter', tab.value)"
          >
            {{ tab.label }}
            <span class="text-dimmed font-normal">
              {{ statusCount(tab.value) }}
            </span>
          </button>
        </div>
      </div>

      <span class="ml-auto text-sm text-dimmed">
        {{ shownCount }} of {{ statusCounts.all }} shown
      </span>
    </div>

    <!-- Course tabs -->
    <div class="flex items-center gap-0.5 overflow-x-auto pb-0.5">
      <button
        class="px-2.5 py-1 text-sm rounded-md transition-all whitespace-nowrap"
        :class="
          courseFilter === 'all'
            ? 'bg-primary text-inverted font-medium'
            : 'text-muted hover:text-default hover:bg-muted'
        "
        @click="emit('update:courseFilter', 'all')"
      >
        All {{ statusCounts.all }}
      </button>
      <button
        v-for="tab in courseTabs"
        :key="tab.code"
        class="px-2.5 py-1 text-sm rounded-md transition-all whitespace-nowrap font-mono"
        :class="
          courseFilter === tab.code
            ? 'bg-primary text-inverted font-medium'
            : 'text-muted hover:text-default hover:bg-muted'
        "
        @click="emit('update:courseFilter', tab.code)"
      >
        {{ tab.code }} {{ tab.count }}
      </button>
    </div>
  </div>
</template>
