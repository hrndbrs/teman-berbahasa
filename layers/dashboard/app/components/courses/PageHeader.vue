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
  <CommonPageHeader
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
      class="flex flex-col justify-between gap-2 sm:flex-row sm:items-center"
    >
      <div class="flex flex-wrap items-center gap-3">
        <div class="bg-muted flex items-center gap-1 rounded-lg p-0.5">
          <button
            v-for="tab in statusTabs"
            :key="tab.value"
            class="rounded-md px-3 py-1 text-sm transition-all"
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

        <span class="text-dimmed text-sm">
          {{ totalCount }} courses
          <span class="text-success-500 dark:text-success-400"
            >· {{ activeCount }} active</span
          >
          <span class="text-muted">· {{ archivedCount }} archived</span>
        </span>
      </div>

      <NuxtLink
        to="/dashboard/batches"
        class="text-muted hover:text-default flex items-center gap-1 self-start text-sm transition-colors sm:self-auto"
      >
        See all batches
        <UIcon
          name="i-lucide-arrow-right"
          class="size-3.5"
        />
      </NuxtLink>
    </div>
  </CommonPageHeader>
</template>
