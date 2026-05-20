<script setup lang="ts">
const props = defineProps<{
  totalCount: number;
  activeCount: number;
  archivedCount: number;
  statusFilter: ApiCourseStatus | 'all';
  isAdmin: boolean;
}>();

const emit = defineEmits<{
  'update:statusFilter': [value: ApiCourseStatus | 'all'];
  create: [];
}>();

const statusTabs = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Archived', value: 'archived' },
] as const;
</script>

<template>
  <div class="px-6 pt-6 pb-4 border-b border-muted shrink-0">
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-label font-mono tracking-looser uppercase text-dimmed mb-1">
          Catalog
        </p>
        <h1 class="text-4xl font-bold text-default leading-tight">
          <em class="not-italic font-(--font-display)">Courses</em>
        </h1>
        <p class="mt-1 text-sm text-muted">
          The full set of offerings. Each course can run in one or many batches.
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
          label="New course"
          icon="i-lucide-plus"
          size="sm"
          @click="emit('create')"
        />
      </div>
    </div>

    <!-- Filter tabs + stats -->
    <div class="flex items-center justify-between mt-4">
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-1 bg-muted rounded-lg p-0.5">
          <button
            v-for="tab in statusTabs"
            :key="tab.value"
            class="px-3 py-1 text-sm rounded-md transition-all"
            :class="
              props.statusFilter === tab.value
                ? 'bg-elevated text-default font-medium shadow-xs'
                : 'text-muted hover:text-default'
            "
            @click="emit('update:statusFilter', tab.value)"
          >
            {{ tab.label }}
          </button>
        </div>

        <span class="text-sm text-dimmed">
          {{ totalCount }} courses
          <span class="text-success-500 dark:text-success-400">· {{ activeCount }} active</span>
          <span class="text-muted">· {{ archivedCount }} archived</span>
        </span>
      </div>

      <NuxtLink
        to="/dashboard/batches"
        class="flex items-center gap-1 text-sm text-muted hover:text-default transition-colors"
      >
        See all batches
        <UIcon name="i-lucide-arrow-right" class="size-3.5" />
      </NuxtLink>
    </div>
  </div>
</template>
