<script setup lang="ts">
const props = defineProps<{
  search: string;
  statusFilter: ApiBatchStatus | 'all';
  courseFilter: string;
  statusCounts: {
    all: number;
    ongoing: number;
    upcoming: number;
    completed: number;
  };
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
  <CommonPageHeader
    eyebrow="Cohorts"
    title="Batches"
    description="Every cohort, scoped to its course. Each batch has one default instructor."
  >
    <template #actions>
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
    </template>
    <!-- Search + status tabs + count -->
    <div class="flex flex-wrap items-center gap-3">
      <div class="relative w-full sm:w-60">
        <UIcon
          name="i-lucide-search"
          class="text-dimmed pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2"
        />
        <input
          :value="search"
          type="text"
          placeholder="Search batch, code, instructor..."
          class="bg-muted border-default text-default placeholder:text-dimmed focus:ring-primary/30 w-full rounded-lg border py-1.5 pr-3 pl-8 text-sm focus:ring-2 focus:outline-none"
          @input="
            emit('update:search', ($event.target as HTMLInputElement).value)
          "
        />
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <span class="text-label tracking-loose text-dimmed font-mono uppercase">
          Status
        </span>
        <div class="bg-muted flex items-center gap-0.5 rounded-lg p-0.5">
          <button
            v-for="tab in STATUS_TABS"
            :key="tab.value"
            class="rounded-md px-2.5 py-1 text-sm transition-all"
            :class="
              statusFilter === tab.value
                ? 'bg-elevated text-default font-medium shadow-xs'
                : 'text-muted hover:text-default'
            "
            @click="emit('update:statusFilter', tab.value)"
          >
            {{ tab.label }}
            <span class="text-dimmed font-normal">{{
              statusCount(tab.value)
            }}</span>
          </button>
        </div>
      </div>

      <span class="text-dimmed text-sm sm:ml-auto">
        {{ shownCount }} of {{ statusCounts.all }} shown
      </span>
    </div>

    <!-- Course tabs -->
    <div class="flex items-center gap-0.5 overflow-x-auto pb-0.5">
      <button
        class="rounded-md px-2.5 py-1 text-sm whitespace-nowrap transition-all"
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
        class="rounded-md px-2.5 py-1 font-mono text-sm whitespace-nowrap transition-all"
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
  </CommonPageHeader>
</template>
