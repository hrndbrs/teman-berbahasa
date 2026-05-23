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
  <DashboardPageHeader
    eyebrow="Catalog"
    title="Courses"
    description="The full set of offerings. Each course can run in one or many batches."
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
        label="New course"
        icon="i-lucide-plus"
        size="sm"
        @click="emit('create')"
      />
    </template>
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-2"
    >
      <div class="flex flex-wrap items-center gap-3">
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
          <span class="text-success-500 dark:text-success-400"
            >· {{ activeCount }} active</span
          >
          <span class="text-muted">· {{ archivedCount }} archived</span>
        </span>
      </div>

      <NuxtLink
        to="/dashboard/batches"
        class="flex items-center gap-1 text-sm text-muted hover:text-default transition-colors self-start sm:self-auto"
      >
        See all batches
        <UIcon
          name="i-lucide-arrow-right"
          class="size-3.5"
        />
      </NuxtLink>
    </div>
  </DashboardPageHeader>
</template>
